const mongoose = require("mongoose");
const { minWordCountValidator } = require("../Functions/Validators");

const sellerSchema = new mongoose.Schema({
    // Personal Information
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    firstName: {
        type: String,
        required: [true, "Please enter your first name"],
    },
    lastName: {
        type: String,
        required: [true, "Please enter your last name"],
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
    },
    country: {
        type: String,
    },

    // Professional Information
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner',
    },
    rating: {
        type: Number,
        default: 0,
    },
    socialMediaProfiles: {
        linkedin: String,
        twitter: String,
        facebook: String,
        github: String,
        instagram: String,
    },
    skillTags: [String],
    languagesSpoken: [String],
    professionalEmail: {
        type: String,
        required: [true, "Please enter your professional email!"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
            "Please enter a valid email address.",
        ],
    },
    professionalSkill: {
        type: String,
        required: [true, "Please enter your professional profile name!"]
    },
    professionalImage: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    about: {
        type: String,
        validate: [minWordCountValidator(50), "About should have a minimum of 50 words"],
    },

    // Education Experiences
    educationExperiences: [
        {
            qualification: String,
            subject: String,
            institution: String,
            educationalFromDate: Date,
            educationalToDate: Date,
            educationalExperience: {
                type: String,
                validate: [
                    minWordCountValidator(50),
                    "Educational experience should have a minimum of 50 words",
                ],
            },
            educationalDocument: {
                public_id: {
                    type: String,
                    required: true,
                },
                url: {
                    type: String,
                    required: true,
                },
            },
        },
    ],

    // Professional Experiences
    professionalExperiences: [
        {
            company: String,
            position: String,
            experienceFromDate: Date,
            experienceToDate: Date,
            professionalExperience: {
                type: String,
                validate: [
                    minWordCountValidator(50),
                    "Professional experience should have a minimum of 50 words",
                ],
            },
        },
    ],

    // Slots Availability
    slotsAvailability: [
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
    price: Number,

    // Timestamp
    createdAt: {
        type: Date,
        default: Date.now(),
    },

    // Reviews
    reviews: [
        {
            user: {
                type: Object,
            },
            rating: {
                type: Number,
            },
            comment: {
                type: String,
            },
            userId: {
                type: String,
            },
            createdAt: {
                type: Date,
                default: Date.now(),
            }
        },
    ],
});

module.exports = mongoose.model("Seller", sellerSchema);
