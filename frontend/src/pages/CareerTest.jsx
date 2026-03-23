import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const streams = [
  { id: 'engineering', name: 'Engineering', icon: '⚙️', color: 'from-blue-500 to-indigo-600' },
  { id: 'medical', name: 'Medical', icon: '🩺', color: 'from-green-500 to-emerald-600' },
  { id: 'commerce', name: 'Commerce', icon: '💰', color: 'from-yellow-500 to-orange-600' },
  { id: 'arts', name: 'Arts/Humanities', icon: '📚', color: 'from-purple-500 to-pink-600' },
  { id: 'law', name: 'Law', icon: '⚖️', color: 'from-red-500 to-rose-600' },
  { id: 'management', name: 'Management', icon: '👔', color: 'from-indigo-500 to-purple-600' }
];

export default function CareerTest() {
  const { user } = useAuth();
  const [step, setStep] = useState('select'); // 'select', 'questions', 'result'
  const [selectedStream, setSelectedStream] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadQuestions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get(`/test/${selectedStream}`);
      setQuestions(res.data);
      setAnswers({});
    } catch (err) {
      toast.error('Failed to load questions');
    } finally {
      setLoading(false);
    }
  }, [selectedStream]);

  // Load questions on stream select
  useEffect(() => {
    if (selectedStream && step === 'questions') {
      loadQuestions();
    }
  }, [selectedStream, step, loadQuestions]);

  const handleStreamSelect = (streamId) => {
    setSelectedStream(streamId);
    setStep('questions');
  };

  const handleAnswerChange = (qid, value) => {
    setAnswers({ ...answers, [qid]: value });
  };

  const submitTest = async () => {
    if (!user) {
      toast.error('Please login to save results');
      return;
    }
    if (Object.keys(answers).length < questions.length * 0.5) {
      toast.error('Please answer most questions');
      return;
    }

    try {
      setLoading(true);
      const res = await api.post('/test', { stream: selectedStream, answers });
      setResult(res.data.suggestions);
      setStep('result');
      toast.success('Test completed! Check your career suggestions.');
    } catch (err) {
      toast.error('Failed to submit test');
    } finally {
      setLoading(false);
    }
  };

  const retakeTest = () => {
    setStep('select');
    setSelectedStream('');
    setQuestions([]);
    setAnswers({});
    setResult(null);
  };

  if (step === 'select') {
    return (
      <div className="min-h-screen py-12 pt-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container max-w-4xl px-4 mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="mb-12 text-4xl font-bold text-center tracking-tight text-indigo-900"
          >
            Choose Your Stream
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto mb-16 text-xl text-center text-gray-700"
          >
            Select the field you're interested in. Get personalized career recommendations based on your aptitude!
          </motion.p>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {streams.map((stream) => (
              <motion.button
                key={stream.id}
                onClick={() => handleStreamSelect(stream.id)}
                className={`group relative h-48 rounded-2xl p-8 text-left shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br ${stream.color} text-white`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="mb-4 text-4xl">{stream.icon}</div>
                <h3 className="mb-2 text-2xl font-bold">{stream.name}</h3>
                <p className="text-sm opacity-90">Engineering, IT, Mechanical etc.</p>
                <div className="absolute inset-0 transition-transform duration-300 scale-0 bg-white/10 rounded-2xl group-hover:scale-100" />
              </motion.button>
            ))}
          </div>

          {!user && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="p-6 mt-12 text-center bg-yellow-100 border-2 border-yellow-200 rounded-2xl"
            >
              <p className="mb-2 text-lg font-semibold text-yellow-800">Login to save results!</p>
              <p className="text-yellow-700">Results saved to your profile for future reference</p>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  if (step === 'questions') {
    return (
      <div className="min-h-screen py-12 pt-20 bg-gradient-to-br from-indigo-50 to-purple-100">
        <div className="container max-w-2xl px-4 mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="mb-12 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 mb-4 text-white rounded-full bg-gradient-to-r from-blue-500 to-indigo-600">
              <span className="text-2xl">{streams.find(s => s.id === selectedStream)?.icon}</span>
              <span className="text-lg font-bold">{streams.find(s => s.id === selectedStream)?.name}</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-indigo-900">
              Aptitude Questions
            </h2>
            <p className="text-xl text-gray-600">Answer honestly for accurate recommendations ({Object.keys(answers).length}/{questions.length})</p>
          </motion.div>

          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-block w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-lg text-gray-600">Loading your personalized questions...</p>
            </div>
          ) : (
            <>
              <div className="space-y-6 mb-12 max-h-[70vh] overflow-y-auto">
                {questions.map((q) => (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 border shadow-lg bg-white/70 backdrop-blur-sm rounded-2xl border-white/50"
                  >
                    <p className="mb-4 text-xl font-semibold text-gray-800">{q.text}</p>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                      {q.options.map((opt) => (
                        <label key={opt} className="flex items-center p-3 transition-all bg-white cursor-pointer rounded-xl hover:shadow-md group">
                          <input
                            type="radio"
                            name={`q${q.id}`}
                            value={opt}
                            checked={answers[q.id] === opt}
                            onChange={() => handleAnswerChange(q.id, opt)}
                            className="w-5 h-5 mr-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="font-medium text-gray-800 group-hover:text-blue-600">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className="flex flex-col justify-center gap-4 sm:flex-row"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.button
                  onClick={() => setStep('select')}
                  className="px-8 py-4 font-semibold text-white transition-all shadow-lg bg-gray-500/80 hover:bg-gray-600 rounded-2xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Change Stream
                </motion.button>
                <motion.button
                  onClick={submitTest}
                  disabled={loading}
                  className="px-12 py-4 font-bold text-white transition-all shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? 'Submitting...' : `Get Results (${Object.keys(answers).length}/8)`}
                </motion.button>
              </motion.div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 pt-20 bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container max-w-3xl px-4 mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="p-12 text-center shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl"
        >
          <div className={`inline-flex items-center gap-3 px-8 py-4 mb-8 bg-gradient-to-r ${streams.find(s => s.id === selectedStream)?.color} text-white rounded-2xl mx-auto`}>
            <span className="text-3xl">{streams.find(s => s.id === selectedStream)?.icon}</span>
            <span className="text-xl font-bold">{streams.find(s => s.id === selectedStream)?.name}</span>
          </div>
          
          <h2 className="mb-8 text-4xl font-bold tracking-tight text-indigo-900">
            Your Career Recommendations
          </h2>
          <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2">
            {result?.map((career, index) => (
              <motion.div
                key={career}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-8 transition-all border-2 shadow-lg bg-gradient-to-br from-emerald-400/20 to-green-400/20 rounded-2xl border-emerald-200 hover:shadow-xl"
              >
                <h3 className="mb-4 text-2xl font-bold text-emerald-800">{career}</h3>
                <ul className="ml-6 space-y-1 text-lg list-disc text-emerald-900">
                  <li>High demand in India</li>
                  <li>₹10-50 LPA starting salary</li>
                  <li>Top colleges available</li>
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.button
            onClick={retakeTest}
            className="block px-12 py-4 mx-auto font-bold text-white transition-all shadow-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Retake Test / Try Different Stream
          </motion.button>

          {user && (
            <p className="mt-8 text-sm italic text-gray-600">
              Results saved to your profile! View anytime in Dashboard.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
