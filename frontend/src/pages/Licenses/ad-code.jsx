import React, { useState, useEffect } from "react";
// axios is kept for convention, though not used in frontend logic
import axios from "axios";
import {
    ChevronDown,
    Zap, // For Fast/Efficient Process
    Briefcase, // For Business/Corporate Structure
    ArrowRight,
    Star,
    CheckCircle, // For Compliance/Requirements
    FileText, // For document/Forms
    Scale, // For Regulation/FEMA
    Handshake, // For Trust/Expertise
    TrendingUp, // For Incentives/Growth
    Users, // For Applicants/Directors
    DollarSign, // For Foreign Currency Payments
    Clock, // For Timeliness/Faster Clearance
    Landmark, // For RBI/ICEGATE/Customs
    Shield, // For Risk Mitigation/Penalties
    MapPin, // For Ports/ICDs
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from '../../assets/business.png'; // Reusing a general business image

// --- AD CODE REGISTRATION STATIC DATA DEFINITIONS ---

const adCodeTabs = [
    { id: 'adcode-overview-content', label: 'Overview' },
    { id: 'adcode-benefits-content', label: 'Benefits' },
    { id: 'adcode-eligibility-content', label: 'Eligibility' },
    { id: 'adcode-documents-content', label: 'Documents Required' },
    { id: 'adcode-procedure-content', label: 'Procedure' },
    { id: 'adcode-consequences-content', label: 'Consequences' },
    { id: 'adcode-why-vakilsearch', label: 'Why Vakilsearch?' },
    { id: 'adcode-faqs-content', label: 'FAQs' },
];

const adCodeOverview = {
    code: "An AD, or Authorised Dealer, is a **14-digit code** issued by a bank to an exporter or importer. It is required for all export and import transactions involving foreign currency.",
    purpose: "The purpose of the AD Code is to ensure that foreign currency transactions are genuine and not used for illegal purposes like money laundering or illegal outflow of foreign exchange. It is a crucial requirement under FEMA (Foreign Exchange Management Act).",
};

const adCodeBenefits = [
    { title: "Ease of Foreign Currency Payments", icon: DollarSign, detail: "The AD Code verifies identity and transaction authenticity, ensuring payments are processed smoothly and without hassle." },
    { title: "Faster Customs Clearance", icon: Clock, detail: "Helps identify shipments and ensures compliance, enabling goods to clear customs more quickly, saving time and money." },
    { title: "Access to Government Incentives", icon: TrendingUp, detail: "Shows that you are a legitimate business, making you eligible for government incentives and schemes aimed at growing international trade." },
    { title: "Reduced Risk of Penalties", icon: Shield, detail: "Ensures compliance with all necessary regulations (especially FEMA), helping you avoid fines and reputational damage." },
];

const adCodeEligibility = [
    "Must be registered with the Directorate General of Foreign Trade (DGFT) for an **Import Export Code (IEC)**.",
    "Must have a **current account** with a bank that is authorised to deal in foreign currency.",
    "Must provide all the required documents to the bank and the customs (ICEGATE).",
];

const adCodeDocuments = [
    { doc: "IEC Registration Certificate", detail: "Certificate issued by the DGFT establishing eligibility to export or import goods.", icon: FileText },
    { doc: "Bank Account Details", detail: "Name of the bank, branch address, account number, and IFSC code.", icon: DollarSign },
    { doc: "Proof of Identity (PAN, Aadhaar, Passport)", detail: "Used for identity verification of the authorised signatory.", icon: Users },
    { doc: "Proof of Address (Utility bill, Lease agreement)", detail: "Verification of the business address.", icon: Landmark },
    { doc: "Board Resolution / Letter of Authorisation", detail: "Authorising the registration of the AD Code and the person applying on behalf of the entity.", icon: Briefcase },
];

const adCodeProcedureSteps = [
    { title: "Step 1: Apply for AD Code through your Bank", detail: "Visit your bank branch, submit an application letter (in their format), provide supporting documents (PAN, IEC, address proof), and pay any processing fees to obtain the AD Code authorisation letter.", icon: Landmark },
    { title: "Step 2: Register your AD Code on ICEGATE (Customs)", detail: "Log in to the ICEGATE portal, and under 'Bank Management System,' choose 'Add Bank Account' to register your AD Code for specific port locations where you plan to conduct exports.", icon: Landmark },
];

const adCodeConsequences = [
    { title: "Inability to Transact in Foreign Currency", penalty: "Prevents you from paying overseas suppliers or receiving payments from overseas customers, severely hampering business operations.", icon: DollarSign },
    { title: "Inability to Clear Goods from Customs", penalty: "Goods cannot be imported or exported, leading to financial losses and reputational damage.", icon: Clock },
    { title: "Risk of Prosecution under PMLA", penalty: "Violation of FEMA can lead to prosecution under the Prevention of Money Laundering Act (PMLA), carrying severe penalties including imprisonment.", icon: Scale },
    { title: "Loss of Government Incentives", penalty: "You will not be eligible for government incentives and schemes that require mandatory AD Code registration.", icon: TrendingUp },
];

const whyVakilsearch = [
    { title: "Expertise in Foreign Exchange Regulations", detail: "Well-versed in the specific requirements and intricacies of AD Code registration, ensuring compliance with RBI guidelines.", icon: Scale },
    { title: "Efficiency and Timeliness", detail: "Streamlines the complex process, ensuring all necessary documentation is met accurately and promptly.", icon: Zap },
    { title: "Compliance Assurance", detail: "Assists in maintaining continuous compliance with RBI regulations, reducing the risk of regulatory issues or penalties.", icon: CheckCircle },
    { title: "Risk Mitigation", detail: "Proactively identifies potential risks and challenges to ensure international trade transactions proceed smoothly.", icon: Shield },
];

const adCodeFAQs = [
    { q: "What is AD Code Registration?", a: "AD Code (Authorised Dealer Code) registration is the mandatory process of obtaining a 14-digit code from your bank, which is then registered with the Customs portal (ICEGATE) to legitimize foreign currency import-export transactions." },
    { q: "How to check AD Code registration status in ICEGATE?", a: "You check the status on the ICEGATE portal under the 'Bank Management System' or 'User Details' section after logging in with your credentials (PAN and Udyam/IE code linkage)." },
    { q: "Can I apply for AD Code online?", a: "The entire process is hybrid: You must submit a physical application to your **bank branch** to get the code, but the **registration with Customs (ICEGATE)** is completed online." },
    { q: "Who gives AD code?", a: "The AD Code is **issued by the bank** where you maintain your current account, provided that bank is an Authorised Dealer (AD) Category-I bank." },
    { q: "Is AD Code 7 digit or 14-digit?", a: "The full AD Code is a **14-digit number**. The first 7 digits are the IFSC code of the bank branch, and the remaining 7 digits are the unique bank code." },
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

const DocumentBox = ({ doc, category, icon: Icon }) => (
    <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg shadow-md border-l-4 border-red-500">
        <Icon className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
        <div>
            <p className="text-gray-800 font-medium">{doc}</p>
            <p className="text-xs text-gray-600 font-medium">{category}</p>
        </div>
    </div>
);

const ProcedureBox = ({ title, detail, icon: Icon }) => (
    <div className="p-5 bg-white rounded-xl shadow-lg border border-gray-200">
        <Icon className="w-6 h-6 text-amber-500 mb-2" />
        <h4 className="font-bold text-lg text-gray-800 mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{detail}</p>
    </div>
);

// --- TAB CONTENT COMPONENTS (AD Code Registration Content) ---

const ADCodeOverviewContent = () => (
    <section id="adcode-overview-content" className="py-12 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">AD Code Registration - An Overview</h2>
        <p className="text-lg text-gray-700 mb-4 max-w-4xl">
            {adCodeOverview.code}
        </p>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            **Why is AD Code Registration Required?** {adCodeOverview.purpose} It is used to track all foreign currency transactions and to prevent money laundering and other financial crimes.
        </p>
    </section>
);

const ADCodeBenefitsContent = () => (
    <section id="adcode-benefits-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800">Key Benefits of AD Code Registration</h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adCodeBenefits.map((item, i) => (
                <DetailItem key={i} title={item.title} description={item.detail} icon={item.icon} />
            ))}
        </div>
    </section>
);

const ADCodeEligibilityContent = () => (
    <section id="adcode-eligibility-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Eligibility for AD Code Registration</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            AD Code registration is a crucial requirement for all exporters and importers who deal in foreign currency. Eligibility is determined by basic trade and banking prerequisites.
        </p>

        <div className="space-y-4">
            {adCodeEligibility.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-indigo-50 rounded-lg shadow-md border-l-4 border-indigo-500">
                    <CheckCircle className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{item}</span>
                </div>
            ))}
        </div>
    </section>
);

const ADCodeDocumentsContent = () => (
    <section id="adcode-documents-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Documents Required for AD Code Registration</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            The documentation must verify your legal status as an exporter/importer and your bank account details for foreign exchange transactions.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {adCodeDocuments.map((doc, i) => (
                <DocumentBox key={i} doc={doc.doc} category={doc.detail} icon={doc.icon} />
            ))}
        </div>
    </section>
);

const ADCodeProcedureContent = () => (
    <section id="adcode-procedure-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Two-Step Procedure for AD Code Registration</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            AD Code registration involves coordination between your bank (to issue the code) and Customs (via the ICEGATE portal, to register the code against your port locations).
        </p>

        <div className="grid md:grid-cols-2 gap-8">
            {adCodeProcedureSteps.map((step, i) => (
                <ProcedureBox key={i} title={step.title} detail={step.detail} icon={Landmark} />
            ))}
        </div>

        <h4 className="text-2xl font-bold mb-6 mt-12 text-gray-800">ICEGATE Registration Verification (Customs)</h4>
        <div className="p-5 bg-[#E6F0F6] rounded-xl shadow-md border-l-4 border-[#022B50]">
            <p className="text-gray-700 font-medium">ICEGATE is the Indian Customs Electronic Gateway. Registration of your AD Code here is essential for **customs clearance**. Verification involves checking your **PAN registration** and the status of your **IE Code** against your declared port locations.</p>
        </div>
    </section>
);

const ADCodeConsequencesContent = () => (
    <section id="adcode-consequences-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Consequences of Not Registering for an AD Code</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            The penalties for non-compliance with the Foreign Exchange Management Act (FEMA) and related regulations are severe, impacting business operations and leading to legal complications.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
            {adCodeConsequences.map((item, i) => (
                <div key={i} className="p-5 bg-red-50 rounded-xl shadow-sm border border-red-500">
                    <item.icon className="w-6 h-6 text-red-700 mb-2" />
                    <h4 className="font-bold text-lg text-gray-800 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600 font-medium">{item.penalty}</p>
                </div>
            ))}
        </div>

        <h4 className="text-2xl font-bold mb-6 mt-12 text-gray-800">Key Ports / ICDs for AD Code Registration</h4>
        <div className="p-5 bg-amber-50 rounded-xl shadow-md border-l-4 border-amber-500">
            <p className="text-lg text-gray-700 font-semibold mb-2 flex items-center gap-2"><MapPin className="w-5 h-5"/> Ports & ICDs for Registration</p>
            <p className="text-gray-700">AD Code registration is required for all ports in India where exports/imports are conducted. This includes major ports like **Chennai, Mumbai, Kolkata, Visakhapatnam**, and numerous **Inland Container Depots (ICDs)**.</p>
        </div>
    </section>
);

const ADCodeWhyVakilsearch = () => (
    <section id="adcode-why-vakilsearch" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Why Vakilsearch for AD Code Registration?</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            We simplify the hybrid process (bank submission + online customs registration) by offering expert assistance and ensuring strict adherence to foreign exchange regulations.
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {whyVakilsearch.map((service, i) => {
                const Icon = i % 4 === 0 ? Scale : i % 4 === 1 ? Zap : i % 4 === 2 ? CheckCircle : Shield;
                const [title, detail] = service.detail.split(':').map(s => s.trim());
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

const ADCodeFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
    <section id="adcode-faqs-content" className="py-12 max-w-5xl mx-auto scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">FAQs on AD Code Registration</h3>

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
export default function ADCodeRegistrationPage() {
    const [activeTab, setActiveTab] = useState(adCodeTabs[0].id);
    const [faqOpen, setFaqOpen] = useState(null);

    const SCROLL_OFFSET = 120;

    // --- SCROLLSPY IMPLEMENTATION ---
    useEffect(() => {
        const sectionIds = adCodeTabs.map(tab => tab.id);

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
            {/* === HERO SECTION (AD Code Registration Specific) === */}
            <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">

                    {/* Background Image Section */}
                    <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
                        <img
                            src={BackgroundImageSrc}
                            alt="AD Code Registration background"
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
                                <span className="hover:underline cursor-pointer">IEC Registration</span> &gt;{" "}
                                <span className="font-semibold text-black">Ad Code Registration</span>
                            </nav>

                            {/* Badge */}
                            <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                                #1 Legal Service Provider In India
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-black">
                                AD Code Registration
                            </h1>

                            {/* Bullet Points with CheckCircle */}
                            <div className="space-y-4 mb-8 text-sm lg:text-base text-black">
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Expert-assisted AD Code registration to simplify your **import-export process**.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Stay informed with **real-time tracking** and instant application updates.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    **100% online process**, fast, and compliant registration by legal experts.
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
                                <h2 className="text-xl font-semibold mb-6 text-black text-center">AD Code Registration</h2>

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
                        {adCodeTabs.map((tab) => (
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
                    <ADCodeOverviewContent />
                    <ADCodeBenefitsContent />
                    <ADCodeEligibilityContent />
                    <ADCodeDocumentsContent />
                    <ADCodeProcedureContent />
                    <ADCodeConsequencesContent />
                    <ADCodeWhyVakilsearch />
                    <ADCodeFAQsContent faqs={adCodeFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
                </div>
            </div>

        </div>
    );
}