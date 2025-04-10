let nodemailer;

export const SendOtp = async (email, otp) => {
    try {
        nodemailer = nodemailer || (await import('nodemailer')).default;
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const message =
            `<div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #f9f9f9;">
                <h2 style="color: #333;">Verify Your Account</h2>
                <p>Hi there,</p>
                <p>Thank you for signing up! To complete your registration, please use the following One-Time Password (OTP) to verify your account:</p>
                <div style="font-size: 24px; font-weight: bold; color: #4CAF50; margin: 20px 0;">
                    ${otp}
                </div>
                <p>This OTP is valid for <strong>5 minutes</strong>. Please do not share it with anyone.</p>
                <p>If you did not request this, you can safely ignore this email.</p>
                <hr style="margin: 30px 0;" />
                <p style="font-size: 12px; color: #888;">© 2025 GupChup. All rights reserved.</p>
            </div>`

        // Email options
        const mailOptions = {
            from: 'online.trendy05@gmail.com',
            to: email,
            subject: "Verify Your Account – Your OTP Code Inside",
            // text: 'This is a test email sent using Nodemailer!',
            html: message
        };

        // Send the email
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log('Error occurred:', error);
            }
            console.log('Email sent:', info.response);
        });

        return;

    } catch (error) {
        console.log("otp send error:", error);
    }
}