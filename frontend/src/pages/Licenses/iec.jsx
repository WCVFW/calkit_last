import React, { useState, useEffect } from "react";
// axios is kept for convention, though not used in frontend logic
import axios from "axios";
import {
    ChevronDown,
    Zap, // For Fast Filing/Hassle-Free
    Briefcase, // For Business/Customs Clearance
    ArrowRight,
    Star,
    CheckCircle, // For Checklist/Compliance
    FileText, // For document/PAN/Certificate
    Scale, // For Regulation/Foreign Trade Policy
    Handshake, // For International Trade/Expansion
    TrendingUp, // For Export Incentives/Growth
    Users, // For Individuals/Entities
    DollarSign, // For Fees/Taxes/Financial Benefits
    Clock, // For Validity/Timely Updates
    Landmark, // For DGFT/Government
    Globe, // For World Market/Global Trade
    Banknote,
    MapPin,
    BookOpen // For Bank Certificate/Finance
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from '../../assets/business.png'; // Reusing a general business image

// --- IEC REGISTRATION STATIC DATA DEFINITIONS ---

const iecTabs = [
    { id: 'iec-overview-content', label: 'Overview' },
    { id: 'iec-benefits-content', label: 'Benefits' },
    { id: 'iec-eligibility-content', label: 'Eligibility & Requirements' },
    { id: 'iec-documents-content', label: 'Documents Required' },
    { id: 'iec-process-content', label: 'Registration Process' },
    { id: 'iec-compliance-content', label: 'Compliance & Renewal' },
    { id: 'iec-why-vakilsearch', label: 'Why Vakilsearch' },
    { id: 'iec-faqs-content', label: 'FAQ' },
];

const iecBenefits = [
    { title: "Access to the World Market", icon: Globe, detail: "Allows the market reach of businesses around the globe, streamlining international trade transactions." },
    { title: "Government Schemes and Benefits", icon: TrendingUp, detail: "Businesses with an IEC can avail government schemes, associated tax benefits, and export incentives for developing international trade." },
    { title: "Opportunities for Business Expansion", icon: Handshake, detail: "Helps businesses grow by opening opportunities for global expansion and enhancing business relationships while observing trade regulations." },
    { title: "Lifetime Validity", icon: Clock, detail: "The code offers lifetime validity, requiring no annual renewal fee, though periodic information updates are mandatory." },
    { title: "Customs Clearance", icon: Briefcase, detail: "The IEC is essential for customs clearance and smooth handling of shipments without delay." },
    { title: "Compliance and Regulation", icon: Scale, detail: "Ensures the company follows legal regulations, improving global reputation and trust." },
];

const iecEligibility = [
    { entity: "Proprietorship", requirements: "PAN card, bank account, and proof of address for business.", icon: Users },
    { entity: "Partnership / LLP", requirements: "Partnership deed/Incorporation Certificate, PAN card, valid bank account, and proof of address.", icon: Briefcase },
    { entity: "Private / Public Limited Companies", requirements: "Certificate of Incorporation, PAN card, and business address proof registered under Indian law.", icon: Landmark },
    { entity: "Societies, Trusts, and HUFs", requirements: "Registration certificate, PAN card, and address proof.", icon: Users },
];

const iecDocuments = [
    { title: "PAN Card", detail: "Permanent Account Number (PAN) card for the business or individual.", icon: FileText },
    { title: "Address Proof", detail: "Electricity bill, rent agreement, or property papers (for business premises).", icon: MapPin },
    { title: "Bank Certificate / Canceled Cheque", detail: "Bank certificate confirming account details or a canceled cheque with the business name.", icon: Banknote },
    { title: "Digital Signature Certificate (DSC)", detail: "May be required for submitting the application online on the DGFT website.", icon: Zap },
    { title: "Legal Status Proof", detail: "Certificate of Incorporation or Partnership Deed (if applicable).", icon: FileText },
];

const iecProcessSteps = [
    "Online Application on DGFT Website: Create a user profile using PAN, enter business details, and navigate the IEC Online Application Form.",
    "Uploading Required Documents: Gather and upload mandatory documents (PAN, address proof, bank certificate, DSC) accurately.",
    "Payment of Application Fees: Pay the negligible registration fee online via net banking or credit/debit cards.",
    "Verification and Approval by DGFT: The DGFT checks the application and documents, verifies the address and PAN details.",
    "Issuance of IEC Certificate: Once approved, download your 10-digit IEC certificate from the DGFT portal.",
];

const iecComplianceObligations = [
    { title: "Annual Profile Update", detail: "Mandatory update of the IEC profile every year between April and June, even if no changes occur. Failure leads to deactivation.", icon: Clock },
    { title: "Compliance with Foreign Trade Policy (FTP)", detail: "Meet certain obligations under India's FTP to avoid penalties and ensure smooth international trade operations.", icon: Scale },
    { title: "Annual Filing Requirements", detail: "Export and Import Businesses must file Annual Returns (under FTP 2023) to access benefits like Advance Authorization or EPCG schemes.", icon: FileText },
    { title: "Record Keeping", detail: "Maintain impeccable and correct records of all trade activities to comply with customs regulations and anti-bribery laws.", icon: Briefcase },
];

const iecWhyVakilsearch = [
    "Expert Assistance: Our legal experts ensure all documents are correctly submitted and handled.",
    "Online Application: We manage the entire online application process on the DGFT website.",
    "Speedy Approval: We speed up the approval process with fewer errors and delays, filing done in **2 Days**.",
    "Focus on Core Business: You get IEC quickly and can focus on growing your international trade operations.",
];

const iecFAQs = [
    { q: "How Long Does IEC Registration Take?", a: "The entire online filing process can be done by experts in **2 days**. The DGFT verification and final approval time can vary, but the process is significantly fast when documents are accurate." },
    { q: "What Are the Costs Involved in IEC Registration?", a: "The government registration fee is negligible (refer to DGFT for present structure). The main cost involves professional fees charged by consultants for expert assistance and smooth processing." },
    { q: "Is IEC Mandatory for Service Exporters?", a: "Yes, an IEC is mandatory for all individuals or entities engaged in international trade, which includes the export of services, unless specific exemption criteria are met." },
    { q: "Can I Use a Single IEC for Multiple Businesses?", a: "No. Only one IEC is required per legal entity (PAN) or person/organization, even if that entity operates multiple businesses." },
    { q: "How to Check the Status of My IEC Application?", a: "You can check the status by logging into the DGFT e-Governance platform using your Application Number (SRN) or PAN and viewing the dashboard." },
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

const EligibilityBox = ({ entity, requirements, icon: Icon }) => (
    <div className="p-5 bg-white rounded-xl shadow-lg border border-gray-200">
        <Icon className="w-6 h-6 text-amber-500 mb-2" />
        <h4 className="font-bold text-lg text-gray-800 mb-1">{entity}</h4>
        <p className="text-sm text-gray-600">{requirements}</p>
    </div>
);

// --- TAB CONTENT COMPONENTS (IEC Registration Content) ---

const IECOverviewContent = () => (
    <section id="iec-overview-content" className="py-12 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Import Export Code (IEC) Registration - An Overview</h2>
        <p className="text-lg text-gray-700 mb-4 max-w-4xl">
            **Import-Export Code or IEC registration** is **mandatory** for every person and organization engaged in **importing and exporting activities** from India. This 10-digit code is issued by the **Directorate General of Foreign Trade (DGFT)**.
        </p>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            The IEC is necessitated for carrying out **customs clearance, availing export benefits**, and expansion in international markets. It is valid for **life** and does not require annual renewal fees, though periodic information updates are mandatory.
        </p>

        <h3 className="text-2xl font-bold mb-6 text-gray-800">What is an Import Export Code (IEC) and its Importance?</h3>
        <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-[#E6F0F6] rounded-xl shadow-md border-l-4 border-[#022B50]">
                <h4 className="font-bold text-xl text-gray-800 mb-2 flex items-center gap-2"><Briefcase className="w-6 h-6 text-[#022B50]"/> Definition and Purpose</h4>
                <p className="text-sm text-gray-700">The IEC is a 10-digit identification number. No person can legally export or import products to or from India without having an IEC unless specifically exempted.</p>
            </div>
            <div className="p-5 bg-[#E6F0F6] rounded-xl shadow-md border-l-4 border-[#022B50]">
                <h4 className="font-bold text-xl text-gray-800 mb-2 flex items-center gap-2"><TrendingUp className="w-6 h-6 text-[#022B50]"/> Why is IEC Important?</h4>
                <p className="text-sm text-gray-700">It allows entry into international markets, makes customs clearance easier, ensures compliance with trade regulations, and grants access to government export benefits/incentives.</p>
            </div>
        </div>
    </section>
);

const IECBenefitsContent = () => (
    <section id="iec-benefits-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800">Key Benefits of Obtaining an IEC Registration</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            An Importer Exporter Code (IEC) offers several crucial advantages, serving as the legal gateway for any business engaged in international trade.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {iecBenefits.map((item, i) => (
                <DetailItem key={i} title={item.title} description={item.detail} icon={item.icon} />
            ))}
        </div>
    </section>
);

const IECEligibilityContent = () => (
    <section id="iec-eligibility-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Eligibility and Requirements for IEC Registration</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            An IEC can be obtained by a proprietorship, partnership, LLP, or a company. The application is made based on the entity's PAN card and legal structure.
        </p>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">Eligibility Based on Business Entity</h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {iecEligibility.map((item, i) => (
                <EligibilityBox key={i} entity={item.entity} requirements={item.requirements} icon={item.icon} />
            ))}
        </div>

        <h4 className="text-2xl font-bold mb-6 mt-12 text-gray-800">Legal Framework Governing IEC</h4>
        <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-white rounded-xl shadow-md border-l-4 border-amber-500">
                <h5 className="font-semibold text-lg text-gray-800 mb-1 flex items-center gap-2"><BookOpen className="w-5 h-5"/> Foreign Trade (Development and Regulation) Act, 1992</h5>
                <p className="text-sm text-gray-600">Allows the Central Government to manage international trade and makes the IEC mandatory for anyone wanting to import or export goods.</p>
            </div>
            <div className="p-5 bg-white rounded-xl shadow-md border-l-4 border-amber-500">
                <h5 className="font-semibold text-lg text-gray-800 mb-1 flex items-center gap-2"><Landmark className="w-5 h-5"/> Directorate General of Foreign Trade (DGFT)</h5>
                <p className="text-sm text-gray-600">The regulatory body responsible for issuing the IEC, managing trade policies, and ensuring businesses follow trade laws to improve global reputation.</p>
            </div>
        </div>
    </section>
);

const IECDocumentsContent = () => (
    <section id="iec-documents-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Key Documents Required for IEC Registration</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            The IEC registration is a **one-time process** with no mandatory annual filings required, but submitting accurate and complete documents during application is vital for fast approval.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {iecDocuments.map((doc, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-red-50 rounded-lg shadow-md border-l-4 border-red-500">
                    <doc.icon className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                    <div>
                        <p className="text-gray-800 font-medium">{doc.title}</p>
                        <p className="text-sm text-gray-600">{doc.detail}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

const IECProcessContent = () => (
    <section id="iec-process-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Step-by-Step IEC Registration Process on DGFT Portal</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            The entire IEC registration process is simple and fully online through the DGFT e-Governance platform, ensuring a quick and hassle-free experience with proper guidance.
        </p>

        <ol className="space-y-5 list-none border-l-2 border-[#022B50] pl-4">
            {iecProcessSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                    <div className="bg-[#022B50] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {i + 1}
                    </div>
                    <span className="text-gray-700 text-lg">{step}</span>
                </li>
            ))}
        </ol>

        <h4 className="text-2xl font-bold mb-6 mt-12 text-gray-800">Role of IEC in International Trade</h4>
        <div className="space-y-3 text-gray-700 max-w-4xl border-l-4 border-amber-500 pl-4">
            <p className="flex items-start gap-2 list-none">
                <Briefcase className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                <span>**Customs Clearance:** The IEC streamlines the customs clearance process, acting as a unique identifier for all shipments.</span>
            </p>
            <p className="flex items-start gap-2 list-none">
                <DollarSign className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                <span>**Export Incentives:** It is mandatory for availing export incentives, duty exemptions, and financial benefits under the Foreign Trade Policy (FTP).</span>
            </p>
            <p className="flex items-start gap-2 list-none">
                <Scale className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                <span>**GST Linking:** Linking IEC with GST registration simplifies compliance and allows the use of export-import schemes efficiently.</span>
            </p>
        </div>
    </section>
);

const IECComplianceContent = () => (
    <section id="iec-compliance-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Post-Registration Compliance and Renewal</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            While the IEC is valid for a lifetime, maintaining **mandatory annual updates** and adhering to compliance obligations is crucial to prevent deactivation and legal issues.
        </p>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">Compliance Requirements for IEC Holders</h4>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
            {iecComplianceObligations.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md border-l-4 border-indigo-500">
                    <item.icon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                    <div>
                        <h5 className="font-semibold text-gray-800">{item.title}</h5>
                        <p className="text-sm text-gray-600">{item.detail}</p>
                    </div>
                </div>
            ))}
        </div>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">Cancellation or Surrender of IEC</h4>
        <div className="p-6 bg-red-50 rounded-xl shadow-lg border-l-4 border-red-500">
            <p className="text-lg text-gray-700 font-medium">Businesses can cancel or surrender their IEC if they wish to discontinue foreign trade by logging on to the DGFT website and choosing the **Surrender of IEC** option. Deactivation upon violation means no trade activity is permitted until reactivation.</p>
        </div>
    </section>
);

const IECWhyVakilsearch = () => (
    <section id="iec-why-vakilsearch" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Why Vakilsearch for IEC Registration?</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            Vakilsearch simplifies the IEC registration process by offering expert assistance from start to finish, ensuring quick approval and full compliance.
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {iecWhyVakilsearch.map((service, i) => {
                const Icon = i % 4 === 0 ? FileText : i % 4 === 1 ? Zap : i % 4 === 2 ? Clock : Briefcase;
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

        <h4 className="text-2xl font-bold mb-6 mt-12 text-gray-800">Common Challenges and Our Solutions</h4>
        <div className="p-6 bg-[#E6F0F6] rounded-xl border-l-4 border-amber-500 shadow-md">
            <p className="text-lg text-gray-700 font-semibold">We overcome **complex documentation requirements** and verification delays by ensuring **100% accuracy** of every detail, checking application status, and facilitating communication with the DGFT.</p>
        </div>
    </section>
);

const IECFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
    <section id="iec-faqs-content" className="py-12 max-w-5xl mx-auto scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">FAQs on Import Export Code</h3>

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
export default function IECRegistrationPage() {
    const [activeTab, setActiveTab] = useState(iecTabs[0].id);
    const [faqOpen, setFaqOpen] = useState(null);

    const SCROLL_OFFSET = 120;

    // --- SCROLLSPY IMPLEMENTATION ---
    useEffect(() => {
        const sectionIds = iecTabs.map(tab => tab.id);

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
            {/* === HERO SECTION (IEC Registration Specific) === */}
            <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">

                    {/* Background Image Section */}
                    <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
                        <img
                            src={BackgroundImageSrc}
                            alt="IEC Registration background"
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
                                <span className="font-semibold text-black">Importer Exporter Code Registration</span>
                            </nav>

                            {/* Badge */}
                            <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                                #1 Legal Service Provider In India
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-black">
                                Importer Exporter Code Registration
                            </h1>

                            {/* Bullet Points with CheckCircle */}
                            <div className="space-y-4 mb-8 text-sm lg:text-base text-black">
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Expert assisted **100% online IEC Registration**, filing done in **2 Days!** T&C*
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Go global with **end-to-end IEC registration support** across India.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    IEC registration made easy for **10,000+ businesses** since 2011.
                                </p>
                            </div>
                            <p className="text-sm font-semibold text-gray-700">How to register for (IEC) View Certificate Sample</p>

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
                                        Talk to Our Expert
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
                        {iecTabs.map((tab) => (
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
                    <IECOverviewContent />
                    <IECBenefitsContent />
                    <IECEligibilityContent />
                    <IECDocumentsContent />
                    <IECProcessContent />
                    <IECComplianceContent />
                    <IECWhyVakilsearch />
                    <IECFAQsContent faqs={iecFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
                </div>
            </div>

        </div>
    );
}