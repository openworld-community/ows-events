<script setup lang="ts">
import { useEventStore } from '../../stores/event.store';
import { getEventPayload } from '../../utils/events';
import type { EventFormType } from '../../../common/types/event';
import { LocalStorageEnum } from '../../constants/enums/common';

import { useForm } from 'vee-validate';
import { eventValidationSchema } from '~/components/event/eventValidationSchema';
import { useLocationStore } from '~/stores/location.store';
import { getTimezone, getUserTimezone } from '~/services/timezone.services';

const locationStore = useLocationStore();
const eventStore = useEventStore();

const schema = eventValidationSchema;

onMounted(async () => {
	await eventStore.getTimezones();
});
const props = defineProps({
	title: {
		type: String,
		default: ''
	},
	initialValues: {
		type: Object as PropType<EventFormType>,
		default: () => {}
	}
});

const emit = defineEmits(['submitEvent', 'cancelEvent']);

const dataFromLocalStorage = (initialValues: EventFormType) => {
	const parsedData = JSON.parse(localStorage.getItem(LocalStorageEnum.EVENT_DATA));
	const copy = { ...initialValues };
	for (const key in copy) {
		if (key in parsedData) {
			copy[key] = parsedData[key];
		}
	}

	if (copy.startDate) {
		copy.startDate = new Date(copy.startDate);
	}
	if (copy.endDate) {
		copy.endDate = new Date(copy.endDate);
	}

	return copy;
};

const { values, handleSubmit, setFieldValue } = useForm<EventFormType>({
	validationSchema: schema,
	initialValues:
		localStorage.getItem(LocalStorageEnum.EVENT_DATA) !== null
			? dataFromLocalStorage(props.initialValues)
			: props.initialValues
});
const isLoading = ref(false);

// Запись в localStorage
watch(
	() => values,
	(values) => {
		localStorage.setItem(LocalStorageEnum.EVENT_DATA, JSON.stringify(values));
	},
	{ deep: true }
);

// Изменение страны и города
watch(
	() => values['location']['country'],
	async (country) => {
		if (
			!country ||
			!locationStore._citiesByCountry.get(country)?.includes(values['location']['city'])
		) {
			setFieldValue('location.city', '');
			setFieldValue('location.address', '');
			setFieldValue('timezone', '');
		}
		if (country) {
			if (!values['isFree']) {
				const currency = getCurrencyByCountry(country);
				setFieldValue('price.currency', currency);
			}
		} else {
			setFieldValue('price.currency', '');
		}
	},
	{ deep: true }
);

watch(
	() => values['location']['city'],
	async (city) => {
		if (city) {
			const timezone = await getTimezone(values['location']['country'], city);
			setFieldValue('timezone', timezone);
		}
		setFieldValue('location.address', '');
	},
	{ deep: true }
);

watch(
	() => values['isOnline'],
	async (online) => {
		if (online) {
			if (values['location']['country']) {
				setFieldValue('location.country', '');
			}
			if (values['location']['city']) {
				setFieldValue('location.city', '');
			}
			if (values['location']['address']) {
				setFieldValue('location.address', '');
			}
			const timeZone = timezoneToString(getUserTimezone());
			setFieldValue('timezone', timeZone);
		} else {
			setFieldValue('timezone', '');
		}
	},
	{ deep: true }
);

watch(
	() => values['isFree'],
	(free) => {
		if (free) {
			if (values['price']['currency']) {
				setFieldValue('price.currency', '');
			}
			if (values['price']['val']) {
				setFieldValue('price.val', null);
			}
		}
	},
	{ deep: true }
);
watch(
	() => values['endDate'],
	(end) => {
		if (!end) {
			setFieldValue('endTime', null);
		}
	},
	{ deep: true }
);

// Изменение даты и времени
watch(
	[() => values['startDate'], () => values['startTime'], () => values['endDate']],
	([startDate, startTime, endDate]) => {
		if (!startDate) setFieldValue('startTime', null);
		if (!startTime) setFieldValue('endDate', null);
		if (!endDate) setFieldValue('endTime', null);
	},
	{ deep: true }
);

const onSubmit = handleSubmit(
	async (values: EventFormType) => {
		const payload = getEventPayload(values);

		isLoading.value = true;

		emit('submitEvent', payload);
		isLoading.value = false;
	},
	() => {
		document.getElementsByClassName('validation_error')[0].scrollIntoView({
			behavior: 'smooth'
		});
	}
);
</script>

<template>
	<form
		class="event-form"
		novalidate
		@submit.prevent="onSubmit"
	>
		<div class="event-form__title-wrapper">
			<h1 class="event-form__title">
				{{ title }}
			</h1>
		</div>

		<div class="event-form__fields-wrapper">
			<div class="event-form__fields">
				<EventFormLocation />

				<EventFormMaininfo />
				<EventFormDate />
				<EventFormPrice />

				<EventFormRegistration />
				<EventFormImage />
				<p class="event-form__required">{{ $t('form.global.required') }}</p>
			</div>
		</div>
		<div class="event-form__bottom-wrapper">
			<div class="event-form__bottom">
				<CommonButton
					class="event-form__button"
					button-kind="ordinary"
					:button-text="$t('global.button.cancel')"
					:is-active="!isLoading"
					@click="emit('cancelEvent')"
				/>
				<CommonButton
					class="event-form__button"
					button-kind="success"
					:button-text="$t('global.button.save')"
					:is-loading="isLoading"
					:is-disabled="false"
					type="submit"
				/>
			</div>
		</div>
		<EventFormModalConfirmChanged v-if="eventStore.showClearFormModal" />
	</form>
</template>

<style scoped lang="less">
.event-form {
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: center;
	overflow: hidden;
	height: 100%;
	max-height: 100vh;

	// Для адаптивной height на iOs
	@supports (-webkit-touch-callout: none) {
		max-height: -webkit-fill-available;
	}

	&__title-wrapper {
		display: flex;
		width: 100%;
		justify-content: center;
		background-color: var(--color-background-secondary);
	}

	&__title {
		width: 100%;
		max-width: 1200px;
		text-align: left;
		font-size: var(--font-size-XL);
		font-weight: var(--font-weight-regular);
		padding: 12px var(--padding-side);

		@media (min-width: 768px) {
			padding: 30px var(--padding-side);
		}
	}

	&__fields-wrapper {
		width: 100%;
		overflow-y: auto;
	}

	&__fields {
		display: flex;
		width: 100%;
		max-width: 1200px;
		flex-direction: column;
		margin-left: auto;
		margin-right: auto;
		padding: 20px var(--padding-side);
	}

	&__tags {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		gap: 10px;
	}

	&__required {
		font-size: var(--font-size-XS);
		line-height: 18px;
		color: var(--color-text-secondary);
		margin-top: var(--space-unrelated-items);
	}

	&__bottom-wrapper {
		display: flex;
		width: 100%;
		justify-content: center;
		background-color: var(--color-background-secondary);
	}

	&__bottom {
		display: flex;
		width: 100%;
		max-width: 1200px;
		justify-content: space-between;
		padding: 12px var(--padding-side);

		@media (min-width: 768px) {
			padding: 30px var(--padding-side);
		}
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
