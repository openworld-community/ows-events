<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
const height = ref(800);
const mobile = inject('mobile');
const desktop = inject('desktop');
const tablet = inject('tablet');

const updateHeight = () => {
	const desktop = window.innerHeight * 0.85;
	const mobile = window.innerHeight * 0.6;
	height.value = window.innerHeight < window.innerWidth ? desktop : mobile;
};
onMounted(() => {
	updateHeight();
	window.addEventListener('resize', updateHeight); // обновляем значение при изменении размера экрана
});

onBeforeUnmount(() => {
	window.removeEventListener('resize', updateHeight);
});
const innerModel = ref<string>('');
</script>

<template>
	<div class="poster">
		<div class="info-poster">
			<h3 class="info-poster__title">{{ $t('event.poster.create_title') }}</h3>
			<p class="info-poster__subtitle info-poster__text">
				{{ $t('event.poster.click_button') }}
			</p>

			<div class="info-poster__item-one">
				<span class="info-poster__button">{{ $t('global.button.create_event') }}</span>
				<span class="info-poster__text">{{ $t('event.poster.button') }}</span>
			</div>

			<div class="info-poster__item-two">
				<span class="info-poster__button-plus">
					<CommonIcon
						name="plus"
						color="var(--color-white)"
					/>
				</span>
				<span class="info-poster__text">{{ $t('event.poster.button_plus') }}</span>
			</div>
		</div>
		<DetailesModalInfoPoster />
	</div>
</template>

<style lang="less" scoped>
.poster {
	display: grid;
	width: 350px;
	height: 225px;
	padding: 38px 12px 17px 12px;
	background-image: url(/img/event/background.svg);
	background-repeat: no-repeat;
	background-size: cover;
	border-radius: 20px;
	@media (min-width: 768px) {
		padding: 38px 13px 8px 13px;
		flex-shrink: 0;
		width: 311px;
		height: 225px;
	}
	@media (max-width: 768px) {
		align-self: center;
		margin-top: 24px;
	}
	@media (min-width: 1440px) {
		width: 400px;
		height: 279px;
		padding: 41px 15px 16px;
	}
}
.info-poster {
	grid-area: 1 / 1 / 1 / 1;
	border-radius: 20px;
	width: 100%;
	height: 100%;
	&__dialog {
		padding-right: 15px;
	}
	&__image {
		width: 1200px;
		max-width: 85vw;
		min-height: 100%;
		object-fit: contain;
	}

	&__title {
		text-align: center;
		margin-bottom: 18px;
		font-size: 1.4rem;
		font-weight: bold;
		@media (min-width: 768px) {
			margin-bottom: 11px;
			font-size: 1.2rem;
		}

		@media (min-width: 1440px) {
			font-size: 1.6rem;
			margin-bottom: 32px;
		}
	}
	&__subtitle {
		margin-bottom: 19px;
		@media (min-width: 768px) {
			margin-bottom: 11px;
		}

		@media (min-width: 1440px) {
			margin-bottom: 20px;
		}
	}
	&__text {
		font-size: 1.2rem;
		font-weight: bold;

		@media (min-width: 1440px) {
			font-size: 1.6rem;
		}
	}

	&__item-one {
		display: flex;
		align-items: center;
		margin-bottom: 16px;

		@media (min-width: 768px) {
			margin-bottom: 14px;
		}
		@media (min-width: 1440px) {
			margin-bottom: 22px;
		}
	}

	&__item-two {
		display: flex;
		align-items: center;
	}
	&__button {
		margin-right: 14px;
		border-radius: 8px;
		line-height: 18px;
		padding: 4px 10px;
		color: var(--color-white);
		background-color: var(--color-accent-green-main);
		border: 1px solid var(--color-accent-green-main);
		cursor: default;
		font-size: 1.2rem;
	}

	&__button-plus {
		width: 38px;
		height: 38px;
		cursor: default;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		background-color: var(--color-accent-green-main);
		border: 1px solid var(--color-accent-green-main);
		margin-right: 13px;
	}
}
.more {
	grid-area: 1 / 1 / 1 / 1;
	position: relative;
	top: 135px;
	right: -210px;
	width: 120px;
	z-index: 20;

	@media (min-width: 768px) {
		font-size: 1.6rem;
		transform: translate(-40px, 0px);
	}

	@media (min-width: 1440px) {
		top: 180px;
		transform: translate(40px, 0px);
	}
}
</style>
