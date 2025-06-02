import { useEffect, useState } from "react";
import axios from "axios";

export default function Culy() {
    const [list, setList] = useState([]);
    const [form, setForm] = useState({
        tenculy: "",
        thoigian_xuatphat: "",
        diadiem_taptrung: "",
    });
    const [editId, setEditId] = useState(null);

    const api = "http://localhost:5000/api/culy"; // chú ý đúng path route

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
        setForm({ tenculy: "", thoigian_xuatphat: "", diadiem_taptrung: "" });
        setEditId(null);
        fetchList();
    };

    const handleEdit = (item) => {
        setForm(item);
        setEditId(item.ma_culy);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Xác nhận xóa cự ly này?")) {
            await axios.delete(`${api}/${id}`);
            fetchList();
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-extrabold text-indigo-800 mb-6 uppercase tracking-wide">
                Quản lý Cự ly thi đấu
            </h1>

            {/* Form nhập liệu */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-10 max-w-3xl">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        name="tenculy"
                        placeholder="Tên cự ly"
                        value={form.tenculy}
                        onChange={handleChange}
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        required
                    />
                    <input
                        type="time"
                        name="thoigian_xuatphat"
                        value={form.thoigian_xuatphat}
                        onChange={handleChange}
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        required
                    />
                    <input
                        name="diadiem_taptrung"
                        placeholder="Địa điểm tập trung"
                        value={form.diadiem_taptrung}
                        onChange={handleChange}
                        className="md:col-span-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        required
                    />
                    <button
                        type="submit"
                        className="md:col-span-2 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 font-semibold"
                    >
                        {editId ? "Cập nhật cự ly" : "Thêm mới cự ly"}
                    </button>
                </form>
            </div>

            {/* Bảng danh sách */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-xl shadow-md border">
                    <thead className="bg-indigo-100 text-indigo-800 uppercase text-sm font-semibold">
                        <tr>
                            <th className="p-3 border">Mã</th>
                            <th className="p-3 border">Tên cự ly</th>
                            <th className="p-3 border">Thời gian xuất phát</th>
                            <th className="p-3 border">Địa điểm tập trung</th>
                            <th className="p-3 border">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((item) => (
                            <tr key={item.ma_culy} className="hover:bg-gray-50">
                                <td className="p-3 border text-center">{item.ma_culy}</td>
                                <td className="p-3 border">{item.tenculy}</td>
                                <td className="p-3 border">{item.thoigian_xuatphat}</td>
                                <td className="p-3 border">{item.diadiem_taptrung}</td>
                                <td className="p-3 border text-center space-x-2">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="inline-flex items-center bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-full shadow-sm transition-all duration-200"
                                    >
                                        ✏️ <span className="ml-1">Sửa</span>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.ma_culy)}
                                        className="inline-flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full shadow-sm transition-all duration-200"
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
