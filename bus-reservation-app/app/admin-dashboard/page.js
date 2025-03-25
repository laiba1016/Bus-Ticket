"use client"
import { useEffect, useState } from 'react';
import { FaChartBar, FaTicketAlt, FaRoute, FaBars } from "react-icons/fa";
import Link from 'next/link';
import axios from 'axios';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [routes, setRoutes] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState("");
    const [newRoute, setNewRoute] = useState({
        totalSeats: "",
        destination: "",
        startTime: "",
        endTime: "",
        departureTime: "",
        pricePerSeat: "",
        vehicleType: "",
        facilities: "",
        seats: "",
    });
    const [editingIndex, setEditingIndex] = useState(null);

    const handleAddRoute = async (e) => {
        e.preventDefault();
        try {
            if (editingIndex !== null) {
                const updatedRoute = { ...routes[editingIndex], ...newRoute };
                await axios.put(`http://localhost:5001/api/routes/${updatedRoute.id}`, updatedRoute);
                const updatedRoutes = [...routes];
                updatedRoutes[editingIndex] = updatedRoute;
                setRoutes(updatedRoutes);
                setEditingIndex(null);
            } else {
                const response = await axios.post("http://localhost:5001/api/routes", newRoute);
                setRoutes([...routes, response.data]);
            }
            setNewRoute({
                totalSeats: "",
                destination: "",
                startTime: "",
                endTime: "",
                departureTime: "",
                pricePerSeat: "",
                vehicleType: "",
                facilities: "",
                seats: "",
            });
        } catch (error) {
            setError("Failed to add/update route");
            console.error("Error adding/updating route:", error);
        }
    };
    console.log("Routes data:", routes);

    const stats = [
        { title: 'Total Bookings', value: '142' },
        // { title: 'Active Routes', value: '15' },
        { title: 'Available Seats', value: '327' },
        { title: 'Today\'s Revenue', value: '23,450' }
    ];
    useEffect(() => {
        fetchRoutes();
    }, []);

    const fetchRoutes = async () => {
        try {
            const response = await axios.get("http://localhost:5001/api/routes");
            setRoutes(response.data);
        } catch (error) {
            setError("Failed to fetch routes");
            console.error("Error fetching routes:", error);
        }
    };
    // const fetchBookings = async () => {
    //     try {
    //         const response = await axios.get("http://localhost:5000/api/bookings");
    //         setBookings(response.data);
    //     } catch (error) {
    //         setError("Failed to fetch bookings");
    //         console.error("Error fetching bookings:", error);
    //     }
    // };

    // useEffect(() => {
    //     fetchRoutes();
    //     fetchBookings();
    // }, []);
    return (
        <div className="min-h-screen bg-gray-50">
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden fixed top-4 right-4 z-50 p-2 bg-[#FF6B6B] text-white rounded-lg shadow-lg"
            >
                <FaBars size={24} />
            </button>

            <div className={`fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-[#FF6B6B]/10 to-white/50 p-6 shadow-2xl border-r border-[#FF6B6B]/20 transform transition-transform duration-300 ease-in-out 
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 z-40`}>
                <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-[#FF6B6B]/10 to-white/50 p-6 shadow-2xl border-r border-[#FF6B6B]/20">

                    <h2 className="text-3xl mt-16 font-bold mb-12 text-center tracking-wide relative">
                        <span className="relative">
                            Admin
                            <span className="block w-16 h-1 bg-[#FF6B6B] mx-auto mt-2 rounded-full" />
                        </span>
                    </h2>

                    <nav>
                        <ul className="space-y-3">
                            {[
                                { label: "Dashboard", key: "dashboard", icon: <FaChartBar size={20} /> },
                                // { label: "Booked Seats", key: "bookings", icon: <FaTicketAlt size={20} /> },
                                { label: "Manage Routes", key: "routes", icon: <FaRoute size={20} /> },
                            ].map((item) => (
                                <li key={item.key}>
                                    <button
                                        onClick={() => setActiveTab(item.key)}
                                        className={`w-full flex items-center py-4 px-5 rounded-xl transition-all duration-300 font-medium group
              ${activeTab === item.key
                                                ? "bg-[#FF6B6B] text-white shadow-lg transform scale-105"
                                                : "hover:bg-[#FF6B6B]/10 hover:text-[#FF6B6B] hover:shadow-md"
                                            }`}
                                    >
                                        <span className="text-xl mr-3">{item.icon}</span>
                                        {item.label}
                                        {activeTab === item.key && (
                                            <span className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="absolute bottom-6 left-0 right-0 px-6">
                        <div className="border-t border-[#FF6B6B]/20 pt-4 text-center">
                            <p className="text-sm text-[#FF6B6B]/80 font-medium">
                                🚌 TransitPro Admin
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="md:ml-64 p-4 md:p-8">

                <header className="mb-6 md:mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-[#FF6B6B]">
                        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                    </h1>
                </header>


                {activeTab === 'dashboard' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {stats?.length > 0 ? (
                                stats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className="bg-white p-6 md:p-8 rounded-xl shadow-lg text-center transition-transform transform hover:scale-105"
                                    >
                                        <h3 className="text-sm md:text-base text-gray-500 mb-2">{stat.title}</h3>
                                        <p className="text-2xl md:text-3xl font-bold text-[#FF6B6B]">{stat.value}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 col-span-3 text-center">No stats available.</p>
                            )}
                        </div>


                        {/* <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                            <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Recent Bookings</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[600px] border border-gray-200">
                                    <thead className="bg-[#FF6B6B]/10 text-gray-700">
                                        <tr className="border-b border-gray-300">
                                            <th className="text-left p-2 md:p-3 text-sm md:text-base">User</th>
                                            <th className="text-left p-2 md:p-3 text-sm md:text-base">Route</th>
                                            <th className="text-left p-2 md:p-3 text-sm md:text-base">Seats</th>
                                            <th className="text-left p-2 md:p-3 text-sm md:text-base">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings?.length > 0 ? (
                                            bookings.map((booking, index) => (
                                                <tr key={index} className="border-t even:bg-gray-50">
                                                    <td className="p-2 md:p-3 text-sm md:text-base">{booking.user}</td>
                                                    <td className="p-2 md:p-3 text-sm md:text-base">{booking.route}</td>
                                                    <td className="p-2 md:p-3 text-sm md:text-base">{booking.seats}</td>
                                                    <td className="p-2 md:p-3 text-sm md:text-base">{booking.date}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="p-4 text-center text-gray-500">
                                                    No bookings available.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div> */}
                    </div>
                )}

                {activeTab === "routes" && (
                    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-lg md:text-xl font-semibold">Manage Routes</h1>
                            <Link href="/AddRouteForm">
                                <button className="bg-[#FF6B6B] text-white px-4 py-2 rounded-md hover:bg-[#E04E4E] transition">
                                    Add Route
                                </button>
                            </Link>
                        </div>

                        {error && <p className="text-red-500 mb-3">{error}</p>}

                        <div className="overflow-x-auto">
                            {/* <table className="w-full min-w-[800px] border border-gray-200">
                                <thead className="bg-[#FF6B6B]/10 text-gray-700">
                                    <tr className="border-b border-gray-300">
                                        <th className="text-left p-2 md:p-3 text-sm md:text-base">Destination</th>
                                        <th className="text-left p-2 md:p-3 text-sm md:text-base">Total Seats</th>
                                        <th className="text-left p-2 md:p-3 text-sm md:text-base">Start Time</th>
                                        <th className="text-left p-2 md:p-3 text-sm md:text-base">End Time</th>
                                        <th className="text-left p-2 md:p-3 text-sm md:text-base">Departure Time</th>
                                        <th className="text-left p-2 md:p-3 text-sm md:text-base">Price Per Seat</th>
                                        <th className="text-left p-2 md:p-3 text-sm md:text-base">Vehicle Type</th>
                                        <th className="text-left p-2 md:p-3 text-sm md:text-base">Facilities</th>
                                        <th className="text-left p-2 md:p-3 text-sm md:text-base">Seats</th>
                                        <th className="text-left p-2 md:p-3 text-sm md:text-base">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {routes.length > 0 ? (
                                        routes.map((route, index) => (
                                            <tr key={index} className="border-t even:bg-gray-50">
                                                <td className="p-2 md:p-3 text-sm md:text-base">{route.destination}</td>
                                                <td className="p-2 md:p-3 text-sm md:text-base">{route.totalSeats}</td>
                                                <td className="p-2 md:p-3 text-sm md:text-base">{route.startTime}</td>
                                                <td className="p-2 md:p-3 text-sm md:text-base">{route.endTime}</td>
                                                <td className="p-2 md:p-3 text-sm md:text-base">{route.departureTime}</td>
                                                <td className="p-2 md:p-3 text-sm md:text-base">Rs {route.pricePerSeat}</td>
                                                <td className="p-2 md:p-3 text-sm md:text-base">{route.vehicleType}</td>
                                                <td className="p-2 md:p-3 text-sm md:text-base">{route.facilities}</td>
                                                <td className="p-2 md:p-3 text-sm md:text-base">{route.seats}</td>
                                                <td className="p-2 md:p-3 text-sm md:text-base">
                                                    <button className="text-blue-500 hover:underline mr-2" onClick={() => handleEdit(index)}>Edit</button>
                                                    <button className="text-red-500 hover:underline" onClick={() => handleDelete(index)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="10" className="p-4 text-center text-gray-500">
                                                No routes available.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table> */}
                            <table className="w-full min-w-[800px] border border-gray-200">
                                <thead className="bg-[#FF6B6B]/10 text-gray-700">
                                    <tr className="border-b border-gray-300">
                                        <th className="text-left p-2 md:p-3">Origin</th>
                                        <th className="text-left p-2 md:p-3">Destination</th>
                                        <th className="text-left p-2 md:p-3">Total Seats</th>
                                        <th className="text-left p-2 md:p-3">Available Seats</th>
                                        <th className="text-left p-2 md:p-3">Departure Time</th>
                                        <th className="text-left p-2 md:p-3 text-sm md:text-base">Departure Date</th>
                                        <th className="text-left p-2 md:p-3">Price</th>
                                        <th className="text-left p-2 md:p-3">Vehicle Type</th>
                                        <th className="text-left p-2 md:p-3">Facilities</th>
                                        <th className="text-left p-2 md:p-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {routes?.data?.map((route, index) => (
                                        <tr key={route._id} className="border-t even:bg-gray-50">
                                            <td className="p-2 md:p-3">{route.origin}</td>
                                            <td className="p-2 md:p-3">{route.destination}</td>
                                            <td className="p-2 md:p-3">{route.totalSeats}</td>
                                            <td className="p-2 md:p-3">{route.availableSeats}</td>
                                            <td className="p-2 md:p-3 text-sm md:text-base">{route.departureDate || 'N/A'}</td>
                                            <td className="p-2 md:p-3">{route.departureTime}</td>
                                            <td className="p-2 md:p-3">Rs {route.pricePerSeat}</td>
                                            <td className="p-2 md:p-3">{route.vehicleType}</td>
                                            <td className="p-2 md:p-3">
                                                {route.facilities.join(', ')}
                                            </td>
                                            <td className="p-2 md:p-3">
                                                <button className="text-blue-500 hover:underline mr-2">
                                                    Edit
                                                </button>
                                                <button className="text-red-500 hover:underline">
                                                    Delete
                                                </button>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default AdminDashboard;
