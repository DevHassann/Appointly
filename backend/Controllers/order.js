const express = require("express");
const router = express.Router();
const ErrorHandler = require("../Middlewares/ErrorHandler");
const catchAsyncErrors = require("../Middlewares/CatchAsyncErrors");
const Order = require('../Models/order');
const { createMeetings } = require('./meeting');

// Create Order
router.post("/create-order", catchAsyncErrors(async (req, res, next) => {
    const { userId, sellerId, selectedSlots, totalPrice, paymentMethod } = req.body;

    const newOrder = new Order({
        userId,
        sellerId,
        selectedSlots,
        totalPrice,
        paymentMethod,
    });

    await newOrder.save();

    const meetings = await createMeetings(userId, sellerId, selectedSlots);

    res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: {
            order: newOrder,
            meetings,
        },
    });
}));

module.exports = router; 