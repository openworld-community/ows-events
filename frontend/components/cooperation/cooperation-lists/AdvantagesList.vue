<script setup lang="ts">
import Advantage from '../Advantage.vue';

const isRevercedHead = 'advantage--reverced';
const isRevercedText = 'advantage__text--reverced';
</script>

<template>
	<div class="advantages-list">
		<Advantage
			:title="$t('cooperation.advantages.allEvents.title')"
			:description="$t('cooperation.advantages.allEvents.description')"
			image="/img/cooperation/advantage/allEvents.png"
		/>

		<Advantage
			:title="$t('cooperation.advantages.simpleCreating.title')"
			:description="$t('cooperation.advantages.simpleCreating.description')"
			image="/img/cooperation/advantage/simpleCreating.png"
			:isRevercedHead="isRevercedHead"
			:isRevercedText="isRevercedText"
		/>
		<Advantage
			:title="$t('cooperation.advantages.individualSearch.title')"
			:description="$t('cooperation.advantages.individualSearch.description')"
			image="/img/cooperation/advantage/individualSearch.png"
		/>
		<Advantage
			:title="$t('cooperation.advantages.ourSupport.title')"
			:description="$t('cooperation.advantages.ourSupport.description')"
			:isRevercedHead="isRevercedHead"
			:isRevercedText="isRevercedText"
			image="/img/cooperation/advantage/ourSupport.png"
		/>
		<Advantage
			:title="$t('cooperation.advantages.eventPages.title')"
			:description="$t('cooperation.advantages.eventPages.description')"
			image="/img/cooperation/advantage/eventPages.png"
		/>
	</div>
</template>
<style lang="less" scoped>
.advantages-list {
	display: flex;
	flex-direction: column;
	gap: 50px;
	justify-content: center;
	@media (max-width: 375px) {
		gap: 30px;
	}
}
</style>
