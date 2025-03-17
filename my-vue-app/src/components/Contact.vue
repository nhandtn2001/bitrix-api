<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const contacts = ref([]);
const loading = ref(true);

const fetchcontacts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/contacts');
    contacts.value = response.data; // Lưu dữ liệu vào biến contacts
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error.response ? error.response.data : error.message);
  } finally {
    loading.value = false;
  }
};

// Gọi API khi component được load
onMounted(fetchcontacts);
</script>

<template>
  <div>
    <h2>Danh sách học viên</h2>
    <a-spin v-if="loading" />
    <ul v-else>
      <li v-for="contact in contacts" :key="contact.id">
        {{ contact.name }} - {{ contact.price }} VND
      </li>
    </ul>
  </div>
</template>