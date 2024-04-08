<script setup lang="ts">
const { t } = useI18n();
const mobile = inject('mobile');

getMeta({
	title: t('meta.about_us.title'),
	description: t('meta.about_us.description')
});
</script>

<template>
	<div class="root">
		<HeaderCommon />
        <div class="cooperation">
            <div>
                Здесь у нас страница сотрудничества
            </div>
        </div>
		<FooterCommon v-if="!mobile" />
	</div>
</template>

<style lang="less" scoped>
.cooperation{
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
