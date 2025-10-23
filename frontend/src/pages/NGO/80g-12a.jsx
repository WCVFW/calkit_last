import React, { useState, useEffect } from "react";
// axios is kept for convention, though not used in frontend logic
import axios from "axios";
import {
    ChevronDown,
    Zap, // For Quicker Approval/Efficiency
    Briefcase, // For Legal Documentation/NGO Governance
    ArrowRight,
    Star,
    CheckCircle, // For Checklist/Benefits
    FileText, // For document/Form 10A/10G
    Scale, // For Legal Compliance/Tax Immunity
    Handshake, // For Government Support/Contributors
    TrendingUp, // For Tax Exemption/Funding
    Lightbulb, // For Expert Guidance/Clarity
    Users, // For Trusts/Societies/Companies
    DollarSign, // For Tax Benefits/Income
    Clock, // For Timely Filing/5 Days
    Landmark, // For Income Tax Department/Commissioner
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from '../../assets/business.png'; // Reusing a general business image

// --- 80G & 12A REGISTRATION STATIC DATA DEFINITIONS ---

const taxExemptionTabs = [
    { id: 'tax-exemption-overview', label: 'Overview' },
    { id: 'tax-exemption-benefits', label: 'Benefits' },
    { id: 'tax-exemption-documents', label: 'Documents Required' },
    { id: 'tax-exemption-procedure', label: 'Procedure' },
    { id: 'tax-exemption-why', label: 'Why Vakilsearch' },
    { id: 'tax-exemption-faqs', label: 'FAQs' },
];

const exemptionBenefits = [
    { title: "Tax Exemption for NGO", icon: DollarSign, detail: "The NGO/society's additional income would be exempt from paying taxes by providing the 12A certificate." },
    { title: "More Contributors", icon: Users, detail: "Improves the organization's reputation, making donors eligible for tax exemptions, thus encouraging more donations." },
    { title: "Government Support", icon: Landmark, detail: "NGOs and societies with these certificates are more likely to receive various grants and related funding from the government." },
    { title: "Proof of Existence", icon: Scale, detail: "Serves as a legally binding declaration of the entity's registered status, aiding in securing loans or grants." },
    { title: "Donor Tax Benefit", icon: TrendingUp, detail: "Helps donors reduce their tax obligations, providing a set amount of tax immunity to the appropriate government agencies." },
];

const docs80G = [
    "Trust deed (for a trust) or Memorandum of Association (MOA) (for society/Section 8 Company).",
    "Registration certificate (for society/Section 8 company).",
    "Certificate of no objection from the property proprietor where the registered department is located.",
    "Form 10G (Application form).",
    "PAN document of the NGO.",
    "Copy of a utility bill (electricity or water) or property tax receipt.",
    "The last three years' books of accounts and income tax returns online.",
    "A list of welfare initiatives implemented and a three-year progress report.",
    "Latest business documents.",
];

const docs12A = [
    "Form 10A (Application form).",
    "Trust deed / Memorandum of Association (MOA) / AOA of the company.",
    "Certificate of incorporation / Registration certificate.",
    "Legal ID proof of the achievement of the Trust or NGO.",
    "The Trust's three-year bank account statement.",
    "PAN of the firm.",
];

const procedure80G = [
    "Bring the essential paperwork and a request for an 80G certificate to the Commissioner of Income Tax (Exemption) in the region under the entity's council.",
    "The Income Tax agency conducts an on-site examination following the submission of the form and necessary paperwork.",
    "If documentation appears insufficient or something is missing, officials may request more documents or proof.",
    "The Commissioner issues the institution with an 80G certificate after thoroughly verifying the paperwork.",
];

const procedure12A = [
    "File an application in the Form 10A in accord with the jurisdictional Commissioner of Income Tax's instructions.",
    "After receiving the Form and verifying documentation, the Commissioner substantiates the legitimacy of the organisation's activity.",
    "The Commissioner has the right to request any additional paperwork or information deemed appropriate.",
    "The Commissioner provides a written declaration granting 12A registration based on the reasonable report.",
    "The applicant is given a fair opportunity to be heard if the application is rejected because the Commissioner is not satisfied.",
];

const whyVakilsearch = [
    "Clear Insights: Our team of experts provides clear insights about Section 80G registration and certification.",
    "Compliance Guarantee: We help register your entity without breaching any compliance, ensuring smooth processing.",
    "Query Resolution: Book a slot with our registration experts right away to resolve all your queries and kickstart the process.",
    "Error-Free Filing: Meticulous preparation and filing of documentation to achieve accurate submission in just 5 days.",
];

const exemptionFAQs = [
    { q: "What is an 80G certificate?", a: "It supports financial contributions to certain non-profit organizations. Donors can reduce the donated amount from their total income, resulting in a tax immunity, provided they furnish the donation receipt." },
    { q: "Why is 12A registration necessary?", a: "NGOs receive income, and without Section 12A registration, they must pay tax at formal rates on their surplus income. 12A provides a one-time tax exemption on this additional income." },
    { q: "Can we combine 12A and 80G applications?", a: "Yes, you can file both applications simultaneously. Having 12A registration is a prerequisite for obtaining 80G certification." },
    { q: "Are 12A and 80G the same?", a: "No. **12A** exempts the **NGO's income** from taxation. **80G** allows **donors** to claim a tax deduction on their donations to the NGO." },
    { q: "Who is qualified to register under 12A?", a: "Trusts, NGOs, and Section 8 Companies that engage in charitable and non-profit endeavors are eligible to apply for 12A registration." },
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

const DocumentBox = ({ document, requiredFor }) => (
    <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg shadow-md border-l-4 border-red-500">
        <FileText className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
        <div>
            <p className="text-gray-800 font-medium">{document}</p>
            <p className="text-xs text-gray-600 font-medium">{requiredFor}</p>
        </div>
    </div>
);

const ProcedureStep = ({ stepNumber, step }) => (
    <li className="flex items-start gap-4">
        <div className="bg-[#022B50] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
            {stepNumber}
        </div>
        <span className="text-gray-700 text-lg">{step}</span>
    </li>
);

// --- TAB CONTENT COMPONENTS (80G & 12A Registration Content) ---

const TaxExemptionOverview = () => (
    <section id="tax-exemption-overview" className="py-12 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Section 80G and 12A Registration - The Basics</h2>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            These two registrations are vital for any non-profit entity (Trust, Society, or Section 8 Company) seeking **financial legitimacy** and **tax advantages** in India under the Income Tax Act, 1961.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-[#E6F0F6] rounded-xl shadow-md border-l-4 border-[#022B50]">
                <h4 className="font-bold text-xl text-gray-800 mb-2 flex items-center gap-2"><DollarSign className="w-6 h-6 text-[#022B50]"/> What Is an 80G Certificate?</h4>
                <p className="text-sm text-gray-700">The 80G certificate benefits the **donor**. When a person donates to an 80G-certified charity, they are allowed to **reduce that amount from their total taxable income**, resulting in tax immunity.</p>
            </div>
            <div className="p-5 bg-[#E6F0F6] rounded-xl shadow-md border-l-4 border-[#022B50]">
                <h4 className="font-bold text-xl text-gray-800 mb-2 flex items-center gap-2"><TrendingUp className="w-6 h-6 text-[#022B50]"/> About 12A Registration</h4>
                <p className="text-sm text-gray-700">The 12A registration benefits the **NGO itself**. Entities with 12A registration are **free from paying tax on their surplus or additional income**, which must be reinvested for charitable purposes.</p>
            </div>
        </div>
    </section>
);

const TaxExemptionBenefits = () => (
    <section id="tax-exemption-benefits" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800">Key Benefits of Section 80G and 12A Registration</h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exemptionBenefits.map((item, i) => (
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

const TaxExemptionDocuments = () => {
    // Separate documents for clarity
    const commonDocs = [
        "Trust deed / Memorandum of Association (MOA)",
        "Registration certificate (for Section 8 Company/Societies)",
        "PAN of the firm.",
    ];

    const specificDocs = [
        { doc: "Form 10G and Details of Donors", req: "Mandatory for 80G application." },
        { doc: "Form 10A", req: "Mandatory for 12A application." },
        { doc: "Certificate of no objection from the proprietor of the property", req: "Required for 80G application." },
        { doc: "The last three years' books of accounts and ITR", req: "Required for 80G application." },
        { doc: "The Trust's three-year bank account statement", req: "Required for 12A application." },
        { doc: "A list of welfare initiatives implemented and a three-year progress report", req: "Required for 80G application." },
    ];

    return (
        <section id="tax-exemption-documents" className="py-12 scroll-mt-24">
            <h3 className="text-3xl font-bold mb-6 text-gray-800">Documents Required for 12A and 80G Registration</h3>
            <p className="text-lg text-gray-700 mb-8 max-w-4xl">
                While some documents are common, both registrations have separate mandatory forms and specific historical record requirements for submission to the Income Tax Commissioner.
            </p>

            <h4 className="text-2xl font-bold mb-6 text-gray-800">Common and Mandatory Documents</h4>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
                {commonDocs.map((doc, i) => (
                    <DocumentBox key={i} document={doc} requiredFor="Mandatory for both 12A and 80G" />
                ))}
            </div>

            <h4 className="text-2xl font-bold mb-6 text-gray-800">Specific Documents by Requirement</h4>
            <div className="grid md:grid-cols-2 gap-6">
                {specificDocs.map((doc, i) => (
                    <DocumentBox key={i} document={doc.doc} requiredFor={doc.req} />
                ))}
            </div>
        </section>
    );
};

const TaxExemptionProcedure = () => (
    <section id="tax-exemption-procedure" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Procedure for 80G and 12A Registration</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            The process involves rigorous verification by the jurisdictional Commissioner of Income Tax, who may request further clarification or documents before granting the certificates.
        </p>

        <div className="grid lg:grid-cols-2 gap-10">
            <div>
                <h4 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2"><FileText className="w-6 h-6 text-amber-500"/> Procedure for 80G Registration</h4>
                <ol className="space-y-5 list-none border-l-2 border-amber-500 pl-4">
                    {procedure80G.map((step, i) => (
                        <ProcedureStep key={i} stepNumber={i + 1} step={step} />
                    ))}
                </ol>
            </div>
            <div>
                <h4 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2"><FileText className="w-6 h-6 text-amber-500"/> Procedure for 12A Registration</h4>
                <ol className="space-y-5 list-none border-l-2 border-amber-500 pl-4">
                    {procedure12A.map((step, i) => (
                        <ProcedureStep key={i} stepNumber={i + 1} step={step} />
                    ))}
                </ol>
                <p className="mt-6 text-sm text-gray-600 italic">Note: The applicant is given a fair opportunity to be heard if the Commissioner rejects the application.</p>
            </div>
        </div>
    </section>
);

const TaxExemptionWhyVakilsearch = () => (
    <section id="tax-exemption-why" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Why Vakilsearch for 80G and 12A Registration?</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            Opening an NGO and securing tax exemptions involves a complex set of legalities. Our experts ensure the process is completed accurately and efficiently, minimizing the risk of rejection.
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {whyVakilsearch.map((service, i) => {
                const [title, detail] = service.split(':').map(s => s.trim());
                const Icon = i % 4 === 0 ? Lightbulb : i % 4 === 1 ? CheckCircle : i % 4 === 2 ? Handshake : Zap;
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
            <p className="text-lg text-gray-700 font-semibold">Book a slot with our registration experts right away to resolve all your queries and kickstart the process.</p>
        </div>
    </section>
);

const TaxExemptionFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
    <section id="tax-exemption-faqs" className="py-12 max-w-5xl mx-auto scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">FAQ's on Section 80G and 12A Registration</h3>

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
export default function TaxExemptionRegistrationPage() {
    const [activeTab, setActiveTab] = useState(taxExemptionTabs[0].id);
    const [faqOpen, setFaqOpen] = useState(null);

    const SCROLL_OFFSET = 120;

    // --- SCROLLSPY IMPLEMENTATION ---
    useEffect(() => {
        const sectionIds = taxExemptionTabs.map(tab => tab.id);

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
            {/* === HERO SECTION (80G & 12A Registration Specific) === */}
            <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">

                    {/* Background Image Section */}
                    <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
                        <img
                            src={BackgroundImageSrc}
                            alt="Tax Exemption Registration background"
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
                                <span className="hover:underline cursor-pointer">NGO Registration</span> &gt;{" "}
                                <span className="font-semibold text-black">12A and 80G Registration</span>
                            </nav>

                            {/* Badge */}
                            <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                                #1 Legal Service Provider In India
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-black">
                                Section 80G - 12A Registration
                            </h1>

                            {/* Bullet Points with CheckCircle */}
                            <div className="space-y-4 mb-8 text-sm lg:text-base text-black">
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Secure **12A and 80G tax exemption** for your NGO with guided registration.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Get your documents filed **accurately in just 5 days**.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Ensure **eligibility, compliance, and quicker approval** with legal guidance.
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
                                <h2 className="text-xl font-semibold mb-6 text-black text-center">12A and 80G Registration</h2>

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
                        {taxExemptionTabs.map((tab) => (
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
                    <TaxExemptionOverview />
                    <TaxExemptionBenefits />
                    <TaxExemptionDocuments />
                    <TaxExemptionProcedure />
                    <TaxExemptionWhyVakilsearch />
                    <TaxExemptionFAQsContent faqs={exemptionFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
                </div>
            </div>

        </div>
    );
}