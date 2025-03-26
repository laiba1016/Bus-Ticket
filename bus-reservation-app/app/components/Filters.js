"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Services from "../Services/page";

const HeroSection = () => {
    const router = useRouter();
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!origin || !destination || !date) {
            alert("Please fill in all fields");
            return;
        }
        const queryParams = new URLSearchParams({
            origin,
            destination,
            date
        });
        router.push(`/findtickets?${queryParams}`);
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
                        <Link href="/Schedule">
                            <button className="mt-6 px-6 py-3 bg-[#FF6B6B] text-white font-semibold rounded-lg shadow-md hover:bg-[#E55A5A]">
                                Check Schedule Now
                            </button>
                        </Link>
                    </div>

                    <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-lg mt-10 md:mt-0">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Ticket</h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="flex space-x-4">
                                <input
                                    type="text"
                                    placeholder="Origin"
                                    className="w-1/2 p-3 border rounded-lg"
                                    value={origin}
                                    onChange={(e) => setOrigin(e.target.value)}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Destination"
                                    className="w-1/2 p-3 border rounded-lg"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    required
                                />
                            </div>

                            <input
                                type="date"
                                className="w-full p-3 border rounded-lg"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />

                            <button
                                type="submit"
                                className="w-full px-4 py-3 bg-[#FF6B6B] text-white font-semibold rounded-lg shadow-md hover:bg-[#E55A5A]"
                            >
                                Find Tickets
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