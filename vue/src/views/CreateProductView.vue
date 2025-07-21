<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { crud } from '@/auth/crud'
const { createProduct } = crud();
const router = useRouter();

const user = JSON.parse(localStorage.getItem('user'));
const message = ref(null);
const errors = ref({
    name: [],
    price: []
});

const product = ref({
    name: '',
    price: '',
    description: '',
    user_id: user ? user.id : null,
    photo_path: '',
    video_path: ''
});

const handleCreateProduct = async () => {
    try {
        const formData = new FormData();

        formData.append('name', product.value.name);
        formData.append('price', product.value.price);
        formData.append('description', product.value.description);
        formData.append('user_id', product.value.user_id);

        if (product.value.photo_path) {
            formData.append('photo_path', product.value.photo_path);
        }
        if (product.value.video_path) {
            formData.append('video_path', product.value.video_path);
        }

        await createProduct(formData);

        product.value.name = '';
        product.value.price = '';
        product.value.description = '';
        product.value.photo_path = '';
        product.value.video_path = '';
        errors.value = {
            name: [],
            price: []
        };
        message.value = 'Succesfully created Product.';
    } catch (err) {
        errors.value = JSON.parse(err.message);
        message.value = '';
    }
};
onMounted(() => {
    if (user == null) {
        router.push('/login');
        return;
    }
});
</script>

<template>
    <div class="create-product-form">
        <form method="post" @submit.prevent="handleCreateProduct">
            <label v-if="user.plan.id == 2 || user.plan.id == 1">Photo</label>
            <input ref="file" @change="e => product.value.photo_path = e.target.files[0]"
                v-if="user.plan.id == 2 || user.plan.id == 1" type="file" name="photo" accept="image/*">

            <label v-if="user.plan.id == 1">Video</label>
            <input ref="file" @change="e => product.value.video_path = e.target.files[0]" v-if="user.plan.id == 1"
                type="file" name="video" accept="video/*">

            <label>Name</label>
            <input type="text" name="name" v-model="product.name" required>
            <p class="error" v-if="errors.name">{{ errors.name[0] }}</p>

            <label>Price</label>
            <input type="number" name="price" v-model="product.price">
            <p class="error" v-if="errors.price">{{ errors.price[0] }}</p>

            <label>Description</label>
            <textarea rows="4" name="description" v-model="product.description"></textarea>

            <button type="submit">Create</button>
        </form>

        <p class="message" v-if="message">{{ message }}</p>
    </div>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

.error {
    color: red;
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
    text-align: center;
}

.message {
    color: green;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-weight: bold;
    text-align: center;
}

label {
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
}

.create-product-form form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.create-product-form form input,
.create-product-form form textarea {
    padding: 10px;
    border-radius: 10px;
    border: 2px solid black;
}

.create-product-form {
    max-width: 600px;
    margin: auto;
}

.create-product-form button {
    padding: 15px;
    border-radius: 10px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.create-product-form button:hover {
    background-color: gray;
}
</style>