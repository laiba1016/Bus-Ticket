"use client"
import { useEffect, useState } from 'react';
import { FaChartBar, FaTicketAlt, FaRoute, FaBars } from "react-icons/fa";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import axios from 'axios';
import UserData from '../UserData/page';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [routes, setRoutes] = useState({ data: [] });
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
    const [showRouteForm, setShowRouteForm] = useState(false);

    const handleAddRoute = async (e) => {
        e.preventDefault();
        try {
            if (editingIndex !== null) {
                const updatedRoute = {
                    ...routes.data[editingIndex],
                    ...newRoute,
                    facilities: newRoute.facilities.split(',').map(f => f.trim()),
                    bookedSeats: newRoute.seats.split(',').map(s => s.trim())
                };

                const response = await axios.put(
                    `http://localhost:5001/api/routes/${updatedRoute._id}`,
                    updatedRoute
                );

                const updatedRoutes = [...routes.data];
                updatedRoutes[editingIndex] = response.data.data;
                setRoutes({ data: updatedRoutes });
                setEditingIndex(null);
            } else {
                const routeData = {
                    ...newRoute,
                    facilities: newRoute.facilities.split(',').map(f => f.trim()),
                    bookedSeats: newRoute.seats.split(',').map(s => s.trim()),
                    availableSeats: newRoute.totalSeats - (newRoute.seats ? newRoute.seats.split(',').length : 0)
                };

                const response = await axios.post(
                    "http://localhost:5001/api/routes",
                    routeData
                );
                setRoutes(prev => ({ data: [...prev.data, response.data.data] }));
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
            setShowRouteForm(false);
        } catch (error) {
            setError("Failed to add/update route");
            console.error("Error adding/updating route:", error);
        }
    };

    const handleEditRoute = (index) => {
        const routeToEdit = routes.data[index];

        router.push({
            pathname: '/EditFormRoute',
            query: {
                id: routeToEdit._id,
                origin: routeToEdit.origin,
                totalSeats: routeToEdit.totalSeats,
                destination: routeToEdit.destination,
                startTime: routeToEdit.startTime,
                endTime: routeToEdit.endTime,
                departureTime: routeToEdit.departureTime,
                departureDate: routeToEdit.departureDate,
                pricePerSeat: routeToEdit.pricePerSeat,
                vehicleType: routeToEdit.vehicleType,
                facilities: routeToEdit.facilities.join(', '),
                seats: routeToEdit.bookedSeats.join(', '),
            }


        });
    };

    const handleDeleteRoute = async (id) => {
        if (window.confirm("Are you sure you want to delete this route?")) {
            try {
                await axios.delete(`http://localhost:5001/api/routes/${id}`);
                setRoutes(prev => ({
                    ...prev,
                    data: prev.data.filter(route => route._id !== id)
                }));
            } catch (error) {
                setError("Failed to delete route");
                console.error("Error deleting route:", error);
            }
        }
    };

    const stats = [
        { title: 'Total Bookings', value: routes.data.reduce((sum, route) => sum + route.bookedSeats.length, 0) },
        { title: 'Available Seats', value: routes.data.reduce((sum, route) => sum + route.availableSeats, 0) },
        {
            title: 'Today\'s Revenue', value: routes.data.reduce((sum, route) => {
                const isToday = new Date(route.departureDate).toDateString() === new Date().toDateString();
                return isToday ? sum + (route.bookedSeats.length * route.pricePerSeat) : sum;
            }, 0)
        }
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
                    <UserData />
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
                                                <Link
                                                    href={{
                                                        pathname: '/EditFormRoute',
                                                        query: {
                                                            id: route._id,
                                                            origin: route.origin,
                                                            destination: route.destination,
                                                            totalSeats: route.totalSeats,
                                                            startTime: route.startTime,
                                                            endTime: route.endTime,
                                                            departureTime: route.departureTime,
                                                            departureDate: route.departureDate,
                                                            pricePerSeat: route.pricePerSeat,
                                                            vehicleType: route.vehicleType,
                                                            facilities: route.facilities.join(', '),
                                                            seats: route.bookedSeats.join(', ')
                                                        }
                                                    }}
                                                    className="text-blue-500 hover:underline mr-2"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    className="text-red-500 hover:underline"
                                                    onClick={() => handleDeleteRoute(route._id)}
                                                >
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