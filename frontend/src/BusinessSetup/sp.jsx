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


// --- STATIC DATA DEFINITIONS (Sole Proprietorship Registration Content) ---

const spTabs = [
    { id: 'sp-overview-content', label: 'Overview' },
    { id: 'sp-advantages-content', label: 'Advantages' },
    { id: 'sp-eligibility-content', label: 'Checklist & Eligibility' },
    { id: 'sp-process-content', label: 'Process & Fees' },
    { id: 'sp-tax-content', label: 'Tax Implications' },
    { id: 'sp-faqs-content', label: 'FAQs' },
];

const spPlans = [
    {
        title: "Starter/Lite",
        price: "₹499",
        originalPrice: "₹999",
        discountText: "50% off",
        description: "Ideal for initiating company registration.",
        features: [
            "Expert assisted process",
            "GST or MSME registration (Anyone)",
        ],
        isRecommended: false,
        govtFeeNote: null,
        cashbackText: "Recommended Plan", // Using this field for the Recommended text in the pricing card
    },
    {
        title: "Standard",
        price: "₹3,499",
        originalPrice: "₹4,999",
        discountText: "30% off",
        description: "Perfect for registration and tax filings.",
        features: [
            "Expert assisted process",
            "GST registration",
            "MSME registration (Udyam)",
            "GST filing for one financial year (upto 300 transactions)",
        ],
        isRecommended: true, // Standard is explicitly set as recommended based on the source text design
        govtFeeNote: null,
        cashbackText: "EMI option available.",
    },
    {
        title: "Premium",
        price: "₹5,999",
        originalPrice: "₹8,260",
        discountText: "35% off",
        description: "Perfect for registration and complete tax filings support.",
        features: [
            "Expert assisted process",
            "GST registration",
            "MSME registration (Udyam)",
            "GST filing for one financial year (upto 500 transactions)",
            "ITR filing",
        ],
        isRecommended: false,
        govtFeeNote: null,
        cashbackText: "EMI option available.",
    },
];

const spEligibility = [
    { icon: Users, title: "Age & Citizenship", description: "Applicant must be above 18 years of age and an Indian Citizen." },
    { icon: Briefcase, title: "Legal Capacity", description: "The applicant should have the legal capacity to enter into a contract and not be bankrupt/convicted." },
    { icon: FileText, title: "Unique Business Name", description: "The business should have a unique name that was not registered previously." },
    { icon: Layers, title: "Lawful Activity", description: "The purpose of the business must be clearly outlined and be a lawful activity." },
];

const spProcess = [
    "Step 1: Register Your Business Name (Consult experts)",
    "Step 2: Get your PAN, GST, and MSME Registration Done",
    "Step 3: Obtain Shop and Establishment Act License (File documentation)",
    "Step 4: Open a Current Account (Instant zero-balance account assistance)",
];

const spFees = [
    { component: "GST Registration", cost: "Free (Government portal)", remarks: "Mandatory if turnover exceeds ₹40 lakhs" },
    { component: "MSME (Udyam) Registration", cost: "Free", remarks: "Optional but beneficial for small businesses" },
    { component: "Shop & Establishment License", cost: "₹1,000 – ₹5,000", remarks: "Varies by state and business size" },
    { component: "CA or Consultant Charges (Vakilsearch)", cost: "₹499 - ₹5,999", remarks: "Depends on the plan chosen for end-to-end service" },
    { component: "PAN Application (if new)", cost: "₹110", remarks: "One-time fee through NSDL or UTIITSL" },
];

const spTaxImplications = [
    { aspect: "Income Tax Filing", detail: "Owner files personal ITR-3/ITR-4, reporting business income/costs directly.", frequency: "Annually" },
    { aspect: "PAN Usage", detail: "Proprietor's personal PAN is used for all business tax filings.", frequency: "Mandatory" },
    { aspect: "GST Registration", detail: "Mandatory if turnover exceeds ₹20/40 lakh threshold (based on state/goods/services).", frequency: "Event-based" },
    { aspect: "GST Returns", detail: "File monthly/quarterly returns based on scheme opted.", frequency: "Monthly/Quarterly" },
    { aspect: "TDS Returns", detail: "Must file quarterly TDS returns if proprietorship has employees or large transactions.", frequency: "Quarterly (if applicable)" },
];

const spFAQs = [
    { q: "What is sole proprietorship registration?", a: "It is the process of legally establishing a business owned and operated by a single individual. It is the simplest business structure with no legal distinction between the owner and the business." },
    { q: "What is the cost of registering a sole proprietorship firm?", a: "The government registration fees for basic requirements like GST/MSME are often free. Professional assistance (Vakilsearch) starts at ₹499 + licensing fees which vary by state." },
    { q: "Is GST registration required for a sole proprietorship firm?", a: "Yes, if the annual turnover exceeds ₹20 lakh (services) or ₹40 lakh (goods) in most states. It is optional otherwise." },
    { q: "Should I use a personal bank account or a business account for my sole proprietorship?", a: "While legally allowed to use a personal account, it is highly recommended to open a separate current account for the business to maintain clear records and establish credibility." },
    { q: "Do I need a business license to operate a sole proprietorship firm in India?", a: "Yes, you typically need the **Shop and Establishment Act License** and sometimes a Trade License or professional licenses (e.g., FSSAI) depending on the nature and location of the business." },
    { q: "Can a sole proprietorship be converted into a private limited company?", a: "Yes, as the business grows and needs limited liability protection or better access to funding, it can be converted into a Private Limited Company or an LLP." },
    { q: "What are the liabilities of a sole proprietor if the business fails?", a: "The owner bears **unlimited liability**, meaning their personal assets are at risk to cover all business debts and liabilities." },
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

// --- SP Plan Card (Modified logic to match the new pricing structure) ---
const SpPlanCard = ({ plan, hoveredPlanId, setHoveredPlanId, selectedPlanId, setSelectedPlanId }) => {

    const isSelected = plan.title === selectedPlanId;
    const isHovered = plan.title === hoveredPlanId;

    const isRecommended = plan.title === "Standard"; // Standard is recommended
    const isLite = plan.title === "Starter/Lite";
    
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
                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-1">{plan.title}</h3>
                <p className={`text-sm mb-4 text-gray-500`}>{plan.description}</p>

                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 mb-4">
                    <span className="text-xl sm:text-3xl font-extrabold text-[#2E96FF]">{plan.price}</span>
                    <span className="text-sm line-through text-gray-400">{plan.originalPrice}</span>
                    <span className="text-sm text-green-600 font-bold">{plan.discountText}</span>
                    {plan.govtFeeNote && <span className="text-xs text-gray-500">{plan.govtFeeNote}</span>}
                </div>
                {/* EMI option text is only for Standard and Premium */}
                {(!isLite) && <span className="text-xs text-gray-500 mb-2 block">EMI option available.</span>}

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


// --- SECTION COMPONENTS (Updated for Sole Proprietorship Content) ---

const SpOverviewContent = () => (
    <section id="sp-overview-content" className="py-8 sm:py-12 scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">Overview: Simplest Business Structure</h2>
        <p className="text-base sm:text-lg text-gray-700 mb-6 max-w-4xl">
            A **Sole Proprietorship firm** is the simplest and most popular business structure in India, ideal for individual entrepreneurs and small businesses looking for a low-cost setup. Crucially, there is **no legal distinction between the owner and the business**, meaning all profits, losses, and **liabilities directly affect the proprietor.**
        </p>

        <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-[#2E96FF] shadow-inner">
            <h3 className="text-xl font-bold text-[#113C6D] mb-3">Key Characteristics</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />**Single Owner:** Full control over operations and quick decision-making.</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />**Unlimited Liability:** Personal assets are **at risk** in case of business debts.</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />**No Separate Entity:** The business and owner are treated as one under law.</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />**Low Compliance:** Fewer complex legal formalities required for establishment.</li>
            </ul>
        </div>
    </section>
);

const SpAdvantagesContent = () => (
    <section id="sp-advantages-content" className="py-8 sm:py-12 scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Advantages & Considerations</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-4xl">
            This structure is best suited for low-risk ventures, freelancers, and small local traders who prioritize simplicity and direct control.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-lg text-green-800 mb-2">Easy to Start & Control</h4>
                <p className="text-sm text-gray-700">Inexpensive setup cost, full ownership, and the ability to make instant decisions without external approvals.</p>
            </div>
            <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-lg text-green-800 mb-2">Tax Simplicity</h4>
                <p className="text-sm text-gray-700">Business income is taxed as individual income, which can result in lower tax liability and simpler personal tax filings (ITR-3/4).</p>
            </div>
            <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-lg text-green-800 mb-2">Direct Customer Trust</h4>
                <p className="text-sm text-gray-700">Enables close, personalized client relationships, especially beneficial for service businesses and local shops.</p>
            </div>
        </div>
        
        <h4 className="text-xl font-bold text-red-700 mt-8 mb-4">Limitations to Consider</h4>
        <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />**Limited Funding:** May struggle to raise capital due to lack of a formal corporate structure.</li>
            <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />**No Continuity:** The business may cease to exist upon the death or incapacity of the owner.</li>
            <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />**Unlimited Liability:** Personal assets are exposed to business debts and financial risks.</li>
        </ul>
    </section>
);

const SpEligibilityContent = () => (
    <section id="sp-eligibility-content" className="py-8 sm:py-12 scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Eligibility & Compliance Checklist</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-4xl">
            While establishment is informal, certain basic legal criteria and operational registrations are required for a Sole Proprietorship in India.
        </p>

        <h4 className="text-xl font-bold mb-3 text-gray-800">Eligibility Criteria:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
            {spEligibility.map((req, i) => (
                <RequirementItem key={i} {...req} />
            ))}
        </div>

        <h4 className="text-xl font-bold mb-3 text-gray-800">Key Registration Checklist:</h4>
        <div className="space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-1" />Open a Business Bank Account.</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-1" />MSME/Udyam Registration (Recommended).</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-1" />GST Registration (If Turnover Threshold is met).</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-1" />Shop & Establishment Act License.</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-1" />FSSAI License or Trade License (If applicable).</li>
            </ul>
        </div>
    </section>
);

const SpProcessContent = () => (
    <section id="sp-process-content" className="py-8 sm:py-12 scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Registration Process & Typical Fees</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-4xl">
            Vakilsearch provides end-to-end assistance for the necessary operational and tax registrations required to legitimize your Sole Proprietorship.
        </p>

        <h4 className="text-xl font-bold mb-3 text-gray-800">4-Step Registration Process:</h4>
        <ol className="space-y-4 sm:space-y-5 list-none border-l-2 border-indigo-100 pl-4 mb-10">
            {spProcess.map((step, i) => (
                <ProcessStep key={i} stepNumber={i + 1} step={step} />
            ))}
        </ol>

        <h4 className="text-xl font-bold mb-3 text-gray-800">Registration Fee Breakdown:</h4>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Component</th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approximate Fees (INR)</th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                    {spFees.map((item, i) => (
                        <tr key={i}>
                            <td className="px-3 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.component}</td>
                            <td className="px-3 sm:px-6 py-4 text-gray-700">{item.cost}</td>
                            <td className="px-3 sm:px-6 py-4 text-gray-700">{item.remarks}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="mt-6 p-4 text-sm bg-yellow-50 text-yellow-800 rounded-lg border-l-4 border-yellow-500">
            **Quick Fact:** Sole Proprietorship registration process is generally completed quickly, but obtaining required licenses (like Shop & Establishment) is state-dependent.
        </div>
    </section>
);

const SpTaxContent = () => (
    <section id="sp-tax-content" className="py-8 sm:py-12 scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Compliance and Tax Requirements</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-4xl">
            Since the owner and business are one entity, tax implications and filings are tied directly to the proprietor's personal income.
        </p>

        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aspect</th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requirement/Form</th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                    {spTaxImplications.map((item, i) => (
                        <tr key={i}>
                            <td className="px-3 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.aspect}</td>
                            <td className="px-3 sm:px-6 py-4 text-gray-700">{item.detail}</td>
                            <td className="px-3 sm:px-6 py-4 text-gray-700 whitespace-nowrap">{item.frequency}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="mt-6 p-4 text-sm bg-indigo-50 text-indigo-800 rounded-lg border-l-4 border-indigo-500">
            **Note:** The tax rate is the same as the owner's personal income tax slab. **Self-Employment Tax** (equivalent to social security/Medicare) must also be filed.
        </div>
    </section>
);

const SpFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
    <section id="sp-faqs-content" className="py-8 sm:py-12 max-w-5xl mx-auto scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800 text-center">FAQs on Sole Proprietorship Registration</h3>

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

// --- FOOTER COMPONENT (Re-used structure, consistent across templates) ---

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


// --- MAIN COMPONENT (Updated state and section rendering to use Sole Proprietorship data) ---
export default function LandingPageDesign() {
    const [activeTab, setActiveTab] = useState(spTabs[0].id);
    const [faqOpen, setFaqOpen] = useState(null);
    const [hoveredPlanId, setHoveredPlanId] = useState(null);

    // Default selected plan is 'Standard'
    const [selectedPlanId, setSelectedPlanId] = useState(spPlans.find(p => p.isRecommended)?.title || null);

    const SCROLL_OFFSET = 120;

    // --- SCROLLSPY IMPLEMENTATION ---
    useEffect(() => {
        const sectionIds = spTabs.map(tab => tab.id);

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
                            <p className="text-sm text-gray-700 mb-2">Home &gt; Company Registration &gt; **Sole Proprietorship Registration**</p>

                            {/* Badge */}
                            <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                                #1 Legal Service Provider in India
                            </div>

                            {/* Heading */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
                                Sole Proprietorship Registration Online
                            </h1>

                            {/* Description */}
                            <div className="space-y-2 mb-6">
                                <p className="flex items-center gap-2 text-gray-800 text-sm">
                                    <span className="w-2 h-2 bg-blue-600 block rounded-full"></span>
                                    Expert assisted Sole Proprietorship Registration starting at only **₹499**. <span className="italic text-gray-600">T&C apply</span>
                                </p>
                                <p className="flex items-center gap-2 text-gray-800 text-sm">
                                    <span className="w-2 h-2 bg-blue-600 block rounded-full"></span>
                                    Complete PAN, MSME (Udyam), and GST registration for seamless legal compliance.
                                </p>
                                <p className="flex items-center gap-2 text-gray-800 text-sm">
                                    <span className="w-2 h-2 bg-blue-600 block rounded-full"></span>
                                    Trusted by over 5,00,000 entrepreneurs nationwide for fast and reliable registration.
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4 flex-wrap mb-6">
                                <button className="flex items-center gap-2 bg-[#113C6D] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-indigo-900 transition">
                                    🎥 Watch: How Sole Proprietorship Works
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
                                <h2 className="text-xl font-semibold mb-6 text-gray-800">Register Your Proprietorship Firm Today</h2>
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
                                    
                                    {/* Whatsapp Toggle (Kept for consistency, even if not explicitly shown next to the button) */}
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
                                        Start Registration Now
                                    </button>
                                    <p className="text-xs text-center font-bold mt-2 text-gray-800">
                                        Plans starting at <span className="line-through text-red-400">₹999</span> <span className="text-red-600">₹499</span> (50% off)
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
                        Right Plan For Your Business
                    </h2>
                    <p className="text-sm sm:text-lg text-gray-600 mb-8 sm:mb-10 text-center">
                        Vakilsearch's incorporation experts register over 1500 companies every month.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
                        {spPlans.map((plan, i) => (
                            <SpPlanCard
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
                        {spTabs.map((tab) => (
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
                    <SpOverviewContent />
                    <SpAdvantagesContent />
                    <SpEligibilityContent />
                    <SpProcessContent />
                    <SpTaxContent />
                    <SpFAQsContent faqs={spFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
                </div>
            </div>
        </div>
    );
}