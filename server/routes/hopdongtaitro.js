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

// Xem danh sách hợp đồng
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

module.exports = router;
