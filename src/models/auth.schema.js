const mongoose = require('mongoose');

const authSchema = new mongoose.Schema(
    {
        user: {
            type: {
                id: {
                    type: String
                },
                name: {
                    type: String
                },
                email: {
                    type: String
                },
                isActivated: {
                    type: Boolean
                }
            }
        },
        token: {
            type: String
        },
        tokenType: {
            type: String,
            enum: ['BEARER', 'EMAIL VERIFICATION CODE']
        },
        isExpired: {
            type: Boolean,
            default: false
        },
        expireAt: {
            type: Date
        },
        lastAccess: {
            type: Date
        }
    },
    { timestamps: true }
);

const Auth = mongoose.model('auth', authSchema);

module.exports = Auth;
