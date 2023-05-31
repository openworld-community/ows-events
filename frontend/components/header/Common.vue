<script setup lang="ts">
import { useTranslation } from '@/i18n'
import { RouterLink, useRoute } from 'vue-router'
import SubscriptionExpired from './SubscriptionExpired.vue'
import Icon from '@/components/common/icon/Icon.vue'

import { v4 } from 'uuid'
import { BASE_URL } from '@/constants/url'
import { ref } from 'vue'

import {
  verify
} from 'jsonwebtoken'

const { t } = useTranslation()
const route = useRoute()

const user = ref<{
  username: string
  id: string
} | null>(null)

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const checkUserToken = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    return
  }
  console.log(token)
  // const decoded = verify(token)
  // console.log(decoded)
  // if (decoded) {
    // user.value = {
    //   username: decoded.username,
    //   id: decoded.id
    // }
  // }
}

checkUserToken()

if (!localStorage.getItem('TEMPORARY_TOKEN')) {
  localStorage.setItem('TEMPORARY_TOKEN', v4())
}

const temporaryId = localStorage.getItem('TEMPORARY_TOKEN')
const AUTH_SERVER_URL = 'http://localhost:7090'
const authLink = ref<string>(
  `${AUTH_SERVER_URL}/auth/${temporaryId}/${encodeURIComponent(
    window.location.href + 'postauth/' + temporaryId
  )}`
)
console.log(authLink)
</script>

<template>
  <header class="header">
    <div class="header__container">
      <div class="header__left">
        <NuxtLink
          to="/"
          class="header__navigation-link"
          :aria-label="$translate('home.button.afisha_logo_aria')"
          @click.prevent="scrollToTop"
        >
          <CommonIcon
            v-if="route.name === 'home'"
            name="peredelano-afisha"
            width="142"
            height="24"
            alt="Peredelano Афиша"
          />
          <CommonIcon
            v-else
            name="back"
            width="24"
            height="24"
            :aria-label="$translate('global.button.back')"
          />
        </NuxtLink>
      </div>

      <div class="header__right">
        <HeaderSubscriptionExpired
          v-if="route.name === 'home'"
          class="header__subscription"
        />

        <nav
          class="header__navigation"
          role="navigation"
          :aria-label="$translate('global.nav')"
        >
          <NuxtLink
            v-if="route.name === 'home'"
            to="/about"
            class="header__navigation-link"
          >
            <CommonIcon
              name="info"
              width="24"
              height="24"
              :alt="$translate('component.header.about')"
            />
          </NuxtLink>

          <!--          <div-->
          <!--            v-if="route.name === 'event'"-->
          <!--            :aria-label="$translate('component.header.event.manage')"-->
          <!--          >-->
          <!--            <img-->
          <!--              src="@/assets/img/icon/edit.svg"-->
          <!--              width="24"-->
          <!--              height="24"-->
          <!--              :alt="$translate('event.button.edit')"-->
          <!--            />-->
          <!--            <img-->
          <!--              src="@/assets/img/icon/share.svg"-->
          <!--              width="24"-->
          <!--              height="24"-->
          <!--              :alt="$translate('global.button.share')"-->
          <!--            />-->
          <!--          </div>-->

          <p v-if="user && user.username">
            {{ user.username }}
          </p>
          <a v-else :href="authLink">Login via Telegram</a>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped lang="less">
.header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  //TODO разобраться с z-индексами
  z-index: 3;

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: var(--width-mobile);
    height: var(--header-height);
    //TODO: пока верстка только мобилки
    max-width: 480px;
    background-color: var(--color-white);
    padding-left: var(--padding-side);
    padding-right: var(--padding-side);
    margin-left: auto;
    margin-right: auto;

    @media (min-width: 1440px) {
      max-width: 600px;
    }
  }

  &__left {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding: 14px 0;
    margin-right: 12px;
  }

  &__right {
    display: flex;
    justify-content: flex-end;
    text-align: center;
    padding: 14px 0;
    margin-left: 12px;
    gap: 18px;
  }

  &__subscription {
    display: flex;
    max-width: max-content;
  }

  &__navigation {
    align-items: center;
    gap: 10px;
  }

  &__navigation-link {
    height: 100%;
    display: flex;
  }
}
</style>
