const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Thêm nhà tài trợ
router.post("/", (req, res) => {
  const { ten_nhataitro, diachi, sotien, danhsach_vatpham } = req.body;
  const sql = `
    INSERT INTO NHATAITRO (ten_nhataitro, diachi, sotien, danhsach_vatpham)
    VALUES (?, ?, ?, ?)
  `;
  db.query(sql, [ten_nhataitro, diachi, sotien, danhsach_vatpham], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Đã thêm nhà tài trợ", insertedId: result.insertId });
  });
});

// Lấy danh sách nhà tài trợ
router.get("/", (req, res) => {
  const sql = `SELECT * FROM NHATAITRO ORDER BY ma_nhataitro DESC`;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

module.exports = router;
