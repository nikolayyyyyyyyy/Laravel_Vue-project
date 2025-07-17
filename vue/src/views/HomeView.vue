<script setup>
import { useAuth } from '@/auth/auth';

const { user } = useAuth();
</script>

<template>
    <h1 v-if="user">Hello, {{ user.name }} !</h1>
</template>