"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { FiEye, FiEyeOff } from "react-icons/fi";

const Register = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const router = useRouter();

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!user.email || !user.password || !user.confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(user.email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        if (user.password !== user.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const passwordStrengthRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordStrengthRegex.test(user.password)) {
            toast.error("Password must be at least 8 characters long and contain both letters and numbers.");
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/register', {
                email: user.email,
                password: user.password,
                confirmPassword: user.confirmPassword
            });

            if (response.data.token) {
                localStorage.setItem("authToken", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                toast.success('Registration successful! Redirecting...');
                setTimeout(() => router.push('/Login'), 2000);
            } else {
                toast.error("Registration successful, but no token received.");
            }
        } catch (error) {
            toast.error(error.response?.data?.msg || "An error occurred");
        }
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#D3D3D3] text-black">
            <ToastContainer />
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg mb-8">
                <form onSubmit={submitHandler}>
                    <h1 className="text-3xl font-bold text-center mb-6 text-[#FF6B6B]">Sign Up</h1>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={changeHandler}
                        required
                        className="w-full p-3 mb-4 border border-gray-300 bg-white text-black placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] transition duration-200 ease-in-out"
                    />

                    <div className="relative w-full">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={user.password}
                            onChange={changeHandler}
                            required
                            className="w-full p-3 mb-4 border border-gray-300 bg-white text-black placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] transition duration-200 ease-in-out pr-10"
                        />
                        <div
                            className="absolute inset-y-4 right-3 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </div>
                    </div>

                    <div className="relative w-full">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={user.confirmPassword}
                            onChange={changeHandler}
                            required
                            className="w-full p-3 mb-6 border border-gray-300 bg-white text-black placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] transition duration-200 ease-in-out pr-10"
                        />
                        <div
                            className="absolute inset-y-4 right-3 cursor-pointer"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </div>
                    </div>

                    <button className="w-full py-3 bg-[#FF6B6B] text-white font-semibold rounded-lg hover:bg-[#E04E4E] transition-colors duration-300">
                        Sign Up
                    </button>
                </form>

                <p className="text-center mt-4">
                    Already registered?{" "}
                    <button
                        onClick={() => router.push('/Login')}
                        className="text-[#FF6B6B] hover:underline transition duration-200"
                    >
                        Sign In
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Register;
