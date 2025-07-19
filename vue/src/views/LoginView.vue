<script setup>
import { ref, onMounted } from 'vue';
import { useAuth } from '@/auth/auth.js';
import { useRouter } from 'vue-router';
const errorMessage = ref(null);
const errors = ref({
    email: [],
    password: []
});
const route = useRouter();
const loginData = ref({
    email: '',
    password: ''
});

const { login } = useAuth();
const user = JSON.parse(localStorage.getItem('user'));

const handleLogin = async () => {
    try {
        await login(loginData.value);
        route.push('/');
    } catch (err) {
        if (JSON.parse(err.message).errors) {
            errors.value = JSON.parse(err.message).errors;
            errorMessage.value = '';
        } else {
            errorMessage.value = JSON.parse(err.message).message;
            loginData.value.email = '';
            loginData.value.password = '';
            errors.value = [];
        }
    }
};

onMounted(() => {
    if (user) {
        route.push('/');
        return;
    }
});

</script>

<template>
    <div class="login-form">
        <form @submit.prevent="handleLogin" method="post">
            <label for="">Email</label>
            <input type="text" name="email" v-model="loginData.email" />
            <p class="error" v-if="errors.email">{{ errors.email[0] }}</p>
            <label for="">Password</label>
            <input type="password" name="password" v-model="loginData.password" />
            <p class="error" v-if="errors.password">{{ errors.password[0] }}</p>
            <button type="submit">Login</button>
            <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

.error {
    color: red;
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
    text-align: center;
}

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