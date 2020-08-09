const mongoose = require('mongoose');
const { Schema } = mongoose;

const HospitalSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: String,
    landmark: String,
    contactNo: String
});

mongoose.model('Hospital', HospitalSchema);