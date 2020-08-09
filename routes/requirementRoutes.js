const express = require('express');
const mongoose = require('mongoose');
const Requirement = mongoose.model('Requirement');
const router = express.Router();

router.get('/', async (req, res) => {

    try {
        const requirements = await Requirement.find();
        res.send(requirements);
    } catch(err) {
        res.json({ success: false, message: err.message });
    }
})

router.post('/add', async (req, res) => {
    const { patient, bystander, bloodGroup, noOfUnits, typeOfDonation, hospital, contactNo, date } = req.body;

    try {
        const requirement = new Requirement({ patient, bystander, bloodGroup, noOfUnits, typeOfDonation, hospital, contactNo, date });
        await requirement.save();
    
        res.json({ success: true, message: 'Requirement added succesfully' });
    }  catch(err) {
        res.json({ success: false, message: err.message });
    }
})

module.exports = router;