<script setup lang="ts">
import { type PropType } from 'vue';
type ButtonType = 'button' | 'submit' | 'reset' | undefined;

const props = defineProps({
  buttonType: {
    type: String as PropType<ButtonType>,
    default: 'button'
  },
  buttonClass: {
    type: [String, Array<string>],
    required: true
  },
  buttonText: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  iconName: {
    type: String,
    default: ''
  },
  href: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <a
    v-if="props.href"
    :href="props.href"
    :class="[
      'button',
      props.buttonClass,
      { 'is-loading': isLoading },
      !isActive ? `${props.buttonClass}--disabled` : ''
    ]"
    :disabled="!props.isActive"
  >
    <span class="button__text">{{ props.buttonText }}</span>
  </a>
  <button
    v-else
    class="button"
    :type="props.buttonType"
    :class="[
      'button',
      props.buttonClass,
      { 'is-loading': isLoading },
      !isActive ? `${props.buttonClass}--disabled` : ''
    ]"
    :disabled="!props.isActive"
  >
    <span class="button__text">{{ props.buttonText }}</span>
    <CommonCustomIcon
      v-if="props.iconName"
      class="button__icon"
      :name="props.iconName"
      width="24"
      height="24"
    />
  </button>
</template>

<style lang="less" scoped>
.button {
  display: flex;
  justify-content: center;
  border-radius: 24px;
  padding-top: 7px;
  padding-left: 16px;
  padding-right: 0;
  padding-bottom: 7px;
  align-items: center;

  &__text {
    margin-right: 16px;
    font-size: var(--font-size-M);
  }

  &__icon {
    margin-right: 16px;
    color: var(--color-input-field);
  }

  &__success {
    color: var(--color-white);
    background-color: var(--color-accent-green-main);

    &--inactive {
      opacity: 0.4;
    }

    &--disabled {
      opacity: 0.4;
    }
  }

  &__ordinary {
    color: var(--color-text-main);
    background-color: var(--color-white);
    border: 1px solid var(--color-input-field);

    &--disabled {
      color: var(--color-input-field);
    }
  }

  &__warning {
    color: var(--color-accent-red);
    background-color: var(--color-white);
    border: 1px solid var(--color-accent-red);
  }
}
</style>
