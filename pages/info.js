import React, { useState, useEffect } from "react";

export default function Info() {
    const [userInfo, setUserInfo] = useState({
        username: "",
        phone: "",
        email: "",
        name: "",
        password: "", // Add password to user info
    });
    const [isChangingPassword, setIsChangingPassword] = useState(false); // Toggle change password mode
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });
    const [error, setError] = useState(""); // Error message state

    useEffect(() => {
        // Retrieve user information from localStorage
        const storedUser = JSON.parse(localStorage.getItem("userInfo"));
        if (storedUser) {
            setUserInfo(storedUser);
        }
    }, []);

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordForm((prev) => ({ ...prev, [name]: value }));
        setError(""); // Clear error message when user types
    };

    const handleChangePassword = () => {
        const { currentPassword, newPassword, confirmNewPassword } = passwordForm;

        // Validate input fields
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            setError("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        // Check if current password matches
        if (currentPassword !== userInfo.password) {
            setError("Mật khẩu hiện tại không đúng!");
            return;
        }

        // Check if new password matches confirmation
        if (newPassword !== confirmNewPassword) {
            setError("Mật khẩu mới và xác nhận mật khẩu không khớp!");
            return;
        }

        // Update password in user info
        setUserInfo((prev) => ({ ...prev, password: newPassword }));
        localStorage.setItem("userInfo", JSON.stringify({ ...userInfo, password: newPassword }));
        alert("Mật khẩu đã được thay đổi!");
        setIsChangingPassword(false); // Exit change password mode
        setPasswordForm({ currentPassword: "", newPassword: "", confirmNewPassword: "" }); // Reset form
    };

    return (
        <div className="px-6 py-8">
            <h1 className="text-3xl font-bold mb-6">Thông Tin Cá Nhân</h1>
            <form>
                <input
                    type="text"
                    name="name"
                    placeholder="Họ và Tên"
                    value={userInfo.name}
                    className="p-2 mb-2 w-full border border-gray-300 rounded bg-gray-100"
                    disabled // Make this field uneditable
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Số Điện Thoại"
                    value={userInfo.phone}
                    className="p-2 mb-2 w-full border border-gray-300 rounded bg-gray-100"
                    disabled // Make this field uneditable
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={userInfo.email}
                    className="p-2 mb-2 w-full border border-gray-300 rounded bg-gray-100"
                    disabled // Make this field uneditable
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Tên Đăng Nhập"
                    value={userInfo.username}
                    className="p-2 mb-2 w-full border border-gray-300 rounded bg-gray-100"
                    disabled // Make this field uneditable
                />
                {isChangingPassword ? (
                    <>
                        <input
                            type="password"
                            name="currentPassword"
                            placeholder="Mật Khẩu Hiện Tại"
                            value={passwordForm.currentPassword}
                            onChange={handlePasswordChange}
                            className="p-2 mb-2 w-full border border-gray-300 rounded"
                        />
                        <input
                            type="password"
                            name="newPassword"
                            placeholder="Mật Khẩu Mới"
                            value={passwordForm.newPassword}
                            onChange={handlePasswordChange}
                            className="p-2 mb-2 w-full border border-gray-300 rounded"
                        />
                        <input
                            type="password"
                            name="confirmNewPassword"
                            placeholder="Xác Nhận Mật Khẩu Mới"
                            value={passwordForm.confirmNewPassword}
                            onChange={handlePasswordChange}
                            className="p-2 mb-2 w-full border border-gray-300 rounded"
                        />
                        {error && <p className="text-red-500 mb-2">{error}</p>} {/* Display error message */}
                        <button
                            type="button"
                            onClick={handleChangePassword}
                            className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Lưu Mật Khẩu
                        </button>

                    </>
                ) : (
                    <button
                        type="button"
                        onClick={() => setIsChangingPassword(true)}
                        className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Đổi Mật Khẩu
                    </button>
                )}
            </form>
        </div>
    );
}