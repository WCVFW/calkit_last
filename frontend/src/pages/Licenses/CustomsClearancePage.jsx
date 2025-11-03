import React, { useState, useEffect } from "react";
// axios is kept for convention, though not used in frontend logic
import axios from "axios";
import {
    ChevronDown,
    Zap, 
    Briefcase,
    ArrowRight,
    Star,
    CheckCircle,
    FileText,
    Scale, 
    Handshake,
    TrendingUp,
    Users, 
    DollarSign,
    Clock,
    Landmark,
    Globe,
    Shield
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from '../../assets/business.png'; // Reusing a general business image

// --- CUSTOMS CLEARANCE STATIC DATA DEFINITIONS ---

const customsTabs = [
    { id: 'customs-overview-content', label: 'Overview' },
    { id: 'customs-process-content', label: 'Clearance Process' },
    { id: 'customs-benefits-content', label: 'Benefits & Importance' },
    { id: 'customs-documents-content', label: 'Key Documents' },
    { id: 'customs-types-content', label: 'Types of Clearance' },
    { id: 'customs-compliance-content', label: 'Compliance & Regulation' },
    { id: 'customs-why-vakilsearch', label: 'Why Vakilsearch?' },
    { id: 'customs-faqs-content', label: 'FAQs' },
];

const customsOverview = {
    detail: "Customs clearance is the mandatory process of obtaining official permission from the national customs authority to allow goods to be imported into or exported out of a country. It involves verifying trade documentation, assessing duties, and ensuring compliance with all international and domestic trade laws.",
    importance: "Efficient customs clearance is crucial for timely delivery, minimizing detention costs, and maintaining legal standing in international trade. It is the final barrier for goods entering or leaving a country.",
};

const clearanceProcessSteps = [
    "Document Submission & Verification: Filing the necessary documentation (Bill of Entry/Shipping Bill) along with commercial invoices and transport documents to the Customs portal (ICEGATE).",
    "Duty Assessment: Customs officers examine the goods and documents to correctly assess the customs duty, integrated GST (IGST), and compensation cess based on the HSN code.",
    "Examination of Goods: Physical or non-intrusive inspection of a sample of the goods to verify the declaration matches the actual consignment.",
    "Payment of Duties: Remitting the assessed duties and taxes (which can include anti-dumping duties or safeguard duties).",
    "Final Clearance: Upon payment and satisfactory verification, customs grants the 'Let Export Order' (LEO) or 'Out of Charge' (OOC) order, allowing the goods to be shipped or moved from the port.",
];

const clearanceBenefits = [
    { title: "Avoidance of Penalties", icon: Scale, detail: "Ensures compliance with Customs Act, 1962, and related foreign trade policies, preventing heavy fines or seizure of goods." },
    { title: "Timely Delivery & Cost Savings", icon: Clock, detail: "Speeds up the clearance process, minimizing port demurrage charges, warehouse rent, and supply chain disruptions." },
    { title: "Accurate Duty Calculation", icon: DollarSign, detail: "Experts ensure correct HSN classification and valuation, avoiding overpayment of duties or subsequent scrutiny." },
    { title: "Access to Export Benefits", icon: TrendingUp, detail: "Facilitates the seamless availing of government schemes and incentives like drawback, RoDTEP, or Advance Authorisation." },
    { title: "Risk Mitigation", icon: Shield, detail: "Proactively manages documentation and inspection risks, ensuring a smooth flow of cargo and reduced liability." },
];

const requiredDocuments = [
    { doc: "Bill of Entry (Import) / Shipping Bill (Export)", detail: "The primary customs declaration form.", icon: FileText },
    { doc: "Commercial Invoice & Packing List", detail: "Details of the transaction value and itemized goods description.", icon: FileText },
    { doc: "Bill of Lading / Airway Bill", detail: "The transportation contract and document of title.", icon: Landmark },
    { doc: "Import Export Code (IEC) & GSTIN", detail: "Mandatory identification numbers for the transaction.", icon: Briefcase },
    { doc: "AD Code Registration on ICEGATE", detail: "Mandatory registration for foreign exchange transactions at the port.", icon: DollarSign },
    { doc: "Authorisation Letter (for Customs Broker)", detail: "Mandate given to the licensed customs broker to file documents.", icon: Handshake },
];

const clearanceTypes = [
    { title: "Import Clearance", detail: "Involves filing the Bill of Entry (BoE), duty assessment, and physical examination to gain Out of Charge (OOC) from Customs for goods entering the country.", icon: Briefcase },
    { title: "Export Clearance", detail: "Involves filing the Shipping Bill (SB), duty neutralization/scheme claims, and securing the Let Export Order (LEO) before the goods are loaded onto the carrier.", icon: Globe },
    { title: "Prior Filing / Green Channel", detail: "Schemes for trusted traders allowing documentation to be filed before cargo arrival/departure, speeding up processing time.", icon: Zap },
    { title: "Transit Clearance", detail: "For goods moving through a country to another final destination, often requiring specific documentation like a Transit Bond.", icon: ArrowRight },
];

const customsCompliance = [
    { title: "HSN Classification", detail: "Accurate classification under the Harmonized System of Nomenclature (HSN) to determine the correct tariff rate and regulatory compliance.", icon: Scale },
    { title: "Valuation Rules", detail: "Declaration of the transaction value adhering to the Customs Valuation Rules to prevent fines for misdeclaration.", icon: DollarSign },
    { title: "Regulatory Certifications", detail: "Mandatory presentation of certifications from other agencies (e.g., FSSAI, BIS, CDSCO, Plant Quarantine) before customs clearance is granted.", icon: CheckCircle },
    { title: "Record Keeping", detail: "Maintaining all import/export documents for several years post-clearance for potential audits by the Customs Authority.", icon: FileText },
];

const customsWhyVakilsearch = [
    { title: "End-to-End Digital Filing", detail: "Complete handling of all complex customs documents (BoE, SB) and e-filing via the ICEGATE portal.", icon: Zap },
    { title: "Accurate HSN & Duty Assessment", detail: "Ensuring correct HSN classification and valuation to calculate accurate duties, maximizing trade benefits and avoiding penalties.", icon: Scale },
    { title: "Compliance Management", detail: "Proactively manage all port-level compliance requirements, including AD Code registration and necessary regulatory certifications.", icon: CheckCircle },
    { title: "Real-Time Tracking & Support", detail: "Providing clients with real-time updates on cargo status and expert intervention to resolve Customs queries quickly.", icon: Clock },
];

const customsFAQs = [
    { q: "What is the purpose of Customs Clearance?", a: "The purpose is to verify that imported or exported goods comply with all national and international trade regulations, ensure accurate collection of duties (Customs Duty, IGST), and track goods movement for national security and trade statistics." },
    { q: "What is a Bill of Entry (BoE)?", a: "The Bill of Entry (BoE) is the primary legal document filed by an importer or their agent (Customs Broker) with the Customs Department. It contains details of the imported goods and is essential for clearance and duty payment." },
    { q: "Is AD Code mandatory for Customs Clearance?", a: "Yes, **AD Code registration** (Authorised Dealer Code) is mandatory at every port where you intend to transact foreign exchange (exports/imports). Without it, the bank will not process the foreign currency transaction." },
    { q: "How long does the clearance process take?", a: "The process can take **24 hours to several weeks**, depending on the accuracy of documentation, the cargo's risk profile, the need for physical examination, and the efficiency of the port. Expert handling significantly speeds this up." },
    { q: "What is the difference between Customs Duty and IGST?", a: "Customs Duty is levied on imported goods based on the tariff rate and value. Integrated Goods and Services Tax (**IGST**) is levied on imports *in addition* to customs duty and is creditable under the GST framework." },
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


// --- TAB CONTENT COMPONENTS (Customs Clearance Content) ---

const CustomsOverviewContent = () => (
    <section id="customs-overview-content" className="py-12 scroll-mt-24">
        <h2 className="mb-6 text-3xl font-bold text-gray-800">Customs Clearance Services - An Overview</h2>
        <p className="max-w-4xl mb-4 text-lg text-gray-700">
            {customsOverview.detail}
        </p>
        <p className="max-w-4xl mb-8 text-lg text-gray-700">
            **Why is efficient clearance crucial?** {customsOverview.importance} It minimizes detention costs, avoids legal penalties, and maintains the integrity of your global supply chain.
        </p>
    </section>
);

const CustomsProcessContent = () => (
    <section id="customs-process-content" className="py-12 scroll-mt-24">
        <h3 className="mb-6 text-3xl font-bold text-gray-800">The Core Customs Clearance Process</h3>
        <p className="max-w-4xl mb-8 text-lg text-gray-700">
            The process is a rigorous, multi-stage procedure mandated by the Central Board of Indirect Taxes and Customs (CBIC) that applies to all cross-border cargo movements.
        </p>

        <ol className="space-y-5 list-none border-l-2 border-[#022B50] pl-4">
            {clearanceProcessSteps.map((step, i) => (
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

const CustomsBenefitsContent = () => (
    <section id="customs-benefits-content" className="py-12 scroll-mt-24">
        <h3 className="mb-8 text-3xl font-bold text-gray-800">Benefits of Expert Customs Clearance Assistance</h3>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {clearanceBenefits.map((item, i) => (
                <DetailItem key={i} title={item.title} description={item.detail} icon={item.icon} />
            ))}
        </div>
    </section>
);

const CustomsDocumentsContent = () => (
    <section id="customs-documents-content" className="py-12 scroll-mt-24">
        <h3 className="mb-6 text-3xl font-bold text-gray-800">Essential Documents for Customs Declaration</h3>
        <p className="max-w-4xl mb-8 text-lg text-gray-700">
            The timely and accurate submission of the following documents is crucial for minimizing delays and ensuring successful cargo clearance.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {requiredDocuments.map((doc, i) => (
                <div key={i} className="flex items-start gap-3 p-4 border-l-4 border-red-500 rounded-lg shadow-md bg-red-50">
                    <doc.icon className="flex-shrink-0 w-5 h-5 mt-1 text-red-500" />
                    <div>
                        <p className="font-medium text-gray-800">{doc.doc}</p>
                        <p className="text-sm text-gray-600">{doc.detail}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

const CustomsTypesContent = () => (
    <section id="customs-types-content" className="py-12 scroll-mt-24">
        <h3 className="mb-6 text-3xl font-bold text-gray-800">Types of Customs Clearance</h3>
        <p className="max-w-4xl mb-8 text-lg text-gray-700">
            Clearance procedures are specialized based on the direction of trade (import/export) and the required speed of cargo movement.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {clearanceTypes.map((type, i) => (
                <FeatureBox key={i} title={type.title} detail={type.detail} icon={type.icon} />
            ))}
        </div>
    </section>
);

const CustomsComplianceContent = () => (
    <section id="customs-compliance-content" className="py-12 scroll-mt-24">
        <h3 className="mb-6 text-3xl font-bold text-gray-800">Mandatory Compliance and Regulatory Requirements</h3>
        <p className="max-w-4xl mb-8 text-lg text-gray-700">
            Customs clearance is often subject to parallel regulations from other government agencies. Compliance must be holistic to avoid detention.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {customsCompliance.map((item, i) => (
                <FeatureBox key={i} title={item.title} detail={item.detail} icon={item.icon} />
            ))}
        </div>
    </section>
);

const CustomsWhyVakilsearch = () => (
    <section id="customs-why-vakilsearch" className="py-12 scroll-mt-24">
        <h3 className="mb-6 text-3xl font-bold text-gray-800">Why Vakilsearch for Customs Clearance Services?</h3>
        <p className="max-w-4xl mb-8 text-lg text-gray-700">
            Navigating the intersection of trade law, tariff classification, and Customs regulations requires specialized legal and compliance expertise to ensure fast, predictable clearance.
        </p>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {customsWhyVakilsearch.map((service, i) => (
                <div key={i} className="flex items-start gap-3 p-5 border border-indigo-200 shadow-sm bg-indigo-50 rounded-xl">
                    <service.icon className="w-6 h-6 text-[#022B50] mt-1 flex-shrink-0" />
                    <div>
                        <h4 className="mb-1 text-lg font-bold text-gray-800">{service.title}</h4>
                        <p className="text-sm text-gray-600">{service.detail}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

const CustomsFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
    <section id="customs-faqs-content" className="max-w-5xl py-12 mx-auto scroll-mt-24">
        <h3 className="mb-8 text-3xl font-bold text-center text-gray-800">Frequently Asked Questions (FAQs)</h3>

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
export default function CustomsClearancePage() {
    const [activeTab, setActiveTab] = useState(customsTabs[0].id);
    const [faqOpen, setFaqOpen] = useState(null);

    const SCROLL_OFFSET = 120;

    // --- SCROLLSPY IMPLEMENTATION ---
    useEffect(() => {
        const sectionIds = customsTabs.map(tab => tab.id);

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
            {/* === HERO SECTION (Customs Clearance Specific) === */}
            <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
                <div className="relative px-4 pt-12 mx-auto max-w-7xl md:px-8">

                    {/* Background Image Section */}
                    <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
                        <img
                            src={BackgroundImageSrc}
                            alt="Customs Clearance background"
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
                                <span className="font-semibold text-black">Customs Clearance Services</span>
                            </nav>

                            {/* Badge */}
                            <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                                #1 Legal Service Provider In India
                            </div>

                            {/* Title */}
                            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-black md:text-5xl lg:text-6xl">
                                Customs Clearance Services
                            </h1>

                            {/* Bullet Points with CheckCircle */}
                            <div className="mb-8 space-y-4 text-sm text-black lg:text-base">
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="flex-shrink-0 w-5 h-5 mt-1 text-blue-400" />
                                    **Fast and compliant clearance** for your imports and exports across all major Indian ports.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="flex-shrink-0 w-5 h-5 mt-1 text-blue-400" />
                                    Accurate **HSN classification** and duty assessment to **minimize costs**.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="flex-shrink-0 w-5 h-5 mt-1 text-blue-400" />
                                    End-to-end **ICEGATE e-filing** and **AD Code registration** support.
                                </p>
                            </div>
                        </div>

                        {/* Right Column - Form */}
                        <div className="w-full lg:w-[350px] relative z-30 lg:mt-0 lg:ml-auto mt-[-100px] sm:mt-[-50px]">
                            <div
                                className="w-full p-6 bg-white shadow-xl md:p-8 rounded-2xl"
                                style={{ borderRadius: '24px', border: '1px solid #E0E0E0' }}
                            >
                                <h2 className="mb-6 text-xl font-semibold text-center text-black">Get Customs Clearance Support</h2>

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
                        {customsTabs.map((tab) => (
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
                    <CustomsOverviewContent />
                    <CustomsProcessContent />
                    <CustomsBenefitsContent />
                    <CustomsDocumentsContent />
                    <CustomsTypesContent />
                    <CustomsComplianceContent />
                    <CustomsWhyVakilsearch />
                    <CustomsFAQsContent faqs={customsFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
                </div>
            </div>

        </div>
    );
}