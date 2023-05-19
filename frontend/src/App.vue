<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand name">Poster</div>
        <div class="navbar-menu">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style lang="less" scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  margin-left: 0px;
  padding: 20px;

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
  }
}
</style>
