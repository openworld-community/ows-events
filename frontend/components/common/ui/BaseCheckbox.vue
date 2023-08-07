<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
	label: {
		type: String,
		default: ''
	},
	items: {
		type: [String, Array] as PropType<string | string[]>,
		required: true
	},
	//сначала текст, потом чекбокс
	isReversed: {
		type: Boolean,
		default: false
	}
});

const isChecked = ref(false)

const checkItem = () => {

}
</script>

<template>
	<fieldset class="checkbox">
		<legend
			v-if="label"
			class="checkbox__legend"
		>
			{{ label }}}
		</legend>

		<div
			v-for="item in items"
			:key="item"
			:class="['checkbox__item', {'checkbox__item--reversed': isReversed}]"
		>
			<div class="checkbox__box" @click="checkItem(item)"></div>
			<label
				:for="item"
				class="checkbox__text"
			>
				{{ item }}
			</label>
			<input
				:id="item"
				type="checkbox"
				class="checkbox__input"
				:name="item"
				checked
			/>
		</div>
	</fieldset>
</template>

<style scoped lang="less">
.checkbox {
	border: none;

	&__legend {
	}

	&__item {
		display: flex;
		align-items: center;

    &--reversed {
      flex-direction: row-reverse;
      justify-content: flex-end;
    }
	}

	&__text {
		font-size: var(--font-size-M);
		line-height: 24px;
    margin-right: var(--space-unrelated-items);
	}

	&__input {
		display: none;
	}

	&__box {
		width: 18px;
		height: 18px;
		border: 1px solid var(--color-input-field);
		border-radius: 4px;
    margin-right: var(--space-unrelated-items);
	}
}
</style>
