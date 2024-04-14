<script setup lang="ts">
import { type PropType } from 'vue';

const { t } = useI18n();
const mobile = inject('mobile');

const props = defineProps({
	name: {
		type: String,
		default: ''
	},
	image: {
		type: String,
		default: ''
	},
	options: {
		type: Array as PropType<String[]>,
		default: () => []
	},
	price: {
		type: String,
		default: ''
	},
	button: {
		type: String,
		default: ''
	}
});
</script>

<template>
	<div class="package">
		<div class="package__main package__kit">
			<h2 class="package__header">{{ name }}</h2>
			<div class="package__image">{{ image }}</div>
		</div>
		<div class="package__main package__options">
			<ul class="package__options__list">
				<li
					v-for="option in options"
					:key="$rt(option)"
					class="package__options__list--item"
				>
					{{ $rt(option) }}
				</li>
			</ul>
		</div>
		<div class="package__main package__buy">
			<h2 class="package__price">{{ price }}</h2>
			<CommonButton
				class="event-form__button"
				button-kind="success"
				:button-text="button"
			/>
		</div>
	</div>
</template>

<style lang="less" scoped>
.package {
	height: 100%;
	width: 100%;
	border: 2px solid var(--color-accent-green-main);
	border-radius: 8px;
	display: flex;
	justify-content: space-between;
	padding-top: 20px;
	padding-bottom: 20px;
	@media (max-width: 768px) {
		flex-direction: column;
		align-items: center;
		gap: 10px;
	}
	&__main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	&__header {
		font-size: clamp(16px, 1.5vw, 20px);
		font-weight: 600;
		@media (max-width: 768px) {
		}
	}
	&__image {
		height: 200px;
		width: 200px;
		@media (max-width: 768px) {
			height: 0px;
		}
	}
	&__kit {
		width: 32%;
		border-right: 2px solid var(--color-input-field);
		@media (max-width: 768px) {
			border-right: 0px solid;
			width: 100%;
		}
	}
	&__options {
		padding-left: 1.5vw;
		padding-right: 1.5vw;
		width: 45%;
		border-right: 2px solid var(--color-input-field);
		@media (max-width: 768px) {
			border-right: 0px solid;
			width: 100%;
			align-self: flex-start;
		}
		&__list {
			margin-left: 2vw;
			&--item {
				list-style-type: disc;
				margin-bottom: 10px;
			}
		}
	}
	&__buy {
		width: 23%;
	}
	&__price {
		color: black;
		padding-bottom: 26px;
	}
}
</style>
