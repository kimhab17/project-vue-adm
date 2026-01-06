<template class="bg-primary">
    <div>
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h1>All Articles</h1>
            <div>
                <base-button @click="createArticle">Create Article</base-button>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4 mb-4" v-for="art in artStore.articles" :key="art.id">
                <!-- loading article -->
                <ArticleCaedSkeleton v-if="artStore.isLoadding" />
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
import { useArtitleStore } from '@/stores/article';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const artStore = useArtitleStore();
const router = useRouter();

// link to create article page
function createArticle() {
    router.push({ name: 'article.create' })
}

// load all article from api
onMounted(async () => {
    await artStore.getAllArticle();
});
</script>