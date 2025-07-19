import router from '@/router';
import { ref } from 'vue';

const user = ref(null);
const token = ref({});
const baseURL = 'http://127.0.0.1:8000/api';

const register = async (registerData) => {
    const res = await fetch(`${baseURL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(registerData),
    });
    if (!res.ok) {
        const errors = await res.json();
        throw new Error(JSON.stringify(errors.errors));
    }
    const data = await res.json();
    localStorage.setItem('token', data.token);
};

const login = async (loginData) => {
    const res = await fetch(`${baseURL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(loginData),
    });
    if (!res.ok) {
        const errors = await res.json();
        throw new Error(JSON.stringify(errors));
    }
    const data = await res.json();
    localStorage.setItem('token', data.token);
    await getUser();
};

const getUser = async () => {
    const res = await fetch(`${baseURL}/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });

    if (res.ok) {
        const user = await res.json();
        localStorage.setItem('user', JSON.stringify(user));
        router.push('/');
        window.location.reload();
    }
};

const logout = async () => {
    await fetch(`${baseURL}/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    router.push('/login');
    window.location.reload();
};

export function useAuth() {
    return {
        user,
        token,
        register,
        login,
        logout,
        getUser,
    };
}