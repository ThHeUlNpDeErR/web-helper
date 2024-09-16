<template>
  <div class="contact-us">
    <h1>Contact Us</h1>
    <p>If you have any more information, please reach out to us via email.</p>
    <form @submit.prevent="sendEmail">
      <div class="form-group">
        <label for="email">Your Email:</label>
        <input type="email" v-model="userEmail" id="email" required />
      </div>
      <div class="form-group">
        <label for="message">Message:</label>
        <textarea v-model="message" id="message" rows="5" required></textarea>
      </div>
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userEmail: '',
      message: ''
    };
  },
  methods: {
    sendEmail() {
      // You can integrate with an email sending service or API here
      // For example, using EmailJS, you might use emailjs.send(...)
      console.log(`Email sent from: ${this.userEmail}, Message: ${this.message}`);
      alert('Your message has been sent!');
      this.userEmail = '';
      this.message = '';
    }
  }
}
</script>

<style scoped>
.contact-us {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
