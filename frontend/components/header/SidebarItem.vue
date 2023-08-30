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
		type: Boolean as PropType<boolean>,
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

const emit = defineEmits(['click']);

const component = computed(() => {
	if (props.linkTo) return defineNuxtLink({});
	else return 'button';
});
</script>

<template>
	<li class="sidebar-item">
		<component
			:is="component"
			:to="linkTo ?? null"
			:target="isExternalLink ? '_blank' : null"
			:class="['navigation__item', itemKind ? `navigation__item--${itemKind}` : '']"
			:itemprop="SeoItempropNavEnum.URL"
			@click="component === 'button' ? emit('click') : null"
		>
			<span
				class="navigation__text"
				:itemprop="SeoItempropNavEnum.NAME"
			>
				{{ text }}
			</span>
			<CommonIcon
				class="navigation__icon"
				:name="iconName"
				:alt="text"
			/>
		</component>
	</li>
</template>

<style scoped lang="less">
.navigation {
	&__item {
		display: flex;
		max-width: 240px;
		width: 100%;
		justify-content: flex-end;
		align-items: center;
		text-align: end;
		padding: 8px 18px 8px 16px;

		&--success {
			&::v-deep(svg) {
				color: var(--color-accent-green-main);
			}
		}
	}

	&__text {
		margin-right: 10px;
		line-height: 20px;
	}

	&__icon {
		min-width: 24px;
		color: var(--color-text-secondary);
	}
}
</style>