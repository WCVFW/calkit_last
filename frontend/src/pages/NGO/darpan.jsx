import React, { useState, useEffect } from "react";
// axios is kept for convention, though not used in frontend logic
import axios from "axios";
import {
    ChevronDown,
    Zap, // For Credibility/Trust/Fast Service
    Briefcase, // For Compliance/Documentation
    ArrowRight,
    Star,
    CheckCircle, // For Eligibility/Benefits/Checklist
    FileText, // For document/MOA/Trust Deed
    Scale, // For Transparency/Legal Compliance
    Handshake, // For Government Grants/Coordination
    TrendingUp, // For Funding/Growth
    Lightbulb, // For Expert Guidance/Updates
    Users, // For Trusts/Societies/Companies
    DollarSign, // For Grants/Financial Support
    Clock, // For Timely Delivery
    Landmark,
    BookOpen,
    MapPin,
    Globe,
    AlertTriangle // For NITI Aayog/Government
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from '../../assets/business.png'; // Reusing a general business image

// --- NGO DARPAN REGISTRATION STATIC DATA DEFINITIONS ---

const darpanTabs = [
    { id: 'darpan-overview-content', label: 'Overview' },
    { id: 'darpan-eligibility-content', label: 'Eligibility' },
    { id: 'darpan-benefits-content', label: 'Benefits' },
    { id: 'darpan-documents-content', label: 'Documents' },
    { id: 'darpan-process-content', label: 'Process' },
    { id: 'darpan-issues-content', label: 'Common Issues' },
    { id: 'darpan-why-vakilsearch', label: 'Why Choose Vakilsearch' },
    { id: 'darpan-faqs-content', label: "FAQs" },
];

const darpanEligibleEntities = [
    { title: "Trusts", detail: "Registered under the Indian Trusts Act.", icon: Landmark },
    { title: "Societies", detail: "Registered under the Societies Registration Act.", icon: Users },
    { title: "Section 8 Companies", detail: "Registered under the Indian Companies Act.", icon: Briefcase },
];

const darpanBenefits = [
    { title: "Eligibility for Government Grants", icon: DollarSign, detail: "NGOs can apply for government grants from various ministries and departments." },
    { title: "Official Recognition & Visibility", icon: Landmark, detail: "Registration gives your NGO visibility on the official NGO Darpan website, enhancing credibility." },
    { title: "Access to Government Schemes", icon: Handshake, detail: "Only registered NGOs on the portal can access and apply for specific government schemes." },
    { title: "Timely Updates from Ministries", icon: Lightbulb, detail: "Receive important updates and notifications directly from relevant government agencies." },
    { title: "Easier Documentation & Compliance", icon: FileText, detail: "Pre-verified details simplify future processes like FCRA information filing." },
    { title: "Enhanced Credibility & Transparency", icon: Zap, detail: "Increases trust with donors, partners, and the public due to government verification." },
];

const darpanDocuments = [
    { name: "NGO PAN Card", description: "Mandatory for verification.", icon: FileText },
    { name: "Registration Certificate", description: "From Trust Act, Societies Act, or Companies Act.", icon: FileText },
    { name: "MOA or Trust Deed", description: "Foundational document of NGO.", icon: BookOpen },
    { name: "Rules and Regulations", description: "Applicable for Societies and Section 8 Companies.", icon: BookOpen },
    { name: "Governing Body Details", description: "Including name, mobile number, email, Aadhaar card.", icon: Users },
    { name: "Contact Details", description: "Address, mobile number, email of the NGO.", icon: MapPin },
    { name: "FCRA Certificate (if applicable)", description: "For NGOs receiving foreign contributions.", icon: Globe },
    { name: "Annual Financial Statements", description: "For past 3 years, if applicable.", icon: DollarSign },
];

const darpanProcessSteps = [
    "Visit the NGO Darpan Portal: Go to the official NGO Darpan website and set up a login ID.",
    "Enter Organizational Details: Provide NGO name, registration number, address, etc.",
    "Upload Required Documents: Upload necessary documents (as listed above) in the correct format.",
    "Enter Governing Body Details: Include PAN, Aadhaar, and mobile numbers of all members (PAN and Aadhaar data must exactly match official records).",
    "Submit the Application: Once details are reviewed, submit for verification by NITI Aayog.",
    "Receive Darpan ID & Certificate: On approval, a unique Darpan ID is issued, and the certificate is available for download.",
];

const darpanCommonIssues = [
    { title: "Document Mismatch", issue: "Differences in PAN/Aadhaar vs. registered details cause delays.", help: "Vakilsearch pre-verifies documents to avoid mismatch.", icon: Scale },
    { title: "Verification Delays", issue: "Caused by incorrect entries or missing information.", help: "Our experts ensure accurate data entry and prompt follow-up.", icon: Clock },
    { title: "Rejected Applications", issue: "Due to incomplete forms or invalid documents.", help: "We assist with end-to-end review before submission.", icon: AlertTriangle },
    { title: "Technical Glitches", issue: "Occasional server errors or bugs on the portal.", help: "Our team coordinates with portal administrators for resolution.", icon: Lightbulb },
];

const darpanWhyVakilsearch = [
    { title: "Dedicated Support", detail: "End-to-end registration guidance from initial query to certificate issuance.", icon: Handshake },
    { title: "Accurate Documentation", detail: "Full assistance with all NGO Darpan registration documents, ensuring accurate and compliant uploads.", icon: Briefcase },
    { title: "Timely Delivery", detail: "Quick turnaround with tracking updates to ensure the fastest possible registration.", icon: Clock },
    { title: "100% Compliance", detail: "Ensures smooth approvals by adhering strictly to NITI Aayog's guidelines.", icon: CheckCircle },
    { title: "Trusted Service", detail: "Trusted by thousands of NGOs and professionals (Over 1 Lakh Clients Served).", icon: Zap },
];

const darpanFAQs = [
    { q: "Is NGO Darpan registration required for government grants?", a: "Yes, NGO Darpan registration is generally mandatory to apply for government grants and financial assistance from various ministries and departments." },
    { q: "How can I get my NGO Darpan certificate online?", a: "After successful registration, you log in to the official Darpan portal, navigate to the 'Certificates' section on your dashboard, and click 'Download NGO Darpan Certificate' as a PDF." },
    { q: "Can a Trust or Section 8 Company apply for Darpan registration?", a: "Yes, Trusts, Societies, and Section 8 Companies (registered under the respective Acts) are the eligible entities to apply for Darpan registration." },
    { q: "What is the purpose of getting a Darpan ID for NGOs?", a: "The Darpan ID is a unique identification number that provides official recognition and credibility, and simplifies interactions with various government departments and ministries." },
    { q: "Can I register on the Darpan portal without a PAN card?", a: "No, a valid PAN card of the NGO is mandatory for verification and successful Darpan registration." },
    { q: "What should I do if my NGO Darpan application is rejected?", a: "If rejected, you should review the reason provided by NITI Aayog, correct the errors (usually document mismatch or missing details), and resubmit the application with the corrected information." },
];

// --- REUSABLE COMPONENTS ---

// Reusing components from previous designs

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


// --- TAB CONTENT COMPONENTS (NGO Darpan Registration Content) ---

const DarpanOverviewContent = () => (
    <section id="darpan-overview-content" className="py-12 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Introduction to NGO Darpan Registration</h2>
        <p className="text-lg text-gray-700 mb-4 max-w-4xl">
            **NGO Darpan registration** is a highly beneficial step for non-governmental organizations (NGOs) in India. Managed by **NITI Aayog**, the portal offers a national database of verified NGOs, significantly enhancing **transparency** between the voluntary sector and the government.
        </p>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            Through Darpan registration, NGOs receive a unique **Darpan ID**, which is an **essential credential** for interactions with various government departments and ministries, especially when applying for grants and schemes.
        </p>

        <h3 className="text-2xl font-bold mb-6 text-gray-800">What is the NGO Darpan Portal?</h3>
        <div className="p-5 bg-[#E6F0F6] rounded-xl shadow-md border-l-4 border-[#022B50]">
            <p className="text-gray-700">The NGO Darpan portal is an online platform developed by NITI Aayog to streamline communication. It serves as a **single-window system** to simplify registration, ensuring improved transparency and accountability for accessing eligibility for **government schemes, financial support, and multiple grants**.</p>
        </div>
    </section>
);

const DarpanEligibilityContent = () => (
    <section id="darpan-eligibility-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Who is Eligible for NGO Darpan Registration?</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            Only non-profit entities formally registered under their respective Acts in India are eligible to apply for Darpan registration.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
            {darpanEligibleEntities.map((entity, i) => (
                <FeatureBox key={i} title={entity.title} detail={entity.detail} icon={entity.icon} />
            ))}
        </div>

        <div className="mt-8 p-4 bg-red-50 rounded-lg border-l-4 border-red-500 shadow-sm max-w-4xl">
            <p className="text-red-700 font-semibold">Note: A valid PAN card of the NGO is **mandatory** for successful registration and verification on the portal.</p>
        </div>
    </section>
);

const DarpanBenefitsContent = () => (
    <section id="darpan-benefits-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800">Benefits of Getting a Darpan Certificate (Darpan ID)</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            Obtaining a Darpan ID offers immediate and long-term strategic advantages for your NGO, making interactions with government and partners seamless.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {darpanBenefits.map((benefit, i) => (
                <DetailItem
                    key={i}
                    title={benefit.title}
                    description={benefit.detail}
                    icon={benefit.icon}
                />
            ))}
        </div>
    </section>
);

const DarpanDocumentsContent = () => (
    <section id="darpan-documents-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Documents Required for Darpan Registration</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            Accurate and verified documents are essential for a quick and successful application, ensuring that the NGO's information matches official government records.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {darpanDocuments.map((doc, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                    <doc.icon className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                    <div>
                        <p className="text-gray-800 font-medium">{doc.name}</p>
                        <p className="text-sm text-gray-600">{doc.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

const DarpanProcessContent = () => (
    <section id="darpan-process-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">NGO Darpan Registration Process – Step-by-Step</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            The process is managed entirely through the NITI Aayog portal. It is crucial to ensure that PAN and Aadhaar data of the governing body members **exactly match official records** to avoid processing delays.
        </p>

        <ol className="space-y-5 list-none border-l-2 border-[#022B50] pl-4 mb-12">
            {darpanProcessSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                    <div className="bg-[#022B50] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {i + 1}
                    </div>
                    <span className="text-gray-700 text-lg">{step}</span>
                </li>
            ))}
        </ol>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">How to Download NGO Darpan Certificate?</h4>
        <p className="text-lg text-gray-700 max-w-4xl">
            After successful registration and approval, the certificate is available in your dashboard.
        </p>
        <ul className="space-y-3 text-gray-700 max-w-4xl border-l-4 border-amber-500 pl-4 mt-4">
            <li className="flex items-start gap-2 list-none">
                <ArrowRight className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                <span>Log in to the official NGO Darpan portal.</span>
            </li>
            <li className="flex items-start gap-2 list-none">
                <ArrowRight className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                <span>Click on the profile dashboard, then navigate to the "Certificates" section.</span>
            </li>
            <li className="flex items-start gap-2 list-none">
                <ArrowRight className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                <span>Click "Download NGO Darpan Certificate." The certificate will be available as a downloadable PDF.</span>
            </li>
        </ul>
    </section>
);

const DarpanIssuesContent = () => (
    <section id="darpan-issues-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Common Issues in Darpan Registration & How We Help</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            Registration is often stalled by technical errors or mismatches in submitted data. Vakilsearch's expertise helps preempt and resolve these issues quickly.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
            {darpanCommonIssues.map((issue, i) => (
                <div key={i} className="p-5 bg-white rounded-xl shadow-lg border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <issue.icon className="w-6 h-6 text-red-500 flex-shrink-0" />
                        <h4 className="font-bold text-lg text-gray-800">{issue.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">**Issue:** {issue.issue}</p>
                    <p className="text-sm text-green-700 font-semibold">**Our Solution:** {issue.help}</p>
                </div>
            ))}
        </div>
    </section>
);

const DarpanWhyVakilsearch = () => (
    <section id="darpan-why-vakilsearch" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Why Choose Vakilsearch for NGO Darpan Registration?</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            We are the NGO Darpan registration experts, providing comprehensive support and proven reliability to ensure a successful application and certification.
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {darpanWhyVakilsearch.map((service, i) => {
                const Icon = service.icon || CheckCircle; // Defaulting icon if not explicitly set
                const [title, detail] = service.title ? [service.title, service.detail] : service.detail.split(':').map(s => s.trim());

                let CurrentIcon;
                if (service.title === "Dedicated Support") CurrentIcon = Handshake;
                else if (service.title === "Accurate Documentation") CurrentIcon = Briefcase;
                else if (service.title === "Timely Delivery") CurrentIcon = Clock;
                else if (service.title === "100% Compliance") CurrentIcon = CheckCircle;
                else if (service.title === "Trusted Service") CurrentIcon = Zap;
                else CurrentIcon = CheckCircle;

                return (
                    <div key={i} className="p-5 bg-indigo-50 rounded-xl shadow-sm border border-indigo-200 flex items-start gap-3">
                        <CurrentIcon className="w-6 h-6 text-[#022B50] mt-1 flex-shrink-0" />
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

const DarpanFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
    <section id="darpan-faqs-content" className="py-12 max-w-5xl mx-auto scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">Frequently Asked Questions (FAQs)</h3>

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
export default function NGODarpanRegistrationPage() {
    const [activeTab, setActiveTab] = useState(darpanTabs[0].id);
    const [faqOpen, setFaqOpen] = useState(null);

    const SCROLL_OFFSET = 120;

    // --- SCROLLSPY IMPLEMENTATION ---
    useEffect(() => {
        const sectionIds = darpanTabs.map(tab => tab.id);

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
            {/* === HERO SECTION (NGO Darpan Registration Specific) === */}
            <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">

                    {/* Background Image Section */}
                    <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
                        <img
                            src={BackgroundImageSrc}
                            alt="NGO Darpan Registration background"
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
                                <span className="font-semibold text-black">Darpan Registration</span>
                            </nav>

                            {/* Badge */}
                            <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                                #1 Legal Service Provider In India
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-black">
                                NGO Darpan Registration Online
                            </h1>

                            {/* Bullet Points with CheckCircle */}
                            <div className="space-y-4 mb-8 text-sm lg:text-base text-black">
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Expert-assisted **100% online** NGO Darpan registration process.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Documentation and application handled by **experts**.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Trusted by 5000+ trusts and NGOs for **fast and reliable service**.
                                </p>
                            </div>
                            <p className="text-sm font-semibold text-gray-700">Complete guide on NGO Darpan Registration</p>

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
                                <h2 className="text-xl font-semibold mb-6 text-black text-center">NGO Darpan Registration</h2>

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
                        {darpanTabs.map((tab) => (
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
                    <DarpanOverviewContent />
                    <DarpanEligibilityContent />
                    <DarpanBenefitsContent />
                    <DarpanDocumentsContent />
                    <DarpanProcessContent />
                    <DarpanIssuesContent />
                    <DarpanWhyVakilsearch />
                    <DarpanFAQsContent faqs={darpanFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
                </div>
            </div>

        </div>
    );
}