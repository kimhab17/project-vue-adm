import { defineStore } from "pinia";
import api from "@/api/api";
import { ref } from "vue";

export const useCategoryStore = defineStore("category", () => {
  const categories = ref([]);
  const category = ref(null);
  const isLoading = ref(false);
  const delete_loading = ref(false);
  const update_loading = ref(false);

  const fetchCategories = async () => {
    try {
      isLoading.value = true;
      const res = await api.get("/categories");
      categories.value = res.data.data.items;
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      isLoading.value = false;
    }
  };

  const deleteCategory = async (id) => {
    console.log(id);
    try {
      delete_loading.value = true;
      const res = await api.delete("/categories/" + id);
      console.log(res.data);
      delete_loading.value = false;
    } catch (err) {
      console.log("delete category err:", err);
    }
  };

  const updateCategory = async (id, payload) => {
    console.log(id, payload);
    try {
      update_loading.value = true;
      const res = await api.put(`/categories/${id}`, payload);
      console.log("res update", res.data);
    } catch (err) {
      console.log("update article err", err);
    }
  };

  const createCategory = async (payload) => {
    try {
      const res = await api.post(`/categories`, payload);
      console.log("res create", res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getCategoryById = async (id) => {
    try {
      const res = await api.get(`/categories/${id}`);
      category.value = res.data.data.name;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    categories,
    isLoading,
    category,
    fetchCategories,
    deleteCategory,
    updateCategory,
    createCategory,
    getCategoryById,
  };
});
