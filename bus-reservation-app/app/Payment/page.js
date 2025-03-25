"use client";
import { useSearchParams } from "next/navigation";

export default function PaymentPage() {
    const params = useSearchParams();
    const seats = params.get("seats")?.split(",") || [];
    const total = params.get("total");
    const origin = params.get("origin");
    const destination = params.get("destination");
    const date = params.get("date");
    const time = params.get("time");

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-4">Payment Details</h1>
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Trip Information</h2>
                    <p>{origin} to {destination}</p>
                    <p>Date: {new Date(date).toLocaleDateString()}</p>
                    <p>Departure: {time}</p>
                    <p>Seats: {seats.join(", ")}</p>
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Payment Amount</h2>
                    <p className="text-xl font-bold">Rs {total}</p>
                </div>

                <div className="border-t pt-4">
                    {/* Add your payment gateway integration here */}
                    <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
                        Confirm and Pay
                    </button>
                </div>
            </div>
        </div>
    );
}