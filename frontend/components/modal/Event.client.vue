<script setup lang="ts">
import { getAllTimezones, getTimezone } from '@/services/timezone.services';
import type { City, Country } from '@/stores/location.store';
import { useLocationStore } from '@/stores/location.store';
import { computed, ref, watch } from 'vue';
import { type EventOnPoster } from '../../../common/types';
import { EventValidatorErrorTypes } from '../../../common/types/event-validation-error';
import type { ImageLoaderFile } from '../common/ImageLoader.vue';

const { $translate, $i18n } = useNuxtApp();
const t = $i18n.t.bind($i18n);

type Props = {
	dataForEdit?: EventOnPoster;
	closeEventModal: () => void;
	refreshEvent?: () => void;
};

const props = defineProps<Props>();
const locationStore = useLocationStore();

const isLoading = ref(false);
const newImageFile = ref<ImageLoaderFile>(null);
const allTimezones = (await getAllTimezones()).map((timezone) => timezoneToString(timezone));

const [eventStartDate, eventStartTime] = props.dataForEdit
	? timestampDateTimeParse(props.dataForEdit.date, props.dataForEdit.timezone)
	: ['', ''];
const [eventEndDate, eventEndTime] = props.dataForEdit
	? timestampDateTimeParse(
			props.dataForEdit.date + props.dataForEdit.durationInSeconds,
			props.dataForEdit.timezone
	  )
	: ['', ''];

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

watch([() => inputValues.value.country, () => inputValues.value.city], async () => {
	if (!inputValues.value.country) {
		inputValues.value.timezone = '';
		return;
	}
	inputValues.value.timezone = await getTimezone({
		country: inputValues.value.country,
		city: inputValues.value.city
	});
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
			props.refreshEvent?.();
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

type InputEvent = {
	type: 'text' | 'date' | 'time' | 'number' | 'textarea' | 'datalist';
	label?: string;
	name: keyof typeof inputValues.value;
	required: boolean;
	min?: number;
	options?: string[] | Set<string> | Ref<string[] | undefined> | Ref<Set<string>>; // TODO тип
	isDisabled?: Ref<boolean>;
};

const eventInputs: {
	type: 'row' | 'column';
	name: string;
	label?: string;
	child: InputEvent[];
}[] = [
	{
		type: 'column',
		name: 'location',
		label: $translate('component.new_event_modal.fields.location'),
		child: [
			{
				type: 'datalist',
				name: 'country',
				options: computed(() => locationStore.countries),
				label: $translate('component.new_event_modal.fields.country'),
				required: true
			},
			{
				type: 'datalist',
				name: 'city',
				options: computed(() =>
					locationStore.getCitiesByCountry(inputValues.value.country)
				),
				label: $translate('component.new_event_modal.fields.city'),
				required: true,
				isDisabled: isCityDisabled
			},
			{
				type: 'datalist',
				name: 'timezone',
				options: allTimezones,
				label: $translate('component.new_event_modal.fields.timezone'),
				required: true,
				isDisabled: isTimezoneDisabled
			}
		]
	},
	{
		type: 'column',
		name: 'description',
		label: $translate('component.new_event_modal.fields.main_info'),
		child: [
			{
				type: 'text',
				label: $translate('component.new_event_modal.fields.title'),
				name: 'title',
				required: true
			},
			{
				type: 'textarea',
				label: $translate('component.new_event_modal.fields.description'),
				name: 'description',
				required: true
			}
		]
	},
	{
		type: 'row',
		name: 'startDate',
		label: $translate('component.new_event_modal.fields.start'),
		child: [
			{
				type: 'date',
				name: 'startDate',
				required: true
			},
			{
				type: 'time',
				name: 'startTime',
				required: true
			}
		]
	},
	{
		type: 'row',
		name: 'endDate',
		label: $translate('component.new_event_modal.fields.end'),
		child: [
			{
				type: 'date',
				name: 'endDate',
				required: true
			},
			{
				type: 'time',
				name: 'endTime',
				required: true
			}
		]
	},
	{
		type: 'row',
		name: 'price',
		label: $translate('component.new_event_modal.fields.price'),
		child: [
			{
				type: 'number',
				name: 'price',
				required: true,
				min: 0
			}
		]
	},
	{
		type: 'row',
		name: 'price',
		label: $translate('component.new_event_modal.fields.url_to_rigistration'),
		child: [
			{
				type: 'text',
				name: 'url',
				required: true,
				min: 0
			}
		]
	}
];
</script>

<template>
	<CommonModalWrapper
		:hide-overlay="false"
		overlay-transition="vfm-fade"
		overlay-transition-duration="2600"
		content-transition="vfm-fade"
		swipe-to-close="down"
		:click-to-close="true"
		:esc-to-close="true"
		:lock-scroll="true"
	>
		<div class="modal-card">
			<header class="modal-card__head">
				<h2 class="modal-card__title">
					{{ $translate('component.new_event_modal.title') }}
				</h2>
			</header>

			<form class="modal-card__body body">
				<div
					v-for="input in eventInputs"
					:key="input.name"
					class="body__section section"
				>
					<h3 class="section__subtitle">
						{{ input.label }}
					</h3>
					<div :class="input.type === 'column' ? 'section__column' : 'section__row'">
						<!-- TODO переписать это уродство с c.options -->
						<!-- TODO при создании ивента в случае datalist не работает автокомплит, хотя данные в даталист подтягиваются корректно -->
						<CommonInput
							v-for="c in input.child"
							:key="
								c.name +
								(c.options && 'value' in c.options
									? c.options.value
									: c.options
								)?.toString() +
								c.isDisabled
							"
							v-model="inputValues[c.name]"
							:input-disabled="c.isDisabled?.value ?? false"
							class="section__input"
							:input-type="c.type"
							:options-list="
								c.options && 'value' in c.options ? c.options.value : c.options
							"
							:input-placeholder="c.label"
							:input-name="c.name"
							:is-required="c.required"
						/>
					</div>
				</div>

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
					:is-disabled="!checkFormFilling || isLoading"
					:is-loading="isLoading"
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

	&__subtitle {
		font-weight: var(--font-size-L);
		margin-bottom: 12px;
	}

	&__column {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	&__row {
		display: flex;
		width: 100%;
		gap: 16px;
	}

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
