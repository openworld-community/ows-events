<script setup lang="ts">
const isNavbarOpen = ref<boolean>(false);
const navbarToggle = () => {
	isNavbarOpen.value = !isNavbarOpen.value;
};

const sidebar = ref(null);
const navigationBurger = ref(null);

onClickOutside(sidebar, () => navbarToggle(), { ignore: [navigationBurger] });
</script>
<template>
	<HeaderNavigationBurger
		ref="navigationBurger"
		:is-cross="isNavbarOpen"
		:aria-label="$t(isNavbarOpen ? 'header.burger.close' : 'header.burger.open')"
		@click="navbarToggle"
	/>
	<HeaderNavigationSidebar
		v-if="isNavbarOpen"
		ref="sidebar"
		@close="navbarToggle"
	/>
</template>
