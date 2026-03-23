const router = require('express').Router();
const User = require('../models/User');
const College = require('../models/College');
const AdmissionRequest = require('../models/AdmissionRequest');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/stats', auth, admin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalColleges = await College.countDocuments();
    const pendingRequests = await AdmissionRequest.countDocuments({ status: 'pending' });

    res.json({ totalUsers, totalColleges, pendingRequests });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;