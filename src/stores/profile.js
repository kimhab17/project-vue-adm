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
  const uploadAvatar = async (file) => {
    // for (let [key, value] of payload.entries()) {
    //   console.log(key, value);
    // }
    // console.log(file)
    try {
      avaLoadding.value = true;
      let formData = new FormData();
      formData.append("avatar", file);
      const res = await api.post(`/profile/avatar`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      console.log("upload avatar error", err);
    } finally {
      avaLoadding.value = false;
    }
  };

  const uploadAvatarBase64 = async (myImage) => {
    try {
      const response = await fetch(myImage);
      const blob = await response.blob();
      const file = new File([blob], "avatar.jpg", { type: "image/jpeg" });
      return await uploadAvatar(file);
    } catch (err) {
      console.log("Failed to upload avatar (base64):", err);
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
    uploadAvatarBase64,
  };
});
