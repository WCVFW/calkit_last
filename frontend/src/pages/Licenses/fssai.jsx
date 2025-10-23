import React, { useState, useEffect } from "react";
// axios is kept for convention, though not used in frontend logic
import axios from "axios";
import {
    ChevronDown,
    Zap, // For Efficiency/Trust
    Briefcase, // For Business/Legal Compliance
    ArrowRight,
    Star,
    CheckCircle, // For Checklist/Compliance/Benefits
    FileText, // For document/Form A or B
    Scale, // For Regulation/Food Safety/Penalties
    Handshake, // For Consumer Trust/Partnerships
    TrendingUp, // For Business Expansion/Growth
    Users, // For Operators/Public Health
    DollarSign, // For Fees/Finance/Penalties
    Clock, // For Fast Filing/Renewal
    Landmark, // For FSSAI/Central Authority
    MapPin,
    Lightbulb // For Business Premises/Location
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from '../../assets/business.png'; // Reusing a general business image

// --- FSSAI REGISTRATION STATIC DATA DEFINITIONS ---

const fssaiTabs = [
    { id: 'fssai-overview-content', label: 'Overview' },
    { id: 'fssai-eligibility-content', label: 'Eligibility' },
    { id: 'fssai-benefits-content', label: 'Benefits' },
    { id: 'fssai-documents-content', label: 'Documents' },
    { id: 'fssai-process-content', label: 'Process' },
    { id: 'fssai-fees-renewal', label: 'Fees & Renewal' },
    { id: 'fssai-why-vakilsearch', label: 'Why Vakilsearch' },
    { id: 'fssai-faqs-content', label: 'FAQs' },
];

const fssaiEligibility = [
    { title: "FSSAI Basic Registration", turnover: "Upto ₹12 lakhs per annum", criteria: "Small-scale or petty food business operators, home-based entrepreneurs, small vendors.", icon: Handshake },
    { title: "FSSAI State License", turnover: "₹12 lakhs to ₹20 crores per annum", criteria: "Medium-sized food businesses, mid-level manufacturers, processors, restaurants, and caterers operating within a single state.", icon: Briefcase },
    { title: "FSSAI Central License", turnover: "More than ₹20 crores per annum or interstate operations", criteria: "Large food businesses, import/export, multi-state operations, or suppliers to government institutions (railways, airports).", icon: Landmark },
];

const fssaiChecklist = [
    "Valid Documents: Ensure you have government-issued identity proof, address proof of the business, and passport-sized photographs of the applicant and key personnel.",
    "Food Business Type: Identify the nature of your food business (manufacturing, retail, catering, storage, distribution, or home-based operation).",
    "Turnover Bracket: Know your annual turnover to determine the correct license type (Basic, State, or Central).",
    "Business Address: Have a fixed and verifiable business location (food premises), which is essential for license issuance.",
    "FSSAI Compliance Practices: Be aware of and implement food safety and hygiene practices as per FSSAI guidelines.",
];

const fssaiBenefits = [
    { title: "Legal Recognition", icon: Scale, detail: "Grants official authorization to operate, ensuring compliance with food safety laws and avoiding legal penalties." },
    { title: "Business Expansion", icon: TrendingUp, detail: "Facilitates smoother entry into new markets, retail outlets, and partnerships by proving adherence to safety standards." },
    { title: "FSSAI Logo Use", icon: Zap, detail: "Allows you to display the trusted FSSAI logo on your products, enhancing brand credibility and consumer confidence." },
    { title: "Consumer Trust", icon: Handshake, detail: "Builds customer assurance by signaling that your products meet rigorous safety and quality benchmarks." },
    { title: "Easier Access to Finance", icon: DollarSign, detail: "Helps in securing loans, funding, and investor interest as financial institutions prefer licensed businesses." },
];

const fssaiDocuments = [
    { title: "Photo ID Proof", detail: "Aadhaar card, PAN card, passport, or voter ID of the applicant.", icon: Users },
    { title: "Business Registration Proof", detail: "Certificate of incorporation, partnership deed, or other document proving the business’s legal existence.", icon: Briefcase },
    { title: "Address Proof", detail: "Rent agreement, utility bills, or property ownership documents for the business premises.", icon: MapPin },
    { title: "Food Safety Plan (FSMS)", detail: "A document outlining food safety management practices (required mainly for certain license types).", icon: FileText },
    { title: "List of Food Products/Category", detail: "Detailed list of all food products and categories being handled.", icon: FileText },
    { title: "NOC from Municipal Corporation", detail: "No-objection Certificate from the local authority (if applicable).", icon: Landmark },
];

const fssaiRegistrationProcess = [
    "Choose the Appropriate License Type: Determine Basic Registration, State License, or Central License based on your turnover, scale, and reach.",
    "Prepare Required Documents: Gather all necessary identification, business legitimacy, and premises proof documents.",
    "Submit Application (Form A or Form B): Fill and submit Form A for Basic Registration or Form B for State/Central License applications.",
    "Pay the Government Fees: Complete the payment online. The fee varies according to the license type and validity period (1 to 5 years).",
    "Verification and Inspection: For State and Central Licenses, the concerned authority may conduct a physical inspection of your premises within 7–15 working days.",
    "Receive FSSAI Registration Certificate: Once approved, you will receive your FSSAI registration/license certificate digitally (typically within 7–30 working days).",
];

const fssaiPenalties = [
    { title: "Food quality not up to standard", fine: "₹2 Lakh (Petty manufacturer – ₹25,000/-)", icon: Scale },
    { title: "Sub-standard food", fine: "₹5 Lakh", icon: Scale },
    { title: "Misbranded Food", fine: "₹3 Lakh", icon: Scale },
    { title: "False description/deceptive advertising", fine: "₹10 Lakh", icon: Scale },
    { title: "Disregard for the food safety officer's instruction", fine: "₹2 Lakh", icon: Scale },
    { title: "Unhygienic processing or manufacture", fine: "₹1 Lakh", icon: Scale },
];

const fssaiRenewalBenefits = [
    { title: "Continuity of Business", detail: "Avoid any disruption in your food business operations by maintaining a valid license at all times.", icon: Clock },
    { title: "Avoiding Fines", detail: "Prevent penalties and legal action that may arise from operating with an expired FSSAI license.", icon: DollarSign },
    { title: "Maintaining Customer Trust", detail: "Show your commitment to food safety and quality by keeping your license up to date, which builds confidence among consumers.", icon: Zap },
];

const fssaiWhyVakilsearch = [
    { title: "End-to-End Support", detail: "From document preparation to final license delivery, we handle every step of the FSSAI registration process.", icon: Briefcase },
    { title: "Expert Guidance", detail: "Team of experienced FSSAI consultants ensures you receive accurate advice tailored to your specific business type and requirements.", icon: Lightbulb },
    { title: "Quick Turnaround", detail: "Offers one of the fastest FSSAI registration services, helping you get your license without unnecessary delays.", icon: Clock },
    { title: "Affordable Pricing", detail: "Top-notch services at competitive prices, making professional legal support accessible for all business sizes.", icon: DollarSign },
];

const fssaiFAQs = [
    { q: "What is FSSAI Registration?", a: "FSSAI registration is a basic license requirement set by the Food Safety and Standards Authority of India for all food business operators (FBOs) to ensure safe and hygienic food production, storage, and distribution." },
    { q: "Is FSSAI registration mandatory?", a: "Yes, FSSAI registration or license is mandatory for any individual or entity involved in the production, processing, packaging, distribution, or sale of food in India under the Food Safety and Standards Act, 2006." },
    { q: "Which are the three types of FSSAI license?", a: "The three types are: **Basic Registration** (Turnover up to ₹12 lakhs), **State License** (Turnover ₹12 lakhs to ₹20 crores), and **Central License** (Turnover > ₹20 crores or interstate operations)." },
    { q: "How to do FSSAI registration online?", a: "The process involves checking eligibility, gathering documents, submitting Form A (Basic) or Form B (State/Central) on the FSSAI portal, paying the fee, and awaiting verification/inspection." },
    { q: "What is the turnover limit for a food license?", a: "The turnover limit determines the license type: Basic (up to ₹12 lakhs), State (up to ₹20 crores), and Central (above ₹20 crores or interstate operations)." },
    { q: "Is GST compulsory for a FSSAI license?", a: "GST registration is not compulsory for FSSAI Basic Registration. However, it is generally required for State and Central licenses as their turnover thresholds usually exceed the GST registration limit." },
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

const LicenseTypeBox = ({ title, turnover, criteria, icon: Icon }) => (
    <div className="p-5 bg-white rounded-xl shadow-lg border border-gray-200">
        <Icon className="w-6 h-6 text-amber-500 mb-2" />
        <h4 className="font-bold text-lg text-gray-800 mb-1">{title}</h4>
        <p className="text-sm text-gray-600 font-semibold mb-2">Turnover: {turnover}</p>
        <p className="text-sm text-gray-700">{criteria}</p>
    </div>
);


// --- TAB CONTENT COMPONENTS (FSSAI Registration Content) ---

const FSSAIOverviewContent = () => (
    <section id="fssai-overview-content" className="py-12 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">FSSAI Registration and Food License - Overview</h2>
        <p className="text-lg text-gray-700 mb-4 max-w-4xl">
            Every food business in India, from small vendors to large manufacturers, is legally required to complete **FSSAI Registration online** and obtain a food license to ensure food safety and consumer trust.
        </p>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            FSSAI is the regulatory body established under the **Food Safety and Standards Act, 2006 (India)**. It monitors the quality of food products, ensuring that businesses adhere to proper safety standards and regulations, minimizing the risk of food adulteration and protecting public health.
        </p>

        <h3 className="text-2xl font-bold mb-6 text-gray-800">Who Needs FSSAI Registration?</h3>
        <div className="p-6 bg-[#E6F0F6] rounded-xl shadow-md border-l-4 border-[#022B50]">
            <p className="text-gray-700 font-medium">FSSAI registration or license is mandatory for any individual or entity involved in **production, processing, packaging, distribution, or sale of food**. This includes petty retailers, dairy units, food vending agencies, large-scale businesses, and even medical stores selling supplements.</p>
        </div>
    </section>
);

const FSSAIEligibilityContent = () => (
    <section id="fssai-eligibility-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800">Eligibility Criteria for FSSAI License Registration</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            Eligibility is determined primarily by the business’s **annual turnover** and **operational reach**, which dictates whether you need Basic Registration, a State License, or a Central License.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
            {fssaiEligibility.map((item, i) => (
                <LicenseTypeBox key={i} title={item.title} turnover={item.turnover} criteria={item.criteria} icon={item.icon} />
            ))}
        </div>

        <h4 className="text-2xl font-bold mb-6 mt-12 text-gray-800">Checklist for FSSAI Registration</h4>
        <div className="space-y-4">
            {fssaiChecklist.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-indigo-50 rounded-lg shadow-md border-l-4 border-indigo-500">
                    <CheckCircle className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{item}</span>
                </div>
            ))}
        </div>
    </section>
);

const FSSAIBenefitsContent = () => (
    <section id="fssai-benefits-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800">Significant Advantages of FSSAI Registration</h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fssaiBenefits.map((item, i) => (
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

const FSSAIDocumentsContent = () => {
    // Manually combining common and specific documents for display clarity
    const displayDocuments = [
        ...fssaiDocuments.slice(0, 4), // Common docs
        { title: "List of Food Products", detail: "Detailed list of food products or food category being handled.", icon: FileText },
        ...fssaiDocuments.slice(4), // Specific docs (NOC, etc.)
    ];

    return (
        <section id="fssai-documents-content" className="py-12 scroll-mt-24">
            <h3 className="text-3xl font-bold mb-6 text-gray-800">Documents Required for FSSAI Registration in India</h3>
            <p className="text-lg text-gray-700 mb-8 max-w-4xl">
                The essential documents verify your identity, business legitimacy, and food safety compliance. The exact set of documents may vary based on the type of license (Basic, State, or Central).
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayDocuments.map((doc, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-red-50 rounded-lg shadow-md border-l-4 border-red-500">
                        <doc.icon className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                        <div>
                            <p className="text-gray-800 font-medium">{doc.title}</p>
                            <p className="text-sm text-gray-600">{doc.detail}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const FSSAIProcessContent = () => (
    <section id="fssai-process-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Step-by-Step FSSAI License Registration Process</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            The procedure is streamlined to ensure legal compliance and the swift issuance of your Food Safety certificate.
        </p>

        <ol className="space-y-5 list-none border-l-2 border-[#022B50] pl-4">
            {fssaiRegistrationProcess.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                    <div className="bg-[#022B50] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {i + 1}
                    </div>
                    <span className="text-gray-700 text-lg">{step}</span>
                </li>
            ))}
        </ol>
    </section>
);

const FSSAIFeesRenewal = () => (
    <section id="fssai-fees-renewal" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Fees, Validity, and Renewal of FSSAI License</h3>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">FSSAI Registration Fees (Government Fees)</h4>
        <div className="overflow-x-auto mb-12">
            <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-[#E6F0F6]">
                    <tr>
                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">FSSAI License Type</th>
                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Government Fee (₹)</th>
                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Validity</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    <tr className="bg-white">
                        <td className="px-4 py-3 text-sm font-semibold text-gray-800">Basic Registration</td>
                        <td className="px-4 py-3 text-sm text-red-600 font-semibold">₹100 per year</td>
                        <td className="px-4 py-3 text-sm text-gray-700">1 to 5 years</td>
                    </tr>
                    <tr className="bg-gray-50">
                        <td className="px-4 py-3 text-sm font-semibold text-gray-800">State License</td>
                        <td className="px-4 py-3 text-sm text-red-600 font-semibold">₹2,000 per year</td>
                        <td className="px-4 py-3 text-sm text-gray-700">1 to 5 years</td>
                    </tr>
                    <tr className="bg-white">
                        <td className="px-4 py-3 text-sm font-semibold text-gray-800">Central License</td>
                        <td className="px-4 py-3 text-sm text-red-600 font-semibold">₹7,500 per year</td>
                        <td className="px-4 py-3 text-sm text-gray-700">1 to 5 years</td>
                    </tr>
                </tbody>
            </table>
            <p className="text-xs text-gray-500 mt-2">Note: Professional service fees are extra.</p>
        </div>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">Renewal Requirements and Benefits</h4>
        <div className="grid md:grid-cols-3 gap-6">
            {fssaiRenewalBenefits.map((item, i) => (
                <DetailItem key={i} title={item.title} description={item.detail} icon={item.icon} />
            ))}
        </div>
        <p className="text-lg text-red-500 font-semibold mt-8 max-w-4xl">
            **Renewal Deadline:** Renewal applications should be submitted at least **30 days** before the license expiry date to avoid late fee penalties and business disruptions.
        </p>
    </section>
);

const FSSAIWhyVakilsearch = () => (
    <section id="fssai-why-vakilsearch" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Why Choose Vakilsearch for FSSAI Registration?</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            Vakilsearch stands out as one of the top FSSAI consultants in India, offering comprehensive support to help food businesses comply with all legal requirements seamlessly.
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fssaiWhyVakilsearch.map((service, i) => {
                const Icon = service.icon || CheckCircle; // Defaulting icon if not explicitly set
                const [title, detail] = service.detail.split(':').map(s => s.trim());
                
                let CurrentIcon;
                if (service.title === "End-to-End Support") CurrentIcon = Briefcase;
                else if (service.title === "Expert Guidance") CurrentIcon = Lightbulb;
                else if (service.title === "Quick Turnaround") CurrentIcon = Clock;
                else if (service.title === "Affordable Pricing") CurrentIcon = DollarSign;
                else if (service.title === "Proven Credibility") CurrentIcon = Zap;
                else CurrentIcon = CheckCircle;
                
                return (
                    <div key={i} className="p-5 bg-indigo-50 rounded-xl shadow-sm border border-indigo-200 flex items-start gap-3">
                        <CurrentIcon className="w-6 h-6 text-[#022B50] mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-bold text-lg text-gray-800 mb-1">{service.title}</h4>
                            <p className="text-sm text-gray-600">{detail}</p>
                        </div>
                    </div>
                );
            })}
        </div>

        <h4 className="text-2xl font-bold mb-6 mt-12 text-gray-800">Legal Penalties for Not Having FSSAI Registration</h4>
        <div className="grid md:grid-cols-3 gap-6">
            {fssaiPenalties.slice(0, 3).map((penalty, i) => (
                <div key={i} className="p-5 bg-red-50 rounded-xl shadow-sm border border-red-500">
                    <Scale className="w-6 h-6 text-red-700 mb-2" />
                    <h5 className="font-bold text-lg text-gray-800 mb-1">{penalty.title}</h5>
                    <p className="text-sm text-gray-600 font-medium">Fine: {penalty.fine}</p>
                </div>
            ))}
        </div>
        <p className="text-lg text-red-500 font-semibold mt-8 max-w-4xl">
            Operating without a valid FSSAI license can lead to **heavy penalties or business closure** under the Food Safety and Standards Act of 2006.
        </p>
    </section>
);

const FSSAIFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
    <section id="fssai-faqs-content" className="py-12 max-w-5xl mx-auto scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">FSSAI Registration FAQs</h3>

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
export default function FSSAIRegistrationPage() {
    const [activeTab, setActiveTab] = useState(fssaiTabs[0].id);
    const [faqOpen, setFaqOpen] = useState(null);

    const SCROLL_OFFSET = 120;

    // --- SCROLLSPY IMPLEMENTATION ---
    useEffect(() => {
        const sectionIds = fssaiTabs.map(tab => tab.id);

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
            {/* === HERO SECTION (FSSAI Registration Specific) === */}
            <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">

                    {/* Background Image Section */}
                    <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
                        <img
                            src={BackgroundImageSrc}
                            alt="FSSAI Registration background"
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
                                <span className="font-semibold text-black">FSSAI Registration Online: Apply for Food License in India</span>
                            </nav>

                            {/* Badge */}
                            <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                                #1 Legal Service Provider In India
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-black">
                                FSSAI Registration Online: Apply for Food License in India
                            </h1>

                            {/* Bullet Points with CheckCircle */}
                            <div className="space-y-4 mb-8 text-sm lg:text-base text-black">
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Expert guidance to choose the **right FSSAI license** for your business.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Fast and secure document filing with registration completed in **5 days**.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Easy renewal and modification in just **48 hours** with full expert support.
                                </p>
                            </div>
                            <p className="text-sm font-semibold text-gray-700">Complete guide on FSSAI Registration</p>

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
                                <h2 className="text-xl font-semibold mb-6 text-black text-center">FSSAI License Registration</h2>

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
                        {fssaiTabs.map((tab) => (
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
                    <FSSAIOverviewContent />
                    <FSSAIEligibilityContent />
                    <FSSAIBenefitsContent />
                    <FSSAIDocumentsContent />
                    <FSSAIProcessContent />
                    <FSSAIFeesRenewal />
                    <FSSAIWhyVakilsearch />
                    <FSSAIFAQsContent faqs={fssaiFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
                </div>
            </div>

        </div>
    );
}