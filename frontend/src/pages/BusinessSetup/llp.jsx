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


// --- STATIC DATA DEFINITIONS (LLP Registration Content) ---

const llpTabs = [
    { id: 'llp-overview-content', label: 'Overview' },
    { id: 'llp-requirements-content', label: 'Checklist & Documents' },
    { id: 'llp-process-content', label: 'LLP Process' },
    { id: 'llp-compliance-content', label: 'Annual Filings' },
    { id: 'llp-faqs-content', label: 'FAQs' },
];

const llpPlans = [
    {
        title: "Standard",
        price: "₹1,499",
        originalPrice: "₹1,999",
        discountText: "25% discount",
        description: "Regular processing time with expert assistance.",
        features: [
            "Expert assisted process",
            "Name reserved in 2 - 4 days",
            "DSC in 4 - 7 days",
            "LLP Incorporation form filing in 21 days*",
            "LLP Incorporation Certificate",
            "LLP agreement filing in 14 days (Post Incorporation)",
            "Company PAN+TAN",
            "DIN/DPIN for partners"
        ],
        isRecommended: true, // Standard is recommended based on the source text design
        isPremium: false,
        govtFeeNote: "+ Govt. Fee",
        cashbackText: "Get ₹1000 cashback* on opening a current account.",
    },
    {
        title: "Fastrack",
        price: "₹2,499",
        originalPrice: "₹3,599",
        discountText: "35% discount",
        description: "Expedited application filing for quicker results.",
        features: [
            "Expert assisted process",
            "Name reserved in just 24 hours*",
            "DSC in just 24 hours*",
            "LLP Incorporation form filing in 14 days*",
            "LLP Incorporation Certificate",
            "LLP agreement filing in 7 days (Post Incorporation)",
            "Company PAN+TAN",
            "Digital welcome kit (post-incorporation checklist)",
            "DIN/DPIN for partners"
        ],
        isRecommended: false,
        isPremium: false,
        govtFeeNote: "+ Govt. Fee",
        cashbackText: "Get ₹1000 cashback* on opening a current account.",
    },
    {
        title: "Premium",
        price: "₹10,999",
        originalPrice: "₹21,999",
        discountText: "50% discount",
        description: "Complete solution including LLP incorporation + 1-year annual compliance.",
        features: [
            "Includes Fastrack Incorporation",
            "30-minute call with a senior CA/CS for business planning",
            "Form 8 & 11 filing (One year)",
            "DIR 3 KYC (For 2 partners)",
            "One Year Income Tax filing (Upto turnover of 20 lakhs)",
            "Accounting & Bookeeping (Upto 100 transactions)",
            "Financial statement preparation",
            "Accounting software (1-year license)"
        ],
        isRecommended: false,
        isPremium: true, // Designating this as the premium tier for styling
        govtFeeNote: "+ Govt. Fee",
        cashbackText: "Split payment by 3 with Zolvit Flex", // Using the unique text as the primary callout
    },
    // The source text only shows 3 tiers, so we'll stick to 3.
];

const llpRequirements = [
    { icon: Users, title: "Minimum Two Partners", description: "No limit on the maximum number of partners." },
    { icon: Layers, title: "Designated Partners (DPIN)", description: "At least two designated partners, with one being an Indian Resident." },
    { icon: FileText, title: "No Minimum Capital", description: "There is no requirement for minimum capital contribution to start an LLP." },
    { icon: Home, title: "Registered Office Address", description: "A valid office address in India with utility bill proof and a No Objection Certificate (NOC)." },
    { icon: Briefcase, title: "Digital Signature Certificate (DSC)", description: "Mandatory for all designated partners for e-filing documents." },
    { icon: Trello, title: "Unique LLP Name", description: "The name must be unique and approved by the ROC through the RUN-LLP process." },
];

const llpProcess = [
    "Step 1: Consultation and Planning (with Vakilsearch)",
    "Step 2: Name Reservation (RUN-LLP Filing)",
    "Step 3: Obtain Digital Signature Certificates (DSC) for partners",
    "Step 4: Document Preparation (LLP Agreement Draft)",
    "Step 5: Filing Form 2 (Incorporation Application) with ROC",
    "Step 6: Verification and Approval by ROC",
    "Step 7: Receive Certificate of Incorporation",
    "Step 8: Post-Incorporation Compliance (PAN, TAN, LLP Agreement Filing)",
    "Step 9: Optional Additional Services (e.g., MSME, Trademark)",
];

const llpCompliance = [
    { aspect: "Annual Return of LLP", requirement: "File Form 11 with ROC", frequency: "Annually (by May 30)" },
    { aspect: "Statement of Account & Solvency", requirement: "File Form 8 (Balance Sheet, P&L, etc.)", frequency: "Annually (by Oct 30)" },
    { aspect: "KYC of Designated Partners", requirement: "File DIR-3 KYC (for 2 partners)", frequency: "Annually (by Oct 30)" },
    { aspect: "Audit Requirement", requirement: "Mandatory if Turnover > ₹40 lakhs OR Capital > ₹25 lakhs", frequency: "Annually" },
    { aspect: "LLP Agreement Filing", requirement: "File Form 3 for changes to the LLP Agreement", frequency: "Within 30 days of the event" },
    { aspect: "Taxation", requirement: "File ITR-5 (Taxed as a partnership, not corporate tax)", frequency: "Annually" },
];

const llpFAQs = [
    { q: "What is an LLP and how is it different from a Private Limited Company?", a: "An LLP combines the benefits of a private limited company (limited liability) and a traditional partnership (management flexibility and ease of compliance). It is separate legal entity but is taxed as a partnership, avoiding double taxation." },
    { q: "Who can register an LLP in India?", a: "Any two or more individuals or corporate bodies can be partners. At least two Designated Partners are required, with one being an Indian resident." },
    { q: "Is there any minimum capital required to start an LLP?", a: "No, there is **no minimum capital contribution** requirement for LLP registration, making it highly accessible for startups." },
    { q: "What is a DPIN and why is it required for LLP partners?", a: "DPIN stands for **Designated Partner Identification Number**. It is a unique identification number issued by the MCA mandatory for every designated partner." },
    { q: "How much does it cost to register an LLP in India?", a: "The service fees start at ₹1,499 + Govt. Fees, with final government fees varying based on the state and total contribution." },
    { q: "How do I register an LLP online in India?", a: "The process involves: Name Reservation (RUN-LLP) -> DSC & DPIN acquisition -> Filing Form 2 (Incorporation) -> Filing LLP Agreement (Form 3) with the ROC. Most steps are done electronically on the MCA portal." },
    { q: "Do LLPs have to file annual returns and maintain compliance?", a: "Yes, mandatory annual filings include Form 11 (Annual Return) and Form 8 (Statement of Account & Solvency) with the ROC." },
];



// --- REUSABLE COMPONENTS (Kept the same as they are structural/presentational) ---

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

// --- LLP Plan Card (Modified logic slightly for 'Premium' tier's cashback text) ---
const LlpPlanCard = ({ plan, hoveredPlanId, setHoveredPlanId, selectedPlanId, setSelectedPlanId }) => {

    const isSelected = plan.title === selectedPlanId;
    const isHovered = plan.title === hoveredPlanId;

    const isRecommended = plan.title === "Standard"; // Explicitly setting Standard as recommended
    
    // The plan is 'prominent' if it's explicitly selected OR currently hovered OR it's the 
    // default recommended plan and nothing has been selected or hovered yet.
    const isProminent = isSelected || isHovered || (isRecommended && !selectedPlanId && !hoveredPlanId);
    const isPremiumPlan = plan.isPremium;

    const baseClasses = `relative p-4 sm:p-6 rounded-xl shadow-lg flex flex-col justify-between h-full transition-all duration-300 cursor-pointer ${isPremiumPlan ? 'bg-gray-100 border-2 border-gray-300' : ''}`;

    const activeClasses = isProminent && !isPremiumPlan
        ? 'bg-[#E6F2FF] border-2 border-[#2E96FF] scale-[1.03] shadow-2xl'
        : isProminent && isPremiumPlan
            ? 'bg-gray-200 border-2 border-gray-400 scale-[1.03] shadow-2xl'
            : 'bg-white border border-gray-200 hover:shadow-xl hover:scale-[1.02]';

    const handleClick = (e) => {
        // Only allow selection for the three standard packages
        setSelectedPlanId(plan.title);
    }

    // Determine the badge text
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
                <p className={`text-sm mb-4 ${isPremiumPlan ? 'text-gray-700 font-semibold' : 'text-gray-500'}`}>{plan.description}</p>

                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 mb-4">
                    <span className="text-xl sm:text-3xl font-extrabold text-[#2E96FF]">{plan.price}</span>
                    <span className="text-sm line-through text-gray-400">{plan.originalPrice}</span>
                    <span className="text-sm text-green-600 font-bold">{plan.discountText}</span>
                    {plan.govtFeeNote && <span className="text-xs text-gray-500">{plan.govtFeeNote}</span>}
                </div>

                <div className={`text-sm font-semibold mb-4 ${isPremiumPlan ? 'text-blue-700' : 'text-green-700'}`}>
                    {plan.cashbackText}
                </div>


                <button
                    className={`w-full py-2.5 sm:py-3 font-semibold rounded-lg transition-colors shadow-md ${isPremiumPlan
                        ? 'bg-blue-900 text-white hover:bg-blue-800'
                        : isProminent
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


// --- SECTION COMPONENTS (Updated for LLP Content) ---

const LlpOverviewContent = () => (
    <section id="llp-overview-content" className="py-8 sm:py-12 scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">Overview & Key Features</h2>
        <p className="text-base sm:text-lg text-gray-700 mb-6 max-w-4xl">
            **Limited Liability Partnership (LLP)** registration is popular for startups and small businesses, blending the features of a partnership and a private company. Governed by the **LLP Act, 2008**, it offers **limited liability protection** without requiring minimum capital.
        </p>

        <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-[#2E96FF] shadow-inner">
            <h3 className="text-xl font-bold text-[#113C6D] mb-3">Key Advantages of LLP</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />**Limited Liability:** Partners' personal assets are protected.</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />**Tax Efficiency:** Taxed as a partnership, avoiding double taxation.</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />**Flexible Management:** Easy to structure management through the LLP Agreement.</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />**Minimum Compliance:** Lesser compliance burden compared to a Pvt Ltd Company.</li>
            </ul>
        </div>
    </section>
);

const LlpRequirementsContent = () => (
    <section id="llp-requirements-content" className="py-8 sm:py-12 scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Checklist & Required Documents</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-4xl">
            To register an LLP in India, you must fulfill minimum partner requirements and prepare the necessary identification, address proof, and legal documentation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
            {llpRequirements.map((req, i) => (
                <RequirementItem key={i} {...req} />
            ))}
        </div>

        <h4 className="text-xl font-bold mb-3 text-gray-800">Key Document Requirement Categories:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <Users className="w-6 h-6 text-blue-500 mb-2" />
                <h5 className="font-semibold text-gray-800">Partner Proof</h5>
                <p className="text-sm text-gray-600">PAN Card/Passport, Aadhaar Card, Address Proof (Utility bills & photos).</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <Home className="w-6 h-6 text-blue-500 mb-2" />
                <h5 className="font-semibold text-gray-800">Office Proof</h5>
                <p className="text-sm text-gray-600">Rent agreement/ownership deed, and NOC from the landlord.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <FileText className="w-6 h-6 text-blue-500 mb-2" />
                <h5 className="font-semibold text-gray-800">Legal Documents</h5>
                <p className="text-sm text-gray-600">Drafted LLP Agreement, DSC of partners, and Consent of Partners (Form 9).</p>
            </div>
        </div>
    </section>
);

const LlpProcessContent = () => (
    <section id="llp-process-content" className="py-8 sm:py-12 scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">9 Steps to LLP Registration with Vakilsearch</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-4xl">
            Our streamlined process ensures a quick and compliant registration, from initial planning to post-incorporation support.
        </p>

        <ol className="space-y-4 sm:space-y-5 list-none border-l-2 border-indigo-100 pl-4">
            {llpProcess.map((step, i) => (
                <ProcessStep key={i} stepNumber={i + 1} step={step} />
            ))}
        </ol>
        <div className="mt-6 p-4 text-sm bg-yellow-50 text-yellow-800 rounded-lg border-l-4 border-yellow-500">
            **Note:** The fastest packages target **LLP Incorporation form filing in 14 days** and name/DSC in 24 hours (Fastrack plan).
        </div>
    </section>
);

const LlpComplianceContent = () => (
    <section id="llp-compliance-content" className="py-8 sm:py-12 scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Mandatory Annual Filings (LLP Compliance Calendar)</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-4xl">
            LLPs must adhere to these compliance deadlines, regulated by the Ministry of Corporate Affairs (MCA), to maintain their legal standing.
        </p>

        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aspect</th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance Requirement</th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date (FY-end)</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                    {llpCompliance.map((item, i) => (
                        <tr key={i}>
                            <td className="px-3 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.aspect}</td>
                            <td className="px-3 sm:px-6 py-4 text-gray-700">{item.requirement}</td>
                            <td className="px-3 sm:px-6 py-4 text-gray-700 whitespace-nowrap">{item.frequency}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <p className="mt-6 p-4 text-sm bg-blue-50 text-blue-800 rounded-lg border-l-4 border-blue-500">
            **Important:** Audit is only required if the **turnover exceeds ₹40 lakhs or capital contribution exceeds ₹25 lakhs**.
        </p>
    </section>
);

const LlpFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
    <section id="llp-faqs-content" className="py-8 sm:py-12 max-w-5xl mx-auto scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800 text-center">FAQs on Limited Liability Partnership Registration</h3>

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

// --- FOOTER COMPONENT (Kept the same, only needed to update internal logic for link slicing) ---

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
    // Collect all links into a flat array for display
   
    // Filter down to fit the 7 column layout
    const columnsToDisplay = visibleLinkSections.slice(0, 7);

    return (
        <footer className="bg-gray-50 pt-8 sm:pt-12 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Footer grid: 2 columns on mobile, then 3, then 4, up to 7 on desktop */}
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


// --- MAIN COMPONENT (Updated state and section rendering to use LLP data) ---
export default function LandingPageDesign() {
    const [activeTab, setActiveTab] = useState(llpTabs[0].id);
    const [faqOpen, setFaqOpen] = useState(null);
    const [hoveredPlanId, setHoveredPlanId] = useState(null);

    // Default selected plan is 'Standard'
    const [selectedPlanId, setSelectedPlanId] = useState(llpPlans.find(p => p.title === "Standard")?.title || null);

    const SCROLL_OFFSET = 120;

    // --- SCROLLSPY IMPLEMENTATION ---
    useEffect(() => {
        const sectionIds = llpTabs.map(tab => tab.id);

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
                            <p className="text-sm text-gray-700 mb-2">Home &gt; Company Registration &gt; **LLP Registration**</p>

                            {/* Badge */}
                            <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                                #1 Legal Service Provider in India
                            </div>

                            {/* Heading */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
                                LLP Registration Online: Limited Liability Partnership
                            </h1>

                            {/* Description */}
                            <div className="space-y-2 mb-6">
                                <p className="flex items-center gap-2 text-gray-800 text-sm">
                                    <span className="w-2 h-2 bg-blue-600 block rounded-full"></span>
                                    Complete LLP registration online in just **14 business days** with expert assistance. <span className="italic text-gray-600">T&C apply</span>
                                </p>
                                <p className="flex items-center gap-2 text-gray-800 text-sm">
                                    <span className="w-2 h-2 bg-blue-600 block rounded-full"></span>
                                    Package includes LLP agreement drafting, name approval, and compliance support.
                                </p>
                                <p className="flex items-center gap-2 text-gray-800 text-sm">
                                    <span className="w-2 h-2 bg-blue-600 block rounded-full"></span>
                                    Tailored LLP registration services for startups, professionals, and growing businesses.
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4 flex-wrap mb-6">
                                <button className="flex items-center gap-2 bg-[#113C6D] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-indigo-900 transition">
                                    🎥 Know about LLP registration in 60 sec
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
                                <h2 className="text-xl font-semibold mb-6 text-gray-800">Register your company today</h2>
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
                                    
                                    {/* Whatsapp Toggle (Added based on the LLP source text) */}
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
                                        Get Started
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
                        {llpPlans.map((plan, i) => (
                            <LlpPlanCard
                                key={i}
                                plan={plan}
                                hoveredPlanId={hoveredPlanId}
                                setHoveredPlanId={setHoveredPlanId}
                                selectedPlanId={selectedPlanId}
                                setSelectedPlanId={setSelectedPlanId}
                            />
                        ))}
                    </div>
                    {/* Govt Fee Note (Added based on LLP source text structure) */}
                    <p className="text-xs text-gray-500 mt-6 text-center">
                        **Note:** Government fees for incorporation are extra and it varies from state to state. T&C
                    </p>
                </div>
            </section>

            {/* === Main Content Tabs Navigation === */}
            <section className="py-3 sm:py-4 md:py-10 px-4 md:px-8 bg-white border-b border-gray-200 sticky top-0 z-30 shadow-md">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center bg-white rounded-xl w-full text-xs sm:text-sm md:text-base overflow-x-scroll border border-gray-200">
                        {llpTabs.map((tab) => (
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
                    <LlpOverviewContent />
                    <LlpRequirementsContent />
                    <LlpProcessContent />
                    <LlpComplianceContent />
                    <LlpFAQsContent faqs={llpFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
                </div>
            </div>

        </div>
    );
}