const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Thêm hợp đồng tài trợ
router.post("/", (req, res) => {
  const { ngay_ky, nguoi_daidien, giatri_hopdong, danhsach_vatpham, ma_nhataitro } = req.body;
  const sql = `
    INSERT INTO HOPDONGTAITRO (ngay_ky, nguoi_daidien, giatri_hopdong, danhsach_vatpham, ma_nhataitro)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(sql, [ngay_ky, nguoi_daidien, giatri_hopdong, danhsach_vatpham, ma_nhataitro], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Đã thêm hợp đồng tài trợ", insertedId: result.insertId });
  });
});

// Xem danh sách hợp đồng tài trợ (JOIN tên nhà tài trợ)
router.get("/", (req, res) => {
  const sql = `
    SELECT 
      hd.ma_hopdong,
      hd.ngay_ky,
      hd.nguoi_daidien,
      hd.giatri_hopdong,
      hd.danhsach_vatpham,
      nt.ten_nhataitro
    FROM HOPDONGTAITRO hd
    JOIN NHATAITRO nt ON hd.ma_nhataitro = nt.ma_nhataitro
    ORDER BY hd.ma_hopdong DESC
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// Cập nhật hợp đồng tài trợ
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { ngay_ky, nguoi_daidien, giatri_hopdong, danhsach_vatpham, ma_nhataitro } = req.body;
  const sql = `
    UPDATE HOPDONGTAITRO
    SET ngay_ky = ?, nguoi_daidien = ?, giatri_hopdong = ?, danhsach_vatpham = ?, ma_nhataitro = ?
    WHERE ma_hopdong = ?
  `;
  db.query(sql, [ngay_ky, nguoi_daidien, giatri_hopdong, danhsach_vatpham, ma_nhataitro, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Cập nhật hợp đồng tài trợ thành công" });
  });
});

// Xóa hợp đồng tài trợ
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM HOPDONGTAITRO WHERE ma_hopdong = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Xóa hợp đồng tài trợ thành công" });
  });
});

module.exports = router;
