<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';
import type { PropType } from 'vue';

type ModalType = 'form' | 'info';

defineProps({
	modalType: {
		type: String as PropType<ModalType>,
		default: 'form'
	},
	title: {
		type: String,
		required: true
	},
	hasCloseButton: {
		type: Boolean,
		default: false
	}
});

const emit = defineEmits(['closeModal']);

const desktop = inject('desktop');

// В safari на iphone при открытии клавиатуры происходит скролл страницы и не возвращается обратно при закрытии
// код ниже возвращает скролл в исходное положение

let windowOffsetTop = 0;
const isIPhoneMobileAgent = /iPhone/i.test(navigator.userAgent);

const scrollLockOnBeforeOpenModal = () => {
	if (isIPhoneMobileAgent) {
		const body = document.querySelector('body');
		if (body) {
			windowOffsetTop = window.scrollY;
			body.classList.add('no-scroll');
			body.style.top = `${-windowOffsetTop}px`;
		}
	}
};

const scrollUnlockOnBeforeCloseModal = () => {
	if (isIPhoneMobileAgent) {
		const body = document.querySelector('body');
		if (body) {
			body.classList.remove('no-scroll');
			window.scrollTo({ top: windowOffsetTop });
			setTimeout(() => (body.style.top = 'unset'));
		}
	}
};
</script>
<template>
	<VueFinalModal
		:hide-overlay="false"
		overlay-transition="vfm-fade"
		overlay-transition-duration="2600"
		content-transition="vfm-fade"
		swipe-to-close="down"
		:click-to-close="true"
		:esc-to-close="true"
		:lock-scroll="!!desktop"
		content-class="overlay"
		@before-open="scrollLockOnBeforeOpenModal"
		@before-close="scrollUnlockOnBeforeCloseModal"
	>
		<div :class="['modal-card', { 'modal-card--info': modalType === 'info' }]">
			<header
				:class="['modal-card__head', { 'modal-card__head--center': modalType === 'info' }]"
			>
				<h2
					:class="[
						'modal-card__title',
						{ 'modal-card__title--center': modalType === 'info' }
					]"
				>
					{{ title }}
				</h2>
				<CommonButton
					v-if="hasCloseButton && modalType !== 'info'"
					class="modal-card__button"
					is-icon
					button-kind="ordinary"
					icon-name="close"
					@click="emit('closeModal')"
				/>
			</header>
			<form
				v-if="modalType === 'form'"
				class="modal-card__body body"
				@submit.prevent="() => void 0"
			>
				<slot name="form" />
				<p class="body__required">{{ $t('modal.global.required') }}</p>
			</form>
			<footer
				:class="['modal-card__foot', { 'modal-card__foot--center': modalType === 'info' }]"
			>
				<slot name="footer" />
			</footer>
		</div>
	</VueFinalModal>
</template>
<style scoped lang="less">
.modal-card {
	display: flex;
	flex-direction: column;
	width: 95vw;
	min-width: calc(var(--width-mobile) - 2 * var(--padding-side));
	max-width: 400px;
	max-height: 88vh;
	overflow: hidden;
	border-radius: 6px;
	margin: var(--padding-side) auto;
	position: fixed;
	left: 50%;
	top: 50%;

	transform: translate(-50%, -50%);
	transition-property: top;
	transition-duration: 0.4s;
	z-index: 1;

	@media (min-width: 768px) {
		width: 80vw;
		max-width: 820px;
		margin: 0 auto;
	}

	&--info {
		max-width: 400px;
	}

	&__head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: var(--color-background-secondary);
		border-bottom: 1px solid var(--color-input-field);
		padding: 20px;

		&--center {
			justify-content: center;
		}

		@media (min-width: 768px) {
			line-height: 30px;
			padding: 30px;
		}
	}

	&__title {
		font-size: var(--font-size-XL);
		font-weight: var(--font-weight-regular);

		&--center {
			font-size: var(--font-size-ML);
			text-align: center;
		}
	}

	&__button {
		margin-left: var(--space-related-items);
	}

	&__body {
		display: flex;
		width: 100%;
		flex-direction: column;
		align-items: center;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		background-color: var(--color-white);
		padding: 20px;

		@media (min-width: 768px) {
			padding: 30px;
		}
	}

	&__foot {
		display: flex;
		align-items: center;
		min-height: 80px;
		background-color: var(--color-background-secondary);
		border-top: 1px solid var(--color-input-field);
		padding-left: 20px;
		padding-right: 20px;

		:deep(& > button:not(:last-child)) {
			margin-right: var(--space-related-items);
		}

		&--center {
			justify-content: center;
		}

		@media (min-width: 768px) {
			padding: 30px;
		}
	}
}

.body {
	&__required {
		width: 100%;
		max-width: 540px;
		text-align: left;
		font-size: var(--font-size-XS);
		line-height: 18px;
		color: var(--color-text-secondary);
		margin-top: var(--space-unrelated-items);
	}
}
</style>
