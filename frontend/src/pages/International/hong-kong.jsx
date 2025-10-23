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
  Landmark,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
// Assume the path for your background image, updated for Hong Kong context
import BackgroundImageSrc from '../../assets/business.png';


// --- HONG KONG REGISTRATION STATIC DATA DEFINITIONS ---

const hkRegTabs = [
  { id: 'hk-overview-content', label: 'Introduction' },
  { id: 'hk-types-content', label: 'Types' },
  { id: 'hk-eligibility-content', label: 'Eligibility' },
  { id: 'hk-documents-content', label: 'Documents Required' },
  { id: 'hk-process-content', label: 'Process' },
  { id: 'hk-cost-timeline', label: 'Cost & Timeline' },
  { id: 'hk-why-vakilsearch', label: 'Why Vakilsearch' },
  { id: 'hk-faqs-content', label: 'FAQs' },
];

const hkAdvantages = [
  {
    title: "Tax-Free Income on Foreign Earnings",
    description: "Only domestic income is taxed, making it a highly tax-efficient jurisdiction for international trade.",
    icon: DollarSign
  },
  {
    title: "100% Foreign Ownership Permitted",
    description: "No local partner is necessary, giving foreign entrepreneurs full control over the company.",
    icon: Globe
  },
  {
    title: "Rapid Incorporation Process",
    description: "Incorporate a company within days through streamlined processes via the Companies Registry.",
    icon: Zap
  },
  {
    title: "No Minimum Capital Requirement",
    description: "You can incorporate a company without the need for minimum paid-up share capital.",
    icon: Scale
  },
  {
    title: "Strong Financial & Banking Network",
    description: "Provides access to overseas banks and various sources of international funding.",
    icon: Landmark
  },
  {
    title: "Global Reputation",
    description: "Establishes immediate confidence among foreign clients, investors, and partners worldwide.",
    icon: CheckCircle
  }
];

const entityTypesDataHK = [
  {
    type: "Private Company Limited by Shares",
    description: "Most suitable for SMEs. Provides limited liability for members, maximum of 50 members, and cannot issue shares to the public.",
    key_points: ["Limited liability", "Max 50 members", "Most common for SMEs"],
  },
  {
    type: "Public Company Limited by Shares",
    description: "For big companies intending to issue shares to the public. Requires over 50 members and has more stringent regulations.",
    key_points: ["Public shares issue", "High compliance", "Suitable for large firms"],
  },
  {
    type: "Company Limited by Guarantee",
    description: "Utilized by non-profit organizations. Has no share capital, and liability is limited to an agreed contribution upon winding up.",
    key_points: ["For non-profits", "No share capital", "Liability by guarantee"],
  },
  {
    type: "Sole Proprietorship",
    description: "One person owns and runs the business. Simple to set up but the owner is personally responsible for all financial liabilities.",
    key_points: ["One owner", "Simple setup", "Unlimited personal liability"],
  },
];

const hkEligibility = [
  "Indian citizens and foreign nationals/entities – All individuals are eligible to incorporate a company in Hong Kong.",
  "At least 1 director and 1 shareholder – Can be one and the same; corporate shareholders are also permitted.",
  "No local resident director necessary – Directors may be located anywhere globally.",
  "Age requirement – Shareholders and directors should be above 18 years of age.",
  "Identity documents – Passport, national ID, and address proof are required for incorporation.",
];

const hkProcessSteps = [
  "Step 1: Choose business structure & name – Select entity type (e.g., Private Limited Company) and provide name options.",
  "Step 2: Upload documents – Submit passport, address proof, and ownership details securely via Zolvit.",
  "Step 3: Get name approved – Zolvit coordinates with the Companies Registry for fast approval.",
  "Step 4: Submit incorporation forms – Complete legal filings on your behalf.",
  "Step 5: Receive Certificate of Incorporation – Official proof of your registered business in Hong Kong.",
  "Step 6: Apply for bank account & license (if required) – Zolvit assists with post-registration setup for smooth operations.",
];

const hkDocumentsRequired = [
  {
    title: "For Company Limited by Shares",
    docs: ["Form NNC1 (Incorporation Form)", "Articles of Association (AoA)", "Notice to Business Registration Office (IRBR1)"]
  },
  {
    title: "For Non-Hong Kong Companies (Branch)",
    docs: ["Form NN1 (Registration Application)", "Certified Copy of Constitution/Charter", "Certified Copy of Specified Certificates", "Certified Copy of Latest Published Accounts", "Notice to Business Registration Office (IRBR2)"]
  },
  {
    title: "For Individuals (Directors/Shareholders)",
    docs: ["Valid Passport/National ID", "Proof of Residential Address", "KYC and Contact Details"]
  }
];

const hkTimeline = [
  { title: "Name approval", duration: "1 working day", icon: Clock },
  { title: "Document filing", duration: "2–3 working days", icon: FileText },
  { title: "Certificate of Incorporation issued", duration: "Within 5–7 working days", icon: CheckCircle }
];

const vakilsearchHKServices = [
  "Expert document handling and compliance checks.",
  "End-to-end support to register with the Companies Registry.",
  "Strong partnerships with global consultants for smooth setup.",
  "100% online process with transparent, affordable prices.",
];

const hkFAQs = [
  { q: "Can Indian citizens register a company in Hong Kong?", a: "Yes, Indian citizens are eligible to register a company in Hong Kong and can own 100% of the shares." },
  { q: "Is a local director mandatory for a Hong Kong company?", a: "No, a local resident director is not mandatory. Directors can be located anywhere globally." },
  { q: "Do I need to be physically present in Hong Kong to incorporate a company?", a: "No, the entire Hong Kong company registration process, including filing and certificate issuance, can be done 100% online." },
  { q: "What taxes do Hong Kong companies pay?", a: "Hong Kong follows a territorial source principle, meaning only profits arising in or derived from Hong Kong are subject to tax. Foreign-sourced income is typically tax-free." },
  { q: "What is the minimum capital required to start a Hong Kong company?", a: "There is no statutory minimum paid-up share capital requirement to incorporate a Private Limited Company." },
  { q: "Can I open a bank account remotely for my Hong Kong company?", a: "Yes, while some banks require an in-person meeting, many global and virtual offshore banks now offer remote account opening assistance for HK companies." },
];


// --- REUSABLE COMPONENTS (Kept for consistency) ---

const ReviewBox = ({ score, reviews, source }) => (
  <div className="bg-white/10 rounded-xl p-3 shadow-lg w-full flex flex-col items-center justify-center border border-white/20">
    <div className="text-yellow-400 flex items-center mb-1">
      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400" />)}
      {/* The image background graphic is dark, so text should be light */}
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


// --- TAB CONTENT COMPONENTS (Hong Kong Content) ---

const HKOverviewContent = () => (
  <section id="hk-overview-content" className="py-12 scroll-mt-24">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Introduction</h2>
    <p className="text-lg text-gray-700 mb-4 max-w-4xl">
      **Hong Kong Company Incorporation** is the legal process of setting up and registering a business entity with the **Hong Kong Companies Registry**. Referred to as one of the finest economic and commercial hubs in the world, Hong Kong offers unparalleled advantages for worldwide entrepreneurs.
    </p>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      The **quick incorporation process**, lesser management, and **high international credibility** make it a sought-after destination for multinational corporations, small and medium-sized enterprises, and start-up businesses. Vakilsearch's expert assistance ensures comfortable and error-free company registration in Hong Kong from India.
    </p>

    <h3 className="text-2xl font-bold mb-6 text-gray-800">Why Start a Company in Hong Kong?</h3>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hkAdvantages.map((advantage, i) => (
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

const HKTypesContent = () => (
  <section id="hk-types-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Types of Companies You Can Register in Hong Kong</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      The most usual and sought-after organization is a **Private Limited Company** in Hong Kong, but other alternatives are also available based on liability and business objectives.
    </p>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {entityTypesDataHK.map((data, i) => (
        <div key={i} className="p-5 bg-white rounded-xl shadow-lg border border-gray-200">
          <h4 className="font-bold text-xl text-[#022B50] mb-3">{data.type}</h4>
          <p className="text-gray-700 text-sm mb-4">{data.description}</p>
          <ul className="space-y-1">
            {data.key_points.map((point, idx) => (
              <li key={idx} className="flex items-center text-green-700 text-xs font-medium">
                <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      ))}
      {/* Placeholder content for other entity types mentioned in the original list:
      Public Company Limited by Shares, Company Limited by Guarantee, Sole Proprietorship, etc.
      The provided data structure only included 4 types, so only 4 are mapped.
      To include all, the 'entityTypesDataHK' array must be expanded.
      */}
    </div>
  </section>
);

const HKEligibilityContent = () => (
  <section id="hk-eligibility-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Eligibility for Hong Kong Company Registration</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Eligibility for setting up an HK company is straightforward, making it highly favorable for international entrepreneurs due to its flexible ownership structures.
    </p>

    <div className="space-y-4">
      {hkEligibility.map((item, i) => (
        <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md border-l-4 border-indigo-500">
          <Users className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
          <span className="text-gray-700 text-lg">{item}</span>
        </div>
      ))}
    </div>
  </section>
);

const HKDocumentsContent = () => (
  <section id="hk-documents-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Documents Required for Hong Kong Business Registration</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      To finalise incorporation, applicants need to submit basic documents for the setup of a Hong Kong company to the Companies Registry.
    </p>

    <div className="grid md:grid-cols-2 gap-8">
      {hkDocumentsRequired.map((category, i) => (
        <div key={i}>
          <h4 className="text-2xl font-bold text-[#022B50] mb-4">{category.title}:</h4>
          <ul className="space-y-3 text-gray-700">
            {category.docs.map((doc, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <FileText className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

const HKProcessContent = () => (
  <section id="hk-process-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">6 Steps to Set Up a Company in Hong Kong (HK)</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      The Hong Kong incorporation process is quick and can be completed online. Here’s how to register a company in Hong Kong with Zolvit’s expert support:
    </p>

    <ol className="space-y-5 list-none border-l-2 border-[#022B50] pl-4">
      {hkProcessSteps.map((step, i) => (
        <ProcessStep key={i} stepNumber={i + 1} step={step} />
      ))}
    </ol>
  </section>
);

const HKCostTimeline = () => (
  <section id="hk-cost-timeline" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Hong Kong Company Registration Cost & Timeline</h3>
    <p className="text-lg text-gray-700 mb-4 max-w-4xl">
      The cost of incorporating a company in Hong Kong is competitive and transparent, covering government fees and legal assistance.
    </p>

    <h4 className="text-2xl font-bold text-[#022B50] mb-4 mt-8">Timeline for Incorporating a Company in Hong Kong:</h4>
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      {hkTimeline.map((item, i) => (
        <div key={i} className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500 shadow-sm">
          <item.icon className="w-6 h-6 text-green-700 mb-2" />
          <h4 className="font-semibold text-lg text-gray-800">{item.title}</h4>
          <p className="text-gray-600 text-sm font-bold">{item.duration}</p>
        </div>
      ))}
    </div>

    <h4 className="text-2xl font-bold text-[#022B50] mb-4 mt-8">Government Registration Fee Breakdown (Examples):</h4>
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
      <p className="text-sm text-gray-700 mb-2">**Company Limited by Shares (Form NNC1):**</p>
      <ul className="list-disc ml-6 text-sm text-gray-600 space-y-1">
        <li>Fee (Electronic Form): **HK$1,545**</li>
        <li>Fee (Hard Copy Form): **HK$1,720**</li>
        <li>Refund if Unsuccessful (Electronic): HK$1,280</li>
      </ul>
      <p className="text-sm text-gray-700 mt-4 mb-2">**Company Limited by Guarantee (with 25 members or less):**</p>
      <ul className="list-disc ml-6 text-sm text-gray-600 space-y-1">
        <li>Fee (Electronic): **HK$155**</li>
        <li>Fee (Hard Copy): **HK$170**</li>
      </ul>
    </div>

    <p className="mt-6 text-sm text-gray-500 italic">
      Note: The cost to incorporate in Hong Kong may vary based on the bank you choose for account opening and any add-on compliance or licensing requirements. Contact us today to get a personalised cost estimate.
    </p>

    <h4 className="text-2xl font-bold text-[#022B50] mb-4 mt-8">Open a Bank Account for Your Hong Kong Company</h4>
    <p className="text-lg text-gray-700 max-w-4xl">
      After incorporation, the next step is to open a Hong Kong business bank account. Zolvit assists in opening global and virtual offshore accounts from good bank partners, simplifying finance management for Indian and foreign entrepreneurs. Banks generally ask for your certificate of incorporation, passport, address certificate, and business license (if applicable).
    </p>
  </section>
);

const HKWhyVakilsearch = () => (
  <section id="hk-why-vakilsearch" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Why Choose Vakilsearch for Hong Kong Company Registration?</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Choosing Zolvit Hong Kong service ensures a trouble-free incorporation journey, whether you are an Indian entrepreneur or an international business owner. With our dedicated team, we provide simple and available support to the offshore company.
    </p>

    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {vakilsearchHKServices.map((service, i) => (
        <div key={i} className="p-5 bg-indigo-50 rounded-xl shadow-sm border border-indigo-200">
          <h4 className="font-bold text-xl text-gray-800 mb-2">{service.split('–')[0].trim()}</h4>
          <p className="text-sm text-gray-600">
            {service.split('–')[1] ? service.split('–')[1].trim() : ''}
          </p>
        </div>
      ))}
    </div>
    <p className="mt-8 text-lg font-bold text-gray-700">
      **Start Your Hong Kong Company with Vakilsearch:** Expand your global reach by incorporating your business in Hong Kong with the help of Vakilsearch. Our expert team provides fast, 100% legal support to ensure a smooth, error-free company registration process.
    </p>
  </section>
);

const HKFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => {
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
export default function HongKongInc() {
  const [activeTab, setActiveTab] = useState(hkRegTabs[0].id);
  const [faqOpen, setFaqOpen] = useState(null);

  // Offset to account for the sticky header height when calculating scroll position
  const SCROLL_OFFSET = 120;

  // --- SCROLLSPY IMPLEMENTATION ---
  useEffect(() => {
    const sectionIds = hkRegTabs.map(tab => tab.id);

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
      {/* === HERO SECTION (Hong Kong Registration Specific) === */}
      <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">

          {/* Background Image Section */}
          <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
            <img
              src={BackgroundImageSrc}
              alt="Hong Kong company registration background"
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
                <span className="hover:underline cursor-pointer">Company Registration</span> &gt;{" "}
                <span className="font-semibold text-black">Hong Kong Company Registration</span>
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
                Hong Kong Company Registration Online
              </h1>

              {/* Bullet Points with Blue Tick */}
              <div className="space-y-4 mb-8 text-sm lg:text-base text-black">
                <p className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  Register your Hong Kong company online and access global markets with ease
                </p>
                <p className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  100% online Hong Kong company registration — no local presence required
                </p>
                <p className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  Get expert support to access Hong Kong’s tax-friendly system, and banking
                </p>
              </div>

            </div>

            {/* Right Column - Form */}
            <div className="w-full lg:w-[350px] relative z-30 lg:mt-0 lg:ml-auto mt-[-100px] sm:mt-[-50px]">
              <div
                className="w-full p-6 md:p-8 rounded-2xl shadow-xl bg-white"
                style={{ borderRadius: '24px', border: '1px solid #E0E0E0' }}
              >
                {/* Offer Header */}
                <h2 className="text-xl font-semibold mb-6 text-black text-center">
                  Incorporate in Hong Kong Hassle-Free
                </h2>
                <img
                  src="/offer-image.png"
                  alt="offer"
                  className="w-10 h-10 object-contain mx-auto mb-4"
                />

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
                  <input
                    className="w-full px-4 py-3 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg text-sm text-black placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="Language"
                  />

                  {/* WhatsApp Toggle */}
                  <div className="flex items-center justify-between pt-1 text-black">
                    <p className="text-xs md:text-sm font-medium">Get easy updates through Whatsapp</p>
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

                  {/* EMI Note */}
                  <p className="text-xs text-black text-center mt-3">
                    Easy monthly EMI options available
                  </p>

                  {/* Confidentiality Note */}
                  <p className="text-[11px] text-black text-center mt-1 italic">
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
            {hkRegTabs.map((tab) => (
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
          {/*           <HKOverviewContent /> */}
          <HKTypesContent />
          <HKEligibilityContent />
          <HKDocumentsContent />
          <HKProcessContent />
          <HKCostTimeline />
          <HKWhyVakilsearch />
          <HKFAQsContent faqs={hkFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
        </div>
      </div>

    </div>
  );
}