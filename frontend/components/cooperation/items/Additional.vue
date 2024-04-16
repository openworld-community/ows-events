<script setup lang="ts">
import type { Additional } from '.';

defineProps<Additional>()
</script>

<template>
    <div class="additional">
        <div class="additional__left">
            <img
                class="additional__left--image"
                :src="image"
            >
            <div class="additional__left--wrapper">
                <h3 class="additional__left--header">{{ $t(title) }}</h3>
                <ul class="additional__left--list">
                    <li class="additional__left--item">
                        {{ $t(description) }}
                    </li>
                </ul>
            </div>
        </div>
        <div class="additional__right">
            <span class="additional__right--price">{{ $t(price) }}</span>
            <CommonButton
                :button-text="$t(button)"
                button-kind="success"
            />
        </div>
    </div>
</template>

<style scoped lang="less">
.additional {
    display: flex;
    justify-content: space-between;
    
    --gap: 42px;

    @media (max-width: 950px) {
        --gap: 15px;

        flex-direction: column; 
        gap: calc(var(--gap) * 2);

        position: relative;

        &::after {
            content: '';
            position: absolute;
            top: calc(100% + 23px);
            width: 100%;
            height: 1px;
            background-color: var(--color-input-field);
        }
    }


    &__left {
        display: flex;
        max-width: 61%;
        gap: var(--gap);
        justify-content: space-between;

        @media (max-width: 950px) {
            max-width: none;
        }

        &--image {
            width: 105px;
            height: 100px;

            @media (max-width: 950px) {
                display: none;
            }
        }

        &--list {
            padding-left: 30px;
        }

        &--item {
            list-style: disc;

            @media (max-width: 950px) {
                list-style: none;
            }
        }

        &--header {
            margin-bottom: 20px;

            @media (max-width: 950px) {
                text-align: center;
            }
        }
    }

    &__right {
        display: flex;
        gap: var(--gap);
        justify-content: space-between;
        align-items: center;

        @media (max-width: 950px) {
            flex-direction: column;
        }

        &--price {
            font-weight: 600;
            font-size: var(--font-size-L);
        }
    }
}
</style>