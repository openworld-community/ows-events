<script setup lang="ts">
import { getAllTimezones, getTimezone } from '@/services/timezone.services';
import { useLocationStore, type Country, type City } from '@/stores/location.store';
import { type EventOnPoster } from '@/../common/types';
import type { ImageLoaderFile } from '../common/ImageLoader.vue';

const { translate } = useTranslation();

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
	startDate: getDateFromEpochInMs(props.dataForEdit?.date) ?? null,
	startTime: getTimeFromEpochInMs(props.dataForEdit?.date),
	endDate: getDateFromEpochInMs(
		(props.dataForEdit?.date ?? 0) + (props.dataForEdit?.durationInSeconds ?? 0) * 1000
	),
	endTime: getTimeFromEpochInMs(
		(props.dataForEdit?.date ?? 0) + (props.dataForEdit?.durationInSeconds ?? 0) * 1000
	),
	country: (props.dataForEdit?.location.country ?? 'Serbia') satisfies Country, // Временно фиксируем страну для добавления события
	city: (props.dataForEdit?.location.city ?? '') satisfies City,
	image: props.dataForEdit?.image ?? '',
	price: props.dataForEdit?.price ?? '0',
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
		inputValues.value.description &&
		inputValues.value.price &&
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

const paramsForSubmit = computed(() => {
	const tz = stringToTimezone(inputValues.value.timezone);
	const durationInSeconds = Math.floor(
		(combineDateTime(inputValues.value.endDate, inputValues.value.endTime).getTime() -
			combineDateTime(inputValues.value.startDate, inputValues.value.startTime).getTime()) /
			1000
	);

	return {
		title: inputValues.value.title,
		description: inputValues.value.description,
		date: combineDateTime(inputValues.value.startDate, inputValues.value.startTime).getTime(),
		durationInSeconds: durationInSeconds <= 0 ? 0 : durationInSeconds,
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

const isCityDisabled = computed(() => {
	return !inputValues.value.country;
});

const isTimezoneDisabled = computed(() => {
	return !inputValues.value.country;
});
</script>

<template>
	<CommonModalWrapper>
		<div class="modal-card">
			<header class="modal-card__head">
				<h2 class="modal-card__title">
					{{ translate('component.new_event_modal.title') }}
				</h2>
			</header>

			<form
				class="modal-card__body body"
				@submit.prevent="() => void 0"
			>
				<ModalUiModalSection
					:label="translate('component.new_event_modal.fields.location')"
				>
					<template #child>
						<CommonUiBaseSelect
							v-model="inputValues.country"
							name="country"
							:placeholder="translate('global.country')"
							:list="locationStore.countries"
							:disabled="true"
							required
						/>

						<CommonUiBaseSelect
							v-model="inputValues.city"
							name="city"
							:disabled="isCityDisabled"
							:placeholder="translate('global.city')"
							:list="locationStore.getCitiesByCountry(inputValues.country) ?? []"
							required
						/>

						<CommonUiBaseSelect
							v-model="inputValues.timezone"
							name="timezone"
							:disabled="isTimezoneDisabled"
							:placeholder="translate('global.timezone')"
							:list="allTimezones"
							required
						/>
					</template>
				</ModalUiModalSection>

				<ModalUiModalSection
					:label="translate('component.new_event_modal.fields.main_info')"
				>
					<template #child>
						<CommonUiBaseInput
							v-model="inputValues.title"
							name="title"
							:placeholder="translate('component.new_event_modal.fields.title')"
							required
						/>
						<CommonUiTextArea
							v-model="inputValues.description"
							name="description"
							:placeholder="translate('component.new_event_modal.fields.description')"
							required
						/>
					</template>
				</ModalUiModalSection>

				<ModalUiModalSection
					type="row"
					:label="translate('component.new_event_modal.fields.start')"
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
							required
						/>
					</template>
				</ModalUiModalSection>

				<ModalUiModalSection
					type="row"
					:label="translate('component.new_event_modal.fields.end')"
				>
					<template #child>
						<CommonUiDateTimepicker
							v-model="inputValues.endDate"
							type="date"
							name="endDate"
							:min-date="minDate"
							:disabled="!inputValues.startDate"
						/>
						<CommonUiDateTimepicker
							v-model="inputValues.endTime"
							type="time"
							name="endTime"
							placeholder="--:--"
							:disabled="!(inputValues.startDate && inputValues.endDate)"
						/>
					</template>
				</ModalUiModalSection>

				<ModalUiModalSection :label="translate('component.new_event_modal.fields.price')">
					<template #child>
						<CommonUiBaseInput
							v-model="inputValues.price"
							name="price"
							type="text"
							:placeholder="
								translate('component.new_event_modal.fields.price_placeholder')
							"
							required
						/>
						<!--						<CommonUiBaseSelect-->
						<!--								:key="inputValues.currency"-->
						<!--								v-model="inputValues.currency"-->
						<!--								:input-disabled="!inputValues.currency"-->
						<!--								name="current"-->
						<!--								:placeholder="translate('global.city')"-->
						<!--								:list="cities"-->
						<!--						/>-->
					</template>
				</ModalUiModalSection>

				<ModalUiModalSection
					:label="translate('component.new_event_modal.fields.url_to_rigistration')"
				>
					<template #child>
						<CommonUiBaseInput
							v-model="inputValues.url"
							name="url"
							:placeholder="
								translate('component.new_event_modal.fields.url_placeholder')
							"
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
					:button-text="translate('component.new_event_modal.cancel')"
					:is-active="!isLoading"
					@click="closeModal()"
				/>
				<CommonButton
					class="modal-card__button"
					button-kind="success"
					:button-text="translate('component.new_event_modal.submit')"
					:is-loading="isLoading"
					:is-disabled="!checkFormFilling || isLoading"
					@click="isLoading ? null : submitEvent()"
				/>
			</div>
		</div>
	</CommonModalWrapper>
</template>

<style scoped lang="less"></style>
