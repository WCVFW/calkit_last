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
  Handshake, // New icon for investor connect/partnership
  TrendingUp, // New icon for stages/growth
  Lightbulb, // New icon for idea/strategy
  CreditCard, // New icon for debt/finance
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from '../../assets/business.png'; // Reusing the same image for the background

// --- FUNDRAISING STATIC DATA DEFINITIONS ---

const fundRegTabs = [
  { id: 'fund-overview-content', label: 'Overview' },
  { id: 'fund-definition-content', label: 'Definition' },
  { id: 'fund-types-content', label: 'Types' },
  { id: 'fund-stages-content', label: 'Stages' },
  { id: 'fund-documents-content', label: 'Documents' },
  { id: 'fund-why-vakilsearch', label: 'Why Vakilsearch?' },
  { id: 'fund-faqs-content', label: 'FAQs' },
];

const fundTypesData = [
  { type: "Equity Financing", pros: "Best for high-growth, no repayment pressure", cons: "Dilution of ownership, less control" },
  { type: "Debt Financing", pros: "Maintain full ownership, interest is tax-deductible", cons: "Mandatory repayment puts pressure on cash flow" },
  { type: "SAFE Notes", pros: "Founder-friendly, simple and quick early-stage funding", cons: "Potential unforeseen dilution in future rounds" },
  { type: "Grants", pros: "Non-repayable capital, no equity dilution, ideal for R&D", cons: "Highly competitive, time-consuming application process" },
  { type: "Bootstrapping", pros: "Complete control and autonomy, no external reporting", cons: "Slower expansion, constrained capital limits scaling" },
  { type: "Crowdfunding", pros: "Validates product, establishes community, public buzz", cons: "High resource drain for campaign management, public expectation pressure" },
];

const fundStageData = [
  { stage: "Idea Stage", round: "Pre-seed", fundSize: "₹5L–₹25L", source: "Founders, Friends, Angel" },
  { stage: "Early Stage", round: "Seed", fundSize: "₹25L–₹2 Cr", source: "Angel Investors, Incubators" },
  { stage: "Growth Stage", round: "Series A", fundSize: "₹2 Cr–₹10 Cr", source: "VC Firms" },
  { stage: "Expansion Stage", round: "Series B/C", fundSize: "₹10 Cr+", source: "Institutional VCs" },
];

const mandatoryDocuments = [
  "Pitch Deck – Overview of the business, traction, team, and financials.",
  "Business Plan – In-depth strategy, projections, and market analysis.",
  "Term Sheet (Draft) – Investment terms and conditions summary.",
  "Shareholders' Agreement (SHA) – Post-deal governance, rights, and responsibilities.",
  "Cap Table – Existing shareholding structure and equity distribution.",
  "Company Incorporation Documents – CIN, PAN, MOA, AOA.",
  "Financial Statements – Audited accounts, P&L, and balance sheets.",
  "Founders' KYC Documents – PAN, Aadhaar, and address proof.",
];

const complianceEssentials = [
  "Appropriate Company Incorporation (Pvt Ltd is recommended for equity funding).",
  "DPIIT Startup India Registration (for tax relief and credibility).",
  "FEMA Compliance (for foreign investment and FDI norms).",
  "Valuation Report (prepared by a registered valuer or CA).",
  "Clean Cap Table & Shareholding Structure.",
  "Founders' Agreements and Roles Defined.",
  "GST Registration (particularly for service/product-based startups).",
  "IP, Trademark, and Licensing Documents (if relevant).",
];

const vakilsearchServices = [
  "Pitch Deck Creation – Investor-ready presentations that clearly present your business story and value.",
  "Financial Modeling – Develop accurate forecasts and ascertain realistic valuations.",
  "Valuation Reports – Professionally certified reports to aid in equity negotiations and compliance.",
  "Business Plan Analysis – Expert insights to fortify your plan prior to investor review.",
  "Application to Grants – Find and apply for eligible startup programs and government funding.",
  "Business Mentoring – Expert one-on-one guidance for key startup choices.",
  "Investor Connect – Direct access to a vetted universe of angels, VCs, and seed investors.",
  "Due Diligence – Legal, financial, and regulatory screenings to verify deal-readiness.",
  "DPR (Detailed Project Report) – Formal reports that are bankable and institutional investor-friendly.",
];

const fundFAQs = [
  { q: "What is fundraising for startups?", a: "Start-up fundraising is the activity of raising financial investment to fund business expansion, product development, or market penetration from sources like angel investors, VCs, or grants." },
  { q: "How to raise funding for a startup?", a: "Raising funds involves strategic planning, preparing investor-ready documents (Pitch Deck, Cap Table), determining the right valuation, and approaching investors or applying for grants relevant to your growth stage." },
  { q: "What is series ABC funding?", a: "Series A, B, and C refer to progressive stages of venture capital funding. Series A is typically the first institutional round to scale a proven business model. Series B funds further market expansion, and Series C and beyond are for major expansion, M&A, or IPO preparation." },
  { q: "Is this a guaranteed or assured fundraise process?", a: "No, fundraising is inherently risk-based. Vakilsearch assures complete support in making you investor-ready, providing expert documentation, and connecting you with potential investors, but cannot guarantee a successful fundraise." },
  { q: "What is a SAFE note and is it legal in India?", a: "A SAFE (Simple Agreement for Future Equity) Note is a founder-friendly agreement where an investor provides funds in exchange for the right to receive equity in a future priced round. While popular in the US, its legal status and use in India are subject to specific regulatory compliance, and expert consultation is crucial." },
  { q: "Do I need DPIIT registration for funding?", a: "DPIIT Startup India registration is not strictly mandatory for all funding but provides significant benefits, including tax exemptions and access to government schemes, which can increase your startup's attractiveness to investors." },
  { q: "How much equity should I give in seed funding?", a: "Typically, founders dilute around 10% to 25% equity in a Seed funding round, but this varies based on valuation, amount raised, and negotiation. It is essential to balance raising capital with maintaining sufficient ownership for future rounds." },
  { q: "How can founders maintain control while raising funds?", a: "Founders can maintain control by negotiating terms that grant them superior voting rights, raising smaller rounds at higher valuations, or opting for debt/grants instead of equity when possible." },
];


// --- REUSABLE COMPONENTS ---

// Reusing existing components: ReviewBox, ProcessStep, DetailItem, FooterColumn
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


// --- TAB CONTENT COMPONENTS (Fundraising Content) ---

const FundOverviewContent = () => (
  <section id="fund-overview-content" className="py-12 scroll-mt-24">
    <h2 className="mb-6 text-3xl font-bold text-gray-800">Overview</h2>
    <p className="max-w-4xl mb-4 text-lg text-gray-700">
      Start-up fundraising is the activity of raising financial investment to fund business expansion, product development, or market penetration. This money can be sourced from **angel investors, venture capitalists, crowdfunding, or government grants**. Mismanagement of fundraising can result in compliance problems, forced equity dilution, or legal delays that can foul future investment prospects.
    </p>
    <p className="max-w-4xl mb-8 text-lg text-gray-700">
      At Vakilsearch we assist fundraising with expert advice to guarantee **strategic planning, compliance with regulations, and improved long-term results** for startups.
    </p>

    <div className="p-6 bg-[#E6F0F6] rounded-xl border-l-4 border-[#022B50] shadow-md">
      <h3 className="text-2xl font-bold mb-4 text-[#022B50]">What Is Fundraising for Startups?</h3>
      <p className="font-medium text-gray-800">
        Fundraising is an important aspect of developing a business startup, particularly in the case of startups as most startups do not have enough money. Startup entrepreneurs usually start with using personal funds or borrowing money from friends and relatives. This initial source of money, **pre-seed funding**, is used to test whether a business idea works and create a simple business model.
      </p>
      <p className="mt-3 font-medium text-gray-800">
        It lays the foundation for the seed stage, where more formal **seed funding** can be raised from angel investors or investment companies. Such early-stage investments facilitate business growth, product testing, and determination of a target market.
      </p>
    </div>
  </section>
);

const FundDefinitionContent = () => (
    <section id="fund-definition-content" className="py-12 scroll-mt-24">
        <h3 className="mb-8 text-3xl font-bold text-gray-800">Key Fundraising Aims</h3>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <DetailItem
                title="Business Expansion"
                description="Secure capital to enter new markets, acquire competitors, or increase production capacity."
                icon={TrendingUp}
            />
            <DetailItem
                title="Investor Readiness"
                description="Prepare all legal, financial, and business documents to be appealing and compliant for VCs."
                icon={Handshake}
            />
            <DetailItem
                title="Strategic Dilution"
                description="Determine the optimal equity to trade for capital and strategic guidance without losing control."
                icon={Scale}
            />
            <DetailItem
                title="Compliance Certainty"
                description="Ensure all funding is legally compliant with SEBI, FEMA, and Companies Act regulations."
                icon={CheckCircle}
            />
            <DetailItem
                title="Product/Tech Development"
                description="Fund essential research, development, and scaling of core product technology."
                icon={Zap}
            />
            <DetailItem
                title="Market Penetration"
                description="Finance aggressive marketing, sales efforts, and team growth to capture market share."
                icon={Globe}
            />
        </div>
    </section>
);

const FundTypeTable = ({ data }) => (
  <div className="mt-6 overflow-x-auto bg-white border border-gray-200 shadow-lg rounded-xl">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-[#E6F0F6]">
        <tr>
          <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-gray-700 uppercase">Funding Type</th>
          <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-gray-700 uppercase">Pros</th>
          <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-gray-700 uppercase">Cons</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {data.map((row, i) => (
          <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
            <td className="px-6 py-4 whitespace-normal text-sm font-semibold text-[#022B50] min-w-[150px]">{row.type}</td>
            <td className="px-6 py-4 text-sm text-gray-700 whitespace-normal">{row.pros}</td>
            <td className="px-6 py-4 text-sm text-red-600 whitespace-normal">{row.cons}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const FundTypesContent = () => (
  <section id="fund-types-content" className="py-12 scroll-mt-24">
    <h3 className="mb-6 text-3xl font-bold text-gray-800">Types of Startup Fundraising</h3>
    <p className="max-w-4xl mb-8 text-lg text-gray-700">
      Startups can raise money in different ways, each appropriate for different requirements and stages of development. The following is a complete description of the types:
    </p>

    <FundTypeTable data={fundTypesData} />
  </section>
);

const FundStagesTable = ({ data }) => (
  <div className="mt-6 overflow-x-auto bg-white border border-gray-200 shadow-lg rounded-xl">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-[#E6F0F6]">
        <tr>
          <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-gray-700 uppercase">Stage</th>
          <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-gray-700 uppercase">Round</th>
          <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-gray-700 uppercase">Fund Size (₹)</th>
          <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-gray-700 uppercase">Typical Source</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {data.map((row, i) => (
          <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
            <td className="px-6 py-4 text-sm font-semibold text-gray-800 whitespace-normal">{row.stage}</td>
            <td className="px-6 py-4 whitespace-normal text-sm font-bold text-[#022B50]">{row.round}</td>
            <td className="px-6 py-4 text-sm text-gray-700 whitespace-normal">{row.fundSize}</td>
            <td className="px-6 py-4 text-sm text-gray-600 whitespace-normal">{row.source}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const FundStagesContent = () => (
  <section id="fund-stages-content" className="py-12 scroll-mt-24">
    <h3 className="mb-6 text-3xl font-bold text-gray-800">Startup Funding Rounds & Stages</h3>
    <p className="max-w-4xl mb-8 text-lg text-gray-700">
      Startup funding goes through different stages, each corresponding to business development and risk levels. These investment companies assess equity financing opportunities in exchange for equity share, facilitating fast growth and driving the selected growth trajectory. Here is a simplified categorisation:
    </p>

    <FundStagesTable data={fundStageData} />

    <div className="max-w-4xl p-6 mt-8 border-l-4 border-green-500 shadow-md bg-green-50 rounded-xl">
      <h4 className="text-lg font-semibold text-gray-800">VC Value Addition</h4>
      <p className="text-sm text-gray-600">VCs provide not just capital but also strategic advice, legal support, and access to other potential investors. These collaborations refine the financial model, enhance marketing strategies, and make the company's competitive edge even better. With each round comes additional capital—and expectations. Select the appropriate funding round to fit your startup's current stage and objectives.</p>
    </div>
  </section>
);

const FundDocumentsContent = () => (
  <section id="fund-documents-content" className="py-12 scroll-mt-24">
    <h3 className="mb-6 text-3xl font-bold text-gray-800">Documents Required for Fundraising</h3>
    <p className="max-w-4xl mb-8 text-lg text-gray-700">
      Pre-deal, VCs and angel investors need critical documents to consider and close the investment. These startup funding documents provide **legal certainty and investor confidence**.
    </p>

    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <h4 className="text-2xl font-bold text-[#022B50] mb-4">Core Investment Documents:</h4>
        <ul className="space-y-3 text-gray-700">
          {mandatoryDocuments.map((doc, i) => (
            <li key={i} className="flex items-start gap-2">
              <FileText className="flex-shrink-0 w-5 h-5 mt-1 text-green-500" />
              <span>{doc}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-2xl font-bold text-[#022B50] mb-4">Legal & Compliance Essentials:</h4>
        <p className="mb-3 text-sm italic text-gray-600">
            Having these ready beforehand prevents delays, fosters trust, and facilitates easy closure of funding.
        </p>
        <ul className="space-y-3 text-gray-700">
          {complianceEssentials.map((doc, i) => (
            <li key={i} className="flex items-start gap-2">
              <Scale className="flex-shrink-0 w-5 h-5 mt-1 text-indigo-500" />
              <span>**{doc.split('(')[0].trim()}** ({doc.split('(').length > 1 ? doc.split('(')[1].slice(0, -1) : 'mandatory check'})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <p className="max-w-4xl mt-8 text-lg text-gray-700">
        Vakilsearch streamlines your fundraising process by having all necessary documents prepared for you, ranging from pitch decks to legal documents to make you **investor-ready** and **compliant with the law**.
    </p>
  </section>
);

const FundHowVakilsearch = () => (
  <section id="fund-why-vakilsearch" className="py-12 scroll-mt-24">
    <h3 className="mb-6 text-3xl font-bold text-gray-800">Vakilsearch Fundraising Support Services</h3>
    <p className="max-w-4xl mb-8 text-lg text-gray-700">
      Vakilsearch provides a **360° fundraising solution** to Indian startups. This is how we assist you in preparing and raising capital legally and with confidence:
    </p>

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {vakilsearchServices.map((service, i) => {
        const [title, description] = service.split('–').map(s => s.trim());
        const Icon = i % 3 === 0 ? Lightbulb : i % 3 === 1 ? Handshake : FileText; // Simple icon variation
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
  </section>
);

const FundFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
  <section id="fund-faqs-content" className="max-w-5xl py-12 mx-auto scroll-mt-24">
    <h3 className="mb-8 text-3xl font-bold text-center text-gray-800">Fundraising for Startups FAQs</h3>

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
export default function Fundraise() {
  const [activeTab, setActiveTab] = useState(fundRegTabs[0].id);
  const [faqOpen, setFaqOpen] = useState(null);

  const SCROLL_OFFSET = 120;

  // --- SCROLLSPY IMPLEMENTATION ---
  useEffect(() => {
    const sectionIds = fundRegTabs.map(tab => tab.id);

    const handleScroll = () => {
      let currentActiveTab = sectionIds[0];

      for (let i = 0; i < sectionIds.length; i++) {
        const sectionId = sectionIds[i];
        const section = document.getElementById(sectionId);

        if (section) {
          const rect = section.getBoundingClientRect();
          // Logic to check if the section's top edge is above or at the SCROLL_OFFSET line
          if (rect.top <= SCROLL_OFFSET) {
            currentActiveTab = sectionId;
          }
        }
      }

      // Check if the currentActiveTab is the last section and if we're scrolled to the bottom
      const isScrolledToBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 5; // -5 for tolerance
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
      {/* === HERO SECTION (Fundraising Specific) === */}
      <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
        <div className="relative px-4 pt-12 mx-auto max-w-7xl md:px-8">
          {/* Background Image Section */}
          <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
            <img
              src={BackgroundImageSrc}
              alt="Startup Fundraising background"
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
                Fundraising for Startups
              </h1>

              {/* Description / Bullet Points */}
              <div className="mb-8 space-y-3 text-sm text-gray-800 lg:text-base">
                <p className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-3 h-3 mt-2 bg-black rounded-full"></span>
                  Tailored fundraising strategies aligned with your current stage of growth.
                </p>
                <p className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-3 h-3 mt-2 bg-black rounded-full"></span>
                  Complete support—from investor readiness, documentation, compliance, and due diligence.
                </p>
                <p className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-3 h-3 mt-2 bg-black rounded-full"></span>
                  From equity to grants, we cover all funding paths that suit your goals.
                </p>
              </div>

              {/* Optional Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button className="bg-[#113C6D] hover:bg-indigo-900 text-white font-medium px-5 py-2 rounded-lg shadow-md transition">
                  ▶ Watch: How to Raise Funds?
                </button>
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
                  <h2 className="text-xl font-semibold text-gray-800">Raise Funds for Your Startup</h2>
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
                  {/* WhatsApp Toggle - Same logic as previous component, assuming state/logic is external or simple CSS */}
                  <div className="flex items-center justify-between pt-1 text-gray-700">
                    <p className="text-xs font-medium md:text-sm">Get easy updates through WhatsApp</p>
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


      {/* === Main Content Tabs Navigation (Sticky) === */}
      <section className="sticky top-0 z-30 px-4 py-4 bg-white border-b border-gray-200 shadow-md md:py-6 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center w-full overflow-x-auto text-xs bg-white border border-gray-200 rounded-xl md:text-sm lg:text-base">
            {fundRegTabs.map((tab) => (
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
          <FundOverviewContent />
          <FundDefinitionContent />
          <FundTypesContent />
          <FundStagesContent />
          <FundDocumentsContent />
          <FundHowVakilsearch />
          <FundFAQsContent faqs={fundFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
        </div>
      </div>

    </div>
  );
}