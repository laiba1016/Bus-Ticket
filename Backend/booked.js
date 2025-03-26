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

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    passengerInfo: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
    },
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model("Booking", bookingSchema);

app.post('/api/routes/book-seats', asyncHandler(async (req, res) => {
    console.log("Incoming request body:", req.body);

    const { userId, passengerInfo, totalPrice } = req.body;

    if (!userId || !passengerInfo?.name || !passengerInfo?.phone || !passengerInfo?.email || !totalPrice) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const bookingInfo = await Booking.create({
        userId: new mongoose.Types.ObjectId(userId),
        passengerInfo,
        totalPrice
    });

    console.log("Saved booking:", bookingInfo);
    res.status(201).json({ success: true, message: "Passenger details saved!", data: bookingInfo });
}));

app.get('/api/routes/bookings', asyncHandler(async (req, res) => {
    const bookings = await Booking.find();
    res.json({ success: true, count: bookings.length, data: bookings });
}));

app.delete('/api/routes/bookings/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid booking ID" });
    }

    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
        return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.json({ success: true, message: "Booking deleted successfully" });
}));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});