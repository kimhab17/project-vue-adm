<template>
    <div>
        <h1>own Profile</h1>
        <div v-if="isToast">
            <base-toast :isResult="profileStore.uploadAvatar"
                :message="profileStore.uploadAvatar ? 'Upload Success !!' : 'Failed Upload'">
            </base-toast>
        </div>
        <div>
            <div>
                <label class="form-label mt-3">Thumbnail</label>

                <!-- image priview -->
                <div v-if="avatarPreview || existingAvatar" class="mb-2">
                    <img :src="avatarPreview || existingAvatar" alt="Thumbnail Preview"
                        style="max-width: 200px; border-radius: 4px;" />
                </div>
                <!-- input image types -->
                <input type="file" class="form-control" @change="onThumbnailChange" />
                <base-button @click="handalUploadAvatar" :isLoading="profileStore.avaLoadding">
                    Save Image
                </base-button>
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
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProfileStore } from '@/stores/profile';
import { useAuthStore } from '@/stores/auth';
import { useArtitleStore } from '@/stores/article';
const profileStore = useProfileStore();
const artStore = useArtitleStore();
const authStore = useAuthStore();
const router = useRouter();

let isToast = ref(false);

let file = ref('');
let avatarPreview = ref('');
let existingAvatar = ref('');

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
    file.value = event.target.files[0];
    // check value formData
    // for (let [key, value] of formData.entries()) {
    //     console.log(key, value);
    // }
    // convert to url and display in preview
    if (file.value) {
        avatarPreview.value = URL.createObjectURL(file.value);
    }
    else {
        avatarPreview.value = '';
    }
}

// button submit avatar
const handalUploadAvatar = async () => {
    isToast.value = true;
    let formData = new FormData();
    formData.append('avatar', file.value);
    await profileStore.uploadAvatar(formData);
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