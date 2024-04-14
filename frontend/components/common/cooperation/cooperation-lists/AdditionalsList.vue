<script setup lang="ts">
import Additional from '../Additional.vue';
</script>

<template>
	<div class="alladditional">
		<h3 class="alladditional__header">{{$t('cooperation.additionalServices.name')}}</h3>
		<Additional
			:name="$t('cooperation.additionalServices.socialMedia.name')"
			:description="$t('cooperation.additionalServices.socialMedia.description')"
			:price="$t('cooperation.additionalServices.socialMedia.price')"
			:button="$t('cooperation.additionalServices.socialMedia.button')"
			image="/img/cooperation/socialMedia.png"
		/>
		<Additional
			:name="$t('cooperation.additionalServices.targetedAdvertising.name')"
			:description="$t('cooperation.additionalServices.targetedAdvertising.description')"
			:price="$t('cooperation.additionalServices.targetedAdvertising.price')"
			:button="$t('cooperation.additionalServices.targetedAdvertising.button')"
			image="/img/cooperation/targetedAdvertising.png"
		/>
		<Additional
			:name="$t('cooperation.additionalServices.videoContent.name')"
			:description="$t('cooperation.additionalServices.videoContent.description')"
			:price="$t('cooperation.additionalServices.videoContent.price')"
			:button="$t('cooperation.additionalServices.videoContent.button')"
			image="/img/cooperation/videoContent.png"
		/>
		<Additional
			:name="$t('cooperation.additionalServices.interactiveElements.name')"
			:description="$t('cooperation.additionalServices.interactiveElements.description')"
			:price="$t('cooperation.additionalServices.interactiveElements.price')"
			:button="$t('cooperation.additionalServices.interactiveElements.button')"
			image="/img/cooperation/interactiveElements.png"
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
		
	}
}
</style>
