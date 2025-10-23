import React, { useState, useEffect } from "react";
// axios is kept for convention, though not used in frontend logic
import axios from "axios";
import {
  ChevronDown,
  Zap, // For captivating/compelling
  Briefcase, // For Business Plan (used for DPR title/general business)
  ArrowRight,
  Star,
  CheckCircle, // For Benefits/Compliance
  FileText, // For document/content/DPR itself
  Scale, // For Compliance/Risk Analysis
  Smartphone,
  Handshake, // For Consult an Expert
  TrendingUp, // For Higher Loan Approval Chances
  Lightbulb, // For Project Concept/Expertise
  Users, // For Team/Expert Guidance
  DollarSign, // For Financials/Funding
  Download,
  Globe, // For Market Research
  Calculator, // For Financial Projections
  Banknote, // For Loan
  Target,
  RefreshCw,
  Shield,
  Clock, // For Time and Cost Savings
  CreditCard,
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from '../../assets/business.png'; // Reusing a general business image

// --- DPR SERVICE STATIC DATA DEFINITIONS ---

const dprTabs = [
  { id: 'dpr-overview-content', label: 'Overview' },
  { id: 'dpr-benefits-content', label: 'Benefits' },
  { id: 'dpr-documents-content', label: 'Documents' },
  { id: 'dpr-services-include-content', label: 'Our DPR Services' },
  { id: 'dpr-why-vakilsearch', label: 'Why Vakilsearch?' },
  { id: 'dpr-faqs-content', label: "FAQ's" },
];

const dprBenefits = [
  "Higher Loan Approval Chances: Our comprehensive and compliant DPRs increase your chances of securing the funding you need.",
  "Time and Cost Savings: Our experienced team streamlines the DPR process, saving you time and money.",
  "Professionalism: A well-prepared DPR demonstrates your professionalism and commitment to your project.",
  "Customised Solutions: We tailor our services to meet the specific needs of your project.",
  "Expert Guidance: Benefit from the insights and recommendations of our experts throughout the DPR process.",
];

const dprDocuments = [
  "Project concept note",
  "Feasibility study",
  "Market research report",
  "Technical specifications",
  "Financial projections",
  "Risk assessment",
  "Legal and regulatory compliance assessment",
  "Executive summary",
  "Business plan",
  "Environmental impact assessment",
  "Social impact assessment",
  "Land acquisition documents",
  "Construction permits",
  "Letters of intent from customers or suppliers",
];

const dprServicesIncluded = [
  { title: "Project Assessment", icon: Briefcase, detail: "We begin by thoroughly assessing your project and understanding its scope, objectives, and financial requirements. This assessment sets the foundation for the rest of the process." },
  { title: "Market Research", icon: Globe, detail: "A crucial component of any DPR is in-depth market research. We analyze market trends, competition, and potential risks to comprehensively understand the project's viability." },
  { title: "Financial Projections", icon: DollarSign, detail: "We provide detailed financial projections to give lenders a clear outlook on the project's profitability and return on investment." },
  { title: "Technical Details", icon: Lightbulb, detail: "For projects with a technical or engineering aspect, we provide detailed technical descriptions and plans to ensure lenders have a complete understanding of your project's technical feasibility." },
  { title: "Risk Analysis", icon: Scale, detail: "We conduct a comprehensive risk analysis, identifying potential challenges and presenting mitigation strategies to instil confidence in lenders regarding your project's success." },
  { title: "Executive Summary", icon: Zap, detail: "A well-crafted executive summary highlights the key points of your DPR, making it easy for lenders to quickly grasp the project's potential." },
  { title: "Legal and Regulatory Compliance", icon: CheckCircle, detail: "We ensure that your DPR complies with all legal and regulatory requirements, reducing the chances of delays or complications during the loan approval process." },
  { title: "Presentation Support", icon: Handshake, detail: "We offer presentation support if needed, helping you effectively communicate your project's strengths to the lending institution." },
];

const whyVakilsearchDPR = [
  "Expertise and Experience: With a rich history of providing legal and business services, our team is well-versed in crafting comprehensive DPRs for various industries and project types, ensuring meticulous preparation.",
  "Tailored Solutions: We thoroughly understand your business and project objectives, tailoring our DPR service to suit your specific needs and goals, reflecting the true essence of your project.",
  "Compliance and Accuracy: Our experts ensure that your DPR is comprehensive and fully compliant with the strict guidelines of banks and financial institutions, increasing your chances of loan approval.",
];

const dprFAQs = [
  { q: "What is a DPR report?", a: "DPR stands for **Detailed Project Report**. It is a comprehensive document that outlines all aspects of a proposed project, from conception to completion. It's used by stakeholders like investors and lenders to assess feasibility and viability." },
  { q: "Why is DPR prepared?", a: "DPR is prepared to secure financial assistance, particularly bank loans. It proves the **feasibility and viability** of the project to lenders, mitigating their risk and establishing the project's creditworthiness." },
  { q: "What is included in a project report for a bank loan?", a: "A bank loan DPR typically includes a Project Concept Note, Market Research, Technical Specifications, **Detailed Financial Projections**, Risk Assessment, and Legal/Regulatory Compliance Assessment." },
  { q: "Why do banks require a DPR for granting loans?", a: "Banks require a DPR to perform **due diligence**. It provides a detailed, structured overview of the project's technical, financial, and operational aspects, allowing the bank to accurately gauge the risk and potential return." },
  { q: "Who typically prepares a DPR?", a: "A DPR is typically prepared by **qualified experts or consultants** with expertise in finance, engineering, and market analysis, such as the team at Vakilsearch, to ensure compliance and professionalism." },
  { q: "What is the significance of DPR in terms of construction projects seeking bank loans?", a: "For construction, the DPR is crucial as it details land acquisition, construction permits, environmental impact, and technical plans, proving the project is structurally, legally, and environmentally sound." },
];

// --- REUSABLE COMPONENTS (Adapted) ---

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

const ServiceIncludeBox = ({ title, detail, icon: Icon }) => (
  <div className="p-5 bg-white rounded-lg shadow-sm border border-gray-200">
    <Icon className="w-6 h-6 text-amber-500 mb-2" />
    <h4 className="font-bold text-lg text-gray-800 mb-1">{title}</h4>
    <p className="text-sm text-gray-600">{detail}</p>
  </div>
);

// --- TAB CONTENT COMPONENTS (DPR Content) ---

const DPROverviewContent = () => (
  <section id="dpr-overview-content" className="py-12 scroll-mt-24">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">DPR (Detailed Project Report) - An Overview</h2>
    <p className="text-lg text-gray-700 mb-4 max-w-4xl">
      **DPR stands for Detailed Project Report**. It is a comprehensive document that outlines all aspects of a proposed project, from conception to completion. It is used by various stakeholders, including investors, lenders, and government agencies, to assess the **feasibility and viability** of a project.
    </p>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      At Vakilsearch, we understand that a DPR is **essential for any business seeking financial assistance**, especially when applying for a bank loan. A well-prepared DPR significantly impacts your chances of securing the necessary funds to make your project a reality.
    </p>
  </section>
);

const DPRBenefitsContent = () => (
  <section id="dpr-benefits-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-8 text-gray-800">Benefits of Choosing Vakilsearch for Your DPR</h3>

    <div className="space-y-4">
      {dprBenefits.map((benefit, i) => {
        const [title, description] = benefit.split(':').map(s => s.trim());
        const Icon = i === 0 ? TrendingUp : i === 1 ? Clock : i === 2 ? FileText : i === 3 ? Target : Users;
        return (
          <div key={i} className="p-5 bg-blue-50 rounded-xl shadow-sm border border-blue-200 flex items-start gap-3">
            <Icon className="w-6 h-6 text-[#022B50] mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-xl text-gray-800 mb-1">{title}</h4>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
        );
      })}
    </div>
  </section>
);

const DPRDocumentsContent = () => (
  <section id="dpr-documents-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Documents Required</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      The documents required for a DPR vary, but the following are typically essential for any lender or investor to assess the project's scope and viability.
    </p>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {dprDocuments.map((doc, i) => (
        <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <FileText className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
          <p className="text-gray-700 font-medium">{doc}</p>
        </div>
      ))}
    </div>
  </section>
);

const DPRServicesIncludeContent = () => (
  <section id="dpr-services-include-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Our DPR Service Includes</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      We provide a holistic service, covering every crucial aspect that banks and lending institutions evaluate, ensuring a comprehensive and robust project presentation.
    </p>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {dprServicesIncluded.map((item, i) => (
        <ServiceIncludeBox
          key={i}
          title={item.title}
          detail={item.detail}
          icon={item.icon}
        />))}
    </div>
  </section>
);

const DPRWhyVakilsearch = () => (
  <section id="dpr-why-vakilsearch" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Why Vakilsearch?</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Our commitment goes beyond document preparation. We ensure your DPR is **strategically sound, compliant, and tailored** for maximum funding appeal.
    </p>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {whyVakilsearchDPR.map((reason, i) => {
        const [title, description] = reason.split(':').map(s => s.trim());
        const Icon = i === 0 ? Lightbulb : i === 1 ? Target : Scale;
        return (
          <div key={i} className="p-5 bg-indigo-50 rounded-xl shadow-sm border border-indigo-200 flex items-start gap-3">
            <Icon className="w-6 h-6 text-[#022B50] mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-lg text-gray-800 mb-1">{title}</h4>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
        );
      })}
    </div>

    <div className="mt-12 p-6 bg-[#E6F0F6] rounded-xl border-l-4 border-amber-500 shadow-md">
      <h4 className="font-bold text-xl text-gray-800 mb-2 flex items-center gap-2"><Handshake className="w-5 h-5 text-amber-500" /> Consult an Expert</h4>
      <ul className="list-none space-y-2 text-gray-700">
        <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 mt-1 flex-shrink-0" /> All queries are clarified in **30 minutes**.</li>
        <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 mt-1 flex-shrink-0" /> Provide ongoing support and guidance during the project implementation phase.</li>
      </ul>
    </div>
  </section>
);

const DPRFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
  <section id="dpr-faqs-content" className="py-12 max-w-5xl mx-auto scroll-mt-24">
    <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">FAQs on DPR (Detailed Project Report) Service</h3>

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
export default function DPRServicePage() {
  const [activeTab, setActiveTab] = useState(dprTabs[0].id);
  const [faqOpen, setFaqOpen] = useState(null);

  const SCROLL_OFFSET = 120;

  // --- SCROLLSPY IMPLEMENTATION ---
  useEffect(() => {
    const sectionIds = dprTabs.map(tab => tab.id);

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
      {/* === HERO SECTION (DPR Specific) === */}
      <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">
          {/* Background Image Section */}
          <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
            <img
              src={BackgroundImageSrc}
              alt="Detailed Project Report background"
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>

          {/* Main Content */}
          <div className="relative flex flex-col lg:flex-row items-start pt-10 pb-12 lg:pb-0 z-20">

            {/* Left Column - Text Content */}
            <div className="w-full lg:w-3/5 text-black p-4 md:p-6 pb-20 relative z-20">

              {/* Badge */}
              <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-2 items-center gap-2">
                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                #1 Legal Service Provider In India
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-black">
                DPR (Detailed Project Report) Service
              </h1>

              {/* Description / Bullet Points */}
              <div className="space-y-3 mb-8 text-sm lg:text-base text-gray-800">
                <p className="flex items-start gap-3">
                  <span className="w-3 h-3 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  Professionally crafted DPR to enhance project credibility and attract funding.
                </p>
                <p className="flex items-start gap-3">
                  <span className="w-3 h-3 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  Includes **risk analysis**, **regulatory compliance**, and detailed financial insights.
                </p>
                <p className="flex items-start gap-3">
                  <span className="w-3 h-3 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  Legal Expert support for data presentation and clear project positioning.
                </p>
              </div>

              {/* Review Boxes */}
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
                {/* Offer Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Detailed Project Report</h2>
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
                    {/* Simplified Toggle UI - functional state is not implemented here */}
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

      {/* === Consult Expert Section (Replaces Loan Process/EMI Calculator) === */}
      <section className="bg-gray-50 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h3 className="text-3xl font-bold mb-4 text-gray-800">Why a Professional DPR Matters for Your Loan</h3>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl">A well-prepared Detailed Project Report (DPR) is the cornerstone of your loan application. It provides the bank with the confidence needed to invest in your project.</p>

          <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 w-full max-w-2xl">
            <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <Handshake className="w-6 h-6 text-amber-500" />
              Connect with an Expert Now
            </h4>
            <p className="text-gray-600 mb-6">Let our team ensure your project is positioned perfectly for funding success.</p>
            <button
              type="button"
              className="bg-amber-500 text-white py-3 px-8 font-semibold rounded-lg transition-colors hover:bg-amber-600 text-base shadow-md"
            >
              Talk to us
            </button>
          </div>
        </div>
      </section>

      {/* === Main Content Tabs Navigation (Sticky) === */}
      <section className="py-4 md:py-6 px-4 md:px-8 bg-white border-b border-gray-200 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center bg-white rounded-xl w-full text-xs md:text-sm lg:text-base overflow-x-auto border border-gray-200">
            {dprTabs.map((tab) => (
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
          <DPROverviewContent />
          <DPRBenefitsContent />
          <DPRDocumentsContent />
          <DPRServicesIncludeContent />
          <DPRWhyVakilsearch />
          <DPRFAQsContent faqs={dprFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
        </div>
      </div>

    </div>
  );
}