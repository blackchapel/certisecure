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
        }
    },
    { timestamps: true }
);

const User = mongoose.model('user', userSchema);

module.exports = User;
