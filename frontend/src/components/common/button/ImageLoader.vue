<script setup lang="ts">
import { ref, watch } from 'vue'
import CustomButton from '@/components/common/button/CustomButton.vue'
import { BASE_URL } from '@/constants/url'
import { useTranslation } from '@/i18n'

const { t } = useTranslation()

type Props = {
  externalImage?: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const input = ref<HTMLInputElement | null>(null)

const imageSrc = ref<string | null>(null)
const fileIsLoading = ref(false)

watch(
  () => props.externalImage,
  () => {
    imageSrc.value = `${BASE_URL}/${props.externalImage}`
  }
)

const loadImage = (event: Event) => {
  // не ясно, почему ругается при билде
  // говорит, что возможно null
  //@ts-ignore
  const file = (event.target as HTMLInputElement).files[0]
  const reader = new FileReader()

  // TODO: определить тип при загрузке изображения
  reader.addEventListener(
    'load',
    (e: ProgressEvent<FileReader>) => {
      // говорит, что возможно null
      //@ts-ignore
      imageSrc.value = e.target.result as string
    },
    { once: true }
  )
  reader.readAsDataURL(file)
  emit('update:modelValue', file)
}

const removeImage = () => {
  imageSrc.value = null
  emit('update:modelValue', null)
}
</script>

<template>
  <div class="row align-items-center">
    <div v-if="imageSrc" class="loader__preview">
      <img :src="imageSrc" class="avatar" />
    </div>

    <input accept="image/*" ref="input" type="file" @change="loadImage" class="d-none" />
    <div class="loader__buttons">
      <CustomButton
        button-class="button is-success is-small"
        :button-text="t('event.new.add-image')"
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
