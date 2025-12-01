<template>
  <div id="app">
    <NavBar :user="user" @logout="handleLogout" />

    <main v-if="!user" class="center">
      <AuthForm @logged-in="handleLogin" />
    </main>

    <main v-else class="layout">
      <RandomAdvice />
      <SavedAdviceList />
    </main>
  </div>
</template>

<script>
import { setAuthToken } from './api.js';
import NavBar from './components/NavBar.vue';
import AuthForm from './components/AuthForm.vue';
import RandomAdvice from './components/RandomAdvice.vue';
import SavedAdviceList from './components/SavedAdviceList.vue';

export default {
  components: {
    NavBar,
    AuthForm,
    RandomAdvice,
    SavedAdviceList
  },
  data() {
    return {
      user: null
    };
  },
  created() {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      this.user = { token };
    }
  },
  methods: {
    handleLogin(token) {
      setAuthToken(token);
      this.user = { token };
    },
    handleLogout() {
      setAuthToken(null);
      this.user = null;
    }
  }
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  max-width: 1100px;
  margin: auto;
  padding: 20px;
}


.center {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}
</style>
