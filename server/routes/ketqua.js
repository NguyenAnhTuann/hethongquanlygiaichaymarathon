const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Thêm kết quả thi đấu
router.post("/", (req, res) => {
  const { ma_vdv, ma_culy, thoigian_hoanthanh, hang, ghichu } = req.body;
  const sql = `
    INSERT INTO KETQUA (ma_vdv, ma_culy, thoigian_hoanthanh, hang, ghichu)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(sql, [ma_vdv, ma_culy, thoigian_hoanthanh, hang, ghichu], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Đã thêm kết quả thi đấu", insertedId: result.insertId });
  });
});

// Xem kết quả thi đấu
router.get("/", (req, res) => {
  const sql = `
    SELECT 
      kq.ma_ketqua,
      vdv.hoten AS ten_vdv,
      cl.tenculy AS ten_culy,
      kq.thoigian_hoanthanh,
      kq.hang,
      kq.ghichu
    FROM KETQUA kq
    JOIN VANDONGVIEN vdv ON kq.ma_vdv = vdv.ma_vdv
    JOIN CULY cl ON kq.ma_culy = cl.ma_culy
    ORDER BY cl.ma_culy ASC, kq.hang ASC
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

module.exports = router;
