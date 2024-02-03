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

const props = defineProps({});

const locationStore = useLocationStore();
const eventStore = useEventStore();

const { value: country, errorMessage: countryError } = useField<string>(() => 'location.country');
const { value: timezone, errorMessage: timezoneError } = useField<string>(() => 'timezone');
const { value: isOnline, errorMessage: isOnlineError } = useField<boolean>(() => 'isOnline');

const { value: city, errorMessage: cityError } = useField<string>(() => 'location.city');
const { value: address, errorMessage: addressError } = useField<string>(() => 'location.address');

//const { values, errors, defineField } = useForm();

//const [timezone] = defineField('timezone');
</script>
<template>
	<ModalUiModalSection
		:label="$t('form.event.fields.location')"
		:type="mobile ? 'column' : 'column-row'"
	>
		<template #child>
			<div>
				<CommonFormField :error="isOnlineError">
					<CommonUiBaseCheckbox
						v-model="isOnline"
						value="isOnline"
						:label="$t('form.event.fields.online')"
						is-reversed
					/>
				</CommonFormField>
			</div>
			<div>
				<CommonFormField :error="countryError">
					<CommonUiBaseSelect
						v-model="country"
						name="country"
						:placeholder="$t('global.country')"
						:list="locationStore.countries"
						:disabled="isOnline"
						input-readonly
						:required="!isOnline"
						:error="JSON.stringify(countryError)"
					/>
				</CommonFormField>
				<CommonFormField :error="cityError">
					<CommonUiBaseSelect
						v-model="city"
						name="city"
						:disabled="!country"
						:error="JSON.stringify(cityError)"
						:placeholder="$t('global.city')"
						:list="locationStore.getCitiesByCountry(country)"
						input-readonly
						:required="!isOnline"
					/>
				</CommonFormField>
				<CommonFormField :error="timezoneError">
					<CommonUiBaseSelect
						v-model="timezone"
						name="timezone"
						:placeholder="$t('global.timezone')"
						:list="eventStore.allTimezones"
						input-readonly
						:error="JSON.stringify(timezoneError)"
						required
					/>
				</CommonFormField>
			</div>
			<CommonFormField :error="addressError">
				<CommonUiBaseInput
					v-model="address"
					name="address"
					:error="JSON.stringify(addressError)"
					:placeholder="$t('form.event.fields.address_placeholder')"
					:disabled="!(country && city)"
				/>
			</CommonFormField>

			<CommonCheckLocation
				:is-show="!!(country && city)"
				:location="{ city: city, country: country, address: address }"
			/>
		</template>
	</ModalUiModalSection>
</template>
