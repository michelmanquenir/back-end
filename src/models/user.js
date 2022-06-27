'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema({
    nombres: {type: String, required: true},
    apellidos: {type: String, required: true},
    email: { type: String, unique: true, required: true
    },
    password: {type: String, required: true},
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);