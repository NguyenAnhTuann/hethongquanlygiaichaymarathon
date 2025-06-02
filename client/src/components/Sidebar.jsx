import { Link } from "react-router-dom";

export default function Sidebar() {
    const menu = [
        { name: "Cự ly", path: "/culy" },
        { name: "Điểm hỗ trợ", path: "/diemhotro" },
        { name: "Hợp đồng tài trợ", path: "/hopdongtaitro" },
        { name: "Kết quả", path: "/ketqua" },
        { name: "Nhà tài trợ", path: "/nhataitro" },
        { name: "Phiếu đăng ký", path: "/phieudangky" },
        { name: "Tình nguyện viên", path: "/tinhnguyenvien" },
        { name: "Vận động viên", path: "/vandongvien" },
    ];

    return (
        <div className="fixed top-0 left-0 h-screen w-72 bg-gradient-to-b from-indigo-900 to-indigo-700 text-white p-6 shadow-2xl z-50 flex flex-col justify-between rounded-r-3xl">
            <div>
                <h1 className="text-3xl font-extrabold tracking-wide mb-8 text-center uppercase leading-snug">
                    HỆ THỐNG<br />
                    <span className="text-yellow-300">QUẢN LÝ</span><br />
                    <span className="text-yellow-300">GIẢI CHẠY</span><br />
                    MARATHON
                </h1>



                <ul className="space-y-4">
                    {menu.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className="block py-2 px-4 rounded-lg hover:bg-indigo-600 transition-all duration-200 font-medium"
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <footer className="text-sm text-center text-gray-300 mt-8">
                © 2025 Nhóm 5
            </footer>
        </div>
    );
}
