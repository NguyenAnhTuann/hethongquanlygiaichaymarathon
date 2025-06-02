import { useEffect, useState } from "react";
import axios from "axios";

export default function TinhNguyenVien() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    hoten: "",
    namsinh: "",
    sdt: "",
    nhiemvu: "",
    ma_diem: "",
  });
  const [editId, setEditId] = useState(null);

  const api = "http://localhost:5000/api/tinhnguyenvien";

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
    setForm({ hoten: "", namsinh: "", sdt: "", nhiemvu: "", ma_diem: "" });
    setEditId(null);
    fetchList();
  };

  const handleEdit = (item) => {
    setForm({
      hoten: item.hoten,
      namsinh: item.namsinh,
      sdt: item.sdt,
      nhiemvu: item.nhiemvu,
      ma_diem: item.ma_diem,
    });
    setEditId(item.ma_tnv);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xác nhận xóa tình nguyện viên này?")) {
      await axios.delete(`${api}/${id}`);
      fetchList();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold text-indigo-800 mb-6 uppercase tracking-wide">
        Quản lý Tình nguyện viên
      </h1>

      {/* Form nhập liệu */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-10 max-w-4xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="hoten"
            placeholder="Họ tên"
            value={form.hoten}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="number"
            name="namsinh"
            placeholder="Năm sinh"
            value={form.namsinh}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            name="sdt"
            placeholder="Số điện thoại"
            value={form.sdt}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            name="nhiemvu"
            placeholder="Nhiệm vụ"
            value={form.nhiemvu}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            name="ma_diem"
            placeholder="Mã điểm hỗ trợ"
            value={form.ma_diem}
            onChange={handleChange}
            className="md:col-span-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <button
            type="submit"
            className="md:col-span-2 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 font-semibold"
          >
            {editId ? "Cập nhật tình nguyện viên" : "Thêm mới tình nguyện viên"}
          </button>
        </form>
      </div>

      {/* Bảng danh sách */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md border">
          <thead className="bg-indigo-100 text-indigo-800 uppercase text-sm font-semibold">
            <tr>
              <th className="p-3 border">Mã</th>
              <th className="p-3 border">Họ tên</th>
              <th className="p-3 border">Năm sinh</th>
              <th className="p-3 border">SĐT</th>
              <th className="p-3 border">Nhiệm vụ</th>
              <th className="p-3 border">Tên điểm hỗ trợ</th>
              <th className="p-3 border">Vị trí</th>
              <th className="p-3 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.ma_tnv} className="hover:bg-gray-50">
                <td className="p-3 border text-center">{item.ma_tnv}</td>
                <td className="p-3 border">{item.hoten}</td>
                <td className="p-3 border">{item.namsinh}</td>
                <td className="p-3 border">{item.sdt}</td>
                <td className="p-3 border">{item.nhiemvu}</td>
                <td className="p-3 border">{item.ten_diem || item.ma_diem}</td>
                <td className="p-3 border">{item.vitri}</td>
                <td className="p-3 border text-center space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="inline-flex items-center bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-full shadow-sm transition-all duration-200"
                  >
                    ✏️ <span className="ml-1">Sửa</span>
                  </button>
                  <button
                    onClick={() => handleDelete(item.ma_tnv)}
                    className="inline-flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full shadow-sm transition-all duration-200"
                  >
                    🗑️ <span className="ml-1">Xóa</span>
                  </button>
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">
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
