import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true
    },
    reservationId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    amount: {
        type: Number, 
        required: true
    },
    isPaid: {
        type: Boolean, 
        default: false
    },
    paymentDate: {
        type: Date, 
    },
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'debit_card', 'cash', 'bank_transfer'],
        required: true
    }
}, { timestamps: true });

const Bill = mongoose.model('Bill', billSchema, 'Bills_Reservations');
export default Bill;