<template>
    <div class="profile-page">
        <div class="profile-card">
            <div class="profile-header">
                <div class="avatar-wrap">
                    <div v-if="currentAvatar" class="avatar">
                        <button class="btn position-absolute bg-primary" @click="isModalDelete = true">
                            delete
                        </button>
                        <img :src="currentAvatar" alt="Thumbnail Preview" />
                        <button class="edit" @click="isModalUpload = true" aria-label="Edit avatar">
                            <i class="bi bi-card-image"></i>
                        </button>

                    </div>
                    <div v-else class="avatar placeholder">
                        <div class="initials">{{ authStore.user.firstName?.charAt(0) || '' }}{{
                            authStore.user.lastName?.charAt(0) || '' }}</div>
                        <button class="edit" @click="isModalUpload = true" aria-label="Upload avatar">
                            <i class="bi bi-card-image"></i>
                        </button>
                    </div>
                </div>
                <div class="profile-meta">
                    <h3 class="name">{{ authStore.user.firstName }} {{ authStore.user.lastName }}</h3>
                    <p class="email">{{ authStore.user.email }}</p>
                </div>
            </div>

            <div v-if="isToast">
                <base-toast :isResult="profileStore.uploadAvatar"
                    :message="profileStore.uploadAvatar ? 'Upload Success !!' : 'Failed Upload'">
                </base-toast>
            </div>

            <div class="profile-body">
                <div class="form-grid">
                    <base-input label="First Name" id="First Name" v-model="first_name"></base-input>
                    <base-input label="Last Name" id="Last Name" v-model="last_name"></base-input>
                    <base-input class="full" label="Email" id="Email" v-model="email"></base-input>
                </div>

                <div class="actions">
                    <base-button class="primary" @click="handalUpdateData" :isLoading="profileStore.dataLoadding">
                        Save Data
                    </base-button>
                </div>
            </div>

            <!-- modal block -->
            <div v-if="isModalUpload">
                <base-modal title="Upload Image" @close="isModalUpload = false">
                    <template #body>
                        <div>
                            <cropper class="cropper" :src="uploadedImage" ref="cropperRef" :stencil-props="{
                                aspectRatio: 10 / 12
                            }" />
                        </div>
                        <label for="img-upload" class="btn btn-outline-secondary w-100 mt-3">
                            Choose Image
                        </label>
                        <input type="file" id="img-upload" class="form-control d-none" @change="onThumbnailChange" />
                    </template>
                    <template #footer>
                        <base-button @click="handalUploadAvatar" :isLoading="profileStore.avaLoadding">
                            Save Image
                        </base-button>
                    </template>
                </base-modal>
            </div>
            <div v-if="isModalDelete">
                <base-modal title="Upload Image" @close="isModalDelete = false">
                    <template #body>
                        <p>Are you sure to delete profile?</p>
                    </template>
                    <template #footer>
                        <base-button @click="handalDeleteAvatar" variants="danger">
                            Delete
                        </base-button>
                    </template>
                </base-modal>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useProfileStore } from '@/stores/profile';
import { useAuthStore } from '@/stores/auth';
import { useArtitleStore } from '@/stores/article';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const profileStore = useProfileStore();
const artStore = useArtitleStore();
const authStore = useAuthStore();
const router = useRouter();

let isModalUpload = ref(false);
let isModalDelete = ref(false);
let isToast = ref(false);

let avatarPreview = ref('');
let existingAvatar = ref('');
let uploadedImage = ref(null);

let cropperRef = ref(null)
let first_name = ref('');
let last_name = ref('')
let email = ref('')

onMounted(async () => {
    if (authStore.user) {
        Object.assign(authStore.user);
    }
    first_name.value = authStore.user.firstName;
    last_name.value = authStore.user.lastName;
    email.value = authStore.user.email;
})

const currentAvatar = computed(
    () => authStore.user?.avatar
);

const onThumbnailChange = (event) => {
    // get file when we choosed file
    const file = event.target.files[0];
    if (!file) return;

    // render image when ready selected to image crop
    const reader = new FileReader();
    reader.onload = (ev) => (uploadedImage.value = ev.target.result);
    reader.readAsDataURL(file);
}

// button submit avatar
const handalUploadAvatar = async () => {
    const canvas = cropperRef.value.getResult().canvas;
    const avatar = canvas.toDataURL("image/jpeg", 0.9);
    isToast.value = true;
    await profileStore.uploadAvatarBase64(avatar);
    uploadedImage.value = null;
    if (profileStore.uploadAvatar) {
        router.push({ name: 'dashboard' });
        await artStore.getAllArticle();
        await authStore.fetchProfile();
    }
}

// update name, email
const handalUpdateData = async () => {
    await profileStore.updateProfileData({
        firstName: first_name.value.trim(),
        lastName: last_name.value.trim(),
        email: email.value.trim()
    });
    if (profileStore.updateProfileData) {
        router.push({ name: 'dashboard' });
        artStore.getAllArticle();
    }
}

// delete profile
const handalDeleteAvatar = async () => {
    await profileStore.deleteAvatar();
    isModalDelete.value = false;
    await authStore.fetchProfile();
}
</script>
<style scoped>
.profile-page {
    padding: 28px;
    display: flex;
    justify-content: center;
}

.profile-card {
    width: 100%;
    max-width: 980px;
    background: #fff;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 10px 30px rgba(12, 16, 24, 0.08);
}

.profile-header {
    display: flex;
    gap: 20px;
    align-items: center;
    margin-bottom: 18px;
}

.avatar-wrap {
    flex: 0 0 auto;
}

.avatar {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    padding: 4px;
    background: var(--bg-gradient);
    display: flex;
    align-items: center;
    justify-content: center;
}

.avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    display: block;
}

.avatar.placeholder {
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.06), rgba(255, 255, 255, 0.02));
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
}

.initials {
    font-size: 36px;
    font-weight: 700;
    color: #fff;
}

.edit {
    position: absolute;
    right: 8px;
    bottom: 8px;
    background: rgba(255, 255, 255, 0.95);
    border: none;
    border-radius: 10px;
    padding: 6px 8px;
    cursor: pointer;
    color: var(--btn-default);
    box-shadow: 0 6px 18px rgba(16, 24, 40, 0.06);
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.profile-meta .name {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
}

.profile-meta .email {
    margin-top: 6px;
    color: #6b7280;
    font-size: 14px;
}

.profile-body {
    margin-top: 6px;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
}

.form-grid .full {
    grid-column: 1 / -1;
}

.actions {
    margin-top: 18px;
    display: flex;
    justify-content: flex-end;
}

.actions .primary {
    background: var(--btn-default);
    color: #fff;
    border-radius: 10px;
    padding: 8px 14px;
    border: none;
}

.actions .primary:hover {
    background: var(--btn-hover);
}

.cropper {
    width: 100%;
    max-width: 640px;
    height: 400px;
    background: #f3f4f6;
    border-radius: 8px;
}

@media (max-width: 768px) {
    .profile-card {
        padding: 16px;
    }

    .profile-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
    }

    .avatar {
        width: 120px;
        height: 120px;
    }

    .form-grid {
        grid-template-columns: 1fr;
    }

    .actions {
        justify-content: flex-start;
    }
}
</style>