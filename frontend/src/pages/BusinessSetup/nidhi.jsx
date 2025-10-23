import React, { useState, useEffect } from "react";
import {
    ChevronDown,
    ArrowRight,
    CheckCircle,
    Star,
    Layers,
    FileText,
    Users,
    Key,
    ClipboardCheck,
    // --- FIX: Replaced CurrencyRupee with IndianRupee ---
    IndianRupee, 
    // The previous code had other unused imports that are now removed for cleanliness
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from "@/assets/business.png"

// --- STATIC DATA DEFINITIONS (Nidhi Company Registration Content) ---

const nidhiTabs = [
    { id: 'nidhi-overview-content', label: 'Overview' },
    { id: 'nidhi-importance-content', label: 'Importance' },
    { id: 'nidhi-requirements-content', label: 'Requirements' },
    { id: 'nidhi-operation-content', label: 'Operation' },
    { id: 'nidhi-features-content', label: 'Features' },
    { id: 'nidhi-eligibility-content', label: 'Eligibility Criteria' },
    { id: 'nidhi-faqs-content', label: 'FAQs' },
];

const nidhiPlans = [
    {
        title: "Basic Compliance",
        price: "₹14,999",
        originalPrice: "₹19,999",
        discountText: "25% off",
        description: "Covers incorporation and essential first-year filings.",
        features: [
            "DSC & DIN for 3 Directors",
            "Name Approval (RUN)",
            "Incorporation (SPICe+)",
            "MoA & AoA Drafting",
            "PAN & TAN",
        ],
        isRecommended: false,
        govtFeeNote: "Govt. Fees Extra",
        cashbackText: "Fast-Track Option Available",
    },
    {
        title: "Standard (Recommended)",
        price: "₹24,999",
        originalPrice: "₹34,999",
        discountText: "28% off",
        description: "Full registration + essential post-incorporation compliance.",
        features: [
            "All Basic features",
            "Expert Consultation on Nidhi Rules",
            "Post-Incorporation Compliance (NDH-1 & NDH-2 Advisory)",
            "Drafting of Key Internal Policies",
            "Current Bank Account Assistance",
        ],
        isRecommended: true,
        govtFeeNote: "Govt. Fees Extra",
        cashbackText: "Complete Legal Compliance",
    },
    {
        title: "Premium (All-inclusive)",
        price: "₹49,999",
        originalPrice: "₹74,999",
        discountText: "33% off",
        description: "End-to-end service including advanced compliance support.",
        features: [
            "All Standard features",
            "GST/MSME Registration",
            "ITR Filing for the first year",
            "Annual Filing Support (ROC Forms)",
            "Dedicated Relationship Manager",
        ],
        isRecommended: false,
        govtFeeNote: "Govt. Fees Extra",
        cashbackText: "Best Value for New Companies",
    },
];

const nidhiEligibility = [
    { icon: Users, title: "Minimum Members", description: "Must have at least 7 members at incorporation and 200 members within one year." },
    { icon: Key, title: "Minimum Directors", description: "A minimum of 3 directors, with at least one being a resident of India." },
    // FIX: Using IndianRupee here
    { icon: IndianRupee, title: "Capital Requirement", description: "Adequate initial capital (no fixed minimum, but essential for operation)." }, 
    { icon: Layers, title: "Name Requirement", description: "The company name must mandatorily include 'Nidhi Limited'." },
];

const nidhiProcess = [
    "Step 1: Obtaining DSC and DIN for all Proposed Directors",
    "Step 2: Name Approval (RUN form or part of SPICe+)",
    "Step 3: Filing Incorporation Form SPICe+ (MoA, AoA, PAN, TAN)",
    "Step 4: Issuance of Certificate of Incorporation by ROC",
    "Step 5: Post-Incorporation: Open Bank Account and File NDH-1 (within 1 year)",
];

const nidhiFAQs = [
    { q: "How long does the registration of a Nidhi Company take?", a: "The entire process, from DSC/DIN to receiving the Certificate of Incorporation, typically takes 15-25 working days, provided all documents are in order and name approval is swift." },
    { q: "What is the minimum member requirement for Nidhi Company incorporation?", a: "A minimum of 7 members are required at the time of incorporation, but the company must reach a minimum of 200 members within one year of its incorporation." },
    { q: "Can a Nidhi Company accept deposits from the public like a Public Company?", a: "No. A Nidhi Company can accept deposits only from its **members**. Deposits from non-members or the general public are strictly prohibited." },
    { q: "Are foreign nationals allowed to be directors in a Nidhi Company?", a: "Yes, but at least one director must be a resident of India (stayed in India for not less than 182 days in the previous financial year)." },
    { q: "Is there a paid-up capital or equity share capital requirement for Nidhi Companies?", a: "While the Nidhi Rules, 2014 do not specify a minimum capital, practical considerations and operational scale dictate an adequate initial capital base. The focus is more on maintaining Net-Owned Funds (NOF)." },
    { q: "What is Form NDH-1, and when must it be filed?", a: "Form NDH-1 is a statement filed within 90 days from the end of the first financial year to declare that the company has complied with the rule of having a minimum of 200 members and maintaining the Net-Owned Fund ratio." },
    { q: "Can a Limited Liability Partnership (LLP) convert into a Nidhi Company?", a: "Yes, an LLP can be converted into a Nidhi company by following the prescribed rules and procedures set by the MCA and the Companies Act, 2013." },
];

const visibleLinkSections = [
    { title: "Company Registration", links: ["Private Limited Company", "One Person Company", "Nidhi Company", "LLP", "Sole Proprietorship"] },
    { title: "Compliance", links: ["Annual Filing", "GST Filing", "ROC Filing", "TDS Filing", "Director KYC"] },
    { title: "Licenses", links: ["Trademark Registration", "FSSAI License", "Import Export Code", "MSME Registration"] },
    { title: "Taxation", links: ["Income Tax Filing", "GST Registration", "TDS/TCS Return Filing", "E-invoicing"] },
    { title: "Legal Drafting", links: ["Agreement Drafting", "Terms & Conditions", "Privacy Policy", "Non-Disclosure Agreement"] },
    { title: "Popular Services", links: ["ROC Compliance", "Startup India Registration", "Legal Notice", "Digital Signature (DSC)"] },
];

// --- REUSABLE COMPONENTS ---

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

const NidhiPlanCard = ({ plan, hoveredPlanId, setHoveredPlanId, selectedPlanId, setSelectedPlanId }) => {

    const isSelected = plan.title === selectedPlanId;
    const isHovered = plan.title === hoveredPlanId;

    const isRecommended = plan.title === "Standard (Recommended)";
    
    const isProminent = isSelected || isHovered || (isRecommended && !selectedPlanId && !hoveredPlanId);
    
    const baseClasses = `relative p-4 sm:p-6 rounded-xl shadow-lg flex flex-col justify-between h-full transition-all duration-300 cursor-pointer`;

    const activeClasses = isProminent 
        ? 'bg-[#E6F2FF] border-2 border-[#2E96FF] scale-[1.03] shadow-2xl'
        : 'bg-white border border-gray-200 hover:shadow-xl hover:scale-[1.02]';

    const handleClick = (e) => {
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

                <h4 className="font-bold text-gray-800 mt-4 sm:mt-6 mb-3 border-t pt-3">Package Inclusions:</h4>
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


// --- SECTION COMPONENTS (NIDHI CONTENT) ---

const NidhiOverviewContent = () => (
    <section id="nidhi-overview-content" className="py-8 sm:py-12 scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">Nidhi Company Registration</h2>
        <p className="text-base sm:text-lg text-gray-700 mb-6 max-w-4xl">
            The **Nidhi Company registration** process, governed by the Nidhi Rules, 2014, and the Companies Act, 2013, outlines a structured framework for entities focused on promoting savings and lending within a member-based model. It involves securing a Digital Signature Certificate (**DSC**) and Director Identification Number (**DIN**), obtaining name approval from the Ministry of Corporate Affairs (**MCA**), and filing key documents like the Memorandum of Association (**MoA**) and Articles of Association (**AoA**) via Form SPICe+ to obtain a Certificate of Incorporation.
        </p>

        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">What is a Nidhi Company?</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 max-w-4xl">
            A Nidhi Company is a specialised type of **non-banking financial company (NBFC)** in India that aims to cultivate savings and financial discipline among its members. It functions by accepting deposits exclusively from its members and providing loans to them, fostering mutual financial growth and community resource pooling. Nidhi Companies are regulated under the Companies Act, 2013, and follow specific guidelines set by the Ministry of Corporate Affairs (MCA).
        </p>

        <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-[#2E96FF] shadow-inner">
            <h3 className="text-xl font-bold text-[#113C6D] mb-3">Post-Registration Compliance Snapshot</h3>
            <p className="text-sm text-gray-700 mb-3">
                Post-registration, Nidhi Companies must comply with RBI regulations, manage deposits, maintain unencumbered term deposits, adhere to deposit and loan limits, and fulfil financial obligations such as filing timely Income Tax Returns, maintaining a current bank account, and submitting half-yearly returns.
            </p>
        </div>
    </section>
);

const NidhiImportanceContent = () => (
    <section id="nidhi-importance-content" className="py-8 sm:py-12 scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Importance of Nidhi Companies in India</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-4xl">
            Nidhi Companies are essential in fostering **financial inclusion** in India, providing savings and credit services, especially to communities with limited access to conventional banking.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-lg text-green-800 mb-2">Financial Inclusion</h4>
                <p className="text-sm text-gray-700">By offering savings accounts, Nidhi Companies bridge the gap between formal banking and underserved areas, particularly in rural and semi-urban regions.</p>
            </div>
            <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-lg text-green-800 mb-2">Loan Access</h4>
                <p className="text-sm text-gray-700">Members can access Business Loans and personal financing at competitive rates, supporting those who might struggle to obtain credit through traditional banks.</p>
            </div>
            <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-lg text-green-800 mb-2">Compliance and Regulation</h4>
                <p className="text-sm text-gray-700">Regulated by the RBI and MCA, Nidhi Companies follow a strict regulatory framework and submit annual financial statements, Income Tax Returns, and Form NDH-1.</p>
            </div>
        </div>
    </section>
);

const NidhiRequirementsContent = () => (
    <section id="nidhi-requirements-content" className="py-8 sm:py-12 scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Legal Framework Governing Nidhi Companies</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-4xl">
            Nidhi companies in India operate under a well-defined legal framework, primarily the **Nidhi Rules, 2014**, the **Companies Act, 2013**, and oversight by the **Ministry of Corporate Affairs (MCA)**.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
            <div className="bg-white p-5 rounded-lg border-t-4 border-indigo-500 shadow-lg">
                <h4 className="text-lg font-bold text-indigo-700 mb-2">Nidhi Rules, 2014</h4>
                <p className="text-sm text-gray-600">The rules provide a comprehensive regulatory framework, defining the scope, purpose, operational guidelines, and financial management standards specifically for Nidhi companies.</p>
            </div>
            <div className="bg-white p-5 rounded-lg border-t-4 border-indigo-500 shadow-lg">
                <h4 className="text-lg font-bold text-indigo-700 mb-2">Companies Act, 2013</h4>
                <p className="text-sm text-gray-600">This act governs the broader aspects like incorporation (MoA/AoA), corporate governance (directors, AGMs), and mandatory compliance (annual returns and financial statements).</p>
            </div>
            <div className="bg-white p-5 rounded-lg border-t-4 border-indigo-500 shadow-lg">
                <h4 className="text-lg font-bold text-indigo-700 mb-2">MCA Oversight</h4>
                <p className="text-sm text-gray-600">The Ministry of Corporate Affairs monitors, enforces compliance, processes incorporation forms (SPICe+), and issues the Certificate of Incorporation.</p>
            </div>
        </div>
    </section>
);

const NidhiOperationContent = () => (
    <section id="nidhi-operation-content" className="py-8 sm:py-12 scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">How Does a Nidhi Company Operate?</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-4xl">
            A Nidhi company operates on the principle of mutual benefit among its members. Here’s a look at how they function:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
                    <Users className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                        <h4 className="font-semibold text-lg text-gray-800">Membership & Deposits</h4>
                        <p className="text-sm text-gray-600">Individuals become members by purchasing shares. Members deposit their savings, which are then used to provide loans to other members, managed conservatively for liquidity.</p>
                    </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
                    <IndianRupee className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                        <h4 className="font-semibold text-lg text-gray-800">Loans and Advances</h4>
                        <p className="text-sm text-gray-600">Loans are provided to members at competitive rates. Terms and conditions are based on company policies and member needs, ensuring mutual growth.</p>
                    </div>
                </div>
            </div>
            <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
                    <ClipboardCheck className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                        <h4 className="font-semibold text-lg text-gray-800">Regulations & Governance</h4>
                        <p className="text-sm text-gray-600">The company adheres to the Companies Act and Nidhi Rules. Governance is via a board of directors elected by members, ensuring decisions align with collective interests.</p>
                    </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
                    <Star className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                        <h4 className="font-semibold text-lg text-gray-800">Profit Sharing</h4>
                        <p className="text-sm text-gray-600">Profits are typically distributed among the members in the form of dividends, proportional to their deposits, encouraging saving habits.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const NidhiFeaturesContent = () => (
    <section id="nidhi-features-content" className="py-8 sm:py-12 scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Features and Financial Regulations</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-4xl">
            Nidhi companies operate under a specific set of financial regulations designed to ensure stability, transparency, and fair practices.
        </p>

        <div className="space-y-8">
            <div>
                <h4 className="text-xl font-bold mb-3 text-gray-800 flex items-center gap-2"><Key className="w-5 h-5 text-[#2E96FF]" /> Accepting Deposits and Deposit Schemes</h4>
                <ul className="space-y-2 text-gray-700 pl-4 border-l-2 border-gray-200">
                    <li className="text-sm">**Member-Only Deposits:** Deposits can only be accepted from members. Non-member deposits are strictly prohibited.</li>
                    <li className="text-sm">**Regulatory Limits:** Companies must comply with the deposit limits set by the Nidhi Rules, 2014.</li>
                </ul>
            </div>

            <div>
                <h4 className="text-xl font-bold mb-3 text-gray-800 flex items-center gap-2"><Layers className="w-5 h-5 text-indigo-500" /> Borrowing and Lending Restrictions</h4>
                <ul className="space-y-2 text-gray-700 pl-4 border-l-2 border-gray-200">
                    <li className="text-sm">**Lending Restrictions:** Loans can only be provided to members, and must be secured by adequate collateral.</li>
                    <li className="text-sm">**Borrowing Restrictions:** Restricted from borrowing from external sources (bonds, debentures, etc.), limiting funding to members' contributions.</li>
                </ul>
            </div>
        </div>
    </section>
);

const NidhiEligibilityContent = () => (
    <section id="nidhi-eligibility-content" className="py-8 sm:py-12 scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Eligibility Criteria & Registration Process</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-4xl">
            To establish a Nidhi company in India, certain criteria must be met to ensure compliance with regulatory standards for shareholders, directors, and capital.
        </p>

        <h4 className="text-xl font-bold mb-3 text-gray-800">Key Eligibility Criteria:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
            {nidhiEligibility.map((req, i) => (
                <RequirementItem key={i} {...req} />
            ))}
        </div>

        <h4 className="text-xl font-bold mb-3 text-gray-800">5-Step Registration Process:</h4>
        <ol className="space-y-4 sm:space-y-5 list-none border-l-2 border-indigo-100 pl-4">
            {nidhiProcess.map((step, i) => (
                <ProcessStep key={i} stepNumber={i + 1} step={step} />
            ))}
        </ol>
    </section>
);


const NidhiFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
    <section id="nidhi-faqs-content" className="py-8 sm:py-12 max-w-5xl mx-auto scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800 text-center">FAQs on Nidhi Company Registration</h3>

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


// --- FOOTER COMPONENTS ---

const FooterColumn = ({ title, links }) => (
    <div>
        <h4 className="font-bold text-sm sm:text-base text-gray-900 mb-3">{title}</h4>
        <ul className="space-y-2">
            {links.map((link, i) => (
                <li key={i}>
                    <a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-[#2E96FF] transition-colors">
                        {link}
                    </a>
                </li>
            ))}
        </ul>
    </div>
);



// --- MAIN COMPONENT ---
export default function NidhiLandingPageDesign() {
    const [activeTab, setActiveTab] = useState(nidhiTabs[0].id);
    const [faqOpen, setFaqOpen] = useState(null);
    const [hoveredPlanId, setHoveredPlanId] = useState(null);

    // Default selected plan is 'Standard (Recommended)'
    const [selectedPlanId, setSelectedPlanId] = useState(nidhiPlans.find(p => p.isRecommended)?.title || null);

    const SCROLL_OFFSET = 120;

    // --- SCROLLSPY IMPLEMENTATION ---
    useEffect(() => {
        const sectionIds = nidhiTabs.map(tab => tab.id);

        const handleScroll = () => {
            let currentActiveTab = sectionIds[0];

            for (let i = 0; i < sectionIds.length; i++) {
                const sectionId = sectionIds[i];
                const section = document.getElementById(sectionId);

                if (section) {
                    const rect = section.getBoundingClientRect();
                    // Check if the section top is above the offset
                    if (rect.top <= SCROLL_OFFSET) {
                        currentActiveTab = sectionId;
                    }
                }
            }
            setActiveTab(currentActiveTab);
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
            {/* === HERO SECTION === */}
            <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">

                    {/* Background Image */}
                    <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
                        <img
                            src={BackgroundImageSrc}
                            alt="Diagonal business graphic"
                            className="absolute top-0 left-0 w-full h-full object-cover"
                        />
                    </div>

                    {/* Content and Form Wrapper */}
                    <div className="relative flex flex-col lg:flex-row items-start pt-10 pb-12 lg:pb-0 z-20">

                        {/* LEFT COLUMN - CONTENT */}
                        <div className="w-full lg:w-3/5 text-black p-4 md:p-6 pb-20 relative z-20">

                            {/* Breadcrumbs */}
                            <p className="text-sm text-gray-700 mb-2">Home &gt; Company Registration &gt; **Nidhi Company Registration**</p>

                            {/* Badge */}
                            <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                                #1 Legal Service Provider in India
                            </div>

                            {/* Heading */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
                                Registration of Nidhi Company
                            </h1>

                            {/* Description */}
                            <div className="space-y-2 mb-6">
                                <p className="flex items-center gap-2 text-gray-800 text-sm">
                                    <span className="w-2 h-2 bg-blue-600 block rounded-full"></span>
                                    Nidhi company registration and incorporation made easy with legal expert help.
                                </p>
                                <p className="flex items-center gap-2 text-gray-800 text-sm">
                                    <span className="w-2 h-2 bg-blue-600 block rounded-full"></span>
                                    Full compliance ensured under the Companies Act, 2013 for your Nidhi company.
                                </p>
                                <p className="flex items-center gap-2 text-gray-800 text-sm">
                                    <span className="w-2 h-2 bg-blue-600 block rounded-full"></span>
                                    Step-by-step expert guidance throughout the Nidhi company registration process.
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4 flex-wrap mb-6">
                                <button className="flex items-center gap-2 bg-[#113C6D] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-indigo-900 transition">
                                    Know About Nidhi Company
                                </button>
                                <button className="flex items-center gap-2 border border-[#113C6D] text-[#113C6D] px-6 py-3 rounded-lg font-semibold hover:bg-[#113C6D] hover:text-white transition">
                                    🧾 View Package
                                </button>
                            </div>
                        </div>

                        {/* RIGHT COLUMN - FORM */}
                        <div className="w-full lg:w-[350px] relative z-30 lg:mt-0 lg:ml-auto mt-[-100px] sm:mt-[-50px]">
                            <div
                                className="w-full p-6 md:p-8 rounded-2xl shadow-xl bg-white"
                                style={{ borderRadius: '24px', border: '1px solid #E0E0E0' }}
                            >
                                <h2 className="text-xl font-semibold mb-6 text-gray-800">Talk to a company expert</h2>
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
                                        Get Started!
                                    </button>
                                    <p className="text-xs text-center font-bold mt-2 text-gray-800">
                                        Plans starting at **₹14,999**
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
                        Right Plan For Your Nidhi Company
                    </h2>
                    <p className="text-sm sm:text-lg text-gray-600 mb-8 sm:mb-10 text-center">
                        Vakilsearch's incorporation experts provide end-to-end guidance for Nidhi Company formation and compliance.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
                        {nidhiPlans.map((plan, i) => (
                            <NidhiPlanCard
                                key={i}
                                plan={plan}
                                hoveredPlanId={hoveredPlanId}
                                setHoveredPlanId={setHoveredPlanId}
                                selectedPlanId={selectedPlanId}
                                setSelectedPlanId={setSelectedPlanId}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* === Main Content Tabs Navigation === */}
            <section className="py-3 sm:py-4 md:py-10 px-4 md:px-8 bg-white border-b border-gray-200 sticky top-0 z-30 shadow-md">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center bg-white rounded-xl w-full text-xs sm:text-sm md:text-base overflow-x-scroll border border-gray-200">
                        {nidhiTabs.map((tab) => (
                            <a
                                href={`#${tab.id}`} 
                                key={tab.id}
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
                    <NidhiOverviewContent />
                    <NidhiImportanceContent />
                    <NidhiRequirementsContent />
                    <NidhiOperationContent />
                    <NidhiFeaturesContent />
                    <NidhiEligibilityContent />
                    <NidhiFAQsContent faqs={nidhiFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
                </div>
            </div>

        </div>
    );
}