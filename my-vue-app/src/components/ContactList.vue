<template>
  <div>
    <h1>Danh sách học viên</h1>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Họ</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Ngày sinh</th>
            <th>Contact type</th>
            <th>Lịch học chuyên đề</th>
            <th>Lớp học</th>
            <th>Các chuyên đề hoàn thành</th>
            <th>Số buổi đã học</th>
            <th>Điểm danh</th>
            <th>Kết quả học tập</th>
            <th>Yêu cầu hỗ trợ</th>
            <th>Mức độ hài lòng các lớp học</th>
            <th>Thời hạn bảo lưu</th>
            
          </tr>
        </thead>
        <tbody>
          <tr v-for="contact in contacts" :key="contact.ID">
            <td>{{ contact.ID }}</td>
            <td>{{ contact.LAST_NAME || " " }}</td>
            <td>{{ contact.NAME || " " }}</td>
            <td>{{ contact.EMAIL?.[0]?.VALUE || " " }}</td>
            <td>{{ contact.PHONE?.[0]?.VALUE || " " }}</td>
            <td>{{ contact.BIRTHDATE ? new Date(contact.BIRTHDATE).toLocaleDateString("vi-VN") : " " }}</td>
            <td>{{ getSpecialties(contact.TYPE_ID) }}</td> 
            <td>{{
  (() => {
    let rawDate = contact.UF_CRM_1741578420631;
    if (!rawDate) return " "; // Nếu giá trị rỗng, hiển thị khoảng trắng
    let date = new Date(rawDate);
    if (isNaN(date)) return " "; // Nếu không phải ngày hợp lệ, trả về khoảng trắng
    date.setHours(date.getHours() - 4); // Điều chỉnh múi giờ từ GMT+3 về GMT+7
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  })()
          }}</td>
            <td>{{ contact.UF_CRM_1681115955876 || " " }}</td>
            <td>{{ getSpecialties(contact.UF_CRM_1648715651383) }}</td>        
            <td>{{contact.UF_CRM_1741593875543 || "0"}}</td>
            <td>{{ contact.UF_CRM_1741593999598|| " " }}</td>
            <td>{{ getSpecialties(contact.UF_CRM_1741594226873) }}</td>   
            <td>{{ contact.UF_CRM_1741594909871 || " " }}</td>
            <td>{{ getSpecialties(contact.UF_CRM_1589862016612) }}</td> 
            <td>{{ contact.UF_CRM_1741595590351 ? new Date(contact.UF_CRM_1741595590351).toLocaleDateString("vi-VN") : " " }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <button @click="changePage(0)">First</button>
        <button @click="changePage(1)">Pre</button>
        <button v-for="page in firstPagesOrder" @click="toPage(page)">{{ page }}</button>
        <button @click="changePage(2)">Next</button>
        <button @click="changePage(3)">Last</button>
        <input type="number" @change="toPage($event.target.value)" placeholder="page"/>
      </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      contacts: [],
      firstPagesOrder: [],
      lastPagesOrder: [],
      lastPage: 1,
      page: 1,
      specialtyMap: {
        "3202": "SEO",
        "3204": "Facebook Ads",
        "3206": "Google",
        "3208": "Email",
        "3210": "CRM",
        "3212": "Planing",

        "9354":"Xuất sắc",
        "9356":"Giỏi",
        "9358":"Khá",
        "9360":"Trung bình",
        "9362":"Yếu",

        "445":"Rất hài lòng",
        "447":"Hài lòng",
        "449":"Bình thường",
        "451":"Không hài lòng",
        "453":"Rất không hài lòng",

        "UC_7U2ZN0":"Học viên",
        "UC_CJ6GBQ":"Học viên tiềm năng",
        "6":"Học viên không tiềm năng"
      },
    };
  },
  mounted() {
    this.fetchContacts(this.page);
  },
  methods: {
    getSpecialties(ids) {
      if (!ids) return " "; // Trả về khoảng trắng nếu không có dữ liệu
      if (Array.isArray(ids)) {
        return ids.map(id => this.specialtyMap[id] || id).join(", "); // Hiển thị nhiều giá trị cách nhau bởi dấu phẩy
      }
      return this.specialtyMap[ids] || ids; // Nếu chỉ có 1 ID, hiển thị giá trị tương ứng
    },
    async toPage(page) {
      debugger;
      var finalPage = page;
      if(typeof page == 'string') {
          finalPage = parseInt(page);
      }
      this.page = finalPage;
      this.fetchContacts(this.page);
    },
    async changePage(changeType) {
      switch(changeType) {
        case 0: // đến trang đầu
          if(this.page == 1) {
            return;
          }
          this.page = 1;
          break;
          case 1: //đến trang trước
          if(this.page == 1) {
            return;
          }
          this.page--;
          break;
        case 2: //đến trang kế tiếp
          if(this.page == this.lastPage) {
            return;
          }
          this.page++;
          break;
        case 3: // đến trang cuối
        if(this.page == this.lastPage) {
            return;
          }
          this.page = this.lastPage;
          break;
      }
      await this.fetchContacts(this.page);
    },
   
    async fetchContacts(page = 1, retryCount = 0) {
      try {
        const response = await axios.post(
          //`https://eqvn.bitrix24.com/rest/19000/vfcp1wh1133kor3j/crm.contact.list?start=${(page - 1) * 50}`, //lấy từ trang 1
          
          `https://eqvn.bitrix24.com/rest/19000/vfcp1wh1133kor3j/crm.contact.list?start=22500`, 
          { SELECT: ["ID", "NAME", "LAST_NAME", "EMAIL", "PHONE" ,"BIRTHDATE", "TYPE_ID",
           "UF_CRM_1741578420631", "UF_CRM_1681115955876", "UF_CRM_1648715651383", 
           "UF_CRM_1741593875543", "UF_CRM_1741593999598", "UF_CRM_1741594226873",
           "UF_CRM_1741594909871", "UF_CRM_1589862016612", "UF_CRM_1741595590351" ] }
        );

        const contacts = response.data.result || [];
        this.contacts = contacts.filter(contact =>
          ["UC_7U2ZN0", "UC_CJ6GBQ", "6"].includes(contact.TYPE_ID)  //lấy data học viên
        );
        //this.contacts = [...contacts];  //lấy data toàn bộ
        var pageCount = Math.ceil(response.data.total / 50);
        this.lastPage = pageCount;
        this.firstPagesOrder = [];
        this.lastPagesOrder = []
        for(var i = 0; i < Math.min(Math.min(pageCount - this.page, 4), 4); i++) {
            this.firstPagesOrder.push(this.page + i);
          }
        for(var i = Math.max(Math.min(pageCount - this.page, 3), 3); i > 0; i--) {
            this.firstPagesOrder.push(pageCount - i);
          }

      } catch (error) {
        if (error.response?.data?.error === "OPERATION_TIME_LIMIT" && retryCount < 5) {
          console.warn(`API bị chặn! Chờ 30 giây và thử lại (${retryCount + 1}/5)`);
          await new Promise((resolve) => setTimeout(resolve, 30000)); // Chờ 30 giây
          await this.fetchContacts(this.page, retryCount + 1);
        } else {
          console.error("Lỗi khi lấy dữ liệu từ API:", error);
        }
      }
    }    
  },
};
</script>

<style>
table {
  width: 250%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.table-container {
  max-height: 80vh;
  /* Giới hạn chiều cao bảng, có thể chỉnh sửa */
  overflow: auto;
  /* Hiện thanh cuộn nếu nội dung vượt quá */
}
</style>