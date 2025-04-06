import React, { useState } from "react";
import { useRouter } from "next/router";

export default function Auth() {
    const [isRegistering, setIsRegistering] = useState(false); // Toggle between login and register
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        phone: "",
        name: "",
        email: "",
    });
    const [error, setError] = useState(""); // Error message state
    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError(""); // Clear error message when user types
    };

    const validatePassword = (password) => {
        // Strong password validation: at least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return strongPasswordRegex.test(password);
    };

    const handleLogin = () => {
        const { username, password } = formData;

        // Validate input fields
        if (!username || !password) {
            setError("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        // Simulate login (you can replace this with real authentication logic)
        const storedUser = JSON.parse(localStorage.getItem("userInfo"));
        if (storedUser && storedUser.username === username && storedUser.password === password) {
            localStorage.setItem("loggedInUser", JSON.stringify(storedUser));
            alert("Đăng nhập thành công!");
            router.push("/bai-bao"); // Redirect to the bai-bao page
        } else {
            setError("Tên đăng nhập hoặc mật khẩu không đúng!");
        }
    };

    const handleRegister = () => {
        const { username, password, confirmPassword, phone, name, email } = formData;

        // Validate input fields
        if (!username || !password || !confirmPassword || !phone || !name || !email) {
            setError("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        if (!validatePassword(password)) {
            setError(
                "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt!"
            );
            return;
        }

        if (password !== confirmPassword) {
            setError("Mật khẩu xác nhận không khớp!");
            return;
        }

        // Save user information to localStorage
        const userInfo = { username, password, phone, name, email };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        setIsRegistering(false); // Switch back to login form
    };

    return (
        <div className="px-6 py-8">
            <h1 className="text-3xl font-bold mb-6">{isRegistering ? "Đăng Ký" : "Đăng Nhập"}</h1>
            <form>
                {isRegistering && (
                    <>
                        <input
                            type="text"
                            name="name"
                            placeholder="Họ và Tên"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="p-2 mb-2 w-full border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Số Điện Thoại"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="p-2 mb-2 w-full border border-gray-300 rounded"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="p-2 mb-2 w-full border border-gray-300 rounded"
                        />
                    </>
                )}
                <input
                    type="text"
                    name="username"
                    placeholder="Tên Đăng Nhập"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="p-2 mb-2 w-full border border-gray-300 rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Mật Khẩu"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="p-2 mb-2 w-full border border-gray-300 rounded"
                />
                {isRegistering && (
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Xác Nhận Mật Khẩu"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="p-2 mb-2 w-full border border-gray-300 rounded"
                    />
                )}
                {error && <p className="text-red-500 mb-2">{error}</p>} {/* Display error message */}
                <button
                    type="button"
                    onClick={isRegistering ? handleRegister : handleLogin}
                    className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    {isRegistering ? "Đăng Ký" : "Đăng Nhập"}
                </button>
            </form>
            <p className="mt-4 text-center">
                {isRegistering ? (
                    <>
                        Đã có tài khoản?{" "}
                        <span
                            onClick={() => setIsRegistering(false)}
                            className="text-blue-500 hover:underline cursor-pointer"
                        >
                            Đăng Nhập
                        </span>
                    </>
                ) : (
                    <>
                        Chưa có tài khoản?{" "}
                        <span
                            onClick={() => setIsRegistering(true)}
                            className="text-blue-500 hover:underline cursor-pointer"
                        >
                            Đăng Ký
                        </span>
                    </>
                )}
            </p>
        </div>
    );
}