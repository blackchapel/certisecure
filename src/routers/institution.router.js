const express = require('express');
const auth = require('../middlewares/auth.middleware');
const {
    approveApplication,
    verifyCertificate
} = require('../controllers/institution.controller');

// Initializing router
const router = express.Router();

router.post(
    '/approve-application',
    [auth.verifyJwt, auth.roleInstitution],
    approveApplication
);

router.post(
    '/verify-certificate',
    [auth.verifyJwt, auth.roleInstitution],
    verifyCertificate
);

module.exports = router;
