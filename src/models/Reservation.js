import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    totalPrice: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Reservation = mongoose.model('Reservation', reservationSchema, 'Bills_Reservations');
export default Reservation;