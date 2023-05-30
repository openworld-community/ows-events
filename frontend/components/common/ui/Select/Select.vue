<script lang="ts">
import { defineComponent } from 'vue';
import CommonIcon from '~/components/common/Icon.vue';
import BaseInput from '~/components/common/ui/BaseInput/BaseInput.vue';

export default defineComponent({
	name: 'BaseSelect',
	components: {BaseInput, CommonIcon},
	inheritAttrs: false,
	props: {
		className: {
			type: String,
			default: '',
		},
		modelValue: {
			type: String,
			default: '',
		},
		list: {
			type: Array as () => string[],
			default: () => ['text'],
		},
		name: {
			type: String,
			required: true,
		},
		placeholder: {
			type: String,
			default: '',
		},
		label: {
			type: String,
			default: '',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		error: {
			type: String,
			default: ''
		}
	},
	emits: ['update:modelValue'],
	data() {
		return {
			isOpen: false,
			isRemove: false,
		}
	},
	methods: {
		updateValue(value: Event) {
			this.$emit('update:modelValue', value);
			this.setIsOpen();
		},
		setIsOpen() {
			this.isOpen = !this.isOpen;
		},
		setIsRemove() {
			this.isRemove = !this.isRemove;
		},
		onRemove() {
			this.$emit('update:modelValue', '');
		}
	},
});
</script>

<template>
	<div :class="`select__wrapper ${className}`">
		<base-input
			:name="name"
			:model-value="modelValue"
			:label="label"
			:disabled="disabled"
			:placeholder="placeholder"
			:error="error"
			@click="setIsOpen"
		>
			<template #icon-right>
				<button @click="onRemove">
					<CommonIcon
						v-if="modelValue"
						name="delete"
						width="24"
						height="24"
						alt="Очистить"
					/>
					<CommonIcon
						v-else
						name="container"
						width="24"
						height="24"
						alt="Открыть"
						@click.prevent="setIsOpen"
					/>
				</button>
			</template>
		</base-input>

		<ul :class="`select__list ${isOpen ? 'isOpen' : ''}`">
			<li
					v-for="item in list"
					:key="item"
					class="select__list-item"
					@click="updateValue(item)"
			>
				{{ item }}
			</li>
		</ul>
	</div>
</template>

<style lang="less" scoped>

.select {
	&__wrapper {
		width: 100%;
		position: relative;
	}

	&__box {
		//width: 100%;
	}

	&__list {
		display: none;
		position: absolute;
		top: 50px;
		left: 0;
		background-color: var(--color-white);
		max-height: 200px;
		overflow-y: scroll;
		z-index: 99;
		&.isOpen {
			display: block;
		}
	}

	&__list-item {
		padding: 5px;
	}
}
</style>
