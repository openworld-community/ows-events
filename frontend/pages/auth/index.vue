<script setup>
const mobile = inject('mobile');
</script>

<template>
	<div class="root">
		<HeaderCommon
			v-if="mobile"
			:has-back-button="mobile"
		/>
		<UserUnauthorized />
	</div>
</template>
