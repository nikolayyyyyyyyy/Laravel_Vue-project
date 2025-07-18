<script setup>
import { useAuth } from '@/auth/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const { user } = useAuth();

if (user.value === null) {
    router.push('/login');
}

</script>

<template>
    <h1 v-if="user">Hello, {{ user.name }} !</h1>
</template>