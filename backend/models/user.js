const mongoose = require('mongoose');
const { Schema } = mongoose;

const emergencyContactSchema = new Schema({
    name: String,
    relationship: String,
    contactMethod: String,
    contactInfo: String,
})

const usersSchema = new mongoose.Schema({
    name: String,
    birthday: Date,
    department: String,
    title: String,
    isActive: Boolean,
    contactInfo: {
        phoneNumber: String,
        email: String,
    },
    address: {
        lineOne: String,
        lineTwo: String, 
        city: String,
        state: String,
        country: String,
        zip: String
    },
    emergencyContact: [emergencyContactSchema] 
}, {
    timestamps: true
});

module.exports = mongoose.model('User', usersSchema);