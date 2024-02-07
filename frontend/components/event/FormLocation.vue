import type { stringify } from 'querystring'; import type { useForm } from 'vee-validate'; import
type { stringify } from 'querystring'; import type { useForm } from 'vee-validate'; import type {
stringify } from 'querystring'; import type { useForm } from 'vee-validate'; import type {
useFormValues } from 'vee-validate'; import type { CommonCheckLocation } from '#build/components';
import type { error } from 'console'; import type { error } from 'console';
<script setup lang="ts">
import { useField } from 'vee-validate';
import { useLocationStore } from '@/stores/location.store';
import { useEventStore } from '../../stores/event.store';

const mobile = inject('mobile');

const locationStore = useLocationStore();
const eventStore = useEventStore();

const countryField = useField<string>(() => 'location.country');
const timeZoneField = useField<string>(() => 'timezone');
const isOnlineField = useField<boolean>(() => 'isOnline');

const cityField = useField<string>(() => 'location.city');
const addressField = useField<string>(() => 'location.address');
</script>
<template>
	<ModalUiModalLocationSection
		:label="$t('form.event.fields.location')"
		:type="'column'"
	>
		<template #child>
			<div>
				<CommonFormField
					:error="isOnlineField.errorMessage.value"
					:touched="isOnlineField.meta.touched"
				>
					<CommonUiBaseCheckbox
						v-model="isOnlineField.value.value"
						value="isOnline"
						:label="$t('form.event.fields.online')"
						is-reversed
					/>
				</CommonFormField>
			</div>

			<ModalUiModalRawSection :type="mobile ? 'column' : 'row'">
				<CommonFormField
					:error="countryField.errorMessage.value"
					:touched="countryField.meta.touched"
				>
					<CommonUiBaseSelect
						v-model="countryField.value.value"
						name="country"
						:placeholder="$t('global.country')"
						:list="locationStore.countries"
						:disabled="isOnlineField.value.value"
						input-readonly
						:required="!isOnlineField.value.value"
						:error="
							countryField.errorMessage.value &&
							Boolean(countryField.errorMessage.value)
						"
					/>
				</CommonFormField>
				<CommonFormField
					:error="cityField.errorMessage.value"
					:touched="cityField.meta.touched"
				>
					<CommonUiBaseSelect
						v-model="cityField.value.value"
						name="city"
						:disabled="!countryField.value.value || isOnlineField.value.value"
						:error="cityField.meta.touched && Boolean(cityField.errorMessage.value)"
						:placeholder="$t('global.city')"
						:list="locationStore.getCitiesByCountry(countryField.value.value)"
						input-readonly
						:required="!isOnlineField.value.value"
					/>
				</CommonFormField>
				<CommonFormField
					:error="timeZoneField.errorMessage.value"
					:touched="timeZoneField.meta.touched"
				>
					<CommonUiBaseSelect
						v-model="timeZoneField.value.value"
						name="timezone"
						:placeholder="$t('global.timezone')"
						:list="eventStore.allTimezones"
						input-readonly
						:error="
							timeZoneField.meta.touched && Boolean(timeZoneField.errorMessage.value)
						"
						required
						:disabled="!countryField.value.value && !isOnlineField.value.value"
					/>
				</CommonFormField>
			</ModalUiModalRawSection>

			<CommonFormField
				:error="addressField.errorMessage.value"
				:touched="addressField.meta.touched"
			>
				<CommonUiBaseInput
					v-model="addressField.value.value"
					name="address"
					:error="addressField.meta.touched && Boolean(addressField.errorMessage.value)"
					:placeholder="$t('form.event.fields.address_placeholder')"
					:disabled="
						!(countryField.value.value && cityField.value.value) ||
						isOnlineField.value.value
					"
				/>
			</CommonFormField>

			<CommonCheckLocation
				:is-show="!!(countryField.value.value && cityField.value.value)"
				:location="{
					city: cityField.value.value,
					country: countryField.value.value,
					address: addressField.value.value
				}"
			/>
		</template>
	</ModalUiModalLocationSection>
</template>
