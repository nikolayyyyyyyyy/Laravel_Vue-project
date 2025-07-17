import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '@/views/HomeView.vue';
import Logout from '@/views/Logout.vue';

const routes = [
    { path: '/', component: HomeView },
    { path: '/login', component: LoginView },
    { path: '/logout', component: Logout }
];


const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;