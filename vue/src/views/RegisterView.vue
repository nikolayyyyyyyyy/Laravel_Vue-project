<script setup>
import { ref } from 'vue';
import { useAuth } from '@/auth/auth.js';
import { useRouter } from 'vue-router';

const route = useRouter();
const errors = ref({
    name: '',
    email: '',
    password: ''
});
const registerData = ref({
    name: '',
    email: '',
    password: ''
});

const { register } = useAuth();
const user = JSON.parse(localStorage.getItem('user'));

if (user) {
    route.push('/');
}

const handleRegister = async () => {
    try {
        await register(registerData.value);
        route.push('/login');
    } catch (err) {
        errors.value = JSON.parse(err.message);
    }
};

</script>

<template>
    <div class="register-form">
        <form @submit.prevent="handleRegister" method="post">
            <label for="">Name</label>
            <input type="name" name="name" v-model="registerData.name" />
            <p class="error" v-if="errors.name">{{ errors.name[0] }}</p>
            <label for="">Email</label>
            <input type="text" name="email" v-model="registerData.email" />
            <p class="error" v-if="errors.email">{{ errors.email[0] }}</p>
            <label for="">Password</label>
            <input type="password" name="password" v-model="registerData.password" />
            <p class="error" v-if="errors.password">{{ errors.password[0] }}</p>
            <button type="submit">Register</button>
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