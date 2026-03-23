const router = require('express').Router();
const AdmissionRequest = require('../models/AdmissionRequest');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Create request (logged in user)
router.post('/', auth, async (req, res) => {
  try {
    const { college, name, phone, interest, budget } = req.body;
    const request = await AdmissionRequest.create({
      user: req.user.id,
      college,
      name,
      phone,
      interest,
      budget
    });
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user's own requests
router.get('/my', auth, async (req, res) => {
  try {
    const requests = await AdmissionRequest.find({ user: req.user.id }).populate('college');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all requests (admin)
router.get('/', auth, admin, async (req, res) => {
  try {
    const requests = await AdmissionRequest.find().populate('user').populate('college');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update request status (admin)
router.put('/:id/status', auth, admin, async (req, res) => {
  try {
    const { status } = req.body;
    const request = await AdmissionRequest.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;