
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectdb = require('./database/connect');
const cors = require('cors');
const asyncHandler = require('express-async-handler');

const app = express();
const router = express.Router();
const port = 5001;

connectdb();

const routeSchema = new mongoose.Schema({
    origin: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    departureTime: { type: String, required: true },
    departureDate: { type: String, required: true },
    pricePerSeat: { type: Number, required: true, min: 1 },
    vehicleType: { type: String, required: true, enum: ['Classic', 'Coach', 'AC'] },
    facilities: { type: [String], default: [] },
    totalSeats: { type: Number, required: true, min: 1 },
    availableSeats: { type: Number, default: function () { return this.totalSeats } },
    bookedSeats: { type: [String], default: [] },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }
}, { timestamps: true });

const Route = mongoose.model('Route', routeSchema);

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    routeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true },
    seats: { type: [String], required: true },
    departureDate: { type: String, required: true },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

const createRoute = asyncHandler(async (req, res) => {
    const { origin, destination, startTime, endTime, departureTime, departureDate, pricePerSeat, vehicleType, facilities, totalSeats } = req.body;

    if (!departureDate) {
        return res.status(400).json({ success: false, message: "Departure date is required." });
    }

    const route = await Route.create({
        origin,
        destination,
        startTime,
        endTime,
        departureTime,
        departureDate,
        pricePerSeat,
        vehicleType,
        facilities: facilities.split(',').map(f => f.trim()),
        totalSeats,
        availableSeats: totalSeats,
    });

    res.status(201).json({ success: true, data: route });
});

const bookSeats = asyncHandler(async (req, res) => {
    const { routeId, seats, userId, departureDate } = req.body;

    if (!routeId || !seats || !Array.isArray(seats) || seats.length === 0 || !userId) {
        return res.status(400).json({ success: false, message: "Invalid request. Route ID, user ID, and seats are required." });
    }

    const route = await Route.findById(routeId);
    if (!route) {
        return res.status(404).json({ success: false, message: "Route not found" });
    }

    const alreadyBooked = seats.some(seat => route.bookedSeats.includes(seat));
    if (alreadyBooked) {
        return res.status(400).json({ success: false, message: "One or more seats are already booked" });
    }

    // Update route with booked seats
    route.bookedSeats.push(...seats);
    route.availableSeats -= seats.length;
    await route.save();

    // Store booking record
    const booking = await Booking.create({
        userId,
        routeId,
        seats,
        departureDate,
    });

    res.json({ success: true, message: "Seats booked successfully", bookingId: booking._id });
});


router.post('/book-seats', bookSeats);

const getRoutes = asyncHandler(async (req, res) => {
    const routes = await Route.find().populate('createdBy', 'email');
    res.json({ success: true, count: routes.length, data: routes });
});

const getRouteById = asyncHandler(async (req, res) => {
    const route = await Route.findById(req.params.id);
    if (!route) {
        return res.status(404).json({ success: false, message: "Route not found" });
    }
    res.json({ success: true, data: route });
});
const getUserBookings = asyncHandler(async (req, res) => {
    const userId = req.params.userId || req.query.userId;

    if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const bookings = await Booking.find({ userId }).populate('routeId');
    res.json({ success: true, data: bookings });
});

router.get('/user-bookings/:userId', getUserBookings);
router.get('/user-bookings', getUserBookings);

router.get('/:id', getRouteById);

router.route('/')
    .post(createRoute)
    .get(getRoutes);


app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use('/api/routes', router);

app.listen(port, () => {
    console.log(` Server is running on port ${port}`);
});
// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const connectdb = require('./database/connect');
// const cors = require('cors');
// const asyncHandler = require('express-async-handler');

// const app = express();
// const router = express.Router();
// const port = 5001;

// connectdb();

// const routeSchema = new mongoose.Schema({
//     origin: { type: String, required: true, trim: true },
//     destination: { type: String, required: true, trim: true },
//     startTime: { type: String, required: true },
//     endTime: { type: String, required: true },
//     departureTime: { type: String, required: true },
//     departureDate: { type: String, required: true },
//     pricePerSeat: { type: Number, required: true, min: 1 },
//     vehicleType: { type: String, required: true, enum: ['Classic', 'Coach', 'AC'] },
//     facilities: { type: [String], default: [] },
//     totalSeats: { type: Number, required: true, min: 1 },
//     availableSeats: { type: Number, default: function () { return this.totalSeats } },
//     bookedSeats: { type: [String], default: [] },
//     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }
// }, { timestamps: true });

// const Route = mongoose.model('Route', routeSchema);

// const bookingSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     routeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true },
//     seats: { type: [String], required: true },
//     departureDate: { type: String, required: true },
// }, { timestamps: true });

// const Booking = mongoose.model('Booking', bookingSchema);

// const createRoute = asyncHandler(async (req, res) => {
//     const { origin, destination, startTime, endTime, departureTime, departureDate, pricePerSeat, vehicleType, facilities, totalSeats } = req.body;

//     if (!departureDate) {
//         return res.status(400).json({ success: false, message: "Departure date is required." });
//     }

//     const route = await Route.create({
//         origin,
//         destination,
//         startTime,
//         endTime,
//         departureTime,
//         departureDate,
//         pricePerSeat,
//         vehicleType,
//         facilities: facilities.split(',').map(f => f.trim()),
//         totalSeats,
//         availableSeats: totalSeats,
//     });

//     res.status(201).json({ success: true, data: route });
// });

// const bookSeats = asyncHandler(async (req, res) => {
//     const { routeId, seats, userId, departureDate } = req.body;

//     console.log("Booking request received:", req.body); // Debugging log

//     if (!routeId || !seats || !Array.isArray(seats) || seats.length === 0 || !userId) {
//         return res.status(400).json({ success: false, message: "Invalid request. Route ID, user ID, and seats are required." });
//     }

//     const route = await Route.findById(routeId);
//     if (!route) {
//         return res.status(404).json({ success: false, message: "Route not found" });
//     }

//     const seatsToBook = seats.map(String);
//     const alreadyBooked = seatsToBook.some(seat => route.bookedSeats.includes(seat));

//     if (alreadyBooked) {
//         return res.status(400).json({ success: false, message: "One or more seats are already booked" });
//     }

//     // Update route with booked seats
//     route.bookedSeats.push(...seatsToBook);
//     route.availableSeats -= seats.length;
//     await route.save();

//     // Store booking record in database
//     const booking = await Booking.create({
//         userId,
//         routeId,
//         seats: seatsToBook,
//         departureDate,
//     });

//     console.log("Booking successfully stored:", booking); // Debugging log

//     res.json({ success: true, message: "Seats booked successfully", data: booking });
// });

// router.post('/book-seats', bookSeats);

// const getRoutes = asyncHandler(async (req, res) => {
//     const routes = await Route.find().populate('createdBy', 'email');
//     res.json({ success: true, count: routes.length, data: routes });
// });

// const getRouteById = asyncHandler(async (req, res) => {
//     const route = await Route.findById(req.params.id);
//     if (!route) {
//         return res.status(404).json({ success: false, message: "Route not found" });
//     }
//     res.json({ success: true, data: route });
// });
// const getUserBookings = asyncHandler(async (req, res) => {
//     const userId = req.params.userId || req.query.userId;

//     if (!userId) {
//         return res.status(400).json({ success: false, message: "User ID is required" });
//     }

//     const bookings = await Booking.find({ userId }).populate('routeId');
//     res.json({ success: true, data: bookings });
// });

// router.get('/user-bookings/:userId', getUserBookings);
// router.get('/user-bookings', getUserBookings);

// router.get('/:id', getRouteById);

// router.route('/')
//     .post(createRoute)
//     .get(getRoutes);


// app.use(express.json());
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true
// }));

// app.use('/api/routes', router);

// app.listen(port, () => {
//     console.log(` Server is running on port ${port}`);
// });