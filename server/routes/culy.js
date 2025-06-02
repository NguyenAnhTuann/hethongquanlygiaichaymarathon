const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Thêm cự ly mới
router.post("/", (req, res) => {
  const { tenculy, thoigian_xuatphat, diadiem_taptrung } = req.body;
  const sql = `
    INSERT INTO CULY (tenculy, thoigian_xuatphat, diadiem_taptrung)
    VALUES (?, ?, ?)
  `;
  db.query(sql, [tenculy, thoigian_xuatphat, diadiem_taptrung], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Thêm cự ly thành công", insertedId: result.insertId });
  });
});

// Lấy danh sách cự ly
router.get("/", (req, res) => {
  const sql = "SELECT * FROM CULY ORDER BY ma_culy ASC";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// Cập nhật cự ly
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { tenculy, thoigian_xuatphat, diadiem_taptrung } = req.body;
  const sql = `
    UPDATE CULY
    SET tenculy = ?, thoigian_xuatphat = ?, diadiem_taptrung = ?
    WHERE ma_culy = ?
  `;
  db.query(sql, [tenculy, thoigian_xuatphat, diadiem_taptrung, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Cập nhật cự ly thành công" });
  });
});

// Xóa cự ly
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM CULY WHERE ma_culy = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Xóa cự ly thành công" });
  });
});

module.exports = router;
