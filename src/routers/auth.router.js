const express = require('express');
const auth = require('./../middlewares/auth.middleware');
const {
    googleSignIn,
    signUp,
    login,
    verifyOtp,
    sendOtpEmail,
    setUsername
} = require('./../controllers/auth.controller');

// Initializing router
const router = express.Router();

router.post('/google/signin', googleSignIn);

router.post(
    '/google/set-username',
    [auth.verifyJwt, auth.accountActivatedFalse],
    setUsername
);

router.post('/signup', signUp);

router.post('/signin', login);

router.post(
    '/verify-otp',
    [auth.verifyJwt, auth.accountActivatedFalse],
    verifyOtp
);

router.post(
    '/send-otp-email',
    [auth.verifyJwt, auth.accountActivatedFalse],
    sendOtpEmail
);

module.exports = router;
