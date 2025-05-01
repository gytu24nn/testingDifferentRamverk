<template>
  <div id="app">
    <AppHeader />
  </div>
  <div>
    <AppHomePage />
  </div>
</template>

<script>
import AppHeader from './components/Header.vue'
import AppHomePage from './components/homePage.vue'

export default {
  name: 'App',
  components: {
    AppHeader, AppHomePage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
