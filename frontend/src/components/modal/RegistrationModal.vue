<script setup lang="ts">
import { computed, ref, defineProps, defineEmits } from 'vue'
import { type EventOnPoster } from '@common/types/event'
import { deleteEvent, getEvent, sendFormAboutRegistration } from '@/services/events.services'
import { useRoute, useRouter } from 'vue-router'
import CustomButton from '@/components/common/button/CustomButton.vue'
import CustomInput from '@/components/common/input/CustomInput.vue'
import { useTranslation } from '@/i18n'
const { t } = useTranslation()

const posterEvent = ref<EventOnPoster | null>(null)
const route = useRoute()

const props = defineProps({
  eventId: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close'])

const name = ref('')
const telegramNickname = ref('')
const profession = ref('')
const workplace = ref('')
const experienceInStartups = ref('')
const fromYouKnow = ref('')
const beenEarly = ref('')
const fromWhichCity = ref('')
const email = ref('')
const personaldataAgree = ref(false)
const feeAgree = ref(false)

const submitAvailable = computed(() => {
  return [
    name.value,
    telegramNickname.value,
    profession.value,
    workplace.value,
    experienceInStartups.value,
    fromYouKnow.value,
    beenEarly.value,
    fromWhichCity.value,
    email.value,
    personaldataAgree.value,
    feeAgree.value
  ].every((a) => !!a)
})

const submitInfo = computed(() => {
  return {
    eventId: props.eventId,
    telegramNickname: telegramNickname.value,
    name: name.value,
    profession: profession.value,
    workplace: workplace.value,
    experienceInStartups: experienceInStartups.value,
    fromYouKnow: fromYouKnow.value,
    beenEarly: beenEarly.value,
    fromWhichCity: fromWhichCity.value,
    email: email.value,
    personaldataAgree: personaldataAgree.value,
    feeAgree: feeAgree.value
  }
})

const submit = async () => {
  if (!submitAvailable.value) {
    return
  }

  sendFormAboutRegistration(submitInfo.value).then(() => {
    localStorage.setItem('REGISTRATION', 'true')
    localStorage.setItem('REGISTRATION_DATA', JSON.stringify(submitInfo.value))
    window.location.href = `/payment/${props.eventId}`
  })
}

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <div class="modal-card form">
    <div class="modal-card__head">
      <h2 class="modal-card__title">Регистрация</h2>
    </div>
    <div class="modal-card__body body">
      <div class="form-fields">
        <CustomInput
          input-type="input"
          input-name="name"
          input-placeholder="Name, Surname (for a badge, in Latin)"
          v-model="name"
        />
        <CustomInput
          input-type="input"
          input-name="telegramNickname"
          input-placeholder="Telegram (in @nickname format) - for communication"
          v-model="telegramNickname"
        />
        <CustomInput
          input-type="input"
          input-name="profession"
          input-placeholder="Profession (for a badge, no more than 24 characters, including spaces)"
          v-model="profession"
        />
        <CustomInput
          input-type="input"
          input-name="workplace"
          input-placeholder="Workplace"
          v-model="workplace"
        />
        <CustomInput
          input-type="datalist"
          input-name="experienceInStartups"
          input-placeholder="Have you ever worked in startups?"
          :options-list="['Yes', 'Nope']"
          v-model="experienceInStartups"
        />
        <CustomInput
          input-type="datalist"
          input-name="from"
          input-placeholder="How did you know about us?"
          :options-list="['Twitter', 'Instagram', 'From friends', 'Telegram', 'LinkedIn']"
          v-model="fromYouKnow"
        />
        <CustomInput
          input-type="datalist"
          input-name="beenEarly"
          input-placeholder="Have you been to our meetups before?"
          :options-list="['Nope', 'Yes, once', 'Yes, more than once']"
          v-model="beenEarly"
        />
        <CustomInput
          input-type="input"
          input-name="fromWichCity"
          input-placeholder="From which city will you go to the meetup?"
          v-model="fromWhichCity"
        />
        <CustomInput
          input-type="input"
          input-name="email"
          input-placeholder="E-mail address"
          v-model="email"
        />
      </div>
    </div>
    <ul class="form-agreements-list">
      <li class="form-agreements-item">
        <input type="checkbox" id="personaldata" name="personaldata" v-model="personaldataAgree" />
        <label class="form-agreements-item__label" for="personaldata"
          >I agree to the processing of personal data</label
        >
      </li>
      <li class="form-agreements-item">
        <input type="checkbox" id="fee" name="fee" v-model="feeAgree" />
        <label class="form-agreements-item__label" for="fee"
          >I understand that I will have to pay the entrance fee.</label
        >
      </li>
    </ul>
    <div class="modal-card__foot">
      <CustomButton
        class="modal-card__button"
        button-class="button__success"
        :button-text="t('component.new_event_modal.submit')"
        @click="submit()"
      />
      <CustomButton
        class="modal-card__button"
        button-class="button__ordinary"
        :button-text="t('component.new_event_modal.cancel')"
        @click="closeModal()"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.modal-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: auto;
  align-items: center;
  gap: var(--space-unrelated-items);
  background: var(--color-white);
  &__head,
  &__foot {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}

.body {
  overflow-y: auto;
  padding: 20px var(--padding-side);
}

.form {
  &-fields,
  &-agreements-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-related-items);
    align-items: center;
  }

  &-agreements-item {
    display: flex;
    align-items: center;
    gap: var(--space-related-items);

    &__label {
      font-size: var(--font-size-XS);
      line-height: var(--line-height-XS);
    }
  }
}

.submit-button {
  color: var(--color-white);
  background: var(--color-accent-green-main);
  height: 40px;
  width: 100%;
  border-radius: 6px;
  padding: 7px 16px 7px 16px;
  justify-content: center;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
}
</style>
