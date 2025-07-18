<script setup>
import { onMounted } from 'vue';
import { useAuth } from '@/auth/auth';
import { useRouter } from 'vue-router';

const { logout } = useAuth();
const router = useRouter();
const user = JSON.parse(localStorage.getItem('user'));

onMounted(() => {
    if (user == null) {
        router.push('/login');
        return;
    }
    logout();
});
</script>

<template></template>