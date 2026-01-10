<template>
    <div v-if="isShowToast">
        <base-toast @closeToast="handleToast" :message="messToast">
            <p>message</p>
        </base-toast>
    </div>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <div class="card shadow">
                    <div class="card-body">
                        <h3 class="card-title text-center mb-4">Login</h3>

                        <form @submit.prevent="handleLogin">
                            <div class="mb-3">
                                <base-input label="Email" id="email" type="text" v-model="email"
                                    placeholder="Input Email..." @input="validateEmail" :error="errors.email" />
                            </div>

                            <div class="mb-3 position-relative">
                                <base-input label="Password" id="password" v-model="password"
                                    :type="isShowpass ? 'text' : 'password'" placeholder="Input Password..."
                                    @input="validatePass" :error="errors.password" />
                                <i class="bi icon-eye" :class="isShowpass ? 'bi-eye-slash' : 'bi-eye'"
                                    @click="isShowpass = !isShowpass"></i>

                            </div>

                            <!-- <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="remember">
                                <label class="form-check-label" for="remember">Remember me</label>
                            </div> -->

                            <!-- <P>{{ }}</P> -->

                            <div class="d-grid">
                                <base-button statusType="submit" :isLoading="Loading" :isDisable="disabled">
                                    Login <i class="bi bi-airplane"></i>
                                </base-button>
                            </div>
                        </form>

                        <!-- <div class="alert alert-danger mt-3" role="alert">
                            {{ }}
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { useRequiredValidator } from '@/composable/useRequiredValidator';

const router = useRouter();
const auth = useAuthStore();

let email = ref('')
let password = ref('')

let Loading = ref(false);
let disabled = ref(false);
let isShowpass = ref(false);
let isShowToast = ref(false);
let messToast = ref('');

const { errors, validateField } = useRequiredValidator();

const validateEmail = () => validateField("email", email.value, "Email is required");
const validatePass = () => validateField("password", password.value, "Password cannot be empty");

const validateForm = () => {
    let isValid = true;
    if (!validateEmail()) {
        isValid = false;
    }
    if (!validatePass()) {
        isValid = false
    }
    return isValid;
};

async function handleLogin() {
    if (!validateForm()) return;
    try {
        Loading.value = true;
        await auth.login(
            {
                email: email.value,
                password: password.value
            }
        );
        auth.fetchProfile();
        router.push('/');
    }
    catch (err) {
        console.log(err);
        isShowToast.value = !isShowToast.value
        messToast.value = err.response.data.message;
    }
    finally {
        Loading.value = false;
    }
}

function handleToast() {
    // isShowToast.value = !isShowToast.value
}
</script>

<style scoped>
.card {
    border-radius: 15px;
}

.icon-eye {
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 40px;
}
</style>