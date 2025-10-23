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
  Globe, // New icon for global markets
  DollarSign, // New icon for cost/tax
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from '../../assets/business.png';
// --- USA REGISTRATION STATIC DATA DEFINITIONS ---

const usaRegTabs = [
  { id: 'usa-overview-content', label: 'Overview' },
  { id: 'usa-advantages-content', label: 'Key Advantages' },
  { id: 'usa-types-content', label: 'Types' },
  { id: 'usa-process-content', label: 'Process' },
  { id: 'usa-documents-content', label: 'Documents' },
  { id: 'usa-cost-content', label: 'Cost' },
  { id: 'usa-how-vakilsearch', label: 'How Vakilsearch Helps' },
  { id: 'usa-faqs-content', label: 'FAQs' },
];

const entityTypesData = [
  { type: "LLC (Limited Liability Company in USA)", pros: "Flexible structure, limited liability, pass-through taxation, low compliance", cons: "Not VC-friendly, state laws differ" },
  { type: "C Corporation (C Corp)", pros: "Strong liability protection, unlimited shareholders, easy to raise venture capital, globally recognised", cons: "Double taxation (corporate + dividends), more compliance" },
  { type: "S Corporation (S Corp)", pros: "Pass-through taxation, limited liability, tax savings for US founders", cons: "Only US citizens/residents eligible, max 100 shareholders" },
  { type: "Sole Proprietorship", pros: "Easy to start, low cost, complete control", cons: "Unlimited personal liability, limited credibility/funding" },
  { type: "Partnership (General/Limited)", pros: "Shared resources and responsibilities, simple setup", cons: "Liability risks for general partners, potential disputes" },
];

const usaProcessSteps = [
  "Selecting the Appropriate Business Structure: We assist you in selecting between an LLC and C-Corporation depending on your tax objectives, capital-raising strategy, and growth plan.",
  "Choosing the Ideal State of Incorporation: Our experts assist you in selecting business-friendly states such as Delaware, Wyoming, or Nevada—or incorporating in your desired operating state.",
  "Name Reservation: We verify name availability and reserve your business name as per state regulations.",
  "US Registered Agent Appointment: Vakilsearch supplies or organises a registered agent in the U.S. to take care of official government communications on your behalf.",
  "Filing the Incorporation Documents: We submit all the documents—Articles of Incorporation or Articles of Organisation—to the concerned state authority.",
  "Get Your EIN (Employer Identification Number): We apply for your EIN with the IRS, which you need to file taxes, bank in the U.S., and conduct business in the U.S.",
  "Opening a U.S. Business Bank Account: Vakilsearch helps you open a U.S. business bank account—some banks facilitate remote account opening for non-residents.",
  "Business Licenses & Compliance: If your business activity requires federal or state-specific licenses, we’ll help you identify and apply for the necessary approvals.",
];

const mandatoryDocuments = [
  "Valid Passport for US Registration – identification for overseas owners/directors.",
  "Business Name Approval – confirmation that your proposed name is available in the state registry.",
  "Articles of Organisation (for LLC) or Articles of Incorporation (for Corporation) – formal state filing documents.",
  "Registered Agent Details – contact details of your nominated US registered agent.",
  "Operating Agreement (for LLC) – details internal structure, ownership, and management guidelines.",
  "Employer Identification Number (EIN) – for taxes and banking.",
];

const optionalDocuments = [
  "Proof of residential address (utility bill, bank statement).",
  "Shareholder/Director agreements (particularly for C-Corp arrangements).",
  "Business licenses or permits (sector-specific).",
  "Apostille/Notarized documents if needed by the bank or investors.",
];

const usaFAQs = [
  { q: "What is the easiest way to register a company in the USA?", a: "The easiest way is typically to incorporate online in a state like Wyoming or Delaware, and use a service provider like Vakilsearch to handle the end-to-end process remotely." },
  { q: "Can a non-resident register a company in the USA?", a: "Yes, non-residents can register a company (typically an LLC or C-Corp) in the USA without being a U.S. citizen or permanent resident." },
  { q: "Which is the best state to incorporate a company in the USA?", a: "Delaware is popular for C-Corps aiming for VC funding due to its established corporate law. Wyoming is popular for LLCs due to lower fees and privacy." },
  { q: "How long does it take to incorporate in the USA?", a: "Incorporation can take as little as 1-5 working days, with the EIN application process typically taking 1-2 weeks, depending on the IRS backlog and the non-resident status." },
  { q: "What is an EIN and why is it needed?", a: "The EIN (Employer Identification Number) is a unique nine-digit number assigned by the IRS to business entities for tax purposes. It's necessary for hiring employees, opening a bank account, and filing taxes." },
  { q: "Is a US bank account mandatory for foreign founders?", a: "While not legally mandatory to register the company, it is essential for business operations, processing payments, and managing U.S. financial transactions." },
  { q: "What are the annual maintenance requirements?", a: "Requirements typically include filing an Annual Report (or similar state form) and paying the annual Franchise Tax (varies by state), plus filing federal tax returns with the IRS." },
  { q: "Do I need to visit the USA to start a company?", a: "No, U.S. company registration, EIN acquisition, and often bank account opening can all be completed 100% online for non-residents." },
  { q: "Can I open an LLC as a single owner?", a: "Yes, you can form a Single-Member LLC." },
  { q: "What are the tax implications of a US LLC or C-Corp?", a: "LLCs often have 'pass-through' taxation, meaning income is taxed at the owner's level. C-Corps are subject to 'double taxation' (corporate tax and tax on dividends). Consult an expert for precise advice." },
  { q: "What is a separate legal entity, and why does it matter in company registration?", a: "A separate legal entity (like an LLC or Corporation) means the business is legally distinct from its owners, protecting the owners from the business's debts and liabilities." },
  { q: "Which business entity should I choose: LLC, Corporation, or S Corp?", a: "C-Corp is best for fundraising and growth; LLC is best for simplicity and flexibility; S-Corp is restricted to US residents/citizens." },
];

const vakilsearchServices = [
  "Business Structure Advisory – Guidance on choosing the right entity (LLC, C-Corp, etc.) based on your goals, tax needs, and investor requirements.",
  "Documentation Assistance – Preparation and filing of Articles of Organization/ Incorporation, Operating Agreements, and other necessary paperwork.",
  "EIN Registration – Fast and accurate IRS Employer Identification Number application.",
  "US Registered Agent Appointment – Mandatory agent service to receive official state correspondence.",
  "Banking & Compliance Support – Guidance on U.S. business bank account setup, franchise tax filings, annual reports, and IRS returns.",
  "Expert Legal & Accounting Support – Ongoing advisory for taxation, accounting, and compliance to keep your business in good standing.",
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


// --- TAB CONTENT COMPONENTS (USA Reg Content) ---

const USAOverviewContent = () => (
  <section id="usa-overview-content" className="py-12 scroll-mt-24">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Introduction</h2>
    <p className="text-lg text-gray-700 mb-4 max-w-4xl">
      Incorporating your company in the U.S. provides **international credibility**, **investor confidence**, and access to the largest consumer and capital markets in the world. The USA consistently scores high on ease of doing business with a transparent legal framework and robust intellectual property protections, making it an ideal location for creators and high-growth businesses.
    </p>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      One of the main benefits is that **US incorporation can be conducted fully online**, which is easy for non-residents and NRIs to do without having to move. Whether fundraising, expanding globally, or accessing the North American market, USA business registration provides serious global opportunities.
    </p>

    <div className="p-6 bg-[#E6F0F6] rounded-xl border-l-4 border-[#022B50] shadow-md">
      <p className="text-gray-800 font-semibold">
        With Vakilsearch, it's even simpler. We take care of everything from documentation to compliance so you can open your US-based company **100% online**. Start your international journey quickly and securely.
      </p>
    </div>
  </section>
);

const USAAdvantagesContent = () => (
  <section id="usa-advantages-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-8 text-gray-800">Key Advantages of US Incorporation</h3>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DetailItem
        title="Global Market Access"
        description="Access both U.S. customers and global partners with increased credibility and trust."
        icon={Globe}
      />
      <DetailItem
        title="Investor Confidence"
        description="The USA has top-performing venture capital companies and angel investors, making it simpler to raise funds."
        icon={Zap}
      />
      <DetailItem
        title="Flexible Tax System"
        description="Enjoy state-based taxation. Jurisdictions such as Delaware and Wyoming provide simplified compliance and hospitable tax treatment."
        icon={DollarSign}
      />
      <DetailItem
        title="Startup-Friendly Legal Framework"
        description="Robust IP protection, business-friendly regulations, and legislation to foster innovation and entrepreneurship."
        icon={Scale}
      />
      <DetailItem
        title="Seamless Online Registration"
        description="Incorporation is possible 100% online—perfect for non-residents and NRIs who want to penetrate the U.S. market without having to move."
        icon={Smartphone}
      />
      <DetailItem
        title="Quicker International Expansion"
        description="U.S. registration enhances your brand's reputation and provides access to global markets and collaboration."
        icon={ArrowRight}
      />
    </div>
  </section>
);

const EntityTypeTable = ({ data }) => (
  <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200 mt-6">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-[#E6F0F6]">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Entity Type</th>
          <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Pros</th>
          <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Cons</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {data.map((row, i) => (
          <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
            <td className="px-6 py-4 whitespace-normal text-sm font-semibold text-[#022B50] min-w-[150px]">{row.type}</td>
            <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">{row.pros}</td>
            <td className="px-6 py-4 whitespace-normal text-sm text-red-600">{row.cons}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const USATypesContent = () => (
  <section id="usa-types-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Types of Business Entities in the USA</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Entrepreneurs must choose the right company structures in the USA that balance tax efficiency, compliance, and fundraising needs. Below is a comparison of the most common options:
    </p>

    <EntityTypeTable data={entityTypesData} />
  </section>
);

const USAProcessContent = () => (
  <section id="usa-process-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Step-by-Step Process for USA Company Registration</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Company registration in the USA may appear daunting, particularly for international founders—but with Vakilsearch, it is quick, compliant, and **100% online**. From deciding on the most suitable entity to obtaining your EIN and opening a U.S. bank account, we take care of the end-to-end process.
    </p>

    <ol className="space-y-5 list-none border-l-2 border-[#022B50] pl-4">
      {usaProcessSteps.map((step, i) => (
        <ProcessStep key={i} stepNumber={i + 1} step={step} />
      ))}
    </ol>
  </section>
);

const USADocumentsContent = () => (
  <section id="usa-documents-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Documents Required for Incorporating a Company in the USA</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      When setting up a business in the USA, both foreign founders and local entrepreneurs must prepare certain documents. While most of the process is digital, the following paperwork is typically required:
    </p>

    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h4 className="text-2xl font-bold text-[#022B50] mb-4">Mandatory Documents:</h4>
        <ul className="space-y-3 text-gray-700">
          {mandatoryDocuments.map((doc, i) => (
            <li key={i} className="flex items-start gap-2">
              <FileText className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
              <span>{doc}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-2xl font-bold text-[#022B50] mb-4">Optional / Supporting Documents:</h4>
        <ul className="space-y-3 text-gray-700">
          {optionalDocuments.map((doc, i) => (
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

const USACostContent = () => (
  <section id="usa-cost-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Cost of Company Registration in the USA</h3>
    <p className="text-lg text-gray-700 mb-4 max-w-4xl">
      The **USA company incorporation fees** vary depending on the state, entity type, and additional services. On average, setting up a company in the US can cost between **$200 and $1,000**. This includes state filing fees, registered agent charges, and compliance paperwork.
    </p>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
        <h4 className="font-semibold text-lg text-gray-800">Delaware Registration Cost:</h4>
        <p className="text-gray-600">$90–$300 for filing, plus annual franchise tax.</p>
      </div>
      <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
        <h4 className="font-semibold text-lg text-gray-800">Wyoming:</h4>
        <p className="text-gray-600">Around $100–$150 for LLC filing, with low ongoing maintenance.</p>
      </div>
      <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
        <h4 className="font-semibold text-lg text-gray-800">Nevada:</h4>
        <p className="text-gray-600">$350–$500 including state business license requirements.</p>
      </div>
      <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500 sm:col-span-2 lg:col-span-3">
        <h4 className="font-semibold text-lg text-gray-800">EIN Pricing:</h4>
        <p className="text-gray-600">Free if obtained directly from the IRS, though service providers may charge $50–$150 for assistance.</p>
      </div>
    </div>

    <p className="text-sm text-gray-500 italic border-t pt-4">
      Disclaimer: The costs mentioned are estimates and may vary based on the specific state requirements, business structure, and additional services chosen. Always verify current fees with the relevant state authorities or a professional advisor before proceeding.
    </p>
    <p className="mt-4 text-lg font-bold text-[#022B50]">
      Contact us today for personalised assistance and transparent pricing tailored to your business needs!
    </p>

    <h4 className="text-2xl font-bold text-gray-800 mt-12 mb-6">Post-Incorporation Compliance Requirements</h4>
    <p className="text-lg text-gray-700 mb-4 max-w-4xl">
      After your company has been incorporated in the USA, being compliant is as vital as incorporation. Being non-compliant can result in hefty fines, penalties, or even the dissolution of the company.
    </p>

    <ul className="space-y-3 text-gray-700 max-w-4xl">
      <li className="flex items-start gap-2"><Briefcase className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />**Annual Report LLC:** Majority of states mandate LLCs and corporations to file annual or biennially reports.</li>
      <li className="flex items-start gap-2"><Briefcase className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />**Franchise Tax USA:** Delaware ($300 minimum) and California ($800 minimum) charge annual franchise taxes regardless of income.</li>
      <li className="flex items-start gap-2"><Briefcase className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />**IRS Compliance for C-Corp:** C-Corps must file yearly federal tax returns (Form 1120) and foreign-owned businesses may also file Form 5472.</li>
      <li className="flex items-start gap-2"><Briefcase className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />**EIN Updates & Banking Compliance:** Update IRS records in case of change in ownership, and follow U.S. banking compliance.</li>
    </ul>
  </section>
);

const USAHowVakilsearch = () => (
  <section id="usa-how-vakilsearch" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">How Vakilsearch Helps with USA Company Registration</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      At Vakilsearch, we simplify the complex process of starting a business in the United States. Our US incorporation services are designed for entrepreneurs in India and across the globe, ensuring a smooth and error-free experience.
    </p>

    <div className="grid sm:grid-cols-2 gap-6">
      {vakilsearchServices.map((service, i) => (
        <div key={i} className="p-5 bg-indigo-50 rounded-xl shadow-sm border border-indigo-200">
          <h4 className="font-bold text-xl text-gray-800 mb-2">{service.split('–')[0].trim()}</h4>
          <p className="text-sm text-gray-600">{service.split('–')[1].trim()}</p>
        </div>
      ))}
    </div>
  </section>
);

const USAFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
  <section id="usa-faqs-content" className="py-12 max-w-5xl mx-auto scroll-mt-24">
    <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">FAQs on Company Registration in the USA</h3>

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
            {/* Assuming 'a' contains the answer text for FAQ data */}
            <p className="px-5 py-4 text-gray-700 bg-white">{f.a}</p>
          </motion.div>
        </div>
      ))}
    </div>
  </section>
);


// --- MAIN COMPONENT ---
export default function USInc() {
  const [activeTab, setActiveTab] = useState(usaRegTabs[0].id);
  const [faqOpen, setFaqOpen] = useState(null);

  // Offset to account for the sticky header height when calculating scroll position
  const SCROLL_OFFSET = 120;

  // --- SCROLLSPY IMPLEMENTATION ---
  useEffect(() => {
    const sectionIds = usaRegTabs.map(tab => tab.id);

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
      {/* === HERO SECTION (USA Reg Specific) === */}
      <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">
          {/* Background Image Section */}
          <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
            <img
              src={BackgroundImageSrc}
              alt="USA company registration background"
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
                Company Registration in America (USA)
              </h1>

              {/* Description / Bullet Points */}
              <div className="space-y-3 mb-8 text-sm lg:text-base text-gray-800">
                <p className="flex items-start gap-3">
                  <span className="w-3 h-3 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  Register your U.S. company in just 10 working days, with EIN issued in under 48 hours*. T&C apply.
                </p>
                <p className="flex items-start gap-3">
                  <span className="w-3 h-3 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  Launch your American business for only $499 + taxes with expert-assisted documentation and filing.
                </p>
                <p className="flex items-start gap-3">
                  <span className="w-3 h-3 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  Incorporate as a C Corporation to attract venture capital and startup investors confidently.
                </p>
              </div>

              {/* Optional Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button className="bg-[#113C6D] hover:bg-indigo-900 text-white font-medium px-5 py-2 rounded-lg shadow-md transition">
                  ▶ Watch to Know About US Incorp
                </button>
                <button className="bg-white text-[#113C6D] font-medium px-5 py-2 rounded-lg shadow-md transition border border-[#113C6D]">
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
                  <h2 className="text-xl font-semibold text-gray-800">Register Your Company Today</h2>
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

                  {/* EMI Note */}
                  <p className="text-xs text-gray-600 text-center mt-3">
                    Easy monthly EMI options available
                  </p>

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
      <section className="py-4 md:py-6 px-4 md:px-8 bg-white border-b border-gray-200 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center bg-white rounded-xl w-full text-xs md:text-sm lg:text-base overflow-x-auto border border-gray-200">
            {usaRegTabs.map((tab) => (
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
          <USAOverviewContent />
          <USAAdvantagesContent />
          <USATypesContent />
          <USAProcessContent />
          <USADocumentsContent />
          <USACostContent />
          <USAHowVakilsearch />
          <USAFAQsContent faqs={usaFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
        </div>
      </div>

    </div>
  );
}