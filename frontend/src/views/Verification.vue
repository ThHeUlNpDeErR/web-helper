<template>
  <div class="verification-container">
    <h1>Email Verification</h1>
    <form @submit.prevent="verify">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="code">Verification Code:</label>
        <input type="text" id="code" v-model="code" required>
      </div>
      <button type="submit">Verify</button>
    </form>

    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
export default {
name:'emailVerification',
  data() {
    return {
      email: '',
      code: '',
      message: ''
    };
  },
  methods: {
    verify() {
      // 在这里添加发送请求到后端进行验证的代码
      // 以下是一个示例，实际中你需要替换成实际的验证逻辑
      this.message = 'Verifying...';
      setTimeout(() => {
        if (this.email && this.code) {
          // 假设验证成功
          this.message = 'Verification successful!';
        } else {
          this.message = 'Verification failed. Please check your email and code.';
        }
      }, 1000);
    }
  }
};
</script>

<style scoped>
.verification-container {
  max-width: 300px;
  margin: 0 auto;
  text-align: center;
}

div {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}

button {
  padding: 10px 15px;
  cursor: pointer;
}

p {
  color: green;
}
</style>