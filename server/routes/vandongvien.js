const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Lấy danh sách tất cả vận động viên
router.get("/", (req, res) => {
  const sql = "SELECT * FROM VANDONGVIEN";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// Thêm vận động viên mới
router.post("/", (req, res) => {
  const { hoten, ngaysinh, gioitinh, cccd, diachi, sdt } = req.body;
  const sql = `
    INSERT INTO VANDONGVIEN (hoten, ngaysinh, gioitinh, cccd, diachi, sdt)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [hoten, ngaysinh, gioitinh, cccd, diachi, sdt], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Thêm vận động viên thành công", insertedId: result.insertId });
  });
});

// Cập nhật thông tin vận động viên
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { hoten, ngaysinh, gioitinh, cccd, diachi, sdt } = req.body;
  const sql = `
    UPDATE VANDONGVIEN 
    SET hoten = ?, ngaysinh = ?, gioitinh = ?, cccd = ?, diachi = ?, sdt = ?
    WHERE ma_vdv = ?
  `;
  db.query(sql, [hoten, ngaysinh, gioitinh, cccd, diachi, sdt, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Cập nhật vận động viên thành công" });
  });
});

// Xóa vận động viên
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM VANDONGVIEN WHERE ma_vdv = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Xóa vận động viên thành công" });
  });
});

module.exports = router;
