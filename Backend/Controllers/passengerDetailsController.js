// const asyncHandler = require("express-async-handler");
// const PassengerDetails = require("../Models/passengerDetailsModel");

// const addPassengerDetails = asyncHandler(async (req, res) => {
//     const { name, phone, email, userId, bookingId } = req.body;

//     if (!name || !phone || !email || !userId || !bookingId) {
//         return res.status(400).json({ success: false, message: "All fields are required" });
//     }

//     const passenger = await PassengerDetails.create({ name, phone, email, userId, bookingId });

//     res.status(201).json({ success: true, data: passenger });
// });

// const getPassengerDetails = asyncHandler(async (req, res) => {
//     const passengers = await PassengerDetails.find().populate("userId", "email");

//     res.json({ success: true, count: passengers.length, data: passengers });
// });

// module.exports = { addPassengerDetails, getPassengerDetails };
