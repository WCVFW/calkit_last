import React, { useState, useEffect } from "react";
// axios is kept for convention, though not used in frontend logic
import axios from "axios";
import {
    ChevronDown,
    Zap, // For Fast/Efficient Process
    Briefcase, // For Business/Corporate Management System
    ArrowRight,
    Star,
    CheckCircle, // For Compliance/Checklist/Benefits
    FileText, // For document/Quality Manuals
    Scale, // For Standards/Accreditation/Compliance
    Handshake, // For Customer Trust/Collaboration
    TrendingUp, // For Growth/Global Recognition
    Lightbulb, // For Expert Guidance/Understanding
    Users, // For Employees/Stakeholders/Team
    DollarSign, // For Cost/Investment
    Clock, // For Timely Delivery/Validity/Renewal
    Landmark, // For BIS/NABCB/QCI/Legal Framework
    Shield, // For Risk Management/Security
    Globe, // For Global Recognition/Markets
    Calculator,
    RefreshCw// For Audits/Cost Breakdown
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from '../../assets/business.png'; // Reusing a general business image

// --- ISO CERTIFICATION STATIC DATA DEFINITIONS ---

const isoTabs = [
    { id: 'iso-overview-content', label: 'Overview' },
    { id: 'iso-standards-content', label: 'Standards' },
    { id: 'iso-benefits-content', label: 'Benefits' },
    { id: 'iso-framework-content', label: 'Legal Framework' },
    { id: 'iso-documents-content', label: 'Documents & Cost' },
    { id: 'iso-process-content', label: 'Process' },
    { id: 'iso-renewal-content', label: 'Renewal & Audits' },
    { id: 'iso-why-vakilsearch', label: 'Why Vakilsearch' },
    { id: 'iso-faqs-content', label: 'FAQ' },
];

const popularISOStandards = [
    { title: "ISO 9001:2015 – Quality Management (QMS)", icon: CheckCircle, detail: "Ensures consistency in meeting customer requirements and enhances satisfaction through effective quality management." },
    { title: "ISO 27001:2022 / 27001:2013 – Information Security (ISMS)", icon: Shield, detail: "Framework for establishing, implementing, and maintaining robust information security controls to protect sensitive data." },
    { title: "ISO 14001 – Environmental Management (EMS)", icon: Globe, detail: "Helps organisations reduce environmental impact, promoting sustainable operations and compliance with environmental regulations." },
    { title: "ISO 45001 – Health and Safety (OHSMS)", icon: Users, detail: "Aims to prevent work-related injuries and illnesses by implementing sound occupational health and safety practices." },
    { title: "ISO 13485:2016 – Medical Devices Quality Management", icon: Briefcase, detail: "Tailored for the medical device industry, ensuring the quality and regulatory compliance of medical products." },
    { title: "ISO 22301 – Business Continuity Management (BCMS)", icon: Clock, detail: "Ensures that an organisation can continue operations during and after disruptions (natural disasters, cyberattacks)." },
    { title: "ISO 50001 – Energy Management (EnMS)", icon: TrendingUp, detail: "Helps organisations manage and reduce energy use, leading to cost savings and a smaller environmental footprint." },
];

const isoBenefits = [
    { title: "Enhanced Credibility", icon: Zap, detail: "Being ISO certified enhances an organization's credibility, instilling confidence in customers and stakeholders." },
    { title: "Access to New Markets", icon: Globe, detail: "Certification opens doors to new markets, including government tenders that often require compliance with ISO standards." },
    { title: "Increased Customer Trust", icon: Handshake, detail: "Meeting recognized quality standards leads to increased customer satisfaction, vital for long-term business success." },
    { title: "Competitive Advantage", icon: TrendingUp, detail: "Allows companies to stand out from uncertified competitors, providing a significant competitive edge." },
    { title: "Compliance with Regulatory Requirements", icon: Scale, detail: "Especially important in strict industries (medical devices, food safety) where compliance with complex regulations is required." },
    { title: "Improved Business Efficiency & Risk Management", icon: Briefcase, detail: "Adopting best practices enhances operational efficiency, reduces waste, and establishes effective risk management strategies." },
];

const legalFramework = [
    { title: "Bureau of Indian Standards (BIS)", role: "The National Standards Body of India, responsible for setting and promoting standards across industries.", icon: Landmark },
    { title: "NABCB (Accreditation Body)", role: "Accredits organizations that certify businesses, ensuring they work according to international standards (IAF accredited).", icon: Scale },
    { title: "QCI (Quality Council of India)", role: "Promotes high standards and works with NABCB to ensure that certification bodies meet ISO standards.", icon: CheckCircle },
];

const isoDocuments = [
    { name: "Company Registration copy", icon: FileText },
    { name: "ID Proof of Directors", icon: Users },
    { name: "GST Copy", icon: FileText },
    { name: "The Scope of work", icon: Briefcase },
    { name: "Purchase and sale invoice", icon: DollarSign },
    { name: "Company board photos & Office videos (2-3 minutes)", icon: Zap },
    { name: "PAN card of the company", icon: FileText },
];

const isoProcessSteps = [
    "Step 1: Selecting the Right ISO Standard: Choose the appropriate standard (e.g., ISO 9001, 14001, 27001) based on your business goals and industry.",
    "Step 2: Choosing an Accredited Certification Body: Work with a recognized and accredited agency authorized to issue valid, IAF-accredited certificates.",
    "Step 3: Preparing for ISO Certification: Conduct an internal audit, gap analysis, staff training, and document your Quality Management System (QMS).",
    "Step 4: Submitting Your Application: Submit the formal application to the certification body, including necessary documentation and applicable fees.",
    "Step 5: Certification Audit: The audit is carried out in two stages (documentation review and on-site implementation verification).",
    "Step 6: Getting Your ISO Certificate: Upon successful completion of the audit and meeting all requirements, the official ISO certificate is issued.",
    "Step 7: Maintaining Certification and Surveillance Audits: Commit to regular internal and external surveillance audits (typically annually) to ensure ongoing compliance.",
];

const isoCostTime = {
    cost: "Starting at **₹1499**, depending on the scope of work, business size, and the selected standard. Additional charges may apply for expedited services.",
    timeBreakdown: [
        "First Draft: 3 to 5 working days (after document submission)",
        "Soft Copy Issuance: An additional 3 to 4 working days (after draft approval)",
        "Final Certificate: Delivered within 5 to 7 working days (after soft copy approval)",
        "Total Time Estimate: 13 to 15 working days (assumes timely client response)",
    ],
};

const isoRenewal = {
    renewalProcess: "ISO certifications typically last for **three years**. To renew, you must go through a renewal audit, which is similar to the initial certification audit, ensuring continued adherence to the standards.",
    auditFrequency: "Regular **surveillance audits** are usually conducted **annually or semi-annually** post-certification to verify ongoing compliance with the management system requirements.",
    documentation: "For renewal, you’ll need to provide updated documents, such as internal audit reports, process changes, and any corrective actions taken over the past three years.",
};

const isoFAQs = [
    { q: "What is ISO certification and how is it different from ISO registration?", a: "ISO **certification** confirms your business meets international standards through an audit by an accredited body. **Registration** refers to the formal process of applying and being officially listed as certified by a recognized registrar." },
    { q: "What are the benefits of ISO certification for Indian businesses?", a: "Benefits include **enhanced credibility**, **access to new markets** (including global tenders), increased **customer trust**, and **improved operational efficiency** through standardized processes." },
    { q: "How long is an ISO certificate valid?", a: "All IAF-accredited ISO certifications are typically valid for **three years** from the date of issue. They require renewal audits after this period and surveillance audits during the validity period." },
    { q: "Can an organization fail the ISO certification audit?", a: "Yes. An organization can fail if the auditor finds **major non-conformities**—instances where processes critically fail to meet the required ISO standard. These issues must be addressed through a corrective action plan." },
    { q: "What are the basic requirements to apply for ISO certification?", a: "Basic requirements include a legal business entity (Company Registration Copy, PAN), defining the scope of work, and providing financial/operational documents to demonstrate readiness for the audit." },
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

// --- TAB CONTENT COMPONENTS (ISO Certification Content) ---

const ISOOverviewContent = () => (
    <section id="iso-overview-content" className="py-12 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">ISO Certification - An Overview</h2>
        <p className="text-lg text-gray-700 mb-4 max-w-4xl">
            **ISO certification** is the process of proving that your business meets international standards, such as quality management or information security, through audits by an accredited certification body. **ISO registration** refers to being officially listed as certified by a recognized registrar.
        </p>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            It ensures **compliance with global standards**, builds **customer trust**, and enhances your market reputation. ISO helps businesses improve efficiency and credibility globally, often leading to better risk management and continuous improvement.
        </p>

        <h3 className="text-2xl font-bold mb-6 text-gray-800">Objectives of ISO Certification</h3>
        <div className="p-6 bg-[#E6F0F6] rounded-xl shadow-md border-l-4 border-[#022B50]">
            <p className="text-gray-700">Organizations pursue ISO certification to establish **standardized practices**, reduce **operational risks**, and build **lasting trust** with customers. It promotes quality management, continuous improvement, and business credibility through a globally recognized standard and benchmarks.</p>
        </div>
    </section>
);

const ISOStandardsContent = () => (
    <section id="iso-standards-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800">Popular ISO Standards for Business Certification</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            We offer services for various ISO standards tailored to support operational excellence and compliance. All standards are **IAF-accredited** and typically valid for **3 years** from the date of issue.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularISOStandards.map((standard, i) => (
                <FeatureBox key={i} title={standard.title} detail={standard.detail} icon={standard.icon} />
            ))}
        </div>
    </section>
);

const ISOBenefitsContent = () => (
    <section id="iso-benefits-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800">Importance and Benefits of ISO Certification for Businesses</h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isoBenefits.map((item, i) => (
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

const ISOLegalFrameworkContent = () => (
    <section id="iso-framework-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800">Legal Framework Governing ISO Certification in India</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            In India, a clear legal framework ensures that ISO certification processes meet international standards, overseen by key national bodies responsible for accreditation and quality control.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
            {legalFramework.map((body, i) => (
                <DetailItem
                    key={i}
                    title={body.title}
                    description={body.role}
                    icon={body.icon}
                />
            ))}
        </div>
        
        <p className="text-lg font-semibold text-gray-700 mt-8 max-w-4xl">
            **Compliance Requirements:** ISO compliance means aligning operations with ISO standards, undergoing regular evaluations by **accredited certification bodies** (recognized by NABCB/QCI), and engaging in **continuous improvement** through training and updates.
        </p>
    </section>
);

const ISODocumentsContent = () => (
    <section id="iso-documents-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Cost, Timeframe, and Documents Required for ISO Certification</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            The cost and duration of certification vary based on business size and scope, but advance planning and complete documentation are key to a smooth journey.
        </p>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">ISO Certification Cost and Timeframe Breakdown</h4>
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="p-6 bg-[#E6F0F6] rounded-xl shadow-md border-l-4 border-amber-500">
                <h5 className="font-bold text-xl text-gray-800 mb-3 flex items-center gap-2"><DollarSign className="w-5 h-5"/> Cost Overview</h5>
                <p className="text-lg text-gray-700 font-medium">{isoCostTime.cost}</p>
            </div>
            <div className="p-6 bg-[#E6F0F6] rounded-xl shadow-md border-l-4 border-amber-500">
                <h5 className="font-bold text-xl text-gray-800 mb-3 flex items-center gap-2"><Clock className="w-5 h-5"/> Timeframe Breakdown (Approx. 13-15 Working Days)</h5>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                    {isoCostTime.timeBreakdown.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </div>
        </div>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">Required Documentation Checklist</h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isoDocuments.map((doc, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                    <doc.icon className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 font-medium">{doc.name}</span>
                </div>
            ))}
        </div>
    </section>
);

const ISOProcessContent = () => (
    <section id="iso-process-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Step-by-Step ISO Certification Process in India</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            ISO certification involves a structured, multi-stage journey aimed at aligning your business practices with international quality benchmarks, starting from choosing the standard to securing the certificate.
        </p>

        <ol className="space-y-5 list-none border-l-2 border-[#022B50] pl-4">
            {isoProcessSteps.map((step, i) => (
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

const ISORenewalContent = () => (
    <section id="iso-renewal-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Maintaining, Renewing, and Surveillance Audits</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            ISO certification requires **ongoing commitment**. Regular audits and timely renewal are essential to maintain the certificate's validity and credibility.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                <h4 className="font-bold text-xl text-gray-800 mb-3 flex items-center gap-2"><RefreshCw className="w-5 h-5 text-indigo-500"/> Renewal and Validity</h4>
                <p className="text-gray-700 mb-4">{isoRenewal.renewalProcess}</p>
                <p className="text-sm text-gray-600">**Renewal Docs:** {isoRenewal.documentation}</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                <h4 className="font-bold text-xl text-gray-800 mb-3 flex items-center gap-2"><Calculator className="w-5 h-5 text-indigo-500"/> Surveillance Audits</h4>
                <p className="text-gray-700 mb-4">{isoRenewal.auditFrequency}</p>
                <p className="text-sm text-gray-600">**Purpose:** To check if the organization is still following the required standards, reviewing management system changes, and correcting previous issues.</p>
            </div>
        </div>
        <p className="text-lg font-semibold text-gray-700 mt-8 max-w-4xl">
            **Legal Recourse:** In case of disputes with the certification body, organizations can seek mediation, review contractual obligations, or pursue legal action as necessary.
        </p>
    </section>
);

const ISOWhyVakilsearch = () => (
    <section id="iso-why-vakilsearch" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Expert ISO Certification Support from Vakilsearch</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            Vakilsearch provides end-to-end ISO certification assistance, ensuring a seamless and compliant journey from document preparation to securing the final certificate.
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <FeatureBox title="End-to-End Support" detail="We guide you from document preparation and standard selection to audit coordination and securing the final certificate." icon={Handshake} />
            <FeatureBox title="Competitive & Transparent Pricing" detail="All-in-one ISO certification packages starting at ₹1499 with no hidden costs." icon={DollarSign} />
            <FeatureBox title="Faster Processing Time" detail="Our experienced team ensures quicker processing and faster turnaround, delivering your certificate in approx. 13-15 working days." icon={Clock} />
            <FeatureBox title="Compliance Assurance" detail="Ensures your business adheres to ISO standards and legal regulations, maintaining the authenticity and validity of your certificate." icon={Scale} />
        </div>
    </section>
);

const ISOFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
    <section id="iso-faqs-content" className="py-12 max-w-5xl mx-auto scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">FAQs for ISO Certification</h3>

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
export default function ISOCertificationPage() {
    const [activeTab, setActiveTab] = useState(isoTabs[0].id);
    const [faqOpen, setFaqOpen] = useState(null);

    const SCROLL_OFFSET = 120;

    // --- SCROLLSPY IMPLEMENTATION ---
    useEffect(() => {
        const sectionIds = isoTabs.map(tab => tab.id);

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
            {/* === HERO SECTION (ISO Certification Specific) === */}
            <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">

                    {/* Background Image Section */}
                    <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
                        <img
                            src={BackgroundImageSrc}
                            alt="ISO Certification background"
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
                                ISO Certification in India – Get Certified with Experts
                            </h1>

                            {/* Bullet Points with CheckCircle */}
                            <div className="space-y-4 mb-8 text-sm lg:text-base text-black">
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Get ISO certified online with **expert support, fast, simple, and reliable**.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Complete **ISO compliance, audits, and certification** assistance provided.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    All-in-one ISO certification packages starting at **₹1499** with guidance.
                                </p>
                            </div>
                            <p className="text-sm font-semibold text-gray-700">Know about ISO in 60 sec</p>

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
                                <h2 className="text-xl font-semibold mb-6 text-black text-center">Apply for ISO Certification</h2>

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
                                        Get Started Now
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
                        {isoTabs.map((tab) => (
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
                    <ISOOverviewContent />
                    <ISOStandardsContent />
                    <ISOBenefitsContent />
                    <ISOLegalFrameworkContent />
                    <ISODocumentsContent />
                    <ISOProcessContent />
                    <ISORenewalContent />
                    <ISOWhyVakilsearch />
                    <ISOFAQsContent faqs={isoFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
                </div>
            </div>

        </div>
    );
}