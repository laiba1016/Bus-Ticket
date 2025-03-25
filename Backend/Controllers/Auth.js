const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const User = require('../Models/Auth');


const register = async (req, res) => {
    const { username, email, password, confirmPassword, role } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ msg: "Passwords do not match" });
    }

    try {
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ msg: "User already exists with this email" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(201).json({
            success: true,
            token,
            user: {
                id: newUser._id,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ msg: "Server error" });
    }
};
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({ msg: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, userData.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid email or password" });
        }

        // Generate token
        const token = jwt.sign(
            { id: userData._id, role: userData.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Determine the redirect URL based on role
        const redirectUrl = userData.role === "admin" ? "/admin-dashboard" : "/";

        res.status(200).json({
            success: true,
            token,
            role: userData.role,
            userId: userData._id,  // Add user ID in response
            redirectUrl
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ msg: "Server error" });
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Email not found" });
        }


        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });


        const resetUrl = `http://localhost:3000/reset-password/${token}`;



        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset Request",
            html: `
                <h2>Password Reset Request</h2>
                <p>You have requested to reset your password. Please click the button below to reset it.</p>
                <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color:#E09145; color: white; text-decoration: none; border-radius: 5px; text-align: center;">
                    Reset Password
                </a>
                <p>If you did not request this, please ignore this email.</p>
            `,
        };


        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, msg: "Password reset link sent to your email." });
    } catch (error) {
        console.error("Forgot Password Error:", error);
        res.status(500).json({ msg: "Server error" });
    }
};


const resetPassword = async (req, res) => {
    const { token, password } = req.body;

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;


        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ msg: "User not found." });
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ success: true, msg: "Password has been reset successfully." });
    } catch (error) {
        console.error("Reset Password Error:", error);
        res.status(500).json({ msg: "Server error" });
    }
};

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword,
};

// const nodemailer = require("nodemailer");
// const jwt = require("jsonwebtoken");
// const bcrypt = require('bcrypt');
// const User = require('../Models/Auth');


// const register = async (req, res) => {
//     const { username, email, password, confirmPassword, role } = req.body;

//     if (password !== confirmPassword) {
//         return res.status(400).json({ msg: "Passwords do not match" });
//     }

//     try {
//         const existingUserByEmail = await User.findOne({ email });
//         if (existingUserByEmail) {
//             return res.status(400).json({ msg: "User already exists with this email" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = new User({
//             email,
//             password: hashedPassword,
//             role
//         });

//         await newUser.save();

//         // Generate JWT token
//         const token = jwt.sign(
//             { id: newUser._id, role: newUser.role },
//             process.env.JWT_SECRET,
//             { expiresIn: "1h" }
//         );

//         res.status(201).json({
//             success: true,
//             token,
//             user: {
//                 id: newUser._id,
//                 email: newUser.email,
//                 role: newUser.role
//             }
//         });
//     } catch (error) {
//         console.error("Registration Error:", error);
//         res.status(500).json({ msg: "Server error" });
//     }
// };
// const login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const userData = await User.findOne({ email });
//         if (!userData) {
//             return res.status(400).json({ msg: "Invalid email or password" });
//         }

//         const isMatch = await bcrypt.compare(password, userData.password);
//         if (!isMatch) {
//             return res.status(400).json({ msg: "Invalid email or password" });
//         }

//         // Generate token
//         const token = jwt.sign(
//             { id: userData._id, role: userData.role },
//             process.env.JWT_SECRET,
//             { expiresIn: "1h" }
//         );

//         // Determine the redirect URL based on role
//         const redirectUrl = userData.role === "admin" ? "/admin-dashboard" : "/";

//         res.status(200).json({
//             success: true,
//             token,
//             role: userData.role,
//             redirectUrl
//         });
//     } catch (error) {
//         console.error("Login Error:", error);
//         res.status(500).json({ msg: "Server error" });
//     }
// };


// const forgotPassword = async (req, res) => {
//     const { email } = req.body;

//     try {

//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ msg: "Email not found" });
//         }


//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });


//         const resetUrl = `http://localhost:3000/reset-password/${token}`;



//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS,
//             },
//         });

//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: email,
//             subject: "Password Reset Request",
//             html: `
//                 <h2>Password Reset Request</h2>
//                 <p>You have requested to reset your password. Please click the button below to reset it.</p>
//                 <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color:#E09145; color: white; text-decoration: none; border-radius: 5px; text-align: center;">
//                     Reset Password
//                 </a>
//                 <p>If you did not request this, please ignore this email.</p>
//             `,
//         };


//         await transporter.sendMail(mailOptions);

//         res.status(200).json({ success: true, msg: "Password reset link sent to your email." });
//     } catch (error) {
//         console.error("Forgot Password Error:", error);
//         res.status(500).json({ msg: "Server error" });
//     }
// };


// const resetPassword = async (req, res) => {
//     const { token, password } = req.body;

//     try {

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const userId = decoded.id;


//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(400).json({ msg: "User not found." });
//         }


//         const hashedPassword = await bcrypt.hash(password, 10);


//         user.password = hashedPassword;
//         await user.save();

//         res.status(200).json({ success: true, msg: "Password has been reset successfully." });
//     } catch (error) {
//         console.error("Reset Password Error:", error);
//         res.status(500).json({ msg: "Server error" });
//     }
// };

// module.exports = {
//     register,
//     login,
//     forgotPassword,
//     resetPassword,
// };