"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import axios from "axios"; // Import Axios

const AddRouteForm = () => {
    const router = useRouter(); // Initialize router

    const [newRoute, setNewRoute] = useState({
        origin: "",
        destination: "",
        totalSeats: "",
        startTime: "",
        endTime: "",
        departureTime: "",
        departureDate: "",
        pricePerSeat: "",
        vehicleType: "",
        facilities: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleAddRoute = async (e) => {
        e.preventDefault();

        if (!newRoute.origin || !newRoute.destination) {
            alert("Origin and Destination are required!");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await axios.post("http://localhost:5001/api/routes", newRoute, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            alert("Route added successfully!");
            console.log(response.data);

            setNewRoute({
                origin: "",
                destination: "",
                totalSeats: "",
                startTime: "",
                endTime: "",
                departureTime: "",
                departureDate: "",
                pricePerSeat: "",
                vehicleType: "",
                facilities: "",
            });

            router.push("/admin-dashboard");
        } catch (err) {
            console.error("Error adding route:", err);
            setError("Failed to add route. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="relative bg-white rounded-xl shadow-md p-6 md:p-8 max-w-2xl mx-auto mt-10">

                <button
                    onClick={() => router.push("/AdminDashboard")}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
                >
                    ✖
                </button>

                <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-6 text-center">
                    Add New Route
                </h2>

                <form onSubmit={handleAddRoute} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Origin</label>
                            <input
                                type="text"
                                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-[#FF6B6B]"
                                value={newRoute.origin}
                                onChange={(e) => setNewRoute({ ...newRoute, origin: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Destination</label>
                            <input
                                type="text"
                                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-[#FF6B6B]"
                                value={newRoute.destination}
                                onChange={(e) => setNewRoute({ ...newRoute, destination: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Total Seats</label>
                        <input
                            type="number"
                            className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-[#FF6B6B]"
                            value={newRoute.totalSeats}
                            onChange={(e) => setNewRoute({ ...newRoute, totalSeats: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Departure Date</label>
                            <input
                                type="date"
                                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-[#FF6B6B]"
                                value={newRoute.departureDate}
                                onChange={(e) => setNewRoute({ ...newRoute, departureDate: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Departure Time</label>
                            <input
                                type="time"
                                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-[#FF6B6B]"
                                value={newRoute.departureTime}
                                onChange={(e) => setNewRoute({ ...newRoute, departureTime: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Start Time</label>
                            <input
                                type="time"
                                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-[#FF6B6B]"
                                value={newRoute.startTime}
                                onChange={(e) => setNewRoute({ ...newRoute, startTime: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">End Time</label>
                            <input
                                type="time"
                                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-[#FF6B6B]"
                                value={newRoute.endTime}
                                onChange={(e) => setNewRoute({ ...newRoute, endTime: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Price per Seat (Rs)</label>
                            <input
                                type="number"
                                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-[#FF6B6B]"
                                value={newRoute.pricePerSeat}
                                onChange={(e) => setNewRoute({ ...newRoute, pricePerSeat: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Vehicle Type</label>
                            <select
                                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-[#FF6B6B]"
                                value={newRoute.vehicleType}
                                onChange={(e) => setNewRoute({ ...newRoute, vehicleType: e.target.value })}
                            >
                                <option value="">Select Vehicle</option>
                                <option value="Classic">Classic</option>
                                <option value="Coach">Coach</option>
                                <option value="AC">AC</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Facilities Provided</label>
                        <input
                            type="text"
                            className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-[#FF6B6B]"
                            placeholder="e.g., WiFi, AC, Reclining Seats"
                            value={newRoute.facilities}
                            onChange={(e) => setNewRoute({ ...newRoute, facilities: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#FF6B6B] text-white font-medium py-3 rounded-lg text-center transition-all hover:bg-[#E85656] active:bg-[#FF6B6B]"
                    >
                        Add Route
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddRouteForm;