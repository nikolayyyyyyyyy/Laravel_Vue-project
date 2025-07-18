<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter();
const user = JSON.parse(localStorage.getItem('user'));

onMounted(() => {
    if (user === null) {
        router.push('/login');
        return;
    }
});
</script>

<template>
    <h1 v-if="user">Hello, {{ user.name }} !</h1>
</template>