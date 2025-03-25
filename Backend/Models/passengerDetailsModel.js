// const mongoose = require('mongoose');

// const passengerDetailsSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     phone: { type: String, required: true },
//     email: { type: String, required: true },
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
// }, { timestamps: true });

// const PassengerDetails = mongoose.model("PassengerDetails", passengerDetailsSchema);

module.exports = PassengerDetails;
