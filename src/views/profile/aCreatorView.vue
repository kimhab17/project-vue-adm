<template>
    <div>
        <h1>
            Get a Create Tor
        </h1>
        <p>id : {{ route.params.id }}</p>
        <div>
            <div class="row g-3">
                <div v-for="art in profileStore.aCreator" class="col-4">
                    <div class="card">
                        <div class="card-img">
                            <img :src="art.thumbnail" alt="" style="width: 100%; height: 300px;">
                        </div>
                        <div class="card-body">
                            <h4 class="card-title">{{ art.title }}</h4>
                            <p class="card-text">{{ formatDate(art.createdAt) }}</p>
                            <p class="card-text">
                                {{ art.content }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProfileStore } from '@/stores/profile';
import { formatDate } from '@/utils/dateFormat';

const route = useRoute();
const profileStore = useProfileStore();
onMounted(async () => {
    await profileStore.fecthProfileById(route.params.id);
});
// for (aticle in profileStore.aCreator) {
//     console.log(aticle);
// }
</script>