<template>
  <img alt="Vue logo" src="./assets/logo.png">
    <emailVerification @verified="handleVerification" />
    <PDFviewer v-if="isVerified" />
</template>

<script>
import emailVerification from './views/Verification.vue'
import PDFviewer from './views/PDFviewer.vue';

export default {
  name: 'App',
  components: {
    emailVerification,
    PDFviewer
  },
  data() {
    return {
      isVerified: false
    };
  },
  methods: {
    handleVerification() {
      this.isVerified = true;
    }
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
