// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  // на винде очень долго стартует дев-сервер, проблема недавняя
  // один из авторов Нукста на ГХ посоветовал такое решение
  // если у кого-то от этой настройки наоборот что-то ломается, то скажите - что-нибудь придумаем
  experimental: { watcher: 'chokidar' }
})
