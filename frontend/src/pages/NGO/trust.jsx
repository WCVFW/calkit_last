import React, { useState, useEffect } from "react";
// axios is kept for convention, though not used in frontend logic
import axios from "axios";
import {
    ChevronDown,
    Zap, // For Credibility/Fast Service
    Briefcase, // For Legal/Professional Filings
    ArrowRight,
    Star,
    CheckCircle,
    FileText, // For document/Trust Deed
    Scale, // For Legal Protection/Compliance
    Handshake, // For Settlor/Trustees/Fiduciary Relationship
    TrendingUp, // For Growth/Tax Benefits
    Lightbulb, // For Expert Consultation/Avoiding Mistakes
    Users, // For Trustees/Beneficiaries/Members
    DollarSign, // For Cost/Fees/Financial Advantages
    Clock, // For Fast Service/Time
    Landmark, // For Acts Governing/Legal Recognition
    MapPin,
    Globe // For Address Proof/Location
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from '../../assets/business.png'; // Reusing a general business image

// --- TRUST REGISTRATION STATIC DATA DEFINITIONS ---

const trustTabs = [
    { id: 'trust-overview-content', label: 'Overview' },
    { id: 'trust-types-benefits-content', label: 'Types & Benefits' },
    { id: 'trust-who-register-content', label: 'Who Should Register' },
    { id: 'trust-documents-content', label: 'Trust Deed & Docs' },
    { id: 'trust-process-content', label: 'Step-by-Step Process' },
    { id: 'trust-mistakes-content', label: 'Common Mistakes' },
    { id: 'trust-why-vakilsearch', label: 'How Vakilsearch' },
    { id: 'trust-faqs-content', label: "FAQ's" },
];

const trustTypes = [
    { title: "Charitable Trusts", detail: "Established for the benefit of the public (education, healthcare). Qualify for tax exemptions.", icon: TrendingUp },
    { title: "Private Trusts", detail: "Created for specific individuals or family members (estate/wealth planning). Do not qualify for public tax exemptions.", icon: Users },
    { title: "Public Trusts", detail: "Created for the welfare of the general public. Operate on donations and monitored by the charity commissioner.", icon: Globe },
    { title: "Religious Trusts", detail: "Formed for promoting religious beliefs or managing temples and spiritual establishments.", icon: Landmark },
    { title: "Revocable & Irrevocable", detail: "Revocable trusts can be modified/cancelled by the settlor; irrevocable cannot be altered once established.", icon: Clock },
    { title: "Testamentary Trusts", detail: "Created through a will and only come into effect after the settlor's death.", icon: FileText },
];

const trustBenefits = [
    { title: "Legal Protection", icon: Scale, detail: "Ensures legal rights over trust property and helps avoid future disputes." },
    { title: "Tax Benefits (80G & 12A)", icon: DollarSign, detail: "Registered charitable trusts are eligible for 80G and 12A exemptions under the Income Tax Act." },
    { title: "Public Credibility", icon: Zap, detail: "Registration increases donor confidence and transparency, enhancing trust." },
    { title: "Access Government Benefits", icon: CheckCircle, detail: "State and central schemes often require a registered legal status." },
    { title: "Proper Administration", icon: Briefcase, detail: "Clear roles and responsibilities are defined in the legally registered trust deed." },
    { title: "Financial Advantages", icon: TrendingUp, detail: "Easier to open a bank account, receive donations, and manage funds." },
];

const trustWhoShouldRegister = [
    "NGO Founders: Looking for NGO registration to run public welfare projects.",
    "Individuals & Families: Managing ancestral wealth or property through a private trust.",
    "Religious Groups: Establishing religious trusts to manage temples or spiritual activities.",
    "Philanthropists: Setting up charitable trusts for education, health, or public service.",
    "Settlor/Trustees: Anyone wanting to legally establish a structured legal arrangement to transfer assets.",
];

const trustDeedKeyClauses = [
    "Name Clause: Legal name under which the trust operates.",
    "Objective Clause: Specifies the main charitable or private purpose of the trust.",
    "Trustees Clause: Responsibilities and powers of the trustees.",
    "Beneficiaries Clause: Rights of those benefiting from the trust.",
    "Property Clause: Description of the movable or immovable property of the trust.",
    "Dissolution Clause: Terms under which the trust may be dissolved.",
];

const trustDocuments = [
    { title: "Trust Deed", icon: FileText, detail: "Must be drafted on non-judicial stamp paper." },
    { title: "ID Proofs", icon: Users, detail: "Aadhar/PAN/Passport of Settlor and all Trustees." },
    { title: "Address Proofs", icon: MapPin, detail: "Address proof of Settlor and Trustees." },
    { title: "Trust PAN Card", icon: DollarSign, detail: "Required for tax compliance." },
    { title: "NOC & Utility Bill", icon: MapPin, detail: "No-objection certificate and utility bill (of the office/trust property)." },
];

const trustKeyParties = [
    { title: "Settlor", detail: "The person who forms the trust by transferring property.", icon: Handshake },
    { title: "Trustee(s)", detail: "Manage the trust per the trust deed. Minimum of two required.", icon: Users },
    { title: "Beneficiaries", detail: "Individuals or entities receiving the trust’s benefits.", icon: CheckCircle },
    { title: "Registrar / Charity Commissioner", detail: "Approves registration and oversees public trusts.", icon: Landmark },
];

const trustRegistrationProcess = [
    "Choose Name: Must be distinct and comply with the Emblems and Names Act.",
    "Select Settlor and Trustees: Must be Indian residents; minimum two trustees.",
    "Draft Trust Deed: Prepare on non-judicial stamp paper with all necessary clauses.",
    "Submit to Registrar: Along with PAN, address proof, ID proof, etc., to the relevant Registrar/Charity Commissioner.",
    "Obtain Trust Registration Certificate: Once approved, the formal legal certificate is issued.",
    "Open Bank Account: In the name of the registered trust for financial management.",
];

const trustCommonMistakes = [
    "Invalid Trust Deed: Missing or vague clauses. Ensure professional drafting for a compliant format.",
    "Incomplete Documents: Missing PAN or address proof. We provide a full checklist to avoid delays.",
    "Wrong Trust Type: Choosing a private trust when a public/charitable structure is needed. Our advisors guide you.",
    "Improper Trustee Roles: Vaguely defined or conflicting responsibilities. We help establish clear governance.",
    "Not Registering the Deed: Without registration, the trust lacks the essential legal validity and official status.",
];

const trustVakilsearchServices = [
    { step: "Legal Consultation", detail: "Expert advice on choosing the appropriate trust type and structuring the trust deed for maximum compliance and benefit.", icon: Lightbulb },
    { step: "Document Preparation", detail: "Professional drafting of the trust deed, MOA, and accurate preparation of all application forms and necessary affidavits.", icon: FileText },
    { step: "Filing & Submission", detail: "Complete end-to-end registration support, submitting all documents to the Registrar/Charity Commissioner.", icon: Briefcase },
    { step: "Certificate Issuance", detail: "Fast and reliable service to obtain your official trust registration certificate and open the trust's bank account.", icon: Zap },
];

const trustVakilsearchPackages = [
    { name: "Basic Plan", cost: "₹4,999 + GST", detail: "Includes expert consultation and documentation drafting (excluding government fees)." },
    { name: "Premium Plan", cost: "₹9,999 + GST", detail: "Includes complete filing, legal support, and assistance with 80G/12A applications (excluding government fees)." },
];

const trustFAQs = [
    { q: "How can a trust be registered?", a: "A trust is registered by preparing a Trust Deed on non-judicial stamp paper and submitting it along with necessary identity and address proofs of the Settlor and Trustees to the local Registrar or Charity Commissioner." },
    { q: "Is trust registration mandatory?", a: "No, trust registration is technically not mandatory under the Indian Trusts Act, but it is **highly recommended** as it is required to obtain tax exemptions (12A/80G), receive grants, and establish legal recognition." },
    { q: "Can a trust be registered online?", a: "The entire process cannot be fully online as the trust deed must be physically signed and notarized/registered. However, the initial consultation, document drafting, and filing preparation are managed **100% online** with Vakilsearch." },
    { q: "How many members are required for trust registration?", a: "A trust requires a minimum of **two trustees** (and one Settlor) to be legally registered and functional." },
    { q: "What are the benefits of trust registration?", a: "Benefits include **legal protection** of property, eligibility for **tax exemptions** (12A & 80G), access to **government grants**, and enhanced **public credibility** for fundraising." },
    { q: "How long does it take to register a trust in India?", a: "The time taken depends on the state and registrar's workload, but typically ranges from **7 to 14 working days** after the submission of the notarized/registered trust deed." },
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

// --- TAB CONTENT COMPONENTS (Trust Registration Content) ---

const TrustOverviewContent = () => (
    <section id="trust-overview-content" className="py-12 scroll-mt-24">
        <h2 className="mb-6 text-3xl font-bold text-gray-800">Trust Registration in India: What You Need to Know</h2>
        <p className="max-w-4xl mb-4 text-lg text-gray-700">
            Trust registration refers to the formal process of legally establishing a trust under the Indian Trusts Act. A trust is a legal arrangement where a person (settlor) transfers property to trustees, who manage it for the benefit of designated beneficiaries.
        </p>
        <p className="max-w-4xl mb-8 text-lg text-gray-700">
            While not strictly mandatory, **registering a trust provides legal recognition**, enhances public credibility, and is essential for eligibility for **tax exemptions (12A & 80G)** and government grants under the Income Tax Act.
        </p>

        <h3 className="mb-6 text-2xl font-bold text-gray-800">Governing Acts</h3>
        <div className="max-w-4xl pl-4 space-y-3 text-gray-700 border-l-4 border-indigo-500">
            <p className="flex items-start gap-2 list-none">
                <Landmark className="flex-shrink-0 w-5 h-5 mt-1 text-indigo-600" />
                <span>**Indian Trusts Act, 1882:** Applicable mainly to private trusts.</span>
            </p>
            <p className="flex items-start gap-2 list-none">
                <FileText className="flex-shrink-0 w-5 h-5 mt-1 text-indigo-600" />
                <span>**Charitable and Religious Trusts Act, 1920:** Pertains to public charitable and religious trusts.</span>
            </p>
            <p className="flex items-start gap-2 list-none">
                <TrendingUp className="flex-shrink-0 w-5 h-5 mt-1 text-indigo-600" />
                <span>**Income Tax Act, 1961:** Governs tax exemptions and registration under sections 12A and 80G.</span>
            </p>
        </div>
    </section>
);

const TrustTypesBenefitsContent = () => (
    <section id="trust-types-benefits-content" className="py-12 scroll-mt-24">
        <h3 className="mb-8 text-3xl font-bold text-gray-800">Types of Trusts & Benefits of Registration</h3>

        <h4 className="mb-6 text-2xl font-bold text-gray-800">Types of Trusts in India</h4>
        <div className="grid gap-6 mb-12 sm:grid-cols-2 lg:grid-cols-3">
            {trustTypes.map((item, i) => (
                <FeatureBox key={i} title={item.title} detail={item.detail} icon={item.icon} />
            ))}
        </div>

        <h4 className="mb-6 text-2xl font-bold text-gray-800">Why Register a Trust?</h4>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trustBenefits.map((benefit, i) => (
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

const TrustWhoShouldRegisterContent = () => (
    <section id="trust-who-register-content" className="py-12 scroll-mt-24">
        <h3 className="mb-6 text-3xl font-bold text-gray-800">Who Should Register a Trust?</h3>
        <p className="max-w-4xl mb-8 text-lg text-gray-700">
            Registration is suitable for a wide range of individuals and groups aiming to manage assets or run public welfare projects under a legally structured fiduciary relationship.
        </p>

        <div className="space-y-4">
            {trustWhoShouldRegister.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 border-l-4 border-indigo-500 rounded-lg shadow-md bg-indigo-50">
                    <Users className="flex-shrink-0 w-5 h-5 mt-1 text-indigo-600" />
                    <span className="text-lg text-gray-700">{item}</span>
                </div>
            ))}
        </div>
    </section>
);

const TrustDocumentsContent = () => (
    <section id="trust-documents-content" className="py-12 scroll-mt-24">
        <h3 className="mb-6 text-3xl font-bold text-gray-800">Trust Deed, Key Parties & Required Documents</h3>

        <h4 className="mb-6 text-2xl font-bold text-gray-800">Trust Deed: Meaning and Key Clauses</h4>
        <div className="p-6 mb-12 bg-white border-l-4 shadow-lg rounded-xl border-amber-500">
            <p className="mb-4 text-lg text-gray-700">
                The **trust deed** is the legal backbone, outlining the terms, structure, objectives, and responsibilities. It must be prepared on non-judicial stamp paper.
            </p>
            <ul className="space-y-2 text-gray-700">
                {trustDeedKeyClauses.map((clause, i) => (
                    <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="flex-shrink-0 w-4 h-4 mt-1 text-green-500" />
                        <span>{clause}</span>
                    </li>
                ))}
            </ul>
        </div>

        <h4 className="mb-6 text-2xl font-bold text-gray-800">Key Parties Involved in the Trust Registration Process</h4>
        <div className="grid gap-6 mb-12 md:grid-cols-2 lg:grid-cols-4">
            {trustKeyParties.map((party, i) => (
                <FeatureBox key={i} title={party.title} detail={party.detail} icon={party.icon} />
            ))}
        </div>

        <h4 className="mb-6 text-2xl font-bold text-gray-800">Documents Required for Trust Registration Online</h4>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trustDocuments.map((doc, i) => (
                <div key={i} className="flex items-start gap-3 p-4 border-l-4 border-red-500 rounded-lg shadow-md bg-red-50">
                    <doc.icon className="flex-shrink-0 w-5 h-5 mt-1 text-red-500" />
                    <div>
                        <p className="font-medium text-gray-800">{doc.title}</p>
                        <p className="text-sm text-gray-600">{doc.detail}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

const TrustProcessContent = () => (
    <section id="trust-process-content" className="py-12 scroll-mt-24">
        <h3 className="mb-6 text-3xl font-bold text-gray-800">Step-by-Step Trust Registration Process</h3>
        <p className="max-w-4xl mb-8 text-lg text-gray-700">
            The process ensures legal compliance and leads to the issuance of a trust registration certificate, providing official status to your non-profit venture.
        </p>

        <ol className="space-y-5 list-none border-l-2 border-[#022B50] pl-4">
            {trustRegistrationProcess.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                    <div className="bg-[#022B50] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {i + 1}
                    </div>
                    <span className="text-lg text-gray-700">{step}</span>
                </li>
            ))}
        </ol>
    </section>
);

const TrustMistakesContent = () => (
    <section id="trust-mistakes-content" className="py-12 scroll-mt-24">
        <h3 className="mb-6 text-3xl font-bold text-gray-800">Common Mistakes to Avoid During Trust Registration</h3>
        <p className="max-w-4xl mb-8 text-lg text-gray-700">
            Avoiding these common pitfalls can prevent major delays, legal invalidity, and complications in obtaining vital tax exemptions and grants.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
            {trustCommonMistakes.map((mistake, i) => (
                <div key={i} className="flex items-start gap-4 p-5 border border-yellow-200 shadow-sm bg-yellow-50 rounded-xl">
                    <Lightbulb className="flex-shrink-0 w-6 h-6 mt-1 text-yellow-600" />
                    <div>
                        <h4 className="mb-1 text-lg font-bold text-gray-800">{mistake.split(':')[0]}</h4>
                        <p className="text-sm text-gray-600">{mistake.split(':')[1] ? mistake.split(':')[1].trim() : ""}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

const TrustWhyVakilsearch = () => (
    <section id="trust-why-vakilsearch" className="py-12 scroll-mt-24">
        <h3 className="mb-6 text-3xl font-bold text-gray-800">How Vakilsearch Simplifies the Process for Trust Registration</h3>
        <p className="max-w-4xl mb-8 text-lg text-gray-700">
            Vakilsearch provides expert assistance for trust registration online, ensuring a hassle-free and compliant experience from consultation to certification.
        </p>

        <div className="grid gap-6 mb-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {trustVakilsearchServices.map((item, i) => (
                <FeatureBox key={i} title={item.step} detail={item.detail} icon={item.icon} />
            ))}
        </div>

        <h4 className="mb-6 text-2xl font-bold text-gray-800">Trust Registration Cost in India (Vakilsearch Plans)</h4>
        <div className="grid gap-6 md:grid-cols-2">
            {trustVakilsearchPackages.map((pkg, i) => (
                <div key={i} className={`p-6 rounded-xl shadow-lg border-2 ${i === 0 ? 'bg-white border-gray-200' : 'bg-[#E6F0F6] border-[#022B50]'}`}>
                    <h5 className="mb-1 text-xl font-bold text-gray-800">{pkg.name}</h5>
                    <div className="text-3xl font-extrabold text-[#022B50] mb-3">{pkg.cost}</div>
                    <p className="text-gray-700 text-md">{pkg.detail}</p>
                </div>
            ))}
        </div>
        <div className="p-4 mt-6 bg-white border-l-4 border-red-500 shadow-md rounded-xl">
            <p className="font-semibold text-gray-700">Stamp duty and state-specific registration fees are extra and vary by location. Vakilsearch provides all-inclusive pricing with no hidden charges.</p>
        </div>
    </section>
);

const TrustFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
    <section id="trust-faqs-content" className="max-w-5xl py-12 mx-auto scroll-mt-24">
        <h3 className="mb-8 text-3xl font-bold text-center text-gray-800">Trust Registration FAQ</h3>

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
export default function TrustRegistrationPage() {
    const [activeTab, setActiveTab] = useState(trustTabs[0].id);
    const [faqOpen, setFaqOpen] = useState(null);

    const SCROLL_OFFSET = 120;

    // --- SCROLLSPY IMPLEMENTATION ---
    useEffect(() => {
        const sectionIds = trustTabs.map(tab => tab.id);

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
            {/* === HERO SECTION (Trust Registration Specific) === */}
            <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
                <div className="relative px-4 pt-12 mx-auto max-w-7xl md:px-8">

                    {/* Background Image Section */}
                    <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
                        <img
                            src={BackgroundImageSrc}
                            alt="Trust Registration background"
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
                                <span className="cursor-pointer hover:underline">NGO</span> &gt;{" "}
                                <span className="font-semibold text-black">Trust Registration In India</span>
                            </nav>

                            {/* Badge */}
                            <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                                #1 Legal Service Provider In India
                            </div>

                            {/* Title */}
                            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-black md:text-5xl lg:text-6xl">
                                Trust Registration Online in India
                            </h1>

                            {/* Bullet Points with CheckCircle */}
                            <div className="mb-8 space-y-4 text-sm text-black lg:text-base">
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="flex-shrink-0 w-5 h-5 mt-1 text-blue-400" />
                                    Expert-assisted **100% online** trust registration preparation process.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="flex-shrink-0 w-5 h-5 mt-1 text-blue-400" />
                                    All paperwork and filings handled by **legal professionals**.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="flex-shrink-0 w-5 h-5 mt-1 text-blue-400" />
                                    Trusted by 5000+ trusts for **Fast and affordable service**.
                                </p>
                            </div>
                        </div>

                        {/* Right Column - Form */}
                        <div className="w-full lg:w-[350px] relative z-30 lg:mt-0 lg:ml-auto mt-[-100px] sm:mt-[-50px]">
                            <div
                                className="w-full p-6 bg-white shadow-xl md:p-8 rounded-2xl"
                                style={{ borderRadius: '24px', border: '1px solid #E0E0E0' }}
                            >
                                <h2 className="mb-6 text-xl font-semibold text-center text-black">Trust Registration</h2>

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
                                        <p className="text-xs font-medium md:text-sm">Get easy updates through Whatsapp</p>
                                        <div className="w-10 h-5 bg-gray-300 rounded-full relative cursor-pointer flex items-center p-0.5 transition-colors">
                                            <div className="w-4 h-4 transition-transform transform translate-x-0 bg-white rounded-full shadow-md"></div>
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
            <section className="sticky top-0 z-30 px-4 py-4 bg-white border-b border-gray-200 shadow-md md:py-6 md:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="flex items-center w-full overflow-x-auto text-xs bg-white border border-gray-200 rounded-xl md:text-sm lg:text-base">
                        {trustTabs.map((tab) => (
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
                    <TrustOverviewContent />
                    <TrustTypesBenefitsContent />
                    <TrustWhoShouldRegisterContent />
                    <TrustDocumentsContent />
                    <TrustProcessContent />
                    <TrustMistakesContent />
                    <TrustWhyVakilsearch />
                    <TrustFAQsContent faqs={trustFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
                </div>
            </div>

        </div>
    );
}