"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Services from "../Services/page";

const HeroSection = () => {
    const router = useRouter();
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");
    const [popularRoutes, setPopularRoutes] = useState([]);

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const response = await fetch("http://localhost:5001/api/routes");
                const data = await response.json();
                if (data.success) {
                    setPopularRoutes(data.data);
                }
            } catch (error) {
                console.error("Error fetching routes:", error);
            }
        };

        fetchRoutes();
    }, []);
    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (origin) params.append("origin", origin);
        if (destination) params.append("destination", destination);
        if (date) params.append("date", date);
        router.push(`/findtickets?${params.toString()}`);
    };

    return (
        <>
            <section
                className="relative bg-cover bg-center py-20 px-6"
                style={{ backgroundImage: "url('/herobg.png')" }}
            >
                <div className="absolute inset-0 bg-gray-200/60"></div>

                <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between bg-white/50 backdrop-blur-lg p-10 rounded-2xl shadow-xl mt-20">
                    <div className="md:w-1/2 text-center md:text-left">
                        <h1 className="text-4xl font-bold text-gray-900">
                            Get Your Ticket Online, Easy and Safely
                        </h1>
                        <p className="text-gray-600 mt-4">
                            Book your bus tickets hassle-free with just a few clicks.
                        </p>
                        <Link href="/findtickets">
                            <button className="mt-6 px-6 py-3 bg-[#FF6B6B] text-white font-semibold rounded-lg shadow-md hover:bg-[#E55A5A]">
                                Buy Tickets
                            </button>
                        </Link>
                    </div>

                    <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4">Find Your Ticket</h3>
                        <form onSubmit={handleSearch} className="grid gap-4">
                            <input
                                type="text"
                                placeholder="Origin"
                                value={origin}
                                onChange={(e) => setOrigin(e.target.value)}
                                className="p-3 border rounded-lg"
                                list="origin-list"
                                required
                            />
                            <datalist id="origin-list">
                                {popularRoutes.map((route, index) => (
                                    <option key={index} value={route.origin} />
                                ))}
                            </datalist>

                            <input
                                type="text"
                                placeholder="Destination"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                className="p-3 border rounded-lg"
                                list="destination-list"
                                required
                            />
                            <datalist id="destination-list">
                                {popularRoutes.map((route, index) => (
                                    <option key={index} value={route.destination} />
                                ))}
                            </datalist>

                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="p-3 border rounded-lg"
                                required
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-[#FF6B6B] text-white font-semibold rounded-lg shadow-md hover:bg-[#E55A5A] transition"
                            >
                                Search Tickets
                            </button>
                        </form>
                    </div>
                </div>
            </section>
            <Services />
        </>
    );
};

export default HeroSection;