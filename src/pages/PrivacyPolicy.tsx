import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative flex flex-col min-h-screen bg-black text-white">
      <Navbar />

      <div className="flex-grow pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto w-full">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            PRIVACY POLICY
          </h1>
          <span className="mt-2 px-3 py-1 rounded-full bg-[#0055FF]/20 text-xs font-bold tracking-widest uppercase text-[#0055FF] border border-[#0055FF]/30">
            WEBSITE
          </span>
        </div>
        
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <p className="font-bold text-white mb-8">Effective Date: March 15, 2026</p>

          <p>
            Welcome to the Verzz website (the "Site"), operated by Verzz ("we," "us," or "our"). This Privacy Policy applies <strong>only</strong> to the informational landing page and website and explains how we collect, use, and protect any information you provide when visiting this Site.
          </p>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl my-8">
            <p className="text-sm italic m-0">
              <strong>Please note:</strong> This policy does not cover the Verzz App/Platform, user accounts, or financial advisory services. A separate, comprehensive Privacy Policy will govern the use of the core Verzz platform and any services involving SEBI-registered professionals.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4 tracking-tight">1. Information We Collect [Including Cookies]</h2>
          <p>Because this Site currently functions primarily as an informational landing page, we collect minimal data from our visitors:</p>
          <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-400">
            <li><strong>Cookies and Technical Data:</strong> We use strictly necessary functional cookies (e.g., to remember your layout preferences and cookie consent status). These cookies are non-identifying and are automatically deleted after a set period (maximum of 7 days). We <strong>do not</strong> use third-party tracking, analytics, or advertising cookies on this landing page.</li>
            <li><strong>Voluntarily Provided Information:</strong> If you contact us via email, or submit a "contact" or "waitlist" form, we collect the information you voluntarily provide (such as your name and email address).</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4 tracking-tight">2. How We Use Your Information</h2>
          <p>Any information we collect on this Site is used exclusively to:</p>
          <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-400">
            <li>Ensure the Site functions properly and remember your essential layout preferences.</li>
            <li>Respond to your direct inquiries or customer support requests.</li>
            <li>Add you to our communications or waitlist (only if you explicitly sign up).</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4 tracking-tight">3. How We Share Your Information</h2>
          <p>We respect your privacy and do not sell, rent, or trade your personal information. We may only share information in the following limited circumstances:</p>
          <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-400">
            <li><strong>Service Providers:</strong> With trusted third-party hosting or web infrastructure partners who assist us in operating our Site (such tools are bound by strict confidentiality).</li>
            <li><strong>Legal Requirements:</strong> If required by law, court order, or governmental regulation.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4 tracking-tight">4. Data Security</h2>
          <p className="mb-6">
            We implement commercially reasonable security measures to protect the minimal data collected on this Site. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4 tracking-tight">5. Third-Party Links</h2>
          <p className="mb-6">
            Our Site may contain links to other websites. This Privacy Policy applies <strong>only</strong> to this landing page. We are not responsible for the privacy practices of any other sites.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4 tracking-tight">6. Children's Privacy</h2>
          <p className="mb-6">
            Our Site is not directed to individuals under the age of 18. We do not knowingly collect personal information from children on this landing page.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4 tracking-tight">7. Changes to This Privacy Policy</h2>
          <p className="mb-6">
            We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4 tracking-tight">8. Contact Us</h2>
          <p className="mb-6">
            If you have any questions or concerns about this website-only Privacy Policy, please contact us at:
            <br />
            <strong>Email:</strong> Will be updated soon
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default PrivacyPolicy;
