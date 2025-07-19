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
        console.log(plans);

    } catch (err) {
        plans.value = [];
        console.log('aaaaaaaaaaaaaaaaa');

    }
});
</script>

<template>
    <ul>
        <li v-for="plan in plans" :key="plan.id">{{ plan.name }}</li>
    </ul>
</template>