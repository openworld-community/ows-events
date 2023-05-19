<script setup lang="ts">
  const props = defineProps({
    buttonType: {
      type: String,
      default: 'button'
    },
    buttonClass: {
      type: String,
      required: true
    },
    buttonText: {
      type: String,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: true
    }
  })
</script>

<template>
  <button
    :type="props.buttonType"
    :class="props.buttonClass"
    :disabled="!props.isActive"
  >
    {{ props.buttonText }}
  </button>
</template>

<style lang="less" scoped>
.button {
  width: 130px;
  height: 45px;
  padding: 10px 10px;
  margin-left: 15px;
  font-size: 18px;
  border: none;
  border-radius: 5px;

  &--green {
    background-color: #41B619;
    color: white;

    &:hover {
      background-color: #48D618;
    }
  }

  &--grey {
    background-color: #ccc;
    color: black;

    &:hover {
      background-color: #cccd;
    }
  }

}
</style>