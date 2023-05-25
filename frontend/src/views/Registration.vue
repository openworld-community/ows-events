<script setup lang="ts">
import { computed, ref } from 'vue'
import { type EventOnPoster } from '@common/types/event'
import { deleteEvent, getEvent, sendFormAboutRegistration } from '@/services/events.services'
import { useRoute, useRouter } from 'vue-router'
import CustomButton from '@/components/common/button/CustomButton.vue'
import CustomInput from '@/components/common/input/CustomInput.vue'
import NewEventModal from '@/components/modal/NewEventModal.vue'
import { VueFinalModal } from 'vue-final-modal'
import { BASE_URL } from '@/constants/url'
import { useTranslation } from '@/i18n'
const { t } = useTranslation()

const posterEvent = ref<EventOnPoster | null>(null)
const route = useRoute()
const eventId = route.params.eventId as string
const router = useRouter()

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
    eventId: eventId,
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
    window.location.href = `/payment/${eventId}`
  })
}
</script>

<template>
  <main>
    <div class="actions">
      <div>
        <a href="/" class="button is-rounded" :aria-label="t('global.button.back')"
          ><i class="fas fa-arrow-left"></i
        ></a>
      </div>
      <div class="form" v-if="eventId">
        <h2>Регистрация</h2>
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
        <input type="checkbox" id="personaldata" name="personaldata" v-model="personaldataAgree" />
        <label for="personaldata">I agree to the processing of personal data</label>

        <input type="checkbox" id="fee" name="fee" v-model="feeAgree" />
        <label for="fee">I understand that I will have to pay the entrance fee.</label>
      </div>
      <div v-else>Эвент не найден:(</div>
    </div>

    <CustomButton
      button-class="button is-small"
      button-text="Подтвердить"
      @click="submit()"
      :is-active="submitAvailable"
    />
  </main>
</template>

<style lang="less" scoped>
.actions {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-bottom: 20px;
  width: 100%;

  .form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}

.image {
  height: 100%;
  min-height: 232px;
  object-fit: cover;
  border-radius: 0;
  width: 100%;
}

.card {
  width: 100%;
  box-shadow: none;

  .card-content {
    padding: 12px 16px 12px 16px;
  }

  .card-image {
    background-color: #cacaca;
  }

  .card-author {
    font-family: Inter;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0;
    text-align: left;
    color: #acacac;
  }

  .card-price {
    position: absolute;
    font-family: Inter;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0;
    text-align: center;
    color: #737373;
    left: 16px;
    top: 16px;
    border-radius: 16px;
    padding: 4px 10px 4px 10px;
    background-color: white;
    z-index: 200;
  }

  .card-title {
    color: #4e4e4e;
    font-family: Inter;
    font-size: 18px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0;
    text-align: left;
  }

  .card-datetime {
    font-family: Inter;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0;
    text-align: left;
    color: #acacac;
  }

  .card-geolink {
    font-family: Inter;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: 0;
    text-align: left;
    text-decoration-line: underline;
  }

  .card-description {
    color: #4e4e4e;
    font-family: Inter;
    font-size: 12px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0;
    text-align: left;
    min-height: 202px;
  }

  .card-contact-btn {
    color: white;
    background: #363636;
    height: 40px;
    width: 100%;
    border-radius: 6px;
    padding: 7px 16px 7px 16px;
  }
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
}
</style>
