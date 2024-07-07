const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const ErrorHandler = require("../Middlewares/ErrorHandler");
const catchAsyncErrors = require("../Middlewares/CatchAsyncErrors");
const sendToken = require("../Middlewares/jwtToken");
const { isAuthenticated } = require("../Middlewares/Auth");
const sendMail = require("../Middlewares/sendMail");
const cloudinary = require("cloudinary");

// Create User
router.post("/create-user", async (req, res, next) => {
  try {
    const {
      email,
      password,
      name,
      username,
      phoneNumber,
      dateOfBirth,
      profilePicture,
    } = req.body;

    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }

    // Upload profile picture to Cloudinary
    const cloudinaryResult = await cloudinary.v2.uploader.upload(
      profilePicture,
      {
        folder: "profile-pictures",
      }
    );

    const newUser = new User({
      email,
      password,
      name,
      username,
      phoneNumber,
      dateOfBirth,
      profilePicture: {
        public_id: cloudinaryResult.public_id,
        url: cloudinaryResult.secure_url,
      },
    });

    await newUser.save();

    sendToken(newUser, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Login User
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Load User
router.get(
  "/get-user",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Logout User
router.get(
  "/logout-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", "", {
        expires: new Date(0),
        httpOnly: true,
        sameSite: "lax",
        secure: true,
      });
      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Forget Password
router.post("/forget-password", async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorHandler("User doesn't exist.", 400));
    }

    user.generateResetToken();

    await user.save();

    const resetLink = `https://appointly-mu.vercel.app/reset-password/${user.resetPasswordToken}`;
    const message = `To reset your password, click on the following link: ${resetLink}`;

    await sendMail({
      email,
      subject: "Password Reset Request",
      message,
    });

    res
      .status(200)
      .json({ success: true, message: "Password reset email sent." });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password
router.post("/reset-password/:token", async (req, res, next) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTime: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorHandler("Invalid or expired token.", 400));
    }

    user.password = newPassword;

    user.resetPasswordToken = undefined;
    user.resetPasswordTime = undefined;

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password reset successfully." });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Update User Info
router.put(
  "/update-user-info",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, username, dateOfBirth, name, phoneNumber } = req.body;

      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      // Update user information
      if (email) user.email = email;
      if (username) user.username = username;
      if (dateOfBirth) user.dateOfBirth = dateOfBirth;
      if (name) user.name = name;
      if (phoneNumber) user.phoneNumber = phoneNumber;

      await user.save();

      res.status(200).json({
        success: true,
        message: "User information updated successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Change Password
router.put(
  "/change-password",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select("+password");

      const isPasswordMatched = await user.comparePassword(
        req.body.oldPassword
      );

      if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect!", 400));
      }

      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(
          new ErrorHandler(
            "New password and confirm password do not match",
            400
          )
        );
      }
      user.password = req.body.newPassword;

      await user.save();

      res.status(200).json({
        success: true,
        message: "Password changed successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Update User ProfilePicture
router.put(
  "/update-profilePicture",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      let existsUser = await User.findById(req.user.id);

      if (req.files && req.files.profilePicture) {
        // Delete the old image from Cloudinary
        const imageId = existsUser.profilePicture.public_id;
        if (imageId) {
          await cloudinary.v2.uploader.destroy(imageId);
        }

        // Upload the new image to Cloudinary
        const myCloud = await cloudinary.v2.uploader.upload(
          req.files.profilePicture.tempFilePath,
          {
            folder: "profile-pictures",
            width: 150,
          }
        );

        existsUser.profilePicture = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };

        await existsUser.save();

        res.status(200).json({
          success: true,
          message: "Profile picture updated successfully",
        });
      } else {
        return next(new ErrorHandler("No file uploaded", 400));
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Get Any User By ID
router.get(
  "/get-any-user/:userId",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req.params.userId;

      if (!userId) {
        return next(new ErrorHandler("User ID is missing", 400));
      }

      const user = await User.findById(userId);

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      const userData = {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
      };

      res.status(200).json({
        success: true,
        data: userData,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
