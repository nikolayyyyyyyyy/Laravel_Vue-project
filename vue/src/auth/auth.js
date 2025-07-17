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
        body: JSON.stringify(registerData.value),
    });
    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.value);
    }

    token.value = await res.json();
};

const login = async (loginData) => {
    const res = await fetch(`${baseURL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(loginData.value),
    });
    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.value);
    }

    token.value = await res.json();
    await getUser();
};

const getUser = async () => {
    const res = await fetch(`${baseURL}/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token.value.token}`,
        },
    });

    if (res.ok) {
        user.value = await res.json();
    } else {
        user.value = null;
    }
};

const logout = async () => {
    await fetch(`${baseURL}/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token.value.token}`
        },
    });

    user.value = null;
    token.value = null;
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