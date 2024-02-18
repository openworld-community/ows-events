<script setup>
const model = ref('');
const mode = ref('');
</script>

<template>
	<div>
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
				:options="['banana', 'apple', 'orange', 'pinapple']"
			/>
		</div>
	</div>
</template>
