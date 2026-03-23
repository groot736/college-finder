const router = require('express').Router();
const College = require('../models/College');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Get all colleges with filters
router.get('/', async (req, res) => {
  try {
    console.log('Colleges query:', req.query);
    const { budget, location, course, type } = req.query;
    let filter = {};
    if (budget) filter.fees = { $lte: parseInt(budget) };
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (course) filter.courses = { $in: [new RegExp(course, 'i')] };
    if (type) filter.type = type;

    const colleges = await College.find(filter).limit(50);
    res.json(colleges);
  } catch (err) {
    console.error('Colleges error:', err.message, err.stack);
    res.status(500).json({ error: err.message });
  }
});

// Get single college
router.get('/:id', async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) return res.status(404).json({ error: 'College not found' });
    res.json(college);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create college (admin only)
router.post('/', auth, admin, async (req, res) => {
  try {
    const college = await College.create(req.body);
    res.status(201).json(college);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update college (admin)
router.put('/:id', auth, admin, async (req, res) => {
  try {
    const college = await College.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(college);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete college (admin)
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    await College.findByIdAndDelete(req.params.id);
    res.json({ message: 'College deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;