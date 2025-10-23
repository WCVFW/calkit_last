import React, { useState, useEffect } from "react";
// axios is kept for convention, though not used in frontend logic
import axios from "axios";
import {
    ChevronDown,
    Zap, // For Expert Support/Trust
    Briefcase, // For Compliance/Annual Filings/Corporate Structure
    ArrowRight,
    Star,
    CheckCircle, // For Checklist/Benefits/Audit Readiness
    FileText, // For document/Forms MGT-7, AOC-4, ITR-7
    Scale, // For Regulatory Compliance/Limited Liability
    Handshake, // For Consultation/Social Impact
    TrendingUp, // For Tax Exemptions/Funding
    Lightbulb, // For Guidance/Expertise
    Users, // For Members/Directors
    DollarSign, // For Fees/Penalties
    Clock, // For Timely Filing/Perpetual Succession
    Landmark, // For MCA/ROC
    AlertTriangle,
    MapPin,
    Globe // For Penalties/Non-Compliance
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from '../../assets/business.png'; // Reusing a general business image

// --- SECTION 8 COMPANY COMPLIANCE STATIC DATA DEFINITIONS ---

const complianceTabs = [
    { id: 'sec8-compliance-overview', label: 'Overview' },
    { id: 'sec8-compliance-benefits', label: 'Benefits' },
    { id: 'sec8-compliance-documents', label: 'Documents & Timelines' },
    { id: 'sec8-compliance-mandatory', label: 'Mandatory Checklist' },
    { id: 'sec8-compliance-event', label: 'Event-Based Compliances' },
    { id: 'sec8-compliance-penalties', label: 'Penalties & Due Dates' },
    { id: 'sec8-compliance-why', label: 'Why Vakilsearch' },
    { id: 'sec8-compliance-faqs', label: 'FAQs' },
];

const complianceBenefits = [
    { title: "Limited Liability", icon: Scale, detail: "Personal assets of members are protected from organizational debts or legal issues." },
    { title: "Tax Exemptions", icon: TrendingUp, detail: "Can receive tax exemptions under Sections 12A and 80G, encouraging philanthropic donations." },
    { title: "Perpetual Succession", icon: Clock, detail: "Existence is not affected by changes in membership, ensuring continuity of charitable goals." },
    { title: "Corporate Structure", icon: Briefcase, detail: "Benefits from efficient management, decision-making, and stricter regulatory adherence." },
    { title: "Ease of Funding", icon: DollarSign, detail: "Can easily access grants, subsidies, and funding from government and non-governmental organizations." },
    { title: "Recognition and Trust", icon: Zap, detail: "High credibility due to monitoring by the MCA, which reinforces the organization's non-profit intent." },
];

const coreDocuments = [
    "Memorandum of Association (MoA) & Articles of Association (AoA)",
    "Certificate of Incorporation",
    "Digital Signature Certificate (DSC)",
    "Auditor's Report & Financial Statements (Balance Sheet, P&L)",
    "Income Tax Return (ITR-7)",
];

const complianceTimelines = [
    { title: "Annual Return (Form MGT-7)", document: "Form MGT-7", deadline: "Within 60 days of the Annual General Meeting (AGM)" },
    { title: "Financial Statements (Form AOC-4)", document: "Form AOC-4", deadline: "Within 30 days of the AGM" },
    { title: "Income Tax Return (ITR-7)", document: "Form ITR-7", deadline: "On or before 30th September of the following financial year" },
    { title: "Auditor Appointment (Form ADT-1)", document: "Form ADT-1", deadline: "Within 15 days of the appointment" },
];

const mandatoryChecklist = [
    "Holding Annual General Meeting (AGM) within six months of the financial year-end.",
    "Filing of Financial Statements (balance sheet, P&L) with RoC.",
    "Filing of Annual Return (Form MGT-7) with the Registrar of Companies (RoC).",
    "Filing of Income Tax Return (Form ITR-7) with the IT department.",
    "Maintenance of books of accounts and statutory records.",
    "Regular audits by a qualified Chartered Accountant (CA).",
    "Complying with restrictions on utilization of funds for charitable purposes.",
    "Keeping register of members, directors, and minutes of meetings.",
];

const eventBasedCompliances = [
    { title: "Board Meetings", detail: "Hold at least four board meetings in a calendar year, with a maximum gap of 120 days between two consecutive meetings.", icon: Users },
    { title: "Change in Directors", detail: "Intimate the RoC through appropriate forms within the specified time frame (appointment, resignation, or removal).", icon: Users },
    { title: "Change in Registered Office", detail: "Inform the RoC through the relevant forms within the prescribed time.", icon: MapPin },
    { title: "Foreign Contributions (FCRA)", detail: "If registered under FCRA, submit an annual report detailing the receipts and utilisation of foreign funds.", icon: Globe },
    { title: "GST Compliance", detail: "If annual turnover exceeds the threshold limit, must comply with GST regulations and file regular returns.", icon: DollarSign },
];

const penaltyDetails = [
    { form: "Violation of Objectives (Sec 8)", penalty: "Fine of ₹10 lakh to ₹1 crore, directors face fine and imprisonment. License revoked.", date: "N/A" },
    { form: "Failure to File Annual Returns", penalty: "₹100 per day of default. Additional fines for directors.", date: "Form AOC-4 / MGT-7" },
    { form: "Failure to File ITR (Late Filing)", penalty: "Loss of tax benefits (12A/80G). Interest and fines under Income Tax Act.", date: "ITR-7" },
    { form: "Non-Maintenance of Books", penalty: "Fine of ₹50,000 to ₹5 lakh. Directors face prosecution.", date: "N/A" },
];

const whyVakilsearch = [
    "Expertise and Specialization: Team of experienced CAs, CSs, and legal experts specializing in Section 8 compliance.",
    "End-to-End Support: Assistance from drafting and filing documents (MGT-7, AOC-4) to obtaining all tax exemptions (12A/80G).",
    "Timely Updates and Transparency: Ensures full regulatory compliance with timely updates and proactive handling of statutory deadlines.",
    "Audit Readiness: Services designed to keep your records accurate, compliant, and always ready for statutory audits.",
];

const complianceFAQs = [
    { q: "What are the annual compliance requirements?", a: "The core annual requirements include holding an AGM, filing Forms MGT-7 (Annual Return) and AOC-4 (Financial Statements) with the ROC, and filing Form ITR-7 with the Income Tax Department." },
    { q: "What is the annual compliance charge for a Section 8 company?", a: "The compliance charge varies based on the company's activity and size, but professional packages generally range from affordable entry-level fees for basic filings to comprehensive fees for full tax/audit support." },
    { q: "What happens if I don’t file my annual returns?", a: "The RoC imposes a late fee of ₹100 per day of delay. Prolonged non-filing leads to director disqualification, loss of tax benefits, and potential license revocation under Section 8(11)." },
    { q: "Can Section 8 companies claim full tax exemption?", a: "Yes, provided they have obtained **Section 12A** registration and strictly utilize all income and funds solely for their charitable objectives, as per the MoA." },
    { q: "Is GST applicable to a Section 8 company?", a: "GST compliance is required only if the Section 8 company’s annual turnover exceeds the threshold limit prescribed by the GST Act (which is subject to change based on the nature of their supply)." },
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

// --- TAB CONTENT COMPONENTS (Section 8 Compliance Content) ---

const ComplianceOverviewContent = () => (
    <section id="sec8-compliance-overview" className="py-12 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Section 8 Company Compliance - Overview</h2>
        <p className="text-lg text-gray-700 mb-4 max-w-4xl">
            Section 8 Companies are **non-profit organizations** formed under the **Companies Act, 2013**. They are strictly mandated to reinvest all profits for promoting social welfare, education, art, science, or similar objectives.
        </p>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            Compliance requirements are crucial, ensuring transparency, accountability, and the maintenance of their specialized **Section 8 license** granted by the MCA (Ministry of Corporate Affairs).
        </p>

        <h3 className="text-2xl font-bold mb-6 text-gray-800">Tax and Structural Identity</h3>
        <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-[#E6F0F6] rounded-xl shadow-md border-l-4 border-[#022B50]">
                <h4 className="font-bold text-xl text-gray-800 mb-2 flex items-center gap-2"><Briefcase className="w-6 h-6 text-[#022B50]"/> Corporate Structure</h4>
                <p className="text-sm text-gray-700">Governed by the Companies Act, ensuring a rigorous legal framework, unlike trusts or societies. Cannot use 'Limited' or 'Private Limited' in their name.</p>
            </div>
            <div className="p-5 bg-[#E6F0F6] rounded-xl shadow-md border-l-4 border-[#022B50]">
                <h4 className="font-bold text-xl text-gray-800 mb-2 flex items-center gap-2"><TrendingUp className="w-6 h-6 text-[#022B50]"/> Tax Exemptions</h4>
                <p className="text-sm text-gray-700">Eligible for Section 12A and 80G benefits, which must be maintained through timely filing and adherence to fund utilization rules.</p>
            </div>
        </div>
    </section>
);

const ComplianceBenefitsContent = () => (
    <section id="sec8-compliance-benefits" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800">Benefits of Diligent Section 8 Company Compliance</h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complianceBenefits.map((item, i) => (
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

const ComplianceDocumentsContent = () => (
    <section id="sec8-compliance-documents" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Documents Required for Compliance & Timelines</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            Compliance requires continuous maintenance of statutory and financial records, followed by timely filing of prescribed forms with the MCA (ROC) and Income Tax Department.
        </p>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">Core Compliance Documents Checklist:</h4>
        <div className="grid md:grid-cols-3 gap-4 mb-12">
            {coreDocuments.map((doc, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-red-50 rounded-lg shadow-md border-l-4 border-red-500">
                    <FileText className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 font-medium">{doc}</span>
                </div>
            ))}
        </div>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">Key Annual Filing Timelines (Statutory Due Dates)</h4>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-[#E6F0F6]">
                    <tr>
                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Compliance Form</th>
                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Document/Act</th>
                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Statutory Deadline</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {complianceTimelines.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-4 py-3 text-sm font-semibold text-gray-800">{row.title}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{row.document}</td>
                            <td className="px-4 py-3 text-sm text-gray-700 font-medium">{row.deadline}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </section>
);

const ComplianceMandatoryContent = () => (
    <section id="sec8-compliance-mandatory" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Mandatory Annual Compliance Checklist</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            These compliances are non-negotiable for all Section 8 companies, ensuring accountability and preventing the imposition of severe penalties by the MCA/Income Tax Department.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
            {mandatoryChecklist.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-indigo-50 rounded-lg shadow-md border-l-4 border-indigo-500">
                    <CheckCircle className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{item}</span>
                </div>
            ))}
        </div>
    </section>
);

const ComplianceEventContent = () => (
    <section id="sec8-compliance-event" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Event-Based Annual Compliances & Post-Compliance</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            In addition to regular annual filings, Section 8 companies must comply with event-based requirements triggered by changes or specific financial activities throughout the year.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventBasedCompliances.map((item, i) => (
                <div key={i} className="p-5 bg-white rounded-xl shadow-sm border border-gray-200">
                    <item.icon className="w-6 h-6 text-amber-500 mb-2" />
                    <h4 className="font-bold text-lg text-gray-800 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.detail}</p>
                </div>
            ))}
        </div>

        <h4 className="text-2xl font-bold mb-6 mt-12 text-gray-800">Key Post-Incorporation Compliances</h4>
        <div className="space-y-3 text-gray-700 max-w-4xl border-l-4 border-green-500 pl-4">
            <p className="flex items-start gap-2 list-none">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <span>**Tax Exemptions:** Obtain Section 12AA and Section 80G registration from the Income Tax Department.</span>
            </p>
            <p className="flex items-start gap-2 list-none">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <span>**Fund Utilization:** Ensure strict compliance with the MoA regarding the reinvestment of funds for charitable purposes.</span>
            </p>
            <p className="flex items-start gap-2 list-none">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <span>**FCRA Compliance:** File Form FC-4 annually if the company receives foreign contributions.</span>
            </p>
        </div>
    </section>
);

const CompliancePenaltiesContent = () => (
    <section id="sec8-compliance-penalties" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Penalties and Due Dates for Non-Compliance</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            Failure to comply with statutory requirements under the Companies Act, 2013, can result in severe fines and legal action against both the company and its directors.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
            {penaltyDetails.map((item, i) => (
                <div key={i} className="p-5 bg-red-50 rounded-xl shadow-sm border border-red-500">
                    <AlertTriangle className="w-6 h-6 text-red-700 mb-2" />
                    <h4 className="font-bold text-lg text-gray-800 mb-1">{item.form}</h4>
                    <p className="text-sm text-gray-600 font-medium">**Penalty:** {item.penalty}</p>
                    {item.date !== "N/A" && <p className="text-xs text-gray-500 mt-1">Applicable Form/Area: {item.date}</p>}
                </div>
            ))}
        </div>

        <h4 className="text-2xl font-bold mb-6 text-gray-800">Statutory Due Date Summary</h4>
        <p className="text-lg text-gray-700 mb-4 max-w-4xl">
            Ensure timely filing of the following forms with the ROC to avoid late fees (₹100 per day).
        </p>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-amber-500/20">
                    <tr>
                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Form No</th>
                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Compliance</th>
                        <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Statutory Due Date</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    <tr className="bg-white">
                        <td className="px-4 py-3 text-sm font-semibold text-gray-800">AOC-4</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Directors Report / Financial Statements</td>
                        <td className="px-4 py-3 text-sm text-red-600 font-semibold">Within 30 days of the AGM</td>
                    </tr>
                    <tr className="bg-gray-50">
                        <td className="px-4 py-3 text-sm font-semibold text-gray-800">MGT-7</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Annual Returns</td>
                        <td className="px-4 py-3 text-sm text-red-600 font-semibold">Within 60 days of the AGM</td>
                    </tr>
                    <tr className="bg-white">
                        <td className="px-4 py-3 text-sm font-semibold text-gray-800">ITR -7</td>
                        <td className="px-4 py-3 text-sm text-gray-700">Income Tax Returns</td>
                        <td className="px-4 py-3 text-sm text-red-600 font-semibold">30 September</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
);

const ComplianceWhyVakilsearch = () => (
    <section id="sec8-compliance-why" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Why Vakilsearch?</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            Vakilsearch is a reliable choice for Section 8 company compliances. We understand the unique compliance needs and offer specialized support to ensure smooth functioning and legal adherence.
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {whyVakilsearch.map((service, i) => {
                const [title, detail] = service.includes(':') ? service.split(':').map(s => s.trim()) : [service.split('.')[0].trim(), service.split('.').slice(1).join('.').trim()];
                const Icon = i % 4 === 0 ? Lightbulb : i % 4 === 1 ? Briefcase : i % 4 === 2 ? Clock : Zap;
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

const ComplianceFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
    <section id="sec8-compliance-faqs" className="py-12 max-w-5xl mx-auto scroll-mt-24">
        <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">FAQ's on Section 8 Company Compliance</h3>

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
export default function Section8CompliancePage() {
    const [activeTab, setActiveTab] = useState(complianceTabs[0].id);
    const [faqOpen, setFaqOpen] = useState(null);

    const SCROLL_OFFSET = 120;

    // --- SCROLLSPY IMPLEMENTATION ---
    useEffect(() => {
        const sectionIds = complianceTabs.map(tab => tab.id);

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
            {/* === HERO SECTION (Section 8 Compliance Specific) === */}
            <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">

                    {/* Background Image Section */}
                    <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
                        <img
                            src={BackgroundImageSrc}
                            alt="Section 8 Compliance background"
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
                                <span className="font-semibold text-black">Compliance</span> &gt;{" "}
                                <span className="font-semibold text-black">Section 8</span>
                            </nav>

                            {/* Badge */}
                            <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                                #1 Legal Service Provider In India
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-black">
                                Section 8 Company Compliance
                            </h1>

                            {/* Bullet Points with CheckCircle */}
                            <div className="space-y-4 mb-8 text-sm lg:text-base text-black">
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Expert support to manage all **legal and compliance** for your Section 8 company.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    **End-to-end help** with timely filings, accurate documentation, and audit readiness.
                                </p>
                                <p className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    Includes consultation with professionals to ensure **full regulatory compliance**.
                                </p>
                            </div>
                            <p className="text-sm font-semibold text-gray-700">Complete guide on Section 8 Company Compliance</p>

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
                                <h2 className="text-xl font-semibold mb-6 text-black text-center">Section 8 Company</h2>

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
                                    <input
                                        className="w-full px-4 py-3 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg text-sm text-black placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                        placeholder="Language"
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
                        {complianceTabs.map((tab) => (
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
                    <ComplianceOverviewContent />
                    <ComplianceBenefitsContent />
                    <ComplianceDocumentsContent />
                    <ComplianceMandatoryContent />
                    <ComplianceEventContent />
                    <CompliancePenaltiesContent />
                    <ComplianceWhyVakilsearch />
                    <ComplianceFAQsContent faqs={complianceFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
                </div>
            </div>

        </div>
    );
}