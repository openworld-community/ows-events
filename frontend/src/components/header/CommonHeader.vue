<script setup lang="ts">
import { useTranslation } from '@/i18n'
import { RouterLink, useRoute } from 'vue-router'
import SubscriptionExpired from './SubscriptionExpired.vue'

const { t } = useTranslation()
const route = useRoute()

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <header class="header">
    <div class="header__container">
      <div class="header__left">
        <RouterLink to="/">
          <button
            v-if="route.name === 'home'"
            @click.prevent="scrollToTop"
            :aria-label="t('home.button.afisha_logo_aria')"
          >
            <img
              src="@/assets/img/PeredelanoAfisha.svg"
              width="142"
              height="24"
              alt="Peredelano Афиша"
            />
          </button>
          <img
            v-else
            src="@/assets/img/icon/back.svg"
            width="24"
            height="24"
            :alt="t('global.button.back')"
          />
        </RouterLink>
        <SubscriptionExpired />
      </div>
      <nav
        v-if="route.name === 'home'"
        class="header__right"
        role="navigation"
        :aria-label="t('global.nav')"
      >
        <RouterLink to="/about" class="icon-text">
          <img
            src="@/assets/img/icon/info.svg"
            width="24"
            height="24"
            :alt="t('component.header.about')"
          />
        </RouterLink>
      </nav>
      <div
        v-if="route.name === 'event'"
        class="header__right"
        :aria-label="t('component.header.event.manage')"
      >
        <!-- <img
          src="@/assets/img/icon/edit.svg"
          width="24"
          height="24"
          :alt="t('event.button.edit')"
        />
        <img
          src="@/assets/img/icon/share.svg"
          width="24"
          height="24"
          :alt="t('global.button.share')"
        /> -->
      </div>
    </div>
  </header>
</template>

<style scoped lang="less">
// временно из-за bulma
a {
  padding: 0;
  margin: 0;
}

.header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;

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
    text-align: center;
    padding: 14px 0;
    margin-left: 12px;
    gap: 18px;
  }
}
</style>
