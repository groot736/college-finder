import React from 'react';

export default function Privacy() {
  return (
    <div className="min-h-screen pt-20 text-white bg-gradient-to-br from-slate-900 to-blue-900">
      <div className="max-w-4xl px-6 py-16 mx-auto">
        <h1 className="mb-8 text-4xl font-black text-center">Privacy Policy</h1>
        <div className="p-8 mb-8 glass rounded-3xl">
          <h2 className="mb-4 text-2xl font-bold">1. Information We Collect</h2>
          <p className="mb-6">We collect personal information such as name, email, phone number, and educational details when you register or submit admission requests. This helps us provide personalized college recommendations and career guidance.</p>
          
          <h2 className="mb-4 text-2xl font-bold">2. How We Use Your Information</h2>
          <ul className="mb-6 space-y-2 list-disc list-inside">
            <li>Matching you with suitable colleges based on your profile</li>
            <li>Providing career test results and recommendations</li>
            <li>Facilitating communication between students and colleges</li>
            <li>Improving our recommendation systems and services</li>
          </ul>
          
          <h2 className="mb-4 text-2xl font-bold">3. Data Security</h2>
          <p className="mb-6">Your data is encrypted and stored securely. We follow industry-standard security practices and comply with Indian data protection laws.</p>
          
          <h2 className="mb-4 text-2xl font-bold">4. Sharing Information</h2>
          <p className="mb-6">We only share your information with colleges you explicitly request contact from, or for verification purposes. We never sell your data to third parties.</p>
          
          <h2 className="mb-4 text-2xl font-bold">5. Your Rights</h2>
          <ul className="mb-6 space-y-2 list-disc list-inside">
            <li>Access, update, or delete your personal information</li>
            <li>Opt-out of communications</li>
            <li>Request data export</li>
            <li>Withdraw consent at any time</li>
          </ul>
          
          <h2 className="mb-4 text-2xl font-bold">6. Cookies & Tracking</h2>
          <p className="mb-6">We use essential cookies for site functionality and analytics cookies to improve user experience. You can manage preferences in browser settings.</p>
          
          <h2 className="mb-4 text-2xl font-bold">7. Changes to Policy</h2>
          <p className="mb-6">We may update this policy. Significant changes will be notified via email or on our homepage.</p>
          
          <p className="mt-12 text-lg font-semibold text-center">
            Last Updated: March 2025
          </p>
        </div>
      </div>
    </div>
  );
}

