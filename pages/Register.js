import React, { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError(""); // Clear error when user types
    };

    const handleSubmit = () => {
        if (isLogin) {
            // Login validation
            if (!formData.email || !formData.password) {
                setError("Vui lòng nhập đầy đủ email và mật khẩu!");
                return;
            }
            if (!formData.email.includes("@gmail.com")) {
                setError("Email phải là tài khoản Gmail!");
                return;
            }
            alert("Đăng nhập thành công!");
            router.push("/bai-bao"); // Redirect to the article list page
        } else {
            // Register validation
            if (!formData.name || !formData.email || !formData.password) {
                setError("Vui lòng nhập đầy đủ thông tin để đăng ký!");
                return;
            }
            if (!formData.email.includes("@gmail.com")) {
                setError("Email phải là tài khoản Gmail!");
                return;
            }
            alert("Đăng ký thành công!");
            setIsLogin(true); // Switch to login after successful registration
        }
    };

    return (
        <div className="px-6 py-8">
            <h1 className="text-3xl font-bold mb-6">
                {isLogin ? "Đăng Nhập" : "Đăng Ký"}
            </h1>
            <form>
                {!isLogin && (
                    <input
                        type="text"
                        name="name"
                        placeholder="Tên"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="p-2 mb-2 w-full border border-gray-300 rounded"
                    />
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="Gmail"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="p-2 mb-2 w-full border border-gray-300 rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Mật khẩu"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="p-2 mb-2 w-full border border-gray-300 rounded"
                />
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
                >
                    {isLogin ? "Đăng Nhập" : "Đăng Ký"}
                </button>
            </form>
            <p className="mt-4 text-center">
                {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
                <span
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-500 cursor-pointer"
                >
                    {isLogin ? "Đăng Ký" : "Đăng Nhập"}
                </span>
            </p>
        </div>
    );
}