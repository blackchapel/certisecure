const User = require('../models/user.schema');

const approveApplication = async (req, res) => {
    try {
        const institution = await User.findById(req.user.id);

        if (!institution) {
            res.status(404).json({
                message: 'Institution not found'
            });
        }

        let studentId;

        institution.applications = institution.applications.filter((item) => {
            if (item._id.toString() === req.query.applicationId.toString()) {
                item.certificateUrl = req.body.certificateUrl;
                item.hashedMessage = req.body.hashedMessage;
                item.signature = req.body.signature;
                item.isVerified = 'APPROVED';
                studentId = item.studentId;
            }
            return item;
        });

        const student = await User.findById(studentId);

        student.applications = student.applications.filter((item) => {
            if (item.institutionId.toString() === institution._id.toString()) {
                item.hashedMessage = req.body.hashedMessage;
                item.signature = req.body.signature;
                item.isVerified = 'APPROVED';
            }
            return item;
        });

        await institution.save();
        await student.save();

        res.status(200).json({
            message: 'Application Approved',
            data: institution
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
};

const rejectApplication = async (req, res) => {
    try {
        const institution = await User.findById(req.user.id);

        if (!institution) {
            res.status(404).json({
                message: 'Institution not found'
            });
        }

        let studentId;

        institution.applications = institution.applications.filter((item) => {
            if (item._id.toString() === req.query.applicationId.toString()) {
                item.certificateUrl = req.body.certificateUrl;
                item.hashedMessage = req.body.hashedMessage;
                item.signature = req.body.signature;
                item.isVerified = 'REJECTED';
                studentId = item.studentId;
            }
            return item;
        });

        const student = await User.findById(studentId);

        student.applications = student.applications.filter((item) => {
            if (item._id.toString() === req.query.applicationId.toString()) {
                item.hashedMessage = req.body.hashedMessages;
                item.signature = req.body.signature;
                item.isVerified = 'REJECTED';
            }
            return item;
        });

        await institution.save();
        await student.save();

        res.status(200).json({
            message: 'Application Approved',
            data: institution
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
};

const verifyCertificate = async (req, res) => {
    try {
        const institution = await User.findById(req.user.id);

        if (!institution) {
            res.status(404).json({
                message: 'Institution not found'
            });
        }

        const status = institution.applications.forEach((item) => {
            if (
                item._id.toString() === req.query.applicationId.toString() &&
                item.isVerified === true
            ) {
                return true;
            }
            return false;
        });

        res.status(200).json({
            message: 'Certificate found',
            data: status
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
};

const searchSignature = async (req, res) => {
    try {
        const institutions = await User.find({ role: 'INSTITUTION' });

        if (institutions.length === 0) {
            res.status(404).json({
                message: 'no institutions found'
            });
        } else {
            let result = {};
            institutions.forEach((item) => {
                item.applications.forEach((itemInception) => {
                    if (itemInception.signature === req.query.signature) {
                        result['walletAddress'] = item.walletAddress;
                        result['hashedMessage'] = itemInception.hashedMessage;
                        result['certificateUrl'] = itemInception.certificateUrl;
                    }
                });
            });

            res.status(200).json({
                message: 'certificate details',
                data: result
            });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    approveApplication,
    verifyCertificate,
    rejectApplication,
    searchSignature
};

// approve, verify, view all
