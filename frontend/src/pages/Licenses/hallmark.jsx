import React, { useState, useEffect } from "react";
// axios is kept for convention, though not used in frontend logic
import axios from "axios";
import {
    ChevronDown,
    Zap, // For Efficiency/Certification
    Briefcase, // For Business/Corporate Structure
    ArrowRight,
    Star,
    CheckCircle, // For Checklist/Compliance/Quality
    FileText, // For document/Forms
    Scale, // For Standards/Purity/Regulation
    Handshake, // For Customer Trust/Credibility
    TrendingUp, // For Market Value/Growth
    Users, // For Jewellers/Consumers
    DollarSign, // For Fees/Price/Financials
    Clock, // For Validity/Renewal
    Landmark, // For BIS/MHA
    AlertTriangle,
    BookOpen,
    MapPin // For Penalties/Non-Compliance
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from '../../assets/business.png'; // Reusing a general business image

// --- HALLMARK REGISTRATION STATIC DATA DEFINITIONS ---

const hallmarkTabs = [
    { id: 'hallmark-overview-content', label: 'Overview' },
    { id: 'hallmark-metals-standards', label: 'Metals & Standards' },
    { id: 'hallmark-benefits-content', label: 'Benefits' },
    { id: 'hallmark-framework-content', label: 'Legal Framework' },
    { id: 'hallmark-eligibility-docs', label: 'Eligibility & Docs' },
    { id: 'hallmark-procedure-content', label: 'Hallmarking Procedure' },
    { id: 'hallmark-compliance-content', label: 'Post-Registration' },
    { id: 'hallmark-faqs-content', label: 'FAQs' },
];

const hallmarkOverview = {
    detail: "Hallmark registration in India, managed by the **Bureau of Indian Standards (BIS)**, certifies the quality and purity of precious metals like gold and silver, aligning with specific Indian Standards. Each certified piece includes a Jeweller Mark, the Hallmarking Centre’s Mark, and the **Fineness Number**.",
    huid: "Effective 1 April 2023, the 6-digit **Hallmark Unique Identification Number (HUID)** is mandatory for all gold jewellery, ensuring each piece is traceable and meets required purity standards, enhancing transparency and trust for consumers."
};

const metalsAndPurity = [
    { metal: "Gold", purity: "Various levels (e.g., 999 for 24K, 916 for 22K, 750 for 18K)", icon: DollarSign },
    { metal: "Silver", purity: "Confirms purity with symbols like **925** (92.5% purity) or the lion passant stamp.", icon: Scale },
    { metal: "Platinum", purity: "Shows purity levels (e.g., **99.9** for purest, **95** for 95% purity) and includes a diamond shape/balance scales.", icon: Scale },
];

const hallmarkBenefits = [
    { title: "Credibility & Trust", icon: Handshake, detail: "Boosts the credibility of jewellers by confirming that their products meet established standards for purity and quality, strengthening client relationships." },
    { title: "Legal Protection & Compliance", icon: Scale, detail: "Safeguards jewellers against potential violations by ensuring compliance with the BIS Act, 2016, and mandatory hallmarking rules." },
    { title: "Quality Assurance", icon: CheckCircle, detail: "The hallmark serves as a mandatory certification of the purity and quality of the precious metal, assuring consumers of the authenticity of their purchase." },
    { title: "Enhanced Market Value", icon: TrendingUp, detail: "Jewellery with a hallmark holds higher market value due to the official guarantee of its purity and compliance with BIS standards." },
    { title: "Transparency", icon: Zap, detail: "Promotes transparency in the jewellery trade, helping prevent fraud and protecting buyers from purchasing substandard products." },
];

const legalFramework = [
    { title: "BIS Act, 2016", detail: "The main law giving BIS the power to set rules and standards for precious metals and manage the Hallmarking Scheme.", icon: BookOpen },
    { title: "Mandatory Hallmarking Rules", detail: "Requires all gold jewellery to have the **BIS Mark** and a **6-digit HUID** number to confirm purity and fineness (mandatory since 2023).", icon: CheckCircle },
    { title: "Enforcement and Audits", detail: "BIS regularly audits jewellers and assay centers to ensure compliance. Violations can lead to penalties, license suspension, or legal action.", icon: Landmark },
];

const whoNeedsRegistration = [
    "Jewellers and Retailers: If you sell gold or precious metal jewellery, you must get hallmark registration.",
    "Jewellery Manufacturers: If you make jewellery from gold or precious metals, you must register so your products can be certified.",
    "Exporters and Importers: If you bring gold or other precious metals in or out of India, you need to register.",
];

const requiredDocuments = [
    { doc: "Certificate of Registration (ROC/Partnership Deed)", category: "Legal Entity Proof", icon: Briefcase },
    { doc: "GST Registration Certificate", category: "Tax Compliance", icon: DollarSign },
    { doc: "CA Certificate (if turnover > ₹40 lakhs or new firm undertaking)", category: "Financial Proof", icon: FileText },
    { doc: "Sale or Lease Deed Agreement / Rent receipt", category: "Premise Proof", icon: MapPin },
    { doc: "Aadhaar / PAN Card / Passport (ID Proof)", category: "Applicant ID", icon: Users },
    { doc: "Aadhaar-based verification or e-signature", category: "Verification", icon: Zap },
];

const hallmarkingProcedure = [
    "Homogeneity Testing: All items within a given sample are checked to ensure they meet BIS regulatory standards.",
    "Purity Testing: A thorough test where a random item is selected, a preliminary surface test is done, and smaller samples are collected for detailed examination (Assay/XRF/Fire Assay).",
    "Final Marking: After rigorous testing confirms purity, hallmarks (BIS logo, Purity Grade, Jeweller Mark, HUID) are applied using laser, press, or hand marking.",
];

const postRegistrationCompliance = [
    { title: "Ensuring Compliance with Hallmarking Guidelines", detail: "All gold and precious metals must be tested at BIS-authorized Assaying & Hallmarking Centres before they can be sold.", icon: CheckCircle },
    { title: "Regular Audits by BIS Officials", detail: "BIS regularly checks (audits) businesses to ensure they are following the rules, including the proper use of the hallmark and testing procedures.", icon: Landmark },
    { title: "Maintenance of Records and Documentation", detail: "Businesses must keep records of their transactions and certifications, detailing the metals tested and the certificates received.", icon: FileText },
    { title: "Renewal of Hallmark Registration", detail: "The hallmark license must be renewed before it expires (typically annually). Submit a renewal application, pay a fee, and provide updated information.", icon: Clock },
];

const whyVakilsearch = [
    "Expert Consultation: We guide you through the process, fees, and requirements, ensuring you understand BIS Hallmarking.",
    "Streamlined Documentation: We help collect and review the required documents (including CA certificates and premise proofs) for submission.",
    "Application Submission & Follow-Up: We submit your application to BIS and provide continuous follow-up with the nearest hallmarking centre.",
    "Renewal Assistance: We assist with the renewal process to ensure your hallmark license remains active.",
];

const hallmarkFAQs = [
    { q: "What is the difference between Hallmarking and Assaying?", a: "**Assaying** is the technical process of scientifically determining the purity and fineness of the metal. **Hallmarking** is the official stamping (marking) of the jewellery after the assaying process confirms the metal meets the required standard (e.g., 916 for 22K)." },
    { q: "What types of jewellery require mandatory hallmarking?", a: "Mandatory hallmarking applies to **all gold jewellery and artefacts** sold in India. This includes pieces of all weights and is enforced through the HUID system." },
    { q: "How does the hallmarking process impact the price of gold jewellery?", a: "Hallmarking adds a nominal fee for assaying and stamping. It primarily ensures the buyer is paying the accurate price for the stated purity, strengthening customer confidence and justifying the product's value." },
    { q: "Can consumers verify hallmark registration online?", a: "Yes. Consumers can verify the authenticity of a hallmark by checking the BIS website or by using the **BIS Care mobile app**, entering the unique 6-digit **HUID** number." },
    { q: "How long does it take to receive an ISO certificate?", a: "The hallmark registration process with BIS can take anywhere from **30 to 45 days**, depending on the submission of correct documents and the inspection/testing schedule of the nearest Assaying & Hallmarking Centre." },
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


// --- TAB CONTENT COMPONENTS (Hallmark Registration Content) ---

const HallmarkOverviewContent = () => (
    <section id="hallmark-overview-content" className="py-12 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Hallmark Registration - an Overview</h2>
        <p className="text-lg text-gray-700 mb-4 max-w-4xl">
            {hallmarkOverview.detail}
        </p>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            For consumers, hallmarked jewellery guarantees **quality assurances and authenticity**. BIS certified jewellers build **trust and market credibility** by ensuring each piece meets high purity standards.
        </p>

        <h3 className="text-2xl font-bold mb-6 text-gray-800">New Hallmarking Method: HUID (Effective 1 April 2023)</h3>
        <div className="p-5 bg-[#E6F0F6] rounded-xl shadow-md border-l-4 border-[#022B50]">
            <p className="text-gray-700 font-medium">{hallmarkOverview.huid}</p>
        </div>
    </section>
);

const HallmarkMetalsStandards = () => (
    <section id="hallmark-metals-standards" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Types of Precious Metals Covered Under Hallmarking</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            Hallmarking standards ensure that gold, silver, and platinum items meet specific quality and legal standards, guaranteeing the product's authenticity.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
            {metalsAndPurity.map((metal, i) => (
                <FeatureBox key={i} title={metal.metal} detail={metal.purity} icon={metal.icon} />
            ))}
        </div>

        <h4 className="text-2xl font-bold mb-6 mt-12 text-gray-800">Role of the Bureau of Indian Standards (BIS) in Hallmarking</h4>
        <div className="p-5 bg-white rounded-xl shadow-lg border border-gray-200">
            <p className="text-gray-700">BIS plays a vital role in setting rules, managing the **Hallmarking Scheme**, certifying jewellers and assay centers, ensuring purity, and auditing the entire process to protect consumers from fraud.</p>
        </div>
    </section>
);

const HallmarkBenefitsContent = () => (
    <section id="hallmark-benefits-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800">Benefits of Hallmark Registration for Jewellers and Consumers</h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hallmarkBenefits.map((item, i) => (
                <DetailItem key={i} title={item.title} description={item.detail} icon={item.icon} />
            ))}
        </div>
    </section>
);

const HallmarkFrameworkContent = () => (
    <section id="hallmark-framework-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Legal Framework Governing Hallmark Registration in India</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            India's laws for hallmark registration, based on the **BIS Act, 2016**, ensure that precious metals meet high standards for purity and quality, protecting buyers and sellers alike.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
            {legalFramework.map((law, i) => (
                <FeatureBox key={i} title={law.title} detail={law.detail} icon={law.icon} />
            ))}
        </div>

        <h4 className="text-2xl font-bold mb-6 mt-12 text-gray-800">Types of BIS Hallmarking Registration Certificate</h4>
        <div className="p-5 bg-[#E6F0F6] rounded-xl shadow-md border-l-4 border-[#022B50]">
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>**BIS Registration for Jewellers or Showroom:** Mandatory for jewellers who manufacture or sell gold and silver jewellery. Each sales outlet must obtain separate registration.</li>
                <li>**BIS Recognition of Assaying & Hallmarking Centre (A&H Centre):** Required for the third-party evaluation centers where the purity of precious metals is examined and stamped.</li>
            </ul>
        </div>
    </section>
);

const HallmarkEligibilityDocs = () => (
    <section id="hallmark-eligibility-docs" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Eligibility, Requirements, and Document Checklist</h3>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">Who Needs to Apply for Hallmark Registration?</h4>
        <div className="space-y-3 text-gray-700 max-w-4xl border-l-4 border-amber-500 pl-4 mb-12">
            {whoNeedsRegistration.map((item, i) => (
                <li key={i} className="flex items-start gap-2 list-none">
                    <Users className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                    <span>{item}</span>
                </li>
            ))}
        </div>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">Key Documents Required for Hallmark Registration</h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {requiredDocuments.slice(0, 6).map((doc, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-red-50 rounded-lg shadow-md border-l-4 border-red-500">
                    <doc.icon className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                    <div>
                        <p className="text-gray-800 font-medium">{doc.doc.split('(')[0].trim()}</p>
                        <p className="text-sm text-gray-600">{doc.category}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

const HallmarkProcedureContent = () => (
    <section id="hallmark-procedure-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">The Hallmarking Procedure in India (Testing and Marking)</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            The hallmarking procedure is a rigorous three-stage process, primarily focused on scientific testing at the BIS Assaying & Hallmarking Centres (A&H Centres).
        </p>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">Stages of the Hallmarking Procedure</h4>
        <ol className="space-y-5 list-none border-l-2 border-[#022B50] pl-4">
            {hallmarkingProcedure.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                    <div className="bg-[#022B50] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {i + 1}
                    </div>
                    <span className="text-gray-700 text-lg">{step}</span>
                </li>
            ))}
        </ol>

        <h4 className="text-2xl font-bold mb-6 mt-12 text-gray-800">Methods Used for Purity Testing (Assaying)</h4>
        <div className="grid md:grid-cols-2 gap-6">
            <FeatureBox title="Fire Assay Testing (Cupellation)" detail="Considered one of the most reliable methods for testing gold purity. The metal is melted, and impurities are separated, leaving the pure metal." icon={Scale} />
            <FeatureBox title="X-Ray Fluorescence (XRF) Testing" detail="A non-destructive method that uses X-ray technologies to measure the purity of metal objects quickly, often used for initial testing." icon={Scale} />
        </div>
    </section>
);

const HallmarkComplianceContent = () => (
    <section id="hallmark-compliance-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Post-Registration Compliance for Hallmark License Holders</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            Maintaining a hallmark license requires continuous adherence to BIS rules, regular audits, and timely renewal to prevent penalties and license suspension.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {postRegistrationCompliance.map((compliance, i) => (
                <FeatureBox key={i} title={compliance.title} detail={compliance.detail} icon={compliance.icon} />
            ))}
        </div>

        <h4 className="text-2xl font-bold mb-6 mt-12 text-gray-800">How to Identify Hallmarked Jewellery?</h4>
        <div className="p-5 bg-[#E6F0F6] rounded-xl shadow-md border-l-4 border-red-500">
            <ul className="list-disc list-inside space-y-2 text-gray-700 font-medium">
                <li>Look for the **BIS Hallmark** (triangle shape with 'BIS' inside).</li>
                <li>Check the **Purity Grade** (e.g., 916 for 22K).</li>
                <li>Look for the **6-digit HUID** number (Hallmark Unique Identification Number).</li>
                <li>Verify the Hallmark using the **BIS Care mobile app** or website.</li>
            </ul>
        </div>
    </section>
);

const HallmarkWhyVakilsearch = () => (
    <section id="hallmark-why-vakilsearch" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Procedure for Hallmark Registration in India With Vakilsearch</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            We streamline the entire hallmark registration process—from initial consultation and documentation review to application submission and renewal—to ensure a seamless and compliant journey.
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {whyVakilsearch.map((service, i) => {
                const Icon = i % 4 === 0 ? Handshake : i % 4 === 1 ? FileText : i % 4 === 2 ? Landmark : Clock;
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
        
        <div className="mt-12 p-6 bg-[#E6F0F6] rounded-xl border-l-4 border-red-500 shadow-md">
            <p className="text-lg text-gray-700 font-semibold">Disclaimer: The process may take **30 to 45 days**, and while Vakilsearch ensures correct procedures, final application approval is solely dependent on the Hallmark center's criteria and inspection.</p>
        </div>
    </section>
);

const HallmarkFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
    <section id="hallmark-faqs-content" className="py-12 max-w-5xl mx-auto scroll-mt-24">
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
export default function HallmarkRegistrationPage() {
    const [activeTab, setActiveTab] = useState(hallmarkTabs[0].id);
    const [faqOpen, setFaqOpen] = useState(null);

    const SCROLL_OFFSET = 120;

    // --- SCROLLSPY IMPLEMENTATION ---
    useEffect(() => {
        const sectionIds = hallmarkTabs.map(tab => tab.id);

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
            {/* === HERO SECTION (Hallmark Registration Specific) === */}
            <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">

                    {/* Background Image Section */}
                    <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
                        <img
                            src={BackgroundImageSrc}
                            alt="Hallmark Registration background"
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
                                <span className="font-semibold text-black">Hallmark Registration in India</span>
                            </nav>

                            {/* Badge */}
                            <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                                #1 Legal Service Provider In India
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-black">
                                Hallmark Registration in India
                            </h1>

                            {/* Bullet Points with CheckCircle */}
                            <div className="space-y-4 mb-8 text-sm lg:text-base text-black">
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Get a competitive edge with **BIS hallmark certification**, ensuring product safety. T&C*
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Build customer trust by certifying your products meet India’s **highest standards**.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Expert-assisted, hassle-free registration starting at **₹5000 + GST**. T&C apply.
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
                                <h2 className="text-xl font-semibold mb-6 text-black text-center">Hallmark Registration</h2>

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
                                        Consult an Expert
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
                        {hallmarkTabs.map((tab) => (
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
                    <HallmarkOverviewContent />
                    <HallmarkMetalsStandards />
                    <HallmarkBenefitsContent />
                    <HallmarkFrameworkContent />
                    <HallmarkEligibilityDocs />
                    <HallmarkProcedureContent />
                    <HallmarkComplianceContent />
                    <HallmarkWhyVakilsearch />
                    <HallmarkFAQsContent faqs={hallmarkFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
                </div>
            </div>

        </div>
    );
}