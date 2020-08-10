const router = require('express').Router();
const Donor = require('mongoose').model('Donor');
const { authenticatedOnly } = require('../middlewares/authMiddleware');

router.use(authenticatedOnly);

router.get('/', async (req, res) => {
    try {
        const donors = await Donor.find();
        return res.json({ success: true, donors: donors });
    } catch(err) {
        return res.json({ success: false, message: err.message });
    }
});

router.post('/add', async (req, res) => {
    const { name, yearOfAdmission, department, contactNo, bloodGroup, height, weight, lastDonation } = req.body;

    try {
        const donor = new Donor({ 
            name, 
            yearOfAdmission, 
            department, 
            contactNo, 
            bloodGroup, 
            height, 
            weight, 
            lastDonation 
        });
        await donor.save();

        return res.json({ success: true, message: 'Donor added succefully' });
    } catch(err) {
        return res.json({ success: false, message: err.message });
    }

});

router.post('/:donorId/edit', async (req, res) => {
    const { donorId } = req.params;
    const { name, yearOfAdmission, department, contactNo, bloodGroup, height, weight, lastDonation } = req.body;

    try {
        await Donor.updateOne({ _id: donorId }, { $set: { name, yearOfAdmission, department, contactNo, bloodGroup, height, weight, lastDonation } });
        return res.json({ success: true, message: 'Donor details updated successfully' });
    } catch(err) {
        return res.json({ success: false, message: err.message });
    }
});

module.exports = router;