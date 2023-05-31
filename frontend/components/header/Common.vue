<script setup lang="ts">
import { RouteNameEnum } from '@/constants/enums/route';

const route = useRoute();

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
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
            v-if="route.name === RouteNameEnum.HOME"
            name="peredelano-afisha"
            width="142"
            alt="Peredelano Афиша"
          />
          <CommonIcon
            v-else
            name="back"
            :aria-label="$translate('global.button.back')"
          />
        </NuxtLink>
      </div>

      <div class="header__right">
        <HeaderSubscriptionExpired
          v-if="route.name === RouteNameEnum.HOME"
          class="header__subscription"
        />

        <nav
          class="header__navigation"
          role="navigation"
          :aria-label="$translate('global.nav')"
        >
          <NuxtLink
            v-if="route.name === RouteNameEnum.HOME"
            to="/about"
            class="header__navigation-link"
          >
            <CommonIcon
              name="info"
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
