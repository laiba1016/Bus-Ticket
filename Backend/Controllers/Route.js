const Route = require('../Models/Route');
const asyncHandler = require('express-async-handler');

const createRoute = asyncHandler(async (req, res) => {
    const {
        origin,
        destination,
        startTime,
        endTime,
        departureTime,
        departureDate,
        pricePerSeat,
        vehicleType,
        facilities,
        totalSeats
    } = req.body;

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

    res.status(201).json({
        success: true,
        data: route
    });
});

const getRoutes = asyncHandler(async (req, res) => {
    const routes = await Route.find().populate('createdBy', 'email');
    res.json({ success: true, count: routes.length, data: routes });
});

module.exports = {
    createRoute,
    getRoutes
};