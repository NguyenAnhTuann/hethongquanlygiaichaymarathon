const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./config/db");

const vdvRoutes = require("./routes/vandongvien");
const dkRoute = require("./routes/phieudangky");
const ketquaRoute = require("./routes/ketqua");
const tnvRoute = require("./routes/tinhnguyenvien");
const nhataitroRoute = require("./routes/nhataitro");
const hopdongRoute = require("./routes/hopdongtaitro");
const culyRoutes = require("./routes/culy");
const diemhotroRoutes = require("./routes/diemhotro");


app.use(cors());
app.use(express.json());

app.use("/api/vandongvien", vdvRoutes);
app.use("/api/phieudangky", dkRoute);
app.use("/api/ketqua", ketquaRoute);
app.use("/api/tinhnguyenvien", tnvRoute);
app.use("/api/nhataitro", nhataitroRoute);
app.use("/api/hopdongtaitro", hopdongRoute);
app.use("/api/culy", culyRoutes);
app.use("/api/diemhotro", diemhotroRoutes);


app.get("/", (req, res) => {
  res.send("Server is running!");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
