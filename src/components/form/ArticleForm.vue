<!-- we create the Article Form to make it reusable becuse we can use it 
 at create and update article -->
<template>
    <form class="grid gap-3 content-start">
        <div>
            <BaseInput label="Title *" v-model="formData.title" :error="errors.title" placeholder="Please Input Title"
                @blur="validateField('title', formData.title, 'Title is required')" />
        </div>
        <div>
            <label class="form-label mt-3">Category *</label>
            <select class="form-select" v-model="formData.categoryId" :class="{ 'is-invalid': errors.categoryId }"
                @change="validateField('categoryId', formData.categoryId, 'Category is required')">
                <option value="" disabled>Select category</option>
                <option v-for="category in categoryStore.categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                </option>
            </select>
            <div v-if="errors.categoryId" class="invalid-feedback d-block">
                {{ errors.categoryId }}
            </div>
        </div>

        <!-- thumnail -->
        <div>
            <label class="form-label mt-3">Thumbnail</label>
            <div v-if="thumbnailPreview || existingThumbnail" class="mb-2">
                <img :src="thumbnailPreview || existingThumbnail" alt="Thumbnail Preview"
                    style="max-width: 200px; border-radius: 4px;" />
            </div>
            <input type="file" class="form-control" @change="onThumbnailChange" />
        </div>

        <div>
            <label class="form-label mt-3">Content *</label>
            <textarea v-model="formData.content" class="form-control" rows="8" placeholder="Write content here..."
                :class="{ 'is-invalid': errors.content }"
                @blur="validateField('content', formData.content, 'Content is required')"></textarea>
            <div v-if="errors.content" class="invalid-feedback d-block">
                {{ errors.content }}
            </div>
        </div>
    </form>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useCategoryStore } from '@/stores/category'
import { useRequiredValidator } from '@/composable/useRequiredValidator'

const categoryStore = useCategoryStore();
const { errors, validateField } = useRequiredValidator();

const formData = ref({
    title: '',
    categoryId: '',
    thumbnail: null,
    content: '',
});

const existingThumbnail = ref('');

// const fileInputRef = ref(null)
onMounted(async () => {
    await categoryStore.fetchCategories()
})

const thumbnailPreview = ref('');
const onThumbnailChange = (event) => {
    const file = event.target.files[0] || null
    formData.value.thumbnail = file

    if (file) {
        thumbnailPreview.value = URL.createObjectURL(file);
    } else {
        thumbnailPreview.value = '';
    }
}

const validateForm = () => {
    const v1 = validateField('title', formData.value.title, 'Title is required');
    const v2 = validateField('categoryId', formData.value.categoryId, 'Category is required');
    const v3 = validateField('content', formData.value.content, 'Content is required');
    return v1 && v2 && v3;
}

const resetForm = () => {
    formData.value.title = '';
    formData.value.categoryId = '';
    formData.value.thumbnail = null;
    formData.value.content = '';
    existingThumbnail.value = ''
}

defineExpose({ formData, validateForm, resetForm, existingThumbnail });
</script>
