import React, { useState, useEffect } from "react";
// axios is kept for convention, though not used in frontend logic
import axios from "axios";
import {
  ChevronDown,
  Zap, // For Efficiency/Smooth Process
  Briefcase, // For Business/Corporate Requirements
  ArrowRight,
  Star,
  CheckCircle, // For Compliance/Requirements
  FileText, // For document/Forms IRDA/R1, IRDA/R2
  Scale, // For Regulation/Legal Compliance
  Handshake, // For Customer Trust/Access to Capital
  TrendingUp, // For Market Access/Growth
  Lightbulb, // For Expert Guidance
  Users, // For Intermediaries/Companies
  DollarSign, // For Fees/Financial Soundness
  Clock, // For Validity/Renewal/Timeliness
  Landmark, // For IRDAI/Regulator
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from '../../assets/business.png'; // Reusing a general business image

// --- IRDAI REGISTRATION STATIC DATA DEFINITIONS ---

const irdaiTabs = [
  { id: 'irdai-overview-content', label: 'Overview' },
  { id: 'irdai-purpose-content', label: 'Purpose & Requirement' },
  { id: 'irdai-benefits-content', label: 'Benefits' },
  { id: 'irdai-eligibility-content', label: 'Eligibility & Types' },
  { id: 'irdai-documents-content', label: 'Documents Required' },
  { id: 'irdai-validity-renewal', label: 'Validity & Renewal' },
  { id: 'irdai-why-vakilsearch', label: 'Why Vakilsearch?' },
  { id: 'irdai-faqs-content', label: 'FAQs' },
];

const irdaiOverview = {
  detail: "The **Insurance Regulatory and Development Authority of India (IRDAI)** is the sole regulator for the insurance industry in India. It is responsible for issuing licenses and registering entities that want to operate in the insurance sector.",
  licenseRequirement: "An IRDA license is required for any entity that wants to **sell, distribute, or advise** on insurance products in India. The license ensures that the entity is financially sound and has the necessary expertise to provide insurance services.",
};

const irdaiPurpose = [
  { title: "Comply with the Law", icon: Scale, detail: "The Insurance Act of 1938 and subsequent regulations require all insurance companies and intermediaries to be licensed by the IRDAI." },
  { title: "Build Trust with Customers", icon: Handshake, detail: "An IRDA license shows that your business is legitimate and has met the standards set by the regulator, which helps build customer trust." },
  { title: "Access Capital", icon: DollarSign, detail: "Many banks and financial institutions require an IRDA license before providing capital or funding to insurance companies and intermediaries." },
  { title: "Gain Access to Markets", icon: TrendingUp, detail: "Some markets, such as the government sector, only allow insurance products to be sold by entities that hold a valid IRDA license." },
];

const irdaiRequiredEntities = [
  "Life insurance companies",
  "General insurance companies",
  "Reinsurance companies",
  "Insurance intermediaries (such as brokers, agents, and surveyors)",
  "Insurance marketing firms",
  "Pension fund managers",
  "Health insurance companies",
];

const irdaiEligibility = [
  { title: "Minimum Net Worth", detail: "The entity must meet the prescribed minimum net worth requirement set by the IRDAI (varies by entity type).", icon: DollarSign },
  { title: "Experience in the Insurance Sector", detail: "Demonstrable experience and necessary expertise in the relevant insurance business domain.", icon: Briefcase },
  { title: "Adequate Infrastructure", detail: "Proof of adequate infrastructure (office, IT systems, personnel) to support the proposed insurance operations.", icon: Zap },
  { title: "Compliance with Regulations", detail: "Commitment to full compliance with the Insurance Act of 1938 and all IRDAI regulations.", icon: Scale },
];

const irdaiDocuments = [
  { doc: "Application form (IRDA/R1 and IRDA/R2 for registration)", category: "Mandatory Forms", icon: FileText },
  { doc: "Memorandum of association & Articles of association", category: "Corporate Documents", icon: FileText },
  { doc: "Certificate of incorporation", category: "Legal Status", icon: Briefcase },
  { doc: "Net worth certificate (Audited Financials)", category: "Financial Proof", icon: DollarSign },
  { doc: "Experience certificate & Infrastructure details", category: "Operational Proof", icon: Briefcase },
  { doc: "Compliance certificate & Other statutory declarations", category: "Regulatory Proof", icon: CheckCircle },
];

const irdaiRenewal = {
  validity: "The validity period for an IRDA license is **three years**.",
  renewalProcess: "The entity submits an application for renewal to the IRDAI. The IRDAI reviews the application, which may include asking for additional information or clarifications. If approved, a renewed license is issued.",
  duplicateCertificate: "If the license is lost, an application for a duplicate certificate must be submitted to the IRDAI, along with a copy of the lost license and the prescribed fee.",
};

const whyVakilsearch = [
  { title: "Expertise and Experience", detail: "Deep expertise across various domains of insurance law, ensuring sound advice and effective solutions for registration.", icon: Lightbulb },
  { title: "Comprehensive Services", detail: "A one-stop solution for filing Forms IRDA/R1 and IRDA/R2, documentation review, and licensing requirements.", icon: Briefcase },
  { title: "Tailored Guidance", detail: "Personalized guidance and solutions that cater to your specific entity type and circumstances in the insurance sector.", icon: Handshake },
  { title: "Efficiency and Timeliness", detail: "We value your time and strive to streamline complex legal processes, making them more efficient and less time-consuming.", icon: Clock },
];

const irdaiFAQs = [
  { q: "What are the benefits of having an IRDA license?", a: "Benefits include legal compliance, enhanced customer trust, ability to access capital/funding, and permission to sell insurance products in regulated markets." },
  { q: "What are the requirements for obtaining an IRDA license?", a: "Requirements commonly include meeting a prescribed minimum net worth, demonstrating experience in the insurance sector, having adequate infrastructure, and ensuring full compliance with IRDAI regulations." },
  { q: "What is the fee for an IRDA license?", a: "The fee varies significantly based on the type of license (Life Insurer, Broker, Surveyor) and the size of the entity. Applicants must pay the prescribed application and registration fees as per IRDAI schedules." },
  { q: "How long does it take to process an IRDA license application?", a: "The processing time is extensive due to the complex nature of the industry and high regulatory standards. It depends on the license type, but typically takes several months, requiring diligent follow-up." },
  { q: "What are the penalties for operating an insurance business without an IRDA license?", a: "Operating without a license is a serious offense under the Insurance Act, 1938, leading to heavy fines, legal prosecution, and prohibition from conducting any insurance-related business." },
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


// --- TAB CONTENT COMPONENTS (IRDAI Registration Content) ---

const IRDAIOverviewContent = () => (
  <section id="irdai-overview-content" className="py-12 scroll-mt-24">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Overview of IRDA Insurance License</h2>
    <p className="text-lg text-gray-700 mb-4 max-w-4xl">
      {irdaiOverview.detail}
    </p>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      {irdaiOverview.licenseRequirement}
    </p>

    <h3 className="text-2xl font-bold mb-6 text-gray-800">Who Regulates IRDA License?</h3>
    <div className="p-5 bg-[#E6F0F6] rounded-xl shadow-md border-l-4 border-[#022B50]">
      <p className="text-gray-700 font-medium">The **IRDAI (Insurance Regulatory and Development Authority of India)** is the sole regulator of the insurance industry in India, responsible for issuing licenses, registering entities, and enforcing compliance with the Insurance Act of 1938 and other regulations.</p>
    </div>
  </section>
);

const IRDAIPurposeContent = () => (
  <section id="irdai-purpose-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-8 text-gray-800">Purpose of Securing an IRDA License & Requirement</h3>

    <h4 className="text-2xl font-bold mb-6 text-gray-800">Why You Should Secure an IRDA License</h4>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {irdaiPurpose.map((item, i) => (
        <DetailItem key={i} title={item.title} description={item.detail} icon={item.icon} />
      ))}
    </div>

    <h4 className="text-2xl font-bold mb-6 text-gray-800">Entities Required to Obtain an IRDA License</h4>
    <div className="space-y-3 text-gray-700 max-w-4xl border-l-4 border-amber-500 pl-4">
      {irdaiRequiredEntities.map((entity, i) => (
        <li key={i} className="flex items-start gap-2 list-none">
          <Users className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
          <span>{entity}</span>
        </li>
      ))}
    </div>
  </section>
);

const IRDAIBenefitsContent = () => (
  <section id="irdai-benefits-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-8 text-gray-800">Benefits of IRDAI Registration</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      IRDAI licensing provides the foundation for trust, financial stability, and legal authority required to operate effectively in the regulated Indian insurance market.
    </p>

    <h4 className="text-2xl font-bold mb-6 text-gray-800">Benefits of Registration</h4>
    <div className="grid md:grid-cols-2 gap-6">
      {irdaiPurpose.map((item, i) => {
        const Icon = item.icon; // make sure this is a valid imported lucide-react icon
        return (
          <div
            key={i}
            className="p-6 bg-white rounded-xl shadow-md flex gap-4 items-start"
          >
            {Icon && <Icon className="w-6 h-6 text-blue-500 mt-1" />}
            <div>
              <h3 className="font-bold text-lg mb-1">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.detail}</p>
            </div>
          </div>
        );
      })}
    </div>

  </section>
);

const IRDAIEligibilityContent = () => (
  <section id="irdai-eligibility-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Eligibility Criteria and Different Types of Insurance Businesses</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      The eligibility criteria are stringent and vary depending on the specific entity type and business model seeking licensing from the IRDAI.
    </p>

    <h4 className="text-2xl font-bold mb-6 text-gray-800">Common Eligibility Criteria</h4>
    <div className="grid md:grid-cols-2 gap-6 mb-12">
      {irdaiEligibility.map((item, i) => (
        <DetailItem key={i} title={item.title} description={item.detail} icon={item.icon} />
      ))}
    </div>

    <h4 className="text-2xl font-bold mb-6 text-gray-800">Different Types of Insurance Businesses Requiring IRDA Licence</h4>
    <div className="space-y-3 text-gray-700 max-w-4xl border-l-4 border-indigo-500 pl-4">
      {irdaiRequiredEntities.map((entity, i) => (
        <li key={i} className="flex items-start gap-2 list-none">
          <Briefcase className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-1" />
          <span>{entity}</span>
        </li>
      ))}
    </div>
  </section>
);

const IRDAIDocumentsContent = () => (
  <section id="irdai-documents-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Documents Required for IRDA Licence</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      The documentation is extensive and is tailored to verify the entity's corporate structure, financial soundness, and operational preparedness, often involving Forms **IRDA/R1 and IRDA/R2**.
    </p>

    <h4 className="text-2xl font-bold mb-6 text-gray-800">Commonly Required Documents for All Entities</h4>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {irdaiDocuments.map((doc, i) => (
        <div key={i} className="flex items-start gap-3 p-4 bg-red-50 rounded-lg shadow-md border-l-4 border-red-500">
          <doc.icon className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
          <div>
            <p className="text-gray-800 font-medium">{doc.doc}</p>
            <p className="text-xs text-gray-600 font-medium">{doc.category}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const IRDAIValidityRenewal = () => (
  <section id="irdai-validity-renewal" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Validity, Renewal, and Duplicate Certificate Procedure</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Maintaining an active license requires timely renewal and adherence to all IRDAI guidelines throughout the validity period.
    </p>

    <div className="grid md:grid-cols-2 gap-8">
      <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
        <h4 className="font-bold text-xl text-gray-800 mb-3 flex items-center gap-2"><Clock className="w-5 h-5 text-amber-500" /> Validity & Renewal Process</h4>
        <p className="text-lg text-gray-700 font-semibold mb-2">The validity period for an IRDA license is **three years**.</p>
        <ul className="space-y-3 text-gray-700 mt-4 border-l-4 border-indigo-500 pl-4">
          <li className="flex items-start gap-2">The entity submits an application for renewal to the IRDAI.</li>
          <li className="flex items-start gap-2">The IRDAI reviews the application and may ask for additional information or clarifications.</li>
          <li className="flex items-start gap-2">If approved, the IRDAI issues a renewed license for a further three years on payment of the prescribed fees.</li>
        </ul>
      </div>
      <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
        <h4 className="font-bold text-xl text-gray-800 mb-3 flex items-center gap-2"><FileText className="w-5 h-5 text-amber-500" /> Duplicate Certificate Procedure</h4>
        <p className="text-lg text-gray-700">If you lose your IRDA license, you can apply for a duplicate certificate by:</p>
        <ul className="space-y-3 text-gray-700 mt-4 border-l-4 border-red-500 pl-4">
          <li className="flex items-start gap-2">Submitting an application for a duplicate certificate to the IRDAI.</li>
          <li className="flex items-start gap-2">Submitting a copy of your lost license.</li>
          <li className="flex items-start gap-2">Paying the prescribed fee.</li>
        </ul>
      </div>
    </div>
  </section>
);

const IRDAIWhyVakilsearch = () => (
  <section id="irdai-why-vakilsearch" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Why Vakilsearch for IRDAI Registration?</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Vakilsearch provides comprehensive legal and regulatory solutions to navigate the complex licensing process, ensuring efficiency and full compliance.
    </p>

    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {whyVakilsearch.map((service, i) => {
        const Icon = i % 4 === 0 ? Lightbulb : i % 4 === 1 ? Briefcase : i % 4 === 2 ? Handshake : Zap;
        const [title, detail] = service.detail.split(':').map(s => s.trim());
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

const IRDAIFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
  <section id="irdai-faqs-content" className="py-12 max-w-5xl mx-auto scroll-mt-24">
    <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">Frequently Asked Questions (FAQs)</h3>

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
export default function IRDAIRegistrationPage() {
  const [activeTab, setActiveTab] = useState(irdaiTabs[0].id);
  const [faqOpen, setFaqOpen] = useState(null);

  const SCROLL_OFFSET = 120;

  // --- SCROLLSPY IMPLEMENTATION ---
  useEffect(() => {
    const sectionIds = irdaiTabs.map(tab => tab.id);

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
      {/* === HERO SECTION (IRDAI Registration Specific) === */}
      <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">

          {/* Background Image Section */}
          <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
            <img
              src={BackgroundImageSrc}
              alt="IRDAI Registration background"
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
                <span className="font-semibold text-black">IRDAI Registration</span>
              </nav>

              {/* Badge */}
              <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                #1 Legal Service Provider In India
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-black">
                IRDAI Registration
              </h1>

              {/* Bullet Points with CheckCircle */}
              <div className="space-y-4 mb-8 text-sm lg:text-base text-black">
                <p className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  Start your insurance company seamlessly with **expert legal support** for IRDAI registration.
                </p>
                <p className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  Complete **Form IRDA/R1, IRDA/R2 filing**, documentation, and license procurement handled.
                </p>
                <p className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  Ensure compliance with regulatory requirements for a **smooth, error-free licensing process**.
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
                <h2 className="text-xl font-semibold mb-6 text-black text-center">IRDAI Registration</h2>

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
            {irdaiTabs.map((tab) => (
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
          <IRDAIOverviewContent />
          <IRDAIPurposeContent />
          <IRDAIBenefitsContent />
          <IRDAIEligibilityContent />
          <IRDAIDocumentsContent />
          <IRDAIValidityRenewal />
          <IRDAIWhyVakilsearch />
          <IRDAIFAQsContent faqs={irdaiFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
        </div>
      </div>

    </div>
  );
}