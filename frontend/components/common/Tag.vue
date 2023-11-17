<script setup lang="ts">
import { type PropType } from 'vue';
import { SeoItempropEventEnum } from '../../constants/enums/seo';
import Tag from './Tag.vue';

type TagSize = 'standard' | 'small';

const props = defineProps({
	tagKey: {
		type: String as PropType<typeof Tag>,
		required: true
	},
	size: {
		type: String as PropType<TagSize>,
		default: 'standard'
	},
	isCheckbox: {
		type: Boolean,
		default: false
	},
	modelValue: {
		type: Array,
		default: () => []
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

//TODO: костыль, т.к. CSS-селктор :has считает все чекбоксы checked при маунте (скорее всего бага nuxt)
const isChecked = computed(() => props.modelValue.includes(props.tagKey));
</script>

<template>
	<component
		:is="isCheckbox ? 'label' : 'div'"
		:for="isCheckbox ? tagKey : null"
		:class="[
			'tag',
			{
				'tag--small': size === 'small',
				tag__check: isCheckbox,
				'tag__check--checked': isChecked
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
			class="tag__checkbox visually-hidden"
			:name="tagKey"
			:value="tagKey"
			checked
		/>
	</component>
</template>

<style lang="less" scoped>
.tag {
	min-width: 50px;
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

	&--small {
		font-size: var(--font-size-XS);
		line-height: 16px;
	}

	&__check {
		cursor: pointer;

		&:hover {
			background-color: var(--color-input-icons);
		}

		&:has(.tag__checkbox:focus) {
			border-color: var(--color-text-main);
		}

		&--checked {
			background-color: var(--color-text-main);
			border-color: var(--color-text-main);
			color: var(--color-white);

			&:has(.tag__checkbox:focus) {
				color: var(--color-input-field);
				border-color: var(--color-input-field);
			}

			&:hover {
				background-color: var(--color-text-secondary);
				color: var(--color-text-main);
			}
		}
	}
}
</style>
