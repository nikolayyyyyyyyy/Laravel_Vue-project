<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { crud } from '@/auth/crud';

const { deleteProduct, getAllProducts } = crud();
const router = useRouter();
const user = JSON.parse(localStorage.getItem('user'));
const allProducts = ref([]);

const handleDelete = async (id) => {
    await deleteProduct(id);
    window.location.reload();
};

onMounted(async () => {
    if (user == null) {
        router.push('/login');
        return;
    }

    try {
        allProducts.value = await getAllProducts();
    } catch (err) {
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
            <button class="delete-btn" @click="handleDelete(product.id)"
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
    padding: 20px;
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
    gap: 10px;
}
</style>