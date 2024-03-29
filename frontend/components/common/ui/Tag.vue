<script setup lang="ts">
import { type PropType } from 'vue';
import { SeoItempropEventEnum } from '../../../constants/enums/seo';
import { type Tag } from '../../../../common/const/tags';

const props = defineProps({
	tagKey: {
		type: String as PropType<Tag>,
		required: true
	},
	name: {
		type: String,
		default: ''
	},
	size: {
		type: String as PropType<'standard' | 'small' | 'mini'>,
		default: 'standard'
	},
	appearance: {
		type: String as PropType<'primary' | 'accent'>,
		default: 'primary'
	},
	isCheckbox: {
		type: Boolean,
		default: false
	},
	modelValue: {
		type: Array,
		default: () => []
	},
	isDisabled: {
		type: Boolean,
		default: false
	}
});

const emit = defineEmits(['update:model-value']);

const model = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit('update:model-value', value);
	}
});
</script>

<template>
	<component
		:is="isCheckbox ? 'label' : 'div'"
		:for="isCheckbox ? tagKey : null"
		:class="[
			'tag',
			{
				[`tag--${size}`]: size !== 'standard',
				[`tag--${appearance}`]: appearance !== 'primary',
				tag__check: isCheckbox
			}
		]"
	>
		<span
			:itemprop="
				tagKey === 'children' || tagKey === 'adult'
					? SeoItempropEventEnum.AGE
					: SeoItempropEventEnum.CATEGORY
			"
		>
			{{ $t(`event.tags.${tagKey}`) }}
		</span>
		<input
			v-if="isCheckbox"
			:id="tagKey"
			v-model="model"
			type="checkbox"
			:name="name || tagKey"
			:value="tagKey"
			:disabled="isDisabled"
			class="tag__checkbox visually-hidden"
		/>
	</component>
</template>

<style lang="less" scoped>
.tag {
	min-width: 50px;
	width: max-content;
	max-width: max-content;

	font-size: var(--font-size-S);
	line-height: 20px;
	text-align: center;

	background-color: var(--color-input-field);
	border: 1px solid var(--color-input-field);
	border-radius: 8px;

	padding: 3px 10px;

	transition-property: background-color, color, border-color;
	transition-timing-function: ease;
	transition-duration: 0.3s;

	//SIZES

	&--small {
		font-size: var(--font-size-XS);
		line-height: 16px;

		@media (min-width: 1440px) {
			font-size: var(--font-size-XXS);
		}
	}

	&--mini {
		font-size: var(--font-size-XXS);
		line-height: 12px;
		padding: 0 4px;
		border-radius: 3px;
	}

	// APPEARANCES

	&--accent {
		background-color: var(--color-accent-green-main);
		border-color: var(--color-accent-green-main);
		color: var(--color-white);
	}

	// CHECK

	&__check {
		cursor: pointer;

		&:hover {
			background-color: var(--color-input-icons);
		}

		&:has(.tag__checkbox:focus) {
			border-color: var(--color-text-main);
		}

		&:has(.tag__checkbox:checked) {
			background-color: var(--color-text-main);
			border-color: var(--color-text-main);
			color: var(--color-white);

			&:hover {
				background-color: var(--color-text-secondary);
				color: var(--color-text-main);
			}

			&:has(.tag__checkbox:focus) {
				color: var(--color-input-field);
				border-color: var(--color-input-field);
			}
		}

		&:has(.tag__checkbox:disabled) {
			opacity: 0.6;
			cursor: default;

			&:hover {
				background-color: var(--color-input-field);
			}
		}
	}
}
</style>
