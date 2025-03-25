import Link from "next/link";
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-6">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                    <div>
                        <h2 className="text-xl font-semibold text-[#FF6B6B]">Bus Booking</h2>
                        <p className="mt-2 text-gray-400">Your trusted partner in hassle-free travel.</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-[#FF6B6B]">Quick Links</h3>
                        <ul className="mt-2 space-y-2">
                            <li><Link href="/" className="hover:text-[#FF6B6B] transition">Home</Link></li>
                            <li><Link href="/Schedule" className="hover:text-[#FF6B6B] transition">Schedule</Link></li>
                            <li><Link href="/findtickets" className="hover:text-[#FF6B6B] transition">Buy Ticket</Link></li>
                            <li><Link href="/booking-history" className="hover:text-[#FF6B6B] transition">Booking History</Link></li>
                            <li><Link href="/AboutUs" className="hover:text-[#FF6B6B] transition">About</Link></li>
                            <li><Link href="/contactus" className="hover:text-[#FF6B6B] transition">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-[#FF6B6B]">Contact Us</h3>
                        <p className="mt-2 text-gray-400">📍 Lahore, Pakistan</p>
                        <p className="text-gray-400">📞 +92 300 1234567</p>
                        <p className="text-gray-400">✉️ support@busbooking.com</p>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-6 pt-4 flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm">
                    <p>&copy; 2025 Bus Booking. All Rights Reserved.</p>
                    <div className="flex space-x-4 mt-3 md:mt-0">
                        <a href="#" className="hover:text-[#FF6B6B] transition"><i className="fab fa-facebook"></i></a>
                        <a href="#" className="hover:text-[#FF6B6B] transition"><i className="fab fa-twitter"></i></a>
                        <a href="#" className="hover:text-[#FF6B6B] transition"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="hover:text-[#FF6B6B] transition"><i className="fab fa-linkedin"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
