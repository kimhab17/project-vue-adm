<template class="bg-primary">
    <div>
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h1>All Articles</h1>
            <div>
                <base-input placeholder="Search........" v-model="artStore.search"></base-input>
            </div>
            <div>
                <base-button @click="createArticle">Create Article</base-button>
            </div>
        </div>
        <div class="row">
            <div class="col-12 text-center py-5" v-if="!artStore.articles?.length">
                <NotFound />
            </div>
            <div class="col-md-4 mb-4" v-for="art in artStore.articles" :key="art.id">
                <ArticleCaedSkeleton v-if="artStore.isLoadding" />
                <!-- loading article -->
                <ArticleCard :id="art.id" :title="art.title" :thumbnail="art.thumbnail" :content="art.content"
                    :avatar="art.avatar" :creatorName="art.creatorName" />
            </div>
        </div>
        <div class="position-absolute start-50">
            <base-button v-if="artStore.hasMore" @click="artStore.fetchMoreArticles" :isLoading="artStore.isLoadding">
                {{ artStore ? 'load More' : 'Loading...' }}
            </base-button>
        </div>
    </div>
</template>
<script setup>
import ArticleCard from '@/components/common/ArticleCard.vue';
import NotFound from '@/components/null/notFound.vue';
import { useArtitleStore } from '@/stores/article';
import { onMounted, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const artStore = useArtitleStore();
const router = useRouter();

// link to create article page
function createArticle() {
    router.push({ name: 'article.create' })
}

let timeout = null;
watch(
    () => artStore.search,
    (newVal) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            artStore.getAllArticle();
        }, 300);
    }
)

// load all article from api
onMounted(async () => {
    await artStore.getAllArticle();
});
</script>