const express = require("express");
const router = express.Router();
const db = require("../config/db");

// POST: Đăng ký thi đấu
router.post("/", (req, res) => {
  const { ma_vdv, ma_culy, ngay_dangky, lephi } = req.body;
  const sql = `
    INSERT INTO PHIEUDANGKY (ngay_dangky, lephi, ma_vdv, ma_culy)
    VALUES (?, ?, ?, ?)
  `;
  db.query(sql, [ngay_dangky, lephi, ma_vdv, ma_culy], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Đăng ký thi đấu thành công", insertedId: result.insertId });
  });
});

// GET: Lấy danh sách đăng ký thi đấu
router.get("/", (req, res) => {
  const sql = `
    SELECT 
      pd.ma_phieu,
      vdv.hoten AS ten_vdv,
      cl.tenculy AS ten_culy,
      pd.ngay_dangky,
      pd.lephi
    FROM PHIEUDANGKY pd
    JOIN VANDONGVIEN vdv ON pd.ma_vdv = vdv.ma_vdv
    JOIN CULY cl ON pd.ma_culy = cl.ma_culy
    ORDER BY pd.ma_phieu DESC
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// PUT: Cập nhật phiếu đăng ký
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { ma_vdv, ma_culy, ngay_dangky, lephi } = req.body;
  const sql = `
    UPDATE PHIEUDANGKY
    SET ngay_dangky = ?, lephi = ?, ma_vdv = ?, ma_culy = ?
    WHERE ma_phieu = ?
  `;
  db.query(sql, [ngay_dangky, lephi, ma_vdv, ma_culy, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Cập nhật phiếu đăng ký thành công" });
  });
});

// DELETE: Xóa phiếu đăng ký
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM PHIEUDANGKY WHERE ma_phieu = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Xóa phiếu đăng ký thành công" });
  });
});

module.exports = router;
