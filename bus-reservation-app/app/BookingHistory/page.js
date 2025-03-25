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
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Booking History</h2>

            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : bookings.length > 0 ? (
                <ul className="space-y-4">
                    {bookings
                        .filter(booking => booking.routeId) // Only show bookings with a valid routeId
                        .map((booking) => {
                            const pricePerSeat = booking.routeId?.pricePerSeat || 0;
                            const totalSeats = booking.seats?.length || 0;
                            const totalPrice = pricePerSeat * totalSeats;

                            return (
                                <li key={booking._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                    <p className="text-lg font-semibold text-gray-700">
                                        <span className="text-orange-600">Route:</span> {booking.routeId?.origin} → {booking.routeId?.destination}
                                    </p>
                                    <p className="text-gray-600"><strong>Departure Date:</strong> {booking.departureDate}</p>
                                    <p className="text-gray-600"><strong>Departure Time:</strong> {booking.routeId?.departureTime || "N/A"}</p>
                                    <p className="text-gray-600"><strong>Start Time:</strong> {booking.routeId?.startTime || "N/A"}</p>
                                    <p className="text-gray-600"><strong>End Time:</strong> {booking.routeId?.endTime || "N/A"}</p>
                                    <p className="text-gray-600"><strong>Seats:</strong> {booking.seats?.join(", ") || "N/A"}</p>
                                    <p className="text-gray-600"><strong>Price Per Seat:</strong> <span className="text-green-600">{pricePerSeat} PKR</span></p>
                                    <p className="text-gray-600"><strong>Total Price:</strong> <span className="text-blue-600 font-bold">{totalPrice} PKR</span></p>
                                    <p className="text-gray-600"><strong>Vehicle Type:</strong> {booking.routeId?.vehicleType || "N/A"}</p>
                                    <p className="text-gray-600"><strong>Facilities:</strong> {booking.routeId?.facilities?.join(", ") || "No facilities available"}</p>
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

// "use client";

// import { useEffect, useState } from "react";

// const BookingHistory = () => {
//     const [bookings, setBookings] = useState([]);
//     const [userId, setUserId] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const storedUserId = localStorage.getItem("userId");
//         if (storedUserId) {
//             setUserId(storedUserId);
//         } else {
//             setLoading(false);
//         }
//     }, []);

//     useEffect(() => {
//         const fetchBookings = async () => {
//             if (!userId) return;

//             setLoading(true);
//             setError(null);

//             try {
//                 const response = await fetch(`http://localhost:5001/api/routes/user-bookings/${userId}`);
//                 if (!response.ok) {
//                     throw new Error(`Failed to fetch bookings. Status: ${response.status}`);
//                 }
//                 const data = await response.json();
//                 setBookings(data.data || []);
//             } catch (error) {
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchBookings();
//     }, [userId]);

//     return (
//         <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//             <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Booking History</h2>

//             {loading ? (
//                 <p className="text-center text-gray-500">Loading...</p>
//             ) : error ? (
//                 <p className="text-center text-red-500">{error}</p>
//             ) : bookings.length > 0 ? (
//                 <ul className="space-y-4">
//                     {bookings.map((booking) => (
//                         <li key={booking._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
//                             <p className="text-lg font-semibold text-gray-700">
//                                 <span className="text-orange-600">Route:</span> {booking.routeId?.origin} → {booking.routeId?.destination}
//                             </p>
//                             <p className="text-gray-600"><strong>Departure Date:</strong> {booking.departureDate}</p>
//                             <p className="text-gray-600"><strong>Departure Time:</strong> {booking.routeId?.departureTime || "N/A"}</p>
//                             <p className="text-gray-600"><strong>Start Time:</strong> {booking.routeId?.startTime || "N/A"}</p>
//                             <p className="text-gray-600"><strong>End Time:</strong> {booking.routeId?.endTime || "N/A"}</p>
//                             <p className="text-gray-600"><strong>Seats:</strong> {booking.seats?.join(", ") || "N/A"}</p>
//                             <p className="text-gray-600"><strong>Price Per Seat:</strong> <span className="text-green-600">{booking.routeId?.pricePerSeat || "N/A"} PKR</span></p>
//                             <p className="text-gray-600"><strong>Vehicle Type:</strong> {booking.routeId?.vehicleType || "N/A"}</p>
//                             <p className="text-gray-600"><strong>Facilities:</strong> {booking.routeId?.facilities?.join(", ") || "No facilities available"}</p>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p className="text-center text-gray-500">No bookings found.</p>
//             )}
//         </div>
//     );
// };

// export default BookingHistory;