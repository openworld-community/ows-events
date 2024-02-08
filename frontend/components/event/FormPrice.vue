<script setup lang="ts">
import { useField } from 'vee-validate';
import { useLocationStore } from '@/stores/location.store';

const locationStore = useLocationStore();

const { value: currency, errorMessage: currencyError } = useField<string>(() => 'price.currency');
const { value: val, errorMessage: valueError } = useField<number>(() => 'price.val');
const { value: isFree, errorMessage: isFreeError } = useField<boolean>(() => 'isFree');
</script>
<template>
	<ModalUiModalSection
		type="column-row"
		:label="$t('form.event.fields.price')"
	>
		<template #child>
			<div>
				<CommonFormField :error="currencyError">
					<CommonUiBaseSelect
						v-model="currency"
						name="currency"
						:placeholder="$t('form.event.fields.currency_placeholder')"
						:list="locationStore.currencies"
						has-icon-items
						:error="JSON.stringify(currencyError)"
						input-readonly
						:required="!isFree"
						:disabled="isFree"
					/>
				</CommonFormField>
				<CommonFormField :error="valueError">
					<CommonUiBaseInput
						v-model="val"
						name="val"
						type="number"
						:error="JSON.stringify(valueError)"
						:min-value="0"
						:required="!isFree"
						:placeholder="$t('form.event.fields.price_placeholder')"
						:disabled="isFree"
					/>
				</CommonFormField>
			</div>
			<CommonFormField :error="isFreeError">
				<CommonUiBaseCheckbox
					v-model="isFree"
					value="isFree"
					:label="$t('form.event.fields.price_free')"
					is-reversed
				/>
			</CommonFormField>
		</template>
	</ModalUiModalSection>
</template>
