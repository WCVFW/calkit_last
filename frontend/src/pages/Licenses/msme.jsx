import React, { useState, useEffect } from "react";
// axios is kept for convention, though not used in frontend logic
import axios from "axios";
import {
    ChevronDown,
    Zap, // For Fast, error-free process
    Briefcase, // For Business Information/Process
    ArrowRight,
    Star,
    CheckCircle, // For Checklist/Compliance/Benefits
    FileText, // For document/Form
    Scale, // For Classification/Regulation
    Handshake, // For Legal Assistance/Support
    TrendingUp, // For Growth/Benefits
    Users, // For Entities/Employment
    DollarSign, // For Financials/Investment/Turnover
    Clock, // For Timely Filing
    Landmark, // For Government Recognition/MSME Ministry
    BookOpen,
    Calculator,
    Lightbulb // For Acts/Rules
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from '../../assets/business.png'; // Reusing a general business image

// --- MSME REGISTRATION STATIC DATA DEFINITIONS ---

const msmeTabs = [
    { id: 'msme-overview-content', label: 'Overview' },
    { id: 'msme-classification-content', label: 'Classification' },
    { id: 'msme-benefits-content', label: 'Benefits' },
    { id: 'msme-documents-content', label: 'Documents' },
    { id: 'msme-features-content', label: 'Features' },
    { id: 'msme-process-content', label: 'Registration Process' },
    { id: 'msme-why-vakilsearch', label: 'How Vakilsearch?' },
    { id: 'msme-faqs-content', label: 'FAQs' },
];

const msmeClassification = [
    { category: "Micro", investment: "Up to Rs. 1 crore", turnover: "Up to Rs. 5 crore" },
    { category: "Small", investment: "Up to Rs. 10 crore", turnover: "Up to Rs. 50 crore" },
    { category: "Medium", investment: "Up to Rs. 20 crore", turnover: "Up to Rs. 250 crore" },
];

const msmeDocuments = [
    { title: "Aadhar Number", detail: "The Aadhaar number of the business owner or authorized signatory.", icon: Users },
    { title: "PAN Number", detail: "The Permanent Account Number (PAN) of the business entity.", icon: FileText },
    { title: "Bank Account Details", detail: "Bank account number and IFSC code of the business's primary bank account.", icon: DollarSign },
    { title: "Investment Details", detail: "Total value of investment in Plant & Machinery or Equipment.", icon: Calculator },
    { title: "Turnover Details", detail: "Annual turnover as per the new MSME definition and tax returns.", icon: TrendingUp },
    { title: "Business Address & Activity", detail: "Address of the business and NIC 2-digit code for the main activity.", icon: Briefcase },
];

const msmeBenefits = [
    { title: "Easier Access to Credit", icon: DollarSign, detail: "Avail cheaper credit facilities and collateral-free loans under the CGTMSE scheme from banks." },
    { title: "Access to Government Schemes", icon: Landmark, detail: "Eligible for various government schemes, subsidies, and financial assistance packages." },
    { title: "Protection of IPR", icon: Scale, detail: "Helps protect Intellectual Property Rights (IPR), including trademarks and patents, often with discounts on registration fees." },
    { title: "Priority for Government Tenders", icon: CheckCircle, detail: "Enables businesses to participate in government tenders and contracts, often with preferential procurement policies." },
    { title: "Protection Against Delayed Payments", icon: Clock, detail: "Access specialized dispute resolution mechanisms, such as MSME tribunals, for timely payment redressal." },
    { title: "Subsidies & Tax Benefits", icon: TrendingUp, detail: "Benefits from subsidies for technology upgradation and extended tax benefits (e.g., Extended MAT Credit)." },
];

const udyamFeatures = [
    "Digital Process: Fully digitalized and paperless registration process.",
    "Free of Cost: The registration process is completely free, with no fees involved on the official portal.",
    "Instant Certificate: An e-certificate, 'Udyam Registration Certificate,' is issued online upon registration completion.",
    "No Document Upload: No need to upload any documents during registration (based on Aadhaar, PAN, and GSTIN auto-retrieval).",
    "Integration with Tax Systems: Integrated with Income Tax and GSTIN systems for automatic data retrieval.",
    "Single Registration: Only one Udyam Registration is allowed per enterprise.",
    "Permanent Registration: Provides a permanent identification number for enterprises with no mandatory renewal.",
    "QR Code Verification: The dynamic QR code on the certificate enables easy access to enterprise details for verification.",
];

const msmeRegistrationProcess = [
    "Access the Udyam Registration Portal: Visit the official portal and choose the appropriate option (New Entrepreneur or Existing UAM holder).",
    "Aadhaar Verification: Enter the Aadhaar number and the entrepreneur's name, then verify via OTP.",
    "PAN & GSTIN Verification: Enter the Type of Organisation and PAN Number to validate details from government databases.",
    "Form Completion: Fill the Udyam Registration form with personal details, enterprise information, and employment details.",
    "Classification Data: Enter the Investment in Plant & Machinery/Equipment and Annual Turnover details for MSME classification.",
    "Final Submission: Submit the form using the Final OTP. The Udyam Registration Certificate will be sent via email upon approval.",
];

const howVakilsearchHelps = [
    { title: "Expertise & Compliance", detail: "Vakilsearch has a team of experienced legal professionals who specialize in MSME registration and ensuring compliance with the latest government regulations.", icon: Lightbulb },
    { title: "Accuracy Guarantee", detail: "Our professionals ensure accurate data entry and documentation, reducing the risk of errors that could lead to delays or rejections during the filing process.", icon: CheckCircle },
    { title: "Time and Cost Savings", detail: "By outsourcing the registration process, you save valuable time and resources, allowing you to focus on other core aspects of your business.", icon: Clock },
    { title: "Convenience & Support", detail: "Our online platform simplifies the process, making it easy to navigate, and provides support and guidance throughout the required steps.", icon: Handshake },
];

const msmeFAQs = [
    { q: "What is the role of the Ministry of MSME?", a: "The Ministry of MSME is responsible for formulating and administering rules, regulations, and laws relating to Micro, Small, and Medium Enterprises in India to promote their growth and competitiveness." },
    { q: "I came across 'fees for Udyam registration file.' Is there a charge?", a: "No. **Udyam Registration is absolutely free** on the official government portal. Any charge you see is a professional fee for expert-assisted filing services." },
    { q: "What benefits does Udyog Aadhaar registration provide to MSMEs?", a: "Udyog Aadhaar (UAM) is the old system; the current system is Udyam. Both provide access to cheaper loans, government tenders, subsidies, and tax benefits." },
    { q: "Why is the Aadhaar number significant in MSME registration?", a: "The Aadhaar number is the **primary identification key** for Udyam Registration. It is used to verify the identity of the entrepreneur and automatically fetch related PAN/GST data from government databases." },
    { q: "How long does it take to obtain Udyam Registration?", a: "If all your details (Aadhaar, PAN, GST) are accurate and linked, the process itself is instant, and the **e-certificate is issued immediately** upon successful submission." },
    { q: "Who is eligible to apply for MSME registration?", a: "Any enterprise (Proprietorship, HUF, Partnership, Company, etc.) engaged in manufacturing, processing, or services that meets the new criteria for Investment and Annual Turnover (Micro, Small, or Medium) can apply." },
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

// --- TAB CONTENT COMPONENTS (MSME Registration Content) ---

const MSMEOverviewContent = () => (
    <section id="msme-overview-content" className="py-12 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">MSME (Udyam) Registration - Overview</h2>
        <p className="text-lg text-gray-700 mb-4 max-w-4xl">
            In India, MSME registration (now officially known as **Udyam Registration**) is a government initiative to provide formal recognition to Micro, Small, and Medium Enterprises. These enterprises, often regarded as the **backbone of the nation's economy**, gain access to a domain of benefits curated by the government for their establishment and growth.
        </p>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            The process is fully online, paperless, and provides the business with a permanent **Udyam Registration Number (URN)**. The classification is based on composite criteria of Investment and Annual Turnover.
        </p>

        <h3 className="text-2xl font-bold mb-6 text-gray-800">Key Details in the MSME Registration Form (Udyam)</h3>
        <div className="p-6 bg-[#E6F0F6] rounded-xl shadow-md border-l-4 border-[#022B50]">
            <p className="text-gray-700 font-medium">When filling out the form, mandatory information includes: Legal name, Type of business entity, **Aadhaar/PAN** of the owner/signatory, **Investment** in Plant & Machinery/Equipment, and **Annual Turnover**. This information is verified against Income Tax and GSTIN records.</p>
        </div>
    </section>
);

const MSMEClassificationContent = () => (
    <section id="msme-classification-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">MSME Classification Criteria (Investment and Turnover)</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            The MSME classification is now based on a composite criterion where both investment in plant/machinery and annual turnover must fall within the specified limits.
        </p>

        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-[#E6F0F6]">
                    <tr>
                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Category</th>
                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Investment in Plant & Machinery/Equipment</th>
                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Annual Turnover</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {msmeClassification.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-4 py-3 text-sm font-semibold text-gray-800">{row.category}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{row.investment}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{row.turnover}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </section>
);

const MSMEBenefitsContent = () => (
    <section id="msme-benefits-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800">Key Benefits of MSME (Udyam) Registration</h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {msmeBenefits.map((item, i) => (
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

const MSMEDocumentsContent = () => (
    <section id="msme-documents-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Documents Required for Udyam Registration</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            Udyam Registration is paperless. However, you must provide the following essential details which are verified against government databases (Income Tax, GST, and Aadhaar).
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {msmeDocuments.map((doc, i) => (
                <DetailItem key={i} title={doc.title} description={doc.detail} icon={doc.icon} />
            ))}
        </div>
    </section>
);

const MSMEFeaturesContent = () => (
    <section id="msme-features-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Salient Features of Udyam Registration (The New MSME System)</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            The Udyam portal introduces several features designed for maximum **ease of doing business** and streamlined integration with India's tax systems.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {udyamFeatures.map((feature, i) => (
                <div key={i} className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                </div>
            ))}
        </div>
    </section>
);

const MSMERegistrationProcess = () => (
    <section id="msme-process-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Step-by-Step Udyam Registration Process</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            The process is handled on the official Udyam Portal. Whether you are a new entrepreneur or re-registering from the old UAM system, the steps are streamlined.
        </p>

        <ol className="space-y-5 list-none border-l-2 border-[#022B50] pl-4">
            {msmeRegistrationProcess.map((step, i) => (
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

const MSMEWhyVakilsearch = () => (
    <section id="msme-why-vakilsearch" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">How Vakilsearch can help in MSME Registration?</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            Vakilsearch ensures your MSME registration is seamless, accurate, and compliant, allowing you to quickly secure your Udyam Registration Number and begin accessing government benefits.
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {howVakilsearchHelps.map((service, i) => (
                <div key={i} className="p-5 bg-indigo-50 rounded-xl shadow-sm border border-indigo-200 flex items-start gap-3">
                    <service.icon className="w-6 h-6 text-[#022B50] mt-1 flex-shrink-0" />
                    <div>
                        <h4 className="font-bold text-lg text-gray-800 mb-1">{service.title}</h4>
                        <p className="text-sm text-gray-600">{service.detail}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

const MSMEFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
    <section id="msme-faqs-content" className="py-12 max-w-5xl mx-auto scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">FAQs on MSME Registration</h3>

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
export default function MSMERegistrationPage() {
    const [activeTab, setActiveTab] = useState(msmeTabs[0].id);
    const [faqOpen, setFaqOpen] = useState(null);

    const SCROLL_OFFSET = 120;

    // --- SCROLLSPY IMPLEMENTATION ---
    useEffect(() => {
        const sectionIds = msmeTabs.map(tab => tab.id);

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
            {/* === HERO SECTION (MSME Registration Specific) === */}
            <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">

                    {/* Background Image Section */}
                    <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
                        <img
                            src={BackgroundImageSrc}
                            alt="MSME Registration background"
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
                                <span className="hover:underline cursor-pointer">Udyam</span> &gt;{" "}
                                <span className="font-semibold text-black">Msme</span>
                            </nav>

                            {/* Badge */}
                            <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                                #1 Legal Service Provider In India
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-black">
                                MSME Registration
                            </h1>

                            {/* Bullet Points with CheckCircle */}
                            <div className="space-y-4 mb-8 text-sm lg:text-base text-black">
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Give your startup official **government recognition** through MSME registration. T&C*
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Expert legal help for smooth **documentation, filing, and full compliance**.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    **Fast, error-free process** supported by top legal professionals.
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
                                <h2 className="text-xl font-semibold mb-6 text-black text-center">Get Legal Assistance</h2>

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
                        {msmeTabs.map((tab) => (
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
                    <MSMEOverviewContent />
                    <MSMEClassificationContent />
                    <MSMEBenefitsContent />
                    <MSMEDocumentsContent />
                    <MSMEFeaturesContent />
                    <MSMERegistrationProcess />
                    <MSMEWhyVakilsearch />
                    <MSMEFAQsContent faqs={msmeFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
                </div>
            </div>

        </div>
    );
}