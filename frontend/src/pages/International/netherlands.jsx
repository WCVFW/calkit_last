import React, { useState, useEffect } from "react";
// axios is kept for convention, though not used in frontend logic
import axios from "axios";
import {
  ChevronDown,
  MapPin,
  Zap,
  Briefcase,
  ArrowRight,
  Users,
  Star,
  CheckCircle,
  FileText,
  Scale,
  Smartphone,
  Calculator,
  Download,
  Globe,
  DollarSign,
  Landmark, // Icon for KVK/Notary
  Clock, // Icon for timeline/speed
} from "lucide-react";
import { motion } from "framer-motion";
// Assume the path for your background image, updated for Netherlands context
import BackgroundImageSrc from '../../assets/business.png';


// --- NETHERLANDS REGISTRATION STATIC DATA DEFINITIONS ---

const nlRegTabs = [
  { id: 'nl-overview-content', label: 'Overview' },
  { id: 'nl-advantages-content', label: 'Benefits' },
  { id: 'nl-types-content', label: 'Types' },
  { id: 'nl-process-content', label: 'Process' },
  { id: 'nl-documents-content', label: 'Documents' },
  { id: 'nl-cost-compliance', label: 'Cost & Compliance' },
  { id: 'nl-why-vakilsearch', label: 'Why Vakilsearch?' },
  { id: 'nl-faqs-content', label: 'FAQs' },
];

const nlAdvantages = [
  {
    title: "Strategic Status in Europe",
    description: "The Netherlands is strategically located in the middle, with easy access to the most important European markets.",
    icon: MapPin
  },
  {
    title: "Stylish Tax Regime",
    description: "Companies benefit from extensive double tax agreements and competitive corporate tax rates.",
    icon: DollarSign
  },
  {
    title: "Rapid Incorporation",
    description: "The process of incorporating Dutch companies is accelerated and efficient, making setup quick.",
    icon: Zap
  },
  {
    title: "Access to the EU Market",
    description: "Dutch registered companies gain full, unhindered access to the EU's vast internal market.",
    icon: Globe
  }
];

const entityTypesDataNL = [
  {
    type: "BV (Besloten Vennootschap / Private Limited Company)",
    description: "The most used type among entrepreneurs and foreign investors. Provides limited liability and variable shareholding. Suits small and large enterprises.",
    key_points: ["Limited liability", "Variable shareholding", "Most popular choice"],
  },
  {
    type: "NV (Naamloze Vennootschap / Public Limited Company)",
    description: "Used by large companies seeking external investments. Has public trade in shares and requires a higher minimum share capital than the BV.",
    key_points: ["Public share trade", "Higher capital required", "Suits large entities"],
  },
  {
    type: "Branch Office",
    description: "A foreign business can open a branch without creating a separate Dutch legal unit. The original business retains full responsibility for the branch operation.",
    key_points: ["No separate legal entity", "Parent company liability", "Local commercial presence"],
  },
  {
    type: "Sole Proprietorship (Eenmanszaak)",
    description: "A low-cost, simple setup suitable for freelancers or small companies. The owner has complete control but also unlimited personal liability.",
    key_points: ["Low cost, simple setup", "Complete owner control", "Unlimited personal liability"],
  },
];

const nlProcessSteps = [
  "1. Selection of Business Structure: Assist you in selecting the most appropriate legal form (BV, NV, VOF, etc.), which influences tax and liability.",
  "2. Company Name Check and Reservation: Check name availability with the Dutch Chamber of Commerce (KVK) and reserve it.",
  "3. Residence and Address Requirements: Assist with obtaining necessary residence permits/BSN and organizing a Dutch business address (physical or virtual).",
  "4. Preparation of Documents and Legal Formalities: Prepare Articles of Association, director/shareholder info, and liaise with Dutch notaries for legal entity enrollments (BV, NV).",
  "5. Registration with the Dutch Chamber of Commerce (KVK): Finish KVK registration, including form submission and assisting in obtaining KVK number, SBI code, and RSIN.",
  "6. VAT and Tax Registration: Register with the Dutch Tax Administration (Belastingdienst) for VAT (BTW) number, Company income tax, and Payroll tax.",
  "7. Setup of Business Bank Account: Help open a Dutch business bank account and pay in the minimum share capital (for BV/NV).",
  "8. Final Registration and Activation: Ensure all fees are paid and information in the Business Register is correct and regularly updated.",
];

const nlDocumentsIndividuals = [
  "Valid Passport or ID Proof – Copy of the identification document.",
  "Proof of Address – Utility bill, bank statement, or rental agreement (not more than 3 months old).",
  "Business Plan – Summarizes activities, financial projections, and organization.",
  "Notarized Articles of Association (AoA) – Drawn up and signed in front of a Dutch notary (for BV/NV).",
  "Shareholder & Director Details – With ownership structure and contact details.",
];

const nlDocumentsCorporate = [
  "Certificate of Incorporation – Documenting legal existence of parent company.",
  "Extract from Trade Register – Indicating company directors and representatives.",
  "Board Resolution – Resolving the formation of the Dutch entity.",
  "UBO (Ultimate Beneficial Owner) registration details.",
  "Bank Reference or Proof of Capital Deposit – For BV/NV incorporation.",
];

const nlCostBreakdown = [
  { title: "Government Fees (KVK)", cost: "Around €75 (one-time)", icon: Landmark },
  { title: "Notary Fees", cost: "Starting from €500–€1,000 (depending on complexity, for BV/NV)", icon: FileText },
  { title: "Professional Service Fees", cost: "Starts from €1,000–€2,500 (for full assistance)", icon: Users },
  { title: "Additional Costs", cost: "Translation, apostille, and virtual office services (variable)", icon: DollarSign },
];

const nlComplianceRequirements = [
  { title: "Accounting & Bookkeeping", details: "Keep proper books of accounts as per Dutch GAAP or IFRS. Annual accounts must be submitted to the Chamber of Commerce.", icon: Calculator },
  { title: "Annual Returns & Filings", details: "Submit annual financial statements and tax returns (corporate income tax, VAT, and payroll tax if required).", icon: FileText },
  { title: "Local Director (If Applicable)", details: "Although not mandatory, a Dutch-resident director can prove convenient for tax residence purposes and easier compliance.", icon: Users },
  { title: "Registered Office Address", details: "All companies need to keep a local Dutch office address (virtual or physical) for official correspondence and legal mail.", icon: MapPin },
];

const vakilsearchNLServices = [
  "End-to-End Assistance – From selecting the right structure to bank account opening and tax registration.",
  "Legal & Compliance Support – Drafting incorporation documents, liaising with Dutch notaries, and ensuring compliance with local regulations.",
  "No Physical Presence Needed – Complete your Dutch business setup remotely through our team, without the need to travel.",
  "Tailored Advisory – Guidance on tax benefits, structuring, and expansion across the EU market.",
];

const nlFAQs = [
  { q: "Can foreigners register a company in the Netherlands?", a: "Yes, foreigners can register various entities (like the BV) and own 100% of the shares. No physical presence is required for the setup process." },
  { q: "What is the minimum capital required for a Dutch BV?", a: "The minimum share capital for a BV (Private Limited Company) is currently €0.01." },
  { q: "How long does it take to register a company in the Netherlands?", a: "The process is relatively quick. Once all documents are prepared and notarized, registration with the KVK can take a few business days." },
  { q: "Do I need to be in the Netherlands to start a business?", a: "No, the entire Dutch business setup, including KVK registration and bank account opening, can be facilitated remotely with professional assistance." },
  { q: "What is the difference between BV and NV in the Netherlands?", a: "A BV (Private Limited) is the standard private company used by most startups. An NV (Public Limited) is designed for large companies that intend to publicly trade shares and has higher capital requirements." },
  { q: "What role does a civil law notary play in the company formation process in the Netherlands?", a: "A civil law notary is mandatory for legal entities like the BV and NV. They draft and notarize the Articles of Association, which is essential for registration with the KVK." },
  { q: "Can I open a bank account for my company in the Netherlands while I live abroad?", a: "Yes, many major Dutch banks offer remote or digital account opening, especially when working with a qualified formation partner." },
];


// --- REUSABLE COMPONENTS (Kept for consistency) ---

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

const ProcessStep = ({ stepNumber, step }) => (
  <li className="flex items-start gap-4">
    <div className="bg-[#022B50] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
      {stepNumber}
    </div>
    <span className="text-gray-700 text-lg">{step}</span>
  </li>
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

const NLEntityTypeCard = ({ data }) => (
  <div className="p-5 bg-white rounded-xl shadow-lg border border-gray-200">
    <h4 className="font-bold text-xl text-[#022B50] mb-3">{data.type}</h4>
    <p className="text-gray-700 text-sm mb-4">{data.description}</p>
    <ul className="space-y-1">
      {data.key_points.map((point, i) => (
        <li key={i} className="flex items-center text-green-700 text-xs font-medium">
          <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
          {point}
        </li>
      ))}
    </ul>
  </div>
);

// --- TAB CONTENT COMPONENTS (Netherlands Content) ---

const NLOverviewContent = () => (
  <section id="nl-overview-content" className="py-12 scroll-mt-24">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Introduction</h2>
    <p className="text-lg text-gray-700 mb-4 max-w-4xl">
      **Netherlands Company Registration** is the legal procedure for creating a business entity in the Netherlands, one of Europe's most desirable centers for global business. Many entrepreneurs and investors register trade in the Netherlands because of the benefits: **EU entry**, **tax advantages**, and **investor-friendly rules** worldwide.
    </p>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Whether you want to establish a Dutch trading company, technology company, or financial company, the Netherlands ensures a safe economy, favorable location, and strong infrastructure that makes it the most preferred country for company registration in Europe.
    </p>

    <h3 className="text-2xl font-bold mb-6 text-gray-800">Why Business Registration in Netherlands?</h3>

    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
      {nlAdvantages.map((advantage, i) => (
        <DetailItem
          key={i}
          title={advantage.title}
          description={advantage.description}
          icon={advantage.icon}
        />
      ))}
    </div>
  </section>
);

const NLTypesContent = () => (
  <section id="nl-types-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Types of Business Registration in the Netherlands</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Choosing the right business entity is essential for legal compliance and operational success. The main types of business structures available include:
    </p>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {entityTypesDataNL.map((data, i) => (
        <NLEntityTypeCard key={i} data={data} />
      ))}
    </div>
  </section>
);

const NLProcessContent = () => (
  <section id="nl-process-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Step-by-Step Process for Company Registration in Netherlands</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Setting up a business in the Netherlands requires precise adherence to Dutch administrative and legal requirements. Zolvit streamlines the entire process, ensuring a hassle-free experience.
    </p>

    <ol className="space-y-5 list-none border-l-2 border-[#022B50] pl-4">
      {nlProcessSteps.map((step, i) => (
        <ProcessStep key={i} stepNumber={i + 1} step={step} />
      ))}
    </ol>
  </section>
);

const NLDocumentsContent = () => (
  <section id="nl-documents-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Documents Required for Dutch Company Registration</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      The requirements depend on whether the applicant is an individual founder or a corporate body (parent company/investor).
    </p>

    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h4 className="text-2xl font-bold text-[#022B50] mb-4">For Individuals (Founders/Shareholders):</h4>
        <ul className="space-y-3 text-gray-700">
          {nlDocumentsIndividuals.map((doc, i) => (
            <li key={i} className="flex items-start gap-2">
              <FileText className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
              <span>{doc}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-2xl font-bold text-[#022B50] mb-4">For Corporate Bodies (Parent Company/Investors):</h4>
        <ul className="space-y-3 text-gray-700">
          {nlDocumentsCorporate.map((doc, i) => (
            <li key={i} className="flex items-start gap-2">
              <FileText className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-1" />
              <span>{doc}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
      <h4 className="font-semibold text-lg text-gray-800">Additional Requirements for All Applicants:</h4>
      <p className="text-sm text-gray-600 mt-1">
        UBO (Ultimate Beneficial Owner) registration, proof of a Dutch company address, and a declaration of consent if a third-party address is used. Legal structures (BV, NV) require notarized documents and engagement with a Dutch notary.
      </p>
    </div>
  </section>
);

const NLCostCompliance = () => (
  <section id="nl-cost-compliance" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Company Registration in Netherlands Cost & Compliance</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      The final business setup fee depends on the structure and services required, but here is a typical cost breakdown:
    </p>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {nlCostBreakdown.map((item, i) => (
        <div key={i} className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500 shadow-sm">
          <item.icon className="w-6 h-6 text-red-700 mb-2" />
          <h4 className="font-semibold text-lg text-gray-800">{item.title}</h4>
          <p className="text-gray-600 text-sm font-bold">{item.cost}</p>
        </div>
      ))}
    </div>

    <h4 className="text-2xl font-bold text-gray-800 mt-12 mb-6">Post-Incorporation Compliance Requirements</h4>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      To remain in good standing, firms need to fulfill recurring Netherlands company maintenance requirements:
    </p>

    <div className="grid md:grid-cols-2 gap-6">
      {nlComplianceRequirements.map((item, i) => (
        <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md border-l-4 border-yellow-600">
          <item.icon className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h5 className="font-semibold text-gray-800">{item.title}</h5>
            <p className="text-sm text-gray-600">{item.details}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const NLWhyVakilsearch = () => (
  <section id="nl-why-vakilsearch" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Why Vakilsearch for Netherlands Company Registration?</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Setting up a business abroad can feel complex, but with Zolvit (Vakilsearch) you get seamless support for company registration in the Netherlands from India or anywhere in the world. Our experts simplify every step with:
    </p>

    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {vakilsearchNLServices.map((service, i) => (
        <div key={i} className="p-5 bg-indigo-50 rounded-xl shadow-sm border border-indigo-200">
          <h4 className="font-bold text-xl text-gray-800 mb-2">{service.split('–')[0].trim()}</h4>
          <p className="text-sm text-gray-600">{service.split('–')[1].trim()}</p>
        </div>
      ))}
    </div>
  </section>
);

const NLFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => {
  return (
    <section id="ip-faqs-content" className="py-12 max-w-5xl mx-auto scroll-mt-24">
      <h3 className="text-3xl font-bold mb-8 text-black text-center">
        FAQs on International Trademark Registration
      </h3>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = faqOpen === index;
          return (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              {/* Question Button */}
              <button
                className={`w-full flex justify-between items-center p-5 text-left transition-colors duration-300 ${
                  isOpen ? "bg-[#E6F0F6] text-[#022B50]" : "bg-white hover:bg-gray-50 text-black"
                }`}
                onClick={() => setFaqOpen(isOpen ? null : index)}
              >
                <span className="font-semibold text-lg">{faq.q}</span>
                <ChevronDown
                  className={`w-6 h-6 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-[#022B50]" : "text-gray-500"
                  }`}
                />
              </button>

              {/* Answer Panel */}
              <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: "hidden" }}
              >
                <p className="px-5 py-4 text-black bg-white">{faq.a}</p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};


// --- MAIN COMPONENT ---
export default function NetherlandsInc() {
  const [activeTab, setActiveTab] = useState(nlRegTabs[0].id);
  const [faqOpen, setFaqOpen] = useState(null);

  // Offset to account for the sticky header height when calculating scroll position
  const SCROLL_OFFSET = 120;

  // --- SCROLLSPY IMPLEMENTATION ---
  useEffect(() => {
    const sectionIds = nlRegTabs.map(tab => tab.id);

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
      {/* === HERO SECTION (Netherlands Registration Specific) === */}
      <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">
          {/* Background Image Section */}
          <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
            <img
              src={BackgroundImageSrc}
              alt="Netherlands company registration background"
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>

          {/* Main Content */}
          <div className="relative flex flex-col lg:flex-row items-start pt-10 pb-12 lg:pb-0 z-20">

            {/* Left Column - Text Content */}
            <div className="w-full lg:w-3/5 text-black p-4 md:p-6 pb-20 relative z-20">

              {/* Breadcrumb */}
              <nav className="text-sm text-gray-600 mb-3">
                <span className="hover:underline cursor-pointer">Home</span> &gt;{" "}
                <span className="hover:underline cursor-pointer">Company Registration</span> &gt;{" "}
                <span className="font-semibold text-gray-800">Business Registration in Netherlands</span>
              </nav>

              {/* Badge */}
              <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                <img
                  src="/badge-icon.png"
                  alt="badge"
                  className="w-4 h-4 object-contain"
                />
                #1 Legal Service Provider In India
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-black">
                Company Registration in Netherlands – Process, Cost & Benefits
              </h1>

              {/* Bullet Points */}
              <div className="space-y-4 mb-8 text-sm lg:text-base text-gray-800">
                <p className="flex items-start gap-3">
                  <span className="w-4 h-4 bg-blue-500 rounded-full mt-1 flex-shrink-0"></span>
                  Register your Netherlands company online and enter the European market with confidence.
                </p>
                <p className="flex items-start gap-3">
                  <span className="w-4 h-4 bg-blue-500 rounded-full mt-1 flex-shrink-0"></span>
                  Complete your Dutch company registration remotely — no physical presence required.
                </p>
                <p className="flex items-start gap-3">
                  <span className="w-4 h-4 bg-blue-500 rounded-full mt-1 flex-shrink-0"></span>
                  Get expert support to access EU tax benefits, banking, and international opportunities.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button className="bg-[#113C6D] hover:bg-indigo-900 text-white font-medium px-6 py-3 rounded-lg shadow-md transition">
                  🚀 Get Started!
                </button>
                <button className="bg-white text-[#113C6D] font-medium px-6 py-3 rounded-lg shadow-md transition border border-[#113C6D]">
                  📜 View Sample Incorporation Certificate
                </button>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="w-full lg:w-[350px] relative z-30 lg:mt-0 lg:ml-auto mt-[-100px] sm:mt-[-50px]">
              <div
                className="w-full p-6 md:p-8 rounded-2xl shadow-xl bg-white"
                style={{ borderRadius: '24px', border: '1px solid #E0E0E0' }}
              >
                {/* Offer Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Get Started!</h2>
                  <img
                    src="/offer-image.png"
                    alt="offer"
                    className="w-10 h-10 object-contain"
                  />
                </div>

                {/* Form */}
                <form className="space-y-4">
                  <input
                    className="w-full px-4 py-3 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg text-sm text-gray-700 placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="Email"
                  />
                  <input
                    className="w-full px-4 py-3 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg text-sm text-gray-700 placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="Mobile Number"
                  />
                  <input
                    className="w-full px-4 py-3 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg text-sm text-gray-700 placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="City / Pincode"
                  />
                  <input
                    className="w-full px-4 py-3 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg text-sm text-gray-700 placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="Language"
                  />

                  {/* WhatsApp Toggle */}
                  <div className="flex items-center justify-between pt-1 text-gray-700">
                    <p className="text-xs md:text-sm font-medium">Get easy updates through WhatsApp</p>
                    <div className="w-10 h-5 bg-gray-300 rounded-full relative cursor-pointer flex items-center p-0.5 transition-colors">
                      <div className="w-4 h-4 bg-white rounded-full shadow-md transition-transform transform translate-x-0"></div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#113C6D] text-white py-3 font-semibold rounded-lg transition-colors hover:bg-indigo-900 text-base shadow-md mt-4"
                  >
                    Get Started
                  </button>

                  {/* EMI Note */}
                  <p className="text-xs text-gray-600 text-center mt-3">
                    Easy monthly EMI options available
                  </p>

                  {/* Confidentiality Note */}
                  <p className="text-[11px] text-gray-500 text-center mt-1 italic">
                    No Spam. No Sharing. 100% Confidentiality.
                  </p>
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
            {nlRegTabs.map((tab) => (
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
          <NLOverviewContent />
          <NLTypesContent />
          <NLProcessContent />
          <NLDocumentsContent />
          <NLCostCompliance />
          <NLWhyVakilsearch />
          <NLFAQsContent faqs={nlFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
        </div>
      </div>

    </div>
  );
}