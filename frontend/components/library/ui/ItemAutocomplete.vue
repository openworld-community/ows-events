<script setup lang="ts">
import { ref } from 'vue'
import { ComboboxContent, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxRoot, ComboboxTrigger, ComboboxViewport, ComboboxCancel } from 'radix-vue'
import { vOnClickOutside } from '@vueuse/components';

defineProps({
    noBorder: {
        type: Boolean,
        default: false
    },
    list: {
        type: Array,
        default: () => ['Apple', 'Banana', 'Grape', 'Cucumber', 'Tomato']
    },
    // передавать в виде ключа i18n
    // i.e. 'form.event.fields.price_placeholder'
    placeholder: {
        type: String,
        required: true
    }
})

const model = ref('')

const isOpen = ref<boolean>(false)

const handleOpen = () => {
    return isOpen.value === true ? isOpen.value = false : isOpen.value = true
}

const clearModel = () => {
    model.value = ''
    isOpen.value = false
}
</script>
        
<template>
    <ComboboxRoot
        v-model="model"
        :open="isOpen"
    >
        <div
            v-on-click-outside="() => isOpen = false"
            class="cb__wrapper"
        >
            <ComboboxInput
                :class="['cb__input', { 'no-border': noBorder }]"
                :placeholder="$t(placeholder)"
                @click="handleOpen"
            />
            <div class="cb__input--actions">
                <ComboboxTrigger
                    v-if="!model.length"
                    class="cb__trigger"
                    @click="handleOpen"
                >
                    <CommonButton
                        button-kind="multiselect"
                        :class="['cb__trigger--expand', { 'cb__trigger--expand--opened': isOpen }]"
                    />
                </ComboboxTrigger>
                <ComboboxCancel
                    v-if="model.length"
                    class="cb__cancel"
                    @click="clearModel"
                >
                    <CommonButton
                        is-icon
                        icon-name="close"
                        :interactive="false"
                        class="cb__cancel--icon"
                    />
                </ComboboxCancel>
            </div>

            <ComboboxContent class="cb__content">
                <ComboboxViewport>
                    <LibraryScrollArea>
                        <ComboboxGroup
                            as="ul"
                            class="cb__content--list"
                        >
                            <ComboboxItem
                                v-for="(option, index) in list"
                                :key="index"
                                as="li"
                                class="cb__content--list--item"
                                :value="option"
                                @click="handleOpen"
                            >
                                <span>
                                    {{ option }}
                                </span>
                                <ComboboxItemIndicator>
                                    <CommonIcon
                                        name="check"
                                        color="var(--color-accent-green-main)"
                                        style="display: flex; align-items: center; justify-content: center;"
                                    />
                                </ComboboxItemIndicator>
                            </ComboboxItem>
                        </ComboboxGroup>
                    </LibraryScrollArea>
                </ComboboxViewport>
            </ComboboxContent>
        </div>
    </ComboboxRoot>
</template>

<style scoped lang="less">
.cb__wrapper {
    position: relative;
}
.cb__input {
    width: 100%;
    padding: 8px 35px 8px 12px;
    border: 1px solid #dbdbdb;
    border-radius: 8px;

    &::placeholder {
        color: var(--color-input-icons);
    }

    &.no-border {
        border-color: transparent;
    }

    &--actions {
        display: flex;
        justify-content: center;
        align-items: center;

        position: absolute;
        top: 50%;
        right: 0;
        z-index: 10;
        transform: translateY(-50%);
    }
}

.cb__cancel {
    padding-right: 2px;
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
    z-index: 20;

    background-color: #fff;
    width: 100%;
    border: 1px solid #dbdbdb;
    border-radius: 8px;

    padding-block: 4px;

    &--list {
        display: flex;
        flex-direction: column;
        // gap: 5px;

        &--item {
            display: flex;
            justify-content: space-between;
            padding: 2px 0 2px 10px;

            &:focus-visible,
            &:active {
                background-color: var(--color-accent-green-main-10);
            }

            &:hover {
                @media (hover: hover) {
                    background-color: var(--color-accent-green-main-10);
                }
            }
        }
    }
}
</style>