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

type ButtonKind = 'ordinary' | 'success' | 'warning'; // для задания внешнего вида

const props = defineProps({
	buttonKind: {
		// для обычных кнопок задает внешний вид согласно стайл-гайду, для кнопок-инонок раскрашивает в соответствующие цвета
		type: String as PropType<ButtonKind>,
		default: ''
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

const loaderColor = computed(() => {
	switch (props.buttonKind) {
		case 'ordinary':
			return 'var(--color-text-main)';
		case 'success':
			return 'var(--color-white)';
		case 'warning':
			return 'var(--color-accent-red)';
		default:
			return '';
	}
});
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
			{ 'button--round': isRound }
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
			class="button__text"
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
	border-radius: 24px;
	padding: 7px 14px;
	align-items: center;
	transition: background-color 0.3s ease;

	&--round {
		width: 56px;
		height: 56px;
		border-radius: 50%;
	}

	&__text {
		font-size: var(--font-size-M);
	}

	&__icon {
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

			&::v-deep(svg) {
				color: var(--color-input-field);
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

			&::v-deep(svg) {
				color: var(--color-input-field);
			}
		}
	}
}

.icon {
	display: block;
	width: max-content;
	line-height: 0;

	&::v-deep(svg) {
		color: var(--color-input-field);
	}

	& + .icon {
		margin-left: 20px;
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
</style>
