import React, { useState, useEffect } from "react";
// axios is kept for convention, though not used in frontend logic
import axios from "axios";
import {
    ChevronDown,
    Zap, // For Efficiency/Clarity
    Briefcase, // For MCA/Corporate/Compliance
    ArrowRight,
    Star,
    CheckCircle, // For Checklist/Benefits/Compliance
    FileText, // For document/Form CSR-1
    Scale, // For Legal Clarity/Compliance
    Handshake, // For Collaboration/Partnerships
    TrendingUp, // For Funding/Resources
    Lightbulb, // For Expert Guidance/Updates
    Users, // For Entities/Governing Body
    DollarSign, // For Cost/Funding
    Clock, // For Timeline/Efficiency
    Landmark, // For MCA Portal/Government
    BookOpen, // For Law Governing
    Shield, // For Trust/Accountability
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from '../../assets/business.png'; // Reusing a general business image

// --- CSR-1 REGISTRATION STATIC DATA DEFINITIONS ---

const csr1Tabs = [
    { id: 'csr1-overview-content', label: 'Overview' },
    { id: 'csr1-eligibility-content', label: 'Eligibility' },
    { id: 'csr1-documents-content', label: 'Documents & Types' },
    { id: 'csr1-process-content', label: 'Registration Process' },
    { id: 'csr1-law-purpose-content', label: 'Law & Benefits' },
    { id: 'csr1-status-fees-content', label: 'Status & Fees' },
    { id: 'csr1-faqs-content', label: "FAQs" },
];

const eligibilityCriteria = [
    "Entity type: Must be a Section 8 company, public trust, or society.",
    "Registration: Must be registered under Section 12A and 80G of the Income Tax Act.",
    "Track record: A proven track record of at least 3 years in undertaking relevant social, environmental, or developmental activities is advisable.",
    "Governance: Must have a sound governance structure with transparent financial management practices.",
    "Compliance: Must be compliant with all applicable laws and regulations.",
];

const eligibleNGOTypes = [
    { title: "Section 8 Companies", detail: "Incorporated under the Companies Act, 2013, with charitable or non-profit objectives.", icon: Briefcase },
    { title: "Public Trusts", detail: "Registered under the Indian Trusts Act, 1882, or any other relevant law for public charitable purposes.", icon: Landmark },
    { title: "Societies (12A & 80G)", detail: "Registered under the Societies Registration Act, 1860, and must have received Income Tax exemption under Section 12A and 80G.", icon: Scale },
];

const csr1Documents = [
    { title: "Registration Certificate", detail: "Copy of the entity's registration certificate (MoA, Trust Deed, etc.).", icon: FileText },
    { title: "PAN Card", detail: "Copy of the entity's PAN card.", icon: FileText },
    { title: "12A and 80G Certificates", detail: "Copies of the Income Tax exemption certificates (if applicable).", icon: TrendingUp },
    { title: "NGO Darpan ID", detail: "If the entity is registered on the NGO Darpan portal.", icon: Landmark },
    { title: "Digital Signature Certificate (DSC)", detail: "DSC of the authorized person signing the form, along with their PAN card.", icon: Zap },
    { title: "Resolution Copy", detail: "Copy of the resolution authorizing the person to sign the form, along with the resolution number and date.", icon: Briefcase },
];

const csr1Contents = [
    "Part A - Basic Information: Entity Name, State of Registration, Contact Details, Authorized Person Details, Registration Number, PAN, Website, Date of Registration, Address, Names of Directors/Trustees/CEO/Chairperson.",
    "Part B - Subsidiary and Other Entities (if applicable): Details of subsidiaries and other entities included in CSR activities.",
    "Part C - Certification: Declaration by authorized person and Certificate by practising professional (CA, CS, or Cost Accountant).",
];

const csr1FilingProcess = [
    "Access the MCA Portal: Visit the Ministry of Corporate Affairs (MCA) portal and download eForm CSR-1.",
    "Attach Documents: Gather and attach all mandatory documents (Registration certificate, PAN, 12A/80G, DSC, Resolution).",
    "Fill the Form: Complete Part A (Basic Info) and Part B (Subsidiaries, if applicable).",
    "Obtain Verification: Get the form digitally verified by a practising professional (CA, CS, or Cost Accountant).",
    "Upload and Pay: Upload the completed and verified form to the MCA portal and pay the applicable filing fee online.",
    "Track Status: Monitor the status of your application on the MCA portal until the registration certificate is issued.",
];

const csr1Benefits = [
    { title: "Access to CSR Funds", icon: TrendingUp, detail: "Qualify to receive CSR funding from eligible companies, expanding resources for social impact." },
    { title: "Transparency and Accountability", icon: Shield, detail: "The filing ensures transparency in the use of CSR funds, building trust with donors and stakeholders." },
    { title: "Credibility Enhancement", icon: Zap, detail: "Signals commitment to responsible social practices, boosting the NGO's credibility and recognition." },
    { title: "Collaboration Opportunities", icon: Handshake, detail: "Facilitates strategic partnerships with companies for effective CSR project implementation." },
    { title: "Compliance with Regulations", icon: Scale, detail: "Demonstrates adherence to legal requirements, minimizing risks of non-compliance and penalties." },
];

const csr1Law = [
    { title: "Companies Act, 2013 (Section 135)", detail: "Requires eligible companies to engage in CSR activities and regulates the registration process for CSR-1.", icon: BookOpen },
    { title: "Companies (CSR Policy) Rules, 2014", detail: "Provides detailed guidelines for CSR activities, eligible entities, and registration procedures.", icon: BookOpen },
];

const csr1FAQs = [
    { q: "Who needs to file Form CSR-1?", a: "Form CSR-1 is mandatory for all entities seeking CSR funding: Section 8 companies, public trusts, and societies registered under Section 12A and 80G of the Income Tax Act." },
    { q: "When is the deadline for submitting Form CSR-1?", a: "Form CSR-1 is a one-time registration, not an annual return. It must be filed before undertaking any CSR activity to receive funding from an eligible company." },
    { q: "What are the key benefits of ensuring compliance with Form CSR-1 filing requirements?", a: "The key benefits are **access to corporate CSR funds**, enhanced **transparency and accountability**, and improved **credibility** among corporate partners." },
    { q: "How often is Form CSR-1 required to be filed?", a: "Form CSR-1 is a **one-time** registration required to obtain the unique CSR registration number." },
    { q: "Are there any penalties for errors or inaccuracies in CSR-1 filings?", a: "While Form CSR-1 itself is a filing for registration, providing inaccurate information can lead to rejection or penalty if found misleading later, as all filings are subject to MCA scrutiny." },
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

// --- TAB CONTENT COMPONENTS (CSR-1 Registration Content) ---

const CSR1OverviewContent = () => (
    <section id="csr1-overview-content" className="py-12 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">CSR-1 Registration - A Mechanism for Corporate Social Responsibility Funding</h2>
        <p className="text-lg text-gray-700 mb-4 max-w-4xl">
            The **CSR-1 Registration** mechanism, introduced by the **Ministry of Corporate Affairs (MCA)**, is mandatory for entities seeking to undertake CSR activities and **receive funding from eligible companies**. This process formalizes and regulates CSR efforts in India, ensuring transparency and accountability.
        </p>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            Filing the CSR-1 form is the crucial step to demonstrate how **CSR funding is managed** and how social development activities are organized. Vakilsearch provides expert-assisted support for seamless filing.
        </p>

        <h3 className="text-2xl font-bold mb-6 text-gray-800">Applicability of Form CSR-1</h3>
        <div className="p-6 bg-[#E6F0F6] rounded-xl shadow-md border-l-4 border-[#022B50]">
            <h4 className="font-bold text-xl text-gray-800 mb-3">Mandatory for Entities Seeking CSR Funding:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700 font-medium">
                <li>Section 8 companies</li>
                <li>Public trusts</li>
                <li>Societies registered under Section 12A and 80G of the Income Tax Act, 1961</li>
            </ul>
            <p className="mt-4 text-sm text-gray-600 font-semibold">Note: It is **not applicable** to individual beneficiaries, government entities, or foreign organizations.</p>
        </div>
    </section>
);

const CSR1EligibilityContent = () => (
    <section id="csr1-eligibility-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Eligibility Criteria for CSR-1 Registration</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            To ensure legal compliance and the integrity of CSR activities, entities must meet specific criteria outlined by the relevant government authority.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
            {eligibilityCriteria.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-indigo-50 rounded-lg shadow-md border-l-4 border-indigo-500">
                    <CheckCircle className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{item}</span>
                </div>
            ))}
        </div>
    </section>
);

const CSR1DocumentsContent = () => (
    <section id="csr1-documents-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Documents Required & Eligible Types for CSR-1</h3>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">Documents Required for Filing Form CSR-1</h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {csr1Documents.map((doc, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-red-50 rounded-lg shadow-md border-l-4 border-red-500">
                    <doc.icon className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                    <div>
                        <p className="text-gray-800 font-medium">{doc.title}</p>
                        <p className="text-sm text-gray-600">{doc.detail}</p>
                    </div>
                </div>
            ))}
        </div>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">Types of NGOs Eligible for CSR-1 Registration</h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {eligibleNGOTypes.map((type, i) => (
                <FeatureBox key={i} title={type.title} detail={type.detail} icon={type.icon} />
            ))}
        </div>
    </section>
);

const CSR1ProcessContent = () => (
    <section id="csr1-process-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Form CSR-1 Filing Process</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            The process ensures a smooth completion without any hassles. Expert verification by a practicing professional (CA, CS, or Cost Accountant) is mandatory before submission.
        </p>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">Step-by-Step Registration Procedure:</h4>
        <ol className="space-y-5 list-none border-l-2 border-[#022B50] pl-4 mb-12">
            {csr1FilingProcess.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                    <div className="bg-[#022B50] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {i + 1}
                    </div>
                    <span className="text-gray-700 text-lg">{step}</span>
                </li>
            ))}
        </ol>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">Contents of Form CSR-1</h4>
        <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
            <ul className="list-none space-y-3 text-gray-700">
                {csr1Contents.map((content, i) => (
                    <li key={i} className="flex items-start gap-2">
                        <FileText className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                        <span className="font-medium">{content}</span>
                    </li>
                ))}
            </ul>
        </div>
    </section>
);

const CSR1LawPurposeContent = () => (
    <section id="csr1-law-purpose-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800">Governing Law, Importance & Benefits of CSR-1</h3>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">Law Governing the eForm CSR-1</h4>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
            {csr1Law.map((law, i) => (
                <DetailItem
                    key={i}
                    title={law.title}
                    description={law.detail}
                    icon={law.icon}
                />
            ))}
        </div>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">Importance and Purpose of Form CSR-1 (Benefits)</h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {csr1Benefits.map((benefit, i) => (
                <FeatureBox key={i} title={benefit.title} detail={benefit.detail} icon={benefit.icon} />
            ))}
        </div>
    </section>
);

const CSR1StatusFeesContent = () => {
    const filingFees = [
        { title: "Nominal Filing Fee", detail: "The amount may change, so check the MCA portal for the latest fee structure.", icon: DollarSign },
        { title: "Payment Mode", detail: "Fees are paid online when submitting the form on the MCA portal.", icon: DollarSign },
    ];
    return (
        <section id="csr1-status-fees-content" className="py-12 scroll-mt-24">
            <h3 className="text-3xl font-bold mb-6 text-gray-800">CSR-1 Registration Status Check & Fees</h3>
            <p className="text-lg text-gray-700 mb-8 max-w-4xl">
                Registering for a CSR number is synonymous with obtaining CSR-1 registration. You can monitor the application status directly on the MCA portal.
            </p>

            <h4 className="text-2xl font-bold mb-6 text-gray-800">CSR-1 Registration Status Check Procedure:</h4>
            <ol className="space-y-5 list-none border-l-2 border-amber-500 pl-4 mb-12">
                <li className="flex items-start gap-4"><div className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div><span className="text-gray-700 text-lg">Visit the MCA Portal and Log in using your credentials.</span></li>
                <li className="flex items-start gap-4"><div className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div><span className="text-gray-700 text-lg">Navigate to 'Check Annual Filing Status' option under 'MCA Services.'</span></li>
                <li className="flex items-start gap-4"><div className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div><span className="text-gray-700 text-lg">Select Form CSR-1 and enter the **CIN (Corporate Identity Number)** or the **SRN (Service Request Number)** from registration.</span></li>
                <li className="flex items-start gap-4"><div className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div><span className="text-gray-700 text-lg">The system will show the current status of the CSR-1 registration application.</span></li>
            </ol>

            <h4 className="text-2xl font-bold mb-6 text-gray-800">Form CSR-1 Filing Fees</h4>
            <div className="grid md:grid-cols-2 gap-6">
                {filingFees.map((fee, i) => (
                    <FeatureBox key={i} title={fee.title} detail={fee.detail} icon={fee.icon} />
                ))}
            </div>
        </section>
    );
};

const CSR1FAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
    <section id="csr1-faqs-content" className="py-12 max-w-5xl mx-auto scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">CSR-1 Registration FAQs</h3>

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
export default function CSR1RegistrationPage() {
    const [activeTab, setActiveTab] = useState(csr1Tabs[0].id);
    const [faqOpen, setFaqOpen] = useState(null);

    const SCROLL_OFFSET = 120;

    // --- SCROLLSPY IMPLEMENTATION ---
    useEffect(() => {
        const sectionIds = csr1Tabs.map(tab => tab.id);

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
            {/* === HERO SECTION (CSR-1 Registration Specific) === */}
            <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">

                    {/* Background Image Section */}
                    <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
                        <img
                            src={BackgroundImageSrc}
                            alt="CSR-1 Registration background"
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
                                <span className="hover:underline cursor-pointer">NGO Registration</span> &gt;{" "}
                                <span className="font-semibold text-black">CSR 1</span>
                            </nav>

                            {/* Badge */}
                            <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                                #1 Legal Service Provider In India
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-black">
                                CSR-1 Registration
                            </h1>

                            {/* Bullet Points with CheckCircle */}
                            <div className="space-y-4 mb-8 text-sm lg:text-base text-black">
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Align with your CSR goals through **expert-assisted CSR-1 registration**.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Get seamless support for **documentation, filing, and full CSR compliance**.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    **100% online process** designed for efficiency, accuracy, and legal clarity.
                                </p>
                            </div>
                            <p className="text-sm font-semibold text-gray-700">Complete guide on CSR-1 Registration</p>

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
                                <h2 className="text-xl font-semibold mb-6 text-black text-center">CSR-1 Registration</h2>

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
                        {csr1Tabs.map((tab) => (
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
                    <CSR1OverviewContent />
                    <CSR1EligibilityContent />
                    <CSR1DocumentsContent />
                    <CSR1ProcessContent />
                    <CSR1LawPurposeContent />
                    <CSR1StatusFeesContent />
                    <CSR1FAQsContent faqs={csr1FAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
                </div>
            </div>

        </div>
    );
}