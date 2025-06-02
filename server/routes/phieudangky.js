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

// GET: Lấy danh sách đăng ký thi đấu (JOIN bảng liên quan)
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


module.exports = router;
