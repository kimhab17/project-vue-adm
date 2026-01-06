<template>
    <div>
        <div v-if="isModalCreate">
            <base-modal title="Create Artcle" @close="isModalCreate = false">
                <template #body>
                    <base-input label="Category Name" id="Name" v-model="categoryCreate"></base-input>
                    <p>{{ name_category }}</p>
                </template>
                <template #footer>
                    <base-button @click="isModalCreate = false">
                        cancel
                    </base-button>
                    <base-button variants="primary" @click="handleCreate">
                        Create
                    </base-button>
                </template>
            </base-modal>
        </div>
        <div v-if="isModalUpdate">
            <base-modal title="Update Category" @close="isModalUpdate = false">
                <template #body>
                    <base-input label="Category Name" id="Name" v-model="name_category"></base-input>
                </template>
                <template #footer>
                    <base-button @click="isModalUpdate = false">
                        cancel
                    </base-button>
                    <base-button variants="primary" @click="handleUpdate">
                        Update
                    </base-button>
                </template>
            </base-modal>
        </div>
        <div v-if="isModal">
            <base-modal title="Delete Category" @close="isModal = false">
                <template #body>
                    Are you sure to delete?
                </template>
                <template #footer>
                    <base-button @click="isModal = false">
                        cancel
                    </base-button>
                    <base-button variants="danger" @click="handleDelete">
                        Delete
                    </base-button>
                </template>
            </base-modal>
        </div>
        <div class="d-flex justify-content-between">
            <div>
                <h1>
                    Category
                </h1>
            </div>
            <div>
                <base-button @click="goCreate">Create Category</base-button>
            </div>
        </div>
        <div>
            <base-table :columns="columns" :items="categoryStore.categories" :isLoading="categoryStore.isLoading"
                @delete="goDelete" @edit="goEdit">
                <template #column-no>
                    <!-- {{ }} -->
                </template>
            </base-table>
        </div>
    </div>
</template>
<script setup>
import { useCategoryStore } from '@/stores/category';
import { onMounted, ref } from 'vue';

const categoryStore = useCategoryStore();

let isModalCreate = ref(false);
let isModalUpdate = ref(false);
let isModal = ref(false);
let id_category = ref(null);

let name_category = ref('');
let categoryCreate = ref('');
const columns = [
    { key: 'no', label: 'No' },
    { key: 'name', label: 'Name' }
];
onMounted(async () => {
    categoryStore.fetchCategories();
    console.log("all category:", categoryStore.categories);
});

const goCreate = () => {
    isModalCreate.value = true;
}

const goDelete = (id) => {
    isModal.value = true;
    id_category.value = id;
}

const goEdit = async (id) => {
    isModalUpdate.value = true;
    await categoryStore.getCategoryById(id);
    name_category.value = categoryStore.category;
    id_category.value = id;
}

const handleDelete = async () => {
    await categoryStore.deleteCategory(id_category.value);
    isModal.value = false;
    categoryStore.fetchCategories();
    id_category.value = null;
}

const handleUpdate = async () => {
    await categoryStore.updateCategory(id_category.value, { name: name_category.value });
    isModalUpdate.value = false;
    categoryStore.fetchCategories();
}

const handleCreate = async () => {
    await categoryStore.createCategory({ name: categoryCreate.value });
    isModalCreate.value = false;
    categoryStore.fetchCategories();
}

</script>