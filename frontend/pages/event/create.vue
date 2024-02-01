<script setup lang="ts">
import { useLocationStore } from '@/stores/location.store';
import { useEventStore } from '../../stores/event.store';
import { getInitialEventValues } from '../../utils/events';
import type { PostEventPayload } from '../../../common/types/event';
import { LocalStorageEnum } from '../../constants/enums/common';
import { getTimezone } from '../../services/timezone.services';
import { getCurrencyByCountry } from '../../utils/prices';
import { Tags, TagsArray } from '../../../common/const/tags';
import { Field, useForm } from 'vee-validate';

import * as yup from '../../yup';
const locationStore = useLocationStore();
const eventStore = useEventStore();
const router = useRouter();
const localePath = useLocalePath();
const mobile = inject('mobile');

const schema = yup.object().shape({
	title: yup.string().required(),
	organizer: yup.string(),
	description: yup.string(),
	tags: yup.array(),
	startDate: yup.date().nullable(),
	startTime: yup.date().nullable(),
	endDate: yup.date().nullable(),
	endTime: yup.date().nullable(),
	isOnline: yup.boolean(),
	location: yup.object({
		country: yup.string().required(),
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
	initialValues: getInitialEventValues()
});
// Изменение страны и города
const [title] = defineField('title');
const [isOnline, isOnlineProps] = defineField('isOnline', {
	validateOnModelUpdate: false
});
const [isFree, isFreeProps] = defineField('isFree', {
	validateOnModelUpdate: false
});
const [country] = defineField('location.country');
const [city] = defineField('location.city');
const [timezone] = defineField('timezone');
const [address] = defineField('location.address');
const submitEvent = handleSubmit((values) => console.log(JSON.stringify(values, null, 2)));
console.log('errors', errors, errors['title']);
</script>

<template>
	<form
		class="event-form"
		@submit="submitEvent"
	>
		<div class="event-form__title-wrapper">
			<h1 class="event-form__title">
				{{ $t('form.event.title') }}
			</h1>
		</div>

		<div class="event-form__fields-wrapper">
			<div class="event-form__fields">
				<ModalUiModalSection
					:label="$t('form.event.fields.location')"
					:type="mobile ? 'column' : 'column-row'"
				>
					<template #child>
						<div>
							<CommonUiBaseCheckbox
								v-model="isOnline"
								value="isOnline"
								:label="$t('form.event.fields.online')"
								is-reversed
							/>
							<CommonErrorComponent :error="JSON.stringify(errors.isOnline)" />
						</div>
						<div>
							<CommonUiBaseSelect
								v-model="country"
								name="country"
								:placeholder="$t('global.country')"
								:list="locationStore.countries"
								:disabled="values.isOnline"
								input-readonly
								:required="!values.isOnline"
								:error="JSON.stringify(errors['location.country'])"
							/>

							<CommonUiBaseSelect
								v-model="city"
								name="city"
								:disabled="!values.location.country"
								:placeholder="$t('global.city')"
								:list="
									locationStore.getCitiesByCountry(
										eventStore.eventData.location.country
									)
								"
								input-readonly
								:required="!values.isOnline"
							/>

							<CommonUiBaseSelect
								v-model="timezone"
								name="timezone"
								:placeholder="$t('global.timezone')"
								:list="eventStore.allTimezones"
								input-readonly
								required
							/>
						</div>
						<CommonUiBaseInput
							v-model="address"
							name="address"
							:placeholder="$t('form.event.fields.address_placeholder')"
							:disabled="!(values.location.country && values.location.city)"
						/>
					</template>
				</ModalUiModalSection>
				<CommonUiBaseInput
					v-model="title"
					:error="JSON.stringify(errors.title)"
					name="title"
					:placeholder="$t('form.event.fields.title')"
					:disabled="false"
				/>
				<p>{{ JSON.stringify(errors.title) }}</p>
				<CommonErrorComponent :error="JSON.stringify(errors)" />

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
					v-model="eventStore.allTimezones"
					name="timezone"
					:disabled="false"
					:placeholder="$t('global.timezone')"
					:list="eventStore.allTimezones"
					input-readonly
					required
				/>

				<CommonFormTags />
				<CommonFormDatapicker
					:placeholder="$t('form.event.fields.date_placeholder')"
					name="startDate"
					type="date"
				/>

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
