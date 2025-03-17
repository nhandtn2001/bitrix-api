import { createRouter, createWebHistory } from 'vue-router';
import Products from './components/Contact.vue'; // Điều chỉnh đường dẫn nếu cần

const routes = [
    { path: '/', component: Products },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;