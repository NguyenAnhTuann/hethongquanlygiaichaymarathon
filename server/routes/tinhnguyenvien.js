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

// Cập nhật thông tin tình nguyện viên
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { hoten, namsinh, sdt, nhiemvu, ma_diem } = req.body;
  const sql = `
    UPDATE TINHNGUYENVIEN
    SET hoten = ?, namsinh = ?, sdt = ?, nhiemvu = ?, ma_diem = ?
    WHERE ma_tnv = ?
  `;
  db.query(sql, [hoten, namsinh, sdt, nhiemvu, ma_diem, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Cập nhật tình nguyện viên thành công" });
  });
});

// Xóa tình nguyện viên
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM TINHNGUYENVIEN WHERE ma_tnv = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Xóa tình nguyện viên thành công" });
  });
});

module.exports = router;
