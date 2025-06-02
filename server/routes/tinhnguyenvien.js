const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Thêm tình nguyện viên
router.post("/", (req, res) => {
  const { hoten, namsinh, sdt, nhiemvu, ma_diem } = req.body;
  const sql = `
    INSERT INTO TINHNGUYENVIEN (hoten, namsinh, sdt, nhiemvu, ma_diem)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(sql, [hoten, namsinh, sdt, nhiemvu, ma_diem], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Thêm tình nguyện viên thành công", insertedId: result.insertId });
  });
});

// Xem danh sách tình nguyện viên (có tên điểm hỗ trợ)
router.get("/", (req, res) => {
  const sql = `
    SELECT 
      tnv.ma_tnv,
      tnv.hoten,
      tnv.namsinh,
      tnv.sdt,
      tnv.nhiemvu,
      dht.ten_diem,
      dht.vitri
    FROM TINHNGUYENVIEN tnv
    JOIN DIEMHOTRO dht ON tnv.ma_diem = dht.ma_diem
    ORDER BY dht.ma_diem ASC
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

module.exports = router;
