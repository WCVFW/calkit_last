import React, { useState, useEffect } from "react";
// axios is kept for convention, though not used in frontend logic
import axios from "axios";
import {
    ChevronDown,
    Zap, // For Efficiency/Safety/Prestige
    Briefcase, // For Business/Factory Production/Conformity Assessment
    ArrowRight,
    Star,
    CheckCircle, // For Checklist/Compliance/Quality Mark
    FileText, // For document/Test Reports
    Scale, // For Standards/Regulation/Quality
    Handshake, // For Consumer Trust/Market Access
    TrendingUp, // For Growth/Cost Reduction
    Lightbulb, // For Guidance/Quality Culture
    Users, // For Consumer Protection
    DollarSign, // For Fees/Cost Reduction
    Clock, // For Validity/Renewal/Timely Process
    Landmark,
    Globe,
    MapPin,
    RefreshCw,
    Calculator,
    AlertTriangle // For BIS/National Standards Body
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from '../../assets/business.png'; // Reusing a general business image

// --- BIS REGISTRATION STATIC DATA DEFINITIONS ---

const bisTabs = [
    { id: 'bis-overview-content', label: 'Overview' },
    { id: 'bis-benefits-content', label: 'Benefits' },
    { id: 'bis-types-content', label: 'Schemes & Types' },
    { id: 'bis-documents-content', label: 'Documents Required' },
    { id: 'bis-process-content', label: 'Registration Process' },
    { id: 'bis-validity-content', label: 'Validity and Renewal' },
    { id: 'bis-why-vakilsearch', label: 'Why Vakilsearch' },
    { id: 'bis-faqs-content', label: "FAQ's" },
];

const bisRoles = [
    { title: "Formulation of Standards", icon: Landmark, detail: "Formulates and publishes Indian Standards (IS) defining quality parameters, safety requirements, and performance benchmarks." },
    { title: "Certification Services", icon: CheckCircle, detail: "Provides mandatory and voluntary certification schemes, allowing products to display the prestigious BIS Standard Mark." },
    { title: "Conformity Assessment & Audits", icon: Briefcase, detail: "Conducts product testing, factory audits, and verification of quality management systems to ensure consistency." },
    { title: "Consumer Protection", icon: Users, detail: "Standards and certifications enhance consumer confidence by providing assurance of product reliability, safety, and durability." },
];

const bisCertificationSchemes = [
    { type: "Mandatory Certification", detail: "Certain products (Electronics, IT, Cement, Steel, etc.) must obtain mandatory BIS certification before they can be sold in the Indian market.", icon: Scale },
    { type: "Voluntary Certification", detail: "For products not under mandatory control but wish to demonstrate adherence to Indian standards, enhancing consumer confidence and market competitiveness.", icon: Zap },
];

const compulsoryProducts = [
    "Electronics and IT Goods",
    "Automobile Components",
    "Cement and Building Materials",
    "Household and Electrical Appliances",
    "Food and Edible Products",
    "Medical Devices",
    "Steel Products",
    "Toys and Educational Items",
];

const bisBenefits = [
    { title: "Enhanced Product Quality & TQM", icon: CheckCircle, detail: "Provides a framework for implementing Total Quality Management (TQM) practices, ensuring consistent product quality and optimization." },
    { title: "Resource Optimization & Cost Reduction", icon: TrendingUp, detail: "Adherence to standards streamlines operations, reduces waste, and eliminates unnecessary overhead expenses." },
    { title: "Assurance of Product Quality", icon: Handshake, detail: "The BIS Standard Mark serves as credible proof of product quality, reliability, and safety, enhancing consumer confidence and loyalty." },
    { title: "Global Market Access", icon: Globe, detail: "Facilitates global recognition and compliance with international quality standards, increasing export opportunities." },
    { title: "Enhanced Market Reputation", icon: Zap, detail: "Contributes to building a strong market reputation by demonstrating commitment to quality, compliance, and customer satisfaction." },
    { title: "Customized Quality Management", icon: Lightbulb, detail: "Encourages firms to implement customized quality management systems tailored to their specific business needs." },
];

const bisDocuments = [
    { title: "Product Test Reports", detail: "Conducted by BIS-recognized laboratories, verifying compliance with relevant IS codes.", icon: FileText },
    { title: "Factory Production Control Plan", detail: "Outlines quality control measures during manufacturing to ensure consistent product quality.", icon: Briefcase },
    { title: "Trademark/Logo Authorization", detail: "If applicable, authorization to use trademarks or logos on certified products.", icon: FileText },
    { title: "Proof of Manufacturer's Address", detail: "Document confirming the location of manufacturing facilities.", icon: MapPin },
    { title: "Proof of Payment", detail: "Receipt or proof of payment for application and testing fees.", icon: DollarSign },
    { title: "Application Form", detail: "Includes product description, manufacturing process, and intended use.", icon: FileText },
];

const bisRegistrationProcess = [
    "Product Identification: Decide if your product falls under the mandatory BIS registration category.",
    "Application Submission: Complete the necessary application forms and submit them to BIS along with required documents.",
    "Document Verification: BIS verifies the submitted documents for completeness and accuracy.",
    "Factory Inspection: A BIS inspector visits your manufacturing facility to assess compliance with standards.",
    "Product Testing: Samples of your product are sent for testing in an accredited laboratory.",
    "Certification Issuance: If the product meets the required standards, BIS issues a license and allows the use of the BIS mark.",
    "Surveillance: Regular inspections and product testing are conducted to ensure ongoing compliance.",
];

const bisValidityRenewal = [
    { title: "Initial Validity", detail: "Typically, initial BIS certification is valid for **one to five years**, as determined by BIS standards and regulations.", icon: Clock },
    { title: "Renewal Requirement", detail: "Renewal is required before the expiry of the current certificate. Manufacturers must submit **updated test reports and documentation** to demonstrate ongoing compliance.", icon: RefreshCw },
    { title: "Surveillance Audits", detail: "Regular surveillance audits are conducted (post-certification) to maintain the BIS status and ensure continued adherence to relevant standards.", icon: Calculator },
];

const bisWhyVakilsearch = [
    "Expert Guidance: Complete support throughout the BIS registration and certification process.",
    "Accuracy & Compliance: Ensures accurate data entry and documentation, reducing the risk of delays or rejections.",
    "Fast Processing: Streamlined process leveraging technology for quick filing and processing.",
    "End-to-End Assistance: Helps with product identification, documentation, factory inspection readiness, and final certificate issuance.",
];

const bisFAQs = [
    { q: "What is a BIS process?", a: "The BIS process involves a product or system going through formulation, mandatory/voluntary certification, and conformity assessment (testing and inspection) to ensure it meets the Indian Standards (IS) for quality, safety, and reliability." },
    { q: "What is a Compulsory Registration Scheme (CRS)?", a: "CRS is one of the mandatory certification schemes under BIS for products like electronic and IT goods. Products must be tested and registered before they can be sold in the Indian market." },
    { q: "How much does BIS certification cost?", a: "The cost varies widely based on the product type, testing required, factory size, and professional fees. Our services start at **₹4,500** plus government fees, testing charges, and auditing costs." },
    { q: "How to check if a product is BIS-certified?", a: "You can check the authenticity of a product's certification and validity of a license by visiting the official BIS website or using the official BIS mobile app, entering the license number or product details." },
    { q: "What is the validity of a BIS Certificate?", a: "The validity period typically ranges from **one to five years**, depending on the product category. Renewal is mandatory before expiry and requires submission of updated compliance documentation." },
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


// --- TAB CONTENT COMPONENTS (BIS Registration Content) ---

const BISOverviewContent = () => (
    <section id="bis-overview-content" className="py-12 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">BIS Registration and Certification - Overview</h2>
        <p className="text-lg text-gray-700 mb-4 max-w-4xl">
            The **Bureau of Indian Standards (BIS)** is the national standards body of India, established under the **BIS Act, 2016**. It is responsible for formulating and implementing standards across various sectors to ensure the **quality, safety, and reliability** of products and services.
        </p>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            The Act empowers BIS to establish benchmarks for goods, enhancing consumer protection and promoting Indian products in domestic and international markets. Products meeting BIS standards are eligible to display the prestigious **BIS Standard Mark**.
        </p>

        <h3 className="text-2xl font-bold mb-6 text-gray-800">Role of BIS as the National Standards Body</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bisRoles.map((role, i) => (
                <DetailItem key={i} title={role.title} description={role.detail} icon={role.icon} />
            ))}
        </div>
    </section>
);

const BISBenefitsContent = () => (
    <section id="bis-benefits-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800">Benefits of BIS Certification (ISI Mark)</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            The BIS Standard Mark serves as a symbol of trust for consumers and offers numerous advantages to businesses aiming to enhance quality, market competitiveness, and efficiency.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bisBenefits.map((item, i) => (
                <DetailItem key={i} title={item.title} description={item.detail} icon={item.icon} />
            ))}
        </div>
    </section>
);

const BISTypesContent = () => (
    <section id="bis-types-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Types of BIS Certification Schemes</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            BIS operates two primary schemes to ensure compliance with Indian Standards. It is crucial to determine if your product falls under the Mandatory Certification scheme.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
            {bisCertificationSchemes.map((scheme, i) => (
                <FeatureBox key={i} title={scheme.type} detail={scheme.detail} icon={scheme.icon} />
            ))}
        </div>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">Products Covered Under Compulsory Certification</h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-700 max-w-5xl">
            {compulsoryProducts.map((product, i) => (
                <div key={i} className="flex items-start gap-2 p-3 bg-red-50 rounded-lg shadow-sm border border-red-200">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 font-medium">{product}</span>
                </div>
            ))}
        </div>
    </section>
);

const BISDocumentsContent = () => (
    <section id="bis-documents-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Documents Required for BIS Certification</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            To apply for a BIS license, manufacturers must submit a detailed set of documents, primarily focused on verifying the product's compliance and the factory's quality control measures.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bisDocuments.map((doc, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-md border-l-4 border-red-500">
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

const BISProcessContent = () => (
    <section id="bis-process-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">BIS Registration Process - Step-by-Step</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            The process ensures that products comply with Indian quality standards through rigorous document verification, factory inspection, and testing in accredited laboratories.
        </p>

        <ol className="space-y-5 list-none border-l-2 border-[#022B50] pl-4">
            {bisRegistrationProcess.map((step, i) => (
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

const BISValidityContent = () => (
    <section id="bis-validity-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Validity and Renewal of BIS Certification</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            Maintaining BIS compliance requires adherence to the validity period and mandatory renewal processes, which involve updated documentation and continued product testing.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
            {bisValidityRenewal.map((item, i) => (
                <FeatureBox key={i} title={item.title} detail={item.detail} icon={item.icon} />
            ))}
        </div>
    </section>
);

const BISWhyVakilsearch = () => (
    <section id="bis-why-vakilsearch" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Why Vakilsearch for BIS Registration and Certification?</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            We provide specialized support to navigate the complex BIS requirements, ensuring your product gets the ISI mark quickly, compliantly, and with fewer errors.
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {bisWhyVakilsearch.map((service, i) => {
                const Icon = i % 4 === 0 ? Lightbulb : i % 4 === 1 ? CheckCircle : i % 4 === 2 ? Zap : Briefcase;
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

const BISFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
    <section id="bis-faqs-content" className="py-12 max-w-5xl mx-auto scroll-mt-24">
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
export default function BISRegistrationPage() {
    const [activeTab, setActiveTab] = useState(bisTabs[0].id);
    const [faqOpen, setFaqOpen] = useState(null);

    const SCROLL_OFFSET = 120;

    // --- SCROLLSPY IMPLEMENTATION ---
    useEffect(() => {
        const sectionIds = bisTabs.map(tab => tab.id);

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
            {/* === HERO SECTION (BIS Registration Specific) === */}
            <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">

                    {/* Background Image Section */}
                    <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
                        <img
                            src={BackgroundImageSrc}
                            alt="BIS Registration background"
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
                                <span className="font-semibold text-black">ISO Certification</span>
                            </nav>

                            {/* Badge */}
                            <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                                #1 Legal Service Provider In India
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-black">
                                BIS Registration and Certification
                            </h1>

                            {/* Bullet Points with CheckCircle */}
                            <div className="space-y-4 mb-8 text-sm lg:text-base text-black">
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Boost your product credibility with an **ISI mark**. Now @ **₹4,500**.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Expert support throughout the **BIS registration and certification process**.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Ensure quality compliance to build trust and expand your market reach aptly.
                                </p>
                            </div>
                            <p className="text-sm font-semibold text-gray-700">View Sample Certificate</p>

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
                                <h2 className="text-xl font-semibold mb-6 text-black text-center">BIS Registration and Certification</h2>

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
                                        Talk to Our Expert
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
                        {bisTabs.map((tab) => (
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
                    <BISOverviewContent />
                    <BISBenefitsContent />
                    <BISTypesContent />
                    <BISDocumentsContent />
                    <BISProcessContent />
                    <BISValidityContent />
                    <BISWhyVakilsearch />
                    <BISFAQsContent faqs={bisFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
                </div>
            </div>

        </div>
    );
}