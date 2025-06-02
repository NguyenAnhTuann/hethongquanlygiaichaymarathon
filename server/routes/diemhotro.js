const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Thêm điểm hỗ trợ
router.post("/", (req, res) => {
  const { ten_diem, loai_hotro, vitri } = req.body;
  const sql = `
    INSERT INTO DIEMHOTRO (ten_diem, loai_hotro, vitri)
    VALUES (?, ?, ?)
  `;
  db.query(sql, [ten_diem, loai_hotro, vitri], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Thêm điểm hỗ trợ thành công", insertedId: result.insertId });
  });
});

// Lấy danh sách điểm hỗ trợ
router.get("/", (req, res) => {
  const sql = "SELECT * FROM DIEMHOTRO"; // Tạm bỏ ORDER BY
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// Cập nhật điểm hỗ trợ
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { ten_diem, loai_hotro, vitri } = req.body;
  const sql = `
    UPDATE DIEMHOTRO
    SET ten_diem = ?, loai_hotro = ?, vitri = ?
    WHERE ma_diemhotro = ?
  `;
  db.query(sql, [ten_diem, loai_hotro, vitri, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Cập nhật điểm hỗ trợ thành công" });
  });
});

// Xóa điểm hỗ trợ
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM DIEMHOTRO WHERE ma_diemhotro = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Xóa điểm hỗ trợ thành công" });
  });
});

module.exports = router;
