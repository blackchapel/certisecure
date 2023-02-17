const User = require('../models/user.schema');

const getApplicationById = async (req, res) => {
    try {
        let user = await User.findById(req.user.id);

        if (!user) {
            res.status(404).json({
                message: 'User not found'
            });
        }

        const application = user.applications.filter((item) => {
            if (item._id.toString() === req.query.applicationId.toString()) {
                return item;
            }
        });

        res.status(200).json({
            message: 'Application found!',
            data: { application }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
};

const getApplications = async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        let applications = user.applications;

        if (!user) {
            res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(200).json({
            message: 'Applications found!',
            data: applications
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getApplicationById,
    getApplications
};
