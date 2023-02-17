const express = require('express');
const auth = require('./../middlewares/auth.middleware');
const {
    getApplicationById,
    getApplications
} = require('../controllers/user.controller');
// const upload = require('./../utilities/multer');

// Initializing router
const router = express.Router();

router.get('/application', [auth.verifyJwt], getApplicationById);

router.get('/application/all', [auth.verifyJwt], getApplications);

module.exports = router;
