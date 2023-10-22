<script setup lang="ts">
import { getAllTimezones, getTimezone } from '@/services/timezone.services';
import { useLocationStore, type Country, type City } from '@/stores/location.store';
import { type EventOnPoster } from '@/../common/types';
import type { ImageLoaderFile } from '../common/ImageLoader.vue';
import { EventTypes } from '../../../common/const/eventTypes';
import { getCurrencyByCountry } from '../../utils/prices';
import { useUserStore } from '../../stores/user.store';
import { LocalStorageEnum } from '../../constants/enums/common';
import { useEventStore } from '../../stores/event.store';

type Props = {
	dataForEdit?: EventOnPoster;
	refreshEvent?: () => void;
};
const props = defineProps<Props>();
const locationStore = useLocationStore();
const userStore = useUserStore();
const eventStore = useEventStore()
const router = useRouter();
const localePath = useLocalePath()

const isLoading = ref(false);
const newImageFile = ref<ImageLoaderFile>(null);

onMounted(() => {
	eventStore.setEventData()
})

const allTimezones = (await getAllTimezones()).map((timezone) =>
	timezoneToString(timezone)
) as string[];
const minDate = new Date();

const isFree = ref(eventStore.eventData.price.value === 0);

const inputValues = ref({
	id: props.dataForEdit?.id ?? '',
	title: props.dataForEdit?.title ?? '',
	organizer: props.dataForEdit?.organizer ?? userStore.userInfo?.company ?? '',
	description: props.dataForEdit?.description ?? '',
	startDate: getDateFromEpochInMs(props.dataForEdit?.date),
	startTime: getTimeFromEpochInMs(props.dataForEdit?.date),
	endDate: props.dataForEdit?.durationInSeconds
		? getDateFromEpochInMs(
				(props.dataForEdit?.date ?? 0) + props.dataForEdit.durationInSeconds * 1000
		  )
		: null,
	endTime: props.dataForEdit?.durationInSeconds
		? getTimeFromEpochInMs(
				(props.dataForEdit?.date ?? 0) + props.dataForEdit.durationInSeconds * 1000
		  )
		: null,
	location: {
		country: (props.dataForEdit?.location.country ?? '') satisfies Country,
		city: (props.dataForEdit?.location.city ?? '') satisfies City,
		address: props.dataForEdit?.location.address ?? ''
	},
	image: props.dataForEdit?.image ?? '',
	price: {
		value: !isFree.value ? props.dataForEdit?.price?.value ?? '' : '',
		currency: props.dataForEdit?.price?.currency ?? ''
	},
	timezone: props.dataForEdit?.timezone ? timezoneToString(props.dataForEdit.timezone) : '',
	url: props.dataForEdit?.url ?? ''
});
const eventStartEpoch = computed(() =>
	combineDateTime(inputValues.value.startDate, inputValues.value.startTime).getTime()
);
const eventEndEpoch = computed(() =>
	combineDateTime(inputValues.value.endDate, inputValues.value.endTime).getTime()
);

const toggleFree = (value: boolean) => {
	isFree.value = value;
	//убираем значение из инпута, в paramsForSubmit подставляется 0
	if (value) {
		inputValues.value.price.value = '';
		inputValues.value.price.currency = '';
	}
};

const checkFormFilling = computed(() => {
	return !!(
		inputValues.value.title &&
		inputValues.value.description &&
		inputValues.value.url &&
		inputValues.value.startDate &&
		inputValues.value.startTime &&
		// endDate & endTime both must be null or non-null
		(inputValues.value.endDate ? inputValues.value.endTime : !inputValues.value.endTime) &&
		inputValues.value.location.country &&
		inputValues.value.location.city &&
		inputValues.value.timezone &&
		allTimezones.includes(inputValues.value.timezone) &&
		(isFree.value || (inputValues.value.price.value && inputValues.value.price.currency))
	);
});

const paramsForSubmit = computed(() => {
	return {
		title: inputValues.value.title,
		organizer: inputValues.value.organizer,
		description: inputValues.value.description,
		date: eventStartEpoch.value,
		durationInSeconds: Math.floor(
			Math.max(0, eventEndEpoch.value - eventStartEpoch.value) / 1000
		),
		location: {
			country: inputValues.value.location.country,
			city: inputValues.value.location.city,
			address: inputValues.value.location.address
		},
		price: {
			minValue: null,
			value: isFree.value ? 0 : Number(inputValues.value.price.value),
			maxValue: null,
			currency: isFree.value ? null : inputValues.value.price.currency
		},
		timezone: stringToTimezone(inputValues.value.timezone),
		url: inputValues.value.url
	};
});

const submitEvent = async () => {
	isLoading.value = true;

	if (props.dataForEdit) {
		let image = props.dataForEdit.image;
		if (newImageFile.value && props.dataForEdit.image) {
			await apiRouter.events.image.delete.useMutation({
				data: { path: props.dataForEdit.image }
			});
			image = '';
		}
		image = (await addImage(newImageFile.value)) ?? image;

		const event = Object.assign(paramsForSubmit.value, {
			id: inputValues.value.id,
			image,
			type: EventTypes.USER_GENERATED
		});
		const { error } = await apiRouter.events.edit.useMutation({ data: { event } });

		if (!error.value) props.refreshEvent?.();
	} else {
		const image = (await addImage(newImageFile.value)) ?? '';
		const event = Object.assign(paramsForSubmit.value, { image });
		const { data } = await apiRouter.events.add.useMutation({ data: { event } });

		if (data.value) {
			await navigateTo(localePath(`/event/${data.value.id}`));
		} else {
			isLoading.value = false;
			return;
		}
	}

	isLoading.value = false;
};

async function addImage(image: ImageLoaderFile) {
	if (!image || image === 'DELETED') return;
	const { data } = await apiRouter.events.image.add.useMutation({ data: { image } });
	if (!data.value) return;
	return data.value.path;
}

// #region country, city, timezone string input relationship logic
watch(
	() => inputValues.value.location.country,
	(country) => {
		if (!isFree.value && country)
			inputValues.value.price.currency = getCurrencyByCountry(country);
		if (!country) {
			inputValues.value.timezone = '';
			inputValues.value.location.city = '';
			inputValues.value.price.currency = '';
		}
	}
);

watch(
	() => isFree.value,
	() => {
		if (!isFree.value)
			inputValues.value.price.currency = getCurrencyByCountry(
				inputValues.value.location.country
			);
	}
);

watch(
	() => [inputValues.value.location.country, inputValues.value.location.city],
	async ([country, city]) => {
		if (!country) return;
		inputValues.value.timezone = await getTimezone(country, city);
	}
);
// #endregion

// #region datetime input relationship logic
watch(
	() => !!inputValues.value.startDate,
	(isStartSet) => {
		if (isStartSet) return;
		inputValues.value.startTime = null;
		inputValues.value.endDate = null;
	}
);
watch(
	() => !!inputValues.value.endDate,
	(isEndSet) => {
		if (isEndSet) return;
		inputValues.value.endTime = null;
	}
);
watch(
	() => [eventStartEpoch.value, eventEndEpoch.value],
	([startEpoch, endEpoch]) => {
		const { endDate, startDate, endTime } = inputValues.value;
		if (!endDate || !startDate) return;
		if (endEpoch >= startEpoch) return;

		if (endTime) {
			inputValues.value.endTime = null;
			return;
		}

		if (startDate.toDateString() === endDate.toDateString()) return;
		inputValues.value.endDate = null;
	}
);
// #endregion
</script>

<template>
	<div class="event-form">
		<h1 class="event-form__title">
			{{ $t(props.dataForEdit ? 'form.event.title_edit' : 'form.event.title') }}
		</h1>
		<div class="event-form__fields">
			<ModalUiModalSection :label="$t('form.event.fields.location')">
				<template #child>
					<CommonUiBaseSelect
						v-model="eventStore.eventData.location.country"
						name="country"
						:placeholder="$t('global.country')"
						:list="locationStore.countries"
						input-readonly
						required
					/>

					<CommonUiBaseSelect
						v-model="eventStore.eventData.location.city"
						name="city"
						:disabled="!eventStore.eventData.location.country"
						:placeholder="$t('global.city')"
						:list="locationStore.getCitiesByCountry(inputValues.location.country)"
						input-readonly
						required
					/>

					<CommonUiBaseSelect
						v-model="eventStore.eventData.timezone"
						name="timezone"
						:disabled="!eventStore.eventData.location.country"
						:placeholder="$t('global.timezone')"
						:list="allTimezones"
						required
					/>

					<CommonUiBaseInput
						v-model="eventStore.eventData.location.address"
						name="address"
						:placeholder="$t('form.event.fields.address_placeholder')"
						:disabled="!(eventStore.eventData.location.country && eventStore.eventData.location.city)"
					/>

					<div
						v-if="eventStore.eventData.location.city && eventStore.eventData.location.address"
						class="modal-card__check-location check-location"
					>
						<CommonIcon
							class="check-location__icon"
							name="error"
							width="26"
							height="26"
							color="var(--color-accent-red)"
						/>
						<p class="check-location__text">
							<span>
								{{ $t('form.event.fields.check_address') }}
							</span>
							<NuxtLink
								:to="getLocationLink(eventStore.eventData.location)"
								target="_blank"
								class="check-location__link"
							>
								{{ $t('form.event.fields.address_link') }}
							</NuxtLink>
						</p>
					</div>
				</template>
			</ModalUiModalSection>

			<ModalUiModalSection :label="$t('form.event.fields.main_info')">
				<template #child>
					<CommonUiBaseInput
						v-model="eventStore.eventData.title"
						name="title"
						:placeholder="$t('form.event.fields.title')"
						required
					/>
					<CommonUiBaseInput
						v-model="eventStore.eventData.organizer"
						name="organizer"
						:placeholder="$t('form.event.fields.organizer')"
					/>
					<CommonUiTextArea
						v-model="eventStore.eventData.description"
						name="description"
						:placeholder="$t('form.event.fields.description')"
						required
					/>
				</template>
			</ModalUiModalSection>

			<ModalUiModalSection
				type="row"
				:label="$t('form.event.fields.start')"
			>
				<template #child>
					<CommonUiDateTimepicker
						v-model="eventStore.eventData.startDate"
						type="date"
						name="startDate"
						:min-date="minDate"
						required
					/>
					<CommonUiDateTimepicker
						v-model="eventStore.eventData.startTime"
						type="time"
						name="startTime"
						placeholder="--:--"
						:disabled="!eventStore.eventData.startDate"
						:min-time="
							eventStore.eventData.startDate?.toDateString() === new Date().toDateString()
								? getTimeFromEpochInMs(Date.now(), true)
								: undefined
						"
						required
					/>
				</template>
			</ModalUiModalSection>

			<ModalUiModalSection
				type="row"
				:label="$t('form.event.fields.end')"
			>
				<template #child>
					<CommonUiDateTimepicker
						v-model="eventStore.eventData.endDate"
						type="date"
						name="endDate"
						:min-date="eventStore.eventData.startDate ?? minDate"
						:disabled="!eventStore.eventData.startDate"
					/>
					<CommonUiDateTimepicker
						v-model="eventStore.eventData.endTime"
						type="time"
						name="endTime"
						:min-time="
							eventStore.eventData.startDate?.toDateString() ===
							eventStore.eventData.endDate?.toDateString()
								? inputValues.startTime
								: undefined
						"
						placeholder="--:--"
						:disabled="!eventStore.eventData.endDate"
						:required="!!eventStore.eventData.endDate"
					/>
				</template>
			</ModalUiModalSection>

			<ModalUiModalSection
				type="column-row"
				:label="$t('form.event.fields.price')"
			>
				<template #child>
					<div>
						<CommonUiBaseSelect
							v-model="eventStore.eventData.price.currency"
							name="currency"
							:placeholder="$t('form.event.fields.currency_placeholder')"
							:list="locationStore.currencies"
							has-icon-items
							input-readonly
							:disabled="isFree"
							:required="!isFree"
						/>
						<CommonUiBaseInput
							v-model="eventStore.eventData.price.value"
							name="price"
							type="number"
							:min-value="0"
							:disabled="isFree"
							:required="!isFree"
							:placeholder="$t('form.event.fields.price_placeholder')"
						/>
					</div>
					<CommonUiBaseCheckbox
						value="free"
						:label="$t('form.event.fields.price_free')"
						is-reversed
						:model-value="isFree"
						@update:model-value="toggleFree"
					/>
				</template>
			</ModalUiModalSection>

			<ModalUiModalSection :label="$t('form.event.fields.url_to_registration')">
				<template #child>
					<CommonUiBaseInput
						v-model="eventStore.eventData.url"
						name="url"
						:placeholder="$t('form.event.fields.url_placeholder')"
						required
					/>
				</template>
			</ModalUiModalSection>

			<CommonImageLoader
				v-model="newImageFile"
				:external-image="eventStore.eventData.image"
			/>
			<p class="event-form__required">{{ $t('form.global.required') }}</p>
		</div>
		<div class="event-form__bottom">
			<CommonButton
				class="event-form__button"
				button-kind="ordinary"
				:button-text="$t('global.button.cancel')"
				:is-active="!isLoading"
				@click="router.back()"
			/>
			<CommonButton
				class="event-form__button"
				button-kind="success"
				:button-text="$t('global.button.save')"
				:is-loading="isLoading"
				:is-disabled="!checkFormFilling || isLoading"
				@click="isLoading ? null : submitEvent()"
			/>
		</div>
	</div>
</template>

<style scoped lang="less">
.event-form {
	display: flex;
	width: 100%;
	flex-direction: column;
	padding: 20px var(--padding-side);

	&__title {
		font-size: var(--font-size-XL);
		font-weight: var(--font-weight-regular);
		margin-bottom: 30px;
	}

	&__fields {
		display: flex;
		width: 100%;
		flex-direction: column;
		margin-bottom: 30px;
	}

	&__required {
		font-size: var(--font-size-XS);
		line-height: 18px;
		color: var(--color-text-secondary);
		margin-top: var(--space-unrelated-items);
	}

	&__bottom {
		display: flex;
		width: 100%;
		justify-content: space-between;
	}

	&__button {
		width: 48%;
	}
}

.check-location {
	display: flex;
	align-items: center;

	&__icon {
		flex-shrink: 0;
		margin-right: 20px;
	}

	&__text {
		font-size: var(--font-size-XS);
		line-height: 18px;
	}

	&__link {
		color: var(--color-link);
		text-decoration: underline;
	}
}
</style>
