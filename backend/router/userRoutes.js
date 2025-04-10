const router = require('express').Router()
const {
    registerUser,
    VerifyOTP,
    Login
} = require('../controller/userController')



router.post('/signup', registerUser)
router.post('/otp-verify', VerifyOTP)
router.post('/login', Login)


module.exports = router;