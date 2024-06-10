<script setup>
const { t } = useI18n();
getMeta({
	title: t('meta.auth.title'),
	description: t('meta.auth.description')
});
definePageMeta({
	layout: 'auth'
});
</script>

<template>
	<UserUnauthorized />
</template>
