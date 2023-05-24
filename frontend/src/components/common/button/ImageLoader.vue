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
  if (!event.target) return console.warn('Load Image Event has not target attached')
  const target = event.target as HTMLInputElement
  if (!target.files || !target.files[0])
    return console.warn('Load Image Event targed to has no files')
  const file = target.files[0]
  const reader = new FileReader()

  // TODO: определить тип при загрузке изображения
  reader.addEventListener(
    'load',
    (e: ProgressEvent<FileReader>) => {
      if (!e.target) return console.warn('Reader Load Event has no target attached')
      const result = e.target.result
      if (typeof result !== 'string')
        return console.warn('Reader Load Event received data format which is not supported')
      imageSrc.value = result
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
        :button-text="t('component.new-event-modal.add-image')"
        :is-active="!imageSrc"
        @click="fileIsLoading ? null : input?.click()"
      />
      <CustomButton
        v-if="imageSrc"
        button-class="button is-small"
        :button-text="t('component.new-event-modal.remove-image')"
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
