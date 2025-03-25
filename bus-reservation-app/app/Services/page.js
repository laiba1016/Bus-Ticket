import React from "react";
import { ShieldCheck, RotateCcw, Headphones } from "lucide-react";

const Services = () => {
    return (
        <div className="py-12 bg-white text-center">
            <h2 className="text-3xl font-bold text-black mb-6">
                Our <span className="text-red-600">Services</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-16">

                <div className="p-6 py-12 bg-gray-200 rounded-lg shadow-lg hover:bg-gray-300 transition flex flex-col items-center">
                    <div className="flex items-center justify-center space-x-3">
                        <ShieldCheck className="text-black" size={30} />
                        <h3 className="text-xl font-semibold text-black">Secure Payment</h3>
                    </div>
                    <p className="text-gray-700 mt-2 text-center">
                        Integrate secure payment gateways for users to pay for their tickets.
                    </p>
                </div>

                <div className="p-6 py-12 bg-gray-200 rounded-lg shadow-lg hover:bg-gray-300 transition flex flex-col items-center">
                    <div className="flex items-center justify-center space-x-3">
                        <RotateCcw className="text-black" size={30} />
                        <h3 className="text-xl font-semibold text-black">Refund Policy</h3>
                    </div>
                    <p className="text-gray-700 mt-2 text-center">
                        Offer options for users to purchase refundable tickets with clear terms.
                    </p>
                </div>

                <div className="p-6 py-12 bg-gray-200 rounded-lg shadow-lg hover:bg-gray-300 transition flex flex-col items-center">
                    <div className="flex items-center justify-center space-x-3">
                        <Headphones className="text-black" size={30} />
                        <h3 className="text-xl font-semibold text-black">24/7 Support</h3>
                    </div>
                    <p className="text-gray-700 mt-2 text-center">
                        Get assistance anytime through chat, email, or phone.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Services;