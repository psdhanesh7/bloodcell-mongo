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
    bloodgroup: {
        type: String,
        required: true
    },
    height: Number,
    weight: Number,
    lastDonation: Date,
    preLastDonation: Date
});

mongoose.model('Donor', DonorSchema);