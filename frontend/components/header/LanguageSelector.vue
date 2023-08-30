<script setup lang="ts">
// import { supportedLocales } from '../../i18n';

const { locale, setLocale } = useI18n();
const language = ref(locale.value);

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

const selectLanguage = () => {
	toggleSelector();
};
</script>

<template>
	<div class="language-selector">
		<CommonButton
			ref="selectorButton"
			is-icon
			icon-name="language/ru-RU"
			:alt="$t('header.language_selector.label')"
			@click="toggleSelector"
		/>
		<ul
			v-if="isSelectorOpen"
			ref="sidebar"
			class="language-selector__sidebar"
		>
			<HeaderSidebarItem
				component-type="radio"
				:text="$t('header.language_selector.language.ru')"
				icon-name="language/ru-RU"
				@click="selectLanguage"
			/>
			<HeaderSidebarItem
				component-type="radio"
				:text="$t('header.language_selector.language.en')"
				icon-name="language/en-USA"
				@click="selectLanguage"
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