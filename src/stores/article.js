import { ref } from "vue";
import { defineStore } from "pinia";
import api from "@/api/api";

export const useArticleStore = defineStore("article", () => {
  // state
  const articles = ref([]);
  const article = ref(null);
  const my_article = ref([]);

  const isLoading = ref(false);
  const my_loading = ref(false);

  // get all articles
  const getAllArticle = async () => {
    isLoading.value = true;
    try {
      const res = await api.get("/articles");
      console.log("All fetch api: ", res.data.items);
      articles.value = res.data?.data?.items ?? [];
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  // get article by id
  const getArticleById = async (id) => {
    try {
      const res = await api.get(`/articles/${id}`);
      article.value = res.data?.data ?? null;
    } catch (error) {
      console.error(error);
    }
  };

  // get own articles
  const getOwnArticle = async () => {
    my_loading.value = true;
    try {
      const res = await api.get("/articles/own");
      my_article.value = res.data?.data?.items ?? [];
    } catch (error) {
      console.error(error);
    } finally {
      my_loading.value = false;
    }
  };

  // create article
  const createArticle = async (payload) => {
    try {
      const res = await api.post("/articles", payload);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // create thumbnail
  const createThumbnail = async (id, payload) => {
    try {
      const res = await api.post(`/articles/${id}/thumbnail`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // delete article
  const deleteArticle = async (id) => {
    try {
      const res = await api.delete(`/articles/${id}`);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // update article
  const updateArticle = async (id, payload) => {
    try {
      const res = await api.put(`/articles/${id}`, payload);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    // state
    articles,
    article,
    my_article,
    isLoading,
    my_loading,

    // actions
    getAllArticle,
    getArticleById,
    getOwnArticle,
    createArticle,
    createThumbnail,
    deleteArticle,
    updateArticle,
  };
});
