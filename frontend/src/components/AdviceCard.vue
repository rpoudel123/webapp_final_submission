<template>
  <div class="card">
    <h3>Advice</h3>
    <p class="text">"{{ advice.text }}"</p>

    <div class="details">
      <p><strong>Slip ID:</strong> {{ advice.slipId }}</p>
      <p><strong>Mood:</strong> {{ advice.moodTag }}</p>
      <p><strong>Rating:</strong> {{ advice.rating }}</p>
      <p v-if="advice.userNote"><strong>Note:</strong> {{ advice.userNote }}</p>
      <p><strong>Date Saved:</strong> {{ formattedDate }}</p>
    </div>

    <button v-if="showDelete" @click="$emit('delete')" class="delete-btn">
      Delete
    </button>
  </div>
</template>

<script>
export default {
  props: {
    advice: { type: Object, required: true },
    showDelete: { type: Boolean, default: false }
  },
  computed: {
    formattedDate() {
      return new Date(this.advice.dateSaved).toLocaleString();
    }
  }
};
</script>

<style scoped>
.card {
  background: white;
  padding: 15px;
  border-radius: 8px;
  margin: 10px 0;
  box-shadow: 0 3px 6px rgba(0,0,0,0.08);
}

.text {
  font-size: 1.1rem;
  margin-bottom: 10px;
}

.details {
  font-size: 0.9rem;
}

.delete-btn {
  margin-top: 10px;
  background: #ff4444;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
}

.delete-btn:hover {
  background: #dd2222;
}
</style>
