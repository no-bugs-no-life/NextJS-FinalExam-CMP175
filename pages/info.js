import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Import useRouter for navigation

export default function Info() {
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
    });
    const [isEditing, setIsEditing] = useState(false); // Track if the user is editing
    const router = useRouter(); // Initialize router

    useEffect(() => {
        // Load user information from localStorage if available
        const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (storedUserInfo) {
            setUserInfo(storedUserInfo);
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveInfo = () => {
        if (!userInfo.name || !userInfo.email || !userInfo.password || !userInfo.phone) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        // Save user information to localStorage
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        alert("Thông tin đã được lưu!");
        setIsEditing(false); // Disable editing mode after saving
    };

    const enableEditing = () => {
        setIsEditing(true); // Enable editing mode
    };

    const goToArticles = () => {
        router.push("/bai-bao"); // Redirect to the bai-bao.js page
    };

    return (
        <div className="px-6 py-8">
            <h1 className="text-3xl font-bold mb-6">Thông Tin Người Dùng</h1>
            <form>
                <input
                    type="text"
                    name="name"
                    placeholder="Tên"
                    value={userInfo.name}
                    onChange={handleInputChange}
                    className="p-2 mb-2 w-full border border-gray-300 rounded"
                    disabled={!isEditing} // Disable input if not editing
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={userInfo.email}
                    onChange={handleInputChange}
                    className="p-2 mb-2 w-full border border-gray-300 rounded"
                    disabled={!isEditing} // Disable input if not editing
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Mật khẩu"
                    value={userInfo.password}
                    onChange={handleInputChange}
                    className="p-2 mb-2 w-full border border-gray-300 rounded"
                    disabled={!isEditing} // Disable input if not editing
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Số điện thoại"
                    value={userInfo.phone}
                    onChange={handleInputChange}
                    className="p-2 mb-2 w-full border border-gray-300 rounded"
                    disabled={!isEditing} // Disable input if not editing
                />
                {isEditing ? (
                    <button
                        type="button"
                        onClick={handleSaveInfo}
                        className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Lưu Thông Tin
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={enableEditing}
                        className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Sửa Thông Tin
                    </button>
                )}
            </form>
            <button
                type="button"
                onClick={goToArticles}
                className="mt-4 px-6 py-3 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
                Về Trang Báo
            </button>
        </div>
    );
}