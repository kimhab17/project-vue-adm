<template>
  <nav class="navbar navbar-expand navbar-modern fixed-top px-4">
    <!-- Sidebar toggle -->
    <button
      @click="statuesModal.sidebarStatus()"
      class="btn btn-icon me-3"
      aria-label="Toggle sidebar"
    >
      <i class="bi bi-list"></i>
    </button>

    <!-- Brand -->
    <span class="navbar-brand fw-semibold">Portfolio</span>

    <!-- User -->
    <div class="ms-auto d-flex align-items-center user-info">
      <img :src="userImg" class="avatar" alt="avatar" />
      <span class="username">{{ userName }}</span>
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

<style>
/* Navbar container */
.navbar-modern {
  height: 64px;
  background: linear-gradient(
    135deg,
    rgba(68, 94, 225, 0.95),
    rgba(99, 102, 241, 0.95)
  );
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  color: #fff;
  z-index: 1050;
}

/* Brand */
.navbar-brand {
  font-size: 1.1rem;
  letter-spacing: 0.3px;
  color: #fff;
}

/* Icon button */
.btn-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  border: none;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
}

.btn-icon:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-1px);
}

/* User section */
.user-info {
  gap: 10px;
}

.username {
  font-size: 0.9rem;
  font-weight: 500;
  opacity: 0.95;
}

/* Avatar */
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.4);
  transition: transform 0.2s ease;
}

.avatar:hover {
  transform: scale(1.05);
}
</style>
