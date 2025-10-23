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
// Assume the path for your background image, updated for UAE context
import BackgroundImageSrc from '../../assets/business.png';


// --- UAE/DUBAI REGISTRATION STATIC DATA DEFINITIONS ---

const uaeRegTabs = [
  { id: 'uae-overview-content', label: 'Overview' },
  { id: 'uae-benefits-content', label: 'Benefits' },
  { id: 'uae-types-content', label: 'Types' },
  { id: 'uae-eligibility-content', label: 'Eligibility' },
  { id: 'uae-documents-content', label: 'Documents' },
  { id: 'uae-process-content', label: 'Procedure' },
  { id: 'uae-why-vakilsearch', label: 'Why Vakilsearch' },
  { id: 'uae-faqs-content', label: 'FAQs' },
];

const uaeBenefits = [
  { title: "Strategic Location", description: "Located at the crossroads of Europe, Asia, and Africa, ideal for global market reach.", icon: MapPin },
  { title: "Business-Friendly Environment", description: "Low taxes, simple regulations, and a highly skilled, English-speaking workforce.", icon: Users },
  { title: "Zero Taxes", description: "No corporate tax, personal income tax, or capital gains tax (though VAT applies).", icon: DollarSign },
  { title: "World-Class Infrastructure", description: "Modern airport, seaport, and road network supporting fast business operations.", icon: Globe },
  { title: "Vibrant Economy", description: "A rapidly growing economy providing maximum opportunities for expansion and success.", icon: Zap },
  { title: "Free Zones", description: "Offer special benefits like 100% foreign ownership and full profit repatriation.", icon: Landmark },
  { title: "Easy Visa Process", description: "Relatively easy visa process for foreign investors and employees.", icon: Briefcase },
];

const entityTypesDataUAE = [
  {
    type: "Mainland Company",
    description: "Allows operations anywhere in the UAE and overseas. Offers 100% foreign ownership for most activities and free trade access to the local market.",
    key_points: ["Free local trade", "100% foreign ownership", "Subject to UAE corporate tax"],
  },
  {
    type: "Free Zone Company",
    description: "Offers 100% foreign ownership, tax exemptions, and full profit repatriation. Best for international trade, e-commerce, and cost-effective entry.",
    key_points: ["100% ownership", "Tax exemptions", "Full profit repatriation"],
  },
  {
    type: "Offshore Company",
    description: "Formed for international business beyond the UAE. Provides secrecy, asset protection, and tax optimization without a physical office.",
    key_points: ["Asset protection", "Tax optimization", "No local presence"],
  },
];

const uaeEligibility = [
  "Age: You must be at least 18 years old to register a business.",
  "Nationality: There are generally no restrictions on nationality, though some free zones may have specific requirements.",
  "Criminal Record: You must not have any criminal convictions in the UAE or any other country.",
  "Funding: You must have the necessary funding to set up and operate your business.",
  "Business Plan: A detailed business plan outlining goals and strategies is required.",
  "Resident Visa: If you are not a UAE national, a resident visa is needed to live and work in the UAE.",
];

const uaeProcessSteps = [
  "Step 1: Choose Your Business Activity: Vakilsearch assists in deciding on the correct business activity to match your license and approvals.",
  "Step 2: Reserve a Trade Name: We help obtain a distinctive trade name complying with all UAE naming laws quickly.",
  "Step 3: Obtain Initial Approvals: Submit required papers to the concerned government offices to obtain your initial approvals.",
  "Step 4: Apply for Business License: Assist in choosing and acquiring the proper license (commercial, professional, or industrial).",
  "Step 5: Process Visas: Handle the application process for investor, employee, and dependent visas.",
  "Step 6: Secure Office Space: Assist in securing appropriate physical office space or flexi-desk arrangements based on license requirements.",
];

const uaeDocuments = [
  { title: "Basic Requirements (All Applicants)", docs: ["Passport-Sized Photos", "Contact Details (Email/Phone)", "Proof of Address"] },
  { title: "Business Requirements", docs: ["Business Plan (may be requested by some free zones)", "Trade Name Options", "No Objection Certificate (NOC) if required by current sponsor"] },
  { title: "Specific Document Needs", docs: ["Educational Degree (for certain job profiles)", "Previous Business License (if existing business in another state)", "Free Zone vs. Mainland documents vary"] },
];

const uaeCostCompliance = [
  { title: "Licensing Fees", cost: "Basic fee for trade license issuance and annual renewals (variable)", icon: FileText },
  { title: "Visa Charges", cost: "Investor, employee, and dependent visa fees (processing and medical examination charges)", icon: Users },
  { title: "Office Rental", cost: "Can range from flexi-desk area to complete offices (variable)", icon: MapPin },
  { title: "Vakilsearch Service Charges", cost: "Expert support for approvals, documentation, and compliance (open prices)", icon: DollarSign },
];

const uaeComplianceObligations = [
    { title: "License Renewals", details: "Trade licenses must be renewed annually. Free Zones like IFZA require audited accounts for renewal.", icon: Clock },
    { title: "Financial Audits", details: "Required for organizations with annual turnover > AED 3 million or 10+ employees. Simplified statements for smaller firms.", icon: Calculator },
    { title: "Visa Management", details: "Organizations are accountable for handling investor, employee, and dependent visas to comply with UAE immigration regulations.", icon: Briefcase },
    { title: "Regulatory Updates", details: "Must stay informed on updates in VAT, Economic Substance Regulations (ESR), and corporate taxation legislation to escape penalties.", icon: Scale },
];

const vakilsearchUAEServices = [
  "Extensive knowledge of UAE laws and regulations.",
  "Complete support ranging from licensing to visa processing.",
  "Complicated procedures made easy with minimal paperwork.",
  "Clear pricing and fast turnaround for Indian and international investors.",
];

const uaeFAQs = [
  { q: "Can foreigners own 100% of a company in Dubai?", a: "Yes, 100% foreign ownership is allowed, especially in Free Zones and now for many business activities in the Mainland." },
  { q: "What are the differences between Mainland and Free Zone companies?", a: "Mainland companies can trade freely across the UAE but are subject to local tax/regulations. Free Zone companies offer 100% foreign ownership and tax exemptions but were traditionally restricted to trading within the Free Zone." },
  { q: "How long does it take to set up a business in Dubai?", a: "Initial registration can be done under 24 hours (Free Zones). The complete process, including licensing and visa, usually takes a few weeks with professional assistance." },
  { q: "What documents do I need to register a company in Dubai?", a: "Passport copies, passport-sized photos, proof of address, and a business plan are commonly required. Documents vary by Free Zone/Mainland authority." },
  { q: "Is a local sponsor required for Mainland companies?", a: "No, a local sponsor is no longer required for most business activities on the Mainland, as 100% foreign ownership is now permitted for many sectors." },
  { q: "Can I set up a business in Dubai from India?", a: "Yes, you can initiate and complete most of the registration process remotely from India with the help of a registered business setup consultant like Vakilsearch." },
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


// --- TAB CONTENT COMPONENTS (UAE/Dubai Content) ---

const UAEOverviewContent = () => (
  <section id="uae-overview-content" className="py-12 scroll-mt-24">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Company Registration in Dubai</h2>
    <p className="text-lg text-gray-700 mb-4 max-w-4xl">
      Setting up business in Dubai is the act of setting up and registering a company in one of the world's most rapidly expanding business centers. Famous for its **geographically strategic position** that connects East and West, **tax-friendly investor policies**, and dynamic **Dubai free zone setup** opportunities, the city is a favorite destination for international entrepreneurs.
    </p>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Foreign investors benefit from **100% ownership**, **repatriation of profits**, and access to international markets. Vakilsearch's expertise ensures a smooth, compliant, and trouble-free path for companies to flourish and excel in **Dubai company registration**.
    </p>
  </section>
);

const UAEBenefitsContent = () => (
  <section id="uae-benefits-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-8 text-gray-800">Why Choose Dubai for Business Setup?</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      The advantages of Dubai business are unparalleled, making it a worldwide hot destination for entrepreneurs. This includes **zero personal income tax**, **100% foreign ownership** in Free Zones, and unrestricted profit repatriation.
    </p>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {uaeBenefits.map((benefit, i) => (
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

const UAETypesContent = () => (
  <section id="uae-types-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Types of Business Entities in Dubai</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Dubai has multiple business entities to cater to varied operational requirements and ownership patterns. It is important to know about these types to identify the most appropriate setup:
    </p>

    <div className="grid md:grid-cols-3 gap-6">
      {entityTypesDataUAE.map((data, i) => (
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
    </div>
  </section>
);

const UAEPIDetails = ({ title, data }) => (
    <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
        <h4 className="text-2xl font-bold text-[#022B50] mb-4">{title}</h4>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-[#E6F0F6]">
                    <tr>
                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Feature</th>
                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Mainland Companies</th>
                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Free Zone Companies</th>
                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Offshore Companies</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {data.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-4 py-3 text-sm font-semibold text-gray-800">{row.Feature}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{row.Mainland}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{row.FreeZone}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{row.Offshore}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const UAEDetailedProcedure = () => {
    // Data extracted and simplified from the full procedure section
    const comparisonTableData = [
        { Feature: "Tax", Mainland: "Subject to UAE corporate tax", FreeZone: "Not subject to UAE corporate tax", Offshore: "Not subject to UAE corporate tax" },
        { Feature: "Property Ownership", Mainland: "Can own property in the mainland", FreeZone: "Cannot own property in the mainland", Offshore: "Cannot own property in the UAE" },
        { Feature: "Trading", Mainland: "Can trade freely in the UAE", FreeZone: "Can only trade within the free zone", Offshore: "Can trade freely anywhere in the world" },
        { Feature: "Regulation", Mainland: "Subject to UAE business laws and regulations", FreeZone: "Subject to free zone regulations", Offshore: "Not subject to UAE business laws and regulations" },
    ];

    const licenseTypes = [
        { title: "Trade License", details: "Issued to companies engaged in trading activities.", icon: Briefcase },
        { title: "Industrial Licenses", details: "Issued to the companies engaged in manufacturing.", icon: Scale },
        { title: "Professional Licenses", details: "Issued to the companies working as service providers, professionals, artisans, and craftsmen.", icon: Users },
    ];

    return (
        <section id="uae-detailed-procedure" className="py-12 scroll-mt-24">
            <h3 className="text-3xl font-bold mb-6 text-gray-800">Detailed Procedure for Business Setup in Dubai</h3>
            
            <p className="text-lg text-gray-700 mb-8 max-w-4xl">
                The general steps for setting up a business in Dubai involve choosing the structure (Mainland, Free Zone, or Offshore), registering the name with the **Department of Economic Development (DED)**, obtaining the correct license, and securing visas and office space.
            </p>

            <h4 className="text-2xl font-bold text-[#022B50] mb-4">Types of Licenses Issued in the UAE</h4>
            <div className="grid md:grid-cols-3 gap-6">
                {licenseTypes.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-md border-l-4 border-yellow-500">
                        <item.icon className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                        <div>
                            <h5 className="font-semibold text-gray-800">{item.title}</h5>
                            <p className="text-sm text-gray-600">{item.details}</p>
                        </div>
                    </div>
                ))}
            </div>

            <UAEPIDetails title="Difference between Mainland, Freezone and Offshore Company in Dubai" data={comparisonTableData} />
            
            <h4 className="text-2xl font-bold text-[#022B50] mb-4 mt-8">Vakilsearch's Step-by-Step Procedure for Setting Up a Company in Dubai</h4>
            <ol className="space-y-5 list-none border-l-2 border-[#022B50] pl-4">
                {uaeProcessSteps.map((step, i) => (
                    <ProcessStep key={i} stepNumber={i + 1} step={step} />
                ))}
            </ol>
        </section>
    );
};

const UAEDocumentsContent = () => (
  <section id="uae-documents-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Documents Required for Dubai Company Formation</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Requirements for documents might differ based on whether you are registering in a Dubai free zone or mainland, but generally include:
    </p>

    <div className="grid md:grid-cols-3 gap-8">
      {uaeDocuments.map((category, i) => (
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

const UAECostCompliance = () => (
  <section id="uae-cost-compliance" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Cost of Business Setup in Dubai UAE & Compliance</h3>
    <p className="text-lg text-gray-700 mb-4 max-w-4xl">
      The Dubai business setup fee is different based on company type, activity, and location. Common fees include:
    </p>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {uaeCostCompliance.map((item, i) => (
        <div key={i} className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500 shadow-sm">
          <item.icon className="w-6 h-6 text-red-700 mb-2" />
          <h4 className="font-semibold text-lg text-gray-800">{item.title}</h4>
          <p className="text-gray-600 text-sm font-bold">{item.cost}</p>
        </div>
      ))}
    </div>

    <h4 className="text-2xl font-bold text-[#022B50] mb-4 mt-8">Post Business Setup Compliance and Support in Dubai</h4>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Following setup, local compliance is vital to ensure legal standing and continuity of operations, including timely renewal of licenses and financial audits.
    </p>

    <div className="grid md:grid-cols-2 gap-6">
      {uaeComplianceObligations.map((item, i) => (
        <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md border-l-4 border-yellow-600">
          <item.icon className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h5 className="font-semibold text-gray-800">{item.title}</h5>
            <p className="text-sm text-gray-600">{item.details}</p>
          </div>
        </div>
      ))}
    </div>
    <p className="mt-8 text-lg font-bold text-[#022B50]">
      By leaving your compliance tasks in Vakilsearch's hands, you can concentrate on expanding your business without worrying about a thing.
    </p>
  </section>
);

const UAEElegibilityContent = () => (
  <section id="uae-eligibility-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Eligibility Criteria for Company Registration In Dubai</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      The eligibility criteria vary depending on the type of business and location, but general requirements include:
    </p>

    <div className="space-y-4">
      {uaeEligibility.map((item, i) => (
        <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md border-l-4 border-indigo-500">
          <Users className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
          <span className="text-gray-700 text-lg">{item}</span>
        </div>
      ))}
    </div>
  </section>
);

const UAEWhyVakilsearch = () => (
  <section id="uae-why-vakilsearch" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Why Vakilsearch for Business Setup in Dubai?</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Selecting Vakilsearch for Dubai setup is an easy step into one of the world's top business centers. As a reliable Dubai business consultant, we simplify complicated procedures, take care of paperwork, and see you through regulatory compliance.
    </p>

    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {vakilsearchUAEServices.map((service, i) => (
        <div key={i} className="p-5 bg-indigo-50 rounded-xl shadow-sm border border-indigo-200">
          <h4 className="font-bold text-xl text-gray-800 mb-2">{service.split('–')[0].trim()}</h4>
          <p className="text-sm text-gray-600">
            {service.split('–')[1] ? service.split('–')[1].trim() : service.split('–')[0].trim()}
          </p>
        </div>
      ))}
    </div>
    <p className="mt-8 text-lg font-bold text-gray-700">
      Whether it's Dubai company registration from India or expanding abroad, Vakilsearch provides reliable advice and seamless business registration.
    </p>
  </section>
);

const UAEFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => {
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
export default function UAEDubaiInc() {
  const [activeTab, setActiveTab] = useState(uaeRegTabs[0].id);
  const [faqOpen, setFaqOpen] = useState(null);

  // Offset to account for the sticky header height when calculating scroll position
  const SCROLL_OFFSET = 120;

  // --- SCROLLSPY IMPLEMENTATION ---
  useEffect(() => {
    const sectionIds = uaeRegTabs.map(tab => tab.id);

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
      {/* === HERO SECTION (UAE/Dubai Setup Specific) === */}
      <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">

          {/* Background Image Section */}
          <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
            <img
              src={BackgroundImageSrc}
              alt="Dubai business setup background"
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
                <span className="font-semibold text-black">Setup Your Business in the UAE/Dubai</span>
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
                Business Setup in Dubai UAE — Start Your Company with Experts
              </h1>

              {/* Bullet Points with Blue Tick */}
              <div className="space-y-4 mb-8 text-sm lg:text-base text-black">
                <p className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  Register your company name in Dubai under 24 hours and get a lifetime free visa.
                </p>
                <p className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  Complete secrecy of operations with lower renewal charges & zero import or export duties.
                </p>
                <p className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  Benefit from a **15-year renewable tax exemption** and **100% capital repatriation**.
                </p>
              </div>
              <p className="text-sm font-semibold text-gray-700">Complete guide on Business setup in Dubai, UAE</p>

            </div>

            {/* Right Column - Form */}
            <div className="w-full lg:w-[350px] relative z-30 lg:mt-0 lg:ml-auto mt-[-100px] sm:mt-[-50px]">
              <div
                className="w-full p-6 md:p-8 rounded-2xl shadow-xl bg-white"
                style={{ borderRadius: '24px', border: '1px solid #E0E0E0' }}
              >
                <h2 className="text-xl font-semibold mb-6 text-black text-center">Get Started !</h2>

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
                    Form My Company
                  </button>
                  
                  {/* Confidentiality Note */}
                  <p className="text-[11px] text-black text-center mt-3 italic">
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
            {uaeRegTabs.map((tab) => (
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
          <UAEOverviewContent />
          <UAEBenefitsContent />
          <UAETypesContent />
          <UAEElegibilityContent />
          <UAEDocumentsContent />
          <UAEDetailedProcedure />
          <UAECostCompliance />
          <UAEWhyVakilsearch />
          <UAEFAQsContent faqs={uaeFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
        </div>
      </div>

    </div>
  );
}