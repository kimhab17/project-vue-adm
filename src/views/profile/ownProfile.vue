<template>
    <div>
        <div class="my-4">
            <h3>{{ authStore.user.firstName }} {{ authStore.user.lastName }}</h3>
        </div>
        <div v-if="isToast">
            <base-toast :isResult="profileStore.uploadAvatar"
                :message="profileStore.uploadAvatar ? 'Upload Success !!' : 'Failed Upload'">
            </base-toast>
        </div>
        <div>
            <div>
                <!-- Avatar priview -->
                <div v-if="avatarPreview || existingAvatar" class="mb-2 position-relative">
                    <img :src="avatarPreview || existingAvatar" alt="Thumbnail Preview"
                        style="max-width: 200px; border-radius: 50%;" />
                    <div class="position-absolute" style="left: 16%; top: 70%;">
                        <span class="btn btn-outline-dark rounded-5" @click="isModalUpload = true"><i
                                class="bi bi-card-image fs-4"></i></span>
                    </div>
                </div>
            </div>
            <div>
                <div class="row">
                    <div class="col-4">
                        <base-input label="First Name" id="First Name" v-model="first_name"></base-input>
                    </div>
                    <div class="col-4">
                        <base-input label="Last Name" id="Last Name" v-model="last_name"></base-input>
                    </div>
                    <div class="col-5">
                        <base-input label="Email" id="Email" v-model="email"></base-input>
                    </div>
                </div>
                <div>
                    <base-button @click="handalUpdateData" :isLoading="profileStore.dataLoadding">
                        Save Data
                    </base-button>
                </div>
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
                    <label for="img-upload" class="btn btn-outline-secondary w-100">
                        Chose Image
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
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
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
let isToast = ref(false);

let avatarPreview = ref('');
let existingAvatar = ref('');
let uploadedImage = ref(null);

let cropperRef = ref(null)
let first_name = ref('');
let last_name = ref('')
let email = ref('')

onMounted(async () => {
    await authStore.fetchProfile();
    // user.value = authStore.user;

    existingAvatar.value = authStore.user.avatar;
    first_name.value = authStore.user.firstName;
    last_name.value = authStore.user.lastName;
    email.value = authStore.user.email;
})

const onThumbnailChange = (event) => {
    // get file when we choosed file
    const file = event.target.files[0];
    if (!file) return;

    // render image when ready selected to image crop
    const reader = new FileReader();
    reader.onload = (ev) => (uploadedImage.value = ev.target.result);
    reader.readAsDataURL(file);
    // console.log(file);
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
        artStore.getAllArticle();
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
</script>
<style scoped>
.cropper {
    height: 400px;
    width: 600px;
    background: #DDD;
}
</style>