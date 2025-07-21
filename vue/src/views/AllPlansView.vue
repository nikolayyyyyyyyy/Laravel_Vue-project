<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { crud } from '@/auth/crud';

const router = useRouter();
const plans = ref([]);
const { getAllPlans } = crud();

onMounted(async () => {
    const user = localStorage.getItem('user');
    if (user == null) {
        router.push('/login');
        return;
    }

    try {

        plans.value = await getAllPlans();
    } catch (err) {

        plans.value = [];
    }
});
</script>

<template>
    <section class="container">
        <div class="container-item" v-for="plan in plans">
            <h3>Plan: {{ plan.name }}</h3>
            <p>Price: {{ plan.price }}$</p>
            <button class="subscribe-btn">Subscribe</button>
        </div>
    </section>
</template>

<style scoped>
* {
    padding: 0;
    margin: 0;
}

.subscribe-btn {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

.subscribe-btn:hover {
    background-color: #45a049;
}

.container {
    max-width: 800px;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
}

.container-item {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}
</style>