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
  <div className="flex flex-col items-center justify-center w-full p-3 border shadow-lg bg-white/10 rounded-xl border-white/20">
    <div className="flex items-center mb-1 text-yellow-400">
      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400" />)}
    </div>
    <p className="text-xs font-semibold text-white/80">{source}</p>
    <p className="mt-1 text-xl font-bold text-white">{score}</p>
    <p className="text-xs text-white/90">{reviews}</p>
  </div>
);

const DetailItem = ({ title, description, icon: Icon }) => (
  <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md border-l-4 border-[#022B50]">
    <Icon className="w-5 h-5 text-[#022B50] mt-1 flex-shrink-0" />
    <div>
      <h4 className="mb-1 text-lg font-semibold text-gray-800">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

const ServiceIncludeBox = ({ title, detail, icon: Icon }) => (
  <div className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm">
    <Icon className="w-6 h-6 mb-2 text-amber-500" />
    <h4 className="mb-1 text-lg font-bold text-gray-800">{title}</h4>
    <p className="text-sm text-gray-600">{detail}</p>
  </div>
);

// --- TAB CONTENT COMPONENTS (DPR Content) ---

const DPROverviewContent = () => (
  <section id="dpr-overview-content" className="py-12 scroll-mt-24">
    <h2 className="mb-6 text-3xl font-bold text-gray-800">DPR (Detailed Project Report) - An Overview</h2>
    <p className="max-w-4xl mb-4 text-lg text-gray-700">
      **DPR stands for Detailed Project Report**. It is a comprehensive document that outlines all aspects of a proposed project, from conception to completion. It is used by various stakeholders, including investors, lenders, and government agencies, to assess the **feasibility and viability** of a project.
    </p>
    <p className="max-w-4xl mb-8 text-lg text-gray-700">
      At Vakilsearch, we understand that a DPR is **essential for any business seeking financial assistance**, especially when applying for a bank loan. A well-prepared DPR significantly impacts your chances of securing the necessary funds to make your project a reality.
    </p>
  </section>
);

const DPRBenefitsContent = () => (
  <section id="dpr-benefits-content" className="py-12 scroll-mt-24">
    <h3 className="mb-8 text-3xl font-bold text-gray-800">Benefits of Choosing Vakilsearch for Your DPR</h3>

    <div className="space-y-4">
      {dprBenefits.map((benefit, i) => {
        const [title, description] = benefit.split(':').map(s => s.trim());
        const Icon = i === 0 ? TrendingUp : i === 1 ? Clock : i === 2 ? FileText : i === 3 ? Target : Users;
        return (
          <div key={i} className="flex items-start gap-3 p-5 border border-blue-200 shadow-sm bg-blue-50 rounded-xl">
            <Icon className="w-6 h-6 text-[#022B50] mt-1 flex-shrink-0" />
            <div>
              <h4 className="mb-1 text-xl font-bold text-gray-800">{title}</h4>
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
    <h3 className="mb-6 text-3xl font-bold text-gray-800">Documents Required</h3>
    <p className="max-w-4xl mb-8 text-lg text-gray-700">
      The documents required for a DPR vary, but the following are typically essential for any lender or investor to assess the project's scope and viability.
    </p>

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {dprDocuments.map((doc, i) => (
        <div key={i} className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <FileText className="flex-shrink-0 w-5 h-5 mt-1 text-red-500" />
          <p className="font-medium text-gray-700">{doc}</p>
        </div>
      ))}
    </div>
  </section>
);

const DPRServicesIncludeContent = () => (
  <section id="dpr-services-include-content" className="py-12 scroll-mt-24">
    <h3 className="mb-6 text-3xl font-bold text-gray-800">Our DPR Service Includes</h3>
    <p className="max-w-4xl mb-8 text-lg text-gray-700">
      We provide a holistic service, covering every crucial aspect that banks and lending institutions evaluate, ensuring a comprehensive and robust project presentation.
    </p>

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
    <h3 className="mb-6 text-3xl font-bold text-gray-800">Why Vakilsearch?</h3>
    <p className="max-w-4xl mb-8 text-lg text-gray-700">
      Our commitment goes beyond document preparation. We ensure your DPR is **strategically sound, compliant, and tailored** for maximum funding appeal.
    </p>

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {whyVakilsearchDPR.map((reason, i) => {
        const [title, description] = reason.split(':').map(s => s.trim());
        const Icon = i === 0 ? Lightbulb : i === 1 ? Target : Scale;
        return (
          <div key={i} className="flex items-start gap-3 p-5 border border-indigo-200 shadow-sm bg-indigo-50 rounded-xl">
            <Icon className="w-6 h-6 text-[#022B50] mt-1 flex-shrink-0" />
            <div>
              <h4 className="mb-1 text-lg font-bold text-gray-800">{title}</h4>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
        );
      })}
    </div>

    <div className="mt-12 p-6 bg-[#E6F0F6] rounded-xl border-l-4 border-amber-500 shadow-md">
      <h4 className="flex items-center gap-2 mb-2 text-xl font-bold text-gray-800"><Handshake className="w-5 h-5 text-amber-500" /> Consult an Expert</h4>
      <ul className="space-y-2 text-gray-700 list-none">
        <li className="flex items-start gap-2"><ArrowRight className="flex-shrink-0 w-4 h-4 mt-1" /> All queries are clarified in **30 minutes**.</li>
        <li className="flex items-start gap-2"><ArrowRight className="flex-shrink-0 w-4 h-4 mt-1" /> Provide ongoing support and guidance during the project implementation phase.</li>
      </ul>
    </div>
  </section>
);

const DPRFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
  <section id="dpr-faqs-content" className="max-w-5xl py-12 mx-auto scroll-mt-24">
    <h3 className="mb-8 text-3xl font-bold text-center text-gray-800">FAQs on DPR (Detailed Project Report) Service</h3>

    <div className="space-y-4">
      {faqs.map((f, i) => (
        <div key={i} className="overflow-hidden border border-gray-200 shadow-sm rounded-xl">
          <button
            className={`w-full flex justify-between items-center p-5 text-left transition ${faqOpen === i ? 'bg-[#E6F0F6] text-[#022B50]' : 'bg-white hover:bg-gray-50'}`}
            onClick={() => setFaqOpen(faqOpen === i ? null : i)}
          >
            <span className="text-lg font-semibold">{f.q}</span>
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
        <div className="relative px-4 pt-12 mx-auto max-w-7xl md:px-8">
          {/* Background Image Section */}
          <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
            <img
              src={BackgroundImageSrc}
              alt="Detailed Project Report background"
              className="absolute top-0 left-0 object-cover w-full h-full"
            />
          </div>

          {/* Main Content */}
          <div className="relative z-20 flex flex-col items-start pt-10 pb-12 lg:flex-row lg:pb-0">

            {/* Left Column - Text Content */}
            <div className="relative z-20 w-full p-4 pb-20 text-black lg:w-3/5 md:p-6">

              {/* Badge */}
              <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-2 items-center gap-2">
                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                #1 Legal Service Provider In India
              </div>

              {/* Title */}
              <h1 className="mb-4 text-4xl font-extrabold leading-tight text-black md:text-5xl lg:text-6xl">
                DPR (Detailed Project Report) Service
              </h1>

              {/* Description / Bullet Points */}
              <div className="mb-8 space-y-3 text-sm text-gray-800 lg:text-base">
                <p className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-3 h-3 mt-2 bg-black rounded-full"></span>
                  Professionally crafted DPR to enhance project credibility and attract funding.
                </p>
                <p className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-3 h-3 mt-2 bg-black rounded-full"></span>
                  Includes **risk analysis**, **regulatory compliance**, and detailed financial insights.
                </p>
                <p className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-3 h-3 mt-2 bg-black rounded-full"></span>
                  Legal Expert support for data presentation and clear project positioning.
                </p>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="w-full lg:w-[350px] relative z-30 lg:mt-0 lg:ml-auto mt-[-100px] sm:mt-[-50px]">
              <div
                className="w-full p-6 bg-white shadow-xl md:p-8 rounded-2xl"
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
                    <p className="text-xs font-medium md:text-sm">Get easy updates through WhatsApp</p>
                    {/* Simplified Toggle UI - functional state is not implemented here */}
                    <div className="w-10 h-5 bg-gray-300 rounded-full relative cursor-pointer flex items-center p-0.5 transition-colors">
                      <div className="w-4 h-4 transition-transform transform translate-x-0 bg-white rounded-full shadow-md"></div>
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
      <section className="px-4 py-12 bg-gray-50 md:px-8">
        <div className="flex flex-col items-center mx-auto text-center max-w-7xl">
          <h3 className="mb-4 text-3xl font-bold text-gray-800">Why a Professional DPR Matters for Your Loan</h3>
          <p className="max-w-3xl mb-8 text-lg text-gray-700">A well-prepared Detailed Project Report (DPR) is the cornerstone of your loan application. It provides the bank with the confidence needed to invest in your project.</p>

          <div className="w-full max-w-2xl p-6 bg-white border border-gray-200 shadow-lg rounded-xl">
            <h4 className="flex items-center justify-center gap-3 mb-4 text-xl font-bold text-gray-800">
              <Handshake className="w-6 h-6 text-amber-500" />
              Connect with an Expert Now
            </h4>
            <p className="mb-6 text-gray-600">Let our team ensure your project is positioned perfectly for funding success.</p>
            <button
              type="button"
              className="px-8 py-3 text-base font-semibold text-white transition-colors rounded-lg shadow-md bg-amber-500 hover:bg-amber-600"
            >
              Talk to us
            </button>
          </div>
        </div>
      </section>

      {/* === Main Content Tabs Navigation (Sticky) === */}
      <section className="sticky top-0 z-30 px-4 py-4 bg-white border-b border-gray-200 shadow-md md:py-6 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center w-full overflow-x-auto text-xs bg-white border border-gray-200 rounded-xl md:text-sm lg:text-base">
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
      <div className="px-4 py-2 md:py-4 md:px-8">
        <div className="mx-auto max-w-7xl">
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