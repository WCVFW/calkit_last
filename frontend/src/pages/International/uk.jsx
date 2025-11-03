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
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from '../../assets/business.png';

// --- UK INCORPORATION STATIC DATA DEFINITIONS ---

const ukRegTabs = [
  { id: 'uk-overview-content', label: 'Overview' },
  { id: 'uk-types-content', label: 'Types' },
  { id: 'uk-process-content', label: 'Process' },
  { id: 'uk-documents-content', label: 'Documents Required' },
  { id: 'uk-timeline-cost', label: 'Timeline & Cost' },
  { id: 'uk-how-vakilsearch', label: 'Why Vakilsearch' },
  { id: 'uk-faqs-content', label: 'FAQs' },
];

const ukAdvantages = [
  {
    title: "Ease of Doing Business",
    description: "Incorporation is sharp, usually done within 24 hours, with simple compliance requirements compared to most other countries.",
    icon: Zap
  },
  {
    title: "Luring Tax Regime",
    description: "The UK provides favorable corporate tax rates, double taxation agreements, and relief for startup companies and innovation-based businesses.",
    icon: DollarSign
  },
  {
    title: "Investor Confidence",
    description: "Companies registered in the UK have international recognition and reliability, which facilitates the drawing of foreign investors and partners.",
    icon: Users
  },
  {
    title: "Access to Global Markets",
    description: "Registration provides access to broad opportunities in the UK, Europe, North America, and the rest of the world.",
    icon: Globe
  },
  {
    title: "Easy to Register",
    description: "A UK startup enjoys quicker incorporation, investor confidence, and easier models for business growth globally.",
    icon: CheckCircle
  }
];

const entityTypesDataUK = [
  {
    type: "Private Limited Company (Ltd)",
    description: "Most popular format for entrepreneurs and start-ups. Provides limited liability, simple incorporation, and freedom in ownership. Suitable for SMEs and seeking investor financing.",
    key_points: ["Limited liability", "Simple incorporation", "Suitable for SMEs"],
  },
  {
    type: "Limited Liability Partnership (LLP)",
    description: "Favored by professionals (consultants, accountants, lawyers). Offers the working flexibility of a partnership along with limited liability protection for its members.",
    key_points: ["Limited liability for members", "Partnership flexibility", "Favored by professionals"],
  },
  {
    type: "Public Limited Company (PLC)",
    description: "Appropriate for larger companies. Can raise money by selling shares to the public, but has a higher minimum share capital and more stringent compliance.",
    key_points: ["Raise public capital", "Higher compliance", "High minimum share capital"],
  },
];

const ukProcessSteps = [
  "Choose a Company Name: Select an original name that meets UK naming conventions and check its availability with Companies House.",
  "Choose the Company Structure: Select the appropriate setup—Private Limited (Ltd), LLP, or PLC—based on liability, capital, and compliance needs.",
  "Appoint Directors and Secretary: All firms require a minimum of one director. A secretary is only required for Public Limited Companies (PLCs).",
  "Register a UK Address: Provide a registered office address in the UK (virtual or physical) that will be publicly listed on the Companies House register.",
  "File Incorporation Documents with Companies House: Send the Memorandum of Association, Articles of Association, and director/shareholder information online or by post.",
  "Receive the Certificate of Incorporation: Upon approval, Companies House sends a Certificate of Incorporation, verifying your company's legal existence.",
];

const indianNRIDocumentsUK = [
  "Valid Passport – Main identification document.",
  "Proof of Address in India/Overseas – Last 3 months' utility bill, bank statement, or Aadhaar card.",
  "Photograph & Contact Details – For KYC and company records.",
  "Memorandum of Association – Signed agreement by initial shareholders to form the company.",
  "Articles of Association – Rules for how the company will operate.",
  "Form IN01 – Registration form with company details (directors, shareholders, address).",
  "Statement of Capital – Details of share capital and share value.",
];

const foreignCitizenDocumentsUK = [
  "Valid Passport or National ID – Formal identification document.",
  "Proof of Residential Address – Utility bill, rental contract, or government proof (within 3 months).",
  "Further Legalization (if needed) – Notarization or apostille of documents may be required by some countries.",
];

const ukComplianceRequirements = [
  {
    title: "HMRC Registration",
    details: "All new businesses must register for Corporation Tax with HM Revenue & Customs (HMRC) within 3 months of commencing business activities.",
    icon: Briefcase
  },
  {
    title: "Bank Account Setup",
    details: "A UK corporate bank account is necessary for making transactions, receiving payments, and establishing credibility with partners and investors.",
    icon: DollarSign
  },
  {
    title: "VAT Registration (If Applicable)",
    details: "Companies that cross the VAT threshold (currently £90,000) are required to register for VAT. Voluntary registration is also possible to recover input tax.",
    icon: Scale
  }
];

const vakilsearchUKServices = [
  "Specialised Expertise – Our team has extensive experience in global company formations and understands UK legal and tax frameworks.",
  "End-to-End Support – From choosing the right company type to Companies House filing, HMRC registration, and bank account setup, we handle it all.",
  "Transparent Pricing – No hidden charges—clear packages designed for startups, NRIs, and global entrepreneurs.",
  "100% Online Process – Incorporate your company remotely without the need to travel, saving time and cost.",
];

const ukFAQs = [
  { q: "Can an Indian start a company in the UK?", a: "Yes, Indian citizens and NRIs can register a company in the UK and own 100% of the shares. The process is fully online and doesn't require physical travel." },
  { q: "What are the requirements for UK company registration?", a: "Key requirements include having a minimum of one director, a registered UK office address, a unique company name, and filing the Memorandum and Articles of Association with Companies House." },
  { q: "How long does it take to incorporate a company in the UK?", a: "The UK is one of the quickest jurisdictions. Incorporation usually takes **1–5 working days**, subject to Companies House efficiency and document preparation time." },
  { q: "Do I need a UK address to register a company?", a: "Yes, every registered company must have a physical registered office address in the UK. Many foreign entrepreneurs use a virtual office address for this purpose." },
  { q: "Is a director physically required to be in the UK?", a: "No. The director does not need to be a UK resident or citizen, and their physical presence is not required during the registration process." },
  { q: "What are the tax obligations after UK incorporation?", a: "You must register for Corporation Tax with HMRC within 3 months of starting business activities. You may also need to register for VAT if your turnover exceeds the threshold (£90,000 as of 2024)." },
  { q: "Can I open a UK bank account remotely?", a: "Yes, several UK banks offer remote account opening services for non-residents, especially when using a specialist formation agent like Vakilsearch who has established banking partnerships." },
  { q: "What is Companies House and what role does it play?", a: "Companies House is the UK's registrar of companies. It examines and stores company information and makes it publicly available. It is the authority that officially registers your company." },
  { q: "What are the benefits of a UK limited company?", a: "Benefits include **limited personal liability**, enhanced **international credibility**, a favorable tax regime, and easier access to global markets and foreign investors." },
];


// --- REUSABLE COMPONENTS (Kept for completeness) ---

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

const UKEntityTypeCard = ({ data }) => (
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


// --- TAB CONTENT COMPONENTS (UK Content) ---

const UKOverviewContent = () => (
  <section id="uk-overview-content" className="py-12 scroll-mt-24">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Introduction</h2>
    <p className="text-lg text-gray-700 mb-4 max-w-4xl">
      **UK Company Incorporation** is the process of legally registering a business with **Companies House**, granting it authorized corporate status in the United Kingdom. This service is widely used by startups, **NRIs**, and international entrepreneurs looking to expand globally.
    </p>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      The registration process is administered by Companies House. When registering, you must choose a suitable business structure, such as a private limited company, sole trader, or a corporation. Each offers different levels of personal responsibility, security, and tax costs.
    </p>

    <h3 className="text-2xl font-bold mb-6 text-gray-800">Why Register a Company in the UK?</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      The UK is a highly sought-after location for international entrepreneurs due to its efficient digital processes and limited bureaucracy.
    </p>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ukAdvantages.map((advantage, i) => (
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

const UKTypesContent = () => (
  <section id="uk-types-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Types of Companies You Can Register in the UK</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      When incorporating in the UK, selecting the appropriate structure is vital to complement your business objectives. The primary UK company types are:
    </p>

    <div className="grid md:grid-cols-3 gap-6">
      {entityTypesDataUK.map((data, i) => (
        <UKEntityTypeCard key={i} data={data} />
      ))}
    </div>
  </section>
);

const UKProcessContent = () => (
  <section id="uk-process-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Step-by-Step Process for UK Company Incorporation</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      The process starts with selecting a distinctive name and submitting documents to **Companies House**. For privacy and convenience, most small businesses use a **virtual office address**.
    </p>

    <ol className="space-y-5 list-none border-l-2 border-[#022B50] pl-4">
      {ukProcessSteps.map((step, i) => (
        <ProcessStep key={i} stepNumber={i + 1} step={step} />
      ))}
    </ol>
  </section>
);

const UKDocumentsContent = () => (
  <section id="uk-documents-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Documents Required for Registering a Company in UK</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Founders must provide certain UK company documents for verification to finalize incorporation. The requirements vary for Indian citizens, NRIs, and other foreign nationals.
    </p>

    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h4 className="text-2xl font-bold text-[#022B50] mb-4">For Indian Citizens & NRIs:</h4>
        <ul className="space-y-3 text-gray-700">
          {indianNRIDocumentsUK.map((doc, i) => (
            <li key={i} className="flex items-start gap-2">
              <FileText className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
              <span>{doc}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-2xl font-bold text-[#022B50] mb-4">For Other Foreign Citizens:</h4>
        <ul className="space-y-3 text-gray-700">
          {foreignCitizenDocumentsUK.map((doc, i) => (
            <li key={i} className="flex items-start gap-2">
              <FileText className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-1" />
              <span>{doc}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

const UKTimelineCost = () => (
  <section id="uk-timeline-cost" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Timeline & Cost of Registration</h3>
    <p className="text-lg text-gray-700 mb-4 max-w-4xl">
      The UK company registration **timeline is one of the quickest in the world**, generally requiring **1–5 working days** for incorporation.
    </p>

    <div className="grid md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl mb-8 border border-gray-200">
      <div>
        <h4 className="text-2xl font-bold text-[#022B50] mb-3">Cost Breakdown – UK Company Formation Fee</h4>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>**Government Fee:** Typical Companies House registration fee is about £12 (online) or £40 (paper filing).</li>
          <li>**Professional Service Fees:** Typically ranges from £150–£500, depending on services (name check, address, compliance, banking assistance).</li>
        </ul>
      </div>
      <div>
        <h4 className="text-2xl font-bold text-[#022B50] mb-3">Post-Incorporation Compliance</h4>
        <div className="space-y-4">
          {ukComplianceRequirements.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <item.icon className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h5 className="font-semibold text-gray-800">{item.title}</h5>
                <p className="text-sm text-gray-600">{item.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <p className="text-sm text-gray-500 italic border-t pt-4">
      Disclaimer: Company registration fees in the UK may vary based on government charges, professional services, and business requirements.
    </p>
    <p className="mt-4 text-lg font-bold text-[#022B50]">
      Want clarity on costs? Connect with a vakilsearch expert today for a customised quote and end-to-end registration support.
    </p>
  </section>
);

const UKHowVakilsearch = () => (
  <section id="uk-how-vakilsearch" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Why Choose Vakilsearch for UK Company Incorporation?</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Vakilsearch offers tailored company formation packages designed to meet both local and international needs. We make UK company formation accessible globally, with a fully online, efficient, and legally compliant process.
    </p>

    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {vakilsearchUKServices.map((service, i) => (
        <div key={i} className="p-5 bg-indigo-50 rounded-xl shadow-sm border border-indigo-200">
          <h4 className="font-bold text-xl text-gray-800 mb-2">{service.split('–')[0].trim()}</h4>
          <p className="text-sm text-gray-600">{service.split('–')[1].trim()}</p>
        </div>
      ))}
    </div>
    <p className="mt-8 text-lg font-bold text-gray-700">
      When it comes to UK company registration from India or anywhere globally, Vakilsearch makes the process seamless.
    </p>
  </section>
);

const UKFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => {
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
                className={`w-full flex justify-between items-center p-5 text-left transition-colors duration-300 ${isOpen ? "bg-[#E6F0F6] text-[#022B50]" : "bg-white hover:bg-gray-50 text-black"
                  }`}
                onClick={() => setFaqOpen(isOpen ? null : index)}
              >
                <span className="font-semibold text-lg">{faq.q}</span>
                <ChevronDown
                  className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#022B50]" : "text-gray-500"
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
export default function UKInc() {
  const [activeTab, setActiveTab] = useState(ukRegTabs[0].id);
  const [faqOpen, setFaqOpen] = useState(null);

  // Offset to account for the sticky header height when calculating scroll position
  const SCROLL_OFFSET = 120;

  // --- SCROLLSPY IMPLEMENTATION ---
  useEffect(() => {
    const sectionIds = ukRegTabs.map(tab => tab.id);

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
      {/* === HERO SECTION (UK Incorporation Specific) === */}
      <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">
          {/* Background Image */}
          <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
            <img
              src={BackgroundImageSrc}
              alt="UK company incorporation background"
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="relative flex flex-col lg:flex-row items-start pt-10 pb-12 lg:pb-0 z-20">

            {/* Left Content */}
            <div className="w-full lg:w-3/5 text-black p-4 md:p-6 pb-20 relative z-20">
              {/* Breadcrumb */}
              <nav className="text-sm text-gray-600 mb-3">
                <span className="hover:underline cursor-pointer">Home</span> &gt;{" "}
                <span className="font-semibold text-gray-800">
                  Company Incorporation In UK
                </span>
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
                Company Incorporation In UK
              </h1>

              {/* Bullet Points */}
              <div className="space-y-4 mb-8 text-sm lg:text-base text-gray-800">
                <p className="flex items-start gap-3">
                  <span className="w-4 h-4 bg-blue-500 rounded-full mt-1 flex-shrink-0"></span>
                  Register your UK company online and establish a global business
                  presence.
                </p>
                <p className="flex items-start gap-3">
                  <span className="w-4 h-4 bg-blue-500 rounded-full mt-1 flex-shrink-0"></span>
                  Complete your UK company registration remotely with zero paperwork
                  and fast processing.
                </p>
                <p className="flex items-start gap-3">
                  <span className="w-4 h-4 bg-blue-500 rounded-full mt-1 flex-shrink-0"></span>
                  Get expert guidance to access UK banking, tax advantages, and
                  international credibility.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button className="bg-[#113C6D] hover:bg-indigo-900 text-white font-medium px-6 py-3 rounded-lg shadow-md transition">
                  🚀 Get Started
                </button>
                <button className="bg-white text-[#113C6D] font-medium px-6 py-3 rounded-lg shadow-md transition border border-[#113C6D]">
                  📜 View Sample Incorporation Certificate
                </button>
              </div>
            </div>

            {/* Right Form */}
            <div className="w-full lg:w-[350px] relative z-30 lg:mt-0 lg:ml-auto mt-[-100px] sm:mt-[-50px]">
              <div
                className="w-full p-6 md:p-8 rounded-2xl shadow-xl bg-white"
                style={{ borderRadius: "24px", border: "1px solid #E0E0E0" }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Get Started!
                  </h2>
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
                    <p className="text-xs md:text-sm font-medium">
                      Get easy updates through WhatsApp
                    </p>
                    <div className="w-10 h-5 bg-gray-300 rounded-full relative cursor-pointer flex items-center p-0.5 transition-colors">
                      <div className="w-4 h-4 bg-white rounded-full shadow-md transition-transform transform translate-x-0"></div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#113C6D] text-white py-3 font-semibold rounded-lg transition-colors hover:bg-indigo-900 text-base shadow-md mt-4"
                  >
                    Consult an Expert
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-3 italic">
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
            {ukRegTabs.map((tab) => (
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
          <UKOverviewContent />
          <UKTypesContent />
          <UKProcessContent />
          <UKDocumentsContent />
          <UKTimelineCost />
          <UKHowVakilsearch />
          <UKFAQsContent faqs={ukFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
        </div>
      </div>

    </div>
  );
}