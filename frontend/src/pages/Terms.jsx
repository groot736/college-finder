import React from 'react';

export default function Terms() {
  return (
    <div className="min-h-screen pt-20 text-white bg-gradient-to-br from-slate-900 to-blue-900">
      <div className="max-w-4xl px-6 py-16 mx-auto">
        <h1 className="mb-8 text-4xl font-black text-center">Terms of Service</h1>
        <div className="p-8 mb-8 glass rounded-3xl">
          <h2 className="mb-4 text-2xl font-bold">1. Acceptance of Terms</h2>
          <p className="mb-6">By using CollegeFinder, you agree to these Terms of Service. If you do not agree, please do not use our services.</p>
          
          <h2 className="mb-4 text-2xl font-bold">2. Services Provided</h2>
          <p className="mb-6">CollegeFinder provides college discovery, career guidance, and admission assistance tools. We connect students with colleges but do not guarantee admission.</p>
          
          <h2 className="mb-4 text-2xl font-bold">3. User Accounts</h2>
          <ul className="mb-6 space-y-2 list-disc list-inside">
            <li>You must provide accurate information during registration</li>
            <li>Keep your account credentials confidential</li>
            <li>You are responsible for all activities under your account</li>
            <li>Notify us immediately of any unauthorized use</li>
          </ul>
          
          <h2 className="mb-4 text-2xl font-bold">4. College Interactions</h2>
          <p className="mb-6">CollegeFinder acts as a platform to connect students and colleges. We are not responsible for the accuracy of college information or admission decisions.</p>
          
          <h2 className="mb-4 text-2xl font-bold">5. User Conduct</h2>
          <ul className="mb-6 space-y-2 list-disc list-inside">
            <li>No spam, harassment, or illegal activities</li>
            <li>Do not misrepresent your information</li>
            <li>Respect college and other users' privacy</li>
            <li>No commercial use without permission</li>
          </ul>
          
          <h2 className="mb-4 text-2xl font-bold">6. Intellectual Property</h2>
          <p className="mb-6">All content, logos, and designs are property of CollegeFinder. You may not copy or distribute without written permission.</p>
          
          <h2 className="mb-4 text-2xl font-bold">7. Disclaimers & Limitation of Liability</h2>
          <p className="mb-6">Services provided "as is". We are not liable for indirect damages, admission rejections, or career decisions based on our recommendations.</p>
          
          <h2 className="mb-4 text-2xl font-bold">8. Termination</h2>
          <p className="mb-6">We may suspend or terminate accounts for violation of these terms. You can delete your account anytime through settings.</p>
          
          <h2 className="mb-4 text-2xl font-bold">9. Governing Law</h2>
          <p className="mb-6">These terms are governed by Indian law. Disputes will be resolved in courts of Dehradun, Uttarakhand.</p>
          
          <p className="mt-12 text-lg font-semibold text-center">
            Last Updated: March 2025
          </p>
        </div>
      </div>
    </div>
  );
}

