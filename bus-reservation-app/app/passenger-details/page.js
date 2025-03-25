"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const PassengerDetails = () => {
    const router = useRouter();
    const [passengerInfo, setPassengerInfo] = useState({
        name: "",
        phone: "",
        email: "",
    });

    const [bookingDetails, setBookingDetails] = useState(null);

    useEffect(() => {
        const storedDetails = JSON.parse(localStorage.getItem("bookingDetails"));
        if (!storedDetails) {
            router.push("/");
        } else {
            setBookingDetails(storedDetails);
        }
    }, []);

    if (!bookingDetails) return <p>Loading...</p>;

    const handleChange = (e) => {
        setPassengerInfo({ ...passengerInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!passengerInfo.name || !passengerInfo.phone || !passengerInfo.email) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            // Retrieve userId from localStorage
            const userId = localStorage.getItem("userId");
            if (!userId) {
                alert("User not authenticated.");
                return;
            }

            // Step 1: Book seats on Server 5001 (Route Server)
            const bookingResponse = await fetch(`http://localhost:5001/api/routes/book-seats`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: userId,
                    routeId: bookingDetails.routeId,
                    seats: bookingDetails.seats,
                    departureDate: bookingDetails.departureDate
                })
            });

            const bookingData = await bookingResponse.json();
            if (!bookingData.success) {
                alert(bookingData.message || "Failed to book seats.");
                return;
            }

            // Extract bookingId from the response
            const bookingId = bookingData.bookingId;

            // Step 2: Save passenger details on Server 5003 (Booking Server)
            const passengerResponse = await fetch(`http://localhost:5003/api/routes/book-seats`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bookingId: bookingId,
                    userId: userId,
                    passengerInfo: passengerInfo, // Use form data
                    totalPrice: bookingDetails.totalPrice
                })
            });

            const passengerData = await passengerResponse.json();
            if (passengerData.success) {
                alert("Booking confirmed!");
                localStorage.removeItem("bookingDetails");
                router.push("/");
            } else {
                alert(passengerData.message || "Failed to save passenger details.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    };
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center">Passenger Details</h1>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 mt-6 rounded-lg shadow-md">
                <label className="block mb-2 text-gray-700">Full Name</label>
                <input type="text" name="name" value={passengerInfo.name} onChange={handleChange}
                    className="w-full p-2 border rounded mb-4" required />

                <label className="block mb-2 text-gray-700">Phone Number</label>
                <input type="text" name="phone" value={passengerInfo.phone} onChange={handleChange}
                    className="w-full p-2 border rounded mb-4" required />

                <label className="block mb-2 text-gray-700">Email</label>
                <input type="email" name="email" value={passengerInfo.email} onChange={handleChange}
                    className="w-full p-2 border rounded mb-4" required />

                <h3 className="text-lg font-semibold mt-4 text-black">Total Price: Rs {bookingDetails.totalPrice}</h3>

                <button type="submit" className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md">
                    Confirm Booking
                </button>
            </form>
        </div>
    );
};

export default PassengerDetails;
