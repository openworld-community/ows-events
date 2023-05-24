<script setup lang="ts">
import { useTranslation } from '@/i18n'
import { RouterLink, useRoute } from 'vue-router'

const { t } = useTranslation()
const route = useRoute()
</script>

<template>
  <header class="header">
    <div class="header__left">
      <RouterLink to="/">
        <img
          v-if="route.name === 'home'"
          src="@/assets/img/PeredelanoAfisha.svg"
          width="142"
          height="24"
          alt="Peredelano Афиша"
        />
        <img
          v-else
          src="@/assets/img/icon/back.svg"
          width="24"
          height="24"
          :alt="t('global.button.back')"
        />
      </RouterLink>
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
      <img src="@/assets/img/icon/edit.svg" width="24" height="24" :alt="t('event.button.edit')" />
      <img
        src="@/assets/img/icon/share.svg"
        width="24"
        height="24"
        :alt="t('global.button.share')"
      />
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 0; // временно из-за bulma
  min-height: 52px;
  max-height: 100vh;
  width: 100%;

  &__left {
    display: flex;
    padding: 14px 12px;
    align-items: center;
  }

  &__right {
    display: flex;
    text-align: center;
    padding: 14px;
    gap: 18px;
  }
}
</style>
