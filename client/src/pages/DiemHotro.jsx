import { useEffect, useState } from "react";
import axios from "axios";

export default function DiemHotro() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    ten_diem: "",
    loai_hotro: "",
    vitri: "",
  });
  const [editId, setEditId] = useState(null);

  const api = "http://localhost:5000/api/diemhotro"; // cập nhật đúng route nếu có prefix

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
    setForm({ ten_diem: "", loai_hotro: "", vitri: "" });
    setEditId(null);
    fetchList();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.ma_diem);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xác nhận xóa điểm hỗ trợ này?")) {
      await axios.delete(`${api}/${id}`);
      fetchList();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold text-indigo-800 mb-6 uppercase tracking-wide">
        Quản lý Điểm hỗ trợ
      </h1>

      {/* Form nhập liệu */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-10 max-w-3xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="ten_diem"
            placeholder="Tên điểm hỗ trợ"
            value={form.ten_diem}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            name="loai_hotro"
            placeholder="Loại hỗ trợ"
            value={form.loai_hotro}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            name="vitri"
            placeholder="Vị trí"
            value={form.vitri}
            onChange={handleChange}
            className="md:col-span-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <button
            type="submit"
            className="md:col-span-2 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 font-semibold"
          >
            {editId ? "Cập nhật điểm hỗ trợ" : "Thêm mới điểm hỗ trợ"}
          </button>
        </form>
      </div>

      {/* Bảng danh sách */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md border">
          <thead className="bg-indigo-100 text-indigo-800 uppercase text-sm font-semibold">
            <tr>
              <th className="p-3 border">Mã</th>
              <th className="p-3 border">Tên điểm</th>
              <th className="p-3 border">Loại hỗ trợ</th>
              <th className="p-3 border">Vị trí</th>
              <th className="p-3 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.ma_diem} className="hover:bg-gray-50">
                <td className="p-3 border text-center">{item.ma_diem}</td>
                <td className="p-3 border">{item.ten_diem}</td>
                <td className="p-3 border">{item.loai_hotro}</td>
                <td className="p-3 border">{item.vitri}</td>
                <td className="p-3 border text-center space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="inline-flex items-center bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-full shadow-sm transition"
                  >
                    ✏️ <span className="ml-1">Sửa</span>
                  </button>
                  <button
                    onClick={() => handleDelete(item.ma_diem)}
                    className="inline-flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full shadow-sm transition"
                  >
                    🗑️ <span className="ml-1">Xóa</span>
                  </button>
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
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
