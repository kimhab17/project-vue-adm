<template>
  <div>
    <div>
      <h1>Article Edit</h1>
    </div>
    <div>
      <ArticleForm ref="articleFormRef" />
      <base-button @click="handleUpdateArticle" :isLoading="isLoding">
        Update Article
      </base-button>
    </div>
  </div>
</template>
<script setup>
import ArticleForm from "@/components/form/ArticleForm.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useArticleStore } from "@/stores/article";

const router = useRouter();
const route = useRoute();
const articleStore = useArticleStore();

let articleFormRef = ref(null);
let id = Number(route.params.id);
let isLoding = ref(false);

// point to form data in article form by ref

// get aticle by id to provide value in input
onMounted(async () => {
  const formRef = articleFormRef.value;
  const form = formRef.formData;

  await articleStore.getArticleById(id);

  form.title = articleStore.article.title;
  form.categoryId = articleStore.article.category
    ? articleStore.article.category.id
    : null;
  form.thumbnail = articleStore.article.thumbnail;
  form.content = articleStore.article.content;
});

const handleUpdateArticle = async () => {
  const formRef = articleFormRef.value;
  if (!formRef.validateForm()) return;

  try {
    const form = formRef.formData;
    isLoding.value = true;
    const res = await articleStore.updateArticle(id, {
      title: form.title.trim(),
      categoryId: Number(form.categoryId),
      content: form.content.trim(),
    });
    router.push({ name: "article.index" });
    isLoding.value = false;
  } catch (err) {
    console.log("err catch:", err);
  }
};
</script>
