import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserData = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get('http://localhost:5003/api/routes/bookings');
            if (response.data.success) {
                const data = response.data.data;

                const mergedBookings = {};

                data.forEach((booking) => {
                    const userId = booking.userId;

                    if (!mergedBookings[userId]) {
                        mergedBookings[userId] = { ...booking };
                    } else {
                        if (booking.seats) {
                            mergedBookings[userId].seats = booking.seats;
                        }

                        if (booking.passengerInfo) {
                            mergedBookings[userId].passengerInfo = booking.passengerInfo;
                            mergedBookings[userId].totalPrice = booking.totalPrice;
                        }
                    }
                });

                setBookings(Object.values(mergedBookings));
            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };



    const handleDelete = async (bookingId) => {
        if (!window.confirm("Are you sure you want to delete this booking?")) return;

        try {
            await axios.delete(`http://localhost:5003/api/routes/bookings/${bookingId}`);
            setBookings(bookings.filter(booking => booking._id !== bookingId));
        } catch (error) {
            console.error("Error deleting booking:", error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">User Personal Information</h2>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px] border border-gray-200">
                        <thead className="bg-[#FF6B6B]/10 text-gray-700">
                            <tr className="border-b border-gray-300">
                                <th className="text-left p-2 md:p-3 text-sm md:text-base">Name</th>
                                <th className="text-left p-2 md:p-3 text-sm md:text-base">Email</th>
                                <th className="text-left p-2 md:p-3 text-sm md:text-base">Phone</th>
                                <th className="text-left p-2 md:p-3 text-sm md:text-base">Price</th>
                                <th className="text-left p-2 md:p-3 text-sm md:text-base">Seats</th>
                                <th className="text-left p-2 md:p-3 text-sm md:text-base">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.length > 0 ? (
                                bookings.map((booking) => (
                                    <tr key={booking._id} className="border-t even:bg-gray-50">
                                        <td className="p-2 md:p-3 text-sm md:text-base">
                                            {booking.passengerInfo?.name || "N/A"}
                                        </td>
                                        <td className="p-2 md:p-3 text-sm md:text-base">
                                            {booking.passengerInfo?.email || "N/A"}
                                        </td>
                                        <td className="p-2 md:p-3 text-sm md:text-base">
                                            {booking.passengerInfo?.phone || "N/A"}
                                        </td>
                                        <td className="p-2 md:p-3 text-sm md:text-base">
                                            ${booking.totalPrice || "N/A"}
                                        </td>
                                        <td className="p-2 md:p-3 text-sm md:text-base">
                                            {booking.seats?.join(", ") || "N/A"}
                                        </td>
                                        <td className="p-2 md:p-3 text-sm md:text-base">
                                            <button
                                                onClick={() => handleDelete(booking._id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="p-4 text-center text-gray-500">
                                        No user data available.
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserData;