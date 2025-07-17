<script setup>
import { onMounted } from 'vue';
import { useAuth } from '@/auth/auth';
import { useRouter } from 'vue-router';

const { logout } = useAuth();
const router = useRouter();

onMounted(() => {
    logout();
    router.push('/login');
});
</script>

<template></template>