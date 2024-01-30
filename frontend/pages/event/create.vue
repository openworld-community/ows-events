<script setup lang="ts">
import { useLocationStore } from '@/stores/location.store';
import { useEventStore } from '../../stores/event.store';
import type { PostEventPayload } from '../../../common/types/event';
import { LocalStorageEnum } from '../../constants/enums/common';
import { getTimezone } from '../../services/timezone.services';
import { getCurrencyByCountry } from '../../utils/prices';
import { Tags, TagsArray } from '../../../common/const/tags';
import { Field, useForm } from 'vee-validate';

import * as yup from 'yup';
const locationStore = useLocationStore();
const eventStore = useEventStore();
const router = useRouter();
const localePath = useLocalePath();
const mobile = inject('mobile');

const schema = yup.object().shape({
	title: yup.string(),
	organizer: yup.string(),
	description: yup.string(),
	tags: yup.array(),
	startDate: yup.date().nullable(),
	startTime: yup.date().nullable(),
	endDate: yup.date().nullable(),
	endTime: yup.date().nullable(),
	isOnline: yup.boolean(),
	location: yup.object({
		country: yup.string(),
		city: yup.string(),
		address: yup.string()
	}),
	image: yup.string(),
	price: yup.object({
		value: yup.string(),
		currency: yup.string()
	}),
	timezone: yup.string(),
	url: yup.string(),
	isFree: yup.boolean()
});

onMounted(async () => {
	await eventStore.getTimezones();
	eventStore.setEventData();
});

// Запись в localStorage

const { values, errors, defineField, handleSubmit } = useForm({
	validationSchema: schema,
	initialValues: eventStore.eventData
});
// Изменение страны и города
const [title, titleProps] = defineField('title', {
	validateOnModelUpdate: false
});
const [isOnline, isOnlineProps] = defineField('isOnline', {
	validateOnModelUpdate: false
});
const [isFree, isFreeProps] = defineField('isFree', {
	validateOnModelUpdate: false
});
const [country] = defineField('location.country');
const [timezone] = defineField('timezone');
const submitEvent = handleSubmit((values) => console.log(JSON.stringify(values, null, 2)));
</script>

<template>
	<form
		class="event-form"
		@submit="submitEvent"
	>
		<CommonUiBaseInput
			v-model="title"
			error="errors.title"
			name="location.address"
			v-bind="titleProps"
			:placeholder="$t('form.event.fields.address_placeholder')"
			:disabled="false"
		/>

		<div>
			<CommonUiBaseCheckbox
				v-model="isOnline"
				value="isOnline"
				:label="$t('form.event.fields.online')"
				is-reversed
			/>
		</div>
		<CommonUiBaseSelect
			v-model="country"
			name="country"
			:placeholder="$t('global.country')"
			:list="locationStore.countries"
			:disabled="isOnline"
			input-readonly
			:required="!isOnline"
		/>
		<CommonUiBaseSelect
			v-model="timezone"
			name="timezone"
			:disabled="false"
			:placeholder="$t('global.timezone')"
			:list="eventStore.allTimezones"
			input-readonly
			required
		/>

		<CommonFormTags />
		<pre>values: {{ values }}</pre>
		<pre>errors: {{ errors }}</pre>
		<CommonButton
			class="event-form__button"
			button-kind="dark"
			:button-text="$t('global.button.save')"
			:is-loading="eventStore.eventData.isLoading"
			:is-disabled="false"
			type="submit"
		/>
	</form>
</template>

<style scoped lang="less">
.event-form {
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: center;
	overflow: hidden;
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
