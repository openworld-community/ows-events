<script setup lang="ts">
import { getAllTimezones, getTimezone } from '@/services/timezone.services';
import { useLocationStore, type Country, type City } from '@/stores/location.store';
import { type EventOnPoster } from '@/../common/types';
import type { ImageLoaderFile } from '../common/ImageLoader.vue';

type Props = {
	closeEventModal: () => void;
	dataForEdit?: EventOnPoster;
	refreshEvent?: () => void;
};
const props = defineProps<Props>();
const locationStore = useLocationStore();

const isLoading = ref(false);
const newImageFile = ref<ImageLoaderFile>(null);

const allTimezones = (await getAllTimezones()).map((timezone) =>
	timezoneToString(timezone)
) as string[];
const minDate = new Date();

const inputValues = ref({
	id: props.dataForEdit?.id ?? '',
	title: props.dataForEdit?.title ?? '',
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
		country: (props.dataForEdit?.location.country ?? 'Serbia') satisfies Country, // Временно фиксируем страну для добавления события
		city: (props.dataForEdit?.location.city ?? '') satisfies City,
		address: props.dataForEdit?.location.address ?? ''
	},
	image: props.dataForEdit?.image ?? '',
	price: props.dataForEdit?.price ?? '0',
	timezone: props.dataForEdit?.timezone ? timezoneToString(props.dataForEdit.timezone) : '',
	url: props.dataForEdit?.url ?? ''
});
const eventStartEpoch = computed(() =>
	combineDateTime(inputValues.value.startDate, inputValues.value.startTime).getTime()
);
const eventEndEpoch = computed(() =>
	combineDateTime(inputValues.value.endDate, inputValues.value.endTime).getTime()
);

const checkFormFilling = computed(() => {
	return !!(
		inputValues.value.title &&
		inputValues.value.description &&
		inputValues.value.price &&
		inputValues.value.url &&
		inputValues.value.startDate &&
		inputValues.value.startTime &&
		// endDate & endTime both must be null or non-null
		(inputValues.value.endDate ? inputValues.value.endTime : !inputValues.value.endTime) &&
		inputValues.value.location.country &&
		inputValues.value.location.city &&
		inputValues.value.timezone &&
		allTimezones.includes(inputValues.value.timezone)
	);
});

const closeModal = () => {
	setTimeout(() => props.closeEventModal(), 300);
};

const paramsForSubmit = computed(() => {
	return {
		title: inputValues.value.title,
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
		price: inputValues.value.price,
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

		const event = Object.assign(paramsForSubmit.value, { id: inputValues.value.id, image });
		const { error } = await apiRouter.events.edit.useMutation({ data: { event } });

		if (!error.value) props.refreshEvent?.();
	} else {
		const image = (await addImage(newImageFile.value)) ?? '';
		const event = Object.assign(paramsForSubmit.value, { image });
		const { data } = await apiRouter.events.add.useMutation({ data: { event } });

		if (data.value) {
			await navigateTo(`/event/${data.value.id}`);
		} else {
			isLoading.value = false;
			return;
		}
	}

	closeModal();
	isLoading.value = false;
};

async function addImage(image: ImageLoaderFile) {
	if (!image || image === 'DELETED') return;
	const { data } = await apiRouter.events.image.add.useMutation({ data: { image } });
	if (!data.value) return;
	return data.value.path;
}

// #region country & string input relationship logic
watch(
	() => inputValues.value.location.country,
	() => {
		inputValues.value.location.city = '';
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
	<CommonModalWrapper>
		<div class="modal-card">
			<header class="modal-card__head">
				<h2 class="modal-card__title">
					{{ $t('modal.new_event_modal.title') }}
				</h2>
			</header>

			<form
				class="modal-card__body body"
				@submit.prevent="() => void 0"
			>
				<ModalUiModalSection :label="$t('modal.new_event_modal.fields.location')">
					<template #child>
						<CommonUiBaseSelect
							v-model="inputValues.location.country"
							name="country"
							:placeholder="$t('global.country')"
							:list="locationStore.countries"
							:disabled="true"
							required
						/>

						<CommonUiBaseSelect
							v-model="inputValues.location.city"
							name="city"
							:disabled="!inputValues.location.country"
							:placeholder="$t('global.city')"
							:list="
								locationStore.getCitiesByCountry(inputValues.location.country) ?? []
							"
							required
						/>

						<CommonUiBaseSelect
							v-model="inputValues.timezone"
							name="timezone"
							:disabled="!inputValues.location.country"
							:placeholder="$t('global.timezone')"
							:list="allTimezones"
							required
						/>

						<CommonUiBaseInput
							v-model="inputValues.location.address"
							name="address"
							:placeholder="$t('modal.new_event_modal.fields.address_placeholder')"
						/>

						<div
							v-if="inputValues.location.city && inputValues.location.address"
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
									{{ $t('modal.new_event_modal.fields.check_address') }}
								</span>
								<NuxtLink
									:to="getLocationLink(inputValues.location)"
									target="_blank"
									class="check-location__link"
								>
									{{ $t('modal.new_event_modal.fields.address_link') }}
								</NuxtLink>
							</p>
						</div>
					</template>
				</ModalUiModalSection>

				<ModalUiModalSection :label="$t('modal.new_event_modal.fields.main_info')">
					<template #child>
						<CommonUiBaseInput
							v-model="inputValues.title"
							name="title"
							:placeholder="$t('modal.new_event_modal.fields.title')"
							required
						/>
						<CommonUiTextArea
							v-model="inputValues.description"
							name="description"
							:placeholder="$t('modal.new_event_modal.fields.description')"
							required
						/>
					</template>
				</ModalUiModalSection>

				<ModalUiModalSection
					type="row"
					:label="$t('modal.new_event_modal.fields.start')"
				>
					<template #child>
						<CommonUiDateTimepicker
							v-model="inputValues.startDate"
							type="date"
							name="startDate"
							:min-date="minDate"
							required
						/>
						<CommonUiDateTimepicker
							v-model="inputValues.startTime"
							type="time"
							name="startTime"
							placeholder="--:--"
							:disabled="!inputValues.startDate"
							:min-time="
								inputValues.startDate?.toDateString() === new Date().toDateString()
									? getTimeFromEpochInMs(Date.now(), true)
									: undefined
							"
							required
						/>
					</template>
				</ModalUiModalSection>

				<ModalUiModalSection
					type="row"
					:label="$t('modal.new_event_modal.fields.end')"
				>
					<template #child>
						<CommonUiDateTimepicker
							v-model="inputValues.endDate"
							type="date"
							name="endDate"
							:min-date="inputValues.startDate ?? minDate"
							:disabled="!inputValues.startDate"
						/>
						<CommonUiDateTimepicker
							v-model="inputValues.endTime"
							type="time"
							name="endTime"
							:min-time="
								inputValues.startDate?.toDateString() ===
								inputValues.endDate?.toDateString()
									? inputValues.startTime
									: undefined
							"
							placeholder="--:--"
							:disabled="!inputValues.endDate"
							:required="!!inputValues.endDate"
						/>
					</template>
				</ModalUiModalSection>

				<ModalUiModalSection :label="$t('modal.new_event_modal.fields.price')">
					<template #child>
						<CommonUiBaseInput
							v-model="inputValues.price"
							name="price"
							type="number"
							:min-value="0"
							:placeholder="$t('modal.new_event_modal.fields.price_placeholder')"
							required
						/>
						<!--						<CommonUiBaseSelect-->
						<!--								:key="inputValues.currency"-->
						<!--								v-model="inputValues.currency"-->
						<!--								:input-disabled="!inputValues.currency"-->
						<!--								name="current"-->
						<!--								:placeholder="$t('global.city')"-->
						<!--								:list="cities"-->
						<!--						/>-->
					</template>
				</ModalUiModalSection>

				<ModalUiModalSection
					:label="$t('modal.new_event_modal.fields.url_to_rigistration')"
				>
					<template #child>
						<CommonUiBaseInput
							v-model="inputValues.url"
							name="url"
							:placeholder="$t('modal.new_event_modal.fields.url_placeholder')"
							required
						/>
					</template>
				</ModalUiModalSection>

				<CommonImageLoader
					v-model="newImageFile"
					:external-image="inputValues.image"
				/>
			</form>
			<div class="modal-card__foot">
				<CommonButton
					class="modal-card__button"
					button-kind="ordinary"
					:button-text="$t('modal.new_event_modal.cancel')"
					:is-active="!isLoading"
					@click="closeModal()"
				/>
				<CommonButton
					class="modal-card__button"
					button-kind="success"
					:button-text="$t('modal.new_event_modal.submit')"
					:is-loading="isLoading"
					:is-disabled="!checkFormFilling || isLoading"
					@click="isLoading ? null : submitEvent()"
				/>
			</div>
		</div>
	</CommonModalWrapper>
</template>

<style scoped lang="less">
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
