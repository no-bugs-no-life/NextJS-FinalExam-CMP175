import { useState, useEffect } from 'react';
import MasterLayout from '@/components/layouts/MasterLayout';
import axiosInstance from '@/configs/api';
import { useRouter } from 'next/router';

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        avatar: 'https://picsum.photos/200'
    });
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    router.push('/dang-nhap');
                    return;
                }

                const response = await axiosInstance.get('/v1/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                if (response.result && response.data) {
                    setUser({
                        ...response.data,
                        avatar: user.avatar
                    });
                }
            } catch (err) {
                setError('Failed to load profile');
                if (err.response?.status === 401) {
                    router.push('/dang-nhap');
                }
            }
        };

        fetchProfile();
    }, [router]);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axiosInstance.put('/v1/users', {
                firstName: user.firstName,
                lastName: user.lastName
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            if (response.result) {
                setSuccess('Profile updated successfully');
                setIsEditing(false);
                // Refresh user data
                const profileResponse = await axiosInstance.get('/v1/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (profileResponse.result && profileResponse.data) {
                    setUser({
                        ...profileResponse.data,
                        avatar: user.avatar
                    });
                }
            }
        } catch (err) {
            setError(err.message || 'Failed to update profile');
            if (err.response?.status === 401) {
                router.push('/dang-nhap');
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        router.push('/dang-nhap');
    };

    return (
        <MasterLayout>
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-white shadow rounded-lg">
                    {/* Profile Header */}
                    <div className="px-6 py-8 border-b border-gray-200">
                        <div className="flex items-center space-x-6">
                            <div className="relative">
                                <img
                                    src={user.avatar}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full object-cover"
                                />
                                {isEditing && (
                                    <button className="absolute bottom-0 right-0 bg-gray-900 text-white p-2 rounded-full">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">{`${user.firstName} ${user.lastName}`}</h1>
                                <p className="text-gray-600">{user.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    {error && (
                        <div className="mx-6 mt-4 p-4 text-red-700 bg-red-100 rounded-lg">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mx-6 mt-4 p-4 text-green-700 bg-green-100 rounded-lg">
                            {success}
                        </div>
                    )}

                    {/* Profile Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={user.firstName}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={user.lastName}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-100"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                disabled
                                className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                            />
                        </div>

                        <div className="flex justify-between pt-6 border-t border-gray-200">
                            {isEditing ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                                    >
                                        Save Changes
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="px-6 py-2 text-red-600 hover:text-red-800"
                                    >
                                        Log Out
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(true)}
                                        className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                                    >
                                        Edit Profile
                                    </button>
                                </>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </MasterLayout>
    );
}