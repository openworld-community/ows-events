<script setup lang="ts">
import type { options } from 'sanitize-html';

const { t } = useI18n();
const mobile = inject('mobile');

const props = defineProps({
	name: {
		type: String,
		default: ''
	},
	picture: {
		type: String,
		default: ''
	},
    option: {
		type: Array,
		default: []
	},
    price: {
		type: String,
		default: ''
	},
    
});

</script>

<template>
	<div class="package">
		<div class="package__main package__kit">
			<div class="package__header">{{ name }}</div>
			<div class="package__picture">{{ picture }}</div>
		</div>
		<div class="package__main package__options">
			<ul class="package__options__list">
				<li v-for="item in option" class="package__options__list--item">{{ item }}</li>
			</ul>
		</div>
		<div class="package__main package__button">
			<div>{{price}}</div>
			<div>Button</div>
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
	&__main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	&__header {
		font-size: clamp(16px, 1.5vw, 20px);
		font-weight: 500;
	}
	&__picture {
		height: 200px;
		width: 200px;
	}
	&__kit {
		width: 32%;
		border-right: 2px solid var(--color-input-field);
	}
	&__options {
		padding-left: 1.5vw;
		padding-right: 1.5vw;
		width: 45%;
		border-right: 2px solid var(--color-input-field);
		&__list {
			margin-left: 2vw;
			&--item {
				list-style-type: disc;
				margin-bottom: 10px;
			}
		}
	}
	&__button {
		width: 23%;
	}
}
</style>
