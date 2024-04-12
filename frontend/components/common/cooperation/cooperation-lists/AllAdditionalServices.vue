<script setup lang="ts">
import Additional from '../Additional.vue';
</script>

<template>
	<div class="alladditional">
		<div class="alladditional__header">additional services</div>
		<Additional
			:name="$t('cooperation.additionalServices.socialMedia.name')"
			:description="$t('cooperation.additionalServices.socialMedia.description')"
			:price="$t('cooperation.additionalServices.socialMedia.price')"
			:button="$t('cooperation.additionalServices.socialMedia.button')"
		/>
		<Additional
			:name="$t('cooperation.additionalServices.targetedAdverising.name')"
			:description="$t('cooperation.additionalServices.targetedAdverising.description')"
			:price="$t('cooperation.additionalServices.targetedAdverising.price')"
			:button="$t('cooperation.additionalServices.targetedAdverising.button')"
		/>
		<Additional
			:name="$t('cooperation.additionalServices.videoContent.name')"
			:description="$t('cooperation.additionalServices.videoContent.description')"
			:price="$t('cooperation.additionalServices.videoContent.price')"
			:button="$t('cooperation.additionalServices.videoContent.button')"
		/>
		<Additional
			:name="$t('cooperation.additionalServices.interactiveElements.name')"
			:description="$t('cooperation.additionalServices.interactiveElements.description')"
			:price="$t('cooperation.additionalServices.interactiveElements.price')"
			:button="$t('cooperation.additionalServices.interactiveElements.button')"
		/>
	</div>
</template>
<style lang="less" scoped>
.alladditional {
	border: 2px solid var(--color-accent-green-main);
	border-radius: 8px;
	padding: 10px;
	margin-bottom: 20px;
	&__header {
		font-weight: 500;
	}
}
</style>
