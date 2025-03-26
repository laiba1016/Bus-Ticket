"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const EditFormRoute = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [routeData, setRouteData] = useState({
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
        seats: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Fetch query params from URL
    useEffect(() => {
        if (searchParams) {
            setRouteData({
                origin: searchParams.get("origin") || "",
                destination: searchParams.get("destination") || "",
                totalSeats: searchParams.get("totalSeats") || "",
                startTime: searchParams.get("startTime") || "",
                endTime: searchParams.get("endTime") || "",
                departureTime: searchParams.get("departureTime") || "",
                departureDate: searchParams.get("departureDate") || "",
                pricePerSeat: searchParams.get("pricePerSeat") || "",
                vehicleType: searchParams.get("vehicleType") || "",
                facilities: searchParams.get("facilities") || "",
                seats: searchParams.get("seats") || ""
            });
        }
    }, [searchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const routeId = searchParams.get("id"); // Get route ID
            if (!routeId) {
                setError("Invalid route ID.");
                return;
            }

            await axios.put(`http://localhost:5001/api/routes/${routeId}`, {
                ...routeData,
                facilities: routeData.facilities.split(',').map(f => f.trim()),
                bookedSeats: routeData.seats.split(',').map(s => s.trim())
            });

            router.push("/admin-dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update route");
            console.error("Error updating route:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="relative bg-white rounded-xl shadow-md p-6 md:p-8 max-w-2xl mx-auto mt-10">
                <button
                    onClick={() => router.push("/admin-dashboard")}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
                >
                    ✖
                </button>

                <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-6 text-center">
                    Edit Route
                </h2>

                {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Origin</label>
                            <input
                                type="text"
                                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-[#FF6B6B]"
                                value={routeData.origin}
                                onChange={(e) => setRouteData({ ...routeData, origin: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Destination</label>
                            <input
                                type="text"
                                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-[#FF6B6B]"
                                value={routeData.destination}
                                onChange={(e) => setRouteData({ ...routeData, destination: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Total Seats</label>
                        <input
                            type="number"
                            className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-[#FF6B6B]"
                            value={routeData.totalSeats}
                            onChange={(e) => setRouteData({ ...routeData, totalSeats: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Departure Date</label>
                            <input
                                type="date"
                                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-[#FF6B6B]"
                                value={routeData.departureDate}
                                onChange={(e) => setRouteData({ ...routeData, departureDate: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Departure Time</label>
                            <input
                                type="time"
                                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-[#FF6B6B]"
                                value={routeData.departureTime}
                                onChange={(e) => setRouteData({ ...routeData, departureTime: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Start Time</label>
                            <input
                                type="time"
                                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-[#FF6B6B]"
                                value={routeData.startTime}
                                onChange={(e) => setRouteData({ ...routeData, startTime: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">End Time</label>
                            <input
                                type="time"
                                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-[#FF6B6B]"
                                value={routeData.endTime}
                                onChange={(e) => setRouteData({ ...routeData, endTime: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Price per Seat (Rs)</label>
                            <input
                                type="number"
                                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-[#FF6B6B]"
                                value={routeData.pricePerSeat}
                                onChange={(e) => setRouteData({ ...routeData, pricePerSeat: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Vehicle Type</label>
                            <select
                                className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-[#FF6B6B]"
                                value={routeData.vehicleType}
                                onChange={(e) => setRouteData({ ...routeData, vehicleType: e.target.value })}
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
                            value={routeData.facilities}
                            onChange={(e) => setRouteData({ ...routeData, facilities: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Booked Seats</label>
                        <input
                            type="text"
                            className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B6B] focus:border-[#FF6B6B]"
                            placeholder="e.g., A1, B2, C3"
                            value={routeData.seats}
                            onChange={(e) => setRouteData({ ...routeData, seats: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#FF6B6B] text-white font-medium py-3 rounded-lg text-center transition-all hover:bg-[#E85656] active:bg-[#FF6B6B] disabled:opacity-50"
                    >
                        {loading ? "Updating..." : "Update Route"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditFormRoute;