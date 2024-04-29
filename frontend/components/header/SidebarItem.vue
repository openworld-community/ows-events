<script setup lang="ts">
import type { PropType } from 'vue';
import type { IconName } from '~/components/common/Icon.vue';
import { SeoItempropNavEnum } from '../../constants/enums/seo';

type NavItemKind = 'success';

const props = defineProps({
	linkTo: {
		// если есть ссылка, компонент NuxtLink, иначе - button
		type: [String, Object] as PropType<string | { name: string } | null>,
		default: null
	},
	isExternalLink: {
		// если необходимо открыть в новом окне
		type: Boolean,
		default: false
	},
	text: {
		type: String as PropType<string>,
		required: true
	},
	iconName: {
		type: String as PropType<IconName>,
		required: true
	},
	itemKind: {
		type: String as PropType<NavItemKind | ''>,
		default: ''
	}
});

const component = computed(() => {
	if (props.linkTo) return defineNuxtLink({});
	else return 'button';
});
</script>

<template>
	<li :class="['sidebar-item']">
		<component
			:is="component"
			:external="isExternalLink"
			:to="linkTo ? linkTo : null"
			:target="isExternalLink ? '_blank' : null"
			:class="['sidebar-item__item', itemKind ? `sidebar-item__item--${itemKind}` : '']"
			:itemprop="SeoItempropNavEnum.URL"
		>
			<span
				class="sidebar-item__text"
				:itemprop="SeoItempropNavEnum.NAME"
			>
				{{ text }}
			</span>
			<CommonIcon
				class="sidebar-item__icon"
				:name="iconName"
				:alt="text"
			/>
		</component>
	</li>
</template>

<style scoped lang="less">
.sidebar-item {
	display: flex;
	width: 100%;

	transition: background-color 0.3s ease;

	&:first-child {
		border-top-right-radius: 6px;
		border-top-left-radius: 6px;
	}

	&:last-child {
		border-bottom-right-radius: 6px;
		border-bottom-left-radius: 6px;
	}

	&:hover,
	&:focus,
	&:focus-visible {
		background-color: var(--color-background-secondary);
	}

	&:active {
		background-color: var(--color-accent-green-main-10);
	}

	&__item {
		display: flex;
		max-width: 240px;
		width: 100%;
		justify-content: flex-end;
		align-items: center;
		text-align: end;
		padding: 8px 18px 8px 16px;

		transition: background-color 0.3s ease;

		&--success {
			&::v-deep(svg) {
				color: var(--color-accent-green-main);
			}
		}

		&:focus-visible {
			background-color: var(--color-background-secondary);
		}
	}

	&__text {
		margin-right: 10px;
		line-height: 20px;

		@media (min-width: 768px) {
			font-size: var(--font-size-S);
		}
	}

	&__icon {
		min-width: 24px;
		color: var(--color-text-secondary);
	}
}

.router-link-exact-active {
	opacity: 0.7;
	cursor: default;

	span {
		text-decoration: underline;
	}
}
</style>
