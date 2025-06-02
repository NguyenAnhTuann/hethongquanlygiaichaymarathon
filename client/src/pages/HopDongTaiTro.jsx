import { useEffect, useState } from "react";
import axios from "axios";

export default function HopDongTaiTro() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    ngay_ky: "",
    nguoi_daidien: "",
    giatri_hopdong: "",
    danhsach_vatpham: "",
    ma_nhataitro: "",
  });
  const [editId, setEditId] = useState(null);

  const api = "http://localhost:5000/api/hopdongtaitro";

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    const res = await axios.get(api);
    setList(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${api}/${editId}`, form);
    } else {
      await axios.post(api, form);
    }
    setForm({
      ngay_ky: "",
      nguoi_daidien: "",
      giatri_hopdong: "",
      danhsach_vatpham: "",
      ma_nhataitro: "",
    });
    setEditId(null);
    fetchList();
  };

  const handleEdit = (item) => {
    setForm({
      ngay_ky: item.ngay_ky,
      nguoi_daidien: item.nguoi_daidien,
      giatri_hopdong: item.giatri_hopdong,
      danhsach_vatpham: item.danhsach_vatpham,
      ma_nhataitro: item.ma_nhataitro,
    });
    setEditId(item.ma_hopdong);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xác nhận xóa hợp đồng này?")) {
      await axios.delete(`${api}/${id}`);
      fetchList();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold text-indigo-800 mb-6 uppercase tracking-wide">
        Quản lý Hợp đồng tài trợ
      </h1>

      {/* Form nhập liệu */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-10 max-w-4xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="date"
            name="ngay_ky"
            value={form.ngay_ky}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            name="nguoi_daidien"
            placeholder="Người đại diện"
            value={form.nguoi_daidien}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            name="giatri_hopdong"
            placeholder="Giá trị hợp đồng"
            value={form.giatri_hopdong}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            name="danhsach_vatpham"
            placeholder="Danh sách vật phẩm"
            value={form.danhsach_vatpham}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            name="ma_nhataitro"
            placeholder="Mã nhà tài trợ"
            value={form.ma_nhataitro}
            onChange={handleChange}
            className="md:col-span-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <button
            type="submit"
            className="md:col-span-2 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 font-semibold"
          >
            {editId ? "Cập nhật hợp đồng" : "Thêm mới hợp đồng"}
          </button>
        </form>
      </div>

      {/* Bảng danh sách */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md border">
          <thead className="bg-indigo-100 text-indigo-800 uppercase text-sm font-semibold">
            <tr>
              <th className="p-3 border">Mã</th>
              <th className="p-3 border">Ngày ký</th>
              <th className="p-3 border">Người đại diện</th>
              <th className="p-3 border">Giá trị</th>
              <th className="p-3 border">Vật phẩm</th>
              <th className="p-3 border">Nhà tài trợ</th>
              <th className="p-3 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.ma_hopdong} className="hover:bg-gray-50">
                <td className="p-3 border text-center">{item.ma_hopdong}</td>
                <td className="p-3 border">{item.ngay_ky}</td>
                <td className="p-3 border">{item.nguoi_daidien}</td>
                <td className="p-3 border">{item.giatri_hopdong}</td>
                <td className="p-3 border">{item.danhsach_vatpham}</td>
                <td className="p-3 border">{item.ten_nhataitro || item.ma_nhataitro}</td>
                <td className="p-3 border text-center space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="inline-flex items-center bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-full shadow-sm transition-all duration-200"
                  >
                    ✏️ <span className="ml-1">Sửa</span>
                  </button>
                  <button
                    onClick={() => handleDelete(item.ma_hopdong)}
                    className="inline-flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full shadow-sm transition-all duration-200"
                  >
                    🗑️ <span className="ml-1">Xóa</span>
                  </button>
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
