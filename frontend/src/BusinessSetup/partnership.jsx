import React, { useState, useEffect } from "react";
import {
    ChevronDown,
    ArrowRight,
    CheckCircle,
    Star,
    Layers, // For compliance/legal structure
    FileText, // For documents/deeds
    Users, // For partners/members
    Key, // For legal framework/rules
    Briefcase, // For directors/business
    IndianRupee, // For financials/fees
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from "@/assets/business.png"

// --- STATIC DATA DEFINITIONS (Partnership Firm Registration Content) ---

const partnershipTabs = [
    { id: 'partnership-overview-content', label: 'Overview' },
    { id: 'partnership-benefits-content', label: 'Benefits' },
    { id: 'partnership-eligibility-content', label: 'Eligibility' },
    { id: 'partnership-documents-content', label: 'Documents Required' },
    { id: 'partnership-process-content', label: 'Process & Deed' },
    { id: 'partnership-fees-content', label: 'Fees & Comparison' },
    { id: 'partnership-faqs-content', label: 'FAQs' },
];

const partnershipPlans = [
    {
        title: "Starter",
        price: "₹2,499",
        originalPrice: "₹3,339",
        discountText: "25% off",
        description: "Ideal for starting Partnership registration",
        features: [
            "Expert assisted process",
            "Partnership deed drafting in 3 days",
            "Deed submission to the local registar on your behalf",
            "PAN Card",
            "Zero balance current account with 7% interest",
        ],
        isRecommended: false,
        govtFeeNote: "+ Govt. Fee & Doc. Charges Applicable",
        cashbackText: "Get additional ₹1000 cashback* (Upon opening current acct)",
    },
    {
        title: "Standard (Recommended)",
        price: "₹4,999",
        originalPrice: "₹7,149",
        discountText: "30% off",
        description: "Perfect for Partnership registration + GST registration",
        features: [
            "Expert assisted process",
            "Partnership deed drafting in 3 days",
            "Deed submission to the local registar on your behalf",
            "PAN Card",
            "GST registration",
            "GSTR-1 & 3B for 12 months(Up to 300 transactions)",
            "Accounting software (1 year license)",
            "Zero balance current account with 7% interest",
        ],
        isRecommended: true,
        govtFeeNote: "+ Govt. Fee & Doc. Charges Applicable",
        cashbackText: "Get additional ₹1000 cashback* (Upon opening current acct)",
    },
    {
        title: "Premium",
        price: "₹8,999",
        originalPrice: "₹13,899",
        discountText: "35% off",
        description: "Complete solution for Partnership registration",
        features: [
            "Dedicated account manager",
            "Partnership deed drafting in 3 days",
            "Deed submission to the local registar on your behalf",
            "PAN Card",
            "GST registration",
            "GSTR-1 & 3B for 12 months(Up to 300 transactions)",
            "Accounting software (1 year license)",
            "Zero balance current account with 7% interest",
            "Trademark Registration for your Brand",
            "ITR Filing for one financial year (Up to 10 lakhs)",
        ],
        isRecommended: false,
        govtFeeNote: "+ Govt. Fee & Doc. Charges Applicable",
        cashbackText: "Get additional ₹1000 cashback* (Upon opening current acct)",
    },
];

const partnershipEligibility = [
    { icon: Users, title: "Minimum Partners", description: "Minimum 2 partners needed; no upper limit defined by law for general business." },
    { icon: Briefcase, title: "Eligible Partners", description: "Individuals, companies, or LLPs can be partners. Foreign nationals and minors cannot be partners." },
    { icon: Key, title: "Capacity to Contract", description: "Partners should be of sound mind, not prohibited by law, and at least 18 years of age (Indian Contract Act, 1872)." },
    { icon: FileText, title: "Partnership Agreement", description: "Existence of an agreement (deed) to share profits and liabilities of a business." },
];

const partnershipBenefits = [
    { icon: Layers, title: "Legal Recognition", detail: "Gives statutory evidence of the firm's existence under the Partnership Act, 1932." },
    { icon: IndianRupee, title: "Bank Account in Firm's Name", detail: "Facilitates smooth financial transactions and credibility with clients/suppliers." },
    { icon: FileText, title: "PAN Card for Partnership", detail: "Necessary for tax returns and compliance with income tax laws." },
    { icon: Star, title: "Increased Credibility", detail: "Ensures confidence with investors, suppliers, and banks compared to unregistered firms." },
    { icon: Key, title: "Dispute Resolution Rights", detail: "Can assert contractual rights in court, making it easier to enforce contracts and recover debts." },
    { icon: Briefcase, title: "Eligibility for MSME", detail: "Qualifies the firm for various government schemes, subsidies, and loans." },
];

const partnershipProcess = [
    "Step 1: Draft the Partnership Deed (Customized by legal experts)",
    "Step 2: Gather necessary documents (ID/Address proof of partners and firm)",
    "Step 3: Apply to the Registrar of Firms (RoF) (Filing handled on your behalf)",
    "Step 4: Pay prescribed government fees (State-specific fees calculated and paid)",
    "Step 5: Verification by Registrar (Queries promptly addressed by our team)",
    "Step 6: Receive Certificate of Registration (Firm is formally registered and legally recognised)",
];

const partnershipDeedContent = [
    "Firm name & business address",
    "Partner's complete details (Name, address, identification)",
    "Nature & extent of business activities",
    "Capital contribution made by each partner",
    "Profit & loss sharing ratio (Percentage)",
    "Duties, obligations, and decision-making power",
    "Conditions for admission & retirement of partners",
    "Dispute resolution clause/procedure",
    "Duration of partnership (Term or indefinite)",
    "Dissolution terms of the firm.",
];

const partnershipFAQs = [
    { q: "What is partnership firm registration in India?", a: "It's the legal procedure of registering a business owned and controlled by two or more individuals under the Indian Partnership Act, 1932, with the Registrar of Firms (RoF)." },
    { q: "Is it mandatory to register a partnership firm?", a: "No, registration is optional, but a registered firm gains **full legal validity**, the right to sue partners or third parties, and higher credibility." },
    { q: "What are the documents required for partnership firm registration?", a: "Key documents include the **Partnership Deed**, identity/address proof (PAN/Aadhaar) of all partners, and the registered office address proof." },
    { q: "How long does it take to register a partnership firm?", a: "The deed drafting takes about 3 days. The time taken for final registration depends on the local Registrar of Firms (RoF) and state processing times." },
    { q: "Can a partnership firm have more than two partners?", a: "Yes. The minimum is 2 partners. While the Partnership Act defines no upper limit, the **Companies Act, 2013**, effectively restricts the number to **50 members** for non-banking businesses." },
    { q: "What is the cost of registering a partnership firm in India?", a: "Professional fees start from **₹2,499**. Government fees (Stamp Duty and RoF charges) vary by state but are typically low (₹500 to ₹3,000 combined)." },
    { q: "What is a partnership deed and why is it important?", a: "It is the written legal agreement regulating the rights, duties, capital contribution, and profit sharing of partners. It is crucial for preventing and resolving internal disputes." },
    { q: "Can I convert a partnership firm to LLP or Pvt Ltd later?", a: "Yes, a registered partnership firm can be converted into a Limited Liability Partnership (LLP) or a Private Limited Company (Pvt Ltd) as the business scales up." },
];

// --- REUSABLE COMPONENTS ---

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

const PartnershipPlanCard = ({ plan, hoveredPlanId, setHoveredPlanId, selectedPlanId, setSelectedPlanId }) => {

    const isSelected = plan.title === selectedPlanId;
    const isHovered = plan.title === hoveredPlanId;
    const isRecommended = plan.title.includes("Recommended");
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

                <h4 className="font-bold text-gray-800 mt-4 sm:mt-6 mb-3 border-t pt-3">What you'll get:</h4>
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


// --- SECTION COMPONENTS (PARTNERSHIP CONTENT) ---

const PartnershipOverviewContent = () => (
    <section id="partnership-overview-content" className="py-8 sm:py-12 scroll-mt-24">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">Partnership Firm Registration</h2>
        <p className="text-base sm:text-lg text-gray-700 mb-6 max-w-4xl">
            **Partnership Firm Registration** is a legal procedure for the registration of ownership and controlled activities of two or more individuals under the **Indian Partnership Act, 1932**. Registration gives legal credibility for the partnership, which ensures smooth business procedures and compliance with Indian laws.
        </p>

        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">What is Partnership Firm Registration?</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 max-w-4xl">
            It's the process of registering a firm with the **Registrar of Firms (RoF)** at the state level, where two or more people enter into an agreement (the Partnership Deed) to share profits and liabilities.
        </p>

        <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-[#2E96FF] shadow-inner">
            <h3 className="text-xl font-bold text-[#113C6D] mb-3">Registered vs. Unregistered</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />**Registered:** Complete legal recognition, ability to sue, greater credibility, and easier access to banking.</li>
                <li className="flex items-start gap-2"><ArrowRight className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />**Unregistered:** Allowed to operate, but has less legal enforceability in disputes (cannot sue third parties or partners).</li>
            </ul>
        </div>
    </section>
);

const PartnershipBenefitsContent = () => (
    <section id="partnership-benefits-content" className="py-8 sm:py-12 scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Benefits of Registering a Partnership Firm</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-4xl">
            Registration provides legal recognition, a clear operational structure, access to tax advantages, simpler compliance, and increased credibility with customers and investors.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {partnershipBenefits.map((benefit, i) => (
                <div key={i} className="p-5 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-lg text-green-800 mb-2 flex items-center gap-2"><benefit.icon className="w-5 h-5" /> {benefit.title}</h4>
                    <p className="text-sm text-gray-700">{benefit.detail}</p>
                </div>
            ))}
        </div>
    </section>
);

const PartnershipEligibilityContent = () => (
    <section id="partnership-eligibility-content" className="py-8 sm:py-12 scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Eligibility for Partnership Firm Registration in India</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-4xl">
            A partnership firm involves a minimum of two capable individuals or entities who agree to execute a valid agreement under the Indian Partnership Act, 1932.
        </p>

        <h4 className="text-xl font-bold mb-3 text-gray-800">Key Requirements:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
            {partnershipEligibility.map((req, i) => (
                <RequirementItem key={i} {...req} />
            ))}
        </div>

        <div className="p-4 text-sm bg-indigo-50 text-indigo-800 rounded-lg border-l-4 border-indigo-500">
            **Note on Maximum Partners:** While the Partnership Act sets no upper limit, the **Companies Act, 2013** restricts a partnership firm to **50 members** if it engages in a non-banking business, otherwise it must register as a company.
        </div>
    </section>
);

const PartnershipDocumentsContent = () => (
    <section id="partnership-documents-content" className="py-8 sm:py-12 scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Documents Required & Partnership Deed Clauses</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 max-w-4xl">
            The core document is the **Partnership Deed**, alongside identity and address proofs of all partners and the firm's registered office.
        </p>

        <h4 className="text-xl font-bold mb-3 text-gray-800">Key Documents Checklist:</h4>
        <div className="space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-200 mb-8">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2"><FileText className="w-4 h-4 text-orange-500 flex-shrink-0 mt-1" />Partnership Deed (Stamped & Notarized)</li>
                <li className="flex items-start gap-2"><FileText className="w-4 h-4 text-orange-500 flex-shrink-0 mt-1" />Identity Proof (PAN/Aadhaar/Passport) of all Partners</li>
                <li className="flex items-start gap-2"><FileText className="w-4 h-4 text-orange-500 flex-shrink-0 mt-1" />Address Proof of all Partners</li>
                <li className="flex items-start gap-2"><FileText className="w-4 h-4 text-orange-500 flex-shrink-0 mt-1" />Address Proof of the Registered Office (Bill/Rent Agreement/NOC)</li>
                <li className="flex items-start gap-2"><FileText className="w-4 h-4 text-orange-500 flex-shrink-0 mt-1" />Passport-size photographs of all partners</li>
            </ul>
        </div>
    </section>
);

const PartnershipProcessContent = () => (
    <section id="partnership-process-content" className="py-8 sm:py-12 scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Step-by-Step Process for Partnership Firm Registration</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-4xl">
            Following this structured process under the Indian Partnership Act, 1932, ensures your firm achieves formal legal status quickly and seamlessly.
        </p>

        <h4 className="text-xl font-bold mb-3 text-gray-800">6 Steps to Registration:</h4>
        <ol className="space-y-4 sm:space-y-5 list-none border-l-2 border-indigo-100 pl-4 mb-10">
            {partnershipProcess.map((step, i) => (
                <ProcessStep key={i} stepNumber={i + 1} step={step} />
            ))}
        </ol>

        <h4 className="text-xl font-bold mb-3 text-gray-800">Partnership Deed – What It Must Contain:</h4>
        <div className="space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700 text-sm">
                {partnershipDeedContent.map((clause, i) => (
                    <li key={i} className="flex items-start gap-2"><Layers className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />{clause}</li>
                ))}
            </ul>
        </div>
    </section>
);

const PartnershipFeesContent = () => (
    <section id="partnership-fees-content" className="py-8 sm:py-12 scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Fees and Comparison: Partnership Firm vs. LLP</h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 max-w-4xl">
            The registration fees for a partnership firm are minimal, primarily covering state-level statutory charges like stamp duty. However, choosing the right business structure (Partnership vs. LLP) is crucial.
        </p>

        <h4 className="text-xl font-bold mb-3 text-gray-800">Registration Fee Breakdown (Indicative):</h4>
        <div className="overflow-x-auto mb-10">
            <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Particulars</th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered Partnership Firm</th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unregistered Partnership Firm</th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Legal Recognition</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                    <tr>
                        <td className="px-3 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Government Fee</td>
                        <td className="px-3 sm:px-6 py-4 text-gray-700">₹500 – ₹1,500 (varies by state)</td>
                        <td className="px-3 sm:px-6 py-4 text-gray-700">Not applicable</td>
                        <td className="px-3 sm:px-6 py-4 text-green-600 font-bold">Yes – Full Legal Validity</td>
                    </tr>
                    <tr>
                        <td className="px-3 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Stamp Duty for Deed</td>
                        <td className="px-3 sm:px-6 py-4 text-gray-700">₹200 – ₹2,000 (depends on state)</td>
                        <td className="px-3 sm:px-6 py-4 text-gray-700">Not applicable</td>
                        <td className="px-3 sm:px-6 py-4 text-red-600 font-bold">No – Limited Rights</td>
                    </tr>
                    <tr>
                        <td className="px-3 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Notarization Charges</td>
                        <td className="px-3 sm:px-6 py-4 text-gray-700">₹300 – ₹800</td>
                        <td className="px-3 sm:px-6 py-4 text-gray-700">Optional</td>
                        <td className="px-3 sm:px-6 py-4 text-gray-700">N/A</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h4 className="text-xl font-bold mb-3 text-gray-800">Partnership Firm vs LLP – Key Differences:</h4>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aspect</th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partnership Firm</th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LLP (Limited Liability Partnership)</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                    <tr>
                        <td className="px-3 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Liability of Partners</td>
                        <td className="px-3 sm:px-6 py-4 text-red-700">**Unlimited**, personal assets at risk</td>
                        <td className="px-3 sm:px-6 py-4 text-green-700">**Limited** to the extent of contribution</td>
                    </tr>
                    <tr>
                        <td className="px-3 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Legal Status</td>
                        <td className="px-3 sm:px-6 py-4 text-gray-700">Not a separate legal entity</td>
                        <td className="px-3 sm:px-6 py-4 text-gray-700">Separate legal entity</td>
                    </tr>
                    <tr>
                        <td className="px-3 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Compliance</td>
                        <td className="px-3 sm:px-6 py-4 text-gray-700">Simple, low cost</td>
                        <td className="px-3 sm:px-6 py-4 text-gray-700">Higher compliance, annual filing with ROC</td>
                    </tr>
                    <tr>
                        <td className="px-3 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Best Suited For</td>
                        <td className="px-3 sm:px-6 py-4 text-gray-700">Small, family-run or low-scale businesses</td>
                        <td className="px-3 sm:px-6 py-4 text-gray-700">Growing startups, SMEs, and investor-backed firms</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
);


const PartnershipFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
    <section id="partnership-faqs-content" className="py-8 sm:py-12 max-w-5xl mx-auto scroll-mt-24">
        <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800 text-center">FAQs on Partnership Firm Registration</h3>

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


// --- MAIN COMPONENT ---
export default function PartnershipLandingPageDesign() {
    const [activeTab, setActiveTab] = useState(partnershipTabs[0].id);
    const [faqOpen, setFaqOpen] = useState(null);
    const [hoveredPlanId, setHoveredPlanId] = useState(null);

    // Default selected plan is 'Standard (Recommended)'
    const [selectedPlanId, setSelectedPlanId] = useState(partnershipPlans.find(p => p.isRecommended)?.title || null);

    const SCROLL_OFFSET = 120;

    // --- SCROLLSPY IMPLEMENTATION ---
    useEffect(() => {
        const sectionIds = partnershipTabs.map(tab => tab.id);

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
                            alt="Partnership firm graphic"
                            className="absolute top-0 left-0 w-full h-full object-cover"
                        />
                    </div>

                    {/* Content and Form Wrapper */}
                    <div className="relative flex flex-col lg:flex-row items-start pt-10 pb-12 lg:pb-0 z-20">

                        {/* LEFT COLUMN - CONTENT */}
                        <div className="w-full lg:w-3/5 text-black p-4 md:p-6 pb-20 relative z-20">

                            {/* Breadcrumbs */}
                            <p className="text-sm text-gray-700 mb-2">Home &gt; Company Registration &gt; **Partnership Firm Registration**</p>

                            {/* Badge */}
                            <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                                #1 Legal Service Provider in India
                            </div>

                            {/* Heading */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
                                Partnership Firm Registration Online in India
                            </h1>

                            {/* Description */}
                            <div className="space-y-2 mb-6">
                                <p className="flex items-center gap-2 text-gray-800 text-sm">
                                    <span className="w-2 h-2 bg-blue-600 block rounded-full"></span>
                                    Register your partnership firm online in India and start your business legally.
                                </p>
                                <p className="flex items-center gap-2 text-gray-800 text-sm">
                                    <span className="w-2 h-2 bg-blue-600 block rounded-full"></span>
                                    **100% online registration process** with senior expert support.
                                </p>
                                <p className="flex items-center gap-2 text-gray-800 text-sm">
                                    <span className="w-2 h-2 bg-blue-600 block rounded-full"></span>
                                    Get access to **legal recognition, tax benefits, and business support**.
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4 flex-wrap mb-6">
                                <button className="flex items-center gap-2 bg-[#113C6D] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-indigo-900 transition">
                                    Know about Partnership Firm Registration in 60 sec
                                </button>
                                <button className="flex items-center gap-2 border border-[#113C6D] text-[#113C6D] px-6 py-3 rounded-lg font-semibold hover:bg-[#113C6D] hover:text-white transition">
                                    🧾 View Sample Certificate
                                </button>
                            </div>
                            
                        </div>

                        {/* RIGHT COLUMN - FORM */}
                        <div className="w-full lg:w-[350px] relative z-30 lg:mt-0 lg:ml-auto mt-[-100px] sm:mt-[-50px]">
                            <div
                                className="w-full p-6 md:p-8 rounded-2xl shadow-xl bg-white"
                                style={{ borderRadius: '24px', border: '1px solid #E0E0E0' }}
                            >
                                <h2 className="text-xl font-semibold mb-6 text-gray-800">Register Your Partnership Firm Today</h2>
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
                                        Get Started Now
                                    </button>
                                    <p className="text-xs text-center font-bold mt-2 text-gray-800">
                                        Plans starting at **₹2,499**
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
                        Right Plan for Your Business
                    </h2>
                    <p className="text-sm sm:text-lg text-gray-600 mb-8 sm:mb-10 text-center">
                        Zolvit provides expert assistance for partnership registration, ensuring compliance and business support.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
                        {partnershipPlans.map((plan, i) => (
                            <PartnershipPlanCard
                                key={i}
                                plan={plan}
                                hoveredPlanId={hoveredPlanId}
                                setHoveredPlanId={setHoveredPlanId}
                                selectedPlanId={selectedPlanId}
                                setSelectedPlanId={setSelectedPlanId}
                            />
                        ))}
                    </div>
                    <div className="mt-8 text-center text-sm text-gray-500">
                        <p>Note: Government and Affiliate charges are additional to the above fee. Refer T&C</p>
                    </div>
                </div>
            </section>

            {/* === Main Content Tabs Navigation === */}
            <section className="py-3 sm:py-4 md:py-10 px-4 md:px-8 bg-white border-b border-gray-200 sticky top-0 z-30 shadow-md">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center bg-white rounded-xl w-full text-xs sm:text-sm md:text-base overflow-x-scroll border border-gray-200">
                        {partnershipTabs.map((tab) => (
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
                    <PartnershipOverviewContent />
                    <PartnershipBenefitsContent />
                    <PartnershipEligibilityContent />
                    <PartnershipDocumentsContent />
                    <PartnershipProcessContent />
                    <PartnershipFeesContent />
                    <PartnershipFAQsContent faqs={partnershipFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
                </div>
            </div>
            {/* The Footer component and its definition were removed to satisfy the user's request. */}
        </div>
    );
}