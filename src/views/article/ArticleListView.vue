<template>
  <div>
    <!-- top bar -->
    <div class="d-flex justify-content-between mb-3">
      <h1>All Article</h1>
      <RouterLink :to="{ name: 'article.create' }">
        <base-button>Create Article</base-button>
      </RouterLink>
    </div>

    <!-- delete modal -->
    <base-modal v-if="isModal" title="Delete Article?" @close="isModal = false">
      <template #body> Are you sure? </template>
      <template #footer>
        <base-button @click="handleDelete" :isLoading="isLoadingDelete">
          Delete
        </base-button>
      </template>
    </base-modal>

    <!-- table -->
    <base-table
      :columns="columns"
      :items="articleStore.my_article"
      :isLoading="articleStore.my_loading"
      @edit="onEdit"
      @delete="onDelete"
    >
      <!-- title -->
      <template #column-title="{ item }">
        <span class="fw-medium line-clamp-1">
          {{ item.title }}
        </span>
      </template>

      <!-- thumbnail -->
      <template #column-thumbnail="{ item }">
        <img
          v-if="item.thumbnail"
          :src="item.thumbnail"
          alt="thumbnail"
          width="60"
          height="40"
          class="rounded object-fit-cover"
        />
        <span v-else class="text-muted">No image</span>
      </template>

      <!-- category -->
      <template #column-category="{ item }">
        <span class="fw-medium">
          {{ item.category?.name ?? "-" }}
        </span>
      </template>

      <!-- content -->
      <template #column-content="{ item }">
        <span class="line-clamp-1 w-70">
          {{ item.content }}
        </span>
      </template>
    </base-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useArticleStore } from "@/stores/article";

const articleStore = useArticleStore();
const router = useRouter();

const isModal = ref(false);
const selectId = ref(null);
const isLoadingDelete = ref(false);

onMounted(() => {
  articleStore.getOwnArticle();
});

// ✅ FIXED: thumbnail column added
const columns = [
  { key: "title", label: "Title" },
  { key: "thumbnail", label: "Thumbnail" },
  { key: "category", label: "Category" },
  { key: "content", label: "Content" },
];

const onEdit = (id) => {
  router.push({ name: "edit.article", params: { id } });
};

const onDelete = (id) => {
  selectId.value = id;
  isModal.value = true;
};

const handleDelete = async () => {
  if (!selectId.value) return;

  isLoadingDelete.value = true;
  try {
    await articleStore.deleteArticle(selectId.value);
    await articleStore.getOwnArticle();
    isModal.value = false;
    selectId.value = null;
  } catch (error) {
    console.error(error);
  } finally {
    isLoadingDelete.value = false;
  }
};
</script>
