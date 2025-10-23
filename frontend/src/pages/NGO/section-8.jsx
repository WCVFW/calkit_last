import React, { useState, useEffect } from "react";
// axios is kept for convention, though not used in frontend logic
import axios from "axios";
import {
    ChevronDown,
    Zap, // For Credibility/High Trust
    Briefcase, // For Section 8/Companies Act
    ArrowRight,
    Star,
    CheckCircle, // For Checklist/Compliance
    FileText, // For document/Forms
    Scale, // For Compliance/Regulation/Limited Liability
    Smartphone,
    Handshake, // For Partners/Donors
    TrendingUp, // For Growth/Tax Benefits
    Lightbulb, // For Expert Guidance/Objective
    Users, // For Members/Directors/Governing Body
    DollarSign, // For Financials/Funding/Fees
    Download,
    Globe, // For Global Operations/Reach
    Calculator, // For Fees/Budgeting
    Landmark, // For ROC/MCA/Legal Recognition
    Clock, // For Quick Turnaround Time/Perpetual Existence
    Banknote, // For Capital/Funds
    Shield, // For Limited Liability
    Gavel,
    MapPin // For Legal Compliance
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from '../../assets/business.png'; // Reusing a general business image

// --- SECTION 8 COMPANY STATIC DATA DEFINITIONS ---

const section8Tabs = [
    { id: 'sec8-overview-content', label: 'Overview' },
    { id: 'sec8-benefits-content', label: 'Benefits' },
    { id: 'sec8-eligibility-content', label: 'Eligibility' },
    { id: 'sec8-documents-content', label: 'Documents' },
    { id: 'sec8-process-content', label: 'Process' },
    { id: 'sec8-compliance-law-content', label: 'Compliance & Law' },
    { id: 'sec8-why-vakilsearch', label: 'Why Vakilsearch?' },
    { id: 'sec8-faqs-content', label: "FAQ's" },
];

const section8Overview = [
    { title: "Charity", icon: Handshake, detail: "Promoting social welfare and philanthropic activities." },
    { title: "Education", icon: Users, detail: "Advancing knowledge, literacy, and skills development." },
    { title: "Science & Arts", icon: Lightbulb, detail: "Supporting research, innovation, and cultural development." },
    { title: "Environmental Protection", icon: Globe, detail: "Working towards conservation and sustainability." },
];

const section8Benefits = [
    { title: "Legal Recognition", icon: Landmark, detail: "Formal recognition under the Companies Act, enhancing credibility for grants and partnerships." },
    { title: "Tax Benefits", icon: TrendingUp, detail: "Exemptions under Sections 12A and 80G, making donations more appealing." },
    { title: "Limited Liability", icon: Shield, detail: "Protects directors' personal assets from organisational debts." },
    { title: "No Minimum Capital", icon: Banknote, detail: "Allows founders to start operations with minimal financial burden." },
    { title: "Distinct Legal Entity", icon: Gavel, detail: "Can own property, open a bank account, and enter contracts independently." },
    { title: "No Stamp Duty", icon: DollarSign, detail: "Exempted from stamp duty on incorporation, simplifying registration." },
    { title: "High Credibility", icon: Zap, detail: "Strict regulation by the government fosters maximum trust among stakeholders." },
    { title: "Perpetual Existence", icon: Clock, detail: "Continues to exist regardless of changes in membership or directors." },
];

const section8Eligibility = [
    { title: "Purpose/Objective", detail: "Must be formed to promote charitable objectives; profits must be reinvested, not distributed." },
    { title: "Minimum Members/Directors", detail: "Minimum two members and two directors for a private company (three for public)." },
    { title: "Directors' DIN", detail: "All directors must hold a Director Identification Number (DIN)." },
    { title: "Capital Requirement", detail: "No minimum capital requirement, but sufficient capital must be declared to achieve objectives." },
    { title: "ROC Approval", detail: "Requires a license from the Registrar of Companies (ROC) for charitable status." },
    { title: "No Profit Distribution", detail: "Income cannot be distributed as dividends to members." },
];

const section8RequiredForms = [
    { form: "RUN (Reserve Unique Name)", purpose: "Reserve the company’s name, ensuring alignment with non-profit objectives.", icon: Zap },
    { form: "Form INC-12", purpose: "Application for obtaining the crucial Section 8 license from the ROC.", icon: FileText },
    { form: "Form SPICe+", purpose: "Incorporation of the company, combining applications for PAN, TAN, GST, EPFO, and ESIC.", icon: Briefcase },
    { form: "Form DIR-2/INC-9", purpose: "Consent and declaration by directors affirming compliance and non-disqualification.", icon: Users },
    { form: "Draft MOA & AOA", purpose: "Outlines objectives, governance structure, and non-profit commitment.", icon: Gavel },
];

const section8RegistrationProcess = [
    "Obtain Digital Signature Certificates (DSC) for all proposed directors.",
    "Acquire Director Identification Numbers (DIN) for all directors.",
    "Reserve the company name by filing Form RUN with MCA.",
    "Draft legal documents: Memorandum of Association (MoA) and Articles of Association (AoA).",
    "Submit license application (Form INC-12) and incorporation forms (SPICe+) with all required attachments.",
    "Receive Certificate of Incorporation: ROC issues the Section 8 license and Certificate of Incorporation upon approval.",
];

const section8LawAndCompliance = [
    { title: "Companies Act, 2013", details: "The primary law governing formation, ensuring profits are reinvested, and requiring ROC license.", icon: Landmark },
    { title: "Income Tax Act (12A & 80G)", details: "Grants tax exemption on income (12A) and tax deduction to donors (80G).", icon: TrendingUp },
    { title: "MCA Monitoring", details: "Ministry of Corporate Affairs enforces annual filings, audits, and has the authority to revoke the license for non-compliance.", icon: Scale },
    { title: "Annual Compliance Filings", details: "Mandatory filing of Form AOC-4 (financial statements) and Form MGT-7 (annual return) with the ROC.", icon: FileText },
];

const section8WhyVakilsearch = [
    "Expert Assistance: CA/CS/Legal experts guide you through the entire process, ensuring compliance.",
    "Simplified Processes: Digital, step-by-step assistance reduces paperwork and saves time.",
    "Quick Turnaround: Fastest possible name approval, DSC, DIN, and incorporation completion.",
    "Comprehensive Services: Includes 12A, 80G, CSR compliance, auditing, and tax advisory.",
    "Affordable Plans: Flexible pricing with discounts and EMI options to make registration affordable.",
    "Value-Added Benefits: Free DARPAN registration and zero-balance current account with up to 7% interest.",
];

const section8FAQs = [
    { q: "What is the difference between Section 8 Company registration and registering a Trust or Society?", a: "Section 8 Companies are governed by the **MCA (Companies Act, 2013)**, offering high credibility and limited liability. Trusts and Societies are governed by the Indian Trusts Act and Societies Registration Act, respectively, and generally have less stringent compliance requirements and lower public trust." },
    { q: "How long does it take to complete Section 8 Company registration online?", a: "With expert assistance, the process (from DIN/DSC to incorporation) typically takes **7 to 14 working days**, provided all documents are in order and the name is approved quickly." },
    { q: "How many directors are required for a Section 8 Company?", a: "A minimum of **two directors** is required for a private Section 8 Company and three for a public Section 8 Company. All directors must hold a valid DIN." },
    { q: "What are the conditions for obtaining tax exemptions for a Section 8 Company?", a: "To get tax exemptions, the company must register under **Section 12A** (for income exemption) and subsequently under **Section 80G** (to offer tax deduction benefits to donors)." },
    { q: "What happens if a Section 8 Company fails to comply with annual filing requirements?", a: "Failure to file Forms AOC-4 or MGT-7 results in **penalties (₹100 per day)**, additional fines, and the potential for the **ROC to revoke the license** and disqualify directors." },
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

// --- TAB CONTENT COMPONENTS (Section 8 Content) ---

const Section8OverviewContent = () => (
    <section id="sec8-overview-content" className="py-12 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Section 8 Company Registration Overview</h2>
        <p className="text-lg text-gray-700 mb-4 max-w-4xl">
            A **Section 8 Company** is a non-profit organization incorporated under the **Companies Act, 2013** in India. It is established to promote charitable objectives like education, science, arts, or social welfare.
        </p>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            Crucially, a Section 8 Company does not distribute dividends to its members. Instead, all profits or surpluses are **reinvested** into the organization to help achieve its foundational social goals.
        </p>

        <h3 className="text-2xl font-bold mb-6 text-gray-800">Primary Objectives of a Section 8 Company</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {section8Overview.map((item, i) => (
                <FeatureBox key={i} title={item.title} detail={item.detail} icon={item.icon} />
            ))}
        </div>
    </section>
);

const Section8BenefitsContent = () => (
    <section id="sec8-benefits-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800">Benefits of a Section 8 Company</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            The Section 8 structure provides unparalleled advantages, combining the credibility of a company with the regulatory benefits of a non-profit entity.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section8Benefits.map((item, i) => (
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

const Section8EligibilityContent = () => (
    <section id="sec8-eligibility-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Eligibility Criteria for Registering a Section 8 Company</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            To establish a Section 8 Company, specific conditions under the Companies Act, 2013 must be fulfilled, ensuring the entity's dedication to its non-profit mission.
        </p>

        <ol className="space-y-5 list-none border-l-2 border-[#022B50] pl-4">
            {section8Eligibility.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                    <div className="bg-[#022B50] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {i + 1}
                    </div>
                    <div>
                        <span className="text-gray-800 font-bold text-lg block mb-1">{item.title}</span>
                        <span className="text-gray-700 text-md">{item.detail}</span>
                    </div>
                </li>
            ))}
        </ol>
    </section>
);

const Section8DocumentsContent = () => (
    <section id="sec8-documents-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Forms & Documents Required for Incorporation</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            The registration requires submission of several statutory forms to the Ministry of Corporate Affairs (MCA), primarily consolidated under the **SPICe+** process.
        </p>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">Key Statutory Forms Required:</h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section8RequiredForms.map((item, i) => (
                <div key={i} className="p-5 bg-white rounded-lg shadow-sm border border-gray-200">
                    <item.icon className="w-6 h-6 text-red-500 mb-2" />
                    <h4 className="font-bold text-lg text-gray-800 mb-1">{item.form}</h4>
                    <p className="text-sm text-gray-600">{item.purpose}</p>
                </div>
            ))}
        </div>

        <h4 className="text-2xl font-bold mb-6 mt-12 text-gray-800">Documents for Directors, Members, and Office</h4>
        <div className="space-y-3 text-gray-700 max-w-4xl">
            <p className="flex items-start gap-2 list-none">
                <Users className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-1" />
                <span>**Director/Member Documents:** PAN Card (mandatory), Aadhaar Card, Voter ID/Passport, and latest Residential Proof (utility bill/bank statement not older than 2 months), DSC, and DIN.</span>
            </p>
            <p className="flex items-start gap-2 list-none">
                <MapPin className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-1" />
                <span>**Registered Office Documents:** Proof of address (Sale Deed/Rent Agreement), No-Objection Certificate (NOC) from the owner, and latest Utility Bill (not older than 2 months).</span>
            </p>
            <p className="flex items-start gap-2 list-none">
                <DollarSign className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-1" />
                <span>**Financial Documents:** Proposed financial statements or projected income and expenditure for the next 3 years.</span>
            </p>
        </div>
    </section>
);

const Section8ProcessContent = () => (
    <section id="sec8-process-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Section 8 Company Registration Process</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            The registration is streamlined using electronic filing (SPICe+) with the Ministry of Corporate Affairs (MCA). Our experts ensure this multi-step legal process is executed smoothly and quickly.
        </p>

        <ol className="space-y-5 list-none border-l-2 border-[#022B50] pl-4">
            {section8RegistrationProcess.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                    <div className="bg-[#022B50] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {i + 1}
                    </div>
                    <span className="text-gray-700 text-lg">{step}</span>
                </li>
            ))}
        </ol>

        <h4 className="text-2xl font-bold mb-6 mt-12 text-gray-800">Types of Section 8 Company</h4>
        <div className="grid md:grid-cols-3 gap-6">
            <FeatureBox title="Limited by Shares" detail="Liability of members is limited to the amount unpaid on their shares." icon={Briefcase} />
            <FeatureBox title="Limited by Guarantee" detail="Members' liability is limited to a predetermined amount pledged as a guarantee." icon={Shield} />
            <FeatureBox title="Unlimited Company" detail="Members have unlimited liability for the company’s debts (uncommon for Section 8)." icon={Scale} />
        </div>
    </section>
);

const Section8ComplianceLawContent = () => (
    <section id="sec8-compliance-law-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800">Law, Tax, and Annual Compliance Requirements</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            Section 8 Companies are governed by the **Companies Act, 2013**, and are subject to strict legal and tax compliance to maintain their non-profit status and eligibility for benefits.
        </p>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">Governing Law and Tax Benefits</h4>
        <div className="grid md:grid-cols-2 gap-6">
            {section8LawAndCompliance.slice(0, 3).map((item, i) => (
                <DetailItem key={i} title={item.title} description={item.details} icon={item.icon} />
            ))}
        </div>

        <h4 className="text-2xl font-bold mb-6 mt-12 text-gray-800">Key Annual Compliance Requirements</h4>
        <div className="space-y-3 text-gray-700 max-w-4xl">
            <p className="flex items-start gap-2 list-none">
                <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                <span>**Annual Returns Filing:** Submit audited financial statements (**Form AOC-4**) and the annual return (**Form MGT-7**) with the ROC within specified deadlines (30/60 days of AGM).</span>
            </p>
            <p className="flex items-start gap-2 list-none">
                <FileText className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                <span>**Audit & Tax:** Conduct an annual audit by a Chartered Accountant. File Income Tax Returns (ITR) to maintain Sections 12A and 80G tax exemptions.</span>
            </p>
            <p className="flex items-start gap-2 list-none">
                <Users className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                <span>**Board Meetings:** Conduct a minimum of two board meetings (private) or four (public) annually.</span>
            </p>
            <p className="flex items-start gap-2 list-none">
                <Banknote className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                <span>**Funding:** Maintain eligibility for **Government Grants** and **CSR Funding** by ensuring all funds are strictly reinvested in the charitable objectives.</span>
            </p>
        </div>
        
        <div className="mt-12 p-6 bg-red-50 rounded-xl border-l-4 border-red-500 shadow-md">
            <h4 className="font-bold text-xl text-gray-800 mb-2 flex items-center gap-2"><Zap className="w-5 h-5 text-red-500"/> Penalty for Non-Compliance</h4>
            <p className="text-sm text-gray-700">Violation of objectives or profit distribution can result in a fine of **₹10 lakh to ₹1 crore** and license revocation. Directors may face imprisonment and fines.</p>
        </div>
    </section>
);

const Section8WhyVakilsearch = () => (
    <section id="sec8-why-vakilsearch" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Why Vakilsearch for Section 8 Company Registration?</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            Vakilsearch provides a trusted, end-to-end solution for incorporating and managing your Section 8 Company, ensuring fast turnaround times and complete legal compliance.
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {section8WhyVakilsearch.map((service, i) => {
                const [title, detail] = service.split(':').map(s => s.trim());
                const Icon = i % 6 === 0 ? Users : i % 6 === 1 ? Smartphone : i % 6 === 2 ? Clock : i % 6 === 3 ? CheckCircle : i % 6 === 4 ? DollarSign : Landmark;
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

        <div className="mt-12 p-6 bg-[#E6F0F6] rounded-xl border-l-4 border-amber-500 shadow-md">
            <h4 className="font-bold text-xl text-gray-800 mb-2 flex items-center gap-2"><DollarSign className="w-5 h-5 text-amber-500"/> Section 8 Company Registration Fees (Approximate)</h4>
            <p className="text-lg text-gray-700">The total cost generally ranges from **₹15,000 to ₹25,000** (excluding government fees which vary). Our plans start from **₹999 + Govt. Fee** for basic assistance.</p>
        </div>
    </section>
);

const Section8FAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
    <section id="sec8-faqs-content" className="py-12 max-w-5xl mx-auto scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">Section 8 Company Registration FAQ's</h3>
        
        <div className="space-y-4 mb-8 text-center">
            <h4 className="text-2xl font-bold text-[#022B50]">Are you still confused?</h4>
            <p className="text-lg text-gray-700">Our experts can help you navigate the registration process and choose the right structure, saving you time and money.</p>
            <button className="bg-amber-500 text-white py-3 px-8 font-semibold rounded-lg hover:bg-amber-600 transition-colors">
                Talk to NGO expert now!
            </button>
        </div>

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
export default function Section8RegistrationPage() {
    const [activeTab, setActiveTab] = useState(section8Tabs[0].id);
    const [faqOpen, setFaqOpen] = useState(null);

    const SCROLL_OFFSET = 120;

    // --- SCROLLSPY IMPLEMENTATION ---
    useEffect(() => {
        const sectionIds = section8Tabs.map(tab => tab.id);

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
            {/* === HERO SECTION (Section 8 Specific) === */}
            <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">

                    {/* Background Image Section */}
                    <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
                        <img
                            src={BackgroundImageSrc}
                            alt="Section 8 Registration background"
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
                                <span className="font-semibold text-black">Section 8 Registration</span>
                            </nav>

                            {/* Badge */}
                            <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                                #1 Legal Service Provider In India
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-black">
                                Section 8 Company Registration
                            </h1>

                            {/* Bullet Points with CheckCircle */}
                            <div className="space-y-4 mb-8 text-sm lg:text-base text-black">
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Upload to government portal in **7 days**, refund if delayed. T&C*
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Expert-assisted Section 8 registration with **fast turnaround time**.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    **12A, 80G, FCRA** and compliance support in tailored packages.
                                </p>
                            </div>
                            <p className="text-sm font-semibold text-gray-700">Complete guide on Section 8 Registration</p>
                            
                            {/* View Package Button - Styled as a primary action */}
                            <button className="bg-amber-500 text-white py-3 px-8 font-semibold rounded-lg hover:bg-amber-600 transition-colors mt-4">
                                View Package
                            </button>

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
                                <h2 className="text-xl font-semibold mb-6 text-black text-center">Section 8 Company Registration</h2>

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
                                            <div className="w-4 h-4 bg-white rounded-full shadow-md transition-transform transform translate-x-0"></div>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="w-full bg-[#113C6D] text-white py-3 font-semibold rounded-lg transition-colors hover:bg-indigo-900 text-base shadow-md mt-4"
                                    >
                                        Get Started
                                    </button>

                                    {/* Confidentiality Note */}
                                    <p className="text-[11px] text-black text-center mt-3 italic">
                                        No Spam. No Sharing. 100% Confidentiality.
                                    </p>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* === Plans Section (Above Tabs) === */}
            <section className="bg-gray-50 py-12 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">Right plan for your NGO</h3>
                    <p className="text-lg text-gray-700 mb-8 max-w-4xl mx-auto text-center">
                        Vakilsearch's registration experts guide you through the entire process until you obtain the Section 8 registration.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Starter Plan */}
                        <div className="p-6 bg-white rounded-xl shadow-lg border-2 border-gray-200 flex flex-col">
                            <h4 className="text-xl font-bold text-gray-800 mb-2">Starter</h4>
                            <p className="text-sm text-gray-600 mb-4">Ideal for consulting and reserving a name for your NGO</p>
                            <div className="text-3xl font-extrabold text-[#022B50] mb-2">
                                <span className="text-base text-gray-500 line-through">₹1,499</span> ₹999
                            </div>
                            <p className="text-sm text-gray-600 mb-6">+ Govt. Fee</p>
                            <button className="w-full bg-amber-500 text-white py-3 font-semibold rounded-lg hover:bg-amber-600 transition-colors mt-auto">Get Started</button>
                            <div className="mt-4 text-left">
                                <h5 className="font-bold text-sm text-gray-800 mb-1">What you'll get:</h5>
                                <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
                                    <li>Expert assisted process</li>
                                    <li>Guidance on choosing right NGO structure</li>
                                    <li>Name suggestion</li>
                                    <li>Name approval within 7 working days</li>
                                </ul>
                            </div>
                        </div>
                        {/* Standard Plan (Recommended) */}
                        <div className="p-6 bg-white rounded-xl shadow-xl border-2 border-[#022B50] relative flex flex-col">
                            <span className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">Recommended Plan</span>
                            <h4 className="text-xl font-bold text-gray-800 mb-2">Standard</h4>
                            <p className="text-sm text-gray-600 mb-4">Ideal for forming a Section 8 NGO</p>
                            <div className="text-3xl font-extrabold text-[#022B50] mb-2">
                                <span className="text-base text-gray-500 line-through">₹3,999</span> ₹2,999
                            </div>
                            <p className="text-sm text-gray-600 mb-6">+ Govt. Fee | EMI option available.</p>
                            <button className="w-full bg-[#022B50] text-white py-3 font-semibold rounded-lg hover:bg-[#113C6D] transition-colors mt-auto">Get Started</button>
                            <div className="mt-4 text-left">
                                <h5 className="font-bold text-sm text-gray-800 mb-1">What you'll get:</h5>
                                <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
                                    <li>Expert assisted process</li>
                                    <li>DSC in just 24 hours & DIN for directors</li>
                                    <li>Name reserved in 5 days & SPICe+ filing in 7 days*</li>
                                    <li>Incorporation Certificate & Company PAN+TAN</li>
                                    <li>Zero balance current account</li>
                                    <li>**DARPAN Registration Free** 🎉</li>
                                </ul>
                            </div>
                        </div>
                        {/* Premium Plan */}
                        <div className="p-6 bg-white rounded-xl shadow-lg border-2 border-gray-200 flex flex-col">
                            <h4 className="text-xl font-bold text-gray-800 mb-2">Premium</h4>
                            <p className="text-sm text-gray-600 mb-4">Complete End-to-End Solutions for NGOs.</p>
                            <div className="text-3xl font-extrabold text-[#022B50] mb-2">
                                <span className="text-base text-gray-500 line-through">₹29,999</span> ₹14,999
                            </div>
                            <p className="text-sm text-gray-600 mb-6">+ Govt. Fee | EMI option available.</p>
                            <button className="w-full bg-amber-500 text-white py-3 font-semibold rounded-lg hover:bg-amber-600 transition-colors mt-auto">Get Started</button>
                            <div className="mt-4 text-left">
                                <h5 className="font-bold text-sm text-gray-800 mb-1">Key Inclusions:</h5>
                                <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
                                    <li>Dedicated account manager</li>
                                    <li>Name reserved in 3 days & SPICe+ filing in 7 days*</li>
                                    <li>Section **80G** & **12A** in 14 days post NGO formation</li>
                                    <li>Accounting, Auditing (0-300 Trans.), and ITR filing for one FY</li>
                                    <li>Transaction and Tax Advisory & e-ANUDAAN</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 text-center mt-4">Note: Government fees for NGO registration are extra and it varies from state to state. T&C</p>
                </div>
            </section>

            {/* === Main Content Tabs Navigation (Sticky) === */}
            <section className="py-4 md:py-6 px-4 md:px-8 bg-white border-b border-gray-200 sticky top-0 z-30 shadow-md">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center bg-white rounded-xl w-full text-xs md:text-sm lg:text-base overflow-x-auto border border-gray-200">
                        {section8Tabs.map((tab) => (
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
                    <Section8OverviewContent />
                    <Section8BenefitsContent />
                    <Section8EligibilityContent />
                    <Section8DocumentsContent />
                    <Section8ProcessContent />
                    <Section8ComplianceLawContent />
                    <Section8WhyVakilsearch />
                    <Section8FAQsContent faqs={section8FAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
                </div>
            </div>

        </div>
    );
}