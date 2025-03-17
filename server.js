require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const BITRIX_URL = "https://eqvn.bitrix24.com/rest/19000/vfcp1wh1133kor3j"; // Webhook của bạn

// API lấy danh sách liên hệ
app.get("/api/contacts", async (req, res) => {
    try {
        const response = await axios.post(`${BITRIX_URL}/crm.contact.list?start=${req.query.start}`, {
            FILTER: {},
            SELECT: []
        });

        res.json(response.data.result);
    } catch (error) {
        res.status(500).json({ error: "Lỗi khi lấy dữ liệu từ Bitrix24", details: error.message });
    }
});

// Chạy server
app.listen(3000, () => {
    console.log(`✅ Server chạy tại: http://localhost:3000`);
});