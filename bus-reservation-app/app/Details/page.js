"use client";
import React, { useEffect, useState } from "react";
import { MdEventSeat } from "react-icons/md";
import { TbSteeringWheel } from "react-icons/tb";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Details = () => {
    const rows = 5;
    const cols = 9;
    const [bookedSeats, setBookedSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const searchParams = useSearchParams();
    const router = useRouter();

    const userId = localStorage.getItem("userId");
    // console.log("User ID:", userId);

    const fetchRouteDetails = async () => {
        const routeId = searchParams.get("routeId");
        if (!routeId) return;

        const response = await fetch(`http://localhost:5001/api/routes/${routeId}`);
        const data = await response.json();
        if (data.success) {
            setBookedSeats(data.data.bookedSeats);
        } else {
            console.error(data.message);
        }
    };

    const toggleSeatSelection = (seat) => {
        if (bookedSeats.includes(seat)) return;
        setSelectedSeats((prev) =>
            prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
        );
    };

    useEffect(() => {
        fetchRouteDetails();
    }, []);

    const pricePerSeat = Number(searchParams.get("price")) || 800;
    const origin = searchParams.get("origin") || "N/A";
    const destination = searchParams.get("destination") || "N/A";
    const dateParam = searchParams.get("date") || "N/A";
    const departureTime = searchParams.get("departureTime") || "N/A";
    const formattedDate = dateParam !== "N/A"
        ? new Date(dateParam).toLocaleDateString("en-US", {
            weekday: "long", year: "numeric", month: "long", day: "numeric",
        })
        : "N/A";

    const totalPrice = selectedSeats.length * pricePerSeat;
    const handleProceed = () => {
        if (!userId) {
            alert("You must be logged in to book seats.");
            router.push("/Login");
            return;
        }

        if (selectedSeats.length === 0) {
            alert("Please select at least one seat.");
            return;
        }

        const bookingDetails = {
            routeId: searchParams.get("routeId"),
            seats: selectedSeats,
            departureDate: searchParams.get("date"),
            totalPrice,
        };

        localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
        router.push("/passenger-details");
    };


    return (
        <div className="min-h-screen bg-gray-100">
            <div className="relative h-64 bg-gray-900 flex items-center justify-center text-white drop-shadow-lg bg-cover bg-center"
                style={{ backgroundImage: "url('/Bus3.jpg')" }}>
                <h1 className="text-4xl font-bold bg-gray-800 px-4 py-2 rounded-md">Bus Details</h1>
                <div className="absolute bottom-4 text-center bg-gray-800 px-3 py-2 rounded-md">
                    <p className="text-lg">{origin} → {destination} {dateParam !== "N/A" && ` • ${formattedDate}`}</p>
                    <p className="text-sm mt-1">Departure: {departureTime}</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white shadow-md p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4 text-center text-black">Select Your Seats</h2>
                    <div className="flex justify-start mb-4">
                        <TbSteeringWheel className="text-3xl" />
                    </div>

                    <div className="grid grid-rows-5 gap-4">
                        {Array.from({ length: rows }).map((_, row) => (
                            <div key={row} className="grid grid-cols-9 gap-2">
                                {Array.from({ length: cols }).map((_, col) => {
                                    if (row === 2 && col !== 8) return <div key={col}></div>;
                                    const seatId = `${String.fromCharCode(65 + row)}${col + 1}`;
                                    return (
                                        <button key={seatId} onClick={() => toggleSeatSelection(seatId)}
                                            className="flex flex-col items-center justify-center"
                                            disabled={bookedSeats.includes(seatId)}>
                                            <MdEventSeat className={`text-3xl ${bookedSeats.includes(seatId)
                                                ? "text-red-500"
                                                : selectedSeats.includes(seatId)
                                                    ? "text-yellow-500"
                                                    : "text-gray-300 hover:text-gray-400"}`} />
                                            <span className="text-xs">{seatId}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 shadow-md rounded-lg">
                    <h2 className="text-xl font-semibold mb-4 text-black">Journey Details</h2>
                    <p className="text-gray-500">
                        <strong className="text-gray-800">From:</strong> {origin} <br />
                        <strong className="text-gray-800">To:</strong> {destination} <br />
                        <strong className="text-gray-800">Date:</strong> {formattedDate} <br />
                        <strong className="text-gray-800">Departure Time:</strong> {departureTime}
                    </p>

                    <h3 className="text-lg font-semibold mt-4 text-black">Selected Seats</h3>
                    <p className="text-gray-700">
                        {selectedSeats.length > 0 ? selectedSeats.join(", ") : "No seats selected"}
                    </p>

                    <h3 className="text-lg font-semibold mt-4 text-black">Total Price: Rs {totalPrice}</h3>
                    <p className="text-sm text-gray-600">(including all taxes)</p>

                    <button
                        onClick={handleProceed}
                        className="w-full mt-4 bg-[#FF6B6B] text-white py-2 rounded-md hover:bg-[#FF4B4B] transition"
                        disabled={selectedSeats.length === 0}
                    >
                        Proceed to Checkout
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Details;
