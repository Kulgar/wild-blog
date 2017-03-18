'use strict'
let mongoose = require('mongoose')

module.exports = mongoose.model('User', new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        default : ''
    },
    facebook: {
        id: String,
        token: String,
        photo: String
    },
    bookmarks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }],
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
}))
