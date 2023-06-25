<script setup lang="ts">
type Props = {
	closeNeedAuthorizeModal: () => void;
};

const { translate } = useTranslation();
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
				<p class="modal-card__title">
					{{ translate('component.need_authorize_modal.title') }}
				</p>
			</div>
			<div class="modal-card__foot">
				<CommonButton
					button-kind="success"
					:button-text="translate('component.need_authorize_modal.button.close')"
					@click="props.closeNeedAuthorizeModal"
				/>
			</div>
		</div>
	</CommonModalWrapper>
</template>

<style scoped lang="less">
.modal {
	//TODO: пока верстка только мобилки
	max-width: 350px;
	overflow: hidden;
	border-radius: 10px;
	margin: 40vh auto auto;
}

.modal-card {
	&__head {
		height: max-content;
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
