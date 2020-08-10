const mongoose = require('mongoose');
const { Schema } = mongoose;

const DonorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    yearOfAdmission: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    height: Number,
    weight: Number,
    lastDonation: Date,
    prevLastDonation: Date
});

mongoose.model('Donor', DonorSchema);