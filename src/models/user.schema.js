const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true
        },
        password: {
            type: String,
            trim: true
        },
        thumbnail: {
            type: String
        },
        isActivated: {
            type: Boolean,
            default: false
        },
        isdeleted: {
            type: Boolean,
            default: false
        },
        role: {
            type: String,
            enum: ['INSTITUTION', 'STUDENT']
        },
        walletAddress: {
            type: String
        },
        applications: {
            type: [
                {
                    institutionId: {
                        type: String
                    },
                    institutionName: {
                        type: String
                    },
                    isVerified: {
                        type: String,
                        enum: ['PENDING', 'REJECTED', 'APPROVED']
                    },
                    studentId: {
                        type: String
                    },
                    studentName: {
                        type: String
                    },
                    studentRollNo: {
                        type: String
                    },
                    studentCgpa: {
                        type: String
                    },
                    studentYearOfGraduation: {
                        type: String
                    },
                    studentDob: {
                        type: String
                    }
                }
            ]
        }
    },
    { timestamps: true }
);

const User = mongoose.model('user', userSchema);

module.exports = User;
