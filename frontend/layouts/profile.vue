<script setup>
const mobile = inject('mobile');
const tablet = inject('tablet');
</script>

<template>
	<div class="root">
		<HeaderMobile v-if="mobile" />
		<HeaderTablet v-if="tablet" />
		<HeaderDesktop v-if="!mobile && !tablet" />
		<slot />

		<FooterCommon v-if="!mobile" />
	</div>
</template>
