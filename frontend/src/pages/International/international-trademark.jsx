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
  Search, // Icon for search/database
  BookOpen, // Icon for legal framework
} from "lucide-react";
import { motion } from "framer-motion";
// Assume the path for your background image, updated for IP context
import BackgroundImageSrc from '../../assets/business.png';


// --- INTERNATIONAL TRADEMARK STATIC DATA DEFINITIONS ---

const ipRegTabs = [
  { id: 'ip-overview-content', label: 'Overview' },
  { id: 'ip-legal-framework', label: 'Legal Framework' },
  { id: 'ip-eligibility-content', label: 'Eligibility' },
  { id: 'ip-documents-content', label: 'Documents' },
  { id: 'ip-process-content', label: 'Process' },
  { id: 'ip-fees-challenges', label: 'Fees & Challenges' },
  { id: 'ip-why-vakilsearch', label: 'Why Vakilsearch' },
  { id: 'ip-faqs-content', label: 'FAQs' },
];

const ipAdvantages = [
  {
    title: "Trademark Protection Worldwide",
    description: "Protects your brand in over 120 countries through a single, centralized application via WIPO.",
    icon: Globe
  },
  {
    title: "Simplified Application Process",
    description: "File one application (MM2) through your national office instead of filing separately in each jurisdiction.",
    icon: Zap
  },
  {
    title: "Cost-Effective",
    description: "More affordable for protection across multiple countries compared to filing individual national applications.",
    icon: DollarSign
  },
  {
    title: "Long-Term Security",
    description: "Extended protection for up to ten years, with options for subsequent renewal.",
    icon: Clock
  },
  {
    title: "Enforcement of Rights",
    description: "Facilitates efficient legal action against trademark misuse and infringement worldwide.",
    icon: Scale
  },
];

const ipEligibility = [
  "Businesses or individuals with a national trademark registration or a pending national application in a Madrid System member country.",
  "Applicants must be domiciled, have a real and effective industrial or commercial establishment, or be a national of a Madrid Union member.",
  "Eligible jurisdictions include major markets like the United States (US), European Union (EU), and India.",
];

const ipProcessSteps = [
  "Step 1: Trademark Search: Conduct a search (e.g., WIPO Global Brand Database) to ensure the mark is available globally.",
  "Step 2: Filing the International Application: Submit the application (MM2) through your local IP Office (e.g., IP India).",
  "Step 3: Examination by WIPO: WIPO reviews the application for compliance with Madrid Protocol formalities.",
  "Step 4: Examination by National Trademark Offices: WIPO forwards the application, and each designated country examines it based on local law (up to 18 months for objections).",
  "Step 5: Granting International Trademark Protection: Once national offices approve, WIPO issues the International Registration Certificate.",
];

const ipDocumentsRequired = [
  "Identity Proof (Passport, National ID)",
  "Address Proof (Utility bill, bank statement)",
  "Business Registration Documents",
  "International Application Form MM2",
  "Copy of the Trademark",
  "Trademark Registration Certificate/Application Proof from the Domestic Country (Basis Registration)",
];

const ipCostBreakdown = [
  { title: "Basic Application Fee", cost: "700 CHF (Mandatory)", icon: FileText },
  { title: "Complementary Fee", cost: "100 CHF per designated country", icon: DollarSign },
  { title: "Supplementary Fee", cost: "100 CHF per additional class (after the third)", icon: Calculator },
  { title: "Renewal Fee", cost: "Similar to initial cost, due every 10 years", icon: Clock },
];

const ipWhyVakilsearch = [
  "Expert document handling and compliance checks.",
  "End-to-end support, from national filing to WIPO registration and objection management.",
  "Comprehensive knowledge of international trademark law and the Madrid Protocol.",
  "100% online, secure, and reliable process.",
];

const ipFAQs = [
  { q: "What is the process of international trademark registration?", a: "The process involves filing a single application through your national trademark office (the 'office of origin'), which then forwards it to WIPO for examination and notification to your designated member countries." },
  { q: "What is the World Intellectual Property Organization (WIPO)?", a: "WIPO is a specialized UN agency that administers the Madrid System (Agreement and Protocol), acting as the central hub for processing international trademark applications." },
  { q: "Can I apply for an international trademark if I already have a national registration in India?", a: "Yes, you must have an existing national trademark application or registration in India (your country of origin) to use the Madrid System." },
  { q: "What is the renewal period for international trademark registration under the Madrid Protocol?", a: "International trademarks must be renewed every 10 years to maintain continuous protection." },
  { q: "What is the impact of the central attack on my international trademark registration?", a: "The central attack means if your basic national application or registration is successfully challenged and cancelled within the first five years, your entire international registration will also be cancelled." },
  { q: "How can I check the status of my international trademark after filing?", a: "You can track the status using the Madrid Monitor, a free tool provided by WIPO." },
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

const IPSectionListItem = ({ title, content }) => (
    <div className="p-4 bg-white rounded-lg shadow-md border-l-4 border-yellow-600">
        <h5 className="font-semibold text-lg text-gray-800 mb-1">{title}</h5>
        <p className="text-sm text-gray-600">{content}</p>
    </div>
);

// --- TAB CONTENT COMPONENTS (International Trademark Content) ---

const IPOverviewContent = () => (
  <section id="ip-overview-content" className="py-12 scroll-mt-24">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Introduction to International Trademark Registration</h2>
    <p className="text-lg text-gray-700 mb-4 max-w-4xl">
      **International trademark registration**, under the **Madrid Agreement and the Madrid Protocol**, enables businesses to safeguard their trademarks in over 120 countries through a single application. This streamlined process, managed by the **World Intellectual Property Organization (WIPO)**, simplifies global brand protection.
    </p>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      The process begins with a thorough **trademark search** and submission through your local IP office. This method is **cost-effective and time-saving**, enhancing your brand value and facilitating the enforcement of your trademark rights worldwide for a 10-year period, renewable thereafter.
    </p>

    <h3 className="text-2xl font-bold mb-6 text-gray-800">Benefits of International Trademark Registration</h3>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ipAdvantages.map((benefit, i) => (
        <DetailItem
          key={i}
          title={benefit.title}
          description={benefit.description}
          icon={benefit.icon}
        />
      ))}
    </div>
  </section>
);

const IPLegalFramework = () => (
    <section id="ip-legal-framework" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Legal Framework for International Trademark Registration</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            The legal framework is built upon the **Madrid System**, comprising the **Madrid Agreement** and the **Madrid Protocol**, which govern the global protection of trademarks and are administered by WIPO.
        </p>

        <h4 className="text-2xl font-bold text-[#022B50] mb-4">Key Treaties: Madrid Agreement vs. Madrid Protocol</h4>
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#E6F0F6]">
                    <tr>
                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Aspect</th>
                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Madrid Agreement (1891)</th>
                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Madrid Protocol (1989)</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    <tr className="bg-white">
                        <td className="px-4 py-3 text-sm font-semibold text-gray-800">Filing Basis</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Requires prior national registration.</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Allows filing based on a national application OR registration.</td>
                    </tr>
                    <tr className="bg-gray-50">
                        <td className="px-4 py-3 text-sm font-semibold text-gray-800">Languages</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Only in French.</td>
                        <td className="px-4 py-3 text-sm text-gray-700">English, French, and Spanish available.</td>
                    </tr>
                    <tr className="bg-white">
                        <td className="px-4 py-3 text-sm font-semibold text-gray-800">Fee Structure</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Uniform fees.</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Fees vary by country (Individual Fees).</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h4 className="text-2xl font-bold text-[#022B50] mb-4 mt-8">Governing Bodies and International Treaties</h4>
        <div className="grid md:grid-cols-2 gap-6">
            <IPSectionListItem 
                title="Role of WIPO’s International Bureau" 
                content="WIPO acts as the central hub, receiving applications, processing payments (in Swiss francs), and coordinating with national IP offices of designated countries." 
            />
            <IPSectionListItem 
                title="GATT-TRIPS/WTO Influence" 
                content="The TRIPS Agreement established minimum standards for trademark protection that all WTO member states must adhere to, harmonizing international IP rights." 
            />
        </div>
    </section>
);

const IPEligibilityContent = () => (
  <section id="ip-eligibility-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Eligibility and Requirements for International Trademark Registration</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      International trademark registration is available to businesses and individuals who already have a national trademark application or registration in a **Madrid System member country**.
    </p>

    <div className="space-y-4">
      {ipEligibility.map((item, i) => (
        <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md border-l-4 border-indigo-500">
          <Users className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
          <span className="text-gray-700 text-lg">{item}</span>
        </div>
      ))}
    </div>
    
    <h4 className="text-2xl font-bold text-[#022B50] mb-4 mt-8">Eligibility in Major Jurisdictions (e.g., US, EU, India)</h4>
    <div className="grid md:grid-cols-3 gap-6">
        <IPSectionListItem 
            title="India" 
            content="Indian nationals or businesses domiciled in India can apply if they hold a national trademark or a pending application with the Indian Trademark Office." 
        />
        <IPSectionListItem 
            title="United States (US)" 
            content="Applicants must first file a national application or hold a registered trademark with the USPTO before filing under the Madrid Protocol." 
        />
        <IPSectionListItem 
            title="European Union (EU)" 
            content="An applicant with an EU trademark can use it as a basis for international registration. EU residents are eligible." 
        />
    </div>
  </section>
);

const IPDocumentsContent = () => (
  <section id="ip-documents-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Documents Required for International Trademark Registration</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      After conducting a trademark search, the applicant must file the international trademark registration using **Form MM2 (E)** through the Office of the Registrar of Trademarks in India. The following documents are necessary:
    </p>

    <div className="grid md:grid-cols-2 gap-8">
        <div>
            <h4 className="text-2xl font-bold text-[#022B50] mb-4">Core Documents:</h4>
            <ul className="space-y-3 text-gray-700">
                {ipDocumentsRequired.slice(0, 6).map((doc, i) => (
                    <li key={i} className="flex items-start gap-2">
                        <FileText className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                        <span>{doc}</span>
                    </li>
                ))}
            </ul>
        </div>
        <div>
            <h4 className="text-2xl font-bold text-[#022B50] mb-4">Application Details:</h4>
            <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-1" />
                    <span>Description and representation of the trademark (e.g., logo, wordmark).</span>
                </li>
                <li className="flex items-start gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-1" />
                    <span>A list of the goods and services, following the Nice Classification system.</span>
                </li>
                <li className="flex items-start gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-1" />
                    <span>Application must be filed in one of the Madrid System's official languages: English, French, or Spanish.</span>
                </li>
            </ul>
        </div>
    </div>
  </section>
);

const IPProcessContent = () => (
  <section id="ip-process-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">The International Trademark Registration Process (Madrid Protocol)</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      The process allows businesses to protect their trademarks across multiple jurisdictions through a single application, involving examination at both the WIPO and national levels.
    </p>

    <ol className="space-y-5 list-none border-l-2 border-[#022B50] pl-4">
      {ipProcessSteps.map((step, i) => (
        <ProcessStep key={i} stepNumber={i + 1} step={step} />
      ))}
    </ol>
    <p className="mt-8 text-lg text-gray-700 max-w-4xl">
        **Expert Tip:** Applicants can use the **Madrid Monitor** to track the progress of their application and monitor its status through WIPO's system.
    </p>
  </section>
);

const IPFeesChallenges = () => (
  <section id="ip-fees-challenges" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Fees, Renewal, and Challenges in International Trademark Registration</h3>
    <p className="text-lg text-gray-700 mb-4 max-w-4xl">
      The total cost varies based on the number of designated countries and classes of goods/services. Fees are typically paid in Swiss francs (CHF).
    </p>

    <h4 className="text-2xl font-bold text-[#022B50] mb-4 mt-8">Cost Breakdown for International Trademark Registration (CHF)</h4>
    <div className="overflow-x-auto bg-gray-50 p-6 rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-[#E6F0F6]">
                <tr>
                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Fee Type</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Description</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Cost (Typical)</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
                {ipCostBreakdown.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-800">{row.title}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{row.description}</td>
                        <td className="px-4 py-3 text-sm text-red-700 font-bold">{row.cost}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>

    <h4 className="text-2xl font-bold text-[#022B50] mb-4 mt-8">Renewal and Key Challenges</h4>
    <div className="grid md:grid-cols-2 gap-6">
        <IPSectionListItem 
            title="Renewal" 
            content="International trademarks must be renewed every **10 years**. Timely renewal is crucial to avoid losing rights." 
            icon={Clock}
        />
        <IPSectionListItem 
            title="The Central Attack" 
            content="If your basic national registration is successfully challenged and cancelled within the first five years, your entire international registration will also be jeopardized." 
            icon={Briefcase}
        />
    </div>
  </section>
);

const IPWhyVakilsearch = () => (
  <section id="ip-why-vakilsearch" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Why Choose Vakilsearch for International Trademark Registration?</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Choosing Vakilsearch for international trademark registration ensures a seamless and efficient process, backed by expert guidance tailored to your specific needs.
    </p>

    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {ipWhyVakilsearch.map((service, i) => (
        <div key={i} className="p-5 bg-indigo-50 rounded-xl shadow-sm border border-indigo-200">
          <h4 className="font-bold text-xl text-gray-800 mb-2">{service.split('–')[0].trim()}</h4>
          <p className="text-sm text-gray-600">
            {service.split('–')[1] ? service.split('–')[1].trim() : service.split('–')[0].trim()}
          </p>
        </div>
      ))}
    </div>
    <p className="mt-8 text-lg font-bold text-gray-700">
      Partner with Vakilsearch to safeguard your intellectual property while strengthening your position in cross-border business.
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
export default function InternationalTrademark() {
  const [activeTab, setActiveTab] = useState(ipRegTabs[0].id);
  const [faqOpen, setFaqOpen] = useState(null);

  // Offset to account for the sticky header height when calculating scroll position
  const SCROLL_OFFSET = 120;

  // --- SCROLLSPY IMPLEMENTATION ---
  useEffect(() => {
    const sectionIds = ipRegTabs.map(tab => tab.id);

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
      {/* === HERO SECTION (International Trademark Specific) === */}
      <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">

          {/* Background Image Section */}
          <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
            <img
              src={BackgroundImageSrc}
              alt="International trademark background"
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
                <span className="font-semibold text-black">International Trademark Registration</span>
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
                International Trademark Registration
              </h1>

              {/* Bullet Points with Blue Tick */}
              <div className="space-y-4 mb-8 text-sm lg:text-base text-black">
                <p className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  Register your **international trademark** with dedicated IP lawyer support.
                </p>
                <p className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  Expert-led trademark search and filing handled with precision and care.
                </p>
                <p className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  **100% online, secure, and reliable process** for smooth trademark registration.
                </p>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="w-full lg:w-[350px] relative z-30 lg:mt-0 lg:ml-auto mt-[-100px] sm:mt-[-50px]">
              <div
                className="w-full p-6 md:p-8 rounded-2xl shadow-xl bg-white"
                style={{ borderRadius: '24px', border: '1px solid #E0E0E0' }}
              >
                <h2 className="text-xl font-semibold mb-6 text-black text-center">Get Started</h2>

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
                    placeholder="City/Pincode"
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
                    Consult an Expert
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
            {ipRegTabs.map((tab) => (
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
          <IPOverviewContent />
          <IPLegalFramework />
          <IPEligibilityContent />
          <IPDocumentsContent />
          <IPProcessContent />
          <IPFeesChallenges />
          <IPWhyVakilsearch />
          <HKFAQsContent faqs={ipFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} /> 
        </div>
      </div>

    </div>
  );
}