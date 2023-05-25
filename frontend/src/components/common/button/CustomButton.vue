<script setup lang="ts">
import { type PropType } from 'vue'
import Icon from '@/components/common/icon/Icon.vue'

type ButtonType = 'button' | 'submit' | 'reset' | undefined

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
  }
})
</script>

<template>
  <button
    class="button"
    :type="props.buttonType"
    :class="[
      props.buttonClass,
      { 'is-loading': isLoading },
      !isActive ? `${props.buttonClass}--disabled` : ''
    ]"
    :disabled="!props.isActive"
  >
    <span class="button__text">{{ props.buttonText }}</span>
    <Icon
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
  border-radius: 24px;
  padding-top: 7px;
  padding-left: 16px;
  padding-right: 0;
  padding-bottom: 7px;
  align-items: center;

  &__text {
    margin-right: 16px;
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
}
</style>
