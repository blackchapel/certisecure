const express = require('express');
const auth = require('./../middlewares/auth.middleware');
const {
    applyForVerification,
    viewAllInstitutions
} = require('../controllers/student.controller');

// Initializing router
const router = express.Router();

router.post(
    '/request-verification',
    [auth.verifyJwt, auth.roleStudent],
    applyForVerification
);

router.get('/view-institutions', viewAllInstitutions);

module.exports = router;
