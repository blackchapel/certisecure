const User = require('../models/user.schema');

const applyForVerification = async (req, res) => {
    try {
        let student = await User.findById(req.user.id);

        if (!student) {
            res.status(404).json({
                message: 'Student not found'
            });
        }

        const applicationObjStudent = {
            institutionId: req.body.institutionId,
            institutionName: req.body.institutionName,
            isVerified: 'PENDING',
            studentRollNo: req.body.studentSAPID,
            studentCgpa: req.body.studentCgpa,
            studentYearOfGraduation: req.body.studentYearOfGraduation,
            studentDob: req.body.studentDob
        };

        student.applications.push(applicationObjStudent);

        await student.save();

        let institution = await User.findById(req.body.institutionId);

        if (!institution) {
            res.status(404).json({
                message: 'Institution not found'
            });
        }

        const applicationObjInstitution = {
            isVerified: 'PENDING',
            studentId: req.user.id,
            studentName: req.user.name,
            studentRollNo: req.body.studentRollNo,
            studentCgpa: req.body.studentCgpa,
            studentYearOfGraduation: req.body.studentYearOfGraduation,
            studentDob: req.body.studentDob
        };

        institution.applications.push(applicationObjInstitution);

        await institution.save();

        res.status(200).json({
            message: 'Application sent!',
            data: student
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
};

const viewAllInstitutions = async (req, res) => {
    try {
        const institutions = await User.find({ role: 'INSTITUTION' });
        if (!institutions) {
            res.status(404).json({
                message: 'No institutions available'
            });
        }

        res.status(200).json({
            message: 'Institutions found',
            data: institutions
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    applyForVerification,
    viewAllInstitutions
};
// apply(form)
