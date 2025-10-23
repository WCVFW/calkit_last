import React, { useState, useEffect } from "react";
// axios is kept for convention, though not used in frontend logic
import axios from "axios";
import {
  ChevronDown,
  Zap, // For Efficiency/Expertise
  Briefcase, // For Business/Corporate Structure
  ArrowRight,
  Star,
  CheckCircle, // For Compliance/Legal Operation
  FileText, // For document/Forms
  Scale, // For Regulation/State Laws
  Handshake, // For Trust/Clientele
  TrendingUp, // For Hospitality/Growth
  Users, // For Applicants/Directors
  DollarSign, // For Fees/Revenue/Sales
  Clock, // For Validity/Renewal
  Landmark, // For State Excise Department/Legal Framework
  MapPin,
  Globe,
  AlertTriangle,
  Lightbulb // For Premises/Location
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from '../../assets/business.png'; // Reusing a general business image

// --- LIQUOR LICENSE STATIC DATA DEFINITIONS ---

const liquorTabs = [
  { id: 'liquor-overview-content', label: 'Overview' },
  { id: 'liquor-types-content', label: 'Types' },
  { id: 'liquor-need-content', label: 'Need' },
  { id: 'liquor-documents-content', label: 'Documents Required' },
  { id: 'liquor-validity-renewal', label: 'Validity & Renewal' },
  { id: 'liquor-why-vakilsearch', label: 'Why Vakilsearch?' },
  { id: 'liquor-faqs-content', label: 'FAQs' },
];

const liquorOverview = {
  detail: "Securing a liquor license is a critical stride towards adhering to legal regulations while presenting clientele with an extensive array of drink selections in the hospitality, entertainment, or retail sectors.",
};

const liquorTypes = [
  { title: "Retail Liquor License", detail: "Permits selling pre-packaged alcoholic beverages for **consumption off-site** (liquor stores, wine shops).", icon: Briefcase },
  { title: "Hotel and Restaurant License", detail: "Granted to hotels, restaurants, bars, and pubs aiming to offer alcoholic beverages **on their premises**.", icon: TrendingUp },
  { title: "Club License", detail: "For social and recreational clubs to dispense alcohol to their **members exclusively** within the club premises.", icon: Users },
  { title: "Temporary Event License", detail: "Issued for particular occasions like festivals, weddings, or exhibitions where **temporary** alcohol service is desired.", icon: Clock },
  { title: "Wholesale License", detail: "Granted to distributors and wholesalers procuring alcohol from manufacturers and supplying retail establishments.", icon: Handshake },
  { title: "Import and Export License", detail: "Imperative for enterprises importing or exporting alcoholic beverages across borders.", icon: Globe },
  { title: "FL-3 / CL-4 / FL-2 Licenses", detail: "Categories for foreign or country liquor tailored for luxury hotels (FL-3), rural areas (CL-4), or moderately priced hotels (FL-2).", icon: DollarSign },
];

const liquorDocuments = [
  "Applicant's Identity Proof and Address Proof",
  "Address Proof of the Premises Used (Rent Agreement, etc.)",
  "No Objection Certificate from the Fire Department",
  "No Objection Certificate from the Municipal Corporation",
  "List of Directors/MOA/AOA (for Companies)",
  "Copy of Latest Income Tax Return",
  "Photograph of an Authorized Person",
  "Affidavit of No Past Criminal Record",
  "Affidavit of Non-Defaulter",
  "Application with Business Details",
];

const liquorNeed = [
  { title: "Mandatory for Alcohol Businesses", detail: "A Liquor License, granted by the state excise department, is essential if your business involves selling, distributing, or manufacturing alcohol and alcoholic beverages.", icon: Scale },
  { title: "Compliance with State Regulations", detail: "Liquor laws are included in Schedule VII (State List) of the Indian Constitution, making state-specific regulations mandatory for legal operation.", icon: Landmark },
  { title: "State Oversight", detail: "State governments rigorously monitor alcohol sales and consumption within their boundaries, necessitating a thorough understanding of your state's unique liquor laws.", icon: Briefcase },
  { title: "Avoid Legal Consequences", detail: "Engaging in activities like manufacturing, transport, possession, or sale of liquor without a valid License can lead to severe legal penalties (fines, imprisonment).", icon: AlertTriangle },
];

const liquorValidityRenewal = {
  validity: "A Liquor License is initially valid for **one year** from the issuance date.",
  renewal: "Annual renewal is necessary to sustain validity. Renewal entails submitting the designated application form on the State Excise Department's website, along with the applicable renewal fee.",
  fees: "The State Excise Department determines the renewal fee, which varies according to the license type or class. Commendable conduct may qualify for a fee reduction.",
  revocation: "A license may face revocation for dispensing liquor on **Dry Days**, serving alcoholic beverages to **Minors**, or contravening established state excise regulations.",
  laws: "Laws governing alcohol sales differ from state to state, with some states (like Bihar, Gujarat) being 'Dry States'. Individuals aged 21+ are eligible for a license, but age restrictions for consumption (often 25) must be strictly adhered to.",
};

const whyVakilsearch = [
  "Expertise in Legal Procedures: Our professionals are well-versed in the legal processes and complex, state-specific documentation required for obtaining a liquor license.",
  "Streamlined Process: We offer a streamlined and efficient application process, saving you valuable time and effort in documentation and submissions.",
  "Navigating Regulations: Our experts have up-to-date knowledge of varying state regulations, ensuring your application meets all complex requirements.",
  "Documentation Assistance: We assist in preparing and organizing all required documents, reducing the chances of errors or omissions that might delay the process.",
  "Timely Renewals: We provide timely reminders and assistance in renewing your license annually, ensuring you remain compliant and avoid penalties.",
];

const liquorFAQs = [
  { q: "What is a liquor license, and why is it important?", a: "A liquor license is a legal permit granted by the State Excise Department, mandatory for businesses involved in the production, distribution, or sale of alcohol. It ensures compliance with state laws and avoids legal penalties." },
  { q: "What types of licenses are available for alcohol-related businesses?", a: "Types vary by state but commonly include Retail (Off-site consumption), Hotel/Restaurant (On-site consumption), Club, Wholesale, Temporary Event, and specific Foreign/Country Liquor Licenses (FL-3, CL-4)." },
  { q: "Are there specific age restrictions for obtaining a liquor license?", a: "Individuals aged **21 and above** are generally eligible to apply for a Liquor License. However, age restrictions for consuming alcohol vary by state, often being 21 or 25." },
  { q: "Can I serve alcohol without a liquor license?", a: "No. Serving, selling, or manufacturing alcohol without a valid liquor license is illegal and can lead to severe legal consequences, including heavy fines, closure, and imprisonment." },
  { q: "How long does it take to get a liquor license?", a: "Processing time varies significantly by state, license type, and local authority inspections (Fire, Municipal). It can range from a few weeks (temporary) to several months (permanent licenses)." },
  { q: "How do I know which type of license is right for my business?", a: "The correct license type depends on your primary business model: Retail License (packaged sales only), Hotel/Restaurant License (on-premise service), or Wholesale License (distribution only). Expert consultation is recommended." },
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

const LicenseTypeBox = ({ title, detail, icon: Icon }) => (
  <div className="p-5 bg-white rounded-xl shadow-lg border border-gray-200">
    <Icon className="w-6 h-6 text-amber-500 mb-2" />
    <h4 className="font-bold text-lg text-gray-800 mb-1">{title}</h4>
    <p className="text-sm text-gray-600">{detail}</p>
  </div>
);


// --- TAB CONTENT COMPONENTS (Liquor License Content) ---

const LiquorOverviewContent = () => (
  <section id="liquor-overview-content" className="py-12 scroll-mt-24">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Liquor License Registration - The Critical Permit</h2>
    <p className="text-lg text-gray-700 mb-4 max-w-4xl">
      {liquorOverview.detail}
    </p>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      The scope of a legitimate liquor license in India encompasses a broad spectrum concerning activities such as **liquor production, import, export, transportation, possession, acquisition, and vending**, as stipulated by varying state legislations and regulations.
    </p>
  </section>
);

const LiquorTypesContent = () => (
  <section id="liquor-types-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-8 text-gray-800">Types of Liquor Licenses in India</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Liquor licensing is highly segmented to regulate different activities, from simple retail sales to sophisticated hotel service and large-scale distribution.
    </p>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {liquorTypes.map((type, i) => (
        <LicenseTypeBox key={i} title={type.title} detail={type.detail} icon={type.icon} />
      ))}
    </div>
  </section>
);

const LiquorNeedContent = () => (
  <section id="liquor-need-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-8 text-gray-800">What is the Need to Obtain a Liquor License?</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      The mandatory nature of the liquor license is rooted in the **Indian Constitution (Article 47)** and **Schedule VII**, which place alcohol regulation squarely under the State's jurisdiction.
    </p>

    <div className="grid md:grid-cols-2 gap-6 mb-12">
      {liquorNeed.map((item, i) => (
        <DetailItem key={i} title={item.title} description={item.detail} icon={item.icon} />
      ))}
    </div>

    <h4 className="text-2xl font-bold mb-6 text-gray-800">Classification of Liquor Licenses (By Usage)</h4>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Beer and Wine License */}
      <div className="p-6 bg-white rounded-xl shadow-md flex gap-4 items-start">
        <Briefcase className="w-6 h-6 text-blue-500 mt-1" />
        <div>
          <h3 className="font-bold text-lg mb-1">Beer and Wine License</h3>
          <p className="text-gray-600 text-sm">
            For selling soft and mild beverages; prohibits the sale of hard liquor.
          </p>
        </div>
      </div>

      {/* Restaurant Liquor License */}
      <div className="p-6 bg-white rounded-xl shadow-md flex gap-4 items-start">
        <TrendingUp className="w-6 h-6 text-blue-500 mt-1" />
        <div>
          <h3 className="font-bold text-lg mb-1">Restaurant Liquor License</h3>
          <p className="text-gray-600 text-sm">
            Primarily for eateries reliant on food sales; capped liquor sales (not surpassing 40% of total sales).
          </p>
        </div>
      </div>

      {/* Tavern Liquor License */}
      <div className="p-6 bg-white rounded-xl shadow-md flex gap-4 items-start">
        <DollarSign className="w-6 h-6 text-blue-500 mt-1" />
        <div>
          <h3 className="font-bold text-lg mb-1">Tavern Liquor License</h3>
          <p className="text-gray-600 text-sm">
            For businesses that derive a substantial proportion of their profits from alcohol sales, despite offering food.
          </p>
        </div>
      </div>

      {/* Brewpub Liquor License */}
      <div className="p-6 bg-white rounded-xl shadow-md flex gap-4 items-start">
        <Zap className="w-6 h-6 text-blue-500 mt-1" />
        <div>
          <h3 className="font-bold text-lg mb-1">Brewpub Liquor License</h3>
          <p className="text-gray-600 text-sm">
            Conferred upon those who produce or brew their own beer and wine.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const LiquorDocumentsContent = () => (
  <section id="liquor-documents-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Documents Required for Obtaining a Liquor License</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      The application process is rigorous, demanding extensive documentation to verify the applicant's identity, the premises' suitability, and the entity's financial and legal standing.
    </p>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {liquorDocuments.map((doc, i) => (
        <div key={i} className="flex items-start gap-3 p-4 bg-red-50 rounded-lg shadow-md border-l-4 border-red-500">
          <FileText className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
          <span className="text-gray-700 font-medium">{doc}</span>
        </div>
      ))}
    </div>
  </section>
);

const LiquorValidityRenewal = () => (
  <section id="liquor-validity-renewal" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Validity, Renewal, and Revocation of License</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      A Liquor License requires mandatory annual renewal. Strict adherence to the State Excise Department's rules is necessary to prevent revocation or legal action.
    </p>

    <div className="grid md:grid-cols-2 gap-8">
      <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
        <h4 className="font-bold text-xl text-gray-800 mb-3 flex items-center gap-2"><Clock className="w-5 h-5 text-amber-500" /> Validity and Renewal Process</h4>
        <p className="text-lg text-gray-700 font-semibold mb-2">Initial validity is **one year** from the issuance date.</p>
        <p className="text-gray-700">Renewal entails submitting the application form and the renewal fee to the State Excise Department's website annually. Commendable conduct may qualify for a **fee reduction**.</p>
      </div>
      <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
        <h4 className="font-bold text-xl text-gray-800 mb-3 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-red-500" /> Grounds for Revocation</h4>
        <ul className="space-y-3 text-gray-700 mt-4 border-l-4 border-red-500 pl-4">
          <li className="flex items-start gap-2">Dispensing Liquor on **Designated Dry Days**.</li>
          <li className="flex items-start gap-2">Serving Alcoholic Beverages to **Minors** (below age 25 in some states).</li>
          <li className="flex items-start gap-2">Contravening the regulations and statutes established by the state excise department.</li>
        </ul>
      </div>
    </div>
  </section>
);

const LiquorWhyVakilsearch = () => (
  <section id="liquor-why-vakilsearch" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Why Vakilsearch for Liquor License Application?</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Applying for a liquor license involves complex, state-specific regulations and bureaucratic procedures. Our expert assistance offers a streamlined, error-free path to compliance.
    </p>

    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {whyVakilsearch.map((service, i) => {
        const Icon = i % 5 === 0 ? Lightbulb : i % 5 === 1 ? Zap : i % 5 === 2 ? Scale : i % 5 === 3 ? FileText : Clock;
        const [title, detail] = service.split(':').map(s => s.trim());
        return (
          <div key={i} className="p-5 bg-indigo-50 rounded-xl shadow-sm border border-indigo-200 flex items-start gap-3">
            <Icon className="w-6 h-6 text-[#022B50] mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-lg text-gray-800 mb-1">{title}</h4>
              <p className="text-sm text-gray-600">{detail}</p>
            </div>
          </div>
        );
      })}
    </div>
  </section>
);

const LiquorFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
  <section id="liquor-faqs-content" className="py-12 max-w-5xl mx-auto scroll-mt-24">
    <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">FAQs on Apply for Liquor License Online</h3>

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
export default function LiquorLicensePage() {
  const [activeTab, setActiveTab] = useState(liquorTabs[0].id);
  const [faqOpen, setFaqOpen] = useState(null);

  const SCROLL_OFFSET = 120;

  // --- SCROLLSPY IMPLEMENTATION ---
  useEffect(() => {
    const sectionIds = liquorTabs.map(tab => tab.id);

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
      {/* === HERO SECTION (Liquor License Specific) === */}
      <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">

          {/* Background Image Section */}
          <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
            <img
              src={BackgroundImageSrc}
              alt="Liquor License background"
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
                <span className="font-semibold text-black">Apply for Liquor License Online</span>
              </nav>

              {/* Badge */}
              <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                #1 Legal Service Provider In India
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-black">
                Apply for Liquor License Online
              </h1>

              {/* Bullet Points with CheckCircle */}
              <div className="space-y-4 mb-8 text-sm lg:text-base text-black">
                <p className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  Get **expert legal guidance** to apply for your liquor license **quickly and legally compliant**. T&C*
                </p>
                <p className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  Apply online for **bar, restaurant, retail, or distribution licenses** with end-to-end support.
                </p>
                <p className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  Operate legally with official government permission to sell or serve alcohol—T&C apply.
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
                <h2 className="text-xl font-semibold mb-6 text-black text-center">Apply for Liquor License</h2>

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
            {liquorTabs.map((tab) => (
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
          <LiquorOverviewContent />
          <LiquorTypesContent />
          <LiquorNeedContent />
          <LiquorDocumentsContent />
          <LiquorValidityRenewal />
          <LiquorWhyVakilsearch />
          <LiquorFAQsContent faqs={liquorFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
        </div>
      </div>

    </div>
  );
}