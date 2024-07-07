const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true,
    },

    meetingDay: {
        type: String,
        required: true,
    },

    meetingTime: {
        type: String,
        required: true,
    },

    meetingStartTime: {
        type: String,
        required: true,
    },

    meetingEndTime: {
        type: String,
        required: true,
    },

    zoomMeetingLink: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        enum: ['scheduled', 'in-progress', 'completed', 'canceled'],
        default: 'scheduled',
    },

    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('Meeting', meetingSchema);