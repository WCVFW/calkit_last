import React, { useState, useEffect } from "react";
// axios is kept for convention, though not used in frontend logic
import axios from "axios";
import {
  ChevronDown,
  Zap, // For Efficiency/Avoiding Hassles
  Briefcase, // For Business/Simplified Licensing
  ArrowRight,
  Star,
  CheckCircle, // For Checklist/Compliance
  FileText, // For document/Certificate
  Scale, // For Regulation/Classification
  Handshake, // For Government Schemes/Assistance
  TrendingUp, // For Growth/Financial Benefits
  Users, // For Entities/Proprietorships
  DollarSign, // For Financials/Subsidies/Loans
  Clock, // For Timely Delivery/When to Apply
  Landmark, // For Government/Ministry of MSME
  Globe, // For Global Exposure
  Calculator, // For Investment/Turnover Criteria
  RefreshCw, // For Renewal
  Shield,
  Smartphone
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from '../../assets/business.png'; // Reusing a general business image

// --- UDYAM REGISTRATION STATIC DATA DEFINITIONS ---

const udyamTabs = [
  { id: 'udyam-overview-content', label: 'Overview' },
  { id: 'udyam-benefits-content', label: 'Benefits' },
  { id: 'udyam-eligibility-content', label: 'Who Can Apply' },
  { id: 'udyam-criteria-content', label: 'Eligibility Criteria' },
  { id: 'udyam-documents-content', label: 'Documents & Fee' },
  { id: 'udyam-process-content', label: 'Registration Process' },
  { id: 'udyam-schemes-renewal', label: 'Schemes & Renewal' },
  { id: 'udyam-why-vakilsearch', label: 'Why Vakilsearch' },
  { id: 'udyam-faqs-content', label: 'FAQs' },
];

const udyamBenefits = [
  { title: "Access to Government Schemes", icon: Landmark, detail: "Essential to access schemes like Credit Linked Capital Subsidy, Credit Guarantee, and Public Procurement Policy, providing financial support and incentives." },
  { title: "Cheaper Loans & Subsidies", icon: DollarSign, detail: "Access loans at a lower interest rate, collateral-free loans under CGTMSE, and subsidies on electricity bills/IPS." },
  { title: "Seamless Integration", icon: Zap, detail: "Integrates smoothly with the income tax portal, GST systems, and Government e-Marketplace, streamlining administrative tasks." },
  { title: "Protection Against Delayed Payments", icon: Shield, detail: "Seek redressal for delayed payments, ensuring timely payments from buyers." },
  { title: "Priority Sector Lending", icon: TrendingUp, detail: "Recognized under priority sector lending by banks, offering favourable terms for credit facilities and business expansion." },
  { title: "Free ISO Certification", icon: CheckCircle, detail: "Eligible for free ISO certification, enhancing credibility and competitiveness in the market." },
  { title: "Extended MAT Credit", icon: Clock, detail: "Can carry forward the Minimum Alternate Tax (MAT) credit for 15 years, instead of the usual 10 years." },
  { title: "Global Exposure & Licensing", icon: Globe, detail: "Participate in international fairs/trade shows and benefit from a simplified licensing process." },
];

const eligibleEntities = [
  "Proprietorships",
  "Hindu Undivided Family (HUF)",
  "Partnership Firms",
  "One-Person Companies (OPCs)",
  "Private Limited Companies",
  "Limited Companies",
  "Limited Liability Partnerships (LLPs)",
  "Cooperative Societies",
  "Producer Companies",
];

const eligibilityCriteriaManufacturing = [
  "Micro: Investment ≤ ₹1 crore AND turnover ≤ ₹5 crore.",
  "Small: Investment ≤ ₹10 crore AND turnover ≤ ₹50 crore.",
  "Medium: Investment ≤ ₹50 crore AND turnover ≤ ₹250 crore.",
];

const eligibilityCriteriaServices = [
  "Micro: Investment ≤ ₹1 crore AND turnover ≤ ₹5 crore.",
  "Small: Investment ≤ ₹10 crore AND turnover ≤ ₹50 crore.",
  "Medium: Investment ≤ ₹50 crore AND turnover ≤ ₹250 crore.",
];

const udyamDocuments = [
  { title: "Aadhaar Number", detail: "Aadhaar card number of the Proprietor, Managing Partner, Karta, or Authorized Signatory.", icon: Users },
  { title: "PAN Card", detail: "Mandatory for the enterprise from 1 April 2021 onwards.", icon: FileText },
  { title: "GST Number (GSTIN)", detail: "Mandatory only for businesses previously registered under GST Law.", icon: DollarSign },
];

const udyamRegistrationProcess = [
  "Login to Udyam Registration Portal and click 'For New Entrepreneurs...' to begin.",
  "Provide 'Aadhaar Number' & 'Name of Entrepreneur' to validate and generate OTP.",
  "Validate the Aadhaar OTP, then proceed to the PAN validation page. Enter 'Type of Organisation' and PAN number.",
  "Indicate ITR and GSTIN status, then fill all mandatory details (mobile number, enterprise name, address, bank details, activity, NIC code, employment).",
  "Enter details for Plant and Machinery/Equipment and Annual Turnover.",
  "Select Declaration, click Submit to get the Final OTP, enter it, and submit the form.",
  "Receive the Udyam Registration Number (URN) and the Certificate via email."
];

const governmentSchemes = [
  { title: "CGTMSE", detail: "Offers collateral-free loans up to ₹5 Crore with an 85% loan guarantee to support technology upgradation and market development.", icon: DollarSign },
  { title: "PMEGP", detail: "Provides loans and working capital (₹25 Lakh for manufacturing) to foster entrepreneurship and employment generation across India.", icon: Users },
  { title: "RAMP", detail: "Aims to improve MSME access to global markets and credit, enhancing the effectiveness of existing government initiatives with World Bank assistance.", icon: Globe },
];

const udyamRenewalSteps = [
  "Visit the official MSME or Udyam portal and select the 'Update Details' option.",
  "Choose 'Update/Cancel Registration,' enter URN and registered mobile number, and complete OTP verification.",
  "Click the Edit button, update active fields, and enter the ITR details for the previous year.",
  "Click submit to upgrade/renew the registration and update the certificate."
];

const udyamFAQs = [
  { q: "How to Register for Udyam Registration Online?", a: "The process involves logging into the official Udyam portal using your Aadhaar number for validation, followed by entering PAN, GSTIN (if applicable), investment, and turnover details. It is a self-declaration, paperless process." },
  { q: "What is the Udyam Registration Number?", a: "The Udyam Registration Number (URN) is a unique 19-digit identifier assigned to MSMEs upon successful registration. It is the crucial reference number used to access all government benefits and schemes." },
  { q: "What is the Difference Between Udyam and Udyog Aadhaar?", a: "Udyam is the *new* simplified, permanent, and paperless registration system (from July 2020), replacing the older **Udyog Aadhaar Memorandum (UAM)**. All existing UAM holders must re-register under Udyam." },
  { q: "What is the Fee for MSME Registration?", a: "Udyam registration is **free** on the official government portal. Professional service providers may charge a fee for expert assistance to ensure accuracy and smooth filing." },
  { q: "How a Trading Company Can Get Registered for MSME?", a: "Trading activities are now allowed under Udyam registration. A trading company can register by following the standard process and classifying their activity using the appropriate NIC code." },
];

// --- REUSABLE COMPONENTS ---

const ReviewBox = ({ score, reviews, source }) => (
  <div className="bg-white/10 rounded-xl p-3 shadow-lg w-full flex flex-col items-center justify-center border border-white/20">
    <div className="text-yellow-400 flex items-center mb-1">
      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400" />)}
    </div>
    <p className="text-xs font-semibold text-white/80">{source}</p>
    <p className="mt-1 font-bold text-xl text-white">{score}</p>
    <p className="text-xs text-white/90">{reviews}</p>
  </div>
);

const DetailItem = ({ title, description, icon: Icon }) => (
  <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md border-l-4 border-[#022B50]">
    <Icon className="w-5 h-5 text-[#022B50] mt-1 flex-shrink-0" />
    <div>
      <h4 className="font-semibold text-lg text-gray-800 mb-1">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);

const CriteriaTable = ({ title, criteria }) => (
  <div className="p-4 bg-white rounded-lg shadow-md border-t-4 border-amber-500">
    <h5 className="font-bold text-lg text-gray-800 mb-3 flex items-center gap-2"><Calculator className="w-5 h-5" /> {title}</h5>
    <ul className="space-y-3">
      {criteria.map((item, i) => (
        <li key={i} className="text-sm text-gray-700">{item}</li>
      ))}
    </ul>
  </div>
);

// --- TAB CONTENT COMPONENTS (Udyam Registration Content) ---

const UdyamOverviewContent = () => (
  <section id="udyam-overview-content" className="py-12 scroll-mt-24">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">What is Udyam Registration?</h2>
    <p className="text-lg text-gray-700 mb-4 max-w-4xl">
      **Udyam Registration** is a **free and paperless process** for officially registering Micro, Small, and Medium Enterprises (**MSMEs**) in India through the official Udyam portal. It is mandatory for all MSMEs as of 1 July 2020.
    </p>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Upon successful registration, businesses receive a permanent identification number, called the **Udyam Registration Number (URN)**, and the **Udyam Registration Certificate** is sent directly to the registered email ID. This process replaces the older Udyog Aadhaar Memorandum (UAM).
    </p>

    <h3 className="text-2xl font-bold mb-6 text-gray-800">Key Features of Udyam Registration</h3>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700 max-w-5xl">
      <p className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" /> **Free, paperless**, and based on self-declaration.</p>
      <p className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" /> Fully online process using only your **Aadhaar number** for registration.</p>
      <p className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" /> Integrated with **Income Tax and GSTIN systems** for automatic data fetching.</p>
      <p className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" /> **PAN and GST numbers** are mandatory from 1 April 2021.</p>
      <p className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" /> Only **one Udyam Registration per enterprise** is allowed.</p>
      <p className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" /> Existing UAM/EM-II enterprises must re-register.</p>
    </div>
  </section>
);

const UdyamBenefitsContent = () => (
  <section id="udyam-benefits-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-8 text-gray-800">Top 10 Benefits of MSME Udyam Registration</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Udyam registration is the passport for MSMEs to access pivotal government support, financial schemes, and extended tax relief, significantly boosting their growth and security.
    </p>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {udyamBenefits.map((item, i) => (
        <DetailItem
          key={i}
          title={item.title}
          description={item.detail}
          icon={item.icon}
        />
      ))}
    </div>
  </section>
);

const UdyamEligibilityContent = () => (
  <section id="udyam-eligibility-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Who Can Apply For Udyam Registration?</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Udyam Registration is open to all Micro, Small, and Medium Enterprises (MSMEs) engaged in **manufacturing, processing, or providing services**. It accommodates almost every legal business structure operating in India.
    </p>

    <h4 className="text-2xl font-bold mb-6 text-gray-800">Entities Eligible for Udyam Registration</h4>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-700 max-w-5xl">
      {eligibleEntities.map((entity, i) => (
        <div key={i} className="flex items-start gap-2 p-3 bg-indigo-50 rounded-lg shadow-sm border border-indigo-200">
          <Users className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
          <span className="text-gray-700 font-medium">{entity}</span>
        </div>
      ))}
    </div>
  </section>
);

const UdyamCriteriaContent = () => (
  <section id="udyam-criteria-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Detailed Eligibility Criteria for MSME Classification</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Classification as Micro, Small, or Medium is mandatorily based on a composite criterion involving both **Investment in Plant/Machinery/Equipment** and **Annual Turnover**.
    </p>

    <div className="grid md:grid-cols-2 gap-6">
      <CriteriaTable title="Manufacturing and Production" criteria={eligibilityCriteriaManufacturing} />
      <CriteriaTable title="Service Sector" criteria={eligibilityCriteriaServices} />
    </div>

    <h4 className="text-2xl font-bold mb-6 mt-12 text-gray-800">Other Mandatory Criteria & GST Provisions</h4>
    <div className="space-y-4">
      <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md border-l-4 border-amber-500">
        <FileText className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
        <span className="text-gray-700 text-lg">The business must be **registered and operating in India** and should not have been formed by splitting up or reconstructing an existing business.</span>
      </div>
      <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md border-l-4 border-amber-500">
        <DollarSign className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
        <span className="text-gray-700 text-lg">**Special GST registration provisions** exist for small suppliers, including higher turnover limits for exemption from registration in certain cases.</span>
      </div>
    </div>
  </section>
);

const UdyamDocumentsContent = () => (
  <section id="udyam-documents-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Documents Required and Registration Fee</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Udyam Registration is a simple and paperless process based on self-declaration, requiring minimal documents linked to government databases.
    </p>

    <h4 className="text-2xl font-bold mb-6 text-gray-800">List of Documents For Udyam Registration</h4>
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      {udyamDocuments.map((doc, i) => (
        <DetailItem key={i} title={doc.title} description={doc.detail} icon={doc.icon} />
      ))}
    </div>

    <div className="p-6 bg-[#E6F0F6] rounded-xl border-l-4 border-[#022B50] shadow-md">
      <h4 className="font-bold text-2xl text-gray-800 mb-3 flex items-center gap-2"><DollarSign className="w-6 h-6" /> What is The Fee for Udyam Registration?</h4>
      <p className="text-lg text-gray-700">Udyam registration is **FREE** on the official government portal. However, professional assistance to ensure a smooth and error-free process may incur a service fee from expert providers like Vakilsearch.</p>
    </div>
  </section>
);

const UdyamProcessContent = () => (
  <section id="udyam-process-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Step-by-Step Udyam Registration Process</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      The process is executed entirely online using the official Udyam portal. Existing UAM/EM-II enterprises must re-register from 1 July 2020.
    </p>

    <h4 className="text-2xl font-bold mb-6 text-gray-800">Registration Steps (New or Re-registering Enterprises)</h4>
    <ol className="space-y-5 list-none border-l-2 border-[#022B50] pl-4">
      {udyamRegistrationProcess.map((step, i) => (
        <li key={i} className="flex items-start gap-4">
          <div className="bg-[#022B50] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
            {i + 1}
          </div>
          <span className="text-gray-700 text-lg">{step}</span>
        </li>
      ))}
    </ol>

    <h4 className="text-2xl font-bold mb-6 mt-12 text-gray-800">When to Apply for Udyam Registration?</h4>
    <div className="p-5 bg-amber-50/70 rounded-xl shadow-md border-l-4 border-amber-500">
      <p className="text-lg text-gray-700">While not strictly obligatory, it is **highly recommended** that you apply for Udyam registration online **soon after establishment**. Registering early allows entrepreneurs to immediately access the full range of government benefits and schemes.</p>
    </div>
  </section>
);

const UdyamSchemesRenewal = () => (
  <section id="udyam-schemes-renewal" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-8 text-gray-800">Government Schemes and Udyam Renewal</h3>

    <h4 className="text-2xl font-bold mb-6 text-gray-800">Key Government Schemes for Udyam Registered Firms</h4>
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      {governmentSchemes.map((scheme, i) => (
        <DetailItem key={i} title={scheme.title} description={scheme.detail} icon={scheme.icon} />
      ))}
    </div>

    <h4 className="text-2xl font-bold mb-6 text-gray-800">Udyam Registration Renewal Process</h4>
    <p className="text-lg text-gray-700 mb-4 max-w-4xl">
      Renewal is now a **mandatory annual updation** to maintain your MSME classification, ensuring the data remains accurate based on the latest ITR and GSTR filings.
    </p>
    <ol className="space-y-5 list-none border-l-2 border-green-500 pl-4">
      {udyamRenewalSteps.map((step, i) => (
        <li key={i} className="flex items-start gap-4">
          <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
            <RefreshCw className="w-4 h-4" />
          </div>
          <span className="text-gray-700 text-lg">{step}</span>
        </li>
      ))}
    </ol>
  </section>
);

const UdyamWhyVakilsearch = () => (
  <section id="udyam-why-vakilsearch" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Get Udyam Registered with Vakilsearch</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Vakilsearch provides expert-assisted services to simplify the process, ensuring compliance and timely delivery of your Udyam Registration Certificate.
    </p>

    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {/* Feature 1 */}
      <div className="p-6 bg-white rounded-xl shadow-md flex gap-4 items-start">
        <CheckCircle className="w-6 h-6 text-blue-500 mt-1" />
        <div>
          <h3 className="font-bold text-lg mb-1">Eligibility Assessment</h3>
          <p className="text-gray-600 text-sm">
            We ensure you meet all the necessary composite criteria for MSME recognition, confirming your eligibility to access government benefits.
          </p>
        </div>
      </div>

      {/* Feature 2 */}
      <div className="p-6 bg-white rounded-xl shadow-md flex gap-4 items-start">
        <Smartphone className="w-6 h-6 text-blue-500 mt-1" />
        <div>
          <h3 className="font-bold text-lg mb-1">Ease of Access</h3>
          <p className="text-gray-600 text-sm">
            Our 100% online process is user-friendly, minimizing paperwork and streamlining the entire procedure from the comfort of your home.
          </p>
        </div>
      </div>

      {/* Feature 3 */}
      <div className="p-6 bg-white rounded-xl shadow-md flex gap-4 items-start">
        <Handshake className="w-6 h-6 text-blue-500 mt-1" />
        <div>
          <h3 className="font-bold text-lg mb-1">Expert Assistance</h3>
          <p className="text-gray-600 text-sm">
            Receive complete support throughout the registration process, from document preparation to filing and compliance.
          </p>
        </div>
      </div>

      {/* Feature 4 */}
      <div className="p-6 bg-white rounded-xl shadow-md flex gap-4 items-start">
        <Zap className="w-6 h-6 text-blue-500 mt-1" />
        <div>
          <h3 className="font-bold text-lg mb-1">Transparency</h3>
          <p className="text-gray-600 text-sm">
            Clear, transparent communication at every step, ensuring you’re fully informed about your registration status and requirements.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const UdyamFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
  <section id="udyam-faqs-content" className="py-12 max-w-5xl mx-auto scroll-mt-24">
    <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">FAQs on Udyam Registration</h3>

    <div className="space-y-4">
      {faqs.map((f, i) => (
        <div key={i} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <button
            className={`w-full flex justify-between items-center p-5 text-left transition ${faqOpen === i ? 'bg-[#E6F0F6] text-[#022B50]' : 'bg-white hover:bg-gray-50'}`}
            onClick={() => setFaqOpen(faqOpen === i ? null : i)}
          >
            <span className="font-semibold text-lg">{f.q}</span>
            <ChevronDown
              className={`w-6 h-6 transition-transform ${faqOpen === i ? "rotate-180 text-[#022B50]" : "text-gray-500"}`}
            />
          </button>
          <motion.div
            initial={false}
            animate={{ height: faqOpen === i ? "auto" : 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <p className="px-5 py-4 text-gray-700 bg-white">{f.a}</p>
          </motion.div>
        </div>
      ))}
    </div>
  </section>
);


// --- MAIN COMPONENT ---
export default function UdyamRegistrationPage() {
  const [activeTab, setActiveTab] = useState(udyamTabs[0].id);
  const [faqOpen, setFaqOpen] = useState(null);

  const SCROLL_OFFSET = 120;

  // --- SCROLLSPY IMPLEMENTATION ---
  useEffect(() => {
    const sectionIds = udyamTabs.map(tab => tab.id);

    const handleScroll = () => {
      let currentActiveTab = sectionIds[0];

      for (let i = 0; i < sectionIds.length; i++) {
        const sectionId = sectionIds[i];
        const section = document.getElementById(sectionId);

        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= SCROLL_OFFSET) {
            currentActiveTab = sectionId;
          }
        }
      }

      const isScrolledToBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 5;
      if (isScrolledToBottom) {
        currentActiveTab = sectionIds[sectionIds.length - 1];
      }

      setActiveTab(prevActiveTab => {
        if (prevActiveTab !== currentActiveTab) {
          return currentActiveTab;
        }
        return prevActiveTab;
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to handle smooth scrolling when a tab is clicked
  const handleTabClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - SCROLL_OFFSET,
        behavior: 'smooth'
      });
      setActiveTab(id);
    }
  };

  return (
    <div className="bg-white min-h-screen font-[Inter]">
      {/* === HERO SECTION (Udyam Registration Specific) === */}
      <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">

          {/* Background Image Section */}
          <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
            <img
              src={BackgroundImageSrc}
              alt="Udyam Registration background"
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>

          {/* Main Content */}
          <div className="relative flex flex-col lg:flex-row items-start pt-10 pb-12 lg:pb-0 z-20">

            {/* Left Column - Text Content */}
            <div className="w-full lg:w-3/5 text-black p-4 md:p-6 pb-20 relative z-20">

              {/* Breadcrumb */}
              <nav className="text-sm text-gray-800 mb-3">
                <span className="hover:underline cursor-pointer">Home</span> &gt;{" "}
                <span className="font-semibold text-black">Udyam Registration</span>
              </nav>

              {/* Badge */}
              <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                #1 Legal Service Provider In India
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-black">
                Udyam Registration
              </h1>

              {/* Bullet Points with CheckCircle */}
              <div className="space-y-4 mb-8 text-sm lg:text-base text-black">
                <p className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  Online Udyam registration done by experts with timely delivery of your Udyog Aadhar. T&C*
                </p>
                <p className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  **100% online process** with quick filing and processing—save time and avoid hassles.
                </p>
                <p className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  Get expert support at every step to ensure **smooth and compliant registration** (T&C apply).
                </p>
              </div>

              {/* Review Boxes - Repositioned below main content area */}
              <div className="flex flex-wrap gap-4 mt-8">
                <ReviewBox score="4.5/5" reviews="19k+ Happy Reviews" source="Google Reviews" />
                <ReviewBox score="4.5/5" reviews="7500+ Happy Reviews" source="Trustpilot" />
              </div>
              <p className="text-xs text-black/80 font-medium mt-2">Trusted on Google & Trustpilot — Zolvit, India’s No.1 Legal-Tech Platform</p>

            </div>

            {/* Right Column - Form */}
            <div className="w-full lg:w-[350px] relative z-30 lg:mt-0 lg:ml-auto mt-[-100px] sm:mt-[-50px]">
              <div
                className="w-full p-6 md:p-8 rounded-2xl shadow-xl bg-white"
                style={{ borderRadius: '24px', border: '1px solid #E0E0E0' }}
              >
                <h2 className="text-xl font-semibold mb-6 text-black text-center">Get Legal Assistance</h2>

                {/* Form */}
                <form className="space-y-4 text-black">
                  <input
                    className="w-full px-4 py-3 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg text-sm text-black placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="Email"
                  />
                  <input
                    className="w-full px-4 py-3 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg text-sm text-black placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="Mobile Number"
                  />
                  <input
                    className="w-full px-4 py-3 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg text-sm text-black placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="City / Pincode"
                  />

                  {/* WhatsApp Toggle */}
                  <div className="flex items-center justify-between pt-1 text-black">
                    <p className="text-xs md:text-sm font-medium">Get easy updates through Whatsapp</p>
                    <div className="w-10 h-5 bg-gray-300 rounded-full relative cursor-pointer flex items-center p-0.5 transition-colors">
                      <div className="w-4 h-4 bg-white rounded-full shadow-md transform translate-x-0"></div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#113C6D] text-white py-3 font-semibold rounded-lg transition-colors hover:bg-indigo-900 text-base shadow-md mt-4"
                  >
                    Get Started
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* === Main Content Tabs Navigation (Sticky) === */}
      <section className="py-4 md:py-6 px-4 md:px-8 bg-white border-b border-gray-200 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center bg-white rounded-xl w-full text-xs md:text-sm lg:text-base overflow-x-auto border border-gray-200">
            {udyamTabs.map((tab) => (
              <a
                key={tab.id}
                className={`flex flex-col flex-shrink-0 min-w-[100px] md:min-w-[120px] py-3 md:py-4 px-2 text-center font-bold cursor-pointer transition-all ${activeTab === tab.id ? 'bg-[#E6F0F6] border-b-4 border-[#022B50] text-[#022B50]' : 'text-gray-700 hover:bg-gray-50'}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleTabClick(tab.id);
                }}
              >
                <span>{tab.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* === All Tab Content Sections Rendered Sequentially === */}
      <div className="py-2 md:py-4 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <UdyamOverviewContent />
          <UdyamBenefitsContent />
          <UdyamEligibilityContent />
          <UdyamCriteriaContent />
          <UdyamDocumentsContent />
          <UdyamProcessContent />
          <UdyamSchemesRenewal />
          <UdyamWhyVakilsearch />
          <UdyamFAQsContent faqs={udyamFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
        </div>
      </div>

    </div>
  );
}