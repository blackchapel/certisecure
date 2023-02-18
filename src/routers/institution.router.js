const express = require('express');
const auth = require('../middlewares/auth.middleware');
const {
    approveApplication,
    rejectApplication,
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
    '/reject-application',
    [auth.verifyJwt, auth.roleInstitution],
    rejectApplication
);

router.post(
    '/verify-certificate',
    [auth.verifyJwt, auth.roleInstitution],
    verifyCertificate
);

module.exports = router;
