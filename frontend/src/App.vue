<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import 'vue-final-modal/style.css'
</script>

<template>
  <header>
    <div class="navbar-info">
      <RouterLink to="/">
        <span class="name subtitle">Poster</span>
      </RouterLink>
    </div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <RouterLink to="/about" class="icon-text">
        <span class="icon">
          <i class="fas fa-solid fa-info"></i>
        </span>
      </RouterLink>
    </nav>
  </header>

  <div class="container">
    <RouterView />
  </div>
</template>

<style lang="less" scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  width: 100%;

  justify-content: space-between;

  display: flex;
  flex-direction: row;

  .navbar-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-inline: 10px 15px;
    align-items: center;

    gap: 20px;
  }

  .navbar {
    font-size: 12px;
    text-align: center;
    padding: 20px;

    display: flex;
    gap: 20px;

    font-size: 125%;

    .name {
      font-size: 1.5rem;
      font-weight: bold;
      width: 120px;
    }

    .navbar-menu {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 20px;
      padding-inline: 15px;
    }
  }
}
</style>
