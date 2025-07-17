<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const data = JSON.parse(localStorage.getItem('user'));

const logoutUser = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/logout', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`
        }
    });

    console.log(await response.json());

    localStorage.removeItem('user');
    router.push('/');
}

onMounted(() => {
    logoutUser();
});
</script>

<template></template>