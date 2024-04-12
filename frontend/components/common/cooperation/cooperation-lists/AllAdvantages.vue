<script setup lang="ts">
import Advantage from '../Advantage.vue';
</script>

<template>
	<Advantage
		:name="$t('cooperation.hello.advantages.allEvents.name')"
		:description="$t('cooperation.hello.advantages.allEvents.description')"
	/>
	<Advantage
		:name="$t('cooperation.hello.advantages.simpleCreating.name')"
		:description="$t('cooperation.hello.advantages.simpleCreating.description')"
	/>
	<Advantage
		:name="$t('cooperation.hello.advantages.individualSearch.name')"
		:description="$t('cooperation.hello.advantages.individualSearch.description')"
	/>
	<Advantage
		:name="$t('cooperation.hello.advantages.ourSupport.name')"
		:description="$t('cooperation.hello.advantages.ourSupport.description')"
	/>
	<Advantage
		:name="$t('cooperation.hello.advantages.eventPages.name')"
		:description="$t('cooperation.hello.advantages.eventPages.description')"
	/>
</template>
