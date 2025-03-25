"use client"
import React, { useState } from 'react'
import Footer from '../components/Footer';

const routes = [
    { id: 1, from: "Lahore", to: "Karachi", duration: "16-18 hours" },
    { id: 2, from: "Lahore", to: "Islamabad", duration: "4-5 hours" },
    { id: 3, from: "Karachi", to: "Islamabad", duration: "18-20 hours" },
    { id: 4, from: "Lahore", to: "Multan", duration: "3-4 hours" },
    { id: 5, from: "Islamabad", to: "Gilgit", duration: "12-14 hours" },
    { id: 6, from: "Karachi", to: "Quetta", duration: "10-12 hours" },
    { id: 7, from: "Lahore", to: "Quetta", duration: "14-16 hours" },
    { id: 8, from: "Lahore", to: "Swat", duration: "6-7 hours" },
    { id: 9, from: "Khanewal", to: "Lahore", duration: "3-4 hours" },
    { id: 10, from: "Sialkot", to: "Lahore", duration: "2-3 hours" },
    { id: 11, from: "Peshawar", to: "Lahore", duration: "6-7 hours" },
    { id: 12, from: "Quetta", to: "Lahore", duration: "14-16 hours" },
    { id: 13, from: "Quetta", to: "Karachi", duration: "10-12 hours" },
    { id: 14, from: "Karachi", to: "Faisalabad", duration: "14-16 hours" },
    { id: 15, from: "Karachi", to: "Mianwali", duration: "12-14 hours" },
    { id: 16, from: "Karachi", to: "Multan", duration: "10-12 hours" },
    { id: 17, from: "Rawalpindi", to: "Karachi", duration: "18-20 hours" },
    { id: 18, from: "Faisalabad", to: "Lahore", duration: "2-3 hours" },
    { id: 19, from: "Sargodha", to: "Islamabad", duration: "4-5 hours" },
    { id: 20, from: "Bahawalpur", to: "Lahore", duration: "6-7 hours" },
    { id: 21, from: "Hyderabad", to: "Lahore", duration: "14-16 hours" },
    { id: 22, from: "Gujranwala", to: "Multan", duration: "4-5 hours" },
    { id: 23, from: "Multan", to: "Rawalpindi", duration: "7-8 hours" },
    { id: 24, from: "Gilgit", to: "Islamabad", duration: "12-14 hours" },
    { id: 25, from: "Abbottabad", to: "Lahore", duration: "5-6 hours" },
    { id: 26, from: "Dera Ghazi Khan", to: "Karachi", duration: "12-14 hours" },
    { id: 27, from: "Sukkur", to: "Lahore", duration: "10-12 hours" },
    { id: 28, from: "Rahim Yar Khan", to: "Multan", duration: "3-4 hours" },
    { id: 29, from: "Mardan", to: "Peshawar", duration: "1-2 hours" },
    { id: 30, from: "Faisalabad", to: "Quetta", duration: "12-14 hours" },
    { id: 31, from: "Lahore", to: "Muzaffarabad", duration: "7-8 hours" },
    { id: 32, from: "Karachi", to: "Bahawalpur", duration: "12-14 hours" },
    { id: 33, from: "Rawalpindi", to: "Sialkot", duration: "3-4 hours" },
    { id: 34, from: "Islamabad", to: "Naran", duration: "7-8 hours" },
    { id: 35, from: "Sialkot", to: "Faisalabad", duration: "2-3 hours" },
    { id: 36, from: "Mingora", to: "Peshawar", duration: "4-5 hours" },
    { id: 37, from: "Lahore", to: "Bahawalnagar", duration: "4-5 hours" },
    { id: 38, from: "Mirpur", to: "Islamabad", duration: "2-3 hours" },
    { id: 39, from: "Multan", to: "Sahiwal", duration: "2-3 hours" },
    { id: 40, from: "Chitral", to: "Peshawar", duration: "10-12 hours" },
    { id: 41, from: "Rawalpindi", to: "Murree", duration: "1-2 hours" },
    { id: 42, from: "Quetta", to: "Gwadar", duration: "10-12 hours" },
    { id: 43, from: "Sialkot", to: "Islamabad", duration: "4-5 hours" },
    { id: 44, from: "Hyderabad", to: "Multan", duration: "10-12 hours" },
    { id: 45, from: "Peshawar", to: "Islamabad", duration: "2-3 hours" },
    { id: 46, from: "Karachi", to: "Murree", duration: "20-22 hours" },
    { id: 47, from: "Faisalabad", to: "Gujranwala", duration: "2-3 hours" },
    { id: 48, from: "Multan", to: "Mianwali", duration: "5-6 hours" },
    { id: 49, from: "Gilgit", to: "Chitral", duration: "8-9 hours" },
    { id: 50, from: "Bahawalpur", to: "Quetta", duration: "12-14 hours" }
];

const Schedule = () => {
    const [searchFrom, setSearchFrom] = useState("");
    const [searchTo, setSearchTo] = useState("");

    const filteredRoutes = routes.filter(route =>
        route.from.toLowerCase().includes(searchFrom.toLowerCase()) &&
        route.to.toLowerCase().includes(searchTo.toLowerCase())
    );

    return (
        <>
            <div className="container mx-auto p-6">
                <h1 className="text-4xl font-bold text-center text-[#FF6B6B] mb-6">Bus Routes</h1>

                <div className="flex justify-center gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="From..."
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                        value={searchFrom}
                        onChange={(e) => setSearchFrom(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="To..."
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                        value={searchTo}
                        onChange={(e) => setSearchTo(e.target.value)}
                    />
                </div>

                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <table className="w-full border-collapse text-gray-700">
                        <thead>
                            <tr className="bg-[#FF6B6B] text-white">
                                <th className="p-4">From</th>
                                <th className="p-4">To</th>
                                <th className="p-4">Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRoutes.length > 0 ? (
                                filteredRoutes.map(route => (
                                    <tr key={route.id} className="text-center border-t border-gray-200 hover:bg-gray-100">
                                        <td className="p-4">{route.from}</td>
                                        <td className="p-4">{route.to}</td>
                                        <td className="p-4">{route.duration}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center p-4 text-gray-500">No routes found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Schedule;
