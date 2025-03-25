require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectdb = require('./database/connect');
const cors = require('cors');
const asyncHandler = require('express-async-handler');

const app = express();
const port = 5003;

connectdb();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

// Schema & Model for Booking
const bookingSchema = new mongoose.Schema({
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true }, // Link to Server 1 Booking
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    passengerInfo: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
    },
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model("Booking", bookingSchema);

// Book Seats Route
app.post('/api/routes/book-seats', asyncHandler(async (req, res) => {
    console.log("Incoming request body:", req.body); // 👈 Log request data

    const { bookingId, userId, passengerInfo, totalPrice } = req.body;

    if (!bookingId || !userId || !passengerInfo || !passengerInfo.name || !passengerInfo.phone || !passengerInfo.email || !totalPrice) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const bookingInfo = await Booking.create({
        bookingId,
        userId,
        passengerInfo,
        totalPrice
    });

    res.status(201).json({ success: true, message: "Passenger details saved!", data: bookingInfo });
}));

app.get('/api/routes/bookings', asyncHandler(async (req, res) => {
    const bookings = await Booking.find().populate("userId", "email");

    res.json({ success: true, count: bookings.length, data: bookings });
}));

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const connectdb = require('./database/connect');
// const cors = require('cors');
// const asyncHandler = require('express-async-handler');

// const app = express();
// const port = 5003;

// connectdb();

// app.use(express.json());
// app.use(cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
// }));

// // Schema & Model
// const passengerDetailsSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     phone: { type: String, required: true },
//     email: { type: String, required: true },
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
// }, { timestamps: true });

// const PassengerDetails = mongoose.model("PassengerDetails", passengerDetailsSchema);

// // Routes
// app.post('/api/passengers', asyncHandler(async (req, res) => {
//     const { name, phone, email, userId, bookingId } = req.body;

//     if (!name || !phone || !email || !userId || !bookingId) {
//         return res.status(400).json({ success: false, message: "All fields are required" });
//     }

//     const passenger = await PassengerDetails.create({ name, phone, email, userId, bookingId });

//     res.status(201).json({ success: true, data: passenger });
// }));

// app.get('/api/passengers', asyncHandler(async (req, res) => {
//     const passengers = await PassengerDetails.find().populate("userId", "email");

//     res.json({ success: true, count: passengers.length, data: passengers });
// }));

// // Start server
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
