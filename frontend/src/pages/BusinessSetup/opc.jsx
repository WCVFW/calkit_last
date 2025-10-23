import React, { useState, useEffect } from "react";
import {
    ChevronDown,
    Zap,
    Briefcase,
    ArrowRight,
    CheckCircle,
    Star,
    Layers, // Icon for Compliance/Process
    FileText, // Icon for Documents/Requirements
    Trello, // Icon for Package/Plan
    Home, // Icon for Hero/Home
    Users,
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from "@/assets/business.png"


// --- STATIC DATA DEFINITIONS (One Person Company (OPC) Registration Content) ---

const opcTabs = [
    { id: 'opc-overview-content', label: 'Overview' },
    { id: 'opc-eligibility-content', label: 'Eligibility & Documents' },
    { id: 'opc-process-content', label: 'OPC Process' },
    { id: 'opc-compliance-content', label: 'Compliance' },
    { id: 'opc-faqs-content', label: 'FAQs' },
];

const opcPlans = [
    {
        title: "Starter",
        price: "₹999",
        originalPrice: "₹1,499",
        discountText: "₹500 off",
        description: "Perfect for submitting your company application with expert assistance in 14 days.",
        features: [
            "Expert assisted process",
            "Your company name is filed in just 2 - 4 days",
            "DSC in just 4 - 7 days",
            "SPICe+ form filing in 14 days*",
            "Incorporation Certificate in 28 - 35 days",
            "Company PAN+TAN",
            "DIN for directors"
        ],
        isRecommended: false,
        isPremium: false,
        govtFeeNote: "+ Govt. Fee",
        cashbackText: "Unlock partner benefits post company incorporation worth Rs 4 lakhs",
    },
    {
        title: "Standard",
        price: "₹1,499",
        originalPrice: "₹2,999",
        discountText: "50% off",
        description: "Faster application submission with expert assistance in just 7 days.",
        features: [
            "Expert assisted process",
            "Your company name is filed in just 1 - 2 days*",
            "DSC in just 3 - 4 days",
            "SPICe+ form filing in 7 days*",
            "Incorporation Certificate in 14 - 21 days",
            "Company PAN+TAN",
            "DIN for directors",
            "Digital welcome kit"
        ],
        isRecommended: true, // Standard is recommended based on source text
        isPremium: false,
        govtFeeNote: "+ Govt. Fee",
        cashbackText: "Get ₹1000 cashback* upon opening a current account with our partner banks. T&C",
    },
    {
        title: "Pro",
        price: "₹3,499",
        originalPrice: "₹4,999",
        discountText: "30% off",
        description: "Includes fast application submission and trademark filing in 7 days.",
        features: [
            "Includes all Standard features",
            "MSME registration Free 🎉",
            "Expedited Trademark application filing",
            "Incorporation Certificate in 14-21 days",
            "Company PAN+TAN",
            "DIN for directors",
        ],
        isRecommended: false,
        isPremium: false,
        govtFeeNote: "+ Govt. Fee",
        cashbackText: "Get ₹1000 cashback* upon opening a current account with our partner banks. T&C",
    },
];

const opcEligibilityAndDocs = [
    { icon: Users, title: "Single Shareholder & Director", description: "Only one natural person, an Indian citizen and resident, can be the member and director." },
    { icon: Layers, title: "Mandatory Nominee Director", description: "The sole shareholder must nominate a person to assume charge in case of death/disability." },
    { icon: FileText, title: "No Minimum Paid-up Capital", description: "Minimum authorized capital is ₹1 lakh, but no minimum paid-up capital is required." },
    { icon: Briefcase, title: "DIN & DSC Required", description: "Director Identification Number (DIN) and Digital Signature Certificate (DSC) are mandatory for the sole director." },
    { icon: Home, title: "Registered Office Proof", description: "Proof includes Rent Agreement/NOC from owner or utility bills (max 2 months old)." },
    { icon: Trello, title: "MOA & AOA Drafting", description: "Memorandum of Association and Articles of Association must be drafted and filed." },
];

const opcProcess = [
    "Step 1: Consultation & Planning",
    "Step 2: Documentation (Identity, Address, Office Proof)",
    "Step 3: DIN and DSC Application for sole director/nominee",
    "Step 4: Name Approval (RUN-OPC Application)",
    "Step 5: MOA and AOA Drafting",
    "Step 6: Filing Forms INC-32, INC-33, and INC-34 (SPICe+)",
    "Step 7: Obtaining Certificate of Incorporation from ROC",
    "Step 8: PAN and TAN Application",
    "Step 9: Post-Incorporation Support (Compliance, Tax filings)",
];

const opcCompliance = [
    { aspect: "Annual Return", requirement: "File Form MGT-7", frequency: "Annually (Within 60 days of AGM)" },
    { aspect: "Financial Statements", requirement: "File Form AOC-4 (Balance Sheet, P&L, etc.)", frequency: "Annually (Within 180 days of FY end)" },
    { aspect: "Income Tax Return", requirement: "File Company ITR", frequency: "Annually (By September 30th)" },
    { aspect: "Statutory Audit", requirement: "Mandatory audit by a Chartered Accountant", frequency: "Annually" },
    { aspect: "Board Meetings", requirement: "Hold at least one Board Meeting", frequency: "Within every six months" },
    { aspect: "GST Registration", requirement: "Mandatory if annual turnover is above ₹20 lakhs", frequency: "Event-based" },
];

const opcFAQs = [
    { q: "What is a One Person Company (OPC)?", a: "An OPC is a company where a sole individual can start and run a business while enjoying the benefit of limited liability protection, blending the ease of a sole proprietorship with the structure of a company." },
    { q: "Who can register a One Person Company in India?", a: "Only a natural person who is an Indian citizen and a resident of India can be the sole member/shareholder." },
    { q: "What are the benefits of registering an OPC?", a: "Benefits include Limited Liability, Full Control over decisions, simplified annual compliance, perpetual succession (via nominee), and higher credibility for securing loans." },
    { q: "What is the minimum capital required to start an OPC?", a: "Minimum authorized capital is ₹1 lakh, but there is no requirement for minimum paid-up capital." },
    { q: "Is an audit compulsory for an OPC?", a: "Yes, a statutory audit of the financial statements by a Chartered Accountant is mandatory for all OPCs, regardless of turnover." },
    { q: "Can an OPC be converted to a Private Limited Company?", a: "Yes, OPCs are flexible and can be easily converted to other company forms as the business expands." },
    { q: "What documents are required for OPC registration?", a: "Required documents include PAN Card, Identity Proof (Aadhaar, Passport), Address Proof (Utility Bills), Registered Office Proof (NOC, Rent Agreement), MOA, and AOA." },
];


// --- REUSABLE COMPONENTS (Kept the same for consistency) ---

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

// --- OPC Plan Card (Modified from LLP to use OPC data) ---
const OpcPlanCard = ({ plan, hoveredPlanId, setHoveredPlanId, selectedPlanId, setSelectedPlanId }) => {

    const isSelected = plan.title === selectedPlanId;
    const isHovered = plan.title === hoveredPlanId;

    const isRecommended = plan.title === "Standard"; // Standard is recommended
    
    const isProminent = isSelected || isHovered || (isRecommended && !selectedPlanId && !hoveredPlanId);
    const isProPlan = plan.title === "Pro"; // Use this for Pro-specific styling if needed

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
            {(isProminent || isSelected) && badgeText && (
                <div className="absolute top-0 right-0 bg-[#2E96FF] text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                    {badgeText}
                </div>
            )}

            <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-1">{plan.title}</h3>
                <p className={`text-sm mb-4 text-gray-500`}>{plan.description}</p>

                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 mb-4">
                    <span className="text-xl sm:text-3xl font-extrabold text-[#2E96FF]">{plan.price}</span>
                    <span className="text-sm line-through text-gray-400">{plan.originalPrice}</span>
                    <span className="text-sm text-green-600 font-bold">{plan.discountText}</span>
                    {plan.govtFeeNote && <span className="text-xs text-gray-500">{plan.govtFeeNote}</span>}
                </div>
                {plan.title === "Pro" && <span className="text-xs text-gray-500 mb-2 block">EMI option available.</span>}

                <div className={`text-sm font-semibold mb-4 ${isProPlan ? 'text-indigo-700' : 'text-green-700'}`}>
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


// --- SECTION COMPONENTS (Updated for OPC Content) ---

const OpcOverviewContent = () => (
    <section id="opc-overview-content" className="py-8 sm:py-12 scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">Overview & Key Features</h2>
        <p className="text-base sm:text-lg text-gray-700 mb-6 max-w-4xl">
            A **One Person Company (OPC)** is the perfect business type for solo entrepreneurs in India who want the advantages of a registered company coupled with the ease of a single-owner business. It provides **limited liability protection**, shielding personal assets from business liabilities.
        </p>

        <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-[#2E96FF] shadow-inner">
            <h3 className="text-xl font-bold text-[#113C6D] mb-3">Key Features & Privileges of OPC</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />**Single Ownership:** One shareholder/director (Indian citizen & resident).</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />**Limited Liability:** Liability restricted to shares, protecting personal wealth.</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />**Succession Planning:** Mandatory nominee ensures **perpetual succession**.</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />**Simplified Compliance:** Exempt from holding Annual General Meetings (AGMs).</li>
            </ul>
        </div>
    </section>
);

const OpcEligibilityContent = () => (
    <section id="opc-eligibility-content" className="py-8 sm:py-12 scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Eligibility Criteria & Required Documents</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-4xl">
            OPC registration is governed by the Companies Act, 2013, focusing on a single member who is an Indian citizen and resident.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
            {opcEligibilityAndDocs.map((req, i) => (
                <RequirementItem key={i} {...req} />
            ))}
        </div>

        <h4 className="text-xl font-bold mb-3 text-gray-800">Mandatory Document List:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <Users className="w-6 h-6 text-blue-500 mb-2" />
                <h5 className="font-semibold text-gray-800">Identity & Address Proof</h5>
                <p className="text-sm text-gray-600">PAN, Aadhaar/Passport, Utility Bills, and Photos of both the Member and Nominee.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <Home className="w-6 h-6 text-blue-500 mb-2" />
                <h5 className="font-semibold text-gray-800">Office Proof</h5>
                <p className="text-sm text-gray-600">Rent Agreement / Ownership Deed and NOC from the property owner.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <FileText className="w-6 h-6 text-blue-500 mb-2" />
                <h5 className="font-semibold text-gray-800">Legal Documents</h5>
                <p className="text-sm text-gray-600">Drafted **MOA (Memorandum)** and **AOA (Articles of Association)**.</p>
            </div>
        </div>
    </section>
);

const OpcProcessContent = () => (
    <section id="opc-process-content" className="py-8 sm:py-12 scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">9-Step OPC Registration Process</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-4xl">
            The process is handled electronically through the MCA's SPICe+ form, with expert guidance ensuring all necessary steps are completed accurately and on time.
        </p>

        <ol className="space-y-4 sm:space-y-5 list-none border-l-2 border-indigo-100 pl-4">
            {opcProcess.map((step, i) => (
                <ProcessStep key={i} stepNumber={i + 1} step={step} />
            ))}
        </ol>
        <div className="mt-6 p-4 text-sm bg-yellow-50 text-yellow-800 rounded-lg border-l-4 border-yellow-500">
            **Note:** The fastest packages target **SPICe+ form filing in 7 days**, with final Certificate of Incorporation taking 14-21 days, subject to MCA review.
        </div>
    </section>
);

const OpcComplianceContent = () => (
    <section id="opc-compliance-content" className="py-8 sm:py-12 scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Mandatory Annual Compliances & Due Dates</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-4xl">
            While OPCs have fewer requirements than private limited companies, adherence to these annual filings under the Companies Act, 2013, is mandatory to maintain legal status and avoid penalties.
        </p>

        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Particular</th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requirement/Form</th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                    {opcCompliance.map((item, i) => (
                        <tr key={i}>
                            <td className="px-3 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.aspect}</td>
                            <td className="px-3 sm:px-6 py-4 text-gray-700">{item.requirement}</td>
                            <td className="px-3 sm:px-6 py-4 text-gray-700 whitespace-nowrap">{item.frequency}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="mt-6 p-4 text-sm bg-red-50 text-red-800 rounded-lg border-l-4 border-red-500">
            **Legal Note:** Repeated non-compliance can result in heavy fines, penalties, and even director disqualification. A **Statutory Audit is compulsory** for all OPCs.
        </div>
    </section>
);

const OpcFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
    <section id="opc-faqs-content" className="py-8 sm:py-12 max-w-5xl mx-auto scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800 text-center">FAQs on One Person Company Registration</h3>

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

// --- FOOTER COMPONENT (Re-used structure, simplified for self-containment) ---

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

const Footer = () => {
    
    // Filter down to fit the 7 column layout
    const columnsToDisplay = visibleLinkSections.slice(0, 7);

    return (
        <footer className="bg-gray-50 pt-8 sm:pt-12 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Footer grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 sm:gap-8 pb-8 sm:pb-10">
                    {columnsToDisplay.map((section, i) => (
                        <FooterColumn key={i} title={section.title} links={section.links} />
                    ))}
                </div>

                <div className="border-t pt-4 sm:pt-6 pb-4 sm:pb-6 text-xs text-gray-500 space-y-3">
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                        {['About Us', 'Media', 'Press Release', 'Contact Us', 'Partner with us', 'Satisfaction Guarantee', 'Article', 'News', 'Sitemap', 'Refer a friend'].map(link => (
                            <a href="#" key={link} className={`hover:underline ${link === 'Refer a friend' ? 'text-[#2E96FF] font-semibold' : ''}`}>{link}</a>
                        ))}
                    </div>

                    <p>By continuing past this page, you agree to our <a href="#" className="hover:underline text-gray-700">Terms of Service</a>, <a href="#" className="hover:underline text-gray-700">Cookie Policy</a>, <a href="#" className="hover:underline text-gray-700">Privacy Policy</a> and <a href="#" className="hover:underline text-gray-700">Refund Policy</a> © 2024 - Uber9 Business Process Services Private Limited. All rights reserved.</p>

                    <p>Uber9 Business Process Services Private Limited, CIN - U74900TN2014PTC098414, GSTIN - 33AABCU7650C1ZM, Registered Office Address - F-97, Newry Shreya Apartments Anna Nagar East, Chennai, Tamil Nadu 600102, India.</p>

                    <p>Please note that we are a facilitating platform enabling access to reliable professionals. We are not a law firm and do not provide legal services ourselves. The information on this website is for the purpose of knowledge only and should not be relied upon as legal advice or opinion.</p>
                </div>
            </div>
        </footer>
    );
};


// --- MAIN COMPONENT (Updated state and section rendering to use OPC data) ---
export default function LandingPageDesign() {
    const [activeTab, setActiveTab] = useState(opcTabs[0].id);
    const [faqOpen, setFaqOpen] = useState(null);
    const [hoveredPlanId, setHoveredPlanId] = useState(null);

    // Default selected plan is 'Standard'
    const [selectedPlanId, setSelectedPlanId] = useState(opcPlans.find(p => p.isRecommended)?.title || null);

    const SCROLL_OFFSET = 120;

    // --- SCROLLSPY IMPLEMENTATION ---
    useEffect(() => {
        const sectionIds = opcTabs.map(tab => tab.id);

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

            // Update state only if it actually changes to prevent unnecessary re-renders
            setActiveTab(prevActiveTab => {
                if (prevActiveTab !== currentActiveTab) {
                    return currentActiveTab;
                }
                return prevActiveTab;
            });
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check in case the user loads the page already scrolled
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
                            <p className="text-sm text-gray-700 mb-2">Home &gt; Company Registration &gt; **One Person Company (OPC) Registration**</p>

                            {/* Badge */}
                            <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                                #1 Legal Service Provider in India
                            </div>

                            {/* Heading */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
                                One Person Company (OPC) Registration Online – Starting @ ₹999
                            </h1>

                            {/* Description */}
                            <div className="space-y-2 mb-6">
                                <p className="flex items-center gap-2 text-gray-800 text-sm">
                                    <span className="w-2 h-2 bg-blue-600 block rounded-full"></span>
                                    Expert-assisted OPC registration online in just **7 business days**. <span className="italic text-gray-600">T&C apply</span>
                                </p>
                                <p className="flex items-center gap-2 text-gray-800 text-sm">
                                    <span className="w-2 h-2 bg-blue-600 block rounded-full"></span>
                                    Complete name approval, DSC, DIN allotment, PAN, TAN, and filing handled.
                                </p>
                                <p className="flex items-center gap-2 text-gray-800 text-sm">
                                    <span className="w-2 h-2 bg-blue-600 block rounded-full"></span>
                                    Ongoing support for annual compliance, financial statements, and statutory audits.
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4 flex-wrap mb-6">
                                <button className="flex items-center gap-2 bg-[#113C6D] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-indigo-900 transition">
                                    🎥 Complete guide on One Person Company Registration
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
                                <h2 className="text-xl font-semibold mb-6 text-gray-800">Register Your OPC Today</h2>
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
                                        Get Expert Help Now
                                    </button>
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
                        Right Plan for Your Business
                    </h2>
                    <p className="text-sm sm:text-lg text-gray-600 mb-8 sm:mb-10 text-center">
                        Vakilsearch's incorporation experts register over 1500+ companies every month.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
                        {opcPlans.map((plan, i) => (
                            <OpcPlanCard
                                key={i}
                                plan={plan}
                                hoveredPlanId={hoveredPlanId}
                                setHoveredPlanId={setHoveredPlanId}
                                selectedPlanId={selectedPlanId}
                                setSelectedPlanId={setSelectedPlanId}
                            />
                        ))}
                    </div>
                    {/* Govt Fee Note (Based on the OPC source text structure) */}
                    <p className="text-xs text-gray-500 mt-6 text-center">
                        **Note:** Approval is based on MCA review. We’ll do our best to ensure smooth processing. T&C
                    </p>
                </div>
            </section>

            {/* === Main Content Tabs Navigation === */}
            <section className="py-3 sm:py-4 md:py-10 px-4 md:px-8 bg-white border-b border-gray-200 sticky top-0 z-30 shadow-md">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center bg-white rounded-xl w-full text-xs sm:text-sm md:text-base overflow-x-scroll border border-gray-200">
                        {opcTabs.map((tab) => (
                            <a
                                href={`#${tab.id}`} 
                                key={tab.id}
                                className={`flex flex-col flex-shrink-0 min-w-[100px] sm:min-w-[150px] py-3 sm:py-4 px-2 text-center font-bold cursor-pointer transition-all ${activeTab === tab.id ? 'bg-[#E6F2FF] border-b-4 border-[#2E96FF] text-[#2E96FF]' : 'text-gray-700 hover:bg-gray-50'}`}
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
                    <OpcOverviewContent />
                    <OpcEligibilityContent />
                    <OpcProcessContent />
                    <OpcComplianceContent />
                    <OpcFAQsContent faqs={opcFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
                </div>
            </div>

        </div>
    );
}