<script setup lang="ts">
import { TOKEN_MAX_AGE_SECONDS } from '../../constants/defaultValues/time';
import { CookieNameEnum } from '../../constants/enums/common';

const { locale } = useI18n();

const switchLocalePath = useSwitchLocalePath();

const language = computed(() => locale.value);

watch(locale, (loc) => {
	useCookie(CookieNameEnum.LOCALE, { maxAge: TOKEN_MAX_AGE_SECONDS }).value = loc;
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
			:title="$t('header.language_selector.label')"
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
				text="Русский"
				icon-name="language/ru"
				:current="language === 'ru'"
				@click="toggleSelector"
			/>
			<HeaderSidebarItem
				:link-to="switchLocalePath('en')"
				text="English"
				icon-name="language/en"
				:current="language === 'en'"
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
		min-width: 150px;
		flex-direction: column;
		align-items: flex-end;
		position: absolute;
		top: -10px;
		right: 0;
		background-color: var(--color-white);
		box-shadow: var(--shadow-sidebar);
		border-radius: 6px;

		transition: transform 0.3s ease;
		transform: translateY(var(--header-height));
	}
}
</style>
