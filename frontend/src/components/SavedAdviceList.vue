<template>
  <div class="list-card">
    <h2>Saved Advice</h2>

    <input
      v-model="search"
      placeholder="Search your saved advice..."
      class="search-input"
    />

    <div v-for="item in filteredAdvice" :key="item._id">
      <AdviceCard
        :advice="item"
        :showDelete="true"
        @delete="deleteAdvice(item._id)"
      />
    </div>

    <p v-if="filteredAdvice.length === 0" class="empty">
      No saved advice found.
    </p>
  </div>
</template>

<script>
import { api } from "../api";
import AdviceCard from "./AdviceCard.vue";

export default {
  components: { AdviceCard },
  data() {
    return {
      adviceList: [],
      search: ""
    };
  },
  computed: {
    filteredAdvice() {
      const q = this.search.toLowerCase();
      return this.adviceList.filter(item =>
        item.text.toLowerCase().includes(q)
      );
    }
  },
  async created() {
    const res = await api.get("/advice");
    this.adviceList = res.data;
  },
  methods: {
    async deleteAdvice(id) {
      await api.delete(`/advice/${id}`);
      this.adviceList = this.adviceList.filter(item => item._id !== id);
    }
  }
};
</script>

<style scoped>
.list-card {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.08);
  overflow-y: auto;
  max-height: 90vh;
}

.search-input {
  padding: 10px;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.empty {
  margin-top: 20px;
  color: #666;
  text-align: center;
}
</style>
