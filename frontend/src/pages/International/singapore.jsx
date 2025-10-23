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

// --- SINGAPORE REGISTRATION STATIC DATA DEFINITIONS ---

const sgRegTabs = [
  { id: 'sg-overview-content', label: 'Introduction' },
  { id: 'sg-advantages-content', label: 'Why Singapore?' },
  { id: 'sg-types-content', label: 'Types' },
  { id: 'sg-process-content', label: 'Process' },
  { id: 'sg-documents-content', label: 'Documents' },
  { id: 'sg-taxation-content', label: 'Taxation & Compliance' },
  { id: 'sg-how-vakilsearch', label: 'Why Vakilsearch' },
  { id: 'sg-faqs-content', label: 'FAQs' },
];

const entityTypesDataSG = [
  {
    type: "Private Limited Company (Pte Ltd)",
    description: "Most popular choice. Provides 100% foreign ownership, limited liability protection, and access to tax incentives/government schemes. Requires a minimum of one local resident director.",
    key_points: ["100% foreign ownership", "Limited liability", "Access to tax benefits"],
  },
  {
    type: "Branch Office",
    description: "An extension of the foreign parent company. It can conduct commercial operations, but the parent company is fully liable for its debts. Suitable for established firms exploring the market.",
    key_points: ["Parent company liability", "Can earn revenue", "Suitable for market exploration"],
  },
  {
    type: "Representative Office",
    description: "A temporary arrangement for foreign businesses to access the market without making a profit (research, networking, liaison). It has lighter regulatory requirements.",
    key_points: ["Cannot generate revenue", "Lighter regulation", "Temporary setup"],
  },
];

const sgAdvantages = [
  {
    title: "Ease of Doing Business",
    description: "Incorporation is completely online and may be done in 1–3 days by ACRA, positioning Singapore as among the quickest jurisdictions for start-ups.",
    icon: Zap
  },
  {
    title: "Global Trade Access",
    description: "With top-of-the-world ports, air access, and more than 80 double tax agreements, Singapore is an access point to Asia-Pacific and the world.",
    icon: Globe
  },
  {
    title: "Low Corporate Tax",
    description: "An attractive 17% headline corporate tax rate, with further exemptions for startups and SMEs, makes it extremely tax-efficient.",
    icon: DollarSign
  },
  {
    title: "Trusted Startup Ecosystem",
    description: "A fintech, logistics, SaaS, biotech, and e-commerce hub, with high government grants and investor trust.",
    icon: Users
  }
];

const sgProcessSteps = [
  "Step 1: Select and Reserve a Company Name: Apply your suggested company name for approval with ACRA. It has to be novel, meaningful, and doesn't violate any trademarks.",
  "Step 2: Supply a Local Registered Address: Every business needs to have a proper local Singapore office address (can be a physical or virtual office) for correspondence purposes.",
  "Step 3: Appoint Shareholders and Directors: Minimum one shareholder (individual or company) and one local resident director. Directors may be Singapore citizens, PRs, or Employment Pass holders.",
  "Step 4: Prepare Incorporation Documents: Prepare the company constitution, along with shareholder and director information, identity proofs, and agreement to be directors/shareholders.",
  "Step 5: File with ACRA: File all the information online using BizFile+, ACRA's e-platform. Upon approval, the Certificate of Incorporation will be sent to you via email.",
  "Step 6: Post-Incorporation Setup: Open a corporate bank account, register for GST (if necessary), and complete periodic compliance obligations.",
];

const indianFoundersDocuments = [
  "Passport – Main ID proof.",
  "Proof of Residential Address – Recent utility bill, bank statement, or Aadhaar card (within 3 months).",
  "KYC Details – Photo, email ID, and contact number.",
  "Shareholder/Director Information – Consent forms and shareholding percentage.",
];

const foreignNationalDocuments = [
  "Valid Passport or National ID – Official identification.",
  "Proof of Overseas Residential Address – Utility bill, driving license, or bank statement (not more than 3 months old).",
  "Additional Legalisation (if necessary) – Some areas might require notarisation or apostille of documents.",
  "Corporate Entity Documents (if shareholder is a company) – Certificate of Incorporation, business profile, and board resolution authorising setup in Singapore.",
];

const sgTaxCompliance = [
  {
    title: "Corporate Tax Rate",
    details: "The normal Singapore corporate tax rate is 17%, but entrepreneurs who are starting businesses are granted partial tax exemptions and incentives. New companies are able to obtain substantial tax relief on the initial S$200,000 of chargeable income for the initial three years.",
    icon: DollarSign
  },
  {
    title: "GST (Goods and Services Tax)",
    details: "Companies need to fulfill GST registration in Singapore if the yearly turnover is more than S$1 million. The GST rate is 9% (as of 2024).",
    icon: Calculator
  },
  {
    title: "Annual Filing & Audit",
    details: "All companies are required to submit annual returns to ACRA and tax filings to IRAS. Small private businesses are exempt from audit if they qualify as a 'small company' (e.g., revenue < S$10 million).",
    icon: FileText
  }
];

const vakilsearchSGServices = [
  "Expert Legal Support – Our specialists ensure your incorporation complies with ACRA regulations, handling documents, shareholder agreements, and director appointments with precision.",
  "End-to-End Assistance from India – Whether you’re an Indian founder or a global entrepreneur, our Singapore registration services allow you to incorporate remotely without travel.",
  "Faster Processing & Post-Incorporation Support – From name approval to bank account setup, GST registration, and compliance management, we provide complete support beyond incorporation.",
];

const sgFAQs = [
  { q: "What is the process to register a company in Singapore?", a: "The process is completed online via ACRA’s BizFile+ portal, involving name reservation, appointing directors/shareholders, securing a local address, and submitting incorporation documents. Service providers like Zolvit can manage this end-to-end." },
  { q: "Can a foreigner register a company in Singapore?", a: "Yes, a foreigner can register a company. However, a Private Limited Company (Pte Ltd) must appoint at least one local resident director (Singapore Citizen, PR, or Employment Pass holder)." },
  { q: "Do I need a local director to incorporate in Singapore?", a: "Yes, a Pte Ltd must appoint at least one local resident director. Foreign directors can be appointed in addition to the local director." },
  { q: "How long does it take to register a company in Singapore?", a: "Incorporation is very fast. If the name is approved, it can take 1 to 3 days for the company to be incorporated by ACRA." },
  { q: "What is the cost of company registration in Singapore?", a: "Registration fees vary depending on the business entity but are generally affordable compared to other financial centers. Service provider fees cover professional support and documentation." },
  { q: "What is ACRA and what role does it play?", a: "ACRA (Accounting and Corporate Regulatory Authority) is Singapore's national regulator of business entities, public accountants and corporate service providers. It is responsible for the incorporation of all business structures." },
  { q: "Can I register a Singapore company from India?", a: "Yes, registration can be done entirely remotely from India or any other country with the help of a registered corporate service provider like Zolvit/Vakilsearch." },
  { q: "Is physical presence required to incorporate in Singapore?", a: "No, physical presence is not required for the incorporation process. It is a 100% online procedure." },
  { q: "What are the post-incorporation compliance requirements?", a: "Key requirements include submitting annual returns to ACRA, tax filings to IRAS, and potentially a statutory audit if the company does not qualify as a 'small company'." },
  { q: "What types of business entities can be set up in Singapore?", a: "The most popular are Private Limited Company (Pte Ltd), Branch Office, and Representative Office, in addition to Limited Liability Partnerships (LLP) and Sole Proprietorships." },
  { q: "What documents and requirements are needed to open a business bank account in Singapore?", a: "Typically, the bank requires the Certificate of Incorporation, Memorandum and Articles of Association (or Constitution), business profile from ACRA, and KYC documents for all directors and signatories. Many banks facilitate remote opening." },
  { q: "What are the tax benefits of incorporating in Singapore?", a: "The corporate tax rate is 17%, with partial tax exemptions for startups and SMEs on their initial chargeable income, making it highly tax-efficient." },
];


// --- REUSABLE COMPONENTS ---


const ReviewBox = ({ score, reviews, source }) => (
  <div className="bg-white/10 rounded-xl p-3 shadow-lg w-full flex flex-col items-center justify-center border border-white/20">
    <div className="text-yellow-400 flex items-center mb-1">
      {/* Star icon rendering for visual rating */}
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

// New component for Singapore Entity Types
const SGEntityTypeCard = ({ data }) => (
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

const FooterColumn = ({ title, links }) => (
  <div>
    <h4 className="font-bold text-base text-gray-900 mb-3">{title}</h4>
    <ul className="space-y-2">
      {links.map((link, i) => (
        <li key={i}>
          <a href="#" className="text-sm text-gray-600 hover:text-[#022B50] transition-colors">
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);


// --- TAB CONTENT COMPONENTS (SINGAPORE Reg Content) ---

const SGOverviewContent = () => (
  <section id="sg-overview-content" className="py-12 scroll-mt-24">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Introduction</h2>
    <p className="text-lg text-gray-700 mb-4 max-w-4xl">
      When incorporating in Singapore, it's vital to understand the legal requirements and business structures, especially for **Limited Liability Partnerships** or **Sole Proprietorships**. You must provide all documents required by **ACRA**, such as identity proof, business address, and shareholder information.
    </p>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Different structures have varying levels of liability, with partnerships potentially having unlimited liability, so selecting the right structure based on your risk appetite and business needs is essential. Registration fees are generally affordable compared to other financial centers.
    </p>

    <div className="p-6 bg-[#E6F0F6] rounded-xl border-l-4 border-[#022B50] shadow-md">
      <p className="text-gray-800 font-semibold">
        **Zolvit** can assist you throughout the process, from document preparation to compliance, ensuring your Singapore company registration is **fast, accurate, and error-free**.
      </p>
      <p className="text-xs text-gray-500 mt-2">
        (Note: Zolvit and Vakilsearch are used interchangeably based on the original content provided.)
      </p>
    </div>
  </section>
);

const SGAdvantagesContent = () => (
  <section id="sg-advantages-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-8 text-gray-800">Why Start a Company in Singapore?</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      The advantages of incorporating a company in Singapore make it one of the most attractive destinations for global entrepreneurs. Consistently ranked as one of the most business-friendly countries, Singapore offers a pro-investment environment combined with excellent global connectivity.
    </p>

    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
      {sgAdvantages.map((advantage, i) => (
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

const SGTaxesContent = () => (
  <section id="sg-taxation-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Taxation & Compliance in Singapore</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Singapore has a tax-beneficial system and streamlined compliance structure, making it a favorite among international businessmen. The important requirements are:
    </p>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sgTaxCompliance.map((item, i) => (
        <div key={i} className="p-5 bg-white rounded-xl shadow-lg border border-gray-200">
          <item.icon className="w-8 h-8 text-yellow-600 mb-3" />
          <h4 className="font-bold text-lg text-gray-800 mb-2">{item.title}</h4>
          <p className="text-sm text-gray-600">{item.details}</p>
        </div>
      ))}
    </div>
  </section>
);

const SGTypesContent = () => (
  <section id="sg-types-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Types of Business Registration in Singapore</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Foreign investors and entrepreneurs can select from various structures based on their compliance needs, ownership desires, and objectives. The most popular are:
    </p>

    <div className="grid md:grid-cols-3 gap-6">
      {entityTypesDataSG.map((data, i) => (
        <SGEntityTypeCard key={i} data={data} />
      ))}
    </div>
  </section>
);

const SGProcessContent = () => (
  <section id="sg-process-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Step-by-Step Process for Company Registration in Singapore</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      The Singapore incorporation process is quick and entirely online, making it one of the most effective jurisdictions for international entrepreneurs. Here's what it takes to register a company in Singapore using the **ACRA** procedure:
    </p>

    <ol className="space-y-5 list-none border-l-2 border-[#022B50] pl-4">
      {sgProcessSteps.map((step, i) => (
        <ProcessStep key={i} stepNumber={i + 1} step={step} />
      ))}
    </ol>
    <p className="mt-8 text-lg text-gray-700 max-w-4xl">
      With **Zolvit’s expert support**, you can complete every step of the company registration process efficiently. We assist with selecting the appropriate business structure, preparing and reviewing all required documents, submitting your application to ACRA, and appointing a qualified corporate secretary. Our team ensures full compliance with Singapore’s regulatory requirements and handles all administrative tasks on your behalf.
    </p>
  </section>
);

const SGDocumentsContent = () => (
  <section id="sg-documents-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Documents Required for Singapore Company Registration</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Founders are required to submit identity and compliance documents to finalise incorporation with ACRA. The following are the important documents for Singapore company formation:
    </p>

    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h4 className="text-2xl font-bold text-[#022B50] mb-4">For Indian Founders:</h4>
        <ul className="space-y-3 text-gray-700">
          {indianFoundersDocuments.map((doc, i) => (
            <li key={i} className="flex items-start gap-2">
              <FileText className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
              <span>{doc}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs italic text-gray-500">
          Note: Aadhaar card is for residential proof only; Passport is the main ID proof.
        </p>
      </div>
      <div>
        <h4 className="text-2xl font-bold text-[#022B50] mb-4">For Other Foreign Nationals:</h4>
        <ul className="space-y-3 text-gray-700">
          {foreignNationalDocuments.map((doc, i) => (
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


const SGHowVakilsearch = () => (
  <section id="sg-how-vakilsearch" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Why Vakilsearch for Singapore Company Registration?</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Choosing the right partner makes all the difference in smooth incorporation. With **Vakilsearch Singapore incorporation**, you get a trusted team that simplifies every step of the process.
    </p>

    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vakilsearchSGServices.map((service, i) => (
        <div key={i} className="p-5 bg-indigo-50 rounded-xl shadow-sm border border-indigo-200">
          <h4 className="font-bold text-xl text-gray-800 mb-2">{service.split('–')[0].trim()}</h4>
          <p className="text-sm text-gray-600">{service.split('–')[1].trim()}</p>
        </div>
      ))}
    </div>
  </section>
);

const SGFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => {
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


// --- MAIN COMPONENT (Renamed and Adapted) ---
export default function SingaporeInc() {
  const [activeTab, setActiveTab] = useState(sgRegTabs[0].id);
  const [faqOpen, setFaqOpen] = useState(null);

  // Offset to account for the sticky header height when calculating scroll position
  const SCROLL_OFFSET = 120;

  // --- SCROLLSPY IMPLEMENTATION ---
  useEffect(() => {
    const sectionIds = sgRegTabs.map(tab => tab.id);

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
      {/* === HERO SECTION (SINGAPORE Reg Specific) === */}
      <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">
          {/* Background Image Section */}
          <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
            <img
              src={BackgroundImageSrc}
              alt="Singapore company registration background"
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
                <span className="font-semibold text-gray-800">Register a Company in Singapore</span>
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
                Company Registration in Singapore Online
              </h1>

              {/* Bullet Points */}
              <div className="space-y-4 mb-8 text-sm lg:text-base text-gray-800">
                <p className="flex items-start gap-3">
                  <span className="w-4 h-4 bg-blue-500 rounded-full mt-1 flex-shrink-0"></span>
                  Register your Singapore company online and launch your business in Asia’s financial hub.
                </p>
                <p className="flex items-start gap-3">
                  <span className="w-4 h-4 bg-blue-500 rounded-full mt-1 flex-shrink-0"></span>
                  Complete your Singapore company registration 100% online with a fast turnaround.
                </p>
                <p className="flex items-start gap-3">
                  <span className="w-4 h-4 bg-blue-500 rounded-full mt-1 flex-shrink-0"></span>
                  Get expert support to access tax advantages, corporate banking, and global credibility.
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
                    Talk to an Expert
                  </button>

                  {/* Confidentiality Note */}
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
            {sgRegTabs.map((tab) => (
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
          <SGOverviewContent />
          <SGAdvantagesContent />
          <SGTypesContent />
          <SGProcessContent />
          <SGDocumentsContent />
          <SGTaxesContent />
          <SGHowVakilsearch />
          <SGFAQsContent faqs={sgFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
        </div>
      </div>

    </div>
  );
}