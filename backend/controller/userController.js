const User = require('../model/user');
const Otp = require('../model/otp');
const bcrypt = require('bcrypt');
const { SendOtp } = require('../utils/sendOTP');
const jwt = require('jsonwebtoken')

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

exports.registerUser = async (req, res) => {
    const { email, password, phone } = req.body;

    try {
        if (!email || !password || !phone) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        const checkUser = await User.findOne({ email });

        const otp = generateOTP();
        const hashOTP = await bcrypt.hash(otp, 10);
        const expired = new Date(Date.now() + 5 * 60 * 1000); // 5 min from now

        if (checkUser && checkUser.isVerified === true) {
            return res.status(400).json({
                message: "User already exists."
            });
        }

        if (checkUser && checkUser.isVerified === false) {
            await Otp.findOneAndUpdate(
                { email },
                {
                    otp: hashOTP,
                    expiryTime: expired
                },
                { upsert: true, new: true }
            );

            await SendOtp(email, otp);

            return res.status(201).json({
                message: "OTP resent to your email."
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newRecord = await User.create({
            email,
            password: hashPassword,
            phone
        });

        if (!newRecord) {
            return res.status(500).json({
                message: "Something went wrong. Please try again."
            });
        }

        await Otp.create({ email, otp: hashOTP, expiryTime: expired });

        await SendOtp(email, otp);

        res.status(201).json({
            message: "Your account was created successfully. Please verify with the OTP sent to your email."
        });

    } catch (error) {
        console.log("Signup error:", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

exports.VerifyOTP = async (req, res) => {
    const {
        otp,
        email
    } = req.body
    try {
        const findUser = await Otp.findOne({ email })

        if (!findUser) {
            return res.status(404).json({
                message: "User Not Found"
            })
        }

        if (new Date() > findUser.expiryTime) {
            return res.status(400).json({
                message: "Your OTP has expired. Please generate a new one."
            });
        }

        const isMatch = await bcrypt.compare(otp, findUser.otp)

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid OTP"
            })
        }

        await User.findOneAndUpdate(
            { email },
            { isVerified: true }
        )

        await Otp.deleteOne({ email })

        res.status(201).json({
            message: "Your account has been verified successfully."
        })

    } catch (error) {
        console.log("otp verify error:", error);
        res.status(400).json({
            message: "Internal Server Error"
        })
    }
}

exports.Login = async (req, res) => {
    const {
        email,
        password
    } = req.body

    try {
        if (!email || !password) {
            return res.status(400).json({
                message: "All Fields Are Required ?"
            })
        }

        const isUser = await User.findOne({ email })

        if (!isUser) {
            return res.status(404).json({
                message: "User Not Found"
            })
        }

        const isMatchPassword = await bcrypt.compare(password, isUser.password)

        if (!isMatchPassword) {
            return res.status(400).json({
                message: "Wrong Password"
            })
        }

        const payload = {
            email: isUser.email,
            phone: isUser.phone
        }

        const token = jwt.sign(payload, process.env.SECRAT_KEY, { expiresIn: "1h" })

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 60 * 60 * 1000, // 1h
        });

        res.status(201).json({
            message: 'Logged in successfully!'
        })

    } catch (error) {
        console.log("login failed error:", error);
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}