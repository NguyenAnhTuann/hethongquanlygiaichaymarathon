import { useEffect, useState } from "react";
import axios from "axios";

export default function VanDongVien() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    hoten: "",
    ngaysinh: "",
    gioitinh: "",
    cccd: "",
    diachi: "",
    sdt: "",
  });
  const [editId, setEditId] = useState(null);

  const api = "http://localhost:5000/api/vandongvien";

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
    setForm({ hoten: "", ngaysinh: "", gioitinh: "", cccd: "", diachi: "", sdt: "" });
    setEditId(null);
    fetchList();
  };

  const handleEdit = (vdv) => {
    setForm({
      hoten: vdv.hoten,
      ngaysinh: vdv.ngaysinh,
      gioitinh: vdv.gioitinh,
      cccd: vdv.cccd,
      diachi: vdv.diachi,
      sdt: vdv.sdt,
    });
    setEditId(vdv.ma_vdv);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xác nhận xóa vận động viên này?")) {
      await axios.delete(`${api}/${id}`);
      fetchList();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold text-indigo-800 mb-6 uppercase tracking-wide">
        Quản lý Vận động viên
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
            name="ngaysinh"
            type="date"
            value={form.ngaysinh}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <select
            name="gioitinh"
            value={form.gioitinh}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          >
            <option value="">Chọn giới tính</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
          <input
            name="cccd"
            placeholder="CCCD"
            value={form.cccd}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            name="diachi"
            placeholder="Địa chỉ"
            value={form.diachi}
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
          <button
            type="submit"
            className="md:col-span-2 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 font-semibold"
          >
            {editId ? "Cập nhật vận động viên" : "Thêm mới vận động viên"}
          </button>
        </form>
      </div>

      {/* Bảng danh sách */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md border">
          <thead className="bg-indigo-100 text-indigo-800 uppercase text-sm font-semibold">
            <tr>
              <th className="p-3 border">Mã VĐV</th>
              <th className="p-3 border">Họ tên</th>
              <th className="p-3 border">Ngày sinh</th>
              <th className="p-3 border">Giới tính</th>
              <th className="p-3 border">CCCD</th>
              <th className="p-3 border">Địa chỉ</th>
              <th className="p-3 border">SĐT</th>
              <th className="p-3 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {list.map((vdv) => (
              <tr key={vdv.ma_vdv} className="hover:bg-gray-50">
                <td className="p-3 border text-center">{vdv.ma_vdv}</td>
                <td className="p-3 border">{vdv.hoten}</td>
                <td className="p-3 border">{vdv.ngaysinh}</td>
                <td className="p-3 border">{vdv.gioitinh}</td>
                <td className="p-3 border">{vdv.cccd}</td>
                <td className="p-3 border">{vdv.diachi}</td>
                <td className="p-3 border">{vdv.sdt}</td>
                <td className="p-3 border text-center space-x-2">
                  <button
                    onClick={() => handleEdit(vdv)}
                    className="inline-flex items-center bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-full shadow-sm transition-all duration-200"
                  >
                    ✏️ <span className="ml-1">Sửa</span>
                  </button>
                  <button
                    onClick={() => handleDelete(vdv.ma_vdv)}
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
