"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("authToken");
            const isUserLoggedIn = localStorage.getItem("isUserLoggedIn") === "true";
            setIsAuthenticated(!!token && isUserLoggedIn);
        };

        checkAuth();

        window.addEventListener("storage", checkAuth);
        return () => window.removeEventListener("storage", checkAuth);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setIsAuthenticated(false);
        router.push("/Login");
        setIsOpen(false);
    };

    return (
        <nav className="bg-white shadow-md fixed w-full z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-[#FF6B6B]" onClick={() => setIsOpen(false)}>
                    BusBooking
                </Link>

                <div className="hidden md:flex space-x-6 items-center">
                    <Link href="/" className="text-gray-700 hover:text-[#FF6B6B] transition" onClick={() => setIsOpen(false)}>
                        Home
                    </Link>
                    <Link href="/Schedule" className="text-gray-700 hover:text-[#FF6B6B] transition" onClick={() => setIsOpen(false)}>
                        Schedule
                    </Link>

                    <div className="relative">
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="text-gray-700 hover:text-[#FF6B6B] transition">
                            Booking ▼
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                                <Link href="/findtickets" className="block px-4 py-2 text-gray-700 hover:bg-[#FF6B6B] hover:text-white transition"
                                    onClick={() => { setIsDropdownOpen(false); setIsOpen(false); }}>
                                    Buy Ticket
                                </Link>
                                <Link href="/BookingHistory" className="block px-4 py-2 text-gray-700 hover:bg-[#FF6B6B] hover:text-white transition"
                                    onClick={() => { setIsDropdownOpen(false); setIsOpen(false); }}>
                                    Booking History
                                </Link>
                            </div>
                        )}
                    </div>

                    <Link href="/AboutUs" className="text-gray-700 hover:text-[#FF6B6B] transition" onClick={() => setIsOpen(false)}>
                        About
                    </Link>
                    <Link href="/contactus" className="text-gray-700 hover:text-[#FF6B6B] transition" onClick={() => setIsOpen(false)}>
                        Contact
                    </Link>
                </div>

                <div className="hidden md:flex">
                    {isAuthenticated ? (
                        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                            Logout
                        </button>
                    ) : (
                        <Link href="/Login">
                            <button className="bg-[#FF6B6B] text-white px-4 py-2 rounded-lg hover:bg-[#E55A5A] transition">
                                Login
                            </button>
                        </Link>
                    )}
                </div>

                <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {isOpen && (
                <div className="md:hidden bg-[#F5F5F5] shadow-md absolute w-full py-4">
                    <div className="flex flex-col items-center space-y-4">
                        <Link href="/" className="text-gray-700 hover:text-[#FF6B6B] transition" onClick={() => setIsOpen(false)}>
                            Home
                        </Link>
                        <Link href="/Schedule" className="text-gray-700 hover:text-[#FF6B6B] transition" onClick={() => setIsOpen(false)}>
                            Schedule
                        </Link>

                        <div className="relative w-full flex flex-col items-center">
                            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="text-gray-700 hover:text-[#FF6B6B] transition">
                                Booking ▼
                            </button>
                            {isDropdownOpen && (
                                <div className="mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                                    <Link href="/findtickets" className="block px-4 py-2 text-gray-700 hover:bg-[#FF6B6B] hover:text-white transition"
                                        onClick={() => { setIsDropdownOpen(false); setIsOpen(false); }}>
                                        Buy Ticket
                                    </Link>
                                    <Link href="/BookingHistory" className="block px-4 py-2 text-gray-700 hover:bg-[#FF6B6B] hover:text-white transition"
                                        onClick={() => { setIsDropdownOpen(false); setIsOpen(false); }}>
                                        Booking History
                                    </Link>
                                </div>
                            )}
                        </div>

                        <Link href="/AboutUs" className="text-gray-700 hover:text-[#FF6B6B] transition" onClick={() => setIsOpen(false)}>
                            About
                        </Link>
                        <Link href="/contactus" className="text-gray-700 hover:text-[#FF6B6B] transition" onClick={() => setIsOpen(false)}>
                            Contact
                        </Link>

                        {isAuthenticated ? (
                            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                                Logout
                            </button>
                        ) : (
                            <Link href="/Login">
                                <button className="bg-[#FF6B6B] text-white px-4 py-2 rounded-lg hover:bg-[#E55A5A] transition">
                                    Login
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;