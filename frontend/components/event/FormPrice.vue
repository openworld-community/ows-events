<script setup lang="ts">
import { useField } from 'vee-validate';
import { useLocationStore } from '@/stores/location.store';
import type { CurrencyType } from '../../../common/const/price';

const locationStore = useLocationStore();

const currencyField = useField<CurrencyType>(() => 'price.currency');
const valueField = useField<number>(() => 'price.val');
const isFreeField = useField<boolean>(() => 'isFree');
</script>
<template>
	<ModalUiModalSection
		type="column-row"
		:label="$t('form.event.fields.price')"
	>
		<template #child>
			<div>
				<CommonFormField
					:error="currencyField.errorMessage.value"
					:touched="currencyField.meta.touched"
				>
					<LibrarySelect
						v-model="currencyField.value.value"
						name="currency"
						:placeholder="$t('form.event.fields.currency_placeholder')"
						:options="locationStore.currencies"
						option-as-icon
						:error="
							currencyField.meta.touched && Boolean(currencyField.errorMessage.value)
						"
						:required="!isFreeField.value.value"
						:disabled="isFreeField.value.value"
					/>
				</CommonFormField>
				<CommonFormField
					:error="valueField.errorMessage.value"
					:touched="valueField.meta.touched"
				>
					<CommonUiBaseInput
						v-model="valueField.value.value"
						name="val"
						type="number"
						:error="valueField.meta.touched && Boolean(valueField.errorMessage.value)"
						:min-value="0"
						:required="!isFreeField.value.value"
						:placeholder="$t('form.event.fields.price_placeholder')"
						:disabled="isFreeField.value.value"
					/>
				</CommonFormField>
			</div>
			<CommonFormField
				:error="isFreeField.errorMessage.value"
				:touched="isFreeField.meta.touched"
			>
				<LibraryCheckbox
					v-model="isFreeField.value.value"
					name="isFree"
					:label="$t('form.event.fields.price_free')"
					is-reversed
				/>
			</CommonFormField>
		</template>
	</ModalUiModalSection>
</template>
