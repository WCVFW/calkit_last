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

const FeatureBox = ({ title, detail, icon: Icon }) => (
    <div className="p-5 bg-white rounded-lg shadow-sm border border-gray-200">
        <Icon className="w-6 h-6 text-amber-500 mb-2" />
        <h4 className="font-bold text-lg text-gray-800 mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{detail}</p>
    </div>
);

// --- TAB CONTENT COMPONENTS (APEDA Registration Content) ---

const APEDAOverviewContent = () => (
    <section id="apeda-overview-content" className="py-12 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">APEDA Registration - The Gateway to Agri-Export</h2>
        <p className="text-lg text-gray-700 mb-4 max-w-4xl">
            The **Agricultural and Processed Food Products Export Development Authority (APEDA)** is a statutory body established by the Government of India in 1985. Its primary objective is to **promote and develop the export** of scheduled food products like fruits, meat, dairy, and alcoholic beverages.
        </p>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            To export these goods, you must first obtain an **Import Export Code (IEC)** and then complete the APEDA online registration to receive the **Registration-Cum-Membership Certificate (RCMC)**, which is mandatory for customs clearance and availing export benefits.
        </p>
    </section>
);

const APEDAProductsContent = () => (
    <section id="apeda-products-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Products Covered and the Role of APEDA</h3>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">Scheduled Products Covered Under APEDA Act, 1985</h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-700 max-w-5xl mb-12">
            {apedaProducts.map((product, i) => (
                <div key={i} className="flex items-start gap-2 p-3 bg-indigo-50 rounded-lg shadow-sm border border-indigo-200">
                    <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 font-medium">{product}</span>
                </div>
            ))}
        </div>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">Key Functions and Role of APEDA</h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apedaRoles.map((role, i) => (
                <FeatureBox key={i} title={role.title} detail={role.detail} icon={role.icon} />
            ))}
        </div>
    </section>
);

const APEDABenefitsContent = () => (
    <section id="apeda-benefits-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800">Advantages of Obtaining an APEDA RCMC Registration</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            APEDA registration provides businesses with a crucial legal foundation, market awareness, and financial leverage necessary for succeeding in the competitive global food export market.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apedaBenefits.map((item, i) => (
                <DetailItem key={i} title={item.title} description={item.detail} icon={item.icon} />
            ))}
        </div>
    </section>
);

const APEDAEligibilityContent = () => (
    <section id="apeda-eligibility-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Eligibility, Requirements, and Registration Fees</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            Any individual or entity exporting scheduled products must register. APEDA registration is mandatory for these scheduled products as per the Foreign Trade Policy.
        </p>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">Who Can Apply for RCMC?</h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {apedaEligibility.map((item, i) => {
                const Icon = item.icon;
                return (
                    <div key={i} className="p-6 bg-white rounded-xl shadow-md flex gap-4 items-start">
                        {Icon && <Icon className="w-6 h-6 text-blue-500 mt-1" />}
                        <div>
                            <h3 className="font-bold text-lg mb-1">{item.entity}</h3>
                            <p className="text-gray-600 text-sm">{item.requirements}</p>
                        </div>
                    </div>
                );
            })}
        </div>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">APEDA Registration Fees (Government Fees)</h4>
        <div className="grid md:grid-cols-2 gap-6">
            {apedaFees.map((fee, i) => (
                <div key={i} className="p-6 bg-[#E6F0F6] rounded-xl shadow-md border-l-4 border-red-500">
                    <h5 className="font-bold text-xl text-gray-800 mb-1">{fee.category}</h5>
                    <p className="text-lg text-red-600 font-semibold mb-2">Fee: {fee.fee}</p>
                    <p className="text-sm text-gray-600">{fee.validity}</p>
                </div>
            ))}
        </div>
        <p className="text-sm text-gray-600 mt-4">Note: These fees are mandatory government charges and are exclusive of professional service fees. Fees are subject to change based on government regulations.</p>
    </section>
);

const APEDAProcessContent = () => (
    <section id="apeda-process-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Step-by-Step APEDA Registration Process (RCMC)</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            The process is handled entirely online through the APEDA portal. You must have your **Import Export Code (IEC)** ready before starting.
        </p>

        <ol className="space-y-5 list-none border-l-2 border-[#022B50] pl-4">
            {apedaProcessSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                    <div className="bg-[#022B50] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {i + 1}
                    </div>
                    <span className="text-gray-700 text-lg">{step}</span>
                </li>
            ))}
        </ol>

        <h4 className="text-2xl font-bold mb-6 mt-12 text-gray-800">Mandatory Documents Required for Filing</h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {apedaDocuments.slice(0, 4).map((doc, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-red-50 rounded-lg shadow-md border-l-4 border-red-500">
                    <doc.icon className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 font-medium">{doc.title.split(':')[0]}</span>
                </div>
            ))}
        </div>
    </section>
);

const APEDAChallengesContent = () => (
    <section id="apeda-challenges-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Common Challenges and Expert Solutions</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            The APEDA registration process, while online, can be problematic due to complex documentation, regulatory scrutiny, and technical issues. Our experts address these proactively.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
            {apedaChallenges.map((issue, i) => (
                <div key={i} className="p-5 bg-white rounded-xl shadow-lg border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <issue.icon className="w-6 h-6 text-red-500 flex-shrink-0" />
                        <h4 className="font-bold text-lg text-gray-800">{issue.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">**Issue:** {issue.issue}</p>
                    <p className="text-sm text-green-700 font-semibold">**Solution:** {issue.solution}</p>
                </div>
            ))}
        </div>
    </section>
);

const APEDAWhyVakilsearch = () => (
    <section id="apeda-why-vakilsearch" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Why Vakilsearch for APEDA Registration?</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            We simplify your entire agri-export compliance journey, from securing the mandatory IEC to the final RCMC issuance, ensuring zero errors and prompt delivery.
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {apedaWhyVakilsearch.map((service, i) => {
                const Icon = i % 4 === 0 ? Smartphone : i % 4 === 1 ? Zap : i % 4 === 2 ? Clock : Scale;
                const [title, detail] = service.split(':').map(s => s.trim());
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

const APEDAFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
    <section id="apeda-faqs-content" className="py-12 max-w-5xl mx-auto scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">FAQs on APEDA Registration</h3>

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
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">

                    {/* Background Image Section */}
                    <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
                        <img
                            src={BackgroundImageSrc}
                            alt="APEDA Registration background"
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
                                <span className="font-semibold text-black">NGO</span> &gt;{" "}
                                <span className="font-semibold text-black">APEDA Registration</span>
                            </nav>

                            {/* Badge */}
                            <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                                #1 Legal Service Provider In India
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-black">
                                Apply APEDA Registration Online
                            </h1>

                            {/* Bullet Points with CheckCircle */}
                            <div className="space-y-4 mb-8 text-sm lg:text-base text-black">
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Streamline your agri-export business with **expert-assisted APEDA registration**.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    **100% online process** including documentation, DGFT filing, and **RCMC application**.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Top legal support to **comply with all export regulations** and grow your business.
                                </p>
                            </div>
                            <p className="text-sm font-semibold text-gray-700">APEDA Registration and Its Benefits</p>

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
                                <h2 className="text-xl font-semibold mb-6 text-black text-center">Get Started!</h2>

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
            <section className="py-4 md:py-6 px-4 md:px-8 bg-white border-b border-gray-200 sticky top-0 z-30 shadow-md">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center bg-white rounded-xl w-full text-xs md:text-sm lg:text-base overflow-x-auto border border-gray-200">
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
            <div className="py-2 md:py-4 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
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