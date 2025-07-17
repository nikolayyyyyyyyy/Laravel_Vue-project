<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const loginData = ref({
    email: '',
    password: ''
});

const logUser = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData.value)
    });

    const data = await response.json();
    if (response.ok) {

        localStorage.setItem('user', JSON.stringify(data));
        router.push('/');
    }
    localStorage.getItem('user') && console.log('User logged in:', JSON.parse(localStorage.getItem('user')));
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