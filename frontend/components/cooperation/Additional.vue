<script setup lang="ts">
import { additional } from './items'

</script>

<template>
    <h2 class="additional__wrapper--header">{{ $t('cooperation.additionalServices.title') }}</h2>
    <div class="additional__wrapper">
        <ul class="additional__wrapper--list">
            <li
                v-for="item in additional"
                :key="item.title"
            >
                <CooperationItemsAdditional v-bind="item" />
            </li>
        </ul>
    </div>
</template>

<style scoped lang="less">
.additional__wrapper {
    border: 2px solid var(--color-accent-green-main);
	border-radius: 8px;
    padding: 24px 86px 45px 72px;

    @media (max-width: 950px) {
        padding: 14px;

        overflow: hidden;
    }

    &--list {
        display: flex;
        flex-direction: column;
        gap: 46px;
    }
}
</style>