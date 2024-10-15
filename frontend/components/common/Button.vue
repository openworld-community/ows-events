<script setup lang="ts">
import { computed, type PropType } from 'vue';
import NuxtLink from '#app/components/nuxt-link';
import { IconDefaultParams } from '@/constants/defaultValues/icon';
import type { IconName } from './Icon.vue';
const localePath = useLocalePath();
const emit = defineEmits(['click']);

type LinkObjectType = {
	name?: string;
	path?: string;
};

type ButtonKind = 'ordinary' | 'success' | 'warning' | 'dark' | 'text' | 'filter' | 'multiselect'; // для задания внешнего вида

const props = defineProps({
	buttonKind: {
		// для обычных кнопок задает внешний вид согласно стайл-гайду, для кнопок-инонок раскрашивает в соответствующие цвета
		type: String as PropType<ButtonKind>,
		default: ''
	},
	noBorder: {
		// для внешнего вида обычных кнопок
		type: Boolean,
		default: false
	},
	interactive: {
		//  необходимость подсветки hover, focus, active
		type: Boolean,
		default: true
	},
	buttonText: {
		type: String,
		default: ''
	},
	link: {
		// если это ссылка
		type: [String, Object] as PropType<string | LinkObjectType>,
		default: ''
	},
	isExternalLink: {
		// если необходимо открыть в новом окне
		type: Boolean,
		default: false
	},
	prefetch: {
		// если необходимо открыть в новом окне
		type: Boolean,
		default: false
	},
	isRound: {
		// если кнопка круглая
		type: Boolean,
		default: false
	},
	isIcon: {
		// если компонент выглядит, как иконка
		type: Boolean,
		default: false
	},
	iconName: {
		// можно передать иконку в кнопку или сделать кнопкой-иконкой
		type: String as PropType<IconName>,
		default: ''
	},
	iconWidth: {
		type: [String, Number] as PropType<string | number>,
		default: IconDefaultParams.WIDTH
	},
	iconHeight: {
		type: [String, Number] as PropType<string | number>,
		default: IconDefaultParams.HEIGHT
	},
	iconColor: {
		type: String as PropType<string>,
		default: 'var(--color-input-icons)'
	},
	filled: {
		// для кнопок-фильтров и мультиселектов, обеспечивает внешний вид при заданных значениях
		type: Boolean,
		default: false
	},
	alt: {
		type: String,
		default: ''
	},
	isDisabled: {
		type: Boolean,
		default: false
	},
	isLoading: {
		type: Boolean,
		default: false
	}
});

const loaderColorDict = {
	ordinary: 'var(--color-text-main)',
	dark: 'var(--color-white)',
	success: 'var(--color-white)',
	warning: 'var(--color-accent-red)',
	text: 'var(--color-text-main)',
	filter: 'var(--color-text-secondary)',
	multiselect: null
} satisfies Record<ButtonKind, string>;

const loaderColor = computed(() => loaderColorDict[props.buttonKind] ?? '');
</script>

<template>
	<component
		:is="link ? NuxtLink : 'button'"
		:type="link ? null : 'button'"
		:external="isExternalLink"
		:prefetch="prefetch"
		:to="link ? (isExternalLink ? link : localePath(link)) : null"
		:target="isExternalLink ? '_blank' : null"
		:disabled="!link && isDisabled"
		:class="[
			isIcon ? 'icon' : `button button__${buttonKind}`,

			{
				[`icon__${buttonKind}`]: isIcon && buttonKind,
				[`button__${buttonKind}--disabled`]: isDisabled,
				[`button__${buttonKind}--no-border`]: noBorder,
				'button--round': isRound && !isIcon,
				'icon--round': isIcon && isRound,
				'no-interactive': !interactive,
				[`button__${buttonKind}--filled`]: filled
			}
		]"
		:aria-label="alt ? alt : null"
		@click="!isDisabled ? emit('click') : null"
	>
		<CommonUiLoadSpinner
			v-if="isLoading"
			:color="loaderColor"
			class="loader"
		/>
		<CommonIcon
			v-if="iconName || (buttonKind === 'multiselect' && !filled)"
			:class="{ button__icon: buttonText }"
			:name="buttonKind === 'multiselect' && !filled ? 'container' : iconName"
			:width="iconWidth"
			:height="iconHeight"
			:color="iconColor"
		/>
		<span
			v-if="!isIcon"
			class="button__content"
		>
			{{ buttonText }}
		</span>
	</component>
</template>

<style lang="less" scoped>
.button {
	display: flex;
	justify-content: center;
	height: 40px;
	border-radius: 8px;
	padding: 7px 14px;
	align-items: center;

	transition-property: background-color, color, border-color;
	transition-duration: 0.3s;
	transition-timing-function: ease;

	&--round {
		width: 56px;
		height: 56px;
		border-radius: 50%;
	}

	&__content {
		font-size: var(--font-size-M);
		
	}

	&__icon {
		transition: color 0.3s ease;
		margin-right: 5px;
		color: var(--color-input-field);
	}

	.loader {
		margin-right: 10px;
	}

	&__dark {
		border: 1px solid var(--color-text-main);
		background-color: var(--color-text-main);
		color: var(--color-white);

		&:focus-visible,
		&:active {
			background-color: var(--color-dark);
			border-color: var(--color-dark);
		}

		&:hover {
			@media (hover: hover) {
				background-color: var(--color-dark);
				border-color: var(--color-dark);
			}
		}

		&--disabled {
			opacity: 0.4;
			cursor: default;
		}
	}

	&__success {
		color: var(--color-white);
		background-color: var(--color-accent-green-main);
		border: 1px solid var(--color-accent-green-main);

		&:hover,
		&:focus-visible {
			background-color: var(--color-accent-green-dark);
			border-color: var(--color-accent-green-dark);
		}

		&:active {
			border-color: var(--color-accent-green-dark);
			box-shadow: var(--shadow-button-success);
		}

		&--disabled {
			opacity: 0.4;
			cursor: default;
		}
	}

	&__ordinary {
		color: var(--color-text-main);
		background-color: var(--color-white);
		border: 1px solid var(--color-input-field);

		&:hover {
			@media (hover: hover) {
				background-color: var(--color-input-field);
			}
		}

		&:focus-visible,
		&:active {
			background-color: var(--color-input-field);
		}

		&--no-border {
			border-color: transparent;
		}

		&--disabled {
			color: var(--color-input-field);
			cursor: default;

			&::v-deep(svg) {
				color: var(--color-input-field);
			}

			&:hover-visible,
			&:active {
				background-color: inherit;
			}
		}
	}

	&__text {
		color: var(--color-text-main);
		background-color: transparent;
		border: 1px solid transparent;

		&:hover,
		&:focus-visible {
			background-color: var(--color-accent-green-main-30);
		}

		&:active {
			background-color: var(--color-accent-green-main-50);
		}

		&--disabled {
			opacity: 0.4;
			cursor: default;

			&:hover,
			&:focus-visible,
			&:active {
				background-color: transparent;
				border-color: transparent;
			}
		}
	}

	&__warning {
		color: var(--color-accent-red);
		background-color: var(--color-white);
		border: 1px solid var(--color-accent-red);

		&:hover,
		&:focus-visible,
		&:active {
			background-color: var(--color-accent-red-30);
		}

		&--no-border {
			border: 1px solid transparent;

			&::v-deep(svg) {
				//	color: var(--color-accent-red);
			}

			&:hover,
			&:focus-visible,
			&:active {
				background-color: var(--color-accent-red-30);
			}
		}

		&--disabled {
			color: var(--color-input-field);
			background-color: var(--color-white);
			border-color: var(--color-input-field);
			cursor: default;

			&::v-deep(svg) {
				color: var(--color-input-field);
			}

			&:hover,
			&:focus-visible,
			&:active {
				background-color: inherit;
			}
		}
	}

	&__filter {
		display: flex;
		width: 50%;
		// height: 36px;
		flex-direction: row-reverse;
		background-color: var(--color-white);
		border: 1px solid var(--color-white);
		border-radius: 8px;
		justify-content: space-between;

		& > .button__content {
			font-size: var(--font-size-S);
			line-height: 20px;
			margin-right: 10px;

			display: inline-block;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		&::v-deep(svg) {
			width: 20px;
			min-width: 20px;
			height: 20px;
			margin-right: 0;
		}

		&--disabled {
			color: var(--color-input-icons);
			border-color: var(--color-white);
			cursor: default;

			&::v-deep(svg) {
				color: var(--color-input-icons);
			}
		}

		&--filled {
			background-color: var(--color-dark);
			color: var(--color-white);
			border-color: var(--color-dark);

			& > .button__content {
				margin-right: 0;
			}
		}
	}

	&__multiselect {
		min-width: 100%;
		justify-content: flex-start;
		position: relative;
		background-color: var(--color-white);
		border: 1px solid var(--color-white);
		padding-right: 40px;

		& > .button__content {
			font-size: var(--font-size-M);
			color: var(--color-input-icons);

			display: inline-block;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		&:deep(svg) {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			right: 12px;
			margin-right: 0;
			width: 26px;
			height: 26px;
			color: var(--color-input-icons);
		}

		&--filled {
			& > .button__content {
				color: var(--color-text-main);
			}
		}

		&:focus-visible,
		&:active {
			border-color: var(--color-accent-green-main);
		}

		&--disabled {
			opacity: 0.4;
		}
	}
}

.icon {
	display: block;
	width: max-content;
	border-radius: 4px;
	line-height: 0;
	transition-property: background-color, border-color, color;
	transition-duration: 0.3s;
	transition-timing-function: ease;

	&:hover,
	&:focus-visible {
		background-color: var(--color-background-secondary);
	}

	&:active {
		background-color: var(--color-accent-green-main-10);
	}

	& svg {
		transition: color 0.3s ease;
	}

	&.pw-show svg {
		color: var(--color-accent-green-main);
	}

	& + .icon {
		margin-left: 20px;
	}

	&--round {
		width: 36px;
		min-width: 36px;
		height: 36px;
		border-radius: 50%;
		background-color: var(--color-background-secondary);
		border: 1px solid var(--color-background-secondary);

		&:focus-visible,
		&:active {
			&::v-deep(svg) {
				color: var(--color-accent-green-main-30);
			}
		}
		@media (min-width: 768px) {
			&:hover {
				&::v-deep(svg) {
					color: var(--color-accent-green-main-30);
				}
			}
		}
	}
}

.no-interactive {
	&:hover,
	&:focus-visible,
	&:active {
		border-color: unset;
		background-color: unset;
		color: unset;
	}
}
</style>
