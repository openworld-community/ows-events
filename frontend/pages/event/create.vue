<script setup lang="ts">
import { useLocationStore } from '@/stores/location.store';

const locationStore = useLocationStore();
const model = ref('');
const mode = ref('');
const currency = ref('');
const autocomplete = ref('')
const autocomplete1 = ref('')
const autocomplete2 = ref('')
const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);
</script>

<template>
	<div style="padding: 10px; height: 100dvh; display: flex; flex-direction: column; gap: 20px">
		{{ model }}
		<LibrarySelect
			v-model="model"
			placeholder="Choose fruit"
			:options="[
				{ label: 'banana', value: 'valBanana' },
				{ label: 'apple', value: 'valapple' },
				{ label: 'orange', value: 'valorange' },
				{ label: 'pinapple', value: 'valpinapple' },
				{ label: 'apricot', value: 'valapricot' },
				{ label: 'peach', value: 'valpeach' }
			]"
		/>
		<div style="margin: 40px">
			<LibrarySelect
				v-model="mode"
				placeholder="Choose fruit"
				:options="['banana', 'apple', 'orange']"
			/>
		</div>
		<div style="margin: 40px">
			<LibrarySelect
				v-model="currency"
				placeholder="Choose fruit"
				:options="locationStore.currencies"
				name="currency"
				option-as-icon
			/>
		</div>
		<div style="width: 100px">
			<LibraryScrollArea>
				<div>
					<div>Tags</div>
					<div
						v-for="tag in tags"
						:key="tag"
					>
						{{ tag }}
					</div>
				</div>
			</LibraryScrollArea>
		</div>
		<div>---------separator----------</div>
		<div style="width: 20%">
			<LibraryAutocomplete
				v-model="autocomplete"
				disabled
				placeholder="placeholder"
				:options="[
					'apple',
					'banana',
					'cucumber',
					'tomato',
					'onion',
				]"
			/>
		</div>
		<div style="width: 20%">
			<LibraryAutocomplete
				v-model="autocomplete1"
				placeholder="placeholder"
				error
				:options="[
					{ label: 'banana', value: 'valBanana' },
					{ label: 'apple', value: 'valapple' },
					{ label: 'orange', value: 'valorange' },
					{ label: 'pinapple', value: 'valpinapple' },
					{ label: 'apricot', value: 'valapricot' },
					{ label: 'peach', value: 'valpeach' }
				]"
			/>
		</div>
		<div style="width: 20%">
			<LibraryAutocomplete
				v-model="autocomplete2"
				placeholder="placeholder"
				:options="locationStore.currencies"
				name="currency"
				option-as-icon
				required
				label="form.event.fields.currency_placeholder"
			/>
		</div>
	</div>
</template>
