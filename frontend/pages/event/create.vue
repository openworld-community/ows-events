<script setup lang="ts">
import { useLocationStore } from '@/stores/location.store';
import { useEventStore } from '../../stores/event.store';
import { getEventPayload, getInitialEventFormValues } from '../../utils/events';
import type { EventFormType, PostEventPayload } from '../../../common/types/event';
import { LocalStorageEnum } from '../../constants/enums/common';
import { getTimezone, getUserTimezone } from '../../services/timezone.services';
import { timezoneToString } from '../../.nuxt/imports';

import { getCurrencyByCountry } from '../../utils/prices';
import { type Time } from '../../../common/types/event';

import { useForm } from 'vee-validate';

import { toTypedSchema } from '@vee-validate/yup';
import * as yup from '../../yup';

const locationStore = useLocationStore();
const eventStore = useEventStore();
const router = useRouter();
const localePath = useLocalePath();
const mobile = inject('mobile');

const schema = toTypedSchema(
	yup.object().shape({
		title: yup.string().required(),
		organizer: yup.string(),
		description: yup.string().required(),
		tags: yup.array().max(6),
		startDate: yup.date().required(),
		startTime: yup.object().required(),
		endDate: yup
			.date()
			.nullable()
			.test('is-date-less', 'validation.test.endDate', function (endDate) {
				if (endDate) {
					const { startDate } = this.parent;

					return startDate?.toDateString() <= endDate?.toDateString();
				}
				return true;
			}),
		endTime: yup
			.object()
			.shape({
				hours: yup.mixed(),
				minutes: yup.mixed(),
				seconds: yup.mixed()
			})
			.nullable()
			.test('is-time-less', 'validation.test.endTime', function (endTime: Time) {
				if (endTime) {
					const { startDate, startTime, endDate } = this.parent;
					if (endDate !== null) {
						const diff = Math.floor(
							(combineDateTime(endDate, endTime).getTime() -
								combineDateTime(startDate, startTime).getTime()) /
								1000
						);

						return diff > 0;
					}

					return true;
				}
			})
			.nullable(),
		isOnline: yup.boolean(),
		location: yup.object().when(['isOnline'], {
			is: (val: boolean) => val !== true,
			then: (schema) =>
				schema.shape({
					country: yup.string().required(),
					city: yup.string().required(),
					address: yup.string().required()
				}),
			otherwise: (schema) =>
				schema.shape({
					country: yup.string().nullable(),
					city: yup.string().nullable(),
					address: yup.string().nullable()
				})
		}),

		image: yup.string(),
		price: yup.object().when(['isFree'], {
			is: (val: boolean) => val !== true,
			then: (schema) =>
				schema.shape({
					val: yup
						.number()
						.transform((value) => (isNaN(value) ? undefined : value))
						.positive()
						.required(),

					currency: yup.string().required()
				}),
			otherwise: (schema) =>
				schema.shape({
					val: yup
						.number()
						.transform((value) => (isNaN(value) ? undefined : value))
						.nullable(),

					currency: yup.string()
				})
		}),

		timezone: yup.string().when(['isOnline'], {
			is: (val: boolean) => val !== true, // alternatively: (val) => val == true
			then: (schema) => schema.required()
		}),
		url: yup.string().isValidLink().required(),
		isFree: yup.boolean()
	})
);

onMounted(async () => {
	await eventStore.getTimezones();
	eventStore.setEventData();
});

const initialValues = getInitialEventFormValues();

const { values, errors, setValues, handleSubmit } = useForm<EventFormType>({
	validateOnMount: true,
	validationSchema: schema,
	initialValues
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
			!locationStore._citiesByCountry.get(country).includes(values['location']['city'])
		) {
			setValues({
				location: {
					city: '',
					address: ''
				},
				timezone: ''
			});
		}
		if (country) {
			if (!values['location']['city']) {
				alert('khlknlnl');
				const newTimezone = await getTimezone(country, values['location']['city']);
				alert(newTimezone);
				setValues({
					timezone: newTimezone
				});
			}

			if (!values['isFree']) {
				setValues({
					price: {
						currency: getCurrencyByCountry(country)
					}
				});
			}
		} else {
			setValues({
				price: {
					currency: ''
				}
			});
		}
	},
	{ deep: true }
);

watch(
	() => values['isOnline'],
	(online) => {
		if (online) {
			setValues({
				location: {
					city: '',
					country: '',
					address: ''
				},
				timezone: ''
			});
		}
	},

	{ deep: true }
);

watch(
	() => values['location']['city'],
	async (city) => {
		if (city) {
			setValues({
				timezone: await getTimezone(
					values['location']['country'],
					values['location']['city']
				)
			});
		} else {
			setValues({ location: { address: '' } });
		}
	},
	{ deep: true }
);
watch(
	() => values['isOnline'],
	(online) => {
		if (online) {
			setValues({
				location: {
					country: '',
					city: '',
					address: ''
				},
				timezone: timezoneToString(getUserTimezone())
			});
		}
	}
);

watch(
	() => values['isFree'],
	(free) => {
		if (free) {
			setValues({
				price: {
					currency: '',
					val: null
				}
			});
		}
	},

	{ deep: true }
);

const onSubmit = handleSubmit(async (values: EventFormType) => {
	console.log(JSON.stringify(values, null, 2));
	const payload = getEventPayload(values);
	alert(JSON.stringify(payload, null, 2));

	try {
		const { data } = await apiRouter.events.add.useMutation({
			data: { event: payload }
		});
		localStorage.removeItem(LocalStorageEnum.EVENT_DATA);
		alert(JSON.stringify(data));
		await navigateTo(localePath(`/event/${data.value.id}`));
	} catch (error) {
		alert(JSON.stringify(`${error}errrrrrrrroooo`));
	}
});
</script>

<template>
	<div
		novalidate
		class="event-form"
	>
		<div class="event-form__title-wrapper">
			<h1 class="event-form__title">
				{{ $t('form.event.title') }}
			</h1>
		</div>

		<form
			class="event-form__fields-wrapper"
			novalidate
			@submit="onSubmit"
		>
			<div class="event-form__fields">
				<EventFormLocation />

				<EventFormMaininfo />
				<EventFormDate />
				<EventFormPrice />

				<EventFormRegistration />
				<EventFormImage />
				<p class="event-form__required">{{ $t('form.global.required') }}</p>
			</div>
			<div class="event-form__bottom-wrapper">
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
						button-kind="dark"
						:button-text="$t('global.button.save')"
						:is-loading="isLoading"
						:is-disabled="false"
						type="submit"
					/>
				</div>
			</div>
		</form>
	</div>
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
		flex-grow: 1;
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
