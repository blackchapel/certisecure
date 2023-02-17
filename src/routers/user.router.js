const express = require('express');
const auth = require('./../middlewares/auth.middleware');
const {
    getApplicationById,
    getApplications,
    storeWalletAddress
} = require('../controllers/user.controller');
// const upload = require('./../utilities/multer');

// Initializing router
const router = express.Router();

router.get('/application', [auth.verifyJwt], getApplicationById);

router.get('/application/all', [auth.verifyJwt], getApplications);

router.patch('/wallet-address', [auth.verifyJwt], storeWalletAddress);

module.exports = router;
