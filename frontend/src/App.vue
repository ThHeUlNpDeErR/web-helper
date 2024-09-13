<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <emailVerification/>
</template>

<script>
import emailVerification from './views/Verification.vue'

export default {
  name: 'App',
  components: {
    emailVerification
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
