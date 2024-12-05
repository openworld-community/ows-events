<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
const scrollHeight = ref(770);
const mobileHorisontal = ref(false);
const mobile = inject('mobile');
const desktop = inject('desktop');
const tablet = inject('tablet');

const updateScrollHeight = () => {
	if (window.innerWidth > 2000) {
		scrollHeight.value = 770;
	} else {
		scrollHeight.value = window.innerHeight * 0.8;
	}
};
// если разрешение экрана больше соотношение 32/15 это = 2,1(3..3), было выбрано и округлено путем тестов 1280/600(мой телефон - 1280/590)
const updateHorisontal = () => {
	mobileHorisontal.value = window.innerWidth / window.innerHeight >= 2.13;
};

onMounted(() => {
	updateScrollHeight();
	updateHorisontal();
	window.addEventListener('resize', updateScrollHeight);
	window.addEventListener('resize', updateHorisontal); // обновляем значение при изменении размера экрана
});

onBeforeUnmount(() => {
	window.removeEventListener('resize', updateScrollHeight);
	window.removeEventListener('resize', updateHorisontal);
});
</script>
<template>
	<!-- DESKTOP && TABLET -->
	<LibraryDialog :v-if="desktop || tablet">
		<template #trigger>
			<CommonButton
				:button-text="$t('global.button.more')"
				button-font-size="14px"
				class="more"
				button-kind="success"
			/>
		</template>
		<template #content>
			<div
				v-if="(desktop && !mobileHorisontal) || (tablet && !mobileHorisontal)"
				class="dialog"
			>
				<img
					class="dialog__image"
					src="/img/modal-info/modal-info.webp"
				/>
			</div>
			<LibraryScrollArea
				v-if="mobileHorisontal"
				type="scroll"
				:height="scrollHeight"
			>
				<img
					class="dialog__image"
					src="/img/modal-info/modal-info.webp"
				/>
			</LibraryScrollArea>
		</template>
	</LibraryDialog>
	<!-- MOBILE -->
	<LibraryDownsheet v-if="mobile">
		<template #trigger>
			<CommonButton
				:button-text="$t('global.button.more')"
				button-font-size="14px"
				class="more"
				button-kind="success"
			/>
		</template>
		<template #content>
			<div class="dialog__image--mobile">
				<div class="mobile-select__buttons buttons">
					<img
						style="padding-top: 40px"
						src="/img/modal-info/mobile-modal-info.webp"
					/>
				</div>
			</div>
		</template>
	</LibraryDownsheet>
</template>
<style lang="less" scoped>
.dialog {
	height: fit-content;
	&__image {
		max-width: 80vw;
		object-fit: contain;
		@media (min-width: 1440px) {
			max-width: 1270px;
		}
		&--mobile {
			display: flex;
			height: 80vh;
			overflow-y: scroll;
		}
	}
}
.more {
	grid-area: 1 / 1 / 1 / 1;
	position: relative;
	top: 140px;
	right: -205px;
	width: 120px;
	z-index: 20;
	height: 30px;

	@media (min-width: 768px) {
		font-size: 1.6rem;
		transform: translate(-40px, 0px);
	}

	@media (min-width: 1440px) {
		top: 190px;
		transform: translate(40px, 0px);
	}
}
</style>
