<script setup>
import { useAuth } from '@/auth/auth';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { ref } from 'vue';

const router = useRouter();
const { user, token } = useAuth();

if (user.value == null) {
    router.push('/login');
}

const allProducts = ref([]);

const deleteProduct = async (id) => {
    const response = await fetch(`http://127.0.0.1:8000/api/products/${id}/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token.value.token}`
        }
    });

    if (response.ok) {
        window.location.reload();
    }
};

onMounted(async () => {
    const response = await fetch('http://127.0.0.1:8000/api/products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    if (response.ok) {

        allProducts.value = await response.json();
    } else {

        allProducts.value = [];
    }
});
</script>

<template>
    <div class="products-list">
        <div v-for="product in allProducts" :key="product.id" class="product-item">
            <h2>Name: {{ product.name }}</h2>
            <p>Description: {{ product.description }}</p>
            <p>Price: ${{ product.price }}</p>
            <button class="delete-btn" @click="deleteProduct(product.id)"
                v-if="product.user_id == user.id">Delete</button>
        </div>
    </div>
</template>

<style scoped>
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

.delete-btn {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}

.update-btn {
    background-color: blue;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}

.products-list {
    max-width: 800px;
    margin: auto;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}

.product-item {
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 10px;
    gap: 10px;
}
</style>