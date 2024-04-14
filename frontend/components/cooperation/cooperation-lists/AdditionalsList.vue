<script setup lang="ts">
import Additional from '../Additional.vue';
</script>

<template>
	<div class="additional-list">
		<h2>{{ $t('cooperation.additionalServices.title') }}</h2>
		<div class="additional-list__wrapper">
			<h3 class="additional-list__wrapper__header">
				{{ $t('cooperation.additionalServices.title') }}
			</h3>
			<Additional
				:title="$t('cooperation.additionalServices.socialMedia.title')"
				:description="$t('cooperation.additionalServices.socialMedia.description')"
				:price="$t('cooperation.additionalServices.socialMedia.price')"
				:button="$t('cooperation.additionalServices.socialMedia.button')"
				image="/img/cooperation/additional/socialMedia.png"
			/>
			<Additional
				:title="$t('cooperation.additionalServices.targetedAdvertising.title')"
				:description="$t('cooperation.additionalServices.targetedAdvertising.description')"
				:price="$t('cooperation.additionalServices.targetedAdvertising.price')"
				:button="$t('cooperation.additionalServices.targetedAdvertising.button')"
				image="/img/cooperation/additional/targetedAdvertising.png"
			/>
			<Additional
				:title="$t('cooperation.additionalServices.videoContent.title')"
				:description="$t('cooperation.additionalServices.videoContent.description')"
				:price="$t('cooperation.additionalServices.videoContent.price')"
				:button="$t('cooperation.additionalServices.videoContent.button')"
				image="/img/cooperation/additional/videoContent.png"
			/>
			<Additional
				:title="$t('cooperation.additionalServices.interactiveElements.title')"
				:description="$t('cooperation.additionalServices.interactiveElements.description')"
				:price="$t('cooperation.additionalServices.interactiveElements.price')"
				:button="$t('cooperation.additionalServices.interactiveElements.button')"
				image="/img/cooperation/additional/interactiveElements.png"
			/>
		</div>
	</div>
</template>
<style lang="less" scoped>
.additional-list {
	display: flex;
	flex-direction: column;
	gap: 55px;
	@media (max-width: 375px) {
		gap: 30px;
	}
	&__wrapper {
		border: 2px solid var(--color-accent-green-main);
		border-radius: 8px;
		padding: 10px;
		margin-bottom: 50px;
	}
}
</style>
