const express = require('express');
const mongoose = require('mongoose');
const Requirement = mongoose.model('Requirement');
const Donor = mongoose.model('Donor');

const router = express.Router();

router.get('/active', async (req, res) => {

    try {
        const requirements = await Requirement.find({ closed: false });
        res.send(requirements);
    } catch(err) {
        res.json({ success: false, message: err.message });
    }
});

router.get('/closed', async (req, res) => {

    try {
        const requirements = await Requirement.find({ closed: true });
        res.send(requirements);
    } catch(err) {
        res.json({ success: false, message: err.message });
    }
});

router.post('/add', async (req, res) => {
    const { patient, bystander, bloodGroup, noOfUnits, typeOfDonation, hospital, contactNo, date } = req.body;

    try {
        const requirement = new Requirement({ patient, bystander, bloodGroup, noOfUnits, typeOfDonation, hospital, contactNo, date });
        await requirement.save();
    
        res.json({ success: true, message: 'Requirement added succesfully' });
    }  catch(err) {
        res.json({ success: false, message: err.message });
    }
});

router.get('/:requirementId/assigndonor/:donorId', async (req, res) => {

    const { requirementId, donorId } = req.params;

    try {
        const donor = await Donor.findById(donorId);
        if(!donor) return res.json({ success: false, message: 'Donor not valid' });

        const donorDetails = {
            donorName: donor.name,
            yearOfAdmission: donor.yearOfAdmission,
            department: donor.department,
            contactNo: donor.contactNo,
            donorCertificate: false
        }
        
        const session = await mongoose.startSession();
        const transactionOptions = {
            readPreference: 'primary',
            readConcern: { level: 'local' },
            writeConcern: { w: 'majority' }
        };

        try {
            await session.withTransaction(async () => {

                await Requirement.updateOne({ _id: requirementId }, { $push: { donors: donorDetails} }, { session });
                await Donor.updateOne({ _id: donorId }, { $set: { lastDonation: new Date(), prevLastDonation: donor.lastDonation } }, { session });

                res.json({ success: true, message: 'Donor assigned successfully' });
            }, transactionOptions);
        } catch(err) {
            res.json({ success: false, message: err.message });
        } finally {
            await session.endSession();
        }
        
    } catch(err) {
        return res.json({ success: false, message: err.message });
    }
});

module.exports = router;