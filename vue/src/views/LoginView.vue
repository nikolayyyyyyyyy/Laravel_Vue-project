<script setup>
import { ref } from 'vue';

const loginData = ref({
    email: '',
    password: ''
});

const logUser = async () => {
    const response = fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData.value)
    });

    if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
    } else {
        console.error('Login failed:', response.statusText);
    }
}

</script>

<template>
    <form @submit.prevent="logUser" method="post">
        <label for="">Email</label>
        <input type="text" name="email" v-model="loginData.email" /> <br>
        <label for="">Password</label>
        <input type="password" name="password" v-model="loginData.password" />
        <br>
        <button type="submit">Login</button>
    </form>
</template>