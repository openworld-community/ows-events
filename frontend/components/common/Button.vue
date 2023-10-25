<script setup lang="ts">
import { computed, type PropType } from 'vue';
import NuxtLink from '#app/components/nuxt-link';
import { IconDefaultParams } from '@/constants/defaultValues/icon';
import type { IconName } from './Icon.vue';

const emit = defineEmits(['click']);

type LinkObjectType = {
	name?: string;
	path?: string;
};

type ButtonKind = 'ordinary' | 'success' | 'warning' | 'text'; // для задания внешнего вида

const props = defineProps({
	buttonKind: {
		// для обычных кнопок задает внешний вид согласно стайл-гайду, для кнопок-инонок раскрашивает в соответствующие цвета
		type: String as PropType<ButtonKind>,
		default: ''
	},
	hasStates: {
		//  необходимость подсветки hover, focus, active
		type: Boolean,
		default: true
	},
	buttonText: {
		type: String as PropType<string>,
		default: ''
	},
	link: {
		// если это ссылка
		type: [String, Object] as PropType<string | LinkObjectType>,
		default: ''
	},
	isExternalLink: {
		// если необходимо открыть в новом окне
		type: Boolean as PropType<boolean>,
		default: false
	},
	isRound: {
		// если кнопка круглая
		type: Boolean as PropType<boolean>,
		default: false
	},
	isIcon: {
		// если компонент выглядит, как иконка
		type: Boolean as PropType<boolean>,
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
	alt: {
		type: String as PropType<string>,
		default: ''
	},
	isDisabled: {
		type: Boolean as PropType<boolean>,
		default: false
	},
	isLoading: {
		type: Boolean as PropType<boolean>,
		default: false
	}
});

const loaderColorDict = {
	ordinary: 'var(--color-text-main)',
	success: 'var(--color-white)',
	warning: 'var(--color-accent-red)',
	text: 'var(--color-text-main)'
} satisfies Record<ButtonKind, string>;
const loaderColor = computed(() => loaderColorDict[props.buttonKind] ?? '');
</script>

<template>
	<component
		:is="link ? NuxtLink : 'button'"
		:type="link ? null : 'button'"
		:to="link ? link : null"
		:target="isExternalLink ? '_blank' : null"
		:disabled="!link && isDisabled"
		:class="[
			isIcon ? 'icon' : `button button__${buttonKind}`,
			isIcon && buttonKind ? `icon__${buttonKind}` : '',
			isDisabled ? `button__${buttonKind}--disabled` : '',
			{ 'button--round': isRound && !isIcon },
			{ 'icon--round': isIcon && isRound },
			{ 'no-states': !hasStates }
		]"
		:aria-label="alt ? alt : null"
		@click="!link && !isDisabled ? emit('click') : null"
	>
		<CommonUiLoadSpinner
			v-if="isLoading"
			:color="loaderColor"
			class="loader"
		/>
		<CommonIcon
			v-if="iconName"
			:class="{ button__icon: buttonText }"
			:name="iconName"
			:alt="alt ? alt : null"
			:width="iconWidth"
			:height="iconHeight"
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

		@media (min-width: 768px) {
			font-size: var(--font-size-S);
		}
	}

	&__icon {
		transition: color 0.3s ease;
		margin-right: 5px;
		color: var(--color-input-field);
	}

	.loader {
		margin-right: 10px;
	}

	&__success {
		color: var(--color-white);
		background-color: var(--color-accent-green-main);
		border: 1px solid var(--color-accent-green-main);

		&::v-deep(svg) {
			color: var(--color-white);
		}

		&:hover,
		&:focus {
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

		&::v-deep(svg) {
			color: var(--color-text-main);
		}

		&:hover,
		&:focus {
			background-color: var(--color-input-field);
		}

		&:active {
			color: var(--color-white);
			background-color: var(--color-text-main);
			border-color: var(--color-text-main);

			&::v-deep(svg) {
				color: var(--color-white);
			}
		}

		&--disabled {
			color: var(--color-input-field);
			cursor: default;

			&::v-deep(svg) {
				color: var(--color-input-field);
			}
		}
	}

	&__text {
		color: var(--color-text-main);
		background-color: transparent;
		border: 1px solid transparent;

		&::v-deep(svg) {
			color: var(--color-text-main);
		}

		&:hover,
		&:focus {
			background-color: var(--color-accent-green-main-30);
		}

		&:active {
			background-color: var(--color-accent-green-main-50);
		}

		&--disabled {
			opacity: 0.4;
			cursor: default;

			&:hover,
			&:focus,
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

		&::v-deep(svg) {
			color: var(--color-accent-red);
		}

		&:hover,
		&:focus {
			color: var(--color-white);
			background-color: var(--color-accent-red);
			border-color: var(--color-accent-red);

			&::v-deep(svg) {
				color: var(--color-white);
			}
		}

		&:active {
			background-color: var(--color-accent-red-semitransparent);
		}

		&--disabled {
			color: var(--color-input-field);
			background-color: var(--color-white);
			border-color: var(--color-input-field);
			cursor: default;

			&::v-deep(svg) {
				color: var(--color-input-field);
			}
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
	&:focus {
		background-color: var(--color-background-secondary);
	}

	&:active {
		background-color: var(--color-accent-green-main-10);
	}

	&::v-deep(svg) {
		color: var(--color-input-icons);
		transition: color 0.3s ease;
	}

	& + .icon {
		margin-left: 20px;
	}

	&--round {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background-color: var(--color-background-secondary);
		border: 1px solid var(--color-background-secondary);

		&:hover,
		&:focus {
			&::v-deep(svg) {
				color: var(--color-accent-green-main-30);
			}
		}
	}

	&__ordinary {
		&::v-deep(svg) {
			color: var(--color-text-main);
		}
	}

	&__success {
		&::v-deep(svg) {
			color: var(--color-accent-green-main);
		}
	}

	&__warning {
		&::v-deep(svg) {
			color: var(--color-accent-red);
		}
	}
}

.no-states {
	&:hover,
	&:focus,
	&:active {
		border-color: unset;
		background-color: unset;
		color: unset;
	}
}
</style>
