const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
    origin: {
        type: String,
        required: [true, 'Origin is required'],
        trim: true
    },
    destination: {
        type: String,
        required: [true, 'Destination is required'],
        trim: true
    },
    startTime: {
        type: String,
        required: [true, 'Start time is required']
    },
    endTime: {
        type: String,
        required: [true, 'End time is required']
    },
    departureTime: {
        type: String,
        required: [true, 'Departure time is required']
    },
    pricePerSeat: {
        type: Number,
        required: [true, 'Price per seat is required'],
        min: [1, 'Price must be at least 1']
    },
    vehicleType: {
        type: String,
        required: [true, 'Vehicle type is required'],
        enum: {
            values: ['Classic', 'Coach', 'AC'],
            message: 'Invalid vehicle type'
        }
    },
    facilities: {
        type: [String],
        default: []
    },
    totalSeats: {
        type: Number,
        required: [true, 'Total seats is required'],
        min: [1, 'Total seats must be at least 1']
    },
    availableSeats: {
        type: Number,
        default: function () { return this.totalSeats }
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }
}, { timestamps: true });

module.exports = mongoose.model('Route', routeSchema);