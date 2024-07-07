const express = require("express");
const router = express.Router();
const ErrorHandler = require("../Middlewares/ErrorHandler");
const catchAsyncErrors = require("../Middlewares/CatchAsyncErrors");
const cloudinary = require("cloudinary");
const User = require('../Models/user');
const Seller = require('../Models/seller');
const { isAuthenticated } = require("../Middlewares/Auth");

// Create Seller
router.post('/create-seller', catchAsyncErrors(async (req, res, next) => {
    try {
        const {
            // Personal Details
            userId,
            firstName,
            lastName,
            gender,
            country,
            // Professional Details
            socialMediaProfiles,
            skillTags,
            languagesSpoken,
            professionalEmail,
            professionalSkill,
            professionalImage,
            about,
            // Education Experiences
            educationExperiences,
            // Professional Experiences
            professionalExperiences,
            // Availability
            slotsAvailability,
            // Pricing
            price,
        } = req.body;

        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return next(new ErrorHandler('User not found', 404));
        }

        // Upload professional image to Cloudinary
        const cloudinaryResult = await cloudinary.v2.uploader.upload(professionalImage, {
            folder: 'professional-images',
        });

        const educationalDocuments = [];

        // Upload educational documents to Cloudinary
        for (const educationExp of educationExperiences) {
            if (!educationExp.educationalDocument) {
                return next(new ErrorHandler('Educational document is missing', 400));
            }

            const educationalDocumentResult = await cloudinary.v2.uploader.upload(educationExp.educationalDocument, {
                folder: 'educational-documents',
            });

            educationalDocuments.push({
                public_id: educationalDocumentResult.public_id,
                url: educationalDocumentResult.secure_url,
            });
        }

        const newSeller = new Seller({
            user: userId,
            firstName,
            lastName,
            gender,
            country,
            socialMediaProfiles,
            skillTags,
            languagesSpoken,
            professionalEmail,
            professionalSkill,
            professionalImage: {
                public_id: cloudinaryResult.public_id,
                url: cloudinaryResult.secure_url,
            },
            about,
            educationExperiences: educationExperiences.map((educationExp, index) => ({
                ...educationExp,
                educationalDocument: educationalDocuments[index],
            })),
            professionalExperiences,
            slotsAvailability,
            price,
        });

        await newSeller.save();

        res.status(201).json({
            success: true,
            message: 'Seller created successfully',
            data: newSeller,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
}));

// Load Seller
router.get('/get-seller/:userId', isAuthenticated, catchAsyncErrors(async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const seller = await Seller.findOne({ user: userId }).populate('user');

        if (!seller) {
            return next(new ErrorHandler('Seller not found', 404));
        }

        const sellerData = {
            _id: seller._id,
            firstName: seller.firstName,
            lastName: seller.lastName,
            gender: seller.gender,
            country: seller.country,
            level: seller.level,
            rating: seller.rating,
            socialMediaProfiles: seller.socialMediaProfiles,
            skillTags: seller.skillTags,
            languagesSpoken: seller.languagesSpoken,
            professionalEmail: seller.professionalEmail,
            professionalSkill: seller.professionalSkill,
            professionalImage: seller.professionalImage,
            about: seller.about,
            educationExperiences: seller.educationExperiences,
            professionalExperiences: seller.professionalExperiences,
            slotsAvailability: seller.slotsAvailability,
            price: seller.price,
            createdAt: seller.createdAt,
            reviews: seller.reviews
        };

        res.status(200).json({
            success: true,
            data: sellerData,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));

// Get Seller By ID
router.get('/get-any-seller/:sellerId', isAuthenticated, catchAsyncErrors(async (req, res, next) => {
    try {
        const sellerId = req.params.sellerId;

            if (!sellerId) {
                return next(new ErrorHandler('Seller ID is missing', 400));
            }

        const seller = await Seller.findById(sellerId).populate('user');

        if (!seller) {
            return next(new ErrorHandler('Seller not found', 404));
        }

        const sellerData = {
            _id: seller._id,
            firstName: seller.firstName,
            lastName: seller.lastName,
            gender: seller.gender,
            country: seller.country,
            level: seller.level,
            rating: seller.rating,
            socialMediaProfiles: seller.socialMediaProfiles,
            skillTags: seller.skillTags,
            languagesSpoken: seller.languagesSpoken,
            professionalEmail: seller.professionalEmail,
            professionalSkill: seller.professionalSkill,
            professionalImage: seller.professionalImage,
            about: seller.about,
            educationExperiences: seller.educationExperiences,
            professionalExperiences: seller.professionalExperiences,
            slotsAvailability: seller.slotsAvailability,
            price: seller.price,
            createdAt: seller.createdAt,
            reviews: seller.reviews
        };

        res.status(200).json({
            success: true,
            data: sellerData,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));

// Get All Sellers
router.get('/get-all-sellers', isAuthenticated, catchAsyncErrors(async (req, res, next) => {
    try {
        const sellers = await Seller.find().sort({ createdAt: -1 }).populate('user');

        const sellerData = sellers.map(seller => ({
            _id: seller._id,
            firstName: seller.firstName,
            lastName: seller.lastName,
            gender: seller.gender,
            country: seller.country,
            level: seller.level,
            rating: seller.rating,
            socialMediaProfiles: seller.socialMediaProfiles,
            skillTags: seller.skillTags,
            languagesSpoken: seller.languagesSpoken,
            professionalEmail: seller.professionalEmail,
            professionalSkill: seller.professionalSkill,
            professionalImage: seller.professionalImage,
            about: seller.about,
            educationExperiences: seller.educationExperiences,
            professionalExperiences: seller.professionalExperiences,
            slotsAvailability: seller.slotsAvailability,
            price: seller.price,
            createdAt: seller.createdAt,
            reviews: seller.reviews
        }));

        res.status(200).json({
            success: true,
            sellers: sellerData,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));

module.exports = router; 