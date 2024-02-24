<script setup lang="ts">
import { SelectContent, SelectRoot, SelectTrigger, SelectValue, SelectViewport } from 'radix-vue';

const props = defineProps({
	options: {
		type: [Array, String, Set] as PropType<
			string | string[] | { [key: string]: string }[] | Set<string>
		>,
		required: true
	},
	modelValue: {
		type: String,
		required: true
	},
	placeholder: {
		type: String,
		default: ''
	},
	name: {
		type: String,
		default: ''
	},
	disabled: {
		type: Boolean,
		default: false
	},

	required: {
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

const onRemove = () => {
	emit('update:model-value', '');
};
</script>

<template>
	<div
		style="position: relative"
		class="select"
	>
		<SelectRoot
			v-model="model"
			:disabled="disabled"
			:name="name"
			:required="required"
		>
			<SelectTrigger
				tabindex="1"
				as="div"
				class="select__trigger"
			>
				<SelectValue
					:placeholder="placeholder"
					class="select__value"
				/>

				<CommonIcon
					v-if="!model"
					name="container"
					color="var(--color-input-icons)"
				/>
			</SelectTrigger>

			<SelectContent
				class="select__content"
				position="popper"
				:side-offset="5"
				style="overflow: hidden"
			>
				<SelectViewport as-child>
					<LibraryScrollArea>
						<ul style="height: 100%; padding: 8px 4px">
							<LibraryUiItemSelect
								v-for="option in options"
								:key="typeof option === 'string' ? option : option['value']"
								:value="typeof option === 'string' ? option : option['value']"
								side="top"
								side-offset="5"
								position="popper"
								avoid-collisions
							>
								{{ typeof option === 'string' ? option : option['label'] }}
							</LibraryUiItemSelect>
						</ul>
					</LibraryScrollArea>
				</SelectViewport>
			</SelectContent>
		</SelectRoot>
		<span
			v-if="model"
			style="position: absolute; z-index: 10; top: 8px; right: 12px"
			@click="onRemove"
		>
			<CommonIcon
				name="close"
				color="var(--color-input-icons)"
		/></span>
	</div>
</template>

<style lang="less">
.select {
	width: 100%;
	min-width: 100%;
	//remove?
	&:focus {
		outline: 1px solid var(--color-accent-green-main);
		border-radius: 6px;
	}
	&__trigger {
		width: 100%;
		min-width: 100%;
		display: flex;
		justify-content: space-between;
		height: 40px;
		border: 1px solid #dbdbdb;
		border-radius: 8px;
		background-color: #ffffff;
		font-family: var(--font-family-main);
		font-size: var(--font-size-M);
		color: var(--color-text-main);
		padding: 8px 12px 8px 12px;
		transition: border-color 0.3s ease;
		cursor: pointer;

		&:focus-within {
			border-color: var(--color-accent-green-main);
		}

		&:focus {
			outline: 1px solid var(--color-accent-green-main);
			border-color: var(--color-accent-green-main);
		}

		&:hover {
			border-color: var(--color-accent-green-main);
		}
	}

	&__value {
		color: #7a0d0d;
	}
	&__trigger[data-placeholder] {
		.select__value {
			color: #2b0e87;
		}
	}
	&__content {
		min-width: 267px;
		background-color: #ffffff;
		box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14);
		z-index: 99;
		border-radius: 8px;
		border: 2px black;
		width: var(--radix-select-trigger-width);
		height: 160px;

		min-height: 100px;
		max-height: 200px;
	}
}
</style>
