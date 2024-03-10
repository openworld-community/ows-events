<script setup lang="ts">
import { useLocationStore } from '@/stores/location.store';

const locationStore = useLocationStore();
const model = ref('');
const mode = ref('');
const currency = ref('');
const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

const titleText = "Logout";
const descriptionText = "Are you're shure that you want to leave us?";
const handleDialogClose = () => {
  // Ваша логика при закрытии диалога
  console.log('Dialog closed!');
};

</script>

<template>
	<div style="padding: 10px; height: 100dvh; display: flex; flex-direction: column; gap: 20px;">
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
		<div style="width: 100px;">
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
		<div>
			---------separator----------
		</div>
		<div style="width: 20%;">
			<LibraryUiItemAutocomplete
				:no-border="true"
				placeholder="placeholder"
			/>
		</div>
		<div style="width: 20%;">
			<LibraryUiItemAutocomplete placeholder="placeholder" />
		</div>
		<div>
		-------------Dialog--------------------
		</div>
		<div style="width: 100px; height: 20px; background-color: brown;">
			<LibraryDialog
			:dialogTitleText="titleText"
      		:dialogDescriptionText="descriptionText"
			:dialogCustomFunction=handleDialogClose
    	/></div>

	</div></template>
