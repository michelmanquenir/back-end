const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  nombres: {type: String, required: true},
  apellidos: {type: String, required: true},
  email: { type: String, unique: true, required: true},
  rut: {type: String, unique: true, required: true},
  password: {type: String, required: true},
}, {
  timestamps: true
});

module.exports = model('User', UserSchema);