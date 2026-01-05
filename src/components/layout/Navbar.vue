<template>
  <nav class="navbar navbar-dark bg-dark px-3 fixed-top">
    <button
      @click="statuesModal.sidebarStatus()"
      class="btn btn-outline-light me-3"
    >
      <i class="bi bi-list"></i>
    </button>

    <span class="navbar-brand mb-0 h5">Portfolio</span>

    <div class="ms-auto d-flex align-items-center">
      <img
        :src="userImg"
        class="rounded-circle me-2 img-fluid"
        alt="avatar"
        width="40"
        height="40"
      />
      <span class="text-white">{{ userName }}</span>
    </div>
  </nav>
</template>
<script setup>
import { useSideStatusStore } from "@/stores/sidebarStatus";
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
const statuesModal = useSideStatusStore();
const authStore = useAuthStore();
const User = authStore.user;
const userName = ref("");
const userImg = ref("");
console.log("User navbar: ", User);
userName.value = User.firstName + " " + User.lastName;
userImg.value = User.avatar;
</script>

<style scoped>
nav.navbar {
  background-image: linear-gradient(#5672f9);
  color: #fff;
  margin-bottom: 0 !important;
}

.navbar-brand,
.ms-auto .text-white {
  color: #fff !important;
}

.btn.btn-outline-light {
  color: #fff;
  border-color: rgba(255, 255, 255, 0.5);
  background-color: transparent;
}

.btn.btn-outline-light:hover,
.btn.btn-outline-light:focus {
  background-color: var(--btn-hover);
  color: #fff;
  border-color: #0b5ed7;
}

.ms-auto img.rounded-circle {
  border: 2px solid rgba(255, 255, 255, 0.2);
}
</style>
