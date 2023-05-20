<script setup lang="ts">
  // не ясно, почему ругается на defineEmits при билде
  //@ts-ignore
  import {defineEmits, ref} from 'vue';
  import CustomButton from "@/components/common/button/CustomButton.vue";

  const input = ref<HTMLInputElement | null>(null);

  const imageSrc = ref<string | null>(null)
  const showImage = ref(false);

  const emit = defineEmits(['update:modelValue']);
  const fileIsLoading = ref(false);

  const loadImage = (event: Event) => {
    // говорит, что возможно null
    //@ts-ignore
    const file = (event.target as HTMLInputElement).files[0]
    const reader = new FileReader()

    // TODO: определить тип при загрузке изображения
    reader.addEventListener('load', (e: ProgressEvent<FileReader>) => {
      // говорит, что возможно null
      //@ts-ignore
      imageSrc.value = e.target.result as string;
    }, {once: true})
    reader.readAsDataURL(file)
    emit('update:modelValue', file)
    showImage.value = true
  }

  const removeImage = () => {
    imageSrc.value = null
    emit('update:modelValue', null)
  }

</script>

<template>
  <div class="row align-items-center">
    <div
      v-if="imageSrc"
      class="loader__preview"
    >
      <img
        :src="imageSrc"
        class="avatar"
        @load="showImage = true"
      >
    </div>

    <input
      accept="image/*"
      ref="input"
      type="file"
      @change="loadImage"
      class="d-none"
    >
    <div class="loader__buttons">
      <CustomButton
        button-class="button is-success is-small"
        button-text="Add image"
        :is-active="!imageSrc"
        @click="fileIsLoading ? null : input?.click()"
      />
      <CustomButton
        v-if="imageSrc"
        button-class="button is-small"
        button-text="Remove image"
        @click="removeImage"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
  .d-none {
    display: none;
  }

  .loader {
    &__preview {
      object-fit: cover;
      max-height: 200px;
      max-width: 200px;
    }

    &__buttons {
      display: flex;
      gap: 15px;
    }
  }
</style>