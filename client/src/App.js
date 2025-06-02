
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import VanDongVien from "./pages/Vandongvien";
import TinhNguyenVien from "./pages/TinhNguyenVien";
import PhieuDangKy from "./pages/PhieuDangKy";
import NhaTaiTro from "./pages/NhaTaiTro";
import KetQua from "./pages/Ketqua";
import HopDongTaiTro from "./pages/HopDongTaiTro";
import DiemHotro from "./pages/DiemHotro";
import Culy from "./pages/Culy";




function App() {
  return (
    <Router>
      <Sidebar />
      <div className="pl-72 pt-6 pr-6">

        <Routes>
          <Route path="/vandongvien" element={<VanDongVien />} />
          <Route path="/tinhnguyenvien" element={<TinhNguyenVien />} />
          <Route path="/phieudangky" element={<PhieuDangKy />} />
          <Route path="/nhataitro" element={<NhaTaiTro />} />
          <Route path="/ketqua" element={<KetQua />} />
          <Route path="/hopdongtaitro" element={<HopDongTaiTro />} />
          <Route path="/culy" element={<Culy />} />
          <Route path="/diemhotro" element={<DiemHotro />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
