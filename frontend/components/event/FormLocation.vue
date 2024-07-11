<script setup lang="ts">
import { useField } from 'vee-validate';
import { useLocationStore } from '../../stores/location.store';
import { useEventStore } from '../../stores/event.store';

const mobile = inject('mobile');
const { locale } = useI18n();

const locationStore = useLocationStore();
const eventStore = useEventStore();
locationStore.$reset();

const countryField = useField<string>(() => 'location.country');
const timeZoneField = useField<string>(() => 'timezone');
const isOnlineField = useField<boolean>(() => 'isOnline');

const cityField = useField<string>(() => 'location.city');
const addressField = useField<string>(() => 'location.address');
// иногда появляется ошибка, когда в pages/edit-[editid] стор не отрабатывает вовремя
//onBeforeMount(async () => {
//	await eventStore.getTimezones();
//});
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
					<LibraryCheckbox
						v-model="isOnlineField.value.value"
						name="isOnline"
						is-reversed
						:label="$t('form.event.fields.online')"
					/>
				</CommonFormField>
			</div>

			<ModalUiModalRawSection :type="mobile ? 'column' : 'row'">
				<CommonFormField
					:error="countryField.errorMessage.value"
					:touched="countryField.meta.touched"
				>
					<LibrarySelect
						v-model="countryField.value.value"
						name="country"
						:placeholder="$t('global.country')"
						:options="locationStore.countries"
						:disabled="isOnlineField.value.value"
						input-readonly
						:required="!isOnlineField.value.value"
						:error="
							countryField.meta.touched && Boolean(countryField.errorMessage.value)
						"
					/>
				</CommonFormField>
				<CommonFormField
					:error="cityField.errorMessage.value"
					:touched="cityField.meta.touched"
				>
					<LibraryOptimizedAutocomplete
						v-model="cityField.value.value"
						name="city"
						:disabled="!countryField.value.value || isOnlineField.value.value"
						:error="cityField.meta.touched && Boolean(cityField.errorMessage.value)"
						:placeholder="$t('global.city')"
						:options="locationStore.getCitiesByCountry(countryField.value.value)"
						:unfiltered-options="
							locationStore.getDefaultCitiesByCountry(
								countryField.value.value,
								locale
							)
						"
						:required="!isOnlineField.value.value"
					/>
				</CommonFormField>
				<CommonFormField
					:error="timeZoneField.errorMessage.value"
					:touched="timeZoneField.meta.touched"
				>
					<LibraryAutocomplete
						v-model="timeZoneField.value.value"
						name="timezone"
						:placeholder="$t('global.timezone')"
						:options="isOnlineField.value.value ? eventStore.allTimezones : []"
						:error="
							timeZoneField.meta.touched && Boolean(timeZoneField.errorMessage.value)
						"
						required
						:disabled="!isOnlineField.value.value"
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
					:required="!isOnlineField.value.value"
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
