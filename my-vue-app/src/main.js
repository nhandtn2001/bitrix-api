import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Đảm bảo bạn có file router.js
import axios from 'axios';
import './style.css';
import { Spin } from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

// Cấu hình Axios (nếu cần)
axios.defaults.baseURL = 'http://localhost:3000/';

// Tạo ứng dụng Vue
const app = createApp(App);

// Sử dụng Vue Router (nếu có)
app.use(router);

// Gán Axios vào global để sử dụng trong toàn bộ ứng dụng
app.config.globalProperties.$axios = axios;
app.use(Spin);
app.mount('#app');
