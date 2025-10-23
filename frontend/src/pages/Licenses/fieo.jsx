import React, { useState, useEffect } from "react";
// axios is kept for convention, though not used in frontend logic
import axios from "axios";
import {
    ChevronDown,
    Zap, // For Efficiency/Quick Filing
    Briefcase, // For Business/Exporters/Trade
    ArrowRight,
    Star,
    CheckCircle, // For Checklist/Compliance
    FileText, // For document/RCMC
    Scale, // For Regulation/Policy
    Handshake, // For Networking/Collaboration
    TrendingUp, // For Growth/Concessions
    Lightbulb, // For Expert Guidance/Market Intelligence
    Users, // For Members/Executives
    DollarSign, // For Fees/Financials
    Clock, // For Timely Filing/Validity
    Landmark, // For Ministry of Commerce/Government
    Globe, // For International Markets
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from '../../assets/business.png'; // Reusing a general business image

// --- FIEO REGISTRATION STATIC DATA DEFINITIONS ---

const fieoTabs = [
    { id: 'fieo-overview-content', label: 'Overview' },
    { id: 'fieo-rcmc-content', label: 'RCMC & Eligibility' },
    { id: 'fieo-benefits-content', label: 'Benefits of FIEO' },
    { id: 'fieo-services-content', label: 'Services' },
    { id: 'fieo-documents-content', label: 'Documents Required' },
    { id: 'fieo-fees-content', label: 'Membership Fees' },
    { id: 'fieo-why-vakilsearch', label: 'Why Vakilsearch' },
    { id: 'fieo-faqs-content', label: 'FAQs' },
];

const fieoOverview = {
    detail: "The **Federation of Indian Export Organisations (FIEO)** was established by the Ministry of Commerce, Government of India, to supervise and promote India's exports. Its main objective is to help members take their businesses global by resolving issues and challenges faced by exporters.",
    rcmcPurpose: "The **RCMC (Registration-Cum-Membership Certificate)** is the registration required by the DGFT (Directorate General of Foreign Trade). FIEO is one of the designated councils, and membership is crucial for availing certain export benefits and concessions.",
};

const rcmcEligibility = [
    { title: "Exporter Status", detail: "The entity applying must be genuinely engaged in the business of exporting goods or services from India.", icon: Briefcase },
    { title: "Valid IEC Code", detail: "A self-certified copy of the **Import Export Code (IEC) number** is mandatory.", icon: FileText },
    { title: "Export Activity Overview", detail: "Specify the firm's main business line and the type of exports conducted. Requires consent if the business involves products under a specific Board (e.g., Tea Board).", icon: TrendingUp },
    { title: "Board Approval", detail: "The applicant needs to obtain necessary authorization from the relevant Product Board or FIEO itself (if no specific board exists for the product).", icon: Scale },
];

const fieoBenefits = [
    { title: "Trade Concessions", icon: Scale, detail: "Access trade concessions and benefits under the Foreign Trade Policy." },
    { title: "MAI Grant Access", icon: DollarSign, detail: "Disburses MAI (Market Access Initiative) grants to eligible members for participating in overseas exhibitions/trade fairs at subsidised costs." },
    { title: "High Visibility on FIEO Website", icon: Zap, detail: "Opportunity for members to upload product pictures and host their profile on the FIEO website, searchable by global buyers." },
    { title: "Policy Clarity and Issue Resolution", icon: Lightbulb, detail: "Platform for members to discuss issues with authorities (Customs, DGFT) and seek clarification on international trade issues via online chat facility." },
    { title: "Certificate of Origin & Visa Letters", icon: FileText, detail: "Issues FIEO Certificate of Origin and Visa recommendation letters to members to facilitate their overseas travel." },
    { title: "Market Intelligence", icon: Globe, detail: "Provides access to the Indian Trade Portal with free online service offering MFN tariffs, preferential tariffs, import statistics, and India's market share." },
];

const fieoServices = [
    { title: "Weekly e-Bulletin & Market Updates", detail: "Keeps traders informed of both national and international trade-related news and developments on the global stage.", icon: Lightbulb },
    { title: "FOREX Services", detail: "Launches FOREX Services including spot rates, forward rates, a forward calculator, and historical data.", icon: DollarSign },
    { title: "Trade Facilitation", detail: "Provides information and guidance on various trade-related matters, including export regulations, customs procedures, documentation, and tariff rates.", icon: Briefcase },
    { title: "Policy Advocacy & Meetings", detail: "Organises high-level meetings between government officials and exporters to address trade issues and advocate for favourable policies.", icon: Landmark },
];

const fieoDocuments = [
    { title: "IEC (Import Export Code) Number", detail: "A self-certified copy of the Import Export Code number.", icon: FileText },
    { title: "Annual Membership Fee", detail: "The yearly fee (DD/Cheque/Pay Order) made out to FIEO.", icon: DollarSign },
    { title: "Letter of Authority", detail: "Printed on the company's letterhead, specifying the representative who will handle the application.", icon: FileText },
    { title: "SSI/Industrial License/IEM", detail: "A self-certified copy of the SSI registration certificate, industrial license, or IEM (if applicable).", icon: Briefcase },
    { title: "Star Export House Certificate", detail: "Self-certified copy of the certificates for 1 to 5-star export houses (if applicable).", icon: CheckCircle },
    { title: "Director/Partner/Owner ID", detail: "Government-recognized ID (PAN/Aadhaar) of Director, Partner, and Owners.", icon: Users },
    { title: "GSTIN & Financials", detail: "Copy of GSTIN and statements of foreign exchange earnings for the previous three fiscal years (for service providers).", icon: DollarSign },
];

const fieoProcessSteps = [
    "Step 1: Access the FIEO Portal: Visit the FIEO website, access the membership section, and select 'How to apply for RCMC registration'.",
    "Step 2: Fill Application Details: Provide your Import-Export Code (IEC), choose 'Ordinary Membership', and fill in firm details (name, address, export type, entity type, export house status).",
    "Step 3: Provide Executives & Authority: Share information on key management executives and submit the **Letter of Authority** for the representative.",
    "Step 4: Document Verification: Our experts confirm the accuracy and submit the application along with the required documents and payment.",
    "Step 5: Certificate Issuance: Following successful government verification, the FIEO Registration Certificate (RCMC) is issued.",
];

const fieoFees = [
    { category: "Individual Exporter / Multi-Products Group / Service Providers / State Export Organisation", fee: "₹6,250/-", note: "Applicable GST rates are additional." },
    { category: "FTZ units/EOUs / One Star Export House", fee: "₹9,375/-", note: "Higher fee due to specific export promotion status." },
    { category: "Two Star Export House", fee: "₹12,500/-", note: "Fees increase with higher export house status." },
    { category: "Four Star Export House", fee: "₹50,000/-", note: "Highest fee category for established, large-scale exporters." },
];

const fieoWhyVakilsearch = [
    "Top Legal Team: Our attorneys specialize in foreign trade regulations and RCMC filing.",
    "Complete Documentation: We gather and prepare all required documentation (IEC, financials, authority letters) for accurate submission.",
    "No Delays: We complete all the processes efficiently, avoiding common errors that lead to delays.",
    "Holistic Support: We provide complete holistic support through the process, leveraging our experience in multiple sectors.",
];

const fieoFAQs = [
    { q: "What is Registration Cum Membership Certificate (RCMC)?", a: "RCMC is a certificate issued by an Export Promotion Council (like FIEO) or a Commodity Board. It validates a firm's status as an exporter and is mandatory for availing export benefits and concessions from the DGFT." },
    { q: "Is FIEO an export promotion council?", a: "Yes, FIEO is one of the recognized Export Promotion Councils (EPCs) designated by the Ministry of Commerce, Government of India." },
    { q: "How do FIEO registrations help its members to increase the credibility of Exporter?", a: "Membership displays the exporter's profile on the FIEO website, which is searchable by global buyers, signaling verified status and enhancing credibility for international trade." },
    { q: "What is the Registration Validity?", a: "The RCMC is valid for **five years**, typically from 1 April of the licensing year of issue, unless otherwise specified. Renewal must be applied for before the expiry date." },
    { q: "What are the benefits for E-commerce sellers having FIEO registration?", a: "E-commerce sellers benefit from access to MAI grants for international marketing, platform hosting on the FIEO website, and guidance on foreign trade policies." },
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


// --- TAB CONTENT COMPONENTS (FIEO Registration Content) ---

const FIEOOverviewContent = () => (
    <section id="fieo-overview-content" className="py-12 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Federation of Indian Export Organisations (FIEO) - An Overview</h2>
        <p className="text-lg text-gray-700 mb-4 max-w-4xl">
            {fieoOverview.detail}
        </p>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            The FIEO Membership works actively to bring up the issues and challenges faced by exporters with the relevant agencies in order to have them resolved as soon as possible. Its main objective is to help members take their businesses global.
        </p>

        <h3 className="text-2xl font-bold mb-6 text-gray-800">Understanding RCMC from FIEO</h3>
        <div className="p-5 bg-[#E6F0F6] rounded-xl shadow-md border-l-4 border-[#022B50]">
            <p className="text-gray-700">The **Registration-Cum-Membership Certificate (RCMC)** is the registration required by the **DGFT**. FIEO is the council for export promotion designated by the government for exporters dealing in non-specific or multi-products.</p>
        </div>
    </section>
);

const FIEORCMCContent = () => (
    <section id="fieo-rcmc-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">RCMC Eligibility and Membership Types</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            An RCMC from FIEO is mandatory for Indian exporters engaged in international trade who seek to avail benefits and concessions related to exports.
        </p>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">Eligibility Criteria for RCMC Registration in FIEO</h4>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
            {rcmcEligibility.map((item, i) => (
                <DetailItem key={i} title={item.title} description={item.detail} icon={item.icon} />
            ))}
        </div>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">RCMC Membership Types</h4>
        <div className="grid md:grid-cols-2 gap-6">
            <FeatureBox title="Ordinary Membership" detail="Intended for organizations that have recently started operating in the export and import sectors." icon={Users} />
            <FeatureBox title="Partner Membership" detail="Organizations that have long histories of exporting and importing goods are eligible. Fees are higher and based on a fee in addition to minimal GST rates." icon={TrendingUp} />
        </div>
    </section>
);

const FIEOBenefitsContent = () => (
    <section id="fieo-benefits-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800">Benefits of FIEO Registration and Membership</h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fieoBenefits.map((item, i) => (
                <DetailItem key={i} title={item.title} description={item.detail} icon={item.icon} />
            ))}
        </div>
    </section>
);

const FIEOServicesContent = () => (
    <section id="fieo-services-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800">Services and Activities Conducted by FIEO in India</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            FIEO provides a comprehensive suite of services ranging from market intelligence to policy advocacy and high-level issue resolution for its members.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fieoServices.map((service, i) => (
                <FeatureBox key={i} title={service.title} detail={service.detail} icon={service.icon} />
            ))}
        </div>
    </section>
);

const FIEODocumentsContent = () => (
    <section id="fieo-documents-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Documents Required for FIEO Registration (RCMC)</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            To complete the application and obtain RCMC, applicants must submit a complete set of legal, financial, and regulatory documents, all self-certified.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fieoDocuments.map((doc, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-red-50 rounded-lg shadow-md border-l-4 border-red-500">
                    <doc.icon className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                    <div>
                        <p className="text-gray-800 font-medium">{doc.title}</p>
                        <p className="text-xs text-gray-600 font-medium">{doc.detail.split(',')[0]}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

const FIEOFeesContent = () => (
    <section id="fieo-fees-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">FIEO Membership Annual Subscription Fees</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            The annual subscription fee varies significantly based on the exporter category and the level of export house status attained. (Applicable GST rates are extra).
        </p>

        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-[#E6F0F6]">
                    <tr>
                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Category</th>
                        <th className="px-4 py-2 text-right text-xs font-bold text-gray-700 uppercase">Annual Fee (₹)</th>
                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Description</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {fieoFees.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-4 py-3 text-sm font-semibold text-gray-800">{row.category}</td>
                            <td className="px-4 py-3 text-sm text-gray-700 text-right font-medium">{row.fee}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{row.note}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <h4 className="text-2xl font-bold mb-6 mt-12 text-gray-800">FIEO Registration Validity and Renewal</h4>
        <div className="p-5 bg-amber-50 rounded-xl shadow-md border-l-4 border-amber-500">
            <p className="text-lg text-gray-700 font-semibold">The RCMC is valid for **five years** (ending 31 March of the licensing year). Renewal should be done before the expiry date to ensure continuity of export benefits.</p>
        </div>
    </section>
);

const FIEOWhyVakilsearch = () => (
    <section id="fieo-why-vakilsearch" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Why Vakilsearch for FIEO Registration?</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            Vakilsearch has the top legal team to simplify your RCMC application process, ensuring quick, accurate filing and comprehensive holistic support.
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {fieoWhyVakilsearch.map((service, i) => {
                const Icon = i % 4 === 0 ? Users : i % 4 === 1 ? FileText : i % 4 === 2 ? Zap : Briefcase;
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

const FIEOFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
    <section id="fieo-faqs-content" className="py-12 max-w-5xl mx-auto scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">FIEO Registration FAQ's</h3>

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
export default function FIEORegistrationPage() {
    const [activeTab, setActiveTab] = useState(fieoTabs[0].id);
    const [faqOpen, setFaqOpen] = useState(null);

    const SCROLL_OFFSET = 120;

    // --- SCROLLSPY IMPLEMENTATION ---
    useEffect(() => {
        const sectionIds = fieoTabs.map(tab => tab.id);

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
            {/* === HERO SECTION (FIEO Registration Specific) === */}
            <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">

                    {/* Background Image Section */}
                    <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
                        <img
                            src={BackgroundImageSrc}
                            alt="FIEO Registration background"
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
                                <span className="font-semibold text-black">NGO</span> &gt;{" "}
                                <span className="font-semibold text-black">FIEO Registration</span>
                            </nav>

                            {/* Badge */}
                            <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                                #1 Legal Service Provider In India
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-black">
                                FIEO Registration Online
                            </h1>

                            {/* Bullet Points with CheckCircle */}
                            <div className="space-y-4 mb-8 text-sm lg:text-base text-black">
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Get **FIEO-RCMC registration done in 3 simple steps** with expert legal assistance.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    RCMC certificate delivered on time for **legal compliance and export benefits**.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    **100% online process** for both new registration and renewals with full compliance.
                                </p>
                            </div>
                            <p className="text-sm font-semibold text-gray-700">Complete guide on FIEO Registration</p>

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
                                <h2 className="text-xl font-semibold mb-6 text-black text-center">Get Legal Assistance</h2>

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
                        {fieoTabs.map((tab) => (
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
                    <FIEOOverviewContent />
                    <FIEORCMCContent />
                    <FIEOBenefitsContent />
                    <FIEOServicesContent />
                    <FIEODocumentsContent />
                    <FIEOFeesContent />
                    <FIEOWhyVakilsearch />
                    <FIEOFAQsContent faqs={fieoFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
                </div>
            </div>

        </div>
    );
}