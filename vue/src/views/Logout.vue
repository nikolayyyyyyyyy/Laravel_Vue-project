<script setup>
import { onMounted } from 'vue';
import { useAuth } from '@/auth/auth';
import { useRouter } from 'vue-router';

const { logout, user } = useAuth();
const router = useRouter();

onMounted(() => {
    if (user.value == null) {
        router.push('/login');
    }
    logout();
    router.push('/login');
});
</script>

<template></template>