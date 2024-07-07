const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    // User Information
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    // Seller Information
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true,
    },

    // Selected Slots
    selectedSlots: [
        {
            day: {
                type: String,
                required: true,
                enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            },
            slot: {
                type: [String],
                required: true,
            },
        },
    ],

    // Pricing
    totalPrice: {
        type: Number,
        required: true,
    },

    // Payment Information
    paymentMethod: {
        type: String,
        enum: ['PayPal', 'Credit Card'],
        required: true,
    },

    // Paid At
    paidAt: {
        type: Date,
        default: Date.now(),
    },

    // Timestamp
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Order", orderSchema);
