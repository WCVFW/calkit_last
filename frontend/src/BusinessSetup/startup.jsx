import React, { useState, useEffect } from "react";
import {
    ChevronDown,
    ArrowRight,
    CheckCircle,
    Star,
    Layers, // For compliance/legal structure
    FileText, // For documents/deeds
    Users, // For partners/members
    Key, // For legal framework/rules
    Briefcase, // For directors/business
    IndianRupee, // For financials/fees
} from "lucide-react";
import { motion } from "framer-motion";
// NOTE: You must replace this path with a valid image path in your environment.
// For example: import BackgroundImageSrc from './assets/business.png'
import BackgroundImageSrc from "@/assets/business.png" 

// --- STATIC DATA DEFINITIONS (Startup India Registration Content) ---

const startupTabs = [
    { id: 'startup-overview-content', label: 'Overview' },
    { id: 'startup-benefits-content', label: 'Benefits' },
    { id: 'startup-eligibility-content', label: 'Eligibility' },
    { id: 'startup-documents-content', label: 'Documents Required' },
    { id: 'startup-process-content', label: 'Process' },
    { id: 'startup-fees-content', label: 'Fees & Schemes' },
    { id: 'startup-faqs-content', label: 'FAQs' },
];

const startupPlans = [
    {
        title: "DPIIT Fast-Track",
        price: "₹3,999",
        originalPrice: "₹5,500",
        discountText: "27% off",
        description: "Essential recognition filing for DPIIT certificate.",
        features: [
            "Expert assisted process (End-to-end filing)",
            "DPIIT Application drafting and submission",
            "Pitch Deck review for compliance",
            "Follow-up with DPIIT on your behalf",
            "Eligibility consultation",
        ],
        isRecommended: false,
        govtFeeNote: "Govt. Fee: NIL",
        cashbackText: "Get complimentary IPR consultation (worth ₹1500)",
    },
    {
        title: "Recognition + Compliance (Recommended)",
        price: "₹7,999",
        originalPrice: "₹11,500",
        discountText: "30% off",
        description: "Complete solution including registration and initial tax filing prep.",
        features: [
            "Expert assisted process (End-to-end filing)",
            "DPIIT Application drafting and submission",
            "Pitch Deck drafting & refinement",
            "Eligibility for Tax Exemption (80-IAC) setup assistance",
            "Support for initial labor law compliance (PF/ESI/Shop Act)",
            "Free GST Registration",
            "Dedicated Account Manager",
        ],
        isRecommended: true,
        govtFeeNote: "Govt. Fee: NIL",
        cashbackText: "Access to Seed Fund Scheme support documentation",
    },
    {
        title: "Premium Funding Ready",
        price: "₹14,999",
        originalPrice: "₹22,900",
        discountText: "35% off",
        description: "For startups preparing for funding rounds and IPR protection.",
        features: [
            "Dedicated Account Manager",
            "DPIIT Recognition + Tax Exemption (80-IAC) filing",
            "Comprehensive Pitch Deck preparation for Investors",
            "Trademark Search and Application Filing",
            "Assistance with Founder/Investor Agreements (drafting support)",
            "MSME/Udyam Registration",
            "Compliance Dashboard Access (1 year)",
        ],
        isRecommended: false,
        govtFeeNote: "Govt. Fee: NIL (Excludes Trademark/Patent Govt Fees)",
        cashbackText: "1 year of complimentary basic accounting software",
    },
];

const startupEligibility = [
    { icon: Layers, title: "Business Type", description: "Must be registered as a Private Limited Company, LLP, or Registered Partnership Firm." },
    { icon: Briefcase, title: "Age Limit", description: "The business must not be older than 10 years from the date of incorporation/registration." },
    { icon: IndianRupee, title: "Annual Turnover", description: "Annual turnover must not exceed ₹100 Crore in any financial year since its incorporation." },
    { icon: Star, title: "Innovation", description: "Must work towards development/improvement of a product or process, or have scalability with potential for wealth/job creation." },
    { icon: Key, title: "Originality", description: "Must not be formed by splitting up or reconstruction of an existing business." },
];

const startupBenefits = [
    { icon: IndianRupee, title: "Tax Exemption", detail: "Enjoy 3 consecutive years of **100% income tax exemption** (under Section 80-IAC) after obtaining the DPIIT certificate." },
    { icon: Layers, title: "Funding Access", detail: "Direct access to government funding schemes like the **Startup India Seed Fund Scheme** and Fund of Funds for Startups (FFS)." },
    { icon: Key, title: "IPR Rebate", detail: "Get up to **80% rebate on Patent filing** and 50% rebate on Trademark filing fees, with expedited processing." },
    { icon: FileText, title: "Self-Certification", detail: "Simplified compliance through self-certification under 9 environmental and labour laws." },
    { icon: Briefcase, title: "Public Procurement", detail: "Exemption from prior experience/turnover criteria for participating in government tenders." },
    { icon: Users, title: "Faster Exit", detail: "Simple winding-up process under the Insolvency and Bankruptcy Code, 2016 (within 90 days)." },
];

const startupProcess = [
    "Step 1: Incorporate your entity (Pvt. Ltd. / LLP / Partnership)",
    "Step 2: Get a PAN number for the entity",
    "Step 3: Register and create a profile on the official Startup India portal",
    "Step 4: Fill in the DPIIT Recognition Application Form (Upload details of business, directors/partners)",
    "Step 5: Upload mandatory documents (Certificate of Incorporation/Registration, PAN, and a detailed Pitch Deck)",
    "Step 6: Obtain the DPIIT Certificate upon successful verification by the concerned authorities.",
];

const startupDocuments = [
    "Certificate of Incorporation/Registration",
    "PAN Card of the Company/LLP/Firm",
    "Detailed Pitch Deck or Business Description (Showcasing innovation and scalability)",
    "Directors/Partners details (Aadhaar/PAN)",
    "Audited Financial Statements (if business is more than a year old)",
    "Authorisation Letter by the Company/Firm",
];

const startupFees = {
    professionalFeeStart: "₹3,999",
    govtFeeNote: "**Zero Government Fee** for the DPIIT Recognition application itself.",
    iprNote: "Government fees for Patent (₹1600 - ₹8000) and Trademark (₹4500) are separate and paid directly to the government.",
};

const startupFAQs = [
    { q: "What is DPIIT Recognition for startups?", a: "DPIIT Recognition is the formal acknowledgement by the Department for Promotion of Industry and Internal Trade that a company qualifies as a 'Startup' under the Indian Government’s Startup India initiative, granting access to various benefits." },
    { q: "Is Startup India Registration mandatory?", a: "No, it's optional, but highly recommended as it unlocks key benefits like **tax exemptions, funding schemes, and IPR rebates**, which are vital for early-stage growth." },
    { q: "Who can apply for Startup India Registration?", a: "A Private Limited Company, a Limited Liability Partnership (LLP), or a Registered Partnership Firm, that is less than 10 years old and has an annual turnover below ₹100 Crore." },
    { q: "How long does DPIIT recognition take?", a: "The entire process, including government processing, typically takes between **7 to 15 working days** once the complete and correct documentation is submitted." },
    { q: "What is the 3-year tax exemption benefit (80-IAC)?", a: "Startups can apply for exemption from paying income tax on their profits for **3 consecutive years** out of their first 10 years of operation, provided they meet certain criteria." },
    { q: "Is there a Government Fee for the DPIIT application?", a: "No. The application for DPIIT recognition itself is **completely free** on the official government portal. Professional consultation fees apply for expert assistance and compliance support." },
    { q: "What is a Pitch Deck, and why is it needed?", a: "It is a presentation (or document) that details the business model, the problem it solves, its innovative nature, and its potential for scale. It is crucial for DPIIT to assess the 'innovation' criteria." },
    { q: "Can an existing business get DPIIT Recognition?", a: "Yes, as long as the business is not more than 10 years old and meets all other eligibility criteria, including not being a result of restructuring an old business." },
];

// --- REUSABLE COMPONENTS (Kept as is for design consistency) ---

const ProcessStep = ({ stepNumber, step }) => (
    <li className="flex items-start gap-4">
        <div className="bg-[#2E96FF] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
            {stepNumber}
        </div>
        <span className="text-gray-700 text-base sm:text-lg">{step}</span>
    </li>
);

const RequirementItem = ({ icon: Icon, title, description }) => (
    <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 transition hover:shadow-md">
        <Icon className="w-5 h-5 text-[#2E96FF] mt-1 flex-shrink-0" />
        <div>
            <h4 className="font-semibold text-base sm:text-lg text-gray-800 mb-1">{title}</h4>
            <p className="text-gray-600 text-sm">{description}</p>
        </div>
    </div>
);

const StartupPlanCard = ({ plan, hoveredPlanId, setHoveredPlanId, selectedPlanId, setSelectedPlanId }) => {
    const isSelected = plan.title === selectedPlanId;
    const isHovered = plan.title === hoveredPlanId;
    const isRecommended = plan.title.includes("Recommended");
    const isProminent = isSelected || isHovered || (isRecommended && !selectedPlanId && !hoveredPlanId);
    
    const baseClasses = `relative p-4 sm:p-6 rounded-xl shadow-lg flex flex-col justify-between h-full transition-all duration-300 cursor-pointer`;
    const activeClasses = isProminent 
        ? 'bg-[#E6F2FF] border-2 border-[#2E96FF] scale-[1.03] shadow-2xl'
        : 'bg-white border border-gray-200 hover:shadow-xl hover:scale-[1.02]';

    const handleClick = () => {
        setSelectedPlanId(plan.title);
    }

    let badgeText = '';
    if (isSelected) {
        badgeText = 'Selected Plan';
    } else if (isRecommended && !selectedPlanId) {
        badgeText = 'Recommended Plan';
    }

    return (
        <div
            className={`${baseClasses} ${activeClasses}`}
            onMouseEnter={() => setHoveredPlanId(plan.title)}
            onMouseLeave={() => setHoveredPlanId(null)}
            onClick={handleClick}
        >
            {isProminent && badgeText && (
                <div className="absolute top-0 right-0 bg-[#2E96FF] text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                    {badgeText}
                </div>
            )}

            <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-1">{plan.title.replace(' (Recommended)', '')}</h3>
                <p className={`text-sm mb-4 text-gray-500`}>{plan.description}</p>

                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 mb-4">
                    <span className="text-xl sm:text-3xl font-extrabold text-[#2E96FF]">{plan.price}</span>
                    <span className="text-sm line-through text-gray-400">{plan.originalPrice}</span>
                    <span className="text-sm text-green-600 font-bold">{plan.discountText}</span>
                </div>
                {plan.govtFeeNote && <span className="text-xs text-red-500 mb-2 block font-semibold">{plan.govtFeeNote}</span>}

                <div className={`text-sm font-semibold mb-4 text-green-700`}>
                    {plan.cashbackText}
                </div>

                <button
                    className={`w-full py-2.5 sm:py-3 font-semibold rounded-lg transition-colors shadow-md ${isProminent
                        ? 'bg-[#2E96FF] text-white hover:bg-[#0069D1]'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPlanId(plan.title);
                    }}
                >
                    Get Started
                </button>

                <h4 className="font-bold text-gray-800 mt-4 sm:mt-6 mb-3 border-t pt-3">What you'll get:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                    {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};


// --- SECTION COMPONENTS (STARTUP INDIA CONTENT) ---

const StartupOverviewContent = () => (
    <section id="startup-overview-content" className="py-8 sm:py-12 scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">Startup India Registration & DPIIT Recognition</h2>
        <p className="text-base sm:text-lg text-gray-700 mb-6 max-w-4xl">
            **Startup India** is a flagship initiative of the Government of India, launched to build a strong ecosystem for nurturing **innovation and startups**. Registration is a formal process that grants your firm **DPIIT Recognition** (Department for Promotion of Industry and Internal Trade).
        </p>

        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">What is DPIIT Recognition?</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 max-w-4xl">
            It is the official certificate that legally identifies your business as a startup, making it eligible to access a wide range of government benefits, including **tax exemptions (80-IAC), funding schemes (Seed Fund Scheme), and Intellectual Property Right (IPR) benefits**.
        </p>

        <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-[#2E96FF] shadow-inner">
            <h3 className="text-xl font-bold text-[#113C6D] mb-3">Key Benefits at a Glance</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />3-Year Income Tax Exemption (80-IAC)</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />Up to 80% Rebate on Patent Filing</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />Access to Government Funding</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />Simplified Compliance & Self-Certification</li>
            </ul>
        </div>
    </section>
);

const StartupBenefitsContent = () => (
    <section id="startup-benefits-content" className="py-8 sm:py-12 scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Major Benefits of DPIIT Recognition</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-4xl">
            DPIIT recognition is crucial for a startup's growth, significantly reducing operational costs and improving access to capital and government contracts.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {startupBenefits.map((benefit, i) => (
                <div key={i} className="p-5 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-lg text-green-800 mb-2 flex items-center gap-2"><Layers className="w-5 h-5" /> {benefit.title}</h4>
                    <p className="text-sm text-gray-700">{benefit.detail}</p>
                </div>
            ))}
        </div>
    </section>
);

const StartupEligibilityContent = () => (
    <section id="startup-eligibility-content" className="py-8 sm:py-12 scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Eligibility Criteria for Startup India Recognition</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-4xl">
            To qualify as a 'Startup' and receive DPIIT recognition, your entity must meet the following criteria as defined by the government.
        </p>

        <h4 className="text-xl font-bold mb-3 text-gray-800">Key Requirements:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
            {startupEligibility.map((req, i) => (
                <RequirementItem key={i} {...req} />
            ))}
        </div>

        <div className="p-4 text-sm bg-indigo-50 text-indigo-800 rounded-lg border-l-4 border-indigo-500">
            **Important:** The core requirement is proving **innovation and scalability**. Mere product development or restructuring of an existing business does not qualify.
        </div>
    </section>
);

const StartupDocumentsContent = () => (
    <section id="startup-documents-content" className="py-8 sm:py-12 scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Documents Required for DPIIT Application</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 max-w-4xl">
            The DPIIT registration is fully online and requires digital copies of your entity's legal and business documentation. The **Pitch Deck** is the most critical document for proving innovation.
        </p>

        <h4 className="text-xl font-bold mb-3 text-gray-800">Mandatory Documents Checklist:</h4>
        <div className="space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-200 mb-8">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 text-sm">
                {startupDocuments.map((doc, i) => (
                    <li key={i} className="flex items-start gap-2"><FileText className="w-4 h-4 text-orange-500 flex-shrink-0 mt-1" />{doc}</li>
                ))}
            </ul>
        </div>
        
        <div className="p-4 text-sm bg-blue-100 text-blue-800 rounded-lg border-l-4 border-blue-500">
            **Pitch Deck Focus:** Your Pitch Deck must clearly explain: 1. The problem your startup is solving. 2. Your unique solution/product. 3. How your product is innovative/scalable. 4. Potential for employment/wealth creation.
        </div>
    </section>
);

const StartupProcessContent = () => (
    <section id="startup-process-content" className="py-8 sm:py-12 scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Step-by-Step Process for DPIIT Recognition</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-4xl">
            The registration is conducted entirely through the official Startup India portal. Expert assistance ensures the correct categorization and compliant submission of your Pitch Deck.
        </p>

        <h4 className="text-xl font-bold mb-3 text-gray-800">6 Steps to DPIIT Recognition:</h4>
        <ol className="space-y-4 sm:space-y-5 list-none border-l-2 border-indigo-100 pl-4 mb-10">
            {startupProcess.map((step, i) => (
                <ProcessStep key={i} stepNumber={i + 1} step={step} />
            ))}
        </ol>

        <div className="p-4 text-sm bg-yellow-100 text-yellow-800 rounded-lg border-l-4 border-yellow-500">
            **Post-Registration:** After receiving the DPIIT Certificate, your startup can then separately apply for the **80-IAC Tax Exemption** certificate from the Income Tax Department and the **Seed Fund** if applicable.
        </div>
    </section>
);

const StartupFeesContent = () => (
    <section id="startup-fees-content" className="py-8 sm:py-12 scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Registration Fees & Government Scheme Comparison</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 max-w-4xl">
            The DPIIT application is free. However, a significant benefit is access to the Startup India Seed Fund Scheme and substantial IPR fee rebates.
        </p>

        <h4 className="text-xl font-bold mb-3 text-gray-800">Fee Breakdown:</h4>
        <div className="overflow-x-auto mb-10">
            <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Particulars</th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DPIIT Recognition Fee</th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Professional Fee (Zolvit)</th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax Benefit Access</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                    <tr>
                        <td className="px-3 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Government Fee</td>
                        <td className="px-3 sm:px-6 py-4 text-green-600 font-bold">₹0 (Zero)</td>
                        <td className="px-3 sm:px-6 py-4 text-gray-700">Starts from {startupFees.professionalFeeStart}</td>
                        <td className="px-3 sm:px-6 py-4 text-green-600 font-bold">Yes (80-IAC)</td>
                    </tr>
                    <tr>
                        <td className="px-3 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Processing Time</td>
                        <td className="px-3 sm:px-6 py-4 text-gray-700">7 - 15 working days</td>
                        <td className="px-3 sm:px-6 py-4 text-gray-700">Priority Submission</td>
                        <td className="px-3 sm:px-6 py-4 text-gray-700">Follows DPIIT</td>
                    </tr>
                    <tr>
                        <td className="px-3 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">IPR Rebates</td>
                        <td className="px-3 sm:px-6 py-4 text-gray-700">Up to 80% on Patents</td>
                        <td className="px-3 sm:px-6 py-4 text-gray-700">IPR Filing Support Available</td>
                        <td className="px-3 sm:px-6 py-4 text-gray-700">N/A</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="p-4 text-sm bg-red-50 text-red-800 rounded-lg border-l-4 border-red-500">
            {startupFees.iprNote}
        </div>
    </section>
);


const StartupFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
    <section id="startup-faqs-content" className="py-8 sm:py-12 max-w-5xl mx-auto scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800 text-center">FAQs on Startup India Registration & DPIIT</h3>

        <div className="space-y-3 sm:space-y-4">
            {faqs.map((f, i) => (
                <div key={i} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <button
                        className={`w-full flex justify-between items-center p-4 sm:p-5 text-left transition ${faqOpen === i ? 'bg-[#E6F2FF] text-[#2E96FF]' : 'bg-white hover:bg-gray-50'}`}
                        onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    >
                        <span className="font-semibold text-base sm:text-lg">{f.q}</span>
                        <ChevronDown
                            className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform ${faqOpen === i ? "rotate-180 text-[#2E96FF]" : "text-gray-500"}`}
                        />
                    </button>
                    <motion.div
                        initial={false}
                        animate={{ height: faqOpen === i ? "auto" : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <p className="px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base text-gray-700 bg-white">{f.a}</p>
                    </motion.div>
                </div>
            ))}
        </div>
    </section>
);


// --- MAIN COMPONENT ---
export default function StartupLandingPageDesign() {
    
    const [activeTab, setActiveTab] = useState(startupTabs[0].id); 
    const [faqOpen, setFaqOpen] = useState(null);
    const [hoveredPlanId, setHoveredPlanId] = useState(null);
    const [selectedPlanId, setSelectedPlanId] = useState(startupPlans.find(p => p.isRecommended)?.title || null); 

    const SCROLL_OFFSET = 120; // Adjusted offset for fixed header/sticky nav

    // --- SCROLLSPY IMPLEMENTATION (Kept as is) ---
    useEffect(() => {
        const sectionIds = startupTabs.map(tab => tab.id);

        const handleScroll = () => {
            let currentActiveTab = sectionIds[0];

            for (let i = 0; i < sectionIds.length; i++) {
                const sectionId = sectionIds[i];
                const section = document.getElementById(sectionId);

                if (section) {
                    const rect = section.getBoundingClientRect();
                    // Check if the section top is above or equal to the fixed navigation bar position
                    if (rect.top <= SCROLL_OFFSET) {
                        currentActiveTab = sectionId;
                    }
                }
            }
            setActiveTab(currentActiveTab);
        };

        // Note: The listener must be attached to the window
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call to set the correct tab state

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); 

    // Function to handle smooth scrolling when a tab is clicked
    const handleTabClick = (id) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                // Adjust scroll position to account for the sticky navigation bar
                top: element.offsetTop - SCROLL_OFFSET, 
                behavior: 'smooth'
            });
            setActiveTab(id);
        }
    };

    return (
        <div className="bg-white min-h-screen font-[Inter]">
            {/* === HERO SECTION === */}
            <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">

                    {/* Background Image */}
                    <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
                        <img
                            src={BackgroundImageSrc}
                            alt="Startup India graphic" 
                            className="absolute top-0 left-0 w-full h-full object-cover"
                        />
                    </div>

                    {/* Content and Form Wrapper */}
                    <div className="relative flex flex-col lg:flex-row items-start pt-10 pb-12 lg:pb-0 z-20">

                        {/* LEFT COLUMN - CONTENT */}
                        <div className="w-full lg:w-3/5 text-black p-4 md:p-6 pb-20 relative z-20">

                            {/* Breadcrumbs */}
                            <p className="text-sm text-gray-700 mb-2">Home &gt; Government Schemes &gt; **Startup India Registration**</p>

                            {/* Badge */}
                            <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                                #1 Legal Service Provider in India
                            </div>

                            {/* Heading */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
                                Startup India DPIIT Recognition & Tax Exemption
                            </h1>

                            {/* Description */}
                            <div className="space-y-2 mb-6">
                                <p className="flex items-center gap-2 text-gray-800 text-sm">
                                    <span className="w-2 h-2 bg-blue-600 block rounded-full"></span>
                                    Get official **DPIIT-recognition** for your Private Ltd, LLP, or Partnership firm.
                                </p>
                                <p className="flex items-center gap-2 text-gray-800 text-sm">
                                    <span className="w-2 h-2 bg-blue-600 block rounded-full"></span>
                                    Access **3-year income tax exemption** and up to **80% IPR fee rebates**.
                                </p>
                                <p className="flex items-center gap-2 text-gray-800 text-sm">
                                    <span className="w-2 h-2 bg-blue-600 block rounded-full"></span>
                                    Complete your registration online with **zero government fee** for the application.
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4 flex-wrap mb-6">
                                <button className="flex items-center gap-2 bg-[#113C6D] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-indigo-900 transition">
                                    Know about Startup India Scheme in 60 sec
                                </button>
                                <button className="flex items-center gap-2 border border-[#113C6D] text-[#113C6D] px-6 py-3 rounded-lg font-semibold hover:bg-[#113C6D] hover:text-white transition">
                                    🧾 View Sample DPIIT Certificate
                                </button>
                            </div>
                            
                        </div>

                        {/* RIGHT COLUMN - FORM */}
                        <div className="w-full lg:w-[350px] relative z-30 lg:mt-0 lg:ml-auto mt-[-100px] sm:mt-[-50px]">
                            <div
                                className="w-full p-6 md:p-8 rounded-2xl shadow-xl bg-white"
                                style={{ borderRadius: '24px', border: '1px solid #E0E0E0' }}
                            >
                                <h2 className="text-xl font-semibold mb-6 text-gray-800">Get DPIIT Recognition Today</h2>
                                <form className="space-y-4">
                                    <input
                                        className="w-full px-4 py-3 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                        placeholder="Email"
                                        type="email" 
                                    />
                                    <input
                                        className="w-full px-4 py-3 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                        placeholder="Mobile Number"
                                        type="tel" 
                                    />
                                    <input
                                        className="w-full px-4 py-3 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                        placeholder="City / Pincode"
                                        type="text" 
                                    />
                                    
                                    {/* Whatsapp Toggle */}
                                    <div className="flex items-center justify-between pt-2">
                                        <span className="text-sm text-gray-600">Get easy updates through **Whatsapp**</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#2E96FF]"></div>
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-[#113C6D] text-white py-3 font-semibold rounded-lg transition-colors hover:bg-indigo-900 text-base shadow-md mt-4"
                                    >
                                        Get Started Now
                                    </button>
                                    <p className="text-xs text-center font-bold mt-2 text-gray-800">
                                        Plans starting at **₹3,999**
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* --- Pricing Section --- */}
            <section className="py-8 sm:py-16 px-4 md:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">
                        Right Plan for Your Startup's Growth
                    </h2>
                    <p className="text-sm sm:text-lg text-gray-600 mb-8 sm:mb-10 text-center">
                        Expert assistance for error-free DPIIT filing, ensuring you secure maximum government benefits.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
                        {startupPlans.map((plan, i) => ( 
                            <StartupPlanCard
                                key={i}
                                plan={plan}
                                hoveredPlanId={hoveredPlanId}
                                setHoveredPlanId={setHoveredPlanId}
                                selectedPlanId={selectedPlanId}
                                setSelectedPlanId={setSelectedPlanId}
                            />
                        ))}
                    </div>
                    <div className="mt-8 text-center text-sm text-gray-500">
                        <p>Note: Government fees for IPR (Trademark/Patent) and other statutory charges are additional to the above fee. Refer T&C</p>
                    </div>
                </div>
            </section>

            {/* === Main Content Tabs Navigation (Sticky) === */}
            <section className="py-3 sm:py-4 md:py-10 px-4 md:px-8 bg-white border-b border-gray-200 sticky top-0 z-30 shadow-md">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center bg-white rounded-xl w-full text-xs sm:text-sm md:text-base overflow-x-scroll border border-gray-200">
                        {startupTabs.map((tab) => ( 
                            <a
                                href={`#${tab.id}`} 
                                key={tab.id}
                                // Active Tab Styling: 'border-b-4 border-[#2E96FF]' creates the blue line
                                className={`flex flex-col flex-shrink-0 min-w-[100px] sm:min-w-[120px] py-3 sm:py-4 px-2 text-center font-bold cursor-pointer transition-all ${activeTab === tab.id ? 'bg-[#E6F2FF] border-b-4 border-[#2E96FF] text-[#2E96FF]' : 'text-gray-700 hover:bg-gray-50'}`}
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
                    <StartupOverviewContent />
                    <StartupBenefitsContent />
                    <StartupEligibilityContent />
                    <StartupDocumentsContent />
                    <StartupProcessContent />
                    <StartupFeesContent />
                    <StartupFAQsContent faqs={startupFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} /> 
                </div>
            </div>
        </div>
    );
}