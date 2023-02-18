const express = require('express');
const auth = require('../middlewares/auth.middleware');
const {
    approveApplication,
    verifyCertificate,
    searchSignature
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

router.get(
    '/search-signature',
    [auth.verifyJwt, auth.roleInstitution],
    searchSignature
);

module.exports = router;
