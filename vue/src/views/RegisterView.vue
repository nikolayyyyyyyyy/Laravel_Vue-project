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

const { register, user } = useAuth();


if (user.value !== null) {
    route.push('/');
}

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
    <div class="register-form">
        <form @submit.prevent="handleRegister" method="post">
            <label for="">Name</label>
            <input type="name" name="name" v-model="registerData.name" /><br>
            <label for="">Email</label>
            <input type="text" name="email" v-model="registerData.email" /> <br>
            <label for="">Password</label>
            <input type="password" name="password" v-model="registerData.password" />
            <br>
            <p v-if="error">{{ error }}</p>
            <button type="submit">Register</button>
        </form>
    </div>
</template>

<style scoped>
.register-form {
    max-width: 600px;
    margin: auto;
}

.register-form form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.register-form button {
    padding: 15px;
    border-radius: 10px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.register-form input {
    padding: 10px;
    border-radius: 10px;
    border: 2px solid black;
}

label {
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
}

.register-form button:hover {
    background-color: gray;
}
</style>