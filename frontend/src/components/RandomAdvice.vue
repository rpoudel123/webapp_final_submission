<template>
  <div class="random-card">
    <h2>Random Advice</h2>

    <button @click="fetchAdvice">Get New Advice</button>

    <div v-if="currentAdvice" class="advice-preview">
      <AdviceCard :advice="formattedAdvice" />

      <div class="inputs">
        <label>Mood Tag:</label>
        <input v-model="moodTag" placeholder="e.g. study, happy" />

        <label>Rating (1–5):</label>
        <input type="number" v-model.number="rating" min="1" max="5" />

        <label>Note:</label>
        <input v-model="userNote" placeholder="optional note" />
      </div>

      <button @click="saveAdvice" class="save-btn">Save Advice</button>
    </div>
  </div>
</template>

<script>
import { api } from '../api';
import AdviceCard from './AdviceCard.vue';

export default {
  components: { AdviceCard },
  data() {
    return {
      currentAdvice: null,
      moodTag: "",
      rating: 3,
      userNote: ""
    };
  },
  computed: {
    formattedAdvice() {
      return this.currentAdvice
        ? {
            text: this.currentAdvice.advice,
            slipId: this.currentAdvice.id,
            moodTag: this.moodTag,
            rating: this.rating,
            userNote: this.userNote,
            dateSaved: new Date()
          }
        : null;
    }
  },
  methods: {
    async fetchAdvice() {
      const res = await api.get("/advice/random");
      this.currentAdvice = res.data;
    },
    async saveAdvice() {
      if (!this.currentAdvice) return;

      await api.post("/advice", {
        slipId: this.currentAdvice.id,
        text: this.currentAdvice.advice,
        moodTag: this.moodTag,
        rating: this.rating,
        userNote: this.userNote
      });

      alert("Advice saved!");
      this.moodTag = "";
      this.rating = 3;
      this.userNote = "";
    }
  },
  created() {
    this.fetchAdvice();
  }
};
</script>

<style scoped>
.random-card {
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

button {
  padding: 10px 14px;
  background: #0099ff;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

button:hover {
  background: #007acc;
}

.inputs {
  display: flex;
  flex-direction: column;
  margin: 15px 0;
}

.inputs input {
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.save-btn {
  background: #28a745;
}

.save-btn:hover {
  background: #1f7f35;
}
</style>
