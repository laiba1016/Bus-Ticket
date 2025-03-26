"use client";

import { useEffect, useState } from "react";

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const fetchBookings = async () => {
            if (!userId) return;

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://localhost:5001/api/routes/user-bookings/${userId}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch bookings. Status: ${response.status}`);
                }
                const data = await response.json();
                setBookings(data.data || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [userId]);

    return (
        <div className="max-w-5xl mx-auto p-8 bg-white shadow-xl rounded-xl">
            <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-900">Booking History</h2>

            {loading ? (
                <p className="text-center text-gray-500 animate-pulse">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500 font-medium">{error}</p>
            ) : bookings.length > 0 ? (
                <ul className="grid gap-6">
                    {bookings
                        .filter(booking => booking.routeId)
                        .map((booking) => {
                            const pricePerSeat = booking.routeId?.pricePerSeat || 0;
                            const totalSeats = booking.seats?.length || 0;
                            const totalPrice = pricePerSeat * totalSeats;

                            return (
                                <li key={booking._id} className="bg-gray-50 p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-2xl transition duration-300">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                        <span className="text-orange-600">Route:</span> {booking.routeId?.origin} → {booking.routeId?.destination}
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4 text-gray-700">
                                        <p><strong>Departure Date:</strong> {booking.departureDate}</p>
                                        <p><strong>Departure Time:</strong> {booking.routeId?.departureTime || "N/A"}</p>
                                        <p><strong>Start Time:</strong> {booking.routeId?.startTime || "N/A"}</p>
                                        <p><strong>End Time:</strong> {booking.routeId?.endTime || "N/A"}</p>
                                        <p><strong>Seats:</strong> {booking.seats?.join(", ") || "N/A"}</p>
                                        <p><strong>Vehicle Type:</strong> {booking.routeId?.vehicleType || "N/A"}</p>
                                        <p><strong>Facilities:</strong> {booking.routeId?.facilities?.join(", ") || "No facilities available"}</p>
                                    </div>
                                    <div className="mt-4 flex justify-between items-center">
                                        <p className="text-lg text-green-600 font-semibold">Price Per Seat: {pricePerSeat} PKR</p>
                                        <p className="text-lg text-blue-600 font-bold">Total Price: {totalPrice} PKR</p>
                                    </div>
                                </li>
                            );
                        })}
                </ul>
            ) : (
                <p className="text-center text-gray-500">No bookings found.</p>
            )}
        </div>
    );
};

export default BookingHistory;