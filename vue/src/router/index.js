import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '@/views/HomeView.vue';
import Logout from '@/views/Logout.vue';
import RegisterView from '@/views/RegisterView.vue';
import CreateProductView from '@/views/CreateProductView.vue';
import AllProductsView from '@/views/AllProductsView.vue';
import UpdateProductView from '@/views/UpdateProductView.vue';

const routes = [
    { path: '/', component: HomeView },
    { path: '/login', component: LoginView },
    { path: '/logout', component: Logout },
    { path: '/register', component: RegisterView },
    { path: '/create', component: CreateProductView },
    { path: '/products', component: AllProductsView },
    { path: '/products/:id/update', component: UpdateProductView }
];


const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;