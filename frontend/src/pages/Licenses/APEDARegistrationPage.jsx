import React, { useState, useEffect } from "react";
// axios is kept for convention, though not used in frontend logic
import axios from "axios";
import {
    ChevronDown,
    Zap, // For Efficiency/Fast Filing
    Briefcase, // For Business/Corporate Structure
    ArrowRight,
    Star,
    CheckCircle, // For Quality Control/Compliance
    FileText, // For document/Form/RCMC
    Scale, // For Standards/Regulation/Quality
    Handshake, // For Support/Assistance
    TrendingUp, // For Export Promotion/Growth
    Lightbulb, // For Expert Guidance/Market Intelligence
    Users, // For Training/Stakeholders
    DollarSign, // For Fees/Financial Support/Subsidies
    Clock, // For Timely Filing/Validity
    Landmark, // For APEDA/Ministry of Commerce
    Globe, // For International Markets/Export
    Banknote, // For Bank Certificate/Finance
    BookOpen,
    Smartphone // For Acts/Regulations
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from '../../assets/business.png'; // Reusing a general business image

// --- APEDA REGISTRATION STATIC DATA DEFINITIONS ---

const apedaTabs = [
    { id: 'apeda-overview-content', label: 'Overview' },
    { id: 'apeda-products-content', label: 'Products & Role' },
    { id: 'apeda-benefits-content', label: 'Benefits' },
    { id: 'apeda-eligibility-content', label: 'Eligibility & Fees' },
    { id: 'apeda-process-content', label: 'Registration Process' },
    { id: 'apeda-challenges-content', label: 'Challenges & Solutions' },
    { id: 'apeda-why-vakilsearch', label: 'Why Vakilsearch?' },
    { id: 'apeda-faqs-content', label: 'FAQ' },
];

const apedaProducts = [
    "Fruits, Vegetables, and their Products",
    "Meat and Meat Products",
    "Poultry and Dairy Products",
    "Confectionery, Biscuits, and Bakery Products",
    "Honey, Jaggery, and Sugar Products",
    "Cocoa and its Products, Chocolates",
    "Alcoholic and Non-Alcoholic Beverages",
    "Cereal and Cereal Products",
    "Floriculture and Floriculture Products",
    "Herbal and Medicinal Plants",
    "Guar Gum and Pickles, Papads, Chutneys",
];

const apedaRoles = [
    { title: "Export Promotion & Development", detail: "APEDA actively supports the production and development of scheduled goods oriented towards exports.", icon: TrendingUp },
    { title: "Setting Standards & Inspection", detail: "Sets and upholds strict requirements and inspects products (like meat) to guarantee quality and conformity for the export market.", icon: Scale },
    { title: "Financial Support & Subsidies", detail: "Provides financial assistance schemes for infrastructure development, quality development, and market development.", icon: DollarSign },
    { title: "Packaging and Marketing Support", detail: "Offers assistance in improving packaging and marketing tactics to help exporters stand out internationally.", icon: Zap },
    { title: "Market Intelligence & Training", detail: "Gathers information about global market demands and offers training to help exporters understand global standards.", icon: Lightbulb },
];

const apedaBenefits = [
    { title: "Legal Authority (RCMC)", icon: BookOpen, detail: "Grants legal authority to export scheduled products and confirms compliance with government rules." },
    { title: "Access to Global Markets", icon: Globe, detail: "The RCMC certificate is mandatory for exporting to international markets and helps streamline customs clearance." },
    { title: "Access Government Incentives", icon: Handshake, detail: "Eligibility for financial assistance schemes, subsidies, and other tax benefits offered by the government." },
    { title: "Infrastructure & Quality Support", icon: CheckCircle, detail: "Access to subsidies for developing export infrastructure (cold storage, integrated pack houses) and maintaining quality standards." },
    { title: "Enhanced Brand Visibility", icon: Zap, detail: "Helps exporters enhance their brand visibility and credibility in the market, providing a competitive edge." },
    { title: "Training & Capacity Building", icon: Users, detail: "Registered members can participate in various APEDA-organized training programs to improve business operations and skills." },
];

const apedaDocuments = [
    { title: "Import Export Code (IEC)", detail: "Mandatory copy of the IEC certificate issued by the DGFT.", icon: FileText },
    { title: "Bank Certificate / Canceled Cheque", detail: "A signed bank certificate confirming account details, or a canceled cheque with the business name.", icon: Banknote },
    { title: "Bank A/c. Statement", detail: "Latest two months' bank account statement of the firm.", icon: DollarSign },
    { title: "FSSAI Registration Certificate", detail: "Mandatory for food product exporters to ensure food safety standards.", icon: Briefcase },
    { title: "PAN Card / GST Certificate", detail: "Copy of the entity's PAN card and GST certificate (if applicable).", icon: FileText },
    { title: "Application Form", detail: "Duly filled and signed application form on the APEDA portal.", icon: FileText },
];

const apedaProcessSteps = [
    "Step 1: Login/Register on APEDA Portal: Access the official APEDA website and click 'Register as Member.' Enter your IE Code, Mobile Number, and Email ID for OTP verification.",
    "Step 2: Fill Application Form: Complete the online application form with detailed business, product, and bank account information.",
    "Step 3: Upload Documents: Upload all required documents (IEC, Bank Certificate, PAN, etc.) in the correct format (PDF, JPEG) on the portal.",
    "Step 4: Payment of Fees: Pay the prescribed registration fee online using Credit/Debit Card, or via Demand Draft (INR 5000 + GST for MSMEs).",
    "Step 5: Verification and Approval: APEDA officials verify the application and documents. Upon successful verification, the RCMC is issued.",
    "Step 6: Download RCMC Certificate: Log in to the Exporter Login link to download the Registration-Cum-Membership Certificate (RCMC).",
];

const apedaFees = [
    { category: "MSME (Micro, Small & Medium Enterprises)", fee: "₹5,000 + GST (₹5,900 total)", validity: "Valid for 5 Financial Years" },
    { category: "Large Enterprises", fee: "₹10,000 + GST (₹11,800 total)", validity: "Valid for 5 Financial Years" },
];

const apedaChallenges = [
    { title: "Documentation Complexity", issue: "Dealing with complex documentation (IEC, Bank Certificate, FSSAI) often leads to delays and rejection.", solution: "We provide meticulous review to ensure all documents are complete, accurate, and in the correct format.", icon: FileText },
    { title: "Verification Delays", issue: "Delays occur due to incorrect information, technical issues on the portal, or slow government processing.", solution: "We track the application number, proactively follow up with APEDA, and handle any MHA queries.", icon: Clock },
    { title: "FSSAI Pre-requisite", issue: "For food product exports, an FSSAI license must be obtained first, adding to the initial complexity.", solution: "We assist with FSSAI registration simultaneously to streamline the overall export setup process.", icon: CheckCircle },
];

const apedaWhyVakilsearch = [
    "100% Online and Expert-Assisted Filing: Our team handles the entire online application and documentation process, ensuring compliance.",
    "Fast Turnaround: We file the RCMC application quickly, speeding up the overall issuance process.",
    "End-to-End Support: From obtaining your IEC to final RCMC issuance and initial compliance, we guide you through every step.",
    "Compliance Assurance: We ensure adherence to all APEDA and DGFT regulations, minimizing the risk of cancellation or deactivation.",
];

const apedaFAQs = [
    { q: "What is APEDA authority?", a: "APEDA is the Agricultural and Processed Food Products Export Development Authority, a statutory body established in 1985 to promote and develop the export of scheduled agricultural and processed food products from India." },
    { q: "How Long Does APEDA registration process Take?", a: "The professional filing is done quickly (often in 2 days). The official approval and certificate issuance by APEDA usually take about 7-15 working days after successful document verification." },
    { q: "What Are the Costs Involved in APEDA Registration?", a: "The government fee is INR 5,000 plus GST for MSMEs, and INR 10,000 plus GST for large enterprises. Professional service fees are additional." },
    { q: "Can a Company Export Multiple Products Under a Single APEDA Registration?", a: "Yes, a company can export multiple scheduled products under a single APEDA RCMC. The company must list all product lines during the application." },
    { q: "Is APEDA Registration Mandatory for Domestic Sales?", a: "No, APEDA registration is mandatory only for businesses engaged in the **export** of scheduled agricultural and processed food products. It is not required for domestic sales." },
    { q: "How often do I need to fill out the online application form for APEDA registration?", a: "The initial RCMC registration is a one-time process, but the RCMC is valid for **5 financial years** and must be renewed before expiry." },
];

export const apedaEligibility = [
  {
    entity: "Exporters of Scheduled Products",
    requirements:
      "Companies that export specific agricultural products like fruits, vegetables, and meat must register with APEDA to sell their goods internationally.",
    icon: CheckCircle,
  },
  {
    entity: "Manufacturers of Agricultural Products",
    requirements:
      "Agricultural manufacturers who wish to export their products can also register. They need to show proof of their business registration with recognized bodies like the Directorate of Industries or FPO.",
    icon: CheckCircle,
  },
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

// --- TAB CONTENT COMPONENTS (APEDA Registration Content) ---

const APEDAOverviewContent = () => (
    <section id="apeda-overview-content" className="py-12 scroll-mt-24">
        <h2 className="mb-6 text-3xl font-bold text-gray-800">APEDA Registration - The Gateway to Agri-Export</h2>
        <p className="max-w-4xl mb-4 text-lg text-gray-700">
            The **Agricultural and Processed Food Products Export Development Authority (APEDA)** is a statutory body established by the Government of India in 1985. Its primary objective is to **promote and develop the export** of scheduled food products like fruits, meat, dairy, and alcoholic beverages.
        </p>
        <p className="max-w-4xl mb-8 text-lg text-gray-700">
            To export these goods, you must first obtain an **Import Export Code (IEC)** and then complete the APEDA online registration to receive the **Registration-Cum-Membership Certificate (RCMC)**, which is mandatory for customs clearance and availing export benefits.
        </p>
    </section>
);

const APEDAProductsContent = () => (
    <section id="apeda-products-content" className="py-12 scroll-mt-24">
        <h3 className="mb-6 text-3xl font-bold text-gray-800">Products Covered and the Role of APEDA</h3>

        <h4 className="mb-6 text-2xl font-bold text-gray-800">Scheduled Products Covered Under APEDA Act, 1985</h4>
        <div className="grid max-w-5xl gap-4 mb-12 text-gray-700 sm:grid-cols-2 lg:grid-cols-4">
            {apedaProducts.map((product, i) => (
                <div key={i} className="flex items-start gap-2 p-3 border border-indigo-200 rounded-lg shadow-sm bg-indigo-50">
                    <CheckCircle className="flex-shrink-0 w-5 h-5 mt-1 text-indigo-600" />
                    <span className="font-medium text-gray-700">{product}</span>
                </div>
            ))}
        </div>

        <h4 className="mb-6 text-2xl font-bold text-gray-800">Key Functions and Role of APEDA</h4>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {apedaRoles.map((role, i) => (
                <FeatureBox key={i} title={role.title} detail={role.detail} icon={role.icon} />
            ))}
        </div>
    </section>
);

const APEDABenefitsContent = () => (
    <section id="apeda-benefits-content" className="py-12 scroll-mt-24">
        <h3 className="mb-8 text-3xl font-bold text-gray-800">Advantages of Obtaining an APEDA RCMC Registration</h3>
        <p className="max-w-4xl mb-8 text-lg text-gray-700">
            APEDA registration provides businesses with a crucial legal foundation, market awareness, and financial leverage necessary for succeeding in the competitive global food export market.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {apedaBenefits.map((item, i) => (
                <DetailItem key={i} title={item.title} description={item.detail} icon={item.icon} />
            ))}
        </div>
    </section>
);

const APEDAEligibilityContent = () => (
    <section id="apeda-eligibility-content" className="py-12 scroll-mt-24">
        <h3 className="mb-6 text-3xl font-bold text-gray-800">Eligibility, Requirements, and Registration Fees</h3>
        <p className="max-w-4xl mb-8 text-lg text-gray-700">
            Any individual or entity exporting scheduled products must register. APEDA registration is mandatory for these scheduled products as per the Foreign Trade Policy.
        </p>

        <h4 className="mb-6 text-2xl font-bold text-gray-800">Who Can Apply for RCMC?</h4>
        <div className="grid gap-6 mb-12 md:grid-cols-2 lg:grid-cols-4">
            {apedaEligibility.map((item, i) => {
                const Icon = item.icon;
                return (
                    <div key={i} className="flex items-start gap-4 p-6 bg-white shadow-md rounded-xl">
                        {Icon && <Icon className="w-6 h-6 mt-1 text-blue-500" />}
                        <div>
                            <h3 className="mb-1 text-lg font-bold">{item.entity}</h3>
                            <p className="text-sm text-gray-600">{item.requirements}</p>
                        </div>
                    </div>
                );
            })}
        </div>

        <h4 className="mb-6 text-2xl font-bold text-gray-800">APEDA Registration Fees (Government Fees)</h4>
        <div className="grid gap-6 md:grid-cols-2">
            {apedaFees.map((fee, i) => (
                <div key={i} className="p-6 bg-[#E6F0F6] rounded-xl shadow-md border-l-4 border-red-500">
                    <h5 className="mb-1 text-xl font-bold text-gray-800">{fee.category}</h5>
                    <p className="mb-2 text-lg font-semibold text-red-600">Fee: {fee.fee}</p>
                    <p className="text-sm text-gray-600">{fee.validity}</p>
                </div>
            ))}
        </div>
        <p className="mt-4 text-sm text-gray-600">Note: These fees are mandatory government charges and are exclusive of professional service fees. Fees are subject to change based on government regulations.</p>
    </section>
);

const APEDAProcessContent = () => (
    <section id="apeda-process-content" className="py-12 scroll-mt-24">
        <h3 className="mb-6 text-3xl font-bold text-gray-800">Step-by-Step APEDA Registration Process (RCMC)</h3>
        <p className="max-w-4xl mb-8 text-lg text-gray-700">
            The process is handled entirely online through the APEDA portal. You must have your **Import Export Code (IEC)** ready before starting.
        </p>

        <ol className="space-y-5 list-none border-l-2 border-[#022B50] pl-4">
            {apedaProcessSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                    <div className="bg-[#022B50] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {i + 1}
                    </div>
                    <span className="text-lg text-gray-700">{step}</span>
                </li>
            ))}
        </ol>

        <h4 className="mt-12 mb-6 text-2xl font-bold text-gray-800">Mandatory Documents Required for Filing</h4>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {apedaDocuments.slice(0, 4).map((doc, i) => (
                <div key={i} className="flex items-start gap-3 p-4 border-l-4 border-red-500 rounded-lg shadow-md bg-red-50">
                    <doc.icon className="flex-shrink-0 w-5 h-5 mt-1 text-red-500" />
                    <span className="font-medium text-gray-700">{doc.title.split(':')[0]}</span>
                </div>
            ))}
        </div>
    </section>
);

const APEDAChallengesContent = () => (
    <section id="apeda-challenges-content" className="py-12 scroll-mt-24">
        <h3 className="mb-6 text-3xl font-bold text-gray-800">Common Challenges and Expert Solutions</h3>
        <p className="max-w-4xl mb-8 text-lg text-gray-700">
            The APEDA registration process, while online, can be problematic due to complex documentation, regulatory scrutiny, and technical issues. Our experts address these proactively.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
            {apedaChallenges.map((issue, i) => (
                <div key={i} className="p-5 bg-white border border-gray-200 shadow-lg rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                        <issue.icon className="flex-shrink-0 w-6 h-6 text-red-500" />
                        <h4 className="text-lg font-bold text-gray-800">{issue.title}</h4>
                    </div>
                    <p className="mb-3 text-sm text-gray-600">**Issue:** {issue.issue}</p>
                    <p className="text-sm font-semibold text-green-700">**Solution:** {issue.solution}</p>
                </div>
            ))}
        </div>
    </section>
);

const APEDAWhyVakilsearch = () => (
    <section id="apeda-why-vakilsearch" className="py-12 scroll-mt-24">
        <h3 className="mb-6 text-3xl font-bold text-gray-800">Why Vakilsearch for APEDA Registration?</h3>
        <p className="max-w-4xl mb-8 text-lg text-gray-700">
            We simplify your entire agri-export compliance journey, from securing the mandatory IEC to the final RCMC issuance, ensuring zero errors and prompt delivery.
        </p>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {apedaWhyVakilsearch.map((service, i) => {
                const Icon = i % 4 === 0 ? Smartphone : i % 4 === 1 ? Zap : i % 4 === 2 ? Clock : Scale;
                const [title, detail] = service.split(':').map(s => s.trim());
                return (
                    <div key={i} className="flex items-start gap-3 p-5 border border-indigo-200 shadow-sm bg-indigo-50 rounded-xl">
                        <Icon className="w-6 h-6 text-[#022B50] mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="mb-1 text-lg font-bold text-gray-800">{title}</h4>
                            <p className="text-sm text-gray-600">{detail}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    </section>
);

const APEDAFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
    <section id="apeda-faqs-content" className="max-w-5xl py-12 mx-auto scroll-mt-24">
        <h3 className="mb-8 text-3xl font-bold text-center text-gray-800">FAQs on APEDA Registration</h3>

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
export default function APEDARegistrationPage() {
    const [activeTab, setActiveTab] = useState(apedaTabs[0].id);
    const [faqOpen, setFaqOpen] = useState(null);

    const SCROLL_OFFSET = 120;

    // --- SCROLLSPY IMPLEMENTATION ---
    useEffect(() => {
        const sectionIds = apedaTabs.map(tab => tab.id);

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
            {/* === HERO SECTION (APEDA Registration Specific) === */}
            <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
                <div className="relative px-4 pt-12 mx-auto max-w-7xl md:px-8">

                    {/* Background Image Section */}
                    <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
                        <img
                            src={BackgroundImageSrc}
                            alt="APEDA Registration background"
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
                                <span className="font-semibold text-black">NGO</span> &gt;{" "}
                                <span className="font-semibold text-black">APEDA Registration</span>
                            </nav>

                            {/* Badge */}
                            <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                                #1 Legal Service Provider In India
                            </div>

                            {/* Title */}
                            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-black md:text-5xl lg:text-6xl">
                                Apply APEDA Registration Online
                            </h1>

                            {/* Bullet Points with CheckCircle */}
                            <div className="mb-8 space-y-4 text-sm text-black lg:text-base">
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="flex-shrink-0 w-5 h-5 mt-1 text-blue-400" />
                                    Streamline your agri-export business with **expert-assisted APEDA registration**.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="flex-shrink-0 w-5 h-5 mt-1 text-blue-400" />
                                    **100% online process** including documentation, DGFT filing, and **RCMC application**.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="flex-shrink-0 w-5 h-5 mt-1 text-blue-400" />
                                    Top legal support to **comply with all export regulations** and grow your business.
                                </p>
                            </div>
                            <p className="text-sm font-semibold text-gray-700">APEDA Registration and Its Benefits</p>
                        </div>

                        {/* Right Column - Form */}
                        <div className="w-full lg:w-[350px] relative z-30 lg:mt-0 lg:ml-auto mt-[-100px] sm:mt-[-50px]">
                            <div
                                className="w-full p-6 bg-white shadow-xl md:p-8 rounded-2xl"
                                style={{ borderRadius: '24px', border: '1px solid #E0E0E0' }}
                            >
                                <h2 className="mb-6 text-xl font-semibold text-center text-black">Get Started!</h2>

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
            <section className="sticky top-0 z-30 px-4 py-4 bg-white border-b border-gray-200 shadow-md md:py-6 md:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="flex items-center w-full overflow-x-auto text-xs bg-white border border-gray-200 rounded-xl md:text-sm lg:text-base">
                        {apedaTabs.map((tab) => (
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
                    <APEDAOverviewContent />
                    <APEDAProductsContent />
                    <APEDABenefitsContent />
                    <APEDAEligibilityContent />
                    <APEDAProcessContent />
                    <APEDAChallengesContent />
                    <APEDAWhyVakilsearch />
                    <APEDAFAQsContent faqs={apedaFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
                </div>
            </div>

        </div>
    );
}