<script setup lang="ts">
import { RoutePathEnum } from '../../constants/enums/route';

type Props = {
	closeNeedAuthorizeModal: () => void;
};
const props = defineProps<Props>();

const localePath = useLocalePath()
</script>

<template>
	<CommonModalWrapper
		modal-type="info"
		:title="$t('modal.need_authorize_modal.title')"
	>
		<template #footer>
			<CommonButton
				button-kind="ordinary"
				:button-text="$t('global.button.close')"
				@click="props.closeNeedAuthorizeModal"
			/>
			<CommonButton
				button-kind="success"
				:link="localePath(RoutePathEnum.USER_PAGE)"
				:button-text="$t('global.button.authorize')"
			/>
		</template>
	</CommonModalWrapper>
</template>

<style scoped lang="less"></style>
