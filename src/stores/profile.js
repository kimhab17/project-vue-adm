import { defineStore } from "pinia";
import api from "@/api/api";
import { ref } from "vue";

export const useProfileStore = defineStore("profile", () => {
  const isLoadding = ref(false);
  const avaLoadding = ref(false);
  const dataLoadding = ref(false);
  const aCreator = ref(null);

  // creator fect
  const fecthProfileById = async (id) => {
    try {
      isLoadding.value = true;
      const res = await api.get(`/articles/by/${id}`);
      aCreator.value = res.data.data.items;
      // console.log(res.data.data.items);
      isLoadding.value = false;
      console.log(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  // upload avatar
  const uploadAvatar = async (payload) => {
    // for (let [key, value] of payload.entries()) {
    //   console.log(key, value);
    // }
    try {
      avaLoadding.value = true;
      const res = await api.post(`/profile/avatar`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      avaLoadding.value = false;
      console.log(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  // update profile data(name, email)
  const updateProfileData = async (payload) => {
    console.log(payload);
    try {
      dataLoadding.value = true;
      const res = await api.put(`/profile`, payload);
      console.log(res.data);
      dataLoadding.value = false;
      return res.data.result;
    } catch (err) {
      console.log(err);
    }
  };
  return {
    isLoadding,
    avaLoadding,
    aCreator,
    dataLoadding,
    fecthProfileById,
    uploadAvatar,
    updateProfileData,
  };
});
