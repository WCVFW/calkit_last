import React, { useState, useEffect } from "react";
// axios is kept for convention, though not used in frontend logic
import axios from "axios";
import {
    ChevronDown,
    Zap, // For Efficiency/Trust
    Briefcase, // For Business/Corporate Structure
    ArrowRight,
    Star,
    CheckCircle, // For Quality Assurance/Compliance
    FileText, // For document/CRES/Forms
    Scale, // For Regulation/Standards
    Handshake, // For International Buyer Interaction
    TrendingUp, // For Export Growth/Profit
    Lightbulb, // For Expert Guidance/Market Intelligence
    Users, // For Stakeholders/Training
    DollarSign, // For Fees/Financial Status
    Clock, // For Validity/Renewal
    Landmark, // For Spices Board/Ministry of Commerce
    Globe,
    MapPin,
    Banknote,
    RefreshCw // For Global Market
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from '../../assets/business.png'; // Reusing a general business image

// --- SPICE BOARD REGISTRATION STATIC DATA DEFINITIONS ---

const spiceBoardTabs = [
    { id: 'spice-overview-content', label: 'Overview' },
    { id: 'spice-eligibility-content', label: 'Eligibility' },
    { id: 'spice-benefits-content', label: 'Benefits' },
    { id: 'spice-documents-content', label: 'Documents Required' },
    { id: 'spice-fees-compliance', label: 'Fees & Compliance' },
    { id: 'spice-renewal-penalties', label: 'Renewal & Penalties' },
    { id: 'spice-why-vakilsearch', label: 'Why Vakilsearch' },
    { id: 'spice-faqs-content', label: 'FAQs' },
];

const spiceBoardOverview = {
    title: "Masala/Spice Board Registration - Overview",
    detail: "The Spice Board of India acts as a regulatory body, a division of the Ministry of Commerce and Industry, in charge of promoting Indian spices in the foreign market. It is **mandatory** to have a registration certificate (CRES) for every producer or businessperson who deals with **spice exports**.",
    mandate: "The **Spices Board Act of 1986** mandates this registration. Trading spices without the certificate may result in **arrest and imprisonment** for up to a year.",
    crese: "The Certificate of Registration as Exporter of Spices (**CRES**) is the official name of the certificate provided, which is treated as the **RCMC** (Registration Cum Membership Certificate) for spice exporters."
};

const spiceEligibility = [
    { title: "Registered Entity", detail: "Must be a registered entity under the Companies Act, 1956/2013, or the Partnership Act of 1932 (or other recognized business entity in India).", icon: Briefcase },
    { title: "Valid IEC", detail: "Must have a valid **Import-Export (IE) Code** issued by the Directorate General of Foreign Trade (DGFT).", icon: FileText },
    { title: "Minimum Turnover", detail: "Must have a **minimum turnover of ₹2.5 lakhs** for the previous financial year.", icon: DollarSign },
    { title: "Business Premises & Storage", detail: "Must have a **permanent place of business** and adequate storage facilities for spices.", icon: MapPin },
    { title: "Quality Compliance (FSSAI)", detail: "Must comply with the **food safety and quality standards** prescribed by the Spices Board and possess a **Central FSSAI License** (mandatory for food products).", icon: Scale },
    { title: "Infrastructure & Quality Systems", detail: "Must have the necessary infrastructure, technical know-how, and quality control systems.", icon: CheckCircle },
];

const spiceBenefits = [
    { title: "Legal Mandate Compliance", icon: Scale, detail: "Ensures compliance with the Spices Board Act, 1986, avoiding penalties and legal complications." },
    { title: "Global Market Access", icon: Globe, detail: "Opens doors to international markets by fulfilling a key export requirement and enhancing credibility." },
    { title: "Government Export Incentives", icon: TrendingUp, detail: "Access to various export promotion schemes, financial assistance, and subsidies offered by the government." },
    { title: "International Networking", icon: Handshake, detail: "Facilitates interaction between Indian exporters and foreign buyers through international exhibitions and trade groups." },
    { title: "Quality Assurance & Branding", icon: Zap, detail: "Supports technology and quality upgradation, brand promotion, and product development, boosting brand value." },
    { title: "Market Intelligence", icon: Lightbulb, detail: "Gain access to comprehensive and current importer and exporter data banks for informed decision-making." },
];

const spiceDocuments = [
    { title: "Import-Export Code (IEC) Certificate", detail: "Self-attested copy of the certified IEC issued by the DGFT.", category: "Mandatory", icon: FileText },
    { title: "Confidential Bank Report", detail: "Report from your main bank in the prescribed format, conveying the financial status/net worth.", category: "Mandatory", icon: Banknote },
    { title: "Central FSSAI License", detail: "Valid copy of the Central FSSAI License (mandatory for food product exports).", category: "Mandatory", icon: Scale },
    { title: "Business Registration Proof", detail: "Copy of the Certificate of Incorporation/Partnership Deed/MOA/AOA.", category: "Mandatory", icon: Briefcase },
    { title: "GST Certificate & PAN", detail: "Self-certified copies of the GST registration certificate and the entity's PAN card.", category: "Mandatory", icon: FileText },
    { title: "MSME Certificate", detail: "Copy of MSME Certificate (mandatory for Manufacturer Exporters).", category: "Manufacturer Only", icon: Briefcase },
    { title: "Pollution Control Board (PCB) Consent", detail: "Valid copy of Consent to Operate issued by the Pollution Control Board (for manufacturers).", category: "Manufacturer Only", icon: Scale },
    { title: "Proof of Premises", detail: "Latest rental agreement, sale deed, or utility bill of the processing unit/office.", category: "Mandatory", icon: MapPin },
];

const spiceProcessSteps = [
    "Online Application and Login: Register online on the Spices Board website (or DGFT's common portal) using your IEC, mobile number, and email ID.",
    "Form Completion: Fill in all the required application fields, selecting the category (Manufacturer Exporter or Merchant Exporter) and providing business details.",
    "Document Uploading: Upload scanned copies of all necessary documents (IEC, FSSAI, Bank Report, etc.) in the specified format.",
    "Payment of Government Fees: Pay the prescribed registration fee online via the portal (Manufacturer: ₹17,700 GST Incl.; Merchant: ₹11,800 GST Incl.).",
    "Verification and Scrutiny: The application is forwarded to the relevant Spices Board office for review and verification.",
    "Issuance of CRES: Upon successful verification and completion of the registration, the Certificate of Registration as Exporter of Spices (CRES) is issued.",
];

const renewalAndPenalties = {
    validity: "The CRES certificate is issued for a block period of **three years** (e.g., 2021-2024).",
    renewal: "Renewal must be applied for at least **two months before the expiry date** (or end of the block year) using the prescribed form and paying the renewal fee.",
    quarterlyReturn: "Mandatory to submit **Quarterly Returns using Form B** to the Spices Board. Failure to comply will lead to a **fine of ₹500**.",
    cancellation: "The certificate may be **suspended or cancelled** if no spice or spice product exports are conducted during a three-year block, or due to severe violation of regulations.",
    fine: "Trading spices without a valid certificate (or renewal) can lead to a fine (up to ₹1000) or **imprisonment up to one year**.",
};

const spiceWhyVakilsearch = [
    "Holistic Support: Best team of attorneys and business experts to provide holistic support for both filing and post-compliance.",
    "Fast and Efficient: Experts handle the entire process quickly, from document prep to final CRES certificate issuance.",
    "Error-Free Documentation: Meticulous preparation ensures all necessary documents (including FSSAI and Bank Confidential Report) are correct, avoiding rejection.",
    "Compliance Management: Guidance on mandatory **quarterly returns (Form B)** and renewal requirements to maintain legal status.",
];

const spiceFAQs = [
    { q: "What is a certificate from the masala/spice board?", a: "It is the **Certificate of Registration as Exporter of Spices (CRES)**, which is mandatory for all spice exporters in India. It acts as the Registration-Cum-Membership Certificate (RCMC) for the spice industry." },
    { q: "Is registration with the Masala/Spice Board Mandatory?", a: "Yes, it is mandatory for every producer or businessperson who deals with the export of the 52 specified spices and cardamom, as per the **Spices Board Act of 1986**." },
    { q: "What is the validity of the spice board registration certificate?", a: "The CRES certificate is valid for a block period of **three years**. It must be renewed before the end of each block year to maintain its validity." },
    { q: "What are the penalties applicable for violating the provisions set by the Spice Board?", a: "Penalties include a fine (up to ₹500 for non-filing of quarterly returns), suspension/cancellation of the certificate, or legal action/imprisonment for trading without a valid certificate." },
    { q: "What Documents are necessary for the export of spices?", a: "Key documents include a valid **IEC**, **Central FSSAI License**, PAN, GST Certificate, Confidential Bank Report, and proof of business premises." },
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

const DocumentBox = ({ document, category, icon: Icon }) => (
    <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg shadow-md border-l-4 border-red-500">
        <Icon className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
        <div>
            <p className="text-gray-800 font-medium">{document}</p>
            <p className="text-xs text-gray-600 font-medium">{category}</p>
        </div>
    </div>
);


// --- TAB CONTENT COMPONENTS (Spice Board Registration Content) ---

const SpiceOverviewContent = () => (
    <section id="spice-overview-content" className="py-12 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">{spiceBoardOverview.title}</h2>
        <p className="text-lg text-gray-700 mb-4 max-w-4xl">
            {spiceBoardOverview.detail}
        </p>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            {spiceBoardOverview.mandate} The certificate issued is the **CRES** (Certificate of Registration as Exporter of Spices), which acts as the official **RCMC**.
        </p>

        <h3 className="text-2xl font-bold mb-6 text-gray-800">Who Needs the Spice Board's CRES?</h3>
        <div className="p-5 bg-[#E6F0F6] rounded-xl shadow-md border-l-4 border-[#022B50]">
            <p className="text-gray-700 font-medium">Anyone who exports the **52 specified spices and cardamom** must get the Spice Board's Certificate of Registration as Exporter of Spices (CRES), whether they are a **manufacturer or a merchant/retailer**.</p>
        </div>
    </section>
);

const SpiceEligibilityContent = () => (
    <section id="spice-eligibility-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Eligibility Criteria for Spice Board Registration</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            To register, exporters must meet minimum legal, financial, and quality assurance standards established under the Spices Board Act.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spiceEligibility.map((item, i) => (
                <DetailItem key={i} title={item.title} description={item.detail} icon={item.icon} />
            ))}
        </div>
        
        <h4 className="text-2xl font-bold mb-6 mt-12 text-gray-800">Minimum Turnover Requirement</h4>
        <div className="p-5 bg-amber-50 rounded-xl shadow-md border-l-4 border-amber-500 max-w-lg">
            <p className="text-lg text-gray-700 font-semibold">The exporter or manufacturer must have a **minimum turnover of ₹2.5 lakhs** for the previous financial year.</p>
        </div>
    </section>
);

const SpiceBenefitsContent = () => (
    <section id="spice-benefits-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800">Benefits of Masala/Spice Board Registration Online</h3>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">Key Advantages of CRES/RCMC Certification</h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spiceBenefits.map((item, i) => (
                <DetailItem key={i} title={item.title} description={item.detail} icon={item.icon} />
            ))}
        </div>
    </section>
);

const SpiceDocumentsContent = () => (
    <section id="spice-documents-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Documents Required for the Spice Board Registration Certificate</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            A comprehensive set of financial, legal, and premise-related documents must be submitted online to prove the entity's legitimacy and compliance readiness.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {spiceDocuments.map((doc, i) => (
                <DocumentBox key={i} document={doc.title} category={doc.category} icon={doc.icon} />
            ))}
        </div>
    </section>
);

const SpiceFeesCompliance = () => (
    <section id="spice-fees-compliance" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">CRES Registration Fees and Annual Compliances</h3>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">Spices Board Registration Fees (New Registration)</h4>
        <div className="overflow-x-auto mb-12">
            <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-[#E6F0F6]">
                    <tr>
                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Exporter Category</th>
                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Government Fee (Pre-GST)</th>
                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Total Fee (Including 18% GST)</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    <tr className="bg-white">
                        <td className="px-4 py-3 text-sm font-semibold text-gray-800">Manufacturer</td>
                        <td className="px-4 py-3 text-sm text-gray-700">₹15,000</td>
                        <td className="px-4 py-3 text-sm text-red-600 font-semibold">₹17,700</td>
                    </tr>
                    <tr className="bg-gray-50">
                        <td className="px-4 py-3 text-sm font-semibold text-gray-800">Merchant</td>
                        <td className="px-4 py-3 text-sm text-gray-700">₹10,000</td>
                        <td className="px-4 py-3 text-sm text-red-600 font-semibold">₹11,800</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">Mandatory Post-Registration Compliance</h4>
        <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-indigo-50 rounded-lg shadow-md border-l-4 border-indigo-500">
                <FileText className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700 text-lg">**Quarterly Returns (Form B):** Mandatory submission of Quarterly Returns using Form B. Failure leads to a fine of **₹500**.</span>
            </div>
            <div className="flex items-start gap-4 p-4 bg-indigo-50 rounded-lg shadow-md border-l-4 border-indigo-500">
                <RefreshCw className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700 text-lg">**Renewal Filing:** Application for renewal must be made at least **two months before the expiry** of the three-year block.</span>
            </div>
            <div className="flex items-start gap-4 p-4 bg-indigo-50 rounded-lg shadow-md border-l-4 border-indigo-500">
                <Briefcase className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700 text-lg">**Export Activity:** Certificate may be **cancelled** if no spice or spice product exports are conducted during a three-year block.</span>
            </div>
        </div>
    </section>
);

const SpiceRenewalPenalties = () => (
    <section id="spice-renewal-penalties" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">CRES Validity, Renewal, and Penalties for Violation</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            Timely renewal and strict adherence to the Spices Board Act are mandatory to avoid legal prosecution and suspension or cancellation of the CRES certificate.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-white rounded-xl shadow-lg border border-gray-200">
                <h4 className="font-bold text-xl text-gray-800 mb-3 flex items-center gap-2"><Clock className="w-5 h-5 text-amber-500"/> CRES Validity Time Period</h4>
                <p className="text-gray-700">The certificate is issued for a block period of **three years** and must be renewed at the end of each block year. Failure to renew on time requires applying for a fresh certificate.</p>
            </div>
            <div className="p-5 bg-white rounded-xl shadow-lg border border-gray-200">
                <h4 className="font-bold text-xl text-gray-800 mb-3 flex items-center gap-2"><DollarSign className="w-5 h-5 text-red-500"/> Penalties for Violation</h4>
                <p className="text-gray-700 mb-2">**Fine for Non-Filing:** Up to **₹500** for failing to submit Quarterly Returns (Form B).</p>
                <p className="text-gray-700">**Severe Penalty:** Trading without a valid certificate (or after cancellation) can lead to **imprisonment for up to one year**.</p>
            </div>
        </div>
    </section>
);

const SpiceWhyVakilsearch = () => (
    <section id="spice-why-vakilsearch" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Why Vakilsearch for Masala/Spice Board Registration?</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            Our specialized team ensures your CRES registration is achieved quickly and compliantly, handling the entire legal and documentation process so you can focus on your spice export business.
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {spiceWhyVakilsearch.map((service, i) => {
                const Icon = i % 4 === 0 ? Handshake : i % 4 === 1 ? Zap : i % 4 === 2 ? Briefcase : Scale;
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

const SpiceFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
    <section id="spice-faqs-content" className="py-12 max-w-5xl mx-auto scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">FAQs on Spice Board Registration Online</h3>

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
export default function SpiceBoardRegistrationPage() {
    const [activeTab, setActiveTab] = useState(spiceBoardTabs[0].id);
    const [faqOpen, setFaqOpen] = useState(null);

    const SCROLL_OFFSET = 120;

    // --- SCROLLSPY IMPLEMENTATION ---
    useEffect(() => {
        const sectionIds = spiceBoardTabs.map(tab => tab.id);

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
            {/* === HERO SECTION (Spice Board Registration Specific) === */}
            <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">

                    {/* Background Image Section */}
                    <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
                        <img
                            src={BackgroundImageSrc}
                            alt="Spice Board Registration background"
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
                                <span className="font-semibold text-black">Masala Board/Spice Board Registration</span>
                            </nav>

                            {/* Badge */}
                            <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                                #1 Legal Service Provider In India
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-black">
                                Masala Board/Spice Board Registration Online
                            </h1>

                            {/* Bullet Points with CheckCircle */}
                            <div className="space-y-4 mb-8 text-sm lg:text-base text-black">
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Grow Your Spice Import-Export Business with **Expert Spice Board Registration**.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    **Seamless online registration** with full documentation and compliance support.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Expand globally with **trusted guidance** from experienced legal professionals.
                                </p>
                            </div>
                            <p className="text-sm font-semibold text-gray-700">Complete guide on Spice Board Registration</p>

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
                                <h2 className="text-xl font-semibold mb-6 text-black text-center">Get Started!</h2>

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
                                    <input
                                        className="w-full px-4 py-3 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg text-sm text-black placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                        placeholder="Language"
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
                                        Consult an Expert
                                    </button>
                                    <p className="text-[11px] text-gray-500 text-center mt-1 italic">Easy monthly EMI options available</p>
                                    <p className="text-[11px] text-gray-500 text-center mt-1 italic">No Spam. No Sharing. 100% Confidentiality.</p>
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
                        {spiceBoardTabs.map((tab) => (
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
                    <SpiceOverviewContent />
                    <SpiceEligibilityContent />
                    <SpiceBenefitsContent />
                    <SpiceDocumentsContent />
                    <SpiceFeesCompliance />
                    <SpiceRenewalPenalties />
                    <SpiceWhyVakilsearch />
                    <SpiceFAQsContent faqs={spiceFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
                </div>
            </div>

        </div>
    );
}