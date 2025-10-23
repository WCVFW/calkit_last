import React, { useState, useEffect } from "react";
import {
    ChevronDown,
    ArrowRight,
    CheckCircle,
    Star,
    Layers, // For compliance/structure
    FileText, // For documents
    Users, // For members/cooperation (REPLACEMENT FOR Handshake)
    Key, // For legal framework/rules
    ClipboardCheck, // For process/filing
    IndianRupee, // For financials/capital
    Briefcase, // For directors/office
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from "@/assets/business.png"
// --- STATIC DATA DEFINITIONS (Producer Company Registration Content) ---

const producerTabs = [
    { id: 'producer-overview-content', label: 'Overview' },
    { id: 'producer-benefits-content', label: 'Benefits' },
    { id: 'producer-eligibility-content', label: 'Eligibility' },
    { id: 'producer-documents-content', label: 'Documents & Objectives' },
    { id: 'producer-moa-aoa-content', label: 'MoA & AoA' },
    { id: 'producer-process-content', label: 'Process' },
    { id: 'producer-faqs-content', label: 'FAQs' },
];

const producerPlans = [
    {
        title: "Basic FPO Filing",
        price: "₹19,999",
        originalPrice: "₹24,999",
        discountText: "20% off",
        description: "Covers basic incorporation and name approval for 10 producers.",
        features: [
            "DSC & DIN for 5 Directors",
            "Name Approval (RUN)",
            "Incorporation (SPICe+)",
            "MoA & AoA Drafting (Standard)",
            "PAN & TAN",
        ],
        isRecommended: false,
        govtFeeNote: "Govt. Fees Extra (~₹8,000 to ₹15,000)",
        cashbackText: "Fast-Track Option Available",
    },
    {
        title: "Standard (Recommended)",
        price: "₹34,999",
        originalPrice: "₹45,999",
        discountText: "24% off",
        description: "Full registration + Bylaws drafting and post-registration advisory.",
        features: [
            "All Basic features",
            "Customised Bylaws Drafting",
            "Expert Consultation on FPO Compliance",
            "FPO Certificate/DHO document assistance",
            "Bank Account Opening Assistance",
        ],
        isRecommended: true,
        govtFeeNote: "Govt. Fees Extra",
        cashbackText: "Complete FPO Formation Support",
    },
    {
        title: "Comprehensive Compliance",
        price: "₹59,999",
        originalPrice: "₹89,999",
        discountText: "33% off",
        description: "End-to-end setup including initial legal/tax registrations.",
        features: [
            "All Standard features",
            "GST/MSME Registration (Optional)",
            "Initial FPO Scheme Advisory (10,000 FPOs Scheme)",
            "Annual Filing Support (First year)",
            "Dedicated Relationship Manager",
        ],
        isRecommended: false,
        govtFeeNote: "Govt. Fees Extra",
        cashbackText: "Best for immediate operation & growth",
    },
];

const producerEligibility = [
    { icon: Users, title: "Minimum Membership", description: "At least 10 Producer individuals OR at least 2 Producer Institutions." },
    { icon: Briefcase, title: "Minimum Directors", description: "A minimum of 5 directors are required for incorporation." },
    { icon: IndianRupee, title: "Minimum Capital", description: "The company must have a minimum paid-up capital of ₹5 lakhs." },
    { icon: Key, title: "Name Requirement", description: "The company name must end with the words 'Producer Limited Company'." },
];

const producerProcess = [
    "Step 1: Consult Experts & Obtain DSC/DIN",
    "Step 2: Reserve Company Name (Must include 'Producer Limited Company')",
    "Step 3: Draft MoA, AoA & By-laws (Expert Assisted)",
    "Step 4: Prepare and Gather all Director/Member/Office Documents (PAN/Aadhaar/NOC)",
    "Step 5: File Form SPICe+ and other required forms with ROC",
    "Step 6: Receive Certificate of Incorporation and FPO Registration",
];

const producerObjectives = [
    // FIX: Using Users as the replacement icon for Handshake
    { icon: Users, title: "Market & Sell Primary Produce", detail: "Undertaking activities related to production, harvesting, procurement, grading, pooling, handling, marketing, and selling primary agricultural produce." },
    { icon: IndianRupee, title: "Financial Services", detail: "Providing financial services to members, such as extending credit facilities and providing insurance." },
    { icon: Layers, title: "Educational & Technical Services", detail: "Providing educational and technical services to members to promote better productivity." },
    { icon: Users, title: "Promote Cooperation", detail: "To promote mutual assistance and cooperation among its members and the agricultural sector as a whole." },
];

const producerFAQs = [
    { q: "What is an FPO, and why should farmers consider registering one?", a: "An FPO (Farmer Producer Organization) is essentially a Producer Company formed by farmers. Registration provides **limited liability**, access to **subsidies/grants**, and **increased bargaining power** in the market." },
    { q: "How can I register an FPO in India?", a: "An FPO is registered as a **Producer Company** under the Companies Act, 2013, involving steps like obtaining DSC/DIN, name approval, drafting MoA/AoA, and filing Form SPICe+ with the Registrar of Companies (ROC)." },
    { q: "What are the benefits of FPO registration for farmers?", a: "Key benefits include **limited liability** protection, eligibility for **government schemes** (like the 10,000 FPOs scheme), easier **access to credit**, and **higher bargaining power** for their produce." },
    { q: "What are the key documents required for FPO registration?", a: "Required documents include **PAN and Aadhaar** of all members/directors, **Registered Office Proof**, **MoA & AoA**, and **Digital Signature Certificates (DSCs)**. A Producer Certificate may also be required." },
    { q: "What are the producer company incorporation fees?", a: "Professional fees for expert assistance start from **₹19,999**. Government fees for stamp duty and registration are extra, typically ranging from **₹8,000 to ₹15,000** depending on the authorized capital." },
    { q: "What is the voting rights rule for FPOs?", a: "Generally, every producer individual has a **single vote**, regardless of shareholdings. If Producer Institutions are present, voting rights are determined based on participation in the business in the previous year or initial shareholdings." },
    { q: "What is the government's '10,000 FPOs Scheme'?", a: "It's a Central Sector Scheme with a large budget dedicated to developing and promoting 10,000 new FPOs nationwide to strengthen agricultural market linkages and farmer income." },
];

// --- REUSABLE COMPONENTS (Kept the same for consistency) ---

const ProcessStep = ({ stepNumber, step }) => (
    <li className="flex items-start gap-4">
        <div className="bg-[#2E96FF] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
            {stepNumber}
        </div>
        <span className="text-gray-700 text-base sm:text-lg">{step}</span>
    </li>
);

const RequirementItem = ({ icon: Icon, title, description }) => (
    <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 transition hover:shadow-md">
        <Icon className="w-5 h-5 text-[#2E96FF] mt-1 flex-shrink-0" />
        <div>
            <h4 className="font-semibold text-base sm:text-lg text-gray-800 mb-1">{title}</h4>
            <p className="text-gray-600 text-sm">{description}</p>
        </div>
    </div>
);

const FPOPlanCard = ({ plan, hoveredPlanId, setHoveredPlanId, selectedPlanId, setSelectedPlanId }) => {

    const isSelected = plan.title === selectedPlanId;
    const isHovered = plan.title === hoveredPlanId;
    const isRecommended = plan.title === "Standard (Recommended)";
    const isProminent = isSelected || isHovered || (isRecommended && !selectedPlanId && !hoveredPlanId);
    
    const baseClasses = `relative p-4 sm:p-6 rounded-xl shadow-lg flex flex-col justify-between h-full transition-all duration-300 cursor-pointer`;
    const activeClasses = isProminent 
        ? 'bg-[#E6F2FF] border-2 border-[#2E96FF] scale-[1.03] shadow-2xl'
        : 'bg-white border border-gray-200 hover:shadow-xl hover:scale-[1.02]';

    const handleClick = () => {
        setSelectedPlanId(plan.title);
    }

    let badgeText = '';
    if (isSelected) {
        badgeText = 'Selected Plan';
    } else if (isRecommended && !selectedPlanId) {
        badgeText = 'Recommended Plan';
    }

    return (
        <div
            className={`${baseClasses} ${activeClasses}`}
            onMouseEnter={() => setHoveredPlanId(plan.title)}
            onMouseLeave={() => setHoveredPlanId(null)}
            onClick={handleClick}
        >
            {isProminent && badgeText && (
                <div className="absolute top-0 right-0 bg-[#2E96FF] text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                    {badgeText}
                </div>
            )}

            <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-1">{plan.title.replace(' (Recommended)', '')}</h3>
                <p className={`text-sm mb-4 text-gray-500`}>{plan.description}</p>

                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 mb-4">
                    <span className="text-xl sm:text-3xl font-extrabold text-[#2E96FF]">{plan.price}</span>
                    <span className="text-sm line-through text-gray-400">{plan.originalPrice}</span>
                    <span className="text-sm text-green-600 font-bold">{plan.discountText}</span>
                </div>
                {plan.govtFeeNote && <span className="text-xs text-red-500 mb-2 block font-semibold">{plan.govtFeeNote}</span>}

                <div className={`text-sm font-semibold mb-4 text-green-700`}>
                    {plan.cashbackText}
                </div>

                <button
                    className={`w-full py-2.5 sm:py-3 font-semibold rounded-lg transition-colors shadow-md ${isProminent
                        ? 'bg-[#2E96FF] text-white hover:bg-[#0069D1]'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPlanId(plan.title);
                    }}
                >
                    Get Started
                </button>

                <h4 className="font-bold text-gray-800 mt-4 sm:mt-6 mb-3 border-t pt-3">Package Inclusions:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                    {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};


// --- SECTION COMPONENTS (FPO CONTENT) ---

const ProducerOverviewContent = () => (
    <section id="producer-overview-content" className="py-8 sm:py-12 scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">Producer Company Incorporation (FPO Registration) - An Overview</h2>
        <p className="text-base sm:text-lg text-gray-700 mb-6 max-w-4xl">
            **Producer company registration** is forming a producer company under the **Companies Act of 2013**. Producer companies are special types of businesses formed by **farmers and other agricultural producers** to help them market and sell their products more effectively.
        </p>

        <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-600 shadow-inner">
            <h3 className="text-xl font-bold text-green-800 mb-3">Key Characteristics</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />**Limited Liability:** Members are not personally responsible for the company's debts.</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />**Purpose:** Focused on production, harvesting, marketing, and selling primary agricultural produce.</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />**Structure:** Functions like a Private Limited Company but with unique member/voting rules.</li>
            </ul>
        </div>
    </section>
);

const ProducerBenefitsContent = () => (
    <section id="producer-benefits-content" className="py-8 sm:py-12 scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Benefits of FPO Registration</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-4xl">
            Registering as a Farmer Producer Organization (FPO) provides significant advantages to agricultural producers by formalizing their collective efforts.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-lg text-blue-800 mb-2 flex items-center gap-2"><Layers className="w-5 h-5" /> Limited Liability Protection</h4>
                <p className="text-sm text-gray-700">Members are **not personally liable** for the FPO's debts, protecting their personal assets if the organization faces financial difficulties.</p>
            </div>
            <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-lg text-blue-800 mb-2 flex items-center gap-2"><IndianRupee className="w-5 h-5" /> Access to Funds & Credit</h4>
                <p className="text-sm text-gray-700">FPOs are eligible for **government subsidies and grants** and are viewed as more **creditworthy** by banks, leading to easier credit access and better rates.</p>
            </div>
            <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-lg text-blue-800 mb-2 flex items-center gap-2"><Users className="w-5 h-5" /> Increased Bargaining Power</h4>
                <p className="text-sm text-gray-700">FPOs can sell produce **in bulk**, leading to increased efficiency, better prices, and **higher profits** for all members.</p>
            </div>
        </div>
        
        <div className="mt-8 p-4 text-sm bg-yellow-50 text-yellow-800 rounded-lg border-l-4 border-yellow-500">
            **Did You Know?** The Government of India has launched the Central Sector Scheme for **Formation and Promotion of 10,000 Farmer Producer Organisations (FPOs)** with a budgeted allocation of ₹6865 crore.
        </div>
    </section>
);

const ProducerEligibilityContent = () => (
    <section id="producer-eligibility-content" className="py-8 sm:py-12 scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Eligibility Criteria for Producer Company Registration</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-4xl">
            To successfully register a Producer Company (FPO) in India, these statutory requirements must be met as per the Companies Act, 2013.
        </p>

        <h4 className="text-xl font-bold mb-3 text-gray-800">Mandatory Registration Criteria:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
            {producerEligibility.map((req, i) => (
                <RequirementItem key={i} {...req} />
            ))}
        </div>

        <h4 className="text-xl font-bold mt-8 mb-3 text-gray-800">Membership and Voting Rights:</h4>
                
        <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h5 className="font-semibold text-base text-gray-900 flex items-center gap-2"><Users className="w-4 h-4 text-indigo-500" /> Individual Producers (Majority)</h5>
                <p className="text-sm text-gray-600">Every producer is entitled to a **single vote**, regardless of their shareholdings or patronage in the company.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h5 className="font-semibold text-base text-gray-900 flex items-center gap-2"><Layers className="w-4 h-4 text-indigo-500" /> Producer Institutions Present</h5>
                <p className="text-sm text-gray-600">Voting rights are determined based on the institution's **participation in the business** in the previous year (or shareholdings in the first year). The company rules can restrict voting to **active members** only.</p>
            </div>
        </div>
    </section>
);

const ProducerDocumentsContent = () => (
    <section id="producer-documents-content" className="py-8 sm:py-12 scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Documentation & Company Objectives</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 max-w-4xl">
            A precise set of documents, including constitutional documents like **MoA** and **AoA**, must be filed along with proof of identity and address for all directors and members.
        </p>

        <h4 className="text-xl font-bold mb-3 text-gray-800">Key Documents Required:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
            <div className="space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h5 className="font-semibold text-base text-gray-900">Statutory Documents</h5>
                <ul className="space-y-1 text-gray-700 text-sm">
                    <li className="flex items-start gap-2"><FileText className="w-4 h-4 text-orange-500 flex-shrink-0 mt-1" />Memorandum of Association (MoA)</li>
                    <li className="flex items-start gap-2"><FileText className="w-4 h-4 text-orange-500 flex-shrink-0 mt-1" />Articles of Association (AoA)</li>
                    <li className="flex items-start gap-2"><FileText className="w-4 h-4 text-orange-500 flex-shrink-0 mt-1" />Digital Signature Certificates (DSCs) of all directors</li>
                </ul>
            </div>
            <div className="space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h5 className="font-semibold text-base text-gray-900">Personal & Office Proof</h5>
                <ul className="space-y-1 text-gray-700 text-sm">
                    <li className="flex items-start gap-2"><FileText className="w-4 h-4 text-orange-500 flex-shrink-0 mt-1" />PAN & Aadhaar of all members and directors</li>
                    <li className="flex items-start gap-2"><FileText className="w-4 h-4 text-orange-500 flex-shrink-0 mt-1" />Registered office address proof (Bill/Rent Agreement/NOC)</li>
                    <li className="flex items-start gap-2"><FileText className="w-4 h-4 text-orange-500 flex-shrink-0 mt-1" />Producer Certificate (if applicable)</li>
                </ul>
            </div>
        </div>

        <h4 className="text-xl font-bold mt-8 mb-3 text-gray-800">Core Objectives (Section 581B):</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {producerObjectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
                    <obj.icon className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                        <h5 className="font-semibold text-base text-gray-900">{obj.title}</h5>
                        <p className="text-xs text-gray-600">{obj.detail}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

const ProducerMoaAoaContent = () => (
    <section id="producer-moa-aoa-content" className="py-8 sm:py-12 scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">The Constitutional Documents: MoA & AoA</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 max-w-4xl">
            The **Memorandum (MoA)** defines the company's external scope, while the **Articles (AoA)** define its internal governance. Both must strictly align with Section 581B of the Companies Act.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <h4 className="text-xl font-bold mb-3 text-gray-800 flex items-center gap-2"><FileText className="w-5 h-5 text-red-500" /> Memorandum of Producer Company (MoA)</h4>
                <ul className="space-y-2 text-gray-700 pl-4 border-l-2 border-gray-200 text-sm">
                    <li>**Name Clause:** Must end with ‘Producer Company Limited’.</li>
                    <li>**Objects Clause:** Goals must align with Section 581B (production, marketing, finance, etc.).</li>
                    <li>**Capital Clause:** Specifies minimum share capital (₹5 lakhs) and its division.</li>
                    <li>**Liability Clause:** Clearly mentions the **restricted liability** of members.</li>
                    <li className="font-bold pt-2">Amendment: Cannot be changed unless explicitly allowed by the Act (requires special resolution and filing with the Registrar).</li>
                </ul>
            </div>

            <div>
                <h4 className="text-xl font-bold mb-3 text-gray-800 flex items-center gap-2"><Layers className="w-5 h-5 text-green-500" /> Articles of Association (AoA)</h4>
                <ul className="space-y-2 text-gray-700 pl-4 border-l-2 border-gray-200 text-sm">
                    <li>**Membership/Share:** Outlines qualifications, conditions, and share transfer details.</li>
                    <li>**Governance:** Specifies the structure, powers, and duties of the Board and election procedures.</li>
                    <li>**Financials:** Must outline rules for patronage bonuses (cash or equity shares) and credit/loans to members.</li>
                    <li>**Principles:** Must be based on mutual assistance, single vote per member, and limited return on share capital.</li>
                    <li className="font-bold pt-2">Amendment: Proposed by 2/3rds of elected directors or 1/3rd of members, adopted by special resolution, and filed with the Registrar within 30 days.</li>
                </ul>
            </div>
        </div>
    </section>
);

const ProducerProcessContent = () => (
    <section id="producer-process-content" className="py-8 sm:py-12 scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">FPO Registration Process Through Vakilsearch</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-4xl">
            Vakilsearch simplifies the complex process of Producer Company registration (FPO) online in just 4 easy steps, ensuring quick name approval and error-free ROC filing.
        </p>

        <h4 className="text-xl font-bold mb-3 text-gray-800">The 6-Step FPO Registration Journey:</h4>
        <ol className="space-y-4 sm:space-y-5 list-none border-l-2 border-indigo-100 pl-4 mb-10">
            {producerProcess.map((step, i) => (
                <ProcessStep key={i} stepNumber={i + 1} step={step} />
            ))}
        </ol>

        <h4 className="text-xl font-bold mt-8 mb-3 text-gray-800">Why Choose Vakilsearch?</h4>
        <p className="text-base sm:text-lg text-gray-700 mb-6 max-w-4xl">
            We are a trusted and experienced partner specializing in FPO registration. Our commitment is to offer convenience, expertise, and support throughout the process. We ensure compliance, provide tailored assistance, and aim to simplify the journey, making us the preferred choice for FPO establishment in India.
        </p>
    </section>
);

const ProducerFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
    <section id="producer-faqs-content" className="py-8 sm:py-12 max-w-5xl mx-auto scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800 text-center">FAQ's on Producer Company Registration</h3>

        <div className="space-y-3 sm:space-y-4">
            {faqs.map((f, i) => (
                <div key={i} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <button
                        className={`w-full flex justify-between items-center p-4 sm:p-5 text-left transition ${faqOpen === i ? 'bg-[#E6F2FF] text-[#2E96FF]' : 'bg-white hover:bg-gray-50'}`}
                        onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    >
                        <span className="font-semibold text-base sm:text-lg">{f.q}</span>
                        <ChevronDown
                            className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform ${faqOpen === i ? "rotate-180 text-[#2E96FF]" : "text-gray-500"}`}
                        />
                    </button>
                    <motion.div
                        initial={false}
                        animate={{ height: faqOpen === i ? "auto" : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <p className="px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base text-gray-700 bg-white">{f.a}</p>
                    </motion.div>
                </div>
            ))}
        </div>
    </section>
);


// --- FOOTER COMPONENTS ---

const FooterColumn = ({ title, links }) => (
    <div>
        <h4 className="font-bold text-sm sm:text-base text-gray-900 mb-3">{title}</h4>
        <ul className="space-y-2">
            {links.map((link, i) => (
                <li key={i}>
                    <a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-[#2E96FF] transition-colors">
                        {link}
                    </a>
                </li>
            ))}
        </ul>
    </div>
);

const Footer = () => {


    return (
        <footer className="bg-gray-50 pt-8 sm:pt-12 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
            </div>
        </footer>
    );
};


// --- MAIN COMPONENT ---
export default function FpoLandingPageDesign() {
    const [activeTab, setActiveTab] = useState(producerTabs[0].id);
    const [faqOpen, setFaqOpen] = useState(null);
    const [hoveredPlanId, setHoveredPlanId] = useState(null);

    // Default selected plan is 'Standard (Recommended)'
    const [selectedPlanId, setSelectedPlanId] = useState(producerPlans.find(p => p.isRecommended)?.title || null);

    const SCROLL_OFFSET = 120;

    // --- SCROLLSPY IMPLEMENTATION ---
    useEffect(() => {
        const sectionIds = producerTabs.map(tab => tab.id);

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
            setActiveTab(currentActiveTab);
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
            {/* === HERO SECTION === */}
            <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">

                    {/* Background Image */}
                    <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
                        <img
                            src={BackgroundImageSrc}
                            alt="Agricultural graphic"
                            className="absolute top-0 left-0 w-full h-full object-cover"
                        />
                    </div>

                    {/* Content and Form Wrapper */}
                    <div className="relative flex flex-col lg:flex-row items-start pt-10 pb-12 lg:pb-0 z-20">

                        {/* LEFT COLUMN - CONTENT */}
                        <div className="w-full lg:w-3/5 text-black p-4 md:p-6 pb-20 relative z-20">

                            {/* Breadcrumbs */}
                            <p className="text-sm text-gray-700 mb-2">Home &gt; Company Registration &gt; **Producer Company Registration**</p>

                            {/* Badge */}
                            <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                                #1 Legal Service Provider in India
                            </div>

                            {/* Heading */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
                                Producer Company Registration
                            </h1>

                            {/* Description */}
                            <div className="space-y-2 mb-6">
                                <p className="flex items-center gap-2 text-gray-800 text-sm">
                                    <span className="w-2 h-2 bg-blue-600 block rounded-full"></span>
                                    Error-free **producer company incorporation** with FPO name registration in 3 days.
                                </p>
                                <p className="flex items-center gap-2 text-gray-800 text-sm">
                                    <span className="w-2 h-2 bg-blue-600 block rounded-full"></span>
                                    Expert assisted drafting of **MOA and bylaws** ensuring full legal compliance.
                                </p>
                                <p className="flex items-center gap-2 text-gray-800 text-sm">
                                    <span className="w-2 h-2 bg-blue-600 block rounded-full"></span>
                                    Complete documentation and **ROC filing** handled by experienced professionals.
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4 flex-wrap mb-6">
                                <button className="flex items-center gap-2 bg-[#113C6D] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-indigo-900 transition">
                                    How to Form a Producer Company
                                </button>
                                <button className="flex items-center gap-2 border border-[#113C6D] text-[#113C6D] px-6 py-3 rounded-lg font-semibold hover:bg-[#113C6D] hover:text-white transition">
                                    🧾 View Package
                                </button>
                            </div>
                        </div>

                        {/* RIGHT COLUMN - FORM */}
                        <div className="w-full lg:w-[350px] relative z-30 lg:mt-0 lg:ml-auto mt-[-100px] sm:mt-[-50px]">
                            <div
                                className="w-full p-6 md:p-8 rounded-2xl shadow-xl bg-white"
                                style={{ borderRadius: '24px', border: '1px solid #E0E0E0' }}
                            >
                                <h2 className="text-xl font-semibold mb-6 text-gray-800">Talk to Registration Expert</h2>
                                <form className="space-y-4">
                                    <input
                                        className="w-full px-4 py-3 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                        placeholder="Email"
                                        type="email" 
                                    />
                                    <input
                                        className="w-full px-4 py-3 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                        placeholder="Mobile Number"
                                        type="tel" 
                                    />
                                    <input
                                        className="w-full px-4 py-3 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                        placeholder="City / Pincode"
                                        type="text" 
                                    />
                                    
                                    {/* Whatsapp Toggle */}
                                    <div className="flex items-center justify-between pt-2">
                                        <span className="text-sm text-gray-600">Get easy updates through **Whatsapp**</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#2E96FF]"></div>
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-[#113C6D] text-white py-3 font-semibold rounded-lg transition-colors hover:bg-indigo-900 text-base shadow-md mt-4"
                                    >
                                        Get Started !
                                    </button>
                                    <p className="text-xs text-center font-bold mt-2 text-gray-800">
                                        Plans starting at **₹19,999**
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* --- Pricing Section --- */}
            <section className="py-8 sm:py-16 px-4 md:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">
                        Right Plan For Your Producer Company
                    </h2>
                    <p className="text-sm sm:text-lg text-gray-600 mb-8 sm:mb-10 text-center">
                        Vakilsearch's FPO experts ensure error-free incorporation and compliance under the Companies Act, 2013.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
                        {producerPlans.map((plan, i) => (
                            <FPOPlanCard
                                key={i}
                                plan={plan}
                                hoveredPlanId={hoveredPlanId}
                                setHoveredPlanId={setHoveredPlanId}
                                selectedPlanId={selectedPlanId}
                                setSelectedPlanId={setSelectedPlanId}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* === Main Content Tabs Navigation === */}
            <section className="py-3 sm:py-4 md:py-10 px-4 md:px-8 bg-white border-b border-gray-200 sticky top-0 z-30 shadow-md">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center bg-white rounded-xl w-full text-xs sm:text-sm md:text-base overflow-x-scroll border border-gray-200">
                        {producerTabs.map((tab) => (
                            <a
                                href={`#${tab.id}`} 
                                key={tab.id}
                                className={`flex flex-col flex-shrink-0 min-w-[100px] sm:min-w-[120px] py-3 sm:py-4 px-2 text-center font-bold cursor-pointer transition-all ${activeTab === tab.id ? 'bg-[#E6F2FF] border-b-4 border-[#2E96FF] text-[#2E96FF]' : 'text-gray-700 hover:bg-gray-50'}`}
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
                    <ProducerOverviewContent />
                    <ProducerBenefitsContent />
                    <ProducerEligibilityContent />
                    <ProducerDocumentsContent />
                    <ProducerMoaAoaContent />
                    <ProducerProcessContent />
                    <ProducerFAQsContent faqs={producerFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
                </div>
            </div>

            {/* --- Footer --- */}
            <Footer />
        </div>
    );
}