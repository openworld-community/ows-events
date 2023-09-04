<script setup lang="ts">
// import { supportedLocales } from '../../i18n';

import { useSwitchLocalePath } from '../../.nuxt/imports';

const { locale, setLocale } = useI18n();

const switchLocalePath = useSwitchLocalePath()

const language = computed(() => locale.value);


// onMounted(async () => {
// 	const storeLang = await $mainStoreForage.getItem('LANG')
// 	if (storeLang) language.value = storeLang
// 	else language.value = locale.value
// })


// $localStoreForage.getItem('LANG') as string ??
watch(language, (lang) => {
	setLocale(lang);
});

const sidebar = ref(null);
const selectorButton = ref(null);

const isSelectorOpen = ref(false);
const toggleSelector = () => {
	isSelectorOpen.value = !isSelectorOpen.value;
};

onClickOutside(sidebar, () => toggleSelector(), { ignore: [selectorButton] });
</script>

<template>
	<div class="language-selector">
		<CommonButton
			ref="selectorButton"
			is-icon
			:icon-name="`language/${language}`"
			:alt="$t('header.language_selector.label')"
			@click="toggleSelector"
		/>
		<ul
			v-if="isSelectorOpen"
			ref="sidebar"
			class="language-selector__sidebar"
		>
			<HeaderSidebarItem
				:link-to="switchLocalePath('ru')"
				:text="$t('header.language_selector.language.ru')"
				icon-name="language/ru"
				@click="toggleSelector"
			/>
			<HeaderSidebarItem
				:link-to="switchLocalePath('en')"
				:text="$t('header.language_selector.language.en')"
				icon-name="language/en"
				@click="toggleSelector"
			/>
		</ul>
	</div>
</template>
<style scoped lang="less">
.language-selector {
	display: flex;
	width: 100%;
	max-width: 32px;
	position: relative;
	padding: 4px;

	&__sidebar {
		display: flex;
		width: max-content;
		flex-direction: column;
		align-items: flex-end;
		position: absolute;
		top: -9px;
		right: 0;
		background-color: var(--color-white);
		box-shadow: var(--shadow-sidebar);
		border-radius: 6px;

		transition: transform 0.3s ease;
		transform: translateY(var(--header-height));
	}
}
</style>