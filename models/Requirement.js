const mongoose = require('mongoose');
const { Schema } = mongoose;

const RequirementSchema = new Schema({
    patient: {
        type: String,
        required: true
    },
    bystander: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    noOfUnits: {
        type: Number,
        required: true
    },
    typeOfDonation: {
        type: String,
        required: true
    },
    hospital: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    closed: {
        type: Boolean,
        default: false
    },
    donors: {
        type: [{ 
            donorName: {
                type: String,
                required: true
            },
            yearOfAdmission: {
                type: Number,
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
            donorCertificate: {
                type: Boolean, 
                default: false
            }
        }]
    }

});

mongoose.model('Requirement', RequirementSchema);