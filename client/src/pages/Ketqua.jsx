import { useEffect, useState } from "react";
import axios from "axios";

export default function KetQua() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    ma_vdv: "",
    ma_culy: "",
    thoigian_hoanthanh: "",
    hang: "",
    ghichu: "",
  });
  const [editId, setEditId] = useState(null);

  const api = "http://localhost:5000/api/ketqua";

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
    setForm({ ma_vdv: "", ma_culy: "", thoigian_hoanthanh: "", hang: "", ghichu: "" });
    setEditId(null);
    fetchList();
  };

  const handleEdit = (item) => {
    setForm({
      ma_vdv: item.ma_vdv,
      ma_culy: item.ma_culy,
      thoigian_hoanthanh: item.thoigian_hoanthanh,
      hang: item.hang,
      ghichu: item.ghichu,
    });
    setEditId(item.ma_ketqua);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa kết quả này không?")) {
      await axios.delete(`${api}/${id}`);
      fetchList();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold text-indigo-800 mb-6 uppercase tracking-wide">
        Quản lý Kết quả thi đấu
      </h1>

      {/* Form nhập liệu */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-10 max-w-4xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="ma_vdv"
            placeholder="Mã VĐV"
            value={form.ma_vdv}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            name="ma_culy"
            placeholder="Mã cự ly"
            value={form.ma_culy}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            name="thoigian_hoanthanh"
            placeholder="Thời gian hoàn thành"
            value={form.thoigian_hoanthanh}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            name="hang"
            placeholder="Hạng"
            value={form.hang}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            name="ghichu"
            placeholder="Ghi chú"
            value={form.ghichu}
            onChange={handleChange}
            className="md:col-span-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="md:col-span-2 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 font-semibold"
          >
            {editId ? "Cập nhật kết quả" : "Thêm mới kết quả"}
          </button>
        </form>
      </div>

      {/* Bảng danh sách */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md border">
          <thead className="bg-indigo-100 text-indigo-800 uppercase text-sm font-semibold">
            <tr>
              <th className="p-3 border">Mã</th>
              <th className="p-3 border">Tên VĐV</th>
              <th className="p-3 border">Cự ly</th>
              <th className="p-3 border">Thời gian</th>
              <th className="p-3 border">Hạng</th>
              <th className="p-3 border">Ghi chú</th>
              <th className="p-3 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.ma_ketqua} className="hover:bg-gray-50">
                <td className="p-3 border text-center">{item.ma_ketqua}</td>
                <td className="p-3 border">{item.ten_vdv || item.ma_vdv}</td>
                <td className="p-3 border">{item.ten_culy || item.ma_culy}</td>
                <td className="p-3 border">{item.thoigian_hoanthanh}</td>
                <td className="p-3 border">{item.hang}</td>
                <td className="p-3 border">{item.ghichu}</td>
                <td className="p-3 border text-center space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="inline-flex items-center bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-full shadow-sm transition-all duration-200"
                  >
                    ✏️ <span className="ml-1">Sửa</span>
                  </button>
                  <button
                    onClick={() => handleDelete(item.ma_ketqua)}
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
