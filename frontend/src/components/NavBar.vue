<template>
  <header class="navbar">
    <h1>Random Advice App</h1>

    <div v-if="user">
      <button @click="$emit('logout')" class="logout-btn">Logout</button>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    user: { type: Object, default: null }
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 10px;
  background: #222;
  color: #fff;
  border-radius: 6px;
  margin-bottom: 20px;
}

.logout-btn {
  background: #ff4444;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 4px;
  cursor: pointer;
}

.logout-btn:hover {
  background: #dd2222;
}
</style>
