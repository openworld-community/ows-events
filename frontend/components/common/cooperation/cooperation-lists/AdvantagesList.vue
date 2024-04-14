<script setup lang="ts">
import Advantage from '../Advantage.vue';

const path = '@/assets/img/error/404.webp';
const isRevercedHead = 'advantage--reverced';
const isRevercedText = 'advantage__text--reverced';
</script>

<template>
	<div class="advantageslist">
		<Advantage
			:name="$t('cooperation.title.advantages.allEvents.name')"
			:description="$t('cooperation.title.advantages.allEvents.description')"
			image="/img/cooperation/allEvents.png"
		/>

		<Advantage
			:name="$t('cooperation.title.advantages.simpleCreating.name')"
			:description="$t('cooperation.title.advantages.simpleCreating.description')"
			image="/img/cooperation/simpleCreating.png"
			:isRevercedHead="isRevercedHead"
			:isRevercedText="isRevercedText"
		/>
		<Advantage
			:name="$t('cooperation.title.advantages.individualSearch.name')"
			:description="$t('cooperation.title.advantages.individualSearch.description')"
			image="/img/cooperation/individualSearch.png"
		/>
		<Advantage
			:name="$t('cooperation.title.advantages.ourSupport.name')"
			:description="$t('cooperation.title.advantages.ourSupport.description')"
			:isRevercedHead="isRevercedHead"
			:isRevercedText="isRevercedText"
			image="/img/cooperation/ourSupport.png"
		/>
		<Advantage
			:name="$t('cooperation.title.advantages.eventPages.name')"
			:description="$t('cooperation.title.advantages.eventPages.description')"
			image="/img/cooperation/eventPages.png"
		/>
	</div>
</template>
<style lang="less" scoped>
.advantageslist {
	display: flex;
	flex-direction: column;
	gap: 50px;
	padding-bottom: 50px;
	justify-content: center;
}
</style>
