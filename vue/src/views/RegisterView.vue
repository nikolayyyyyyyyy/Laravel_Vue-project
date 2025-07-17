<script setup>
import { ref } from 'vue';
import { useAuth } from '@/auth/auth.js';
import { useRouter } from 'vue-router';

const route = useRouter();

const registerData = ref({
    name: '',
    email: '',
    password: ''
});

const error = ref('');

const { register } = useAuth();

const handleRegister = async () => {
    error.value = '';
    try {
        await register(registerData);
        route.push('/login');
    } catch (err) {
        error.value = err.message || 'Invalid credentials.';
    }
};

</script>

<template>
    <form @submit.prevent="handleRegister" method="post">
        <label for="">Name</label>
        <input type="name" name="name" v-model="registerData.name" /><br>
        <label for="">Email</label>
        <input type="text" name="email" v-model="registerData.email" /> <br>
        <label for="">Password</label>
        <input type="password" name="password" v-model="registerData.password" />
        <br>
        <p v-if="error">{{ error }}</p>
        <button type="submit">Login</button>
    </form>
</template>