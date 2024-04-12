<script setup lang="ts">
import cooperation from '~/i18n/locales/ru-RU/cooperation';

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
	option: {
		type: String,
		default: []
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
			<div class="package__header">{{ name }}</div>
			<div class="package__image">{{ image }}</div>
		</div>
		<div class="package__main package__options">
			<ul class="package__options__list">
				<li class="package__options__list--item">
					{{ $t(cooperation.package.basic.option[0].name) }}
				</li>
			</ul>
		</div>
		<div class="package__main package__button">
			<div>{{ price }}</div>
			<div>{{ button }}</div>
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
	&__image {
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
