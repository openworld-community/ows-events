<script setup>
const mobile = inject('mobile');
</script>

<template>
	<div class="root">
		<HeaderCommon :has-back-button="mobile" />

		<UserUnauthorized />
	</div>
</template>
