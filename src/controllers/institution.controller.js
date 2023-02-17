const User = require('../models/user.schema');

const approveApplication = async (req, res) => {
    try {
        const institution = await User.findById(req.user.id);

        if (!institution) {
            res.status(404).json({
                message: 'Institution not found'
            });
        }

        institution.applications = institution.applications.forEach((item) => {
            if (item._id.toString() === req.query.applicationId.toString()) {
                item.isVerified = true;
            }
            return item;
        });

        await institution.save();

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

module.exports = {
    approveApplication,
    verifyCertificate
};

// approve, verify, view all
