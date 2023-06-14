<script setup lang="ts">
import { getAllTimezones, getTimezone } from '@/services/timezone.services';
import { useLocationStore } from '@/stores/location.store';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref, watch } from 'vue';
import { type EventOnPoster } from '../../../common/types';
import type { ImageLoaderFile } from '../common/ImageLoader.vue';
import BaseSelect from '~/components/common/ui/BaseSelect/BaseSelect.vue';
import BaseInput from '~/components/common/ui/BaseInput/BaseInput.vue';
import TextArea from '~/components/common/ui/TextArea/TextArea.vue';
import Datepicker from '~/components/common/ui/Datepicker/Datepicker.vue';
import ModalSection from './ui/ModalSection.vue';
import {stringToTimezone} from '../../utils/timezones';

const { $translate } = useNuxtApp();

type Props = {
	dataForEdit?: EventOnPoster;
	closeEventModal: () => void;
	refreshEvent: () => void;
};

const props = defineProps<Props>();
const locationStore = useLocationStore();
locationStore.loadCountries();
const { countries, cities } = storeToRefs(locationStore);

const isLoading = ref(false);
const newImageFile = ref<ImageLoaderFile>(null);

const allTimezones = ref<string[]>([]);

const loadAllTimezones = async () => {
	const _allTimezones = await getAllTimezones();
	if (!_allTimezones) return;

	allTimezones.value = _allTimezones.map((timezone) => timezoneToString(timezone));
};

await loadAllTimezones();

type inputValuesType = {
	id: string;
	title: string;
	description: string;
	startDate: Date | string;
	startTime: string;
	endDate: Date | string;
	endTime: string;
	country: string;
	city: string;
	image: string;
	price: number;
	timezone: string;
	url: string;
};

const inputValues = ref<inputValuesType>({
	id: '',
	title: '',
	description: '',
	startDate: '',
	startTime: '',
	endDate: '',
	endTime: '',
	country: '',
	city: '',
	image: '',
	price: 0,
	timezone: '',
	url: ''
});

onMounted(() => {
	if (props.dataForEdit) {
		setEventData(props.dataForEdit);
	}
});

const setEventData = (data: EventOnPoster) => {
	const start = timestampDateTimeParse(data.date, data.timezone);
	const end = timestampDateTimeParse(data.date + data.durationInSeconds, data.timezone);

	inputValues.value.id = data.id;
	inputValues.value.title = data.title;
	inputValues.value.description = data.description;
	inputValues.value.country = data.location.country;
	inputValues.value.city = data.location.city;
	inputValues.value.price = data.price;
	inputValues.value.startDate = start[0];
	inputValues.value.startTime = start[1];
	inputValues.value.endDate = end[0];
	inputValues.value.endTime = end[1];
	inputValues.value.image = data.image;
	inputValues.value.url = data.url;
};

watch(
	() => inputValues.value.country,
	(_country) => {
		if (!_country) {
			inputValues.value.city = '';
			return;
		}
		locationStore.pickCountry(_country);
	},
	{ deep: true }
);

watch(
	() => inputValues.value.city,
	(_city) => {
		locationStore.pickCity(_city);
	},
	{ deep: true }
);

watch(
	() => inputValues.value.country && inputValues.value.city,
	async () => {
		inputValues.value.timezone = '';

		inputValues.value.timezone = await getTimezone({
			country: inputValues.value.country,
			city: inputValues.value.city
		});
	},
	{ deep: true }
);

const checkFormFilling = computed(() => {
	return !!(
		inputValues.value.title &&
		inputValues.value.url &&
		inputValues.value.startDate &&
		inputValues.value.startTime &&
		inputValues.value.country &&
		inputValues.value.city &&
		inputValues.value.timezone &&
		allTimezones.value.includes(inputValues.value.timezone)
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
			inputValues.value.startDate as unknown as Date,
			inputValues.value.startTime,
			tz.timezoneOffset
		).getTime(),
		durationInSeconds: dateTime(
				inputValues.value.endDate as unknown as Date,
				inputValues.value.endTime,
				tz.timezoneOffset
			).getTime() -
			dateTime(
				inputValues.value.startDate as unknown as Date,
				inputValues.value.startTime,
				tz.timezoneOffset
			).getTime()
		,
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
			await apiRouter.events.image.delete.useMutation({ path: props.dataForEdit.image });
			image = '';
		}
		image = (await addImage(newImageFile.value)) ?? image;

		const event = Object.assign(paramsForSubmit.value, { id: inputValues.value.id, image });
		const { data } = await apiRouter.events.edit.useMutation({ event });

		if (data.value?.type === 'success') {
			props.refreshEvent();
		} else {
			console.error(data.value?.errors);
		}
	} else {
		const image = (await addImage(newImageFile.value)) ?? '';
		const event = Object.assign(paramsForSubmit.value, { image });
		const { data } = await apiRouter.events.add.useMutation({ event });
		if (data.value?.type === 'success') {
			await navigateTo(`/event/${data.value.data.id}`);
		}
	}

	closeModal();
	isLoading.value = false;
};

async function addImage(image: ImageLoaderFile) {
	if (!image || image === 'DELETED') return;
	const { data } = await apiRouter.events.image.add.useMutation({ image });
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
				<ModalSection
						:label="$translate('component.new_event_modal.fields.location')"
				>
					<template #child>
						<BaseSelect
								v-model="inputValues.country"
								name="country"
								:placeholder="$translate('global.country')"
								:list="countries"
						/>
						<BaseSelect
								:key="inputValues.country"
								v-model="inputValues.city"
								:input-disabled="isCityDisabled"
								name="city"
								:placeholder="$translate('global.city')"
								:list="cities"
						/>

						<BaseSelect
								:key="inputValues.timezone"
								v-model="inputValues.timezone"
								:input-disabled="isTimezoneDisabled"
								name="timezone"
								:placeholder="$translate('global.timezone')"
								:list="allTimezones"
						/>
					</template>
				</ModalSection>

				<ModalSection
						:label="$translate('component.new_event_modal.fields.main_info')"
				>
					<template #child>
						<BaseInput
								v-model="inputValues.title"
								name="title"
								:placeholder="$translate('component.new_event_modal.fields.title')"
						/>
						<TextArea
								v-model="inputValues.description"
								name="description"
								:placeholder="$translate('component.new_event_modal.fields.description')"
						/>
					</template>
				</ModalSection>

				<ModalSection
						:label="$translate('component.new_event_modal.fields.start')"
				>
					<template #child>
						<Datepicker
								v-model="inputValues.startDate"
								type="date"
								name="startDate"
						/>
						<Datepicker
								v-model="inputValues.startTime"
								type="time"
								name="startTime"
								placeholder="--:--"
						/>
					</template>
				</ModalSection>

				<ModalSection
						:label="$translate('component.new_event_modal.fields.end')"
				>
					<template #child>
						<Datepicker
								v-model="inputValues.endDate"
								type="date"
								name="endDate"
						/>
						<Datepicker
								v-model="inputValues.endTime"
								type="time"
								name="endTime"
								placeholder="--:--"
						/>
					</template>
				</ModalSection>


				<ModalSection
						:label="$translate('component.new_event_modal.fields.price')"
				>
					<template #child>
						<BaseInput
								v-model="inputValues.price"
								name="price"
								type="number"
								:placeholder="$translate('component.new_event_modal.fields.price')"
						/>
<!--						<BaseSelect-->
<!--								:key="inputValues.currency"-->
<!--								v-model="inputValues.currency"-->
<!--								:input-disabled="!inputValues.currency"-->
<!--								name="current"-->
<!--								:placeholder="$translate('global.city')"-->
<!--								:list="cities"-->
<!--						/>-->
					</template>
				</ModalSection>


				<ModalSection
						:label="$translate('component.new_event_modal.fields.url_to_rigistration')"
				>
					<template #child>
						<BaseInput
								v-model="inputValues.url"
								name="url"
						/>
					</template>
				</ModalSection>


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
