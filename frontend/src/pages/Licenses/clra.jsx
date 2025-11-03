import React, { useState, useEffect } from "react";
// axios is kept for convention, though not used in frontend logic
import axios from "axios";
import {
    ChevronDown,
    Zap, // For Efficiency/Experience
    Briefcase, // For Employer/Business/Records
    ArrowRight,
    Star,
    CheckCircle, // For Compliance/Rights Protection
    FileText, // For document/Forms/Registers
    Scale, // For Regulation/Legal Framework
    Handshake, // For Worker Welfare/Expertise
    TrendingUp, // For Efficiency/Improved Brand Image
    Users, // For Labourers/Workforce
    DollarSign, // For Penalties/Fines
    Clock, // For Timely Application/Compliance
    Landmark,
    Shield,
    AlertTriangle,
    Lightbulb // For Government/Authority Registration
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from '../../assets/business.png'; // Reusing a general business image

// --- CLRA REGISTRATION STATIC DATA DEFINITIONS ---

const clraTabs = [
    { id: 'clra-overview-content', label: 'Overview' },
    { id: 'clra-benefits-content', label: 'Benefits' },
    { id: 'clra-eligibility-content', label: 'Eligibility & Exemptions' },
    { id: 'clra-documents-content', label: 'Documents & Responsibilities' },
    { id: 'clra-compliances-content', label: 'Compliances' },
    { id: 'clra-penalties-content', label: 'Penalties & Violations' },
    { id: 'clra-why-vakilsearch', label: 'Why Vakilsearch?' },
    { id: 'clra-faqs-content', label: 'FAQs' },
];

const clraOverview = {
    act: "The Contract Labour (Regulation and Abolition) Act, 1970 (CLRA Act)",
    applicability: "Applies to establishments that employ **20 or more contract labourers** on any day of the financial year. Principal employers and contractors who employ 20 or more contract labourers must register.",
};

const clraBenefits = [
    { title: "Compliance with the Law", icon: Scale, detail: "Ensures legal compliance and helps you avoid penalties and intricate legal complications." },
    { title: "Protection of Contract Workers' Rights", icon: Users, detail: "Helps ensure that contract workers' rights (fair wages, safety, health) are protected as mandated by the Act." },
    { title: "Reduced Risk and Liability", icon: Shield, detail: "Reduces your liability in the event of an accident or injury and mitigates the risk of legal penalties." },
    { title: "Improved Brand Image & Efficiency", icon: TrendingUp, detail: "Demonstrates commitment to worker welfare, which improves brand image, and mandated record-keeping increases operational efficiency." },
    { title: "Access to Government Benefits", icon: Landmark, detail: "Registered establishments may be eligible for various government benefits and schemes." },
];

const clraEligibility = [
    { title: "Establishment Size", detail: "Must employ **20 or more contract labourers** on any day of the financial year.", icon: Users },
    { title: "Location & Industry", detail: "Must be located in India and engaged in any industry, manufacture, occupation, trade, or business listed in the CLRA Act Schedule.", icon: Briefcase },
    { title: "Non-Governmental Status", detail: "The establishment must not be a government establishment (though public sector undertakings are covered).", icon: Landmark },
];

const clraExemptions = [
    "Work is of a casual or intermittent nature (not exceeding 120 days in the preceding twelve months).",
    "Work is of a seasonal character (not exceeding 60 days in a year).",
    "Work is done by members of the family of the principal employer or the contractor.",
    "Work is done by apprentices under the Apprentices Act 1961.",
    "Work is done in connection with construction, repair, maintenance, or demolition, if the total number of persons so employed does not exceed twenty.",
];

const clraDocuments = [
    { doc: "Trade license", icon: Briefcase },
    { doc: "AOA and MOA or Partnership Deed (Proof of Entity)", icon: FileText },
    { doc: "Factory License (if applicable)", icon: Landmark },
    { doc: "Certificate of registration (for other entities)", icon: FileText },
    { doc: "Proof of address & identity", icon: Users },
    { doc: "Proof of employment of contract labourers (e.g., contract details)", icon: FileText },
];

const principalEmployerResponsibilities = [
    "Registering with the appropriate government authority.",
    "Providing amenities to contract workers, such as canteens, restrooms, and creches.",
    "Paying contract workers fair wages and overtime (at least equal to the minimum wages).",
    "Ensuring the safety and health of contract workers, including safety equipment and training.",
    "Complying with other requirements of the CLRA Act (e.g., maintaining registers and submitting returns).",
];

const clraPenalties = [
    { title: "Failure to Obtain Registration and License", penalty: "Imprisonment up to three months, or a fine up to ₹1,000, or both.", icon: DollarSign },
    { title: "Employing Contract Labour in Prohibited Establishments", penalty: "Imprisonment up to six months or a fine up to ₹2,000, or both.", icon: AlertTriangle },
    { title: "Contravention of Any Condition of Registration or License", penalty: "Imprisonment up to three months or a fine up to ₹1,000, or both.", icon: DollarSign },
    { title: "Wilful Neglect of the Provisions of the Act", penalty: "Imprisonment up to six months or a fine up to ₹2,000, or both.", icon: AlertTriangle },
];

const whyVakilsearch = [
    { title: "Expertise in CLRA Compliance", detail: "Team of legal professionals specializing in labour laws and the specific requirements of CLRA compliance.", icon: Lightbulb },
    { title: "Efficient Handling", detail: "Streamlines the intricate compliance process, ensuring all documentation and requirements are met accurately and promptly.", icon: Zap },
    { title: "Customised Solutions & Comprehensive Guidance", detail: "Services are tailored to your specific compliance needs, providing end-to-end support from initial assessment to ongoing adherence and managing contract labour.", icon: Handshake },
    { title: "Risk Mitigation", detail: "Proactively identifies potential risks and challenges to ensure your business operations proceed smoothly and within the bounds of the law, avoiding penalties.", icon: Shield },
];

const clraFAQs = [
    { q: "What is the Contract Labour (Regulation and Abolition) Act 1970?", a: "It's a law that regulates the employment of contract labour in certain establishments and provides for its abolition where necessary, ensuring contract workers receive fair treatment and proper amenities." },
    { q: "When does the CLRA Act apply?", a: "The Act applies to any establishment or contractor that employs **20 or more contract labourers** on any day of the financial year." },
    { q: "What are the registration and licensing requirements under the CLRA Act?", a: "The **Principal Employer** must obtain a Certificate of **Registration** for the establishment, and the **Contractor** must obtain a **License** from the appropriate government authority." },
    { q: "Who are the principal employers and contractors?", a: "The **Principal Employer** is the person or entity who engages in contract labour. The **Contractor** is the person who undertakes to produce a given result for the establishment, through contract labour." },
    { q: "What are the penalties for violations of the CLRA Act?", a: "Penalties include imprisonment (up to six months) and/or fines (up to ₹2,000) for failing to obtain registration, employing contract labour in prohibited areas, or willfully neglecting the Act's provisions." },
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

const DocumentBox = ({ doc, icon: Icon }) => (
    <div className="flex items-start gap-3 p-4 border-l-4 border-red-500 rounded-lg shadow-md bg-red-50">
        <Icon className="flex-shrink-0 w-5 h-5 mt-1 text-red-500" />
        <span className="font-medium text-gray-700">{doc}</span>
    </div>
);

// --- TAB CONTENT COMPONENTS (CLRA Registration Content) ---

const CLRAOverviewContent = () => (
    <section id="clra-overview-content" className="py-12 scroll-mt-24">
        <h2 className="mb-6 text-3xl font-bold text-gray-800">Overview - CLRA Registration & Licensing</h2>
        <p className="max-w-4xl mb-4 text-lg text-gray-700">
            The **Contract Labour (Regulation and Abolition) Act, 1970 (CLRA Act)** was enacted to regulate the employment of contract labour in certain establishments and to provide for its abolition in certain circumstances.
        </p>
        <p className="max-w-4xl mb-8 text-lg text-gray-700">
            The Act applies to establishments that employ **20 or more contract labourers** on any day of the financial year. Both **Principal Employers** and **Contractors** employing this number of contract labourers are required to register and obtain a license under the Act, respectively.
        </p>

        <h3 className="mb-6 text-2xl font-bold text-gray-800">How crucial is the CLRA Act for the Principal Employer?</h3>
        <div className="p-5 bg-[#E6F0F6] rounded-xl shadow-md border-l-4 border-[#022B50]">
            <p className="font-medium text-gray-700">The Principal Employer is the person or entity who engages in contract labour. Their core responsibility is ensuring that the establishment is **registered** and that contract workers receive **fair wages, proper amenities (canteens, restrooms), and a safe work environment** as stipulated by the CLRA Act.</p>
        </div>
    </section>
);

const CLRABenefitsContent = () => (
    <section id="clra-benefits-content" className="py-12 scroll-mt-24">
        <h3 className="mb-8 text-3xl font-bold text-gray-800">Benefits of CLRA Registration & Licensing</h3>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {clraBenefits.map((item, i) => (
                <DetailItem key={i} title={item.title} description={item.detail} icon={item.icon} />
            ))}
        </div>
    </section>
);

const CLRAEligibilityContent = () => (
    <section id="clra-eligibility-content" className="py-12 scroll-mt-24">
        <h3 className="mb-6 text-3xl font-bold text-gray-800">Eligibility and Exemptions of CLRA Registration & Licensing</h3>
        <p className="max-w-4xl mb-8 text-lg text-gray-700">
            Registration is mandatory based on a minimum threshold of contract labourers, but certain types of work are exempted from the Act's purview.
        </p>

        <h4 className="mb-6 text-2xl font-bold text-gray-800">Eligibility Criteria (When to Apply)</h4>
        <div className="grid gap-6 mb-12 md:grid-cols-2">
            {clraEligibility.map((item, i) => (
                <DetailItem key={i} title={item.title} description={item.detail} icon={item.icon} />
            ))}
        </div>

        <h4 className="mb-6 text-2xl font-bold text-gray-800">Cases Where CLRA Is Not Applicable (Exemptions)</h4>
        <div className="max-w-4xl pl-4 space-y-3 text-gray-700 border-l-4 border-green-500">
            {clraExemptions.map((item, i) => (
                <li key={i} className="flex items-start gap-2 list-none">
                    <CheckCircle className="flex-shrink-0 w-5 h-5 mt-1 text-green-600" />
                    <span>{item}</span>
                </li>
            ))}
        </div>
    </section>
);

const CLRADocumentsContent = () => (
    <section id="clra-documents-content" className="py-12 scroll-mt-24">
        <h3 className="mb-6 text-3xl font-bold text-gray-800">Documents Required and Principal Employer Responsibilities</h3>
        <p className="max-w-4xl mb-8 text-lg text-gray-700">
            The CLRA Act places significant responsibilities on the Principal Employer, starting with the establishment's registration and continuous welfare management for contract workers.
        </p>

        <h4 className="mb-6 text-2xl font-bold text-gray-800">Documents Required for CLRA Registration & Licensing</h4>
        <div className="grid gap-6 mb-12 sm:grid-cols-2 lg:grid-cols-3">
            {clraDocuments.map((doc, i) => (
                <DocumentBox key={i} doc={doc.doc} icon={FileText} />
            ))}
        </div>

        <h4 className="mb-6 text-2xl font-bold text-gray-800">Key Responsibilities of the Principal Employer</h4>
        <div className="max-w-4xl pl-4 space-y-3 text-gray-700 border-l-4 border-amber-500">
            {principalEmployerResponsibilities.map((responsibility, i) => (
                <li key={i} className="flex items-start gap-2 list-none">
                    <CheckCircle className="flex-shrink-0 w-5 h-5 mt-1 text-amber-500" />
                    <span>{responsibility}</span>
                </li>
            ))}
        </div>
    </section>
);

const CLRACompliancesContent = () => (
    <section id="clra-compliances-content" className="py-12 scroll-mt-24">
        <h3 className="mb-6 text-3xl font-bold text-gray-800">Compliances Related to CLRA Registration and Licensing</h3>
        <p className="max-w-4xl mb-8 text-lg text-gray-700">
            Compliance involves mandatory administrative steps (registration, record-keeping) and adherence to welfare standards (amenities, wages, safety) throughout the period of contract employment.
        </p>

        <div className="space-y-4">
            {principalEmployerResponsibilities.map((compliance, i) => (
                <div key={i} className="flex items-start gap-4 p-4 border-l-4 border-indigo-500 rounded-lg shadow-md bg-indigo-50">
                    <Scale className="flex-shrink-0 w-5 h-5 mt-1 text-indigo-600" />
                    <span className="text-lg text-gray-700">{compliance}</span>
                </div>
            ))}
        </div>
    </section>
);

const CLRAPenaltiesContent = () => (
    <section id="clra-penalties-content" className="py-12 scroll-mt-24">
        <h3 className="mb-6 text-3xl font-bold text-gray-800">Penalties and Violations of CLRA Registration and License</h3>
        <p className="max-w-4xl mb-8 text-lg text-gray-700">
            Failure to comply with the CLRA Act, including not obtaining the necessary registration/license, can result in severe fines, imprisonment, or both.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
            {clraPenalties.map((item, i) => (
                <div key={i} className="p-5 border border-red-500 shadow-sm bg-red-50 rounded-xl">
                    <item.icon className="w-6 h-6 mb-2 text-red-700" />
                    <h4 className="mb-1 text-lg font-bold text-gray-800">{item.title}</h4>
                    <p className="text-sm font-medium text-gray-600">{item.penalty}</p>
                </div>
            ))}
        </div>

        <h4 className="mt-12 mb-6 text-2xl font-bold text-gray-800">When Should One Apply for CLRA Registration?</h4>
        <div className="p-5 border-l-4 shadow-md bg-amber-50 rounded-xl border-amber-500">
            <p className="text-lg font-semibold text-gray-700">You should apply for CLRA registration and licensing as soon as the principal employer **starts employing contract labour**. Failure to obtain registration and license can result in penalties, such as imprisonment, fine, or both.</p>
        </div>
    </section>
);

const CLRAWhyVakilsearch = () => (
    <section id="clra-why-vakilsearch" className="py-12 scroll-mt-24">
        <h3 className="mb-6 text-3xl font-bold text-gray-800">Why Vakilsearch for CLRA Compliance?</h3>
        <p className="max-w-4xl mb-8 text-lg text-gray-700">
            Navigating CLRA regulations is intricate and time-consuming. Our expert legal professionals offer efficient, customized, and comprehensive support to ensure your business achieves and maintains compliance effectively.
        </p>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {whyVakilsearch.map((service, i) => {
                const Icon = service.icon || CheckCircle; // Defaulting icon if not explicitly set
                const [title, detail] = service.detail.split(':').map(s => s.trim());
                
                let CurrentIcon;
                if (service.title === "Expertise in CLRA Compliance") CurrentIcon = Lightbulb;
                else if (service.title === "Efficient Handling") CurrentIcon = Zap;
                else if (service.title === "Customised Solutions & Comprehensive Guidance") CurrentIcon = Handshake;
                else if (service.title === "Risk Mitigation") CurrentIcon = Shield;
                else CurrentIcon = CheckCircle;
                
                return (
                    <div key={i} className="flex items-start gap-3 p-5 border border-indigo-200 shadow-sm bg-indigo-50 rounded-xl">
                        <CurrentIcon className="w-6 h-6 text-[#022B50] mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="mb-1 text-lg font-bold text-gray-800">{title}</h4>
                            <p className="text-sm text-gray-600">{detail}</p>
                        </div>
                    </div>
                );
            })}
        </div>
        
        <div className="mt-12 p-6 bg-[#E6F0F6] rounded-xl border-l-4 border-amber-500 shadow-md">
            <p className="text-lg font-semibold text-gray-700">Our Proven Track Record and transparent pricing assure you of professional service, allowing you to focus on your core business operations with peace of mind.</p>
        </div>
    </section>
);

const CLRAFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
    <section id="clra-faqs-content" className="max-w-5xl py-12 mx-auto scroll-mt-24">
        <h3 className="mb-8 text-3xl font-bold text-center text-gray-800">FAQs on CLRA Registration & Licensing</h3>

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
export default function CLRARegistrationPage() {
    const [activeTab, setActiveTab] = useState(clraTabs[0].id);
    const [faqOpen, setFaqOpen] = useState(null);

    const SCROLL_OFFSET = 120;

    // --- SCROLLSPY IMPLEMENTATION ---
    useEffect(() => {
        const sectionIds = clraTabs.map(tab => tab.id);

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
            {/* === HERO SECTION (CLRA Registration Specific) === */}
            <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
                <div className="relative px-4 pt-12 mx-auto max-w-7xl md:px-8">

                    {/* Background Image Section */}
                    <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
                        <img
                            src={BackgroundImageSrc}
                            alt="CLRA Registration background"
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
                                <span className="font-semibold text-black">CLRA Registration & Licensing</span>
                            </nav>

                            {/* Badge */}
                            <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                                #1 Legal Service Provider In India
                            </div>

                            {/* Title */}
                            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-black md:text-5xl lg:text-6xl">
                                CLRA Registration & Licensing
                            </h1>

                            {/* Bullet Points with CheckCircle */}
                            <div className="mb-8 space-y-4 text-sm text-black lg:text-base">
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="flex-shrink-0 w-5 h-5 mt-1 text-blue-400" />
                                    Legalise your contract employment with **expert CLRA registration & licensing**.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="flex-shrink-0 w-5 h-5 mt-1 text-blue-400" />
                                    Simplify compliance with professional support for **documentation and applications**.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="flex-shrink-0 w-5 h-5 mt-1 text-blue-400" />
                                    Experience **error-free processing** and **100% online process** backed by top legal experts.
                                </p>
                            </div>
                        </div>

                        {/* Right Column - Form */}
                        <div className="w-full lg:w-[350px] relative z-30 lg:mt-0 lg:ml-auto mt-[-100px] sm:mt-[-50px]">
                            <div
                                className="w-full p-6 bg-white shadow-xl md:p-8 rounded-2xl"
                                style={{ borderRadius: '24px', border: '1px solid #E0E0E0' }}
                            >
                                <h2 className="mb-6 text-xl font-semibold text-center text-black">CLRA Registration & Licensing</h2>

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
                                            <div className="w-4 h-4 transform translate-x-0 bg-white rounded-full shadow-md"></div>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="w-full bg-[#113C6D] text-white py-3 font-semibold rounded-lg transition-colors hover:bg-indigo-900 text-base shadow-md mt-4"
                                    >
                                        Talk to an Expert
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
                        {clraTabs.map((tab) => (
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
                    <CLRAOverviewContent />
                    <CLRABenefitsContent />
                    <CLRAEligibilityContent />
                    <CLRADocumentsContent />
                    <CLRACompliancesContent />
                    <CLRAPenaltiesContent />
                    <CLRAWhyVakilsearch />
                    <CLRAFAQsContent faqs={clraFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
                </div>
            </div>

        </div>
    );
}