const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Mock questions per stream
const mockQuestions = {
  engineering: [
    { id: 1, text: "Do you enjoy solving complex mathematical problems?", options: ["Yes", "Sometimes", "No"] },
    { id: 2, text: "Are you interested in programming and coding?", options: ["Yes", "Sometimes", "No"] },
    { id: 3, text: "Do you like building things or working with machines?", options: ["Yes", "Sometimes", "No"] },
    { id: 4, text: "Are you good at logical reasoning and puzzles?", options: ["Yes", "Sometimes", "No"] },
    { id: 5, text: "Do you prefer working with technology over people?", options: ["Yes", "Sometimes", "No"] },
    { id: 6, text: "Are you curious about how things work mechanically?", options: ["Yes", "Sometimes", "No"] },
    { id: 7, text: "Do you enjoy learning new software/tools?", options: ["Yes", "Sometimes", "No"] },
    { id: 8, text: "Would you like to innovate and create new products?", options: ["Yes", "Sometimes", "No"] },
    { id: 9, text: "Are math and physics your strong subjects?", options: ["Yes", "Sometimes", "No"] },
    { id: 10, text: "Do you see yourself working in tech companies like Google?", options: ["Yes", "Sometimes", "No"] }
  ],
  medical: [
    { id: 1, text: "Are you interested in biology and human anatomy?", options: ["Yes", "Sometimes", "No"] },
    { id: 2, text: "Do you want to help people recover from illnesses?", options: ["Yes", "Sometimes", "No"] },
    { id: 3, text: "Are you comfortable with blood and medical procedures?", options: ["Yes", "Sometimes", "No"] },
    { id: 4, text: "Do you have patience for long study hours?", options: ["Yes", "Sometimes", "No"] },
    { id: 5, text: "Are you good at memorizing scientific facts?", options: ["Yes", "Sometimes", "No"] },
    { id: 6, text: "Do you want to save lives as a doctor?", options: ["Yes", "Sometimes", "No"] },
    { id: 7, text: "Are you interested in research and new medicines?", options: ["Yes", "Sometimes", "No"] },
    { id: 8, text: "Do you like working in hospitals/clinics?", options: ["Yes", "Sometimes", "No"] },
    { id: 9, text: "Are chemistry and biology your favorite subjects?", options: ["Yes", "Sometimes", "No"] },
    { id: 10, text: "Do you want to pursue NEET/MBBS?", options: ["Yes", "Sometimes", "No"] }
  ],
  commerce: [
    { id: 1, text: "Are you good with numbers and calculations?", options: ["Yes", "Sometimes", "No"] },
    { id: 2, text: "Do you enjoy business news and stock markets?", options: ["Yes", "Sometimes", "No"] },
    { id: 3, text: "Would you like to start your own business?", options: ["Yes", "Sometimes", "No"] },
    { id: 4, text: "Are you interested in accounting and finance?", options: ["Yes", "Sometimes", "No"] },
    { id: 5, text: "Do you like negotiating and dealing with people?", options: ["Yes", "Sometimes", "No"] },
    { id: 6, text: "Are economics and markets interesting to you?", options: ["Yes", "Sometimes", "No"] },
    { id: 7, text: "Do you want high-paying corporate jobs?", options: ["Yes", "Sometimes", "No"] },
    { id: 8, text: "Are accounts/math your strong subjects?", options: ["Yes", "Sometimes", "No"] }
  ],
  arts: [
    { id: 1, text: "Do you enjoy reading literature and history?", options: ["Yes", "Sometimes", "No"] },
    { id: 2, text: "Are you good at writing essays and creative writing?", options: ["Yes", "Sometimes", "No"] },
    { id: 3, text: "Do you like psychology and understanding people?", options: ["Yes", "Sometimes", "No"] },
    { id: 4, text: "Are social sciences your favorite subjects?", options: ["Yes", "Sometimes", "No"] },
    { id: 5, text: "Do you want to work in media/journalism?", options: ["Yes", "Sometimes", "No"] },
    { id: 6, text: "Are you interested in teaching or civil services?", options: ["Yes", "Sometimes", "No"] },
    { id: 7, text: "Do you like languages and communication?", options: ["Yes", "Sometimes", "No"] },
    { id: 8, text: "Are you creative and artistic?", options: ["Yes", "Sometimes", "No"] }
  ],
  law: [
    { id: 1, text: "Do you enjoy debating and public speaking?", options: ["Yes", "Sometimes", "No"] },
    { id: 2, text: "Are you interested in politics and justice system?", options: ["Yes", "Sometimes", "No"] },
    { id: 3, text: "Do you like reading legal documents/contracts?", options: ["Yes", "Sometimes", "No"] },
    { id: 4, text: "Are you good at logical arguments?", options: ["Yes", "Sometimes", "No"] },
    { id: 5, text: "Do you want to fight for people's rights?", options: ["Yes", "Sometimes", "No"] },
    { id: 6, text: "Are you interested in courtrooms and cases?", options: ["Yes", "Sometimes", "No"] }
  ],
  management: [
    { id: 1, text: "Do you like leading teams and managing people?", options: ["Yes", "Sometimes", "No"] },
    { id: 2, text: "Are you interested in business strategy?", options: ["Yes", "Sometimes", "No"] },
    { id: 3, text: "Do you enjoy marketing and sales?", options: ["Yes", "Sometimes", "No"] },
    { id: 4, text: "Would you like CEO/Management roles?", options: ["Yes", "Sometimes", "No"] },
    { id: 5, text: "Are you good at planning and organizing?", options: ["Yes", "Sometimes", "No"] },
    { id: 6, text: "Do you like corporate world and leadership?", options: ["Yes", "Sometimes", "No"] },
    { id: 7, text: "Are you interested in MBA programs?", options: ["Yes", "Sometimes", "No"] }
  ]
};

// Simple random shuffle
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Get random questions for stream
const getRandomQuestions = (stream) => {
  const questions = mockQuestions[stream] || [];
  const shuffled = shuffleArray([...questions]);
  return shuffled.slice(0, 8);
};

// Get suggestions based on stream
const getSuggestions = (stream) => {
  const careers = {
    engineering: ['Software Engineer', 'Data Scientist', 'Mechanical Engineer', 'Civil Engineer'],
    medical: ['Doctor (MBBS)', 'Dentist', 'Pharmacist', 'Nurse'],
    commerce: ['Chartered Accountant', 'Investment Banker', 'Business Analyst'],
    arts: ['Journalist', 'Civil Services (IAS)', 'Teacher', 'Content Writer'],
    law: ['Corporate Lawyer', 'Judge', 'Legal Advisor'],
    management: ['MBA Graduate', 'Marketing Manager', 'HR Manager', 'Entrepreneur']
  };
  return careers[stream] || ['General Career'];
};

// GET /test/:stream - Get questions for stream (public)
router.get('/:stream', (req, res) => {
  try {
    const { stream } = req.params;
    const questions = getRandomQuestions(stream);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /test - Submit answers (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { stream, answers } = req.body;
    const suggestions = getSuggestions(stream);

    const id = req.user.id;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.careerTestResult = {
      stream,
      answers,
      suggestedCareers: suggestions,
      takenAt: new Date()
    };
    await User.findByIdAndUpdate(id, user);

    res.json({ suggestions });
  } catch (err) {
    console.error('Test submit error:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET /test/result - Get user result (protected)
router.get('/result', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user?.careerTestResult || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
