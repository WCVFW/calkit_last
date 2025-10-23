import React, { useState, useEffect } from "react";
// axios is kept for convention, though not used in frontend logic
import axios from "axios";
import {
    ChevronDown,
    Zap, // For Credibility/Fast Service
    Briefcase, // For Legal/Professional Filings/Governance
    ArrowRight,
    Star,
    CheckCircle, // For Checklist/Compliance/Legal Identity
    FileText, // For document/MOA/Bylaws
    Scale, // For Legal Status/Compliance
    Handshake, // For Consultation/Voluntary Association
    TrendingUp, // For Tax Benefits/Grants
    Lightbulb, // For Expert Guidance/Updates
    Users, // For Members/Governing Body
    DollarSign, // For Cost/Fees
    Clock, // For Fast Service/Timeline
    Landmark, // For Societies Registration Act/Registrar
    MapPin, // For Address Proof/Office
    BookOpen, // For Acts/Rules and Regulations
    RefreshCw,
    Calculator,
    Globe // For Renewal
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from '../../assets/business.png'; // Reusing a general business image

// --- SOCIETY REGISTRATION STATIC DATA DEFINITIONS ---

const societyTabs = [
    { id: 'society-overview-content', label: 'Overview' },
    { id: 'society-benefits-content', label: 'Benefits' },
    { id: 'society-eligibility-content', label: 'Eligibility' },
    { id: 'society-documents-process-content', label: 'Process & Docs' },
    { id: 'society-compliance-renewal-content', label: 'Compliance & Renewal' },
    { id: 'society-why-vakilsearch', label: 'Why Vakilsearch?' },
    { id: 'society-faqs-content', label: "FAQ's" },
];

const societyEligibility = [
    "Who Can Register: Indian citizens, foreign nationals (with prior approval), companies, and other registered bodies.",
    "Minimum Members: At least seven members are required to register a society in most Indian states.",
    "Types of Societies: Societies formed for charitable activities, education, religion, culture, arts, sports, or public welfare.",
    "Non-Profit Intent: All eligible forms must function with a clear non-profit intent.",
];

const societyBenefits = [
    { title: "Legal Recognition for NGO", icon: CheckCircle, detail: "Gains separate legal identity, allowing it to enter contracts, sue/be sued, and hold property in its own name." },
    { title: "Tax Exemption for Societies", icon: TrendingUp, detail: "Eligible for income tax exemptions under Sections 12A and 80G of the Income Tax Act." },
    { title: "Enhanced NGO Credibility", icon: Zap, detail: "Registration builds public trust, making it easier to attract volunteers, donors, and government support." },
    { title: "Access to Funding and Grants", icon: DollarSign, detail: "Qualifies for government schemes, international aid programs, and private grants." },
    { title: "Structured Management", icon: Briefcase, detail: "Operates under a Memorandum of Association and rules, ensuring transparency and democratic functioning." },
    { title: "Eligibility for FCRA", icon: Scale, detail: "Prerequisite for applying under the Foreign Contribution Regulation Act (FCRA) for foreign funding." },
    { title: "Operational Continuity", icon: Clock, detail: "Enjoys perpetual succession, ensuring continued existence despite changes in membership." },
];

const societyRequiredDocuments = [
    { title: "MOA & Rules", icon: FileText, detail: "Memorandum of Association (MOA) and Rules & Regulations/Bylaws signed by all founding members." },
    { title: "Member IDs & Address Proof", icon: Users, detail: "PAN Card or Aadhaar Card of all founding members, plus passport for foreign nationals." },
    { title: "Office Address Proof", icon: MapPin, detail: "Rent Agreement or Property Ownership Document, NOC from the owner, and a recent Utility Bill of the registered office." },
    { title: "Affidavit & Cover Letter", icon: FileText, detail: "Affidavit declaring the society’s name is unique, along with a covering letter requesting registration." },
];

const societyRegistrationProcess = [
    "Choose and Reserve a Unique Name: Ensure the name is not identical to any existing registered society.",
    "Prepare the Memorandum of Association (MOA): Draft the objectives, member details, and office address.",
    "Draft Rules and Regulations: Create the bylaws defining membership, meeting procedures, and governance structure.",
    "Collect and Verify Required Documents: Gather ID/address proofs, MOA/Rules, NOC, and affidavits.",
    "Apply on the State Portal/Registrar: Fill and upload documents online via the state's official society registration portal (or physical submission in some states).",
    "Pay the Registration Fee: Submit the prescribed fee through the portal or offline.",
    "Verification and Issuance of Certificate: The Registrar reviews and issues the Certificate of Registration, granting legal status.",
];

const societyPostRegistrationCompliance = [
    { title: "Maintain Proper Accounts", icon: Calculator, detail: "Maintain accurate financial records and supporting documents for all transactions." },
    { title: "Conduct Annual Audits", icon: Briefcase, detail: "Financial statements must be audited annually by a certified Chartered Accountant." },
    { title: "File Annual Returns", icon: Landmark, detail: "Submit an annual report, audited financials, and member list to the Registrar of Societies." },
    { title: "Income Tax Compliance (12A & 80G)", icon: TrendingUp, detail: "File Form 10A for 12A exemption and apply for 80G for donor tax benefits." },
    { title: "FCRA Compliance", icon: Globe, detail: "Obtain and maintain FCRA registration and file annual returns if receiving foreign donations." },
    { title: "Update Changes", icon: RefreshCw, detail: "Report any change in governing body, registered address, or bylaws to the Registrar." },
];

const societyRenewalProcess = [
    "Check Renewal Deadline: Most societies are required to renew their registration annually or bi-annually (varies by state).",
    "Gather Documents: Collect the original registration certificate, bylaws, minutes of the annual general meeting, and list of current office bearers.",
    "Online Submission: Log in to the online registration portal using society's credentials.",
    "Update Details: Provide and update all required details, including name, registration number, and office details.",
    "Submit Documents & Fee: Submit all documents and pay the renewal fee online.",
];

const societyWhyVakilsearch = [
    "Thorough Consultation: Fully grasp all your needs and walk you through the entire process of Online Society Registration Certificate.",
    "Complete Paperwork: We will provide you with all the papers required to be submitted for society registration online, and keep you updated on its development.",
    "Expert-Guided Process: We assist you with all Society registration-related steps and procedures, guiding your every step of the way.",
    "Hassle-Free Filing: Attorneys fill out all the paperwork and submit the online application of Society Registration on your behalf, so you don't need to be present.",
    "Data Security: Your work is secure with us, and so are your data. Any questions you may have can be answered by our support staff.",
];

const societyFAQs = [
    { q: "What is the Society Registration Act?", a: "The **Societies Registration Act, 1860**, is the central law that governs the formation, operation, and regulation of societies established for charitable, literary, scientific, or social welfare purposes in India." },
    { q: "What is the minimum number of members for society registration?", a: "A minimum of **seven members** is generally required to register a society in most Indian states." },
    { q: "How much does it cost to register a society in India?", a: "The cost involves a **Government Registration Fee (₹500 to ₹1,500)** plus professional charges (if using an expert). The total time estimate is typically **2 to 4 weeks**." },
    { q: "What are the main components of a memorandum of association of a society?", a: "The MOA contains the society’s **name, objectives**, and the **names, addresses, and occupations** of all the founding members and the Governing Body." },
    { q: "Can members of society receive profits?", a: "No, a registered society operates on a **non-profit basis**. Any income or surplus must be reinvested back into the society to promote its declared social objectives and cannot be distributed to members." },
    { q: "Is society or trust preferable?", a: "Societies are generally preferred for **larger membership groups** and operational bodies like schools or cultural associations, while Trusts are simpler and often used for **wealth management/smaller charitable endowments**." },
    { q: "Does society have legal status?", a: "Yes, once registered under the Act, a society gains a **separate legal identity** (like a company), allowing it to own property, enter contracts, and sue in its own name." },
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

// --- TAB CONTENT COMPONENTS (Society Registration Content) ---

const SocietyOverviewContent = () => (
    <section id="society-overview-content" className="py-12 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Online Society Registration in India - An Overview</h2>
        <p className="text-lg text-gray-700 mb-4 max-w-4xl">
            **Society registration** is a legal process providing formal recognition to organisations formed for **charitable, literary, scientific, religious, or social welfare purposes**. It is ideal for voluntary organisations, cultural groups, or educational institutions.
        </p>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            The process is governed by the **Societies Registration Act, 1860**. Registration grants a **separate legal identity**, increases reliability, and ensures qualification for state schemes, foreign donations, and tax exemptions.
        </p>

        <h3 className="text-2xl font-bold mb-6 text-gray-800">What is Society and Society Registration?</h3>
        <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-[#E6F0F6] rounded-xl shadow-md border-l-4 border-[#022B50]">
                <h4 className="font-bold text-xl text-gray-800 mb-2 flex items-center gap-2"><Users className="w-6 h-6 text-[#022B50]"/> What is Society?</h4>
                <p className="text-sm text-gray-700">A society is a group of individuals who come together voluntarily to promote common interests such as charity, education, art, literature, or public welfare on a non-profit basis.</p>
            </div>
            <div className="p-5 bg-[#E6F0F6] rounded-xl shadow-md border-l-4 border-[#022B50]">
                <h4 className="font-bold text-xl text-gray-800 mb-2 flex items-center gap-2"><Landmark className="w-6 h-6 text-[#022B50]"/> What is Society Registration?</h4>
                <p className="text-sm text-gray-700">The formal process of legally registering such a group under the **Societies Registration Act, 1860**, giving it a separate legal identity to own property, enter contracts, and access funding.</p>
            </div>
        </div>
    </section>
);

const SocietyBenefitsContent = () => (
    <section id="society-benefits-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800">Benefits of Registering a Society</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            Registering a Society in India offers crucial legal, financial, and operational advantages, especially for non-profit organisations like NGOs.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {societyBenefits.map((item, i) => (
                <DetailItem
                    key={i}
                    title={item.title}
                    description={item.detail}
                    icon={item.icon}
                />
            ))}
        </div>
    </section>
);

const SocietyEligibilityContent = () => (
    <section id="society-eligibility-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Eligibility Criteria for Society Registration</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            These criteria ensure that only genuine and organized groups receive legal recognition for their charitable or non-profit objectives under the Societies Registration Act, 1860.
        </p>

        <div className="space-y-4">
            {societyEligibility.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-indigo-50 rounded-lg shadow-md border-l-4 border-indigo-500">
                    <CheckCircle className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{item}</span>
                </div>
            ))}
        </div>
        
        <h4 className="text-2xl font-bold mb-6 mt-12 text-gray-800">Common Reasons for Society Registration</h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700 max-w-5xl">
            <p className="flex items-start gap-2"><ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-amber-500" /> To support arts, literature and science promotion.</p>
            <p className="flex items-start gap-2"><ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-amber-500" /> Political education dissemination.</p>
            <p className="flex items-start gap-2"><ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-amber-500" /> Establishing funds for military orphans.</p>
            <p className="flex items-start gap-2"><ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-amber-500" /> Building public museums and galleries.</p>
            <p className="flex items-start gap-2"><ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-amber-500" /> Promotion of useful knowledge and construction of public libraries.</p>
            <p className="flex items-start gap-2"><ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-amber-500" /> Assemblages of mechanical and philosophical designs.</p>
        </div>
    </section>
);

const SocietyDocumentsProcessContent = () => (
    <section id="society-documents-process-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800">Documents Required & Step-by-Step Process</h3>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">Documents Required for Society Registration Online</h4>
        <p className="text-lg text-gray-700 mb-6 max-w-4xl">
            A complete checklist of documents ensures compliance with legal requirements under the Societies Registration Act, 1860.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {societyRequiredDocuments.map((doc, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-red-50 rounded-lg shadow-md border-l-4 border-red-500">
                    <doc.icon className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                    <div>
                        <p className="text-gray-800 font-medium">{doc.title}</p>
                        <p className="text-sm text-gray-600">{doc.detail}</p>
                    </div>
                </div>
            ))}
        </div>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">Step-by-Step Society Registration Online Process</h4>
        <ol className="space-y-5 list-none border-l-2 border-[#022B50] pl-4">
            {societyRegistrationProcess.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                    <div className="bg-[#022B50] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {i + 1}
                    </div>
                    <span className="text-gray-700 text-lg">{step}</span>
                </li>
            ))}
        </ol>
        
        <div className="mt-12 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
            <h4 className="text-2xl font-bold mb-4 text-[#022B50]">Society Registration Fees and Timeline</h4>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                    <p className="text-gray-700 font-semibold">Government Fee (Varies by State): <span className="font-bold text-red-500">₹500 to ₹1,500</span></p>
                    <p className="text-gray-700 font-semibold">Professional/Consultant Charges: <span className="font-bold text-red-500">₹2,000 to ₹10,000 (Optional)</span></p>
                    <p className="text-gray-700 font-semibold">Total Time Estimate: <span className="font-bold text-[#022B50]">2 to 4 weeks</span></p>
                </div>
                <div className="space-y-3 border-l pl-4 border-gray-200">
                    <p className="text-gray-600 text-sm">Document Preparation & Filing: 2 to 5 working days</p>
                    <p className="text-gray-600 text-sm">Government Processing & Approval: 15 to 30 working days</p>
                    <p className="text-gray-600 text-sm italic">Note: Fees for ISO 45001 certification may vary.</p>
                </div>
            </div>
        </div>
    </section>
);

const SocietyComplianceRenewalContent = () => (
    <section id="society-compliance-renewal-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800">Compliance After Registration & Renewal Process</h3>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">Post-Registration Compliance Obligations</h4>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
            {societyPostRegistrationCompliance.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md border-l-4 border-amber-500">
                    <item.icon className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                    <div>
                        <h5 className="font-semibold text-gray-800">{item.title}</h5>
                        <p className="text-sm text-gray-600">{item.detail}</p>
                    </div>
                </div>
            ))}
        </div>
        
        <h4 className="text-2xl font-bold mb-6 text-gray-800">Society Registration Renewal Online Process</h4>
        <ul className="space-y-5 list-none border-l-2 border-green-500 pl-4">
            {societyRenewalProcess.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                    <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        <RefreshCw className="w-4 h-4" />
                    </div>
                    <span className="text-gray-700 text-lg">{step}</span>
                </li>
            ))}
        </ul>
    </section>
);

const SocietyWhyVakilsearch = () => (
    <section id="society-why-vakilsearch" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Why Vakilsearch for Society Registration?</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            We provide comprehensive support, combining legal expertise with a 100% online process to ensure your society is registered quickly, compliantly, and affordably.
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {societyWhyVakilsearch.map((service, i) => {
                const [title, detail] = service.split(':').map(s => s.trim());
                const Icon = i % 5 === 0 ? Handshake : i % 5 === 1 ? FileText : i % 5 === 2 ? Lightbulb : i % 5 === 3 ? Briefcase : Zap;
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
            <h4 className="font-bold text-xl text-gray-800 mb-2 flex items-center gap-2"><Lightbulb className="w-5 h-5 text-amber-500"/> Recent Legal Updates</h4>
            <p className="text-sm text-gray-700">With the implementation of the **Societies Registration (Amendment) Act, 2021** (e.g., in UP), anyone sentenced to two years or more is no longer eligible to serve as a member or office holder of a registered society.</p>
        </div>
    </section>
);

const SocietyFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
    <section id="society-faqs-content" className="py-12 max-w-5xl mx-auto scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">FAQ's on Online Society Registration India</h3>

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
export default function SocietyRegistrationPage() {
    const [activeTab, setActiveTab] = useState(societyTabs[0].id);
    const [faqOpen, setFaqOpen] = useState(null);

    const SCROLL_OFFSET = 120;

    // --- SCROLLSPY IMPLEMENTATION ---
    useEffect(() => {
        const sectionIds = societyTabs.map(tab => tab.id);

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
            {/* === HERO SECTION (Society Registration Specific) === */}
            <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">

                    {/* Background Image Section */}
                    <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
                        <img
                            src={BackgroundImageSrc}
                            alt="Society Registration background"
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
                                <span className="hover:underline cursor-pointer">NGO</span> &gt;{" "}
                                <span className="font-semibold text-black">Society</span>
                            </nav>

                            {/* Badge */}
                            <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                                #1 Legal Service Provider In India
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-black">
                                Online Society Registration India
                            </h1>

                            {/* Bullet Points with CheckCircle */}
                            <div className="space-y-4 mb-8 text-sm lg:text-base text-black">
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Register your society online with ease: **guaranteed document upload in 7 days**.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Get expert assistance **post-registration**, including **tax-saving guidance**.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    **100% online process** with expert help – **no paperwork, and no delays**.
                                </p>
                            </div>
                            <p className="text-sm font-semibold text-gray-700">Complete guide on Online Society Registration</p>
                            
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
                        {societyTabs.map((tab) => (
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
                    <SocietyOverviewContent />
                    <SocietyBenefitsContent />
                    <SocietyEligibilityContent />
                    <SocietyDocumentsProcessContent />
                    <SocietyComplianceRenewalContent />
                    <SocietyWhyVakilsearch />
                    <SocietyFAQsContent faqs={societyFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
                </div>
            </div>

        </div>
    );
}