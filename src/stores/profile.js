import { defineStore } from "pinia";
import api from "@/api/api";
import { ref } from "vue";

export const useProfileStore = defineStore("profile", () => {
  const isLoadding = ref(false);
  const aCreator = ref(null);

  const fecthProfileById = async (id) => {
    try {
      isLoadding.value = true;
      const res = await api.get(`/articles/by/${id}`);
      aCreator.value = res.data.data.items;
      console.log(res.data.data.items);
      isLoadding.value = false;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    isLoadding,
    aCreator,
    fecthProfileById,
  };
});
