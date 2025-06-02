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

// Cập nhật nhà tài trợ
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { ten_nhataitro, diachi, sotien, danhsach_vatpham } = req.body;
  const sql = `
    UPDATE NHATAITRO
    SET ten_nhataitro = ?, diachi = ?, sotien = ?, danhsach_vatpham = ?
    WHERE ma_nhataitro = ?
  `;
  db.query(sql, [ten_nhataitro, diachi, sotien, danhsach_vatpham, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Cập nhật nhà tài trợ thành công" });
  });
});

// Xóa nhà tài trợ
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM NHATAITRO WHERE ma_nhataitro = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Xóa nhà tài trợ thành công" });
  });
});

module.exports = router;
