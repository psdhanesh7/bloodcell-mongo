const router = require('express').Router();
const Hospital = require('mongoose').model('Hospital');

const { authenticatedOnly } = require('../middlewares/authMiddleware');

router.use(authenticatedOnly);

router.get('/', async (req, res) => {    
    try {
        const hospitals = await Hospital.find();
        res.json({ success: true, hospitals: hospitals });
    } catch(err) {
        return res.json({ success: false, message: err.message });
    }
});

router.post('/add', async (req, res) => {
    const { name, address, landmark, contactNo } = req.body;

    try {
        await Hospital.insertOne({ name, address, landmark, contactNo });
        res.send({ success: true, message: 'Hospital added succesfully' });
    } catch(err) {
        return res.send({ success: false, message: err.message });
    }
});

module.exports = router;