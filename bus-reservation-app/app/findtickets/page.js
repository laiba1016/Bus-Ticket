"use client";
import React, { useEffect, useState } from "react";
import { FaBus, FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import ticketImage from "../../public/images.jpeg";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const staticRoutes = [];

export default function FindTickets() {
    const searchParams = useSearchParams();
    const [buses, setBuses] = useState([]);
    const [filteredBuses, setFilteredBuses] = useState([]);
    const [loading, setLoading] = useState(true);

    const originParam = searchParams.get('origin');
    const destinationParam = searchParams.get('destination');
    const dateParam = searchParams.get('date');

    const [filters, setFilters] = useState({
        vehicleType: [],
        route: originParam && destinationParam ? `${originParam},${destinationParam}` : "",
        departureTime: "",
    });

    useEffect(() => {
        const fetchBuses = async () => {
            try {
                const params = new URLSearchParams({
                    origin: originParam || '',
                    destination: destinationParam || '',
                    date: dateParam || ''
                });

                const response = await fetch(`http://localhost:5001/api/routes?${params}`);
                const data = await response.json();

                const apiBuses = data.success ? data.data.map(b => ({
                    ...b,
                    departureDate: b.departureDate || "N/A",
                    id: b._id,
                })) : [];

                const staticBuses = staticRoutes.map(r => ({
                    ...r,
                    departureDate: "N/A",
                    vehicleType: "Classic",
                    pricePerSeat: 1500,
                    availableSeats: 40,
                    totalSeats: 40,
                    facilities: ["AC", "WiFi"]
                }));

                setBuses([...apiBuses, ...staticBuses]);
            } catch (error) {
                console.error("Error fetching buses:", error);
                const fallbackRoutes = staticRoutes.map(r => ({
                    ...r,
                    departureDate: "N/A",
                    vehicleType: "Classic",
                    pricePerSeat: 1500,
                    availableSeats: 40,
                    totalSeats: 40,
                    facilities: ["AC", "WiFi"]
                }));
                setBuses(fallbackRoutes);
            } finally {
                setLoading(false);
            }
        };

        fetchBuses();
    }, [originParam, destinationParam, dateParam]);

    useEffect(() => {
        setFilteredBuses(
            buses.filter((bus) => {
                const vehicleMatch =
                    filters.vehicleType.length === 0 ||
                    filters.vehicleType.includes(bus.vehicleType);

                const routeMatch =
                    !filters.route ||
                    `${bus.origin},${bus.destination}` === filters.route;

                const timeMatch =
                    !filters.departureTime ||
                    bus.departureTime === filters.departureTime;

                const dateMatch =
                    !dateParam ||
                    bus.departureDate === dateParam;

                return vehicleMatch && routeMatch && timeMatch && dateMatch;
            })
        );
    }, [filters, buses, dateParam]);

    const handleFilterChange = (filterType, value) => {
        setFilters((prev) => ({
            ...prev,
            [filterType]: value,
        }));
    };

    const vehicleTypes = [...new Set(buses.map((b) => b.vehicleType))];
    const routes = [...new Set(buses.map((b) => `${b.origin},${b.destination}`))];
    const departureTimes = [...new Set(buses.map((b) => b.departureTime))];

    return (
        <div>
            <div className="relative h-64 w-full">
                <Image
                    src={ticketImage}
                    alt="Reserve Your Seat Ticket"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold">
                    Reserve Your Seat Ticket
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white">
                    <h1 className="text-3xl font-bold">Reserve Your Seat Now</h1>
                    {originParam && destinationParam && (
                        <p className="mt-4 text-lg">
                            {originParam} → {destinationParam}
                            {dateParam && ` • ${new Date(dateParam).toLocaleDateString()}`}
                        </p>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-8">

                <aside className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-lg h-fit sticky top-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Filters</h2>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Vehicle Type</h3>
                        <div className="space-y-2">
                            {vehicleTypes.map((type) => (
                                <label key={type} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-[#FF6B6B]"
                                        checked={filters.vehicleType.includes(type)}
                                        onChange={(e) => {
                                            const newTypes = e.target.checked
                                                ? [...filters.vehicleType, type]
                                                : filters.vehicleType.filter((t) => t !== type);
                                            handleFilterChange("vehicleType", newTypes);
                                        }}
                                    />
                                    <span>{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Routes</h3>
                        <select
                            className="w-full p-2 border rounded-lg"
                            value={filters.route}
                            onChange={(e) => handleFilterChange("route", e.target.value)}
                        >
                            <option value="">All Routes</option>
                            {routes.map((route) => (
                                <option key={route} value={route}>
                                    {route.split(",").join(" to ")}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Departure Time</h3>
                        <select
                            className="w-full p-2 border rounded-lg"
                            value={filters.departureTime}
                            onChange={(e) => handleFilterChange("departureTime", e.target.value)}
                        >
                            <option value="">All Times</option>
                            {departureTimes.map((time) => (
                                <option key={time} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
                    </div>
                </aside>

                <main className="w-full md:w-3/4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Buses</h2>

                    {loading ? (
                        <p className="text-center text-gray-600">Loading buses...</p>
                    ) : filteredBuses.length === 0 ? (
                        <p className="text-center text-gray-600">No buses available.</p>
                    ) : (
                        <div className="grid grid-cols-1 gap-6">
                            {filteredBuses.map((bus) => (
                                <div key={bus._id} className="bg-white p-6 rounded-lg shadow-lg">

                                    <div className="flex justify-between items-center">
                                        <div className="w-1/3">
                                            <h2 className="text-lg font-bold text-black">
                                                {bus.vehicleType} - {bus.origin} to {bus.destination}
                                            </h2>
                                            <p className="text-gray-500 text-sm">
                                                Seat Layout: <span className="px-2 py-1 rounded">2X2</span>
                                            </p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <FaBus className="text-yellow-500" size={20} />
                                                <span className="text-yellow-600 font-semibold">{bus.vehicleType}</span>
                                            </div>
                                        </div>

                                        <div className="flex-1 flex flex-col items-center justify-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <p className="text-black font-semibold">{bus.startTime}</p>
                                                <FaArrowRight className="text-red-500" size={16} />
                                                <p className="text-black font-semibold">{bus.endTime}</p>
                                            </div>
                                            <p className="text-gray-500 text-sm mt-1">
                                                Departure: {bus.departureTime}
                                            </p>
                                            <p className="text-gray-500 text-sm mt-1">
                                                Date: {bus.departureDate}
                                            </p>
                                            <p className="text-gray-500 text-sm mt-1">
                                                {bus.origin} - {bus.destination}
                                            </p>
                                        </div>

                                        <div className="w-1/3 text-right">
                                            <p className="text-red-500 font-bold text-lg">Rs. {bus.pricePerSeat}</p>
                                            <p className="text-gray-500 text-sm">
                                                Available Seats: {bus.availableSeats}/{bus.totalSeats}
                                            </p>
                                            <Link href={{
                                                pathname: '/Details',
                                                query: {
                                                    routeId: bus._id,  // Add this line
                                                    price: bus.pricePerSeat,
                                                    origin: bus.origin,
                                                    destination: bus.destination,
                                                    date: bus.departureDate,
                                                    departureTime: bus.departureTime,
                                                    startTime: bus.startTime,
                                                    endTime: bus.endTime,
                                                    vehicleType: bus.vehicleType
                                                }
                                            }}>
                                                <button
                                                    className="mt-2 px-4 py-2 bg-[#FF6B6B] text-white font-semibold rounded-lg hover:bg-[#E55A5A]"
                                                    onClick={() => localStorage.setItem('selectedRouteId', bus._id)}
                                                >
                                                    Select Seat
                                                </button>
                                            </Link>
                                            {/* <Link href={`/Details`}>
                                                <button className="mt-2 px-4 py-2 bg-[#FF6B6B] text-white font-semibold rounded-lg hover:bg-[#E55A5A]">
                                                    Select Seat
                                                </button>
                                            </Link> */}
                                        </div>
                                    </div>

                                    <hr className="my-4 border-gray-300" />
                                    <div className="flex gap-2">
                                        {bus.facilities.map((facility, i) => (
                                            <span key={i} className="bg-gray-200 text-gray-600 text-sm px-2 py-1 rounded">
                                                {facility}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

// "use client";
// import React, { useEffect, useState } from "react";
// import { FaBus, FaArrowRight } from "react-icons/fa";
// import Image from "next/image";
// import ticketImage from "../../public/images.jpeg";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";

// const staticRoutes = [];

// export default function FindTickets() {
//     const searchParams = useSearchParams();
//     const [buses, setBuses] = useState([]);
//     const [filteredBuses, setFilteredBuses] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const originParam = searchParams.get('origin');
//     const destinationParam = searchParams.get('destination');
//     const dateParam = searchParams.get('date');

//     const [filters, setFilters] = useState({
//         vehicleType: [],
//         route: originParam && destinationParam ? `${originParam},${destinationParam}` : "",
//         departureTime: "",
//     });

//     useEffect(() => {
//         const fetchBuses = async () => {
//             try {
//                 const params = new URLSearchParams({
//                     origin: originParam || '',
//                     destination: destinationParam || '',
//                     date: dateParam || ''
//                 });

//                 const response = await fetch(`http://localhost:5001/api/routes?${params}`);
//                 const data = await response.json();

//                 const apiBuses = data.success ? data.data.map(b => ({
//                     ...b,
//                     departureDate: b.departureDate || "N/A",
//                     id: b._id,
//                 })) : [];

//                 const staticBuses = staticRoutes.map(r => ({
//                     ...r,
//                     departureDate: "N/A",
//                     vehicleType: "Classic",
//                     pricePerSeat: 1500,
//                     availableSeats: 40,
//                     totalSeats: 40,
//                     facilities: ["AC", "WiFi"]
//                 }));

//                 setBuses([...apiBuses, ...staticBuses]);
//             } catch (error) {
//                 console.error("Error fetching buses:", error);
//                 const fallbackRoutes = staticRoutes.map(r => ({
//                     ...r,
//                     departureDate: "N/A",
//                     vehicleType: "Classic",
//                     pricePerSeat: 1500,
//                     availableSeats: 40,
//                     totalSeats: 40,
//                     facilities: ["AC", "WiFi"]
//                 }));
//                 setBuses(fallbackRoutes);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchBuses();
//     }, [originParam, destinationParam, dateParam]);

//     useEffect(() => {
//         setFilteredBuses(
//             buses.filter((bus) => {
//                 const vehicleMatch =
//                     filters.vehicleType.length === 0 ||
//                     filters.vehicleType.includes(bus.vehicleType);

//                 const routeMatch =
//                     !filters.route ||
//                     `${bus.origin},${bus.destination}` === filters.route;

//                 const timeMatch =
//                     !filters.departureTime ||
//                     bus.departureTime === filters.departureTime;

//                 const dateMatch =
//                     !dateParam ||
//                     bus.departureDate === dateParam;

//                 return vehicleMatch && routeMatch && timeMatch && dateMatch;
//             })
//         );
//     }, [filters, buses, dateParam]);

//     const handleFilterChange = (filterType, value) => {
//         setFilters((prev) => ({
//             ...prev,
//             [filterType]: value,
//         }));
//     };

//     const vehicleTypes = [...new Set(buses.map((b) => b.vehicleType))];
//     const routes = [...new Set(buses.map((b) => `${b.origin},${b.destination}`))];
//     const departureTimes = [...new Set(buses.map((b) => b.departureTime))];

//     return (
//         <div>
//             <div className="relative h-64 w-full">
//                 <Image
//                     src={ticketImage}
//                     alt="Reserve Your Seat Ticket"
//                     fill
//                     className="object-cover"
//                     priority
//                 />
//                 <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold">
//                     Reserve Your Seat Ticket
//                 </div>
//                 <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white">
//                     <h1 className="text-3xl font-bold">Reserve Your Seat Now</h1>
//                     {originParam && destinationParam && (
//                         <p className="mt-4 text-lg">
//                             {originParam} → {destinationParam}
//                             {dateParam && ` • ${new Date(dateParam).toLocaleDateString()}`}
//                         </p>
//                     )}
//                 </div>
//             </div>

//             <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-8">

//                 <aside className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-lg h-fit sticky top-6">
//                     <h2 className="text-xl font-bold text-gray-900 mb-4">Filters</h2>

//                     <div className="mb-6">
//                         <h3 className="text-lg font-semibold text-gray-800 mb-2">Vehicle Type</h3>
//                         <div className="space-y-2">
//                             {vehicleTypes.map((type) => (
//                                 <label key={type} className="flex items-center space-x-2">
//                                     <input
//                                         type="checkbox"
//                                         className="w-4 h-4 text-[#FF6B6B]"
//                                         checked={filters.vehicleType.includes(type)}
//                                         onChange={(e) => {
//                                             const newTypes = e.target.checked
//                                                 ? [...filters.vehicleType, type]
//                                                 : filters.vehicleType.filter((t) => t !== type);
//                                             handleFilterChange("vehicleType", newTypes);
//                                         }}
//                                     />
//                                     <span>{type}</span>
//                                 </label>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="mb-6">
//                         <h3 className="text-lg font-semibold text-gray-800 mb-2">Routes</h3>
//                         <select
//                             className="w-full p-2 border rounded-lg"
//                             value={filters.route}
//                             onChange={(e) => handleFilterChange("route", e.target.value)}
//                         >
//                             <option value="">All Routes</option>
//                             {routes.map((route) => (
//                                 <option key={route} value={route}>
//                                     {route.split(",").join(" to ")}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className="mb-6">
//                         <h3 className="text-lg font-semibold text-gray-800 mb-2">Departure Time</h3>
//                         <select
//                             className="w-full p-2 border rounded-lg"
//                             value={filters.departureTime}
//                             onChange={(e) => handleFilterChange("departureTime", e.target.value)}
//                         >
//                             <option value="">All Times</option>
//                             {departureTimes.map((time) => (
//                                 <option key={time} value={time}>
//                                     {time}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                 </aside>

//                 <main className="w-full md:w-3/4">
//                     <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Buses</h2>

//                     {loading ? (
//                         <p className="text-center text-gray-600">Loading buses...</p>
//                     ) : filteredBuses.length === 0 ? (
//                         <p className="text-center text-gray-600">No buses available.</p>
//                     ) : (
//                         <div className="grid grid-cols-1 gap-6">
//                             {filteredBuses.map((bus) => (
//                                 <div key={bus._id} className="bg-white p-6 rounded-lg shadow-lg">

//                                     <div className="flex justify-between items-center">
//                                         <div className="w-1/3">
//                                             <h2 className="text-lg font-bold text-black">
//                                                 {bus.vehicleType} - {bus.origin} to {bus.destination}
//                                             </h2>
//                                             <p className="text-gray-500 text-sm">
//                                                 Seat Layout: <span className="px-2 py-1 rounded">2X2</span>
//                                             </p>
//                                             <div className="flex items-center gap-2 mt-2">
//                                                 <FaBus className="text-yellow-500" size={20} />
//                                                 <span className="text-yellow-600 font-semibold">{bus.vehicleType}</span>
//                                             </div>
//                                         </div>

//                                         <div className="flex-1 flex flex-col items-center justify-center">
//                                             <div className="flex items-center justify-center gap-2">
//                                                 <p className="text-black font-semibold">{bus.startTime}</p>
//                                                 <FaArrowRight className="text-red-500" size={16} />
//                                                 <p className="text-black font-semibold">{bus.endTime}</p>
//                                             </div>
//                                             <p className="text-gray-500 text-sm mt-1">
//                                                 Departure: {bus.departureTime}
//                                             </p>
//                                             <p className="text-gray-500 text-sm mt-1">
//                                                 Date: {bus.departureDate}
//                                             </p>
//                                             <p className="text-gray-500 text-sm mt-1">
//                                                 {bus.origin} - {bus.destination}
//                                             </p>
//                                         </div>

//                                         <div className="w-1/3 text-right">
//                                             <p className="text-red-500 font-bold text-lg">Rs. {bus.pricePerSeat}</p>
//                                             <p className="text-gray-500 text-sm">
//                                                 Available Seats: {bus.availableSeats}/{bus.totalSeats}
//                                             </p>
//                                             <Link href={{
//                                                 pathname: '/Details',
//                                                 query: {
//                                                     price: bus.pricePerSeat,
//                                                     origin: bus.origin,
//                                                     destination: bus.destination,
//                                                     date: bus.departureDate,
//                                                     departureTime: bus.departureTime,
//                                                     startTime: bus.startTime,
//                                                     endTime: bus.endTime,
//                                                     vehicleType: bus.vehicleType
//                                                 }
//                                             }}>
//                                                 <button className="mt-2 px-4 py-2 bg-[#FF6B6B] text-white font-semibold rounded-lg hover:bg-[#E55A5A]">
//                                                     Select Seat
//                                                 </button>
//                                             </Link>
//                                             {/* <Link href={`/Details`}>
//                                                 <button className="mt-2 px-4 py-2 bg-[#FF6B6B] text-white font-semibold rounded-lg hover:bg-[#E55A5A]">
//                                                     Select Seat
//                                                 </button>
//                                             </Link> */}
//                                         </div>
//                                     </div>

//                                     <hr className="my-4 border-gray-300" />
//                                     <div className="flex gap-2">
//                                         {bus.facilities.map((facility, i) => (
//                                             <span key={i} className="bg-gray-200 text-gray-600 text-sm px-2 py-1 rounded">
//                                                 {facility}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </main>
//             </div>
//         </div>
//     );
// }