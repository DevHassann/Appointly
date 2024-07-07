const express = require("express");
const router = express.Router();
const Meeting = require('../Models/meeting');
const { v4: uuidv4 } = require('uuid');
const ErrorHandler = require("../Middlewares/ErrorHandler");
const catchAsyncErrors = require("../Middlewares/CatchAsyncErrors");

// Function For Start Time and End Time
const convertToTime = (timeSlot) => {
    const [startTime, endTime] = timeSlot.split(' - ');

    return {
        startTime,
        endTime,
    };
};

// Creating Meeting
const createMeetings = catchAsyncErrors(async (userId, sellerId, selectedSlots) => {
    const meetings = [];

    for (const slot of selectedSlots) {
        const { day, slot: timeSlots } = slot;

        if (!Array.isArray(timeSlots)) {
            throw new ErrorHandler(`Invalid timeSlots type for day ${day}. Expected array, got ${typeof timeSlots}.`, 400);
        }

        for (const timeSlot of timeSlots) {
            if (typeof timeSlot !== 'string') {
                throw new ErrorHandler(`Invalid timeSlot type for day ${day}. Expected string, got ${typeof timeSlot}.`, 400);
            }

            try {
                const { startTime, endTime } = convertToTime(timeSlot);

                const meeting = new Meeting({
                    userId,
                    sellerId,
                    meetingDay: day,
                    meetingTime: timeSlot,
                    meetingStartTime: startTime,
                    meetingEndTime: endTime,
                    zoomMeetingLink: `${process.env.FRONTEND_URL}/zoomus/meeting/${uuidv4()}`,
                    status: 'scheduled',
                    createdAt: new Date(),
                });

                meetings.push(meeting);
            } catch (error) {
                throw new ErrorHandler(error.message, 400);
            }
        }
    }

    await Meeting.insertMany(meetings);

    return meetings;
});

// Get All Meetings
router.get("/get-all-meetings", catchAsyncErrors(async (req, res, next) => {
    try {
        // Fetch all meetings from the database
        const meetings = await Meeting.find();

        // Send the meetings as a response
        res.status(200).json({
            success: true,
            message: 'All meetings retrieved successfully',
            data: {
                meetings,
            },
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));

// Get All Meetings of User
router.get("/get-all-user-meetings/:userId", catchAsyncErrors(async (req, res, next) => {
    try {
        const userId = req.params.userId;

        // Fetch all meetings of the specified user from the database
        const userMeetings = await Meeting.find({ userId });

        // Send the user meetings as a response
        res.status(200).json({
            success: true,
            message: 'All user meetings retrieved successfully',
            data: {
                meetings: userMeetings,
            },
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));

// Get All Meetings of Seller
router.get("/get-all-seller-meetings/:sellerId", catchAsyncErrors(async (req, res, next) => {
    try {
        const sellerId = req.params.sellerId;

        // Fetch all meetings of the specified seller from the database
        const sellerMeetings = await Meeting.find({ sellerId });

        // Send the seller meetings as a response
        res.status(200).json({
            success: true,
            message: 'All seller meetings retrieved successfully',
            data: {
                meetings: sellerMeetings,
            },
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));

module.exports = { router, createMeetings };