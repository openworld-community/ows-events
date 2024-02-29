<script setup lang="ts">
import { ref } from 'vue'
import { ComboboxAnchor, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxLabel, ComboboxRoot, ComboboxTrigger, ComboboxViewport, ComboboxCancel } from 'radix-vue'
import { vOnClickOutside } from '@vueuse/components';

defineProps({
    noBorder: {
        type: Boolean,
        default: false
    },
    // for managing multiple components open-state
    open: {
        type: Boolean,
        default: false
    }
})

const model = ref('')
const options = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple']

const isOpen = ref<boolean>(false)

const handleOpen = () => {
    return isOpen.value === true ? isOpen.value = false : isOpen.value = true
}

const clearModel = () => {
    model.value = ''
}
</script>
        
<template>
    <ComboboxRoot
        v-model="model"
        :open="isOpen"
        class="cb__root"
        @click="handleOpen"
    >
        <div class="cb__wrapper">
            <ComboboxInput
                v-on-click-outside="() => isOpen = false"
                :class="['cb__input', { 'no-border': noBorder }]"
                placeholder="placeholder"
            />
            <div class="cb__input--actions">
                <ComboboxTrigger class="cb__trigger">
                    <CommonButton
                        v-if="!model.length"
                        button-kind="multiselect"
                        :class="['cb__trigger--expand', { 'cb__trigger--expand--opened': isOpen }]"
                    />
                </ComboboxTrigger>
                <ComboboxCancel class="cb__cancel">
                    <CommonButton
                        v-if="model.length"
                        is-icon
                        icon-name="close"
                        :interactive="false"
                        class="cb__cancel--icon"
                        @click="clearModel"
                    />
                </ComboboxCancel>
            </div>

            <ComboboxContent class="cb__content">
                <ComboboxViewport>
                    <ComboboxGroup
                        as="ul"
                        class="cb__content--list"
                    >
                        <ComboboxItem
                            v-for="(option, index) in options"
                            :key="index"
                            as="li"
                            :value="option"
                            @click="handleOpen"
                        >
                            <!-- <ComboboxItemIndicator>
                                <CommonIcon name="check" />
                            </ComboboxItemIndicator> -->
                            <span>
                                {{ option }}
                            </span>
                        </ComboboxItem>
                    </ComboboxGroup>
                </ComboboxViewport>
            </ComboboxContent>
        </div>
    </ComboboxRoot>
</template>

<style scoped lang="less">
.cb__root {
    position: relative;
}

.cb__wrapper {
    // display: flex;
    position: relative;
}

.cb__input {
    width: 100%;
    padding: 8px 35px 8px 12px;

    &.no-border {
        border-color: transparent;
    }

    &--actions {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-right: 5px;

        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
    }
}

.cb__trigger {
    display: flex;
    justify-content: center;
    align-items: center;

    &--expand {
        padding: 0;
        // padding-right: 5px;
        background-color: transparent;
        border-color: transparent;

        &:deep(svg) {
            position: static;
            transition: rotate .15s ease-in-out, color .15s ease-in-out;
        }

        &--opened:deep(svg) {
            rotate: 180deg;
            color: var(--color-accent-green-main);
        }

        &:focus,
        &:active {
            border-color: transparent;
        }
    }
}

.cb__content {
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    z-index: 10;

    background-color: #fff;
    width: 100%;
    border: 1px solid black;
    border-radius: 8px;

    padding: 8px;

    &--list {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
}
</style>