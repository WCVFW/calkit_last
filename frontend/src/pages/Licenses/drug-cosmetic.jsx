import React, { useState, useEffect } from "react";
// axios is kept for convention, though not used in frontend logic
import axios from "axios";
import {
    ChevronDown,
    Zap, // For Efficiency/Smooth Process
    Briefcase, // For Business/Corporate Structure/Trade
    ArrowRight,
    Star,
    CheckCircle, // For Compliance/Requirements
    FileText, // For document/Forms
    Scale, // For Regulation/Standards/Quality
    Handshake, // For Trust/Stakeholders
    TrendingUp, // For Market Access/Growth
    Lightbulb, // For Expert Guidance/Clarity
    Users, // For Retailers/Manufacturers/Technical Staff
    DollarSign, // For Fees/Financials
    Clock, // For Validity/Timeliness
    Landmark, // For CDSCO/State Licensing Authority
    MapPin,
    Globe,
    BookOpen // For Premises/Site Plan
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from '../../assets/business.png'; // Reusing a general business image

// --- DRUG & COSMETIC LICENSE STATIC DATA DEFINITIONS ---

const licenseTabs = [
    { id: 'dc-overview-content', label: 'Overview' },
    { id: 'dc-drug-types', label: 'Drug License Types' },
    { id: 'dc-cosmetic-types', label: 'Cosmetic License' },
    { id: 'dc-documents-content', label: 'Documents Required' },
    { id: 'dc-rules-content', label: 'Governing Rules' },
    { id: 'dc-labelling-content', label: 'Cosmetic Labelling' },
    { id: 'dc-why-vakilsearch', label: 'Why Vakilsearch' },
    { id: 'dc-faqs-content', label: 'FAQs' },
];

const drugLicenseTypes = [
    { type: "Retail Drug License", detail: "Required for running a chemist shop or pharmacy selling drugs directly to end consumers. Mandates a registered pharmacist.", icon: Users },
    { type: "Wholesale Drug License", detail: "Required for selling drugs in bulk to retailers, hospitals, or dispensaries. Mandates suitable storage facilities.", icon: Briefcase },
    { type: "Manufacturing Drug License", detail: "Required for entities involved in the production of Allopathic, Ayurvedic, or Cosmetic drugs. Issued by the State Licensing Authority.", icon: Zap },
    { type: "Import Drug License", detail: "Required for importing drugs into India. Issued by the Central Licensing Authority (CDSCO).", icon: Globe },
    { type: "Loan Drug License", detail: "For applicants without their own manufacturing unit who wish to use the premises of another licensed manufacturer under their brand name.", icon: Handshake },
    { type: "Multi-Drug License", detail: "Required for persons operating in multiple states. A separate license is required for each place where drugs are sold or stocked.", icon: MapPin },
    { type: "Restricted License for General Stores", detail: "Issued for general stores selling a limited range of over-the-counter drugs.", icon: Briefcase },
];

const manufacturingRequirements = [
    "Location and Facility: Must be located in a suitable place with adequate space, plant, and equipment for operations.",
    "GMP Compliance: Must comply with Good Manufacturing Practices (GMP) prescribed by the DCGI/CDSCO.",
    "Technical Staff: Must have a competent technical staff, including at least one Pharmacy/Chemistry graduate with experience.",
    "Testing: Must have separate arrangements for testing the drugs' strength, quality, and purity.",
    "Separate Licenses: Each factory/location requires a separate license.",
];

const cosmeticLicenseRequirements = [
    "Premises Proof: Proof of ownership or lease of the premises where cosmetics will be manufactured or stored.",
    "Ingredient List: A comprehensive list of ingredients used in the cosmetics (with composition formula).",
    "Stability Test Report: Required to demonstrate product shelf life and safety.",
    "Brand Ownership: Documents relating to the ownership of the cosmetic brand (trademark registration or application).",
    "Technical Staff: Full particulars of competent technical staff employed for manufacturing and testing.",
];

const commonDocuments = [
    { doc: "Incorporation certificate of the company/Partnership Deed/Constitution of Firm", category: "Legal Status", icon: Briefcase },
    { doc: "KYC documents of Directors/Partners/Proprietor & Technical Staff", category: "Personnel Details", icon: Users },
    { doc: "Proof of Premises (Rent agreement, electricity bill, etc.) & Site plan", category: "Premises Proof", icon: MapPin },
    { doc: "List of Formulations/Cosmetics with composition formula & Method of analysis", category: "Product Details", icon: FileText },
    { doc: "Copies of BIS (Bureau of Indian Standards) certificates, where applicable", category: "Quality Standards", icon: Scale },
    { doc: "Affidavit of non-conviction (For partners, directors, or proprietors)", category: "Compliance", icon: CheckCircle },
];

const governingRules = [
    { title: "Drugs and Cosmetics Rules, 1945", detail: "Regulates the import, manufacture, distribution, sale, and storage of drugs and cosmetics, including license procedures, forms, and fees.", icon: BookOpen },
    { title: "Medical Devices Rules, 2017", detail: "Regulates the manufacture, import, sale, and distribution of medical devices, setting standards for their quality and safety.", icon: BookOpen },
    { title: "Cosmetics Rules, 2020", detail: "Specifies requirements for the registration and licensing of cosmetics, quality and safety standards, and detailed labelling requirements.", icon: BookOpen },
    { title: "Drugs (Prices Control) Order, 2013", detail: "Specifies certain essential drugs' Maximum Retail Price (MRP) and requires manufacturers to display the MRP on the container label.", icon: BookOpen },
];

const cosmeticLabellingRequirements = [
    "Registration certificate number (for imported cosmetics).",
    "Name and address of manufacturer & certificate holder/importer.",
    "Name of the cosmetic, displayed clearly and legibly.",
    "Date of manufacture/expiry (Month and year).",
    "List of ingredients in descending order of weight.",
    "Adequate directions for use and cautionary warnings.",
    "Country of manufacture (for imported cosmetics).",
];

const whyVakilsearch = [
    "Streamlined Application: We simplify the process, preparing separate applications required for each type of license (e.g., Form 19, Form 20, Form COS-5).",
    "Documentation Accuracy: Ensuring all complex documents (KYC, site plan, product specifications, technical staff details) are accurate, preventing scrutiny queries.",
    "Inspection Readiness: Guidance on meeting minimum requirements like proper storage, required area, and technical staff qualifications ahead of the Drug Inspector's visit.",
    "Regulatory Clarity: Complete support for compliance with the latest regulations, including the Cosmetics Rules, 2020.",
];

const licenseFAQs = [
    { q: "What is the form used to apply for a license to manufacture new drugs?", a: "The application form for a license to manufacture new drugs (including investigational drugs) is typically **Form 44** (as per New Drugs and Clinical Trials Rules, 2019) or other specific forms depending on the drug category." },
    { q: "What is the form used to grant a license to manufacture new drugs?", a: "The license for manufacturing new drugs is generally granted in **Form 45** or **Form 45A** by the CDSCO." },
    { q: "Who is the concerned applicant for a license to manufacture new drugs?", a: "The manufacturer or their authorized agent/importer is the concerned applicant. They must possess adequate R&D and manufacturing capacity or a valid agreement with a licensed manufacturer." },
    { q: "What is the purpose of a license to manufacture new drugs?", a: "The purpose is to ensure that only drugs proven to be safe and effective through clinical trials and rigorous testing are manufactured and released into the market, protecting public health." },
    { q: "What are the other forms used to apply for licenses related to drugs?", a: "Other common forms include **Form 19** (Retail/Wholesale License application), **Form 25** (Manufacturing of Non-Schedule Drugs), and **Form 32** (Manufacturing of Cosmetics)." },
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

const FeatureBox = ({ title, detail, icon: Icon }) => (
    <div className="p-5 bg-white rounded-lg shadow-sm border border-gray-200">
        <Icon className="w-6 h-6 text-amber-500 mb-2" />
        <h4 className="font-bold text-lg text-gray-800 mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{detail}</p>
    </div>
);

const DocumentBox = ({ doc, category, icon: Icon }) => (
    <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg shadow-md border-l-4 border-red-500">
        <Icon className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
        <div>
            <p className="text-gray-800 font-medium">{doc}</p>
            <p className="text-xs text-gray-600 font-medium">{category}</p>
        </div>
    </div>
);


// --- TAB CONTENT COMPONENTS (Drug & Cosmetic License Content) ---

const DCOverviewContent = () => (
    <section id="dc-overview-content" className="py-12 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Overview - Drug & Cosmetic License</h2>
        <p className="text-lg text-gray-700 mb-4 max-w-4xl">
            The **Central Drugs Standard Control Organisation (CDSCO)**, overseen by the Drugs Controller General of India (DCGI), regulates the **import, manufacture, distribution, and sale of drugs and cosmetics** in India under the **Drugs and Cosmetics Act, 1940**.
        </p>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            This licensing system is mandatory to ensure that all products meet the required quality, safety, and efficacy standards, protecting public health and preventing substandard products from reaching consumers.
        </p>
    </section>
);

const DCDrugTypes = () => (
    <section id="dc-drug-types" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Classification or Types of Drug Licenses</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            The type of drug license required depends entirely on the business activity (manufacturing, sale, import) and the nature of the drugs involved. Separate applications are required for each type.
        </p>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">Key Categories of Drug Licenses</h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {drugLicenseTypes.slice(0, 4).map((item, i) => (
                <FeatureBox key={i} title={item.type} detail={item.detail} icon={item.icon} />
            ))}
        </div>

        <h4 className="text-2xl font-bold mb-6 mt-12 text-gray-800">Manufacturing Drug License Requirements</h4>
        <div className="space-y-3 text-gray-700 max-w-4xl border-l-4 border-amber-500 pl-4">
            {manufacturingRequirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2 list-none">
                    <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                    <span>{req}</span>
                </li>
            ))}
        </div>
    </section>
);

const DCCosmeticTypes = () => (
    <section id="dc-cosmetic-types" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Cosmetic License Requirements</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            A cosmetic license is mandatory for any person or entity that manufactures or imports cosmetics in India. The **CDSCO** (Central Drug Standard Control Organization) issues this license.
        </p>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">Key Documentation for Cosmetic License Application</h4>
        <div className="grid md:grid-cols-2 gap-6">
            {cosmeticLicenseRequirements.map((req, i) => (
                <DetailItem key={i} title={req.title} description={req.detail} icon={FileText} />
            ))}
        </div>
    </section>
);

const DCDocumentsContent = () => (
    <section id="dc-documents-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Common Documents Required for Drug & Cosmetic License</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            The documents required vary, but are generally focused on verifying the legitimacy of the business entity, the suitability of the premises, and the qualifications of the technical staff.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {commonDocuments.map((doc, i) => (
                <DocumentBox key={i} doc={doc.doc} category={doc.category} icon={doc.icon} />
            ))}
        </div>
    </section>
);

const DCRulesContent = () => (
    <section id="dc-rules-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">List of Important Rules Governing the Sector</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            The regulatory framework is comprehensive, extending beyond the 1940 Act to cover new products (Medical Devices) and specific operational aspects (Pricing, Labelling).
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {governingRules.map((rule, i) => (
                <FeatureBox key={i} title={rule.title} detail={rule.detail} icon={rule.icon} />
            ))}
        </div>
    </section>
);

const DCLabellingContent = () => (
    <section id="dc-labelling-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Mandatory Labelling Requirements on Imported Cosmetics</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            Imported cosmetics must adhere to strict **Cosmetics Rules, 2020** labelling standards to ensure consumer safety, proper usage, and regulatory tracking.
        </p>

        <div className="space-y-3 text-gray-700 max-w-4xl border-l-4 border-amber-500 pl-4">
            {cosmeticLabellingRequirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2 list-none">
                    <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                    <span>{req}</span>
                </li>
            ))}
        </div>
    </section>
);

const DCWhyVakilsearch = () => (
    <section id="dc-why-vakilsearch" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Why Vakilsearch for Drug & Cosmetic License Filing?</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            Obtaining these licenses is a critical step involving multiple regulatory bodies (State/Central) and technical compliance requirements. We ensure an error-free path to approval.
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {whyVakilsearch.map((service, i) => {
                const Icon = i % 4 === 0 ? Zap : i % 4 === 1 ? FileText : i % 4 === 2 ? MapPin : Scale;
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

const DCFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
    <section id="dc-faqs-content" className="py-12 max-w-5xl mx-auto scroll-mt-24">
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
export default function DrugCosmeticLicensePage() {
    const [activeTab, setActiveTab] = useState(licenseTabs[0].id);
    const [faqOpen, setFaqOpen] = useState(null);

    const SCROLL_OFFSET = 120;

    // --- SCROLLSPY IMPLEMENTATION ---
    useEffect(() => {
        const sectionIds = licenseTabs.map(tab => tab.id);

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
            {/* === HERO SECTION (Drug & Cosmetic License Specific) === */}
            <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">

                    {/* Background Image Section */}
                    <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
                        <img
                            src={BackgroundImageSrc}
                            alt="Drug and Cosmetic License background"
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
                                <span className="font-semibold text-black">Drug & Cosmetic License</span>
                            </nav>

                            {/* Badge */}
                            <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                                #1 Legal Service Provider In India
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-black">
                                Drug & Cosmetic License
                            </h1>

                            {/* Bullet Points with CheckCircle */}
                            <div className="space-y-4 mb-8 text-sm lg:text-base text-black">
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Get your Drug & Cosmetic License **hassle-free** with expert online filing and processing.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Complete **DCGI/CDSCO compliance support** including documentation and form filling.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Ensure smooth approvals to legally **manufacture, distribute, or sell** drugs and cosmetics.
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
                                <h2 className="text-xl font-semibold mb-6 text-black text-center">Drug & Cosmetic License</h2>

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
                        {licenseTabs.map((tab) => (
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
                    <DCOverviewContent />
                    <DCDrugTypes />
                    <DCCosmeticTypes />
                    <DCDocumentsContent />
                    <DCRulesContent />
                    <DCLabellingContent />
                    <DCWhyVakilsearch />
                    <DCFAQsContent faqs={licenseFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
                </div>
            </div>

        </div>
    );
}