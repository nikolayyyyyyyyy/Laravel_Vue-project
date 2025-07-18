<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const user = JSON.parse(localStorage.getItem('user'));
const message = ref(null);

const product = ref({
    name: '',
    price: '',
    description: '',
    user_id: user ? user.id : null
});

const createProduct = async (product) => {
    const response = await fetch('http://127.0.0.1:8000/api/products', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(product)
    });

    if (response.ok) {
        product.name = '';
        product.price = '';
        product.description = '';
        message.value = "Successfully created Product."
    } else {
        message.value = "Failed to create Product. Please try again.";
    }
}

onMounted(() => {
    if (user == null) {
        router.push('/login');
        return;
    }
});
</script>

<template>
    <div class="create-product-form">
        <form method="post" @submit.prevent="createProduct(product)">
            <label>Name</label>
            <input type="text" name="name" v-model="product.name" required>
            <label>Price</label>
            <input type="number" name="price" v-model="product.price">
            <label>Description</label>
            <textarea rows="4" name="description" v-model="product.description"></textarea>
            <button type="submit">Create</button>
        </form>

        <p class="message" v-if="message">{{ message }}</p>
    </div>
</template>

<style scoped>
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