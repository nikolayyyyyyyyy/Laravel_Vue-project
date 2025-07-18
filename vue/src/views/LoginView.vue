<script setup>
import { ref } from 'vue';
import { useAuth } from '@/auth/auth.js';
import { useRouter } from 'vue-router';

const route = useRouter();

const loginData = ref({
    email: '',
    password: ''
});

const error = ref('');

const { login, user } = useAuth();

if (user.value !== null) {
    route.push('/');
}

const handleLogin = async () => {
    error.value = '';
    try {
        await login(loginData);
        route.push('/');
    } catch (err) {
        error.value = err.message || 'Invalid credentials.';
    }
};

</script>

<template>
    <div class="login-form">
        <form @submit.prevent="handleLogin" method="post">
            <label for="">Email</label>
            <input type="text" name="email" v-model="loginData.email" /> <br>
            <label for="">Password</label>
            <input type="password" name="password" v-model="loginData.password" />
            <br>
            <p v-if="error">{{ error }}</p>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<style scoped>
label {
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
}

.login-form input {
    padding: 10px;
    border-radius: 10px;
}

.login-form form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.login-form {
    max-width: 600px;
    margin: auto;
}

.login-form button {
    padding: 15px;
    border-radius: 10px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.login-form button:hover {
    background-color: gray;
}
</style>