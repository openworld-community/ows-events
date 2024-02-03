<script setup lang="ts">
import { useLocationStore } from '@/stores/location.store';
import { useEventStore } from '../../stores/event.store';
import { getInitialEventValues } from '../../utils/events';
import type { PostEventPayload } from '../../../common/types/event';
import { LocalStorageEnum } from '../../constants/enums/common';
import { getTimezone } from '../../services/timezone.services';
import { getCurrencyByCountry } from '../../utils/prices';
import { Tags, TagsArray } from '../../../common/const/tags';
import { Field, useForm, Form } from 'vee-validate';

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
		organizer: yup.string().required(),
		description: yup.string().required(),
		tags: yup.array().max(6),
		startDate: yup.date().nullable(),
		startTime: yup.object().nullable(),
		endDate: yup.date().nullable(),
		endTime: yup.object().nullable(),
		isOnline: yup.boolean(),
		location: yup.object().when(['isOnline'], {
			is: (val: boolean) => val !== true,
			then: (schema) =>
				schema.shape({
					country: yup.string().required(),
					city: yup.string().required(),
					address: yup.string().required()
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
						.required()
						.nullable(),
					currency: yup.string().required()
				}),
			otherwise: (schema) =>
				schema.shape({
					val: yup.number().transform((value) => (isNaN(value) ? undefined : value)),

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
const initialValues = getInitialEventValues();
// Запись в localStorage

const { values, errors, handleSubmit } = useForm({
	validateOnMount: true,
	validationSchema: schema,
	initialValues
});
// Изменение страны и города

const onSubmit = handleSubmit((values) => console.log(JSON.stringify(values, null, 2)));
</script>

<template>
	<form
		novalidate
		class="event-form"
		@submit="onSubmit"
	>
		<div class="event-form__title-wrapper">
			<h1 class="event-form__title">
				{{ $t('form.event.title') }}
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

				<p>errors: {{ JSON.stringify(errors) }}</p>
				<p>{{ JSON.stringify(values) }}</p>
			</div>
		</div>
		<div class="event-form__bottom-wrapper">
			<div class="event-form__bottom">
				<CommonButton
					class="event-form__button"
					button-kind="ordinary"
					:button-text="$t('global.button.cancel')"
					:is-active="!eventStore.eventData.isLoading"
					@click="router.back()"
				/>
				<CommonButton
					class="event-form__button"
					button-kind="dark"
					:button-text="$t('global.button.save')"
					:is-loading="eventStore.eventData.isLoading"
					:is-disabled="false"
					type="submit"
				/>
			</div>
		</div>
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
