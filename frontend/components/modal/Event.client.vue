<script setup lang="ts">
import { getAllTimezones, getTimezone } from '@/services/timezone.services';
import { useLocationStore, type Country, type City } from '@/stores/location.store';
import { type EventOnPoster } from '@/../common/types';
import { EventValidatorErrorTypes } from '@/../common/types/event-validation-error';
import type { ImageLoaderFile } from '../common/ImageLoader.vue';

const { $translate, $i18n } = useNuxtApp();
const t = $i18n.t.bind($i18n);

// if dataForEdit exists then so does the refreshEvent
type Props = { closeEventModal: () => void } & (
	| { dataForEdit?: undefined }
	| { dataForEdit: EventOnPoster; refreshEvent: () => void }
);
const props = defineProps<Props>();
const locationStore = useLocationStore();

const isLoading = ref(false);
const newImageFile = ref<ImageLoaderFile>(null);

const allTimezones = (await getAllTimezones()).map((timezone) => timezoneToString(timezone));
const minDate = ref(new Date());

const [eventStartDate, eventStartTime] = props.dataForEdit
	? timestampDateTimeParse(props.dataForEdit.date, props.dataForEdit.timezone)
	: ['', ''];
const [eventEndDate, eventEndTime] = props.dataForEdit
	? timestampDateTimeParse(
			props.dataForEdit.date + props.dataForEdit.durationInSeconds,
			props.dataForEdit.timezone
	  )
	: ['', ''];

// todo startDate & endDate can be Date instead of string - why?
const inputValues = ref({
	id: props.dataForEdit?.id ?? '',
	title: props.dataForEdit?.title ?? '',
	description: props.dataForEdit?.description ?? '',
	startDate: eventStartDate,
	startTime: eventStartTime,
	endDate: eventEndDate,
	endTime: eventEndTime,
	country: (props.dataForEdit?.location.country ?? '') satisfies Country,
	city: (props.dataForEdit?.location.city ?? '') satisfies City,
	image: props.dataForEdit?.image ?? '',
	price: props.dataForEdit?.price ?? 0,
	timezone: props.dataForEdit?.timezone ? timezoneToString(props.dataForEdit.timezone) : '',
	url: props.dataForEdit?.url ?? ''
});

watch(
	() => inputValues.value.country,
	() => {
		inputValues.value.city = '';
	}
);

watch([() => inputValues.value.country, () => inputValues.value.city], async ([country, city]) => {
	inputValues.value.timezone = country ? await getTimezone({ country, city }) : '';
});

const checkFormFilling = computed(() => {
	return !!(
		inputValues.value.title &&
		inputValues.value.url &&
		inputValues.value.startDate &&
		inputValues.value.startTime &&
		inputValues.value.country &&
		inputValues.value.city &&
		inputValues.value.timezone &&
		allTimezones.includes(inputValues.value.timezone)
	);
});

const closeModal = () => {
	setTimeout(() => props.closeEventModal(), 300);
};

const dateTime = (date: Date, time: any, timezone: string): Date => {
	const y = date.getUTCFullYear();
	const m = date.toLocaleString('default', { month: 'long' });
	const d = date.getDay();
	return new Date(`${m} ${d} ${y} ${time?.hours ?? '00'}:${time?.minutes ?? '00'} ${timezone}`);
};
const paramsForSubmit = computed(() => {
	const tz = stringToTimezone(inputValues.value.timezone);
	return {
		title: inputValues.value.title,
		description: inputValues.value.description,
		date: dateTime(
			inputValues.value.startDate,
			inputValues.value.startTime,
			tz.timezoneOffset
		).getTime(),
		durationInSeconds:
			dateTime(
				inputValues.value.endDate,
				inputValues.value.endTime,
				tz.timezoneOffset
			).getTime() -
			dateTime(
				inputValues.value.startDate,
				inputValues.value.startTime,
				tz.timezoneOffset
			).getTime(),
		location: {
			country: inputValues.value.country,
			city: inputValues.value.city
		},
		price: inputValues.value.price,
		timezone: tz,
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
		const { data } = await apiRouter.events.edit.useMutation({ data: { event } });

		if (data.value?.type === 'success') {
			props.refreshEvent();
		} else {
			console.error(data.value?.errors);
		}
	} else {
		const image = (await addImage(newImageFile.value)) ?? '';
		const event = Object.assign(paramsForSubmit.value, { image });
		const { data } = await apiRouter.events.add.useMutation({ data: { event } });

		if (data.value?.type === 'success') {
			await navigateTo(`/event/${data.value.data.id}`);
		} else {
			alert(
				'Ошибка при добавлении события:\n' +
					data.value?.errors
						?.map((e) => t(`event.validation_errors.${e as EventValidatorErrorTypes}`))
						.join('\n')
			);
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
	if (data.value?.type !== 'success') return;
	return data.value.data.path;
}

const isCityDisabled = computed(() => {
	return !inputValues.value.country;
});

const isTimezoneDisabled = computed(() => {
	return !inputValues.value.city;
});
</script>

<template>
	<CommonModalWrapper>
		<div class="modal-card">
			<header class="modal-card__head">
				<h2 class="modal-card__title">
					{{ $translate('component.new_event_modal.title') }}
				</h2>
			</header>

			<form class="modal-card__body body">
				<ModalUiModalSection
					:label="$translate('component.new_event_modal.fields.location')"
				>
					<template #child>
						<CommonUiBaseSelect
							v-model="inputValues.country"
							name="country"
							:placeholder="$translate('global.country')"
							:list="locationStore.countries"
						/>
						<CommonUiBaseSelect
							:key="inputValues.country"
							v-model="inputValues.city"
							name="city"
							:disabled="isCityDisabled"
							:placeholder="$translate('global.city')"
							:list="locationStore.getCitiesByCountry(inputValues.country) ?? []"
						/>

						<CommonUiBaseSelect
							:key="inputValues.timezone"
							v-model="inputValues.timezone"
							name="timezone"
							:disabled="isTimezoneDisabled"
							:placeholder="$translate('global.timezone')"
							:list="allTimezones"
						/>
					</template>
				</ModalUiModalSection>

				<ModalUiModalSection
					:label="$translate('component.new_event_modal.fields.main_info')"
				>
					<template #child>
						<CommonUiBaseInput
							v-model="inputValues.title"
							name="title"
							:placeholder="$translate('component.new_event_modal.fields.title')"
						/>
						<CommonUiTextArea
							v-model="inputValues.description"
							name="description"
							:placeholder="
								$translate('component.new_event_modal.fields.description')
							"
						/>
					</template>
				</ModalUiModalSection>

				<ModalUiModalSection
					type="row"
					:label="$translate('component.new_event_modal.fields.start')"
				>
					<template #child>
						<CommonUiDatepicker
							v-model="inputValues.startDate"
							type="date"
							name="startDate"
							:min-date="minDate"
						/>
						<CommonUiDatepicker
							v-model="inputValues.startTime"
							type="time"
							name="startTime"
							placeholder="--:--"
						/>
					</template>
				</ModalUiModalSection>

				<ModalUiModalSection
					type="row"
					:label="$translate('component.new_event_modal.fields.end')"
				>
					<template #child>
						<CommonUiDatepicker
							v-model="inputValues.endDate"
							type="date"
							name="endDate"
							:min-date="minDate"
						/>
						<CommonUiDatepicker
							v-model="inputValues.endTime"
							type="time"
							name="endTime"
							placeholder="--:--"
						/>
					</template>
				</ModalUiModalSection>

				<ModalUiModalSection :label="$translate('component.new_event_modal.fields.price')">
					<template #child>
						<CommonUiBaseInput
							v-model="inputValues.price"
							name="price"
							type="number"
							:placeholder="$translate('component.new_event_modal.fields.price')"
						/>
						<!--						<CommonUiBaseSelect-->
						<!--								:key="inputValues.currency"-->
						<!--								v-model="inputValues.currency"-->
						<!--								:input-disabled="!inputValues.currency"-->
						<!--								name="current"-->
						<!--								:placeholder="$translate('global.city')"-->
						<!--								:list="cities"-->
						<!--						/>-->
					</template>
				</ModalUiModalSection>

				<ModalUiModalSection
					:label="$translate('component.new_event_modal.fields.url_to_rigistration')"
				>
					<template #child>
						<CommonUiBaseInput
							v-model="inputValues.url"
							name="url"
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
					:button-text="$translate('component.new_event_modal.cancel')"
					:is-active="!isLoading"
					@click="closeModal()"
				/>
				<CommonButton
					class="modal-card__button"
					button-kind="success"
					:button-text="$translate('component.new_event_modal.submit')"
					:is-loading="isLoading"
					:is-disabled="!checkFormFilling || isLoading"
					@click="isLoading ? null : submitEvent()"
				/>
			</div>
		</div>
	</CommonModalWrapper>
</template>

<style scoped lang="less">
.body {
	overflow-y: auto;
	background-color: var(--color-white);
	padding: 20px var(--padding-side);
}

.section {
	display: flex;
	flex-direction: column;
	margin-bottom: 8px;

	&__input {
		margin-bottom: 16px;
	}
}

.new-event-container {
	.row {
		display: flex;
		gap: 16px;
		margin-bottom: 10px;
	}
}
</style>
