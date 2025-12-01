<template>
  <div class="auth-card">
    <h2>{{ mode === 'login' ? 'Login' : 'Register' }}</h2>

    <form @submit.prevent="handleSubmit">
      <label>Email</label>
      <input type="email" v-model="email" required />

      <label>Password</label>
      <input type="password" v-model="password" required />

      <button type="submit">
        {{ mode === 'login' ? 'Login' : 'Register' }}
      </button>
    </form>

    <p class="toggle" @click="toggleMode">
      {{ mode === 'login'
        ? "Don't have an account? Register"
        : "Already have an account? Login"
      }}
    </p>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import { api } from '../api';

export default {
  data() {
    return {
      mode: "login",
      email: "",
      password: "",
      error: null
    };
  },
  methods: {
    toggleMode() {
      this.mode = this.mode === "login" ? "register" : "login";
      this.error = null;
    },
    async handleSubmit() {
      this.error = null;

      try {
        if (this.mode === "register") {
          await api.post("/auth/register", {
            email: this.email,
            password: this.password
          });
        }

        const res = await api.post("/auth/login", {
          email: this.email,
          password: this.password
        });

        const token = res.data.token;

        this.$emit("logged-in", token);
      } catch (err) {
        this.error = "Invalid email or password";
      }
    }
  }
};
</script>

<style scoped>
.auth-card {
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 350px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background: #0099ff;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background: #007acc;
}

.toggle {
  margin-top: 15px;
  color: #0099ff;
  cursor: pointer;
  text-align: center;
}

.error {
  margin-top: 10px;
  color: red;
  text-align: center;
}
</style>
