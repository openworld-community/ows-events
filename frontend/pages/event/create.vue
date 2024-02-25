<script setup>
import { useLocationStore } from '@/stores/location.store';

const locationStore = useLocationStore();
const model = ref('');
const mode = ref('');
const currency = ref('');
const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);
</script>

<template>
	<div style="padding: 10px">
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
		<div style="width: 100px; height: 120px">
			<LibraryScrollArea>
				<div class="py-[15px] px-5">
					<div class="text-grass11 text-[15px] leading-[18px] font-semibold">Tags</div>
					<div
						v-for="tag in tags"
						:key="tag"
						class="text-mauve12 text-[13px] leading-[18px] mt-2.5 pt-2.5 border-t border-t-mauve6"
					>
						{{ tag }}
					</div>
				</div>
			</LibraryScrollArea>
		</div>
	</div>
</template>
