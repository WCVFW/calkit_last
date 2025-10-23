import React, { useState, useEffect } from "react";
// axios is kept for convention, though not used in frontend logic
import axios from "axios";
import {
  ChevronDown,
  Zap, // For Fast/Secure/Efficiency
  Briefcase, // For Commerce/Trade/Business
  ArrowRight,
  Star,
  CheckCircle, // For Checklist/Compliance
  FileText, // For document/Rules/Forms
  Scale, // For Weights/Measures/Standards
  Handshake, // For Customer Protection/Trade Support
  TrendingUp, // For Economic Growth/Revenue Collection
  Lightbulb, // For Expert Guidance
  Users, // For Packers/Importers/Consumers
  DollarSign, // For Fees/Revenue/Fines
  Clock, // For Validity/Timeliness
  Landmark, // For Ministry of Consumer Affairs/Enforcement
  AlertTriangle, // For Prohibitions/Penalties
  MapPin,
  BookOpen
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from '../../assets/business.png'; // Reusing a general business image

// --- LEGAL METROLOGY STATIC DATA DEFINITIONS ---

const metrologyTabs = [
  { id: 'lm-overview-content', label: 'Overview' },
  { id: 'lm-rules-provisions', label: 'Rules & Provisions' },
  { id: 'lm-benefits-content', label: 'Benefits' },
  { id: 'lm-eligibility-content', label: 'Eligibility' },
  { id: 'lm-documents-content', label: 'Documents & Validity' },
  { id: 'lm-procedure-content', label: 'Procedure' },
  { id: 'lm-why-vakilsearch', label: 'Our Assistance' },
  { id: 'lm-faqs-content', label: 'FAQs' },
];

const legalMetrologyRules = [
  { title: "General Rules, 2011", detail: "Covers around 40 different types of weighing/measuring devices (weighbridges, fuel pumps, water metres, thermometers, etc.) and their regular checking.", icon: FileText },
  { title: "Packaged Commodities Rules (LMPC), 2011", detail: "Mandates crucial labelling requirements for pre-packaged commodities sold in India (MRP, net quantity, manufacturer/packer details, consumer care).", icon: Briefcase },
  { title: "Approval of Models Rules, 2011", detail: "Defines standard measures or numbers and specifies how pre-packaged goods shall bear affirmations and other particulars.", icon: Scale },
  { title: "National Standards Rules, 2011", detail: "Defines the specifications of base units of measures and mass, different standards, and times of verification of the norms.", icon: Landmark },
];

const lmpcBenefits = [
  { title: "Reduced Transaction Costs", icon: DollarSign, detail: "Eliminates lengthy court disputes and legal fights caused by poor measurement procedures, saving both consumers and businesses time and money." },
  { title: "Support Trade", icon: Handshake, detail: "Controls illegal and unfair trade policies and ensures measuring devices adhere to global standards, fostering fair commerce." },
  { title: "Government Revenue Collection", icon: TrendingUp, detail: "Ensures businesses and the government are treated fairly when collecting excise and measurement taxes on manufactured, sold, imported, and exported goods." },
  { title: "Lowers Technical Barriers", icon: Zap, detail: "Fosters measuring confidence and clarity, boosting national morale and encouraging participation in the global trading system, which supports economic growth." },
];

const lmpcEligibility = [
  "Product Compliance: Your proposal and goods must adhere to the legal metrology packaged commodities rules.",
  "Documentation: All the required papers must be submitted to apply for legal metrology in India.",
  "Business Licenses: Any additional business licenses necessary for your firm to operate should be provided.",
  "Application Details: A fully completed application with all required information for the package's display window.",
  "Registration Cost: Request for documentation regarding the registration cost (₹100 application fee).",
];

const lmpcDocuments = [
  { doc: "LMPC Certificate Renewal Application (Form)", validity: "Must be renewed at least 30 days prior to expiry.", icon: FileText },
  { doc: "Application Fee Receipt", validity: "₹100 application fee (Pay and Accounts Official, D/o Consumer Affairs, New Delhi).", icon: DollarSign },
  { doc: "Required Renewal Fee and Documentation", validity: "Submission of fee and documentation for renewal (valid for five years).", icon: FileText },
  { doc: "Legal ID/Address Proofs", validity: "Proof of legal status and address of business.", icon: Users },
];

const metrologyProcedure = [
  "Step 1: Application to LM: We gather all the data and create the application.",
  "Step 2: Zonal Officer Review: The Zonal officer reviews the application for any problems or objections and provides insights.",
  "Step 3: Inspection of Premises: If the application is properly filed, the inspector arrives at the predetermined time for physical verification.",
  "Step 4: Inspector Recommendation: Inspector offers the suggestion in accordance with the premises' compliance.",
  "Step 5: Acceptance or Rejection: The zonal officer submits the thorough report to the assistant controller for final acceptance or rejection.",
  "Step 6: Compliance with LM Act and Rules: Products and facilities' packaging, weights, and measurements must adhere to the Act and Rules.",
  "Step 7: Replying to any regulatory action: Imply the regulatory changes being announced or hinted at.",
];

const lmProhibitions = [
  "A person must possess a current LMPC Certificate granted by the Authority in order to manufacture, repair, sell, or offer to sell any weights or measures.",
  "Section 19: Importing any weights or measurements without being registered with the Concerned Authority and possessing a current LMPC Certification is unauthorized.",
  "Section 38: Importing any weight or measure without first registering under the Act is subject to a fine (up to ₹25,000 for a subsequent offence) and a maximum six-month prison sentence.",
];

const lmpcExemptions = [
  "Commodities with a net weight or measure of 10 grams or 10 milliliters or less.",
  "Agricultural produce in packages of more than 50 kg.",
  "Packages containing fast food items packed by a restaurant or hotel.",
  "Packages containing formulations covered by the Drugs (Price Control) Order, 1995.",
  "Packages with commodities weighing more than 25 kg or 25 liters (excluding cement and fertilizers up to 50 kg).",
  "Packaged commodities meant for industrial consumers or institutional consumers (airways, railways, hotels, and hospitals).",
  "Goods imported for government use, diplomatic missions, personal use, research/scientific, or exhibition purposes.",
];

const whyVakilsearch = [
  "Offline and Online Expertise: We are well-versed in both offline and online procedures required for LMPC Certificate registration for weights and measures.",
  "Objection Handling: We support you throughout the application process, promptly addressing any objections from the Zonal Officer.",
  "End-to-End Filing: We handle completing your application, collecting samples, submitting the application and relevant documents to the Department.",
  "Regular Updates: We provide regular updates on the status of your application and notify you immediately upon successful completion.",
  "Transparency: We provide transparency regarding the incorporation process to assist people in having reasonable expectations.",
];

const metrologyFAQs = [
  { q: "Is Legal Metrology registration mandatory?", a: "Yes, it is mandatory for every importer, manufacturer, packer, and dealer of pre-packaged commodities and weights/measures to register under the Legal Metrology Act, 2009." },
  { q: "What is an LMPC Certificate?", a: "An LMPC (Legal Metrology Packaged Commodities) Certificate is the registration issued to manufacturers, packers, and importers, confirming their compliance with the mandatory labelling and measurement requirements for pre-packaged goods sold in India." },
  { q: "What is the work of the Legal Metrology Department?", a: "The Legal Metrology Department (under the Department of Consumer Affairs) establishes and upholds standards for weights and measures used in commerce, trade, and pre-packaged goods to protect consumer rights and ensure fair business practices." },
  { q: "What is the process to get a legal metrology certificate online?", a: "The process involves submitting an online application (and sometimes a physical application/inspection), followed by review by the Zonal Officer, premises inspection (if required), and approval by the Assistant Controller, ensuring compliance with LMPC Rules." },
  { q: "Is the lmpc license issued under Legal Metrology Act transferable?", a: "No, a legal metrology license is typically non-transferable. It is issued specifically to the registered legal entity and for the specified premises/activities." },
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


// --- TAB CONTENT COMPONENTS (Legal Metrology Content) ---

const LMOverviewContent = () => (
  <section id="lm-overview-content" className="py-12 scroll-mt-24">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Legal Metrology - Overview</h2>
    <p className="text-lg text-gray-700 mb-4 max-w-4xl">
      The **Legal Metrology Registration Act, 2009**, establishes and upholds standards for weights and measurements in India. It mandates registration and additional compliance for **packers, dealers, and importers** dealing with packaged goods, as well as those handling weights and measures.
    </p>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      The Act is administered by the **Department of Legal Metrology** (under the Department of Consumer Affairs) in each state. It ensures moral corporate practices, protects consumer rights, and sets standards for product packaging and mandatory disclosures.
    </p>

    <h3 className="text-2xl font-bold mb-6 text-gray-800">Mandatory Information on Pre-packaged Goods (LMPC Rules)</h3>
    <div className="p-5 bg-[#E6F0F6] rounded-xl shadow-md border-l-4 border-[#022B50]">
      <ul className="list-disc list-inside space-y-2 text-gray-700 font-medium">
        <li>Manufacturer, Importer, and Packer Information (Name and address).</li>
        <li>The **highest possible retail price (MRP)**, including all taxes.</li>
        <li>The date of manufacturing, packaging, or import (month and year).</li>
        <li>The date of expiry and/or the window of time during which the product is most effective.</li>
        <li>Commodity quantity, ingredient(s), and **customer service/helpline** for consumer complaints.</li>
      </ul>
    </div>
  </section>
);

const LMRulesProvisions = () => (
  <section id="lm-rules-provisions" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-8 text-gray-800">Key Rules and Legal Provisions of the Legal Metrology Act</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      The Act is supported by several rules that regulate everything from the devices used in trade to the labelling of pre-packaged goods.
    </p>

    <h4 className="text-2xl font-bold mb-6 text-gray-800">Core Legal Metrology Rules, 2011</h4>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {legalMetrologyRules.map((rule, i) => (
        <div
          key={i}
          className="p-6 bg-white rounded-xl shadow-md flex gap-4 items-start"
        >
          {/* Icon */}
          <BookOpen className="w-6 h-6 text-blue-500 mt-1" />

          {/* Text */}
          <div>
            <h3 className="font-bold text-lg mb-1">{rule.title}</h3>
            <p className="text-gray-600 text-sm">{rule.detail}</p>
          </div>
        </div>
      ))}
    </div>


    <h4 className="text-2xl font-bold mb-6 text-gray-800">Prohibitions and Penalties (Sections 19 & 38)</h4>
    <div className="space-y-3 text-gray-700 max-w-4xl border-l-4 border-red-500 pl-4">
      {lmProhibitions.map((prohibition, i) => (
        <li key={i} className="flex items-start gap-2 list-none">
          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
          <span>{prohibition}</span>
        </li>
      ))}
    </div>
  </section>
);

const LMBenefitsContent = () => (
  <section id="lm-benefits-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-8 text-gray-800">Importance and Benefits of LMPC Certificate</h3>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {lmpcBenefits.map((item, i) => (
        <DetailItem key={i} title={item.title} description={item.detail} icon={item.icon} />
      ))}
    </div>
  </section>
);

const LMEligibilityContent = () => (
  <section id="lm-eligibility-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Eligibility Criteria for Legal Metrology Registration</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      To be eligible for LMPC registration, your business must demonstrate adherence to all aspects of the packaged commodities rules and have the necessary operational licenses.
    </p>

    <h4 className="text-2xl font-bold mb-6 text-gray-800">LMPC Registration Requirements Checklist</h4>
    <div className="space-y-4 mb-12">
      {lmpcEligibility.map((item, i) => (
        <div key={i} className="flex items-start gap-4 p-4 bg-indigo-50 rounded-lg shadow-md border-l-4 border-indigo-500">
          <CheckCircle className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
          <span className="text-gray-700 text-lg">{item}</span>
        </div>
      ))}
    </div>

    <h4 className="text-2xl font-bold mb-6 text-gray-800">LMPC Certificate Exemptions (Who Does Not Need Registration)</h4>
    <div className="grid md:grid-cols-2 gap-6">
      {lmpcExemptions.slice(0, 4).map((item, i) => (
        <div key={i} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg shadow-sm border border-green-200">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
          <span className="text-gray-700 text-sm">{item}</span>
        </div>
      ))}
    </div>
  </section>
);

const LMDocumentsContent = () => (
  <section id="lm-documents-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Documents, Validity, and Renewal</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      The LMPC certificate is issued with a standard validity, and timely renewal is essential to avoid business hassle, particularly during customs clearance for importers.
    </p>

    <h4 className="text-2xl font-bold mb-6 text-gray-800">Key Documents for Application and Renewal</h4>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {lmpcDocuments.map((doc, i) => {
        const Icon = doc.icon; // doc.icon should be the imported lucide-react icon component
        return (
          <div key={i} className="p-4 bg-white rounded-lg shadow flex items-center gap-3">
            {Icon && <Icon className="w-5 h-5 text-blue-500" />}
            <div>
              <h4 className="font-semibold">{doc.doc}</h4>
              <p className="text-sm text-gray-600">{doc.validity}</p>
            </div>
          </div>
        );
      })}
    </div>


    <h4 className="text-2xl font-bold mb-6 text-gray-800">LMPC Certificate Validity and Renewal Process</h4>
    <div className="p-5 bg-amber-50 rounded-xl shadow-md border-l-4 border-amber-500">
      <p className="text-lg text-gray-700 font-semibold mb-2">The validity of an LMPC certificate is **five years**.</p>
      <p className="text-gray-700">Renewal must be submitted to the appropriate Legal Metrology Department at least **30 days prior** to the expiry date of the original certificate, along with the required fee and documentation.</p>
    </div>
  </section>
);

const LMProcedureContent = () => (
  <section id="lm-procedure-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Legal Metrology Registration - Procedure</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      The procedure often involves offline compliance (physical inspection of premises and products) and is regulated meticulously to ensure consumer protection and standard compliance.
    </p>

    <h4 className="text-2xl font-bold mb-6 text-gray-800">Step-by-Step Registration and Approval Process</h4>
    <ol className="space-y-5 list-none border-l-2 border-[#022B50] pl-4">
      {metrologyProcedure.map((step, i) => (
        <li key={i} className="flex items-start gap-4">
          <div className="bg-[#022B50] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
            {i + 1}
          </div>
          <span className="text-gray-700 text-lg">{step}</span>
        </li>
      ))}
    </ol>

    <h4 className="text-2xl font-bold mb-6 mt-12 text-gray-800">Who Needs to Register for LMPC Certificate?</h4>
    <div className="space-y-4">
      <div className="p-4 bg-white rounded-lg shadow-md border-l-4 border-indigo-500">
        <h5 className="font-semibold text-lg text-gray-800 mb-1">Case 1: Registration for importing, producing, and packaging packaged goods (Rule 27)</h5>
        <p className="text-gray-700 text-sm">Every importer, producer, and packer of packaged goods is required to register with the State's Controller or the Director of Legal Metrology of the Central Government.</p>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-md border-l-4 border-indigo-500">
        <h5 className="font-semibold text-lg text-gray-800 mb-1">Case 2: Registering imported weights and dimensions (Section 19 & 38)</h5>
        <p className="text-gray-700 text-sm">No one is permitted to import any weights or measurements unless they have registered with the Director and paid the necessary fees. Penalties apply for non-compliance.</p>
      </div>
    </div>
  </section>
);

const LMWhyVakilsearch = () => (
  <section id="lm-why-vakilsearch" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Why Should You Choose Vakilsearch for Legal Metrology?</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      LMPC registration requires expertise in both offline and online compliance methods. Our specialists ensure the entire process is hassle-free, secure, and compliant across Pan India.
    </p>

    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {whyVakilsearch.map((service, i) => {
        const Icon = i % 5 === 0 ? Scale : i % 5 === 1 ? Lightbulb : i % 5 === 2 ? Briefcase : Zap;
        const [title, detail] = service.includes(':') ? service.split(':').map(s => s.trim()) : [service.split('.')[0].trim(), service.split('.').slice(1).join('.').trim()];
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

    <div className="mt-12 p-6 bg-[#E6F0F6] rounded-xl border-l-4 border-amber-500 shadow-md">
      <h4 className="font-bold text-xl text-gray-800 mb-2 flex items-center gap-2"><Scale className="w-5 h-5 text-amber-500" /> Why Legal Metrology Registration is Crucial</h4>
      <p className="text-lg text-gray-700 font-semibold">Abiding by the Legal Metrology Act protects consumer rights, ensures ethical marketing, and avoids severe fines and potential imprisonment for non-compliance, safeguarding your brand's reputation and growth.</p>
    </div>
  </section>
);

const LMFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
  <section id="lm-faqs-content" className="py-12 max-w-5xl mx-auto scroll-mt-24">
    <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">FAQ's on Legal Metrology Online Services</h3>

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
export default function LegalMetrologyPage() {
  const [activeTab, setActiveTab] = useState(metrologyTabs[0].id);
  const [faqOpen, setFaqOpen] = useState(null);

  const SCROLL_OFFSET = 120;

  // --- SCROLLSPY IMPLEMENTATION ---
  useEffect(() => {
    const sectionIds = metrologyTabs.map(tab => tab.id);

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
      {/* === HERO SECTION (Legal Metrology Specific) === */}
      <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">

          {/* Background Image Section */}
          <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
            <img
              src={BackgroundImageSrc}
              alt="Legal Metrology Registration background"
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
                <span className="font-semibold text-black">Legal Metrology Online Services</span>
              </nav>

              {/* Badge */}
              <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                #1 Legal Service Provider In India
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-black">
                Legal Metrology Online Services
              </h1>

              {/* Bullet Points with CheckCircle */}
              <div className="space-y-4 mb-8 text-sm lg:text-base text-black">
                <p className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  Complete your **Legal Metrology (LMPC) registration** to ensure product compliance.
                </p>
                <p className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  **Fast, error-free, and secure registration process** handled **100% online by top experts**.
                </p>
                <p className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  Complete guidance for smooth compliance with Legal Metrology regulations **Pan India**.
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
                <h2 className="text-xl font-semibold mb-6 text-black text-center">Get Started!</h2>

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
                    Talk to an Expert
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
            {metrologyTabs.map((tab) => (
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
          <LMOverviewContent />
          <LMRulesProvisions />
          <LMBenefitsContent />
          <LMEligibilityContent />
          <LMDocumentsContent />
          <LMProcedureContent />
          <LMWhyVakilsearch />
          <LMFAQsContent faqs={metrologyFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
        </div>
      </div>

    </div>
  );
}