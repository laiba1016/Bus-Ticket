"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";

const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', {
                email: user.email,
                password: user.password
            });

            const { success, token, role, userId, redirectUrl } = response.data;

            if (success) {
                toast.success('User Logged in Successfully');

                localStorage.setItem('authToken', token);
                localStorage.setItem('isUserLoggedIn', 'true');
                localStorage.setItem('userId', userId);
                localStorage.setItem('userRole', role);

                router.push(redirectUrl);
            }
        } catch (error) {
            toast.error(error.response?.data?.msg || "An error occurred");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5F5F5] text-[#6B6B6B]">
            <ToastContainer />
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg border border-[#D1D1D1]">
                <form onSubmit={submitHandler}>

                    <div className="flex items-center justify-between mb-6">
                        <button
                            type="button"
                            onClick={() => router.push('/')}
                            className="text-[#FF6B6B] hover:underline flex items-center"
                        >
                            <FiArrowLeft size={24} />
                        </button>
                        <h1 className="text-3xl font-bold text-[#FF6B6B] text-center flex-1">Login</h1>
                        <span className="w-6" />
                    </div>

                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={changeHandler}
                        required
                        className="w-full p-3 mb-4 border border-[#D1D1D1] bg-white text-[#6B6B6B] placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] transition duration-200 ease-in-out"
                    />

                    <div className="relative w-full">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={user.password}
                            onChange={changeHandler}
                            required
                            className="relative w-full p-3 mb-4 border border-[#D1D1D1] bg-white text-[#6B6B6B] placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] transition duration-200 ease-in-out pr-10"
                        />
                        <div
                            className="absolute inset-y-0 right-3 top-4 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </div>
                    </div>

                    <p className="text-left text-base mb-6">
                        <button
                            onClick={() => router.push('/forget-password')}
                            className="text-[#FF6B6B] hover:underline transition duration-200 font-medium"
                        >
                            Forgot Password?
                        </button>
                    </p>

                    <button className="w-full py-3 bg-[#FF6B6B] text-white font-semibold rounded-lg hover:bg-[#E55A5A] transition-colors duration-300">
                        Login
                    </button>
                </form>
                <p className="text-center mt-4">
                    New here?{" "}
                    <button
                        onClick={() => router.push('/Register')}
                        className="text-[#FF6B6B] hover:underline transition duration-200"
                    >
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;