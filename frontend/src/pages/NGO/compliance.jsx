import React, { useState, useEffect } from "react";
// axios is kept for convention, though not used in frontend logic
import axios from "axios";
import {
    ChevronDown,
    Zap, // For Credibility/Audit-Ready
    Briefcase, // For Compliance/Annual Filings/Governance
    ArrowRight,
    Star,
    CheckCircle,
    FileText, // For document/Forms 10BD/10BE
    Scale, // For Regulatory Requirements/Compliance
    Handshake, // For Consultations/Assistance
    TrendingUp, // For Tax Benefits/Grants/Funding
    Lightbulb, // For Expert Guidance/Updates
    Users, // For Members/Directors/Governing Body
    DollarSign, // For Fees/Donations/Funding
    Clock, // For Timely Filing/Deadlines
    Landmark, // For MCA/CBDT/ROC/Government
    MapPin,
    BookOpen,
    RefreshCw, // For Revalidation/Renewal
    Shield, // For Mitigating Risks/Non-Compliance
    AlertTriangle,
    Calendar  // For Consequences/Penalties
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from '../../assets/business.png'; // Reusing a general business image

// --- NGO COMPLIANCE STATIC DATA DEFINITIONS ---

const complianceTabs = [
    { id: 'compliance-overview-content', label: 'Overview' },
    { id: 'compliance-darpan-section', label: 'NGO Darpan & CSR-1' },
    { id: 'compliance-tax-revalidation', label: '80G & 12A Revalidation' },
    { id: 'compliance-tax-forms', label: 'Form 10BD & 10BE' },
    { id: 'compliance-sec8-annual', label: 'Section 8 Annual' },
    { id: 'compliance-why-vakilsearch', label: 'Why Vakilsearch?' },
    { id: 'compliance-faqs-content', label: "FAQs" },
];

const darpanDocuments = [
    "Copy of the registration certificate as a PDF or JPG.",
    "Pan card of NGO.",
    "PAN and Aadhaar card copies of 3 members in the executive committee.",
    "Name, Address, Registration Number, and Date of Registration of NGO/VO.",
    "Details about funding from the government and chief area of working.",
];

const taxRevalidationDetails = {
    overview: "All NGOs relying on donations for tax exemption must register/revalidate under Section 80G (for donor tax deduction) and Section 12A (for NGO income tax exemption). This is mandatory and often requires prior Darpan registration.",
    timeline: "The overall process may take up to **three months**. The registration must be revalidated every **5 years**, with re-application made six months before the date of expiry.",
    documents: [
        "Pan Card of NGO, Registration Number, and Date of registration.",
        "PAN and Aadhaar card copies of 3 members in the executive committee.",
        "Name, Address, and Details of three members of the executive committee.",
        "Details about funding from the government and chief area of working.",
    ]
};

const csr1Details = {
    eligibility: "Mandatory for all NGOs that receive Corporate Social Responsibility (CSR) funds from companies (Net worth over ₹500 crores, Turnover over ₹1,000 crores, or Net Profit over ₹5 crores).",
    form: "Filing Form CSR-1 with the Ministry of Corporate Affairs (MCA) for 'Registration of Entities for Undertaking CSR Activities'.",
    timeline: "Registration is usually done within **one week** of the submission of all documents.",
    documents: [
        "Copy of PAN card of the NGO registration.",
        "Mail ID and mobile number.",
        "Details of Governing Body Members and Copy of registration certificate.",
        "NGO Darpan ID.",
        "Digital Signature of the authorised person with their PAN.",
    ]
};

const form10BDConsequences = [
    { title: "Fee for Delayed Filing", penalty: "A fee of **₹200/- per day** of delay will be charged to the reporting entity (under section 234G).", icon: Clock },
    { title: "Penalty for Non-filing", penalty: "A penalty under section 271K, which shall **not be less than ₹10,000/- and may extend to ₹1,00,000**.", icon: AlertTriangle },
    { title: "Loss of Donor Benefit", penalty: "Failure to file Form 10BD prevents donors from claiming the deduction on their income tax return.", icon: DollarSign },
];

const section8Compliances = [
    "Appointment of an auditor.",
    "Maintenance of a register.",
    "Convening statutory meetings.",
    "Report by directors.",
    "Financial statements of the company.",
    "Tax returns.",
    "Filing of financial statements and annual returns.",
];

const ngoWhyVakilsearch = [
    "Expert Assistance: Team of expert lawyers and Chartered Accountants (CAs) to completely handle the process.",
    "Consultation and Guidance: We set up a call to explain the nuances of NGO registration and compliance (including CSR-1 filing).",
    "Transparency: Our process is completely transparent, and you will get timely updates.",
    "Affordable & Hassle-Free: We provide legal services at an affordable price in a hassle-free way.",
    "Ongoing Support: Get assistance from our team of experts if you have any questions during the compliance process.",
];

const ngoComplianceFAQs = [
    { q: "What are some common complications in NGO compliance?", a: "Common issues include failing to file annual returns (AOC-4/MGT-7), missing the revalidation deadline for 12A/80G (every 5 years), and non-filing of Form 10BD for donor transparency." },
    { q: "How can NGOs ensure ongoing compliance?", a: "By engaging expert services like Vakilsearch, maintaining proper books of accounts, conducting timely annual audits, and utilizing compliance packages designed specifically for their organizational type (Trust/Society/Section 8)." },
    { q: "What are the consequences of non-compliance for NGOs?", a: "Consequences include loss of valuable tax exemptions (12A/80G), imposition of daily penalty fees (e.g., Form 10BD), revocation of licenses (e.g., Section 8 or FCRA), and loss of public credibility." },
    { q: "How can NGOs mitigate the risks of non-compliance?", a: "Mitigation involves setting a compliance calendar, utilizing digital platforms for timely filing, and ensuring the appointment of qualified CAs/CSs for annual statutory obligations." },
    { q: "Can non-compliance result in legal consequences for NGOs?", a: "Yes. Severe non-compliance, fund misuse, or fraud can lead to heavy financial penalties, prosecution of directors, and even the winding up or dissolution of the organization by the regulatory body (MCA/ROC)." },
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

// --- TAB CONTENT COMPONENTS (NGO Compliance Content) ---

const ComplianceOverviewContent = () => (
    <section id="compliance-overview-content" className="py-12 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Overview of NGO Compliance</h2>
        <p className="text-lg text-gray-700 mb-4 max-w-4xl">
            NGO compliance involves meeting all regulatory requirements set by the Ministry of Corporate Affairs, Income Tax Department, and other government bodies to maintain **legal status, tax exemptions (12A & 80G), and funding eligibility (Darpan & CSR-1)**.
        </p>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            This sector is heavily regulated to ensure transparency and proper fund utilization. Failure to comply can result in **heavy penalties, loss of tax benefits, and license revocation**.
        </p>

        <h3 className="text-2xl font-bold mb-6 text-gray-800">Key Compliance Areas Covered:</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <DetailItem title="NGO Darpan" description="Mandatory registration for NGOs receiving government funding (Ministry of Rural Development)." icon={Landmark} />
            <DetailItem title="CSR-1 Filing" description="Mandatory registration with MCA for NGOs receiving corporate CSR funds." icon={Briefcase} />
            <DetailItem title="Tax Revalidation" description="Revalidation of 80G & 12A every 5 years for continued tax exemption benefits." icon={TrendingUp} />
            <DetailItem title="Annual Returns" description="Mandatory annual filing of forms (like 10BD, AOC-4, MGT-7) based on the organization's structure." icon={FileText} />
        </div>
    </section>
);

const ComplianceDarpanSection = () => (
    <section id="compliance-darpan-section" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800">NGO Darpan & CSR-1 Registration</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            These two registrations are critical for **government funding and corporate sponsorships**, significantly boosting your NGO's credibility and resource access.
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
            {/* NGO Darpan */}
            <div className="p-6 bg-[#E6F0F6] rounded-xl shadow-md border-l-4 border-indigo-500">
                <h4 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2"><Landmark className="w-5 h-5 text-indigo-600" /> NGO Darpan Registration</h4>
                <p className="text-gray-700 mb-4">
                    Operated by the Ministry of Rural Development, this portal is mandatory for NGOs receiving government funding, promoting transparency and accountability. Completing the registration is crucial for credibility.
                </p>
                <h5 className="font-semibold text-gray-800 mb-2">Required Documents:</h5>
                <ul className="space-y-1 text-sm text-gray-700">
                    {darpanDocuments.slice(0, 5).map((doc, i) => (
                        <li key={i} className="flex items-start gap-2"><ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-indigo-500" />{doc}</li>
                    ))}
                </ul>
            </div>

            {/* CSR-1 Registration */}
            <div className="p-6 bg-[#E6F0F6] rounded-xl shadow-md border-l-4 border-green-500">
                <h4 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2"><Briefcase className="w-5 h-5 text-green-600" /> CSR-1 Registration</h4>
                <p className="text-gray-700 mb-4">
                    Mandatory for all NGOs receiving **Corporate Social Responsibility (CSR) funds** from companies. File Form CSR-1 with the MCA (Ministry of Corporate Affairs) as soon as possible.
                </p>
                <h5 className="font-semibold text-gray-800 mb-2">Required Documents:</h5>
                <ul className="space-y-1 text-sm text-gray-700">
                    {csr1Details.documents.map((doc, i) => (
                        <li key={i} className="flex items-start gap-2"><ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />{doc}</li>
                    ))}
                </ul>
                <p className="mt-4 text-xs font-semibold text-gray-600">Timeline: Registration usually done within **one week** of submission.</p>
            </div>
        </div>
    </section>
);

const ComplianceTaxRevalidation = () => (
    <section id="compliance-tax-revalidation" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">80G and 12A Registration/Revalidation</h3>
        <p className="text-lg text-gray-700 mb-4 max-w-4xl">
            NGOs primarily rely on these sections to support their functioning. **80G** helps you receive donations and issue exemption certificates to donors. **12A** exempts your NGO's excess income from income tax purview.
        </p>
        <p className="text-lg font-bold text-red-500 mb-8 max-w-4xl flex items-start gap-2">
            <RefreshCw className="w-6 h-6 flex-shrink-0" />
            Recent changes mandate re-validation under Sections 80G and 12A for all existing NGOs to continue enjoying tax benefits.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                <h4 className="font-bold text-xl text-gray-800 mb-3">Revalidation Timeline and Process</h4>
                <div className="space-y-3 text-gray-700">
                    <p className="flex items-start gap-2"><Clock className="w-5 h-5 flex-shrink-0 text-[#022B50]" /> The overall process may take up to **three months**.</p>
                    <p className="flex items-start gap-2"><Calendar className="w-5 h-5 flex-shrink-0 text-[#022B50]" /> The registration has to be **revalidated every 5 years**.</p>
                    <p className="flex items-start gap-2"><AlertTriangle className="w-5 h-5 flex-shrink-0 text-[#022B50]" /> The re-application must be made **six months before** the date of expiry of the registration.</p>
                </div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                <h4 className="font-bold text-xl text-gray-800 mb-3">Documents for Registration/Revalidation</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                    {taxRevalidationDetails.documents.slice(0, 5).map((doc, i) => (
                        <li key={i} className="flex items-start gap-2"><FileText className="w-4 h-4 mt-1 flex-shrink-0 text-amber-500" />{doc}</li>
                    ))}
                </ul>
            </div>
        </div>
    </section>
);

const ComplianceTaxForms = () => (
    <section id="compliance-tax-forms" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Form 10BD Statement & Certificate of Donation (10BE)</h3>
        <p className="text-lg text-gray-700 mb-4 max-w-4xl">
            The CBDT introduced Forms **10BD** and **10BE** for transparency. Charitable Organizations must file **Form 10BD** electronically each financial year with details of donations received.
        </p>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            Upon filing 10BD, Income Tax issues **Form 10BE**, the certificate that allows donors to claim the deduction. The deadline for filing 10BD is typically **31 May** for the preceding financial year.
        </p>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">Consequences of Non-filing of Form 10BD</h4>
        <div className="grid md:grid-cols-3 gap-6">
            {form10BDConsequences.map((item, i) => (
                <div key={i} className="p-5 bg-red-50 rounded-xl shadow-sm border border-red-200">
                    <item.icon className="w-6 h-6 text-red-500 mb-2" />
                    <h4 className="font-bold text-lg text-gray-800 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600 font-medium">{item.penalty}</p>
                </div>
            ))}
        </div>
    </section>
);

const ComplianceSec8Annual = () => (
    <section id="compliance-sec8-annual" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Section 8 Companies Annual Compliances</h3>
        <p className="text-lg text-gray-700 mb-4 max-w-4xl">
            Section 8 companies are required to comply with strict annual compliances under the **Companies Act, 2013**, to maintain their charitable status and limited liability.
        </p>
        <p className="text-lg font-bold text-[#022B50] mb-8 max-w-4xl">
            We offer an annual compliance package designed specifically for Section 8 companies to handle these legal complexities seamlessly.
        </p>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">Preliminary List of Annual Compliance Tasks:</h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section8Compliances.map((compliance, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                    <Briefcase className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 font-medium">{compliance}</span>
                </div>
            ))}
        </div>
    </section>
);

const ComplianceWhyVakilsearch = () => (
    <section id="compliance-why-vakilsearch" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Why Vakilsearch for NGO Compliance?</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            Our team of expert lawyers and Chartered Accountants (CAs) ensures your organization's transition from registration to fully compliant, audit-ready status is seamless and affordable.
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ngoWhyVakilsearch.map((service, i) => {
                const [title, detail] = service.includes(':') ? service.split(':').map(s => s.trim()) : [service.split('.')[0].trim(), service.split('.').slice(1).join('.').trim()];
                const Icon = i % 5 === 0 ? Users : i % 5 === 1 ? Handshake : i % 5 === 2 ? Zap : i % 5 === 3 ? DollarSign : Lightbulb;
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

const ComplianceFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
    <section id="compliance-faqs-content" className="py-12 max-w-5xl mx-auto scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">FAQs on Complications in NGO Compliance</h3>

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
export default function NGOCompliancePage() {
    const [activeTab, setActiveTab] = useState(complianceTabs[0].id);
    const [faqOpen, setFaqOpen] = useState(null);

    const SCROLL_OFFSET = 120;

    // --- SCROLLSPY IMPLEMENTATION ---
    useEffect(() => {
        const sectionIds = complianceTabs.map(tab => tab.id);

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
            {/* === HERO SECTION (NGO Compliance Specific) === */}
            <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">

                    {/* Background Image Section */}
                    <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
                        <img
                            src={BackgroundImageSrc}
                            alt="NGO Compliance background"
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
                                <span className="font-semibold text-black">Compliance</span>
                            </nav>

                            {/* Badge */}
                            <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                                #1 Legal Service Provider In India
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-black">
                                Complications in NGO Compliance? No More!
                            </h1>

                            {/* Bullet Points with CheckCircle */}
                            <div className="space-y-4 mb-8 text-sm lg:text-base text-black">
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Ensure that your NGO meets all **regulatory requirements** with legal assistance.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Complete support for **documentation, return filing, and annual compliance**.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Opt for regular consultations to keep your NGO **fully compliant and audit-ready**.
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
                                <h2 className="text-xl font-semibold mb-6 text-black text-center">Complications in NGO</h2>

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
                        {complianceTabs.map((tab) => (
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
                    <ComplianceOverviewContent />
                    <ComplianceDarpanSection />
                    <ComplianceTaxRevalidation />
                    <ComplianceTaxForms />
                    <ComplianceSec8Annual />
                    <ComplianceWhyVakilsearch />
                    <ComplianceFAQsContent faqs={ngoComplianceFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
                </div>
            </div>

        </div>
    );
}