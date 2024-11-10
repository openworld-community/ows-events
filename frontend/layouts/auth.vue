<script setup>
const mobile = inject('mobile');
</script>

<template>
	<div class="root">
		<HeaderMobile v-if="mobile" />
		<slot />
	</div>
</template>
