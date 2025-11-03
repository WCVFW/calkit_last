import React, { useState, useEffect } from "react";
// axios is kept for convention, though not used in frontend logic
import axios from "axios";
import {
    ChevronDown,
    Zap, // For Credibility/Trust
    Briefcase, // For Compliance/Governance
    ArrowRight,
    Star,
    CheckCircle, // For Checklist/Benefits
    FileText, // For document/Form FC-3A/Annual Return FC-4
    Scale, // For Legal Compliance/Regulation
    Handshake, // For Donations/Foreign Contributions
    TrendingUp, // For Funding/Support
    Lightbulb, // For Expert Guidance/Clarity
    Users, // For Associations/Organizations
    DollarSign, // For Fees/Penalties
    Clock, // For Validity/Renewal/Timely Filing
    Landmark, // For MHA/Central Government
    Banknote, // For Foreign Contributions/Bank Account
    Shield, // For Legal Protection/National Interest
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from '../../assets/business.png'; // Reusing a general business image

// --- FCRA REGISTRATION STATIC DATA DEFINITIONS ---

const fcraTabs = [
    { id: 'fcra-overview-content', label: 'Overview' },
    { id: 'fcra-purpose-benefits', label: 'Purpose & Benefits' },
    { id: 'fcra-eligibility-content', label: 'Eligibility & Checklist' },
    { id: 'fcra-types-content', label: 'Types & Documents' },
    { id: 'fcra-process-content', label: 'Process & Bank A/C' },
    { id: 'fcra-renewal-compliance', label: 'Renewal & Annual Return' },
    { id: 'fcra-prohibitions-penalties', label: 'Prohibitions & Penalties' },
    { id: 'fcra-faqs-content', label: 'FAQs' },
];

const fcraPurposes = [
    { title: "Regulating Acceptance and Utilization", icon: Scale, detail: "The FCRA regulates the acceptance and utilisation of foreign contributions and hospitality to promote national interest and security." },
    { title: "Preventing Misuse", icon: Shield, detail: "Aims to prevent the misuse of foreign donations, ensuring they are not used for activities detrimental to national interest or security." },
    { title: "Enhancing Transparency and Accountability", icon: Zap, detail: "Requires organizations to maintain detailed records and reports of foreign funds, subject to government oversight." },
    { title: "Building Credibility and Trust", icon: Handshake, detail: "Organizations build credibility and trust among donors by adhering to FCRA regulations, ensuring the integrity of foreign fund utilization." },
];

const fcraEligibility = [
    "Must be a registered society, trust, or Section 8 Company.",
    "Must have been in existence for at least **three years** before applying for FCRA registration.",
    "Must have spent at least **₹10,00,000/-** over the last three years on its aims and objectives (excluding administrative expenditure).",
    "Must provide audited statements of income and expenditure for the past three years.",
    "Activities and objectives must align with permissible purposes for receiving foreign contributions.",
];

const fcraBenefits = [
    { title: "Access to Foreign Funding", icon: TrendingUp, detail: "The FCRA certificate is crucial to receive foreign contributions to support projects and initiatives." },
    { title: "Increased Credibility", icon: Zap, detail: "Enhances the organisation's reputation and trustworthiness among international donors." },
    { title: "Support for Development Projects", icon: DollarSign, detail: "Enables funding for cultural, social, economic, educational, or religious programs." },
    { title: "Compliance with Legal Requirements", icon: Briefcase, detail: "Ensures that organisations operate within the legal framework, avoiding legal issues and penalties." },
];

const fcraChecklist = [
    "Ensure your organization is a trust, society, or a Section 8 Company and has been operational for a minimum of three years.",
    "Ready to file Form FC-3A to apply for FCRA registration.",
    "Registration certificate/Trust deed/Memorandum of Association/Article of Association ready.",
    "Activity report and audited financial statements for the last 3 years.",
];

const fcraTypes = [
    { title: "Prior Permission Certificate (PPC)", validity: "Granted for **one year**.", detail: "Apt for newly established NGOs or those seeking specific foreign contributions for particular projects. Requires commitment letter from foreign donor.", icon: Clock },
    { title: "Permanent Registration Certificate (PRC)", validity: "Valid for **5 years**.", detail: "For established organisations under Section 12(1) of the FCRA, 2010. Requires a track record of at least 3 years in utilizing foreign contributions.", icon: Scale },
];

const fcraDocuments = [
    { title: "Registration Certificate of Association", size: "1 MB (PDF)", icon: FileText },
    { title: "Memorandum of Association/Trust deed", size: "5 MB (PDF)", icon: FileText },
    { title: "Activity Report for the last 3 years", size: "3 MB (PDF)", icon: Briefcase },
    { title: "Audited Statement of accounts for the last 3 years", size: "5 MB (PDF)", icon: DollarSign },
    { title: "Affidavit of each key functionary", size: "1 MB (PDF)", icon: Users },
    { title: "Chief Functionary signature & Seal of the Association", size: "50 KB / 100 KB (Pixel)", icon: Zap },
];

const fcraProcessSteps = [
    "Apply online: Go to the official FCRA website (MHA portal) and set up an account.",
    "Fill out Form FC-3A: Complete the online application form with your organisation's details and upload all required documents.",
    "Pay the Fee: Pay the registration fee online (₹5,000 for PP, ₹10,000 for PR).",
    "Await Review & Follow-Up: The FCRA department reviews the application. Provide any additional information if requested.",
    "Receive Certificate: Upon approval, receive your FCRA registration certificate electronically, valid for five years.",
];

const fcraProhibitions = [
    "Representing fictitious entities.",
    "Involvement in religious conversion activities, directly or indirectly.",
    "Having a history of prosecutions related to communal tension, disharmony, or sedition.",
    "Being candidates, journalists, media companies, judges, government servants, politicians, or political organizations receiving foreign funds.",
];

const fcraPenalties = [
    { title: "Financial Penalty", detail: "Government may impose penalties up to **three times the amount** of foreign contributions received in violation of the Act.", icon: DollarSign },
    { title: "Suspension/Cancellation", detail: "Providing incorrect or false information, or concealment of facts, can lead to **suspension or cancellation** of registration.", icon: Scale },
    { title: "Imprisonment & Seizure", detail: "Misrepresentation or fraudulent means can result in imprisonment, fines, or **seizure of contributions**.", icon: Shield },
];

const fcraRenewalCompliance = [
    { title: "Validity & Renewal (FC-3C)", detail: "Registration is valid for **five years**. Must apply for renewal (FC-3C) six months before the expiration date to avoid suspension or cancellation.", icon: Clock },
    { title: "FCRA Annual Return (FC-4)", detail: "Must file an FCRA annual return with the MHA by **December 31st** (within nine months after the fiscal year ends).", icon: FileText },
    { title: "Reporting Receipts (Quarterly)", detail: "If total receipts exceed **Rs. 1 crore** in a financial year, a quarterly summary of total receipts must be filed.", icon: DollarSign },
    { title: "Designated Bank Account (SBI)", detail: "Mandatory to open an FCRA Bank Account **only in State Bank of India (SBI), Main Branch, 11, Sansad Marg, New Delhi-110001** for accepting foreign contributions.", icon: Banknote },
];

const fcraFAQs = [
    { q: "What is FCRA full form?", a: "FCRA stands for the **Foreign Contribution Regulation Act**." },
    { q: "Can an organisation receive foreign contributions without FCRA registration?", a: "No, generally it is illegal. All organizations engaged in cultural, economic, educational, religious, or social activities must obtain **FCRA registration** or **Prior Permission** to legally accept foreign contributions." },
    { q: "How long does it take to obtain FCRA registration?", a: "The official processing time can vary, but with proper expert assistance ensuring compliance, the process typically takes several months, depending on the MHA's scrutiny level." },
    { q: "What are the penalties for late filing of annual returns under FCRA?", a: "Late filing can lead to severe penalties, including fines, suspension, or cancellation of the FCRA registration, and confiscation of contributions." },
    { q: "Is it mandatory to have a designated FCRA bank account?", a: "Yes, according to the FCRA Amendment Act, 2020, it is mandatory to open an FCRA Bank Account *only* in the **State Bank of India (SBI), Main Branch, New Delhi** for the acceptance of foreign contributions." },
];

// --- REUSABLE COMPONENTS ---

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

const FeatureBox = ({ title, detail, icon: Icon }) => (
    <div className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm">
        <Icon className="w-6 h-6 mb-2 text-amber-500" />
        <h4 className="mb-1 text-lg font-bold text-gray-800">{title}</h4>
        <p className="text-sm text-gray-600">{detail}</p>
    </div>
);

// --- TAB CONTENT COMPONENTS (FCRA Registration Content) ---

const FCRAOverviewContent = () => (
    <section id="fcra-overview-content" className="py-12 scroll-mt-24">
        <h2 className="mb-6 text-3xl font-bold text-gray-800">Overview of FCRA Registration</h2>
        <p className="max-w-4xl mb-4 text-lg text-gray-700">
            The **Foreign Contribution Regulation Act (FCRA) Registration** allows organizations engaged in cultural, economic, educational, religious, or social activities to **legally accept foreign contributions**. Issued by the Central Government and managed by the **Ministry of Home Affairs (MHA)**, this certification ensures compliance and proper utilization of foreign funds.
        </p>
        <p className="max-w-4xl mb-8 text-lg text-gray-700">
            The **Foreign Contribution (Regulation) Act, 2010** is the consolidating act that strictly governs the acceptance and utilization of foreign contributions or foreign hospitality for activities connected therewith or incidental thereto.
        </p>
    </section>
);

const FCRAPurposeBenefits = () => (
    <section id="fcra-purpose-benefits" className="py-12 scroll-mt-24">
        <h3 className="mb-8 text-3xl font-bold text-gray-800">FCRA Registration Purpose and Benefits</h3>

        <h4 className="mb-6 text-2xl font-bold text-gray-800">Key Purposes of Obtaining FCRA Registration</h4>
        <div className="grid gap-6 mb-12 md:grid-cols-2">
            {fcraPurposes.map((item, i) => (
                <DetailItem
                    key={i}
                    title={item.title}
                    description={item.detail}
                    icon={item.icon}
                />
            ))}
        </div>

        <h4 className="mb-6 text-2xl font-bold text-gray-800">FCRA Registration Benefits</h4>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {fcraBenefits.map((benefit, i) => (
                <FeatureBox key={i} title={benefit.title} detail={benefit.detail} icon={benefit.icon} />
            ))}
        </div>
    </section>
);

const FCRAEligibilityContent = () => (
    <section id="fcra-eligibility-content" className="py-12 scroll-mt-24">
        <h3 className="mb-6 text-3xl font-bold text-gray-800">Eligibility Criteria and Checklist for FCRA Registration</h3>
        <p className="max-w-4xl mb-8 text-lg text-gray-700">
            Eligibility is determined by the organization's legal structure, age, and proven financial track record over the last three years.
        </p>

        <h4 className="mb-6 text-2xl font-bold text-gray-800">Eligibility Criteria (Permanent Registration)</h4>
        <div className="mb-12 space-y-4">
            {fcraEligibility.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 border-l-4 border-indigo-500 rounded-lg shadow-md bg-indigo-50">
                    <CheckCircle className="flex-shrink-0 w-5 h-5 mt-1 text-indigo-600" />
                    <span className="text-lg text-gray-700">{item}</span>
                </div>
            ))}
        </div>

        <h4 className="mb-6 text-2xl font-bold text-gray-800">Detailed Checklist to Register Under FCRA (FC-3A)</h4>
        <div className="max-w-4xl pl-4 space-y-3 text-gray-700 border-l-4 border-amber-500">
            {fcraChecklist.map((item, i) => (
                <li key={i} className="flex items-start gap-2 list-none">
                    <ArrowRight className="flex-shrink-0 w-5 h-5 mt-1 text-amber-500" />
                    <span>{item}</span>
                </li>
            ))}
        </div>
    </section>
);

const FCRATypesContent = () => (
    <section id="fcra-types-content" className="py-12 scroll-mt-24">
        <h3 className="mb-6 text-3xl font-bold text-gray-800">FCRA Registration Types and Required Documents</h3>

        <h4 className="mb-6 text-2xl font-bold text-gray-800">Two Types of FCRA Registration</h4>
        <div className="grid gap-6 mb-12 md:grid-cols-2">
            {fcraTypes.map((type, i) => (
                <DetailItem
                    key={i}
                    title={`${type.title} (${type.validity})`}
                    description={type.detail}
                    icon={type.icon}
                />
            ))}
        </div>

        <h4 className="mb-6 text-2xl font-bold text-gray-800">Documents Required For FCRA Registration (FC-3A Uploads)</h4>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fcraDocuments.map((doc, i) => (
                <div key={i} className="flex items-start gap-3 p-4 border-l-4 border-red-500 rounded-lg shadow-md bg-red-50">
                    <doc.icon className="flex-shrink-0 w-5 h-5 mt-1 text-red-500" />
                    <div>
                        <p className="font-medium text-gray-800">{doc.title}</p>
                        <p className="text-sm text-gray-600">Max Size: {doc.size}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

const FCRAPlProcessContent = () => (
    <section id="fcra-process-content" className="py-12 scroll-mt-24">
        <h3 className="mb-6 text-3xl font-bold text-gray-800">FCRA Registration Process and Mandatory Bank Account</h3>

        <h4 className="mb-6 text-2xl font-bold text-gray-800">FCRA Online Registration Process (Form FC-3A)</h4>
        <ol className="space-y-5 list-none border-l-2 border-[#022B50] pl-4 mb-12">
            {fcraProcessSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                    <div className="bg-[#022B50] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {i + 1}
                    </div>
                    <span className="text-lg text-gray-700">{step}</span>
                </li>
            ))}
        </ol>

        <h4 className="mb-6 text-2xl font-bold text-gray-800">FCRA Designated Bank Account (Mandatory)</h4>
        <div className="p-6 border-l-4 border-green-600 shadow-lg bg-green-50 rounded-xl">
            <p className="flex items-center gap-2 mb-2 text-lg font-semibold text-gray-700">
                <Banknote className="w-6 h-6 text-green-600"/>
                According to the FCRA Amendment Act, 2020:
            </p>
            <p className="text-lg text-gray-700">You must open an FCRA Bank Account **only in State Bank of India (SBI), Main Branch, 11, Sansad Marg, New Delhi-110001**. This specific account is mandatory for the acceptance of all foreign contributions.</p>
        </div>
    </section>
);

const FCRARenewalCompliance = () => (
    <section id="fcra-renewal-compliance" className="py-12 scroll-mt-24">
        <h3 className="mb-8 text-3xl font-bold text-gray-800">Validity, Renewal, and Annual Return Filing (FC-4)</h3>

        <div className="grid gap-6 mb-12 md:grid-cols-2">
            <div className="p-6 bg-white border border-gray-200 shadow-lg rounded-xl">
                <h4 className="flex items-center gap-2 mb-3 text-xl font-bold text-gray-800"><Clock className="w-5 h-5 text-amber-500"/> Validity and Renewal Status</h4>
                <p className="mb-4 text-gray-700">The registration certificate remains valid for **five years**. NGOs must apply for **FCRA renewal (FC-3C)** six months before the expiration date to maintain credibility.</p>
                <ul className="space-y-1 text-sm text-gray-700">
                    <li>**Renewal Status:** Visit the FCRA portal and enter your unique application ID to track status.</li>
                </ul>
            </div>
            <div className="p-6 bg-white border border-gray-200 shadow-lg rounded-xl">
                <h4 className="flex items-center gap-2 mb-3 text-xl font-bold text-gray-800"><FileText className="w-5 h-5 text-amber-500"/> FCRA Annual Return (Form FC-4)</h4>
                <p className="mb-4 text-gray-700">Registered NGOs receiving foreign funds must file the annual return with the MHA.</p>
                <ul className="space-y-1 text-sm text-gray-700">
                    <li>**Filing Deadline:** By **December 31st** (within nine months after the fiscal year ends).</li>
                    <li>**Requirement:** Must be audited by a Chartered Accountant and filed using Form FC-4 on the FCRA online portal.</li>
                </ul>
            </div>
        </div>

        <p className="max-w-4xl mt-4 text-lg font-semibold text-gray-700">
            **Quarterly Reporting:** If total receipts from foreign sources exceed **Rs. 1 crore** in a financial year, a quarterly summary of total receipts must be filed.
        </p>
    </section>
);

const FCRAPRoPenalties = () => (
    <section id="fcra-prohibitions-penalties" className="py-12 scroll-mt-24">
        <h3 className="mb-8 text-3xl font-bold text-gray-800">Prohibitions and Penalties for Violation of FCRA</h3>

        <h4 className="mb-6 text-2xl font-bold text-gray-800">Key Prohibitions under FCRA Registration</h4>
        <div className="max-w-4xl pl-4 mb-12 space-y-3 text-gray-700 border-l-4 border-red-500">
            {fcraProhibitions.map((item, i) => (
                <li key={i} className="flex items-start gap-2 list-none">
                    <Shield className="flex-shrink-0 w-5 h-5 mt-1 text-red-500" />
                    <span>{item}</span>
                </li>
            ))}
        </div>

        <h4 className="mb-6 text-2xl font-bold text-gray-800">Penalties for Violation of FCRA</h4>
        <div className="grid gap-6 md:grid-cols-3">
            {fcraPenalties.map((item, i) => (
                <div key={i} className="p-5 border border-red-200 shadow-sm bg-red-50 rounded-xl">
                    <item.icon className="w-6 h-6 mb-2 text-red-700" />
                    <h4 className="mb-1 text-lg font-bold text-gray-800">{item.title}</h4>
                    <p className="text-sm font-medium text-gray-600">{item.detail}</p>
                </div>
            ))}
        </div>
    </section>
);

const FCRAWhyVakilsearch = () => (
    <section id="fcra-why-vakilsearch" className="py-12 scroll-mt-24">
        <h3 className="mb-6 text-3xl font-bold text-gray-800">How Vakilsearch Helps in Simplifying the FCRA Registration Process</h3>
        <p className="max-w-4xl mb-8 text-lg text-gray-700">
            We provide comprehensive FCRA registration services, ensuring a smooth and hassle-free process from eligibility assessment to ongoing compliance support.
        </p>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* The structure of whyVakilsearch is not a simple list of strings, so we manually define the boxes for better detail presentation */}
            <FeatureBox title="Expert Guidance" detail="Our legal experts offer precise advice on eligibility and necessary documentation, ensuring clear understanding of every requirement." icon={Lightbulb} />
            <FeatureBox title="Document Preparation" detail="We assist in the meticulous preparation and review of all required documents, ensuring they comply with FCRA regulations to avoid delays or rejections." icon={FileText} />
            <FeatureBox title="Application Filing" detail="Vakilsearch handles the entire application process, filling out the FC-3A form, submitting it online with all necessary documents." icon={Briefcase} />
            <FeatureBox title="Follow-Up & Support" detail="We provide continuous follow-up with the MHA, handling any queries. Ongoing support is provided for annual return filing and renewal applications." icon={Handshake} />
        </div>

        <div className="mt-12 p-6 bg-[#E6F0F6] rounded-xl border-l-4 border-amber-500 shadow-md">
            <h4 className="flex items-center gap-2 mb-2 text-xl font-bold text-gray-800"><DollarSign className="w-5 h-5 text-amber-500"/> FCRA Registration Fees (Government Fees)</h4>
            <p className="text-lg text-gray-700">The government fee for FCRA Prior Permission is **₹5,000/-***. For Permanent Registration, the fee is **₹10,000/-***. (Excluding professional charges. *Fees are subject to change.)</p>
        </div>
    </section>
);

const FCRAFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
    <section id="fcra-faqs-content" className="max-w-5xl py-12 mx-auto scroll-mt-24">
        <h3 className="mb-8 text-3xl font-bold text-center text-gray-800">FAQs for FCRA Registration</h3>

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
export default function FCRARegistrationPage() {
    const [activeTab, setActiveTab] = useState(fcraTabs[0].id);
    const [faqOpen, setFaqOpen] = useState(null);

    const SCROLL_OFFSET = 120;

    // --- SCROLLSPY IMPLEMENTATION ---
    useEffect(() => {
        const sectionIds = fcraTabs.map(tab => tab.id);

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
            {/* === HERO SECTION (FCRA Registration Specific) === */}
            <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
                <div className="relative px-4 pt-12 mx-auto max-w-7xl md:px-8">

                    {/* Background Image Section */}
                    <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
                        <img
                            src={BackgroundImageSrc}
                            alt="FCRA Registration background"
                            className="absolute top-0 left-0 object-cover w-full h-full"
                        />
                    </div>

                    {/* Main Content */}
                    <div className="relative z-20 flex flex-col items-start pt-10 pb-12 lg:flex-row lg:pb-0">

                        {/* Left Column - Text Content */}
                        <div className="relative z-20 w-full p-4 pb-20 text-black lg:w-3/5 md:p-6">

                            {/* Breadcrumb */}
                            <nav className="mb-3 text-sm text-gray-800">
                                <span className="cursor-pointer hover:underline">Home</span> &gt;{" "}
                                <span className="cursor-pointer hover:underline">NGO</span> &gt;{" "}
                                <span className="font-semibold text-black">FCRA</span> &gt;{" "}
                                <span className="font-semibold text-black">FCRA Registration</span>
                            </nav>

                            {/* Badge */}
                            <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                                #1 Legal Service Provider In India
                            </div>

                            {/* Title */}
                            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-black md:text-5xl lg:text-6xl">
                                FCRA Registration
                            </h1>

                            {/* Bullet Points with CheckCircle */}
                            <div className="mb-8 space-y-4 text-sm text-black lg:text-base">
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="flex-shrink-0 w-5 h-5 mt-1 text-blue-400" />
                                    Expert assisted **FC-3A filing** and full guidance on the **FCRA registration in India**.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="flex-shrink-0 w-5 h-5 mt-1 text-blue-400" />
                                    Understand **eligibility, benefits, checklist**, and types of FCRA registration.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="flex-shrink-0 w-5 h-5 mt-1 text-blue-400" />
                                    Get clarity on **renewal, annual return filing (FC-4)**, and registration fees with filing support.
                                </p>
                            </div>
                        </div>

                        {/* Right Column - Form */}
                        <div className="w-full lg:w-[350px] relative z-30 lg:mt-0 lg:ml-auto mt-[-100px] sm:mt-[-50px]">
                            <div
                                className="w-full p-6 bg-white shadow-xl md:p-8 rounded-2xl"
                                style={{ borderRadius: '24px', border: '1px solid #E0E0E0' }}
                            >
                                <h2 className="mb-6 text-xl font-semibold text-center text-black">FCRA Registration</h2>

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
                                        <p className="text-xs font-medium md:text-sm">Get easy updates through Whatsapp</p>
                                        <div className="w-10 h-5 bg-gray-300 rounded-full relative cursor-pointer flex items-center p-0.5 transition-colors">
                                            <div className="w-4 h-4 transform translate-x-0 bg-white rounded-full shadow-md"></div>
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
            <section className="sticky top-0 z-30 px-4 py-4 bg-white border-b border-gray-200 shadow-md md:py-6 md:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="flex items-center w-full overflow-x-auto text-xs bg-white border border-gray-200 rounded-xl md:text-sm lg:text-base">
                        {fcraTabs.map((tab) => (
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
                    <FCRAOverviewContent />
                    <FCRAPurposeBenefits />
                    <FCRAEligibilityContent />
                    <FCRATypesContent />
                    <FCRAPlProcessContent />
                    <FCRARenewalCompliance />
                    <FCRAPRoPenalties />
                    <FCRAWhyVakilsearch />
                    <FCRAFAQsContent faqs={fcraFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
                </div>
            </div>

        </div>
    );
}