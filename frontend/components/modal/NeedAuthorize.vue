<script setup lang="ts">
type Props = {
	closeNeedAuthorizeModal: () => void;
};

const props = defineProps<Props>();
</script>

<template>
	<CommonModalWrapper
		:hide-overlay="false"
		overlay-transition="vfm-fade"
		overlay-transition-duration="2600"
		content-transition="vfm-fade"
		:click-to-close="true"
		:esc-to-close="true"
		:lock-scroll="false"
	>
		<div class="modal">
			<div class="modal-card__head">
				<p class="modal-card__title">Для создания мероприятия необходимо авторизоваться</p>
			</div>
			<div class="modal-card__foot">
				<CommonButton
					button-class="button__success"
					button-text="Закрыть"
					@click="props.closeNeedAuthorizeModal"
				/>
			</div>
		</div>
	</CommonModalWrapper>
</template>

<style scoped lang="less">
.modal {
	overflow: hidden;
	border-radius: 10px;
	margin-top: 50%;
	margin-bottom: auto;
	margin-inline: var(--padding-side);
}

.modal-card {
	&__head {
		height: max-content;
		min-height: 64px;
	}

	&__title {
		font-size: var(--font-size-L);
		text-align: center;
	}

	&__foot {
		justify-content: center;
	}
}
</style>
