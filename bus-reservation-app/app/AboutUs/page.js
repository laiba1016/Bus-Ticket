import React from "react";
import Footer from "../components/Footer";

const AboutUs = () => {
    return (
        <div id="aboutus" className="bg-gray-50  min-h-screen">
            {/* 
            <section className="bg-[#FF6B6B] text-white py-20 px-6 text-center shadow-lg">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide">
                    About Us
                </h1>
                <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
                    Reliable, Affordable, and Comfortable Travel for Everyone
                </p>
            </section> */}

            <section className="max-w-6xl mx-auto px-6 py-20">
                <h1 className="text-[#FF6B6B] text-5xl md:text-6xl mt-8 font-extrabold tracking-wide">
                    About Us
                </h1>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">Who We Are</h2>
                        <p className="mt-6 text-gray-600 leading-relaxed">
                            Bus Booking is a leading online bus ticketing platform dedicated to making your travel experience seamless and hassle-free.
                            We connect travelers with a wide network of buses, providing safe, comfortable, and budget-friendly rides.
                        </p>
                        <p className="mt-4 text-gray-600 leading-relaxed">
                            With real-time booking, transparent pricing, and top-notch customer service, we ensure that you reach your destination without any worries.
                        </p>
                    </div>
                    <div className="relative">
                        <img
                            src="/undraw_team-work_i1f3.png"
                            alt="Teamwork"
                            className="rounded-lg shadow-lg w-full transform hover:scale-105 transition-all duration-300"
                        />
                    </div>
                </div>
            </section>

            <section className="bg-white py-20 shadow-inner">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Our Mission & Vision</h2>
                    <p className="mt-6 text-gray-600 leading-relaxed max-w-3xl mx-auto">
                        Our mission is to make bus travel more accessible, reliable, and affordable for everyone. We aim to bridge the gap between passengers and
                        bus operators by offering a digital platform that ensures efficiency and convenience.
                    </p>
                    <p className="mt-4 text-gray-600 leading-relaxed max-w-3xl mx-auto">
                        Our vision is to revolutionize the way people travel by road, providing the best-in-class services with modern technology, real-time tracking,
                        and customer satisfaction.
                    </p>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-6 py-20">
                <h2 className="text-3xl font-bold text-gray-800 text-center">Why Choose Us?</h2>
                <div className="grid md:grid-cols-3 gap-12 mt-12">
                    {[
                        { title: "Easy Booking", desc: "Book your tickets in just a few clicks with our user-friendly platform." },
                        { title: "Affordable Prices", desc: "We offer competitive pricing without compromising on comfort and safety." },
                        { title: "24/7 Customer Support", desc: "Our dedicated team is available around the clock to assist you." },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-xl shadow-md text-center transform hover:scale-105 transition-all duration-300"
                        >
                            <h3 className="text-xl font-semibold text-[#FF6B6B]">{item.title}</h3>
                            <p className="mt-4 text-gray-600">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default AboutUs;
