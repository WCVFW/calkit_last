import React, { useState, useEffect } from "react";
// axios is kept for convention, though not used in frontend logic
import axios from "axios";
import {
  ChevronDown,
  Zap, // For compelling/Credibility
  Briefcase, // For Section 8/Company Act
  ArrowRight,
  Star,
  CheckCircle,
  FileText, // For document/MOA/AOA
  Scale, // For Compliance/Regulation
  Smartphone,
  Handshake, // For Donations/Partnerships
  TrendingUp, // For Grants/Growth
  Lightbulb, // For Expert Guidance/Choosing Structure
  Users, // For Team/Members/Governing Body
  DollarSign, // For Financials/Funding/Fees
  Download,
  Globe, // For Level of Operation
  Calculator, // For Fees/Budgeting
  Landmark, // For Society/Trust/Acts
  Clock, // For Time/Process
  Heart, // For Social Cause/Role
  BookOpen, // For Acts Governing
  MapPin,
  CheckCircle2 // For Address Proof
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from '../../assets/business.png'; // Reusing a general business image

// --- NGO REGISTRATION STATIC DATA DEFINITIONS ---

const ngoTabs = [
  { id: 'ngo-overview-content', label: 'Overview' },
  { id: 'ngo-role-eligibility-content', label: 'Role & Eligibility' },
  { id: 'ngo-acts-classification-content', label: 'Acts & Types' },
  { id: 'ngo-documents-process-content', label: 'Process & Docs' },
  { id: 'ngo-benefits-funding-content', label: 'Benefits & Funding' },
  { id: 'ngo-why-vakilsearch', label: 'Why Vakilsearch?' },
  { id: 'ngo-faqs-content', label: "FAQ's" },
];

const ngoRoles = [
  { title: "Advocacy", icon: Zap, detail: "NGOs advocate for policy changes and raise awareness about critical social issues." },
  { title: "Service Delivery", icon: Heart, detail: "They provide essential services like healthcare, education, and disaster relief." },
  { title: "Community Development", icon: Users, detail: "NGOs work on grassroots levels to empower local communities and improve their quality of life." },
  { title: "Research and Innovation", icon: Lightbulb, detail: "They conduct research to develop innovative solutions for social problems." },
];

const ngoEligibility = [
  "Minimum Members: A minimum of three members is required to start an NGO.",
  "Age: All founding members must be at least 18 years old.",
  "Purpose: The NGO must have a clear and specific purpose, focusing on social, environmental, or economic issues.",
  "Documentation: Founders must provide valid identification documents, including PAN cards and address proofs.",
  "Compliance: Must comply with the Societies, Trusts, or Companies Act, depending on the registration chosen.",
];

const ngoActs = [
  { title: "Societies Registration Act, 1860", icon: Landmark, detail: "Governs the registration and functioning of societies engaged in charitable activities." },
  { title: "Indian Trusts Act, 1882", icon: Landmark, detail: "Applicable to NGOs formed as public charitable trusts, outlining their registration and management." },
  { title: "Companies Act, 2013 (Section 8)", icon: Briefcase, detail: "Governs NGOs registered as Section 8 companies, focusing on promoting charitable objectives." },
];

const ngoClassification = [
  { type: "Human Rights NGOs", detail: "Focus on advocating for and protecting human rights and freedoms." },
  { type: "Environmental NGOs", detail: "Work towards environmental conservation, sustainability, and combating climate change." },
  { type: "Health NGOs", detail: "Dedicated to improving healthcare access, services, and public health initiatives." },
  { type: "Education NGOs", detail: "Promote education, literacy, and skills development among disadvantaged communities." },
  { type: "Women's Rights NGOs", detail: "Advocate for gender equality, women's empowerment, and addressing issues like violence and discrimination." },
];

const ngoDocuments = [
  { title: "Memorandum of Association (MOA)", icon: FileText, details: "Outlines the NGO's objectives and governing structure." },
  { title: "Articles of Association (AOA)", icon: FileText, details: "Defines the rules and regulations for the NGO's internal management." },
  { title: "Identity Proofs", icon: Users, details: "Valid identification documents of all founding members (PAN, Aadhar, Voter ID)." },
  { title: "Address Proof", icon: MapPin, details: "Proof of the registered office address (utility bill or rental agreement)." },
  { title: "Registration Fee", icon: DollarSign, details: "Fees applicable for registration under the chosen Act." },
];

const ngoProcessSteps = [
  "Choose the Type: Decide on the legal structure (society, trust, or Section 8 company) based on the NGO's objectives.",
  "Prepare Documents: Gather necessary documents, including the MOA, AOA, identity proofs, and address proof.",
  "Apply for Registration: Submit the application along with the required documents to the respective registrar under the chosen Act.",
  "Verification and Approval: The registrar verifies documents and conducts checks. Upon satisfaction, the NGO is registered with a certificate.",
  "Compliance: Fulfill ongoing compliance requirements, such as annual filings, maintaining proper accounts, and adhering to regulatory norms.",
];

const ngoBenefits = [
  { title: "Legal Recognition", icon: Scale, detail: "Gain legal status and recognition for fundraising, receiving grants, and entering into contracts." },
  { title: "Tax Benefits (12A & 80G)", icon: TrendingUp, detail: "Avail tax exemptions on income generated and donations received under sections 12A and 80G of the Income Tax Act." },
  { title: "Credibility & Trust", icon: Zap, detail: "Enhance credibility and trust among donors, beneficiaries, and stakeholders." },
  { title: "Access to Grants", icon: DollarSign, detail: "Qualify for government and private sector grants, funding opportunities, and partnerships." },
  { title: "Operational Sustainability", icon: Clock, detail: "Ensure long-term sustainability through structured governance, transparency, and accountability." },
];

const fundRaisingWays = [
  "Donations: Solicit donations from individuals, businesses, and philanthropic organisations.",
  "Fundraising Events: Organise events such as charity galas, marathons, and concerts to raise funds and awareness.",
  "Corporate Partnerships (CSR): Collaborate with corporate entities through CSR initiatives and sponsorships.",
  "Online Campaigns: Use crowdfunding platforms and social media to reach a broader audience and collect donations.",
];

const ngoVakilsearchSteps = [
  { step: "Expert Guidance", detail: "Avail expert advice on choosing the appropriate legal structure for your NGO, whether it's a society, trust, or Section 8 company registration." },
  { step: "Document Preparation", detail: "Get expert assistance in preparing and filing necessary documents such as the Memorandum of Association (MOA) and Articles of Association (AOA)." },
  { step: "Application Submission", detail: "Our team will handle the entire registration process, including submitting applications to the relevant authorities and following up on approvals." },
  { step: "Compliance Support", detail: "Get ongoing compliance support, ensuring your NGO adheres to regulatory requirements and maintains legal status." },
  { step: "Online Platform", detail: "Use our online platform for easy document submission, tracking application status, and accessing legal resources." },
];

const ngoFAQs = [
  { q: "What is the main purpose of an NGO?", a: "The main purpose is to promote non-profit goals, focusing on areas like social welfare, education, public health, or environmental conservation, serving the community rather than shareholders." },
  { q: "Is GST applicable for NGOs?", a: "GST is generally applicable only if the NGO's activities fall under 'supply' and its annual turnover exceeds the threshold limit for taxable supplies (currently ₹20/40 lakhs)." },
  { q: "What are the tax benefits for NGOs in India?", a: "NGOs can avail two main benefits: **Section 12A** grants tax exemption on their income, and **Section 80G** allows donors to claim a deduction on their taxable income for donations made to the NGO." },
  { q: "Who regulates NGOs in India?", a: "NGOs are regulated by different authorities depending on their structure: Registrar of Societies (for Societies), Charity Commissioner (for Trusts), and Ministry of Corporate Affairs (for Section 8 Companies)." },
  { q: "Can an NGO work in multiple states or districts after registration?", a: "Yes, once legally registered, an NGO is generally allowed to operate across multiple states and districts, provided its MOA/Trust Deed permits it and it complies with local regulations." },
  { q: "What is the process to apply for FCRA registration for an NGO?", a: "FCRA (Foreign Contribution Regulation Act) registration is applied for online via the Ministry of Home Affairs portal after the NGO is 3+ years old and has spent a minimum of ₹15 lakhs on its objectives in the last 3 financial years." },
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

const ServiceIncludeBox = ({ title, detail, icon: Icon }) => (
  <div className="p-5 bg-white rounded-lg shadow-sm border border-gray-200">
    <Icon className="w-6 h-6 text-amber-500 mb-2" />
    <h4 className="font-bold text-lg text-gray-800 mb-1">{title}</h4>
    <p className="text-sm text-gray-600">{detail}</p>
  </div>
);

// --- TAB CONTENT COMPONENTS (NGO Registration Content) ---

const NGOOverviewContent = () => (
  <section id="ngo-overview-content" className="py-16 bg-gray-50 scroll-mt-24">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 text-center">
        NGO Registration Online - Overview
      </h2>

      <p className="text-lg text-gray-700 mb-4 max-w-4xl mx-auto text-center">
        Non-Governmental Organisation (<strong>NGO</strong>) registration in India involves various legal structures:{" "}
        <strong>Society</strong> (Societies Registration Act, 1860, min 7 members),{" "}
        <strong>Trust</strong> (Indian Trusts Act, 1882), or{" "}
        <strong>Section 8 Company</strong> (Companies Act, 2013). The choice depends on the organisation's
        nature, objectives, and scale.
      </p>

      <p className="text-lg text-gray-700 mb-12 max-w-4xl mx-auto text-center">
        NGOs aiming for national recognition, government grants, and foreign contributions should register with the{" "}
        <strong>NGO-Darpan Portal</strong> (managed by NITI Aayog) and secure a <strong>DARPAN ID</strong>.
        This is crucial for legitimacy and accessing resources.
      </p>

      <h3 className="text-2xl md:text-3xl font-bold mb-10 text-gray-900 text-center">
        Choose the Right Plan for Your NGO
      </h3>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Starter Plan */}
        <div className="p-8 bg-white rounded-2xl shadow-lg border-2 border-[#2E96FF]/20 flex flex-col hover:shadow-xl transition-all">
          <h4 className="text-xl font-bold text-gray-900 mb-2">Starter</h4>
          <p className="text-sm text-gray-600 mb-4">
            Ideal for consulting and reserving a name for your NGO
          </p>

          <div className="text-3xl font-extrabold text-[#022B50] mb-2">
            <span className="text-base text-gray-400 line-through mr-2">₹1,499</span> ₹999
          </div>
          <p className="text-sm text-gray-600 mb-6">+ Govt. Fee</p>

          <div className="bg-amber-100 text-amber-700 text-sm px-3 py-1 rounded-md w-fit mb-4">
            🎉 ₹500 OFF OFFER
          </div>

          <button className="w-full bg-amber-500 text-white py-3 font-semibold rounded-lg hover:bg-amber-600 transition-colors mt-auto">
            Get Started
          </button>

          <div className="mt-6 text-left">
            <h5 className="font-semibold text-sm text-gray-800 mb-2">What you'll get:</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              {[
                "Expert assisted process",
                "Guidance on choosing right NGO structure",
                "Name suggestion",
                "Name approval within 7 working days",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="text-[#2E96FF] w-4 h-4 mt-0.5" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Standard Plan (Recommended) */}
        <div className="p-8 bg-white rounded-2xl shadow-2xl border-2 border-[#2E96FF] relative flex flex-col hover:shadow-2xl transition-all">
          <span className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
            Recommended Plan
          </span>

          <h4 className="text-xl font-bold text-gray-900 mb-2">Standard</h4>
          <p className="text-sm text-gray-600 mb-4">Ideal for forming a Section 8 NGO</p>

          <div className="text-3xl font-extrabold text-[#022B50] mb-2">
            <span className="text-base text-gray-400 line-through mr-2">₹3,999</span> ₹2,999
          </div>
          <p className="text-sm text-gray-600 mb-4">+ Govt. Fee</p>

          <div className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-md w-fit mb-4">
            💸 25% OFF | EMI Available
          </div>

          <button className="w-full bg-[#022B50] text-white py-3 font-semibold rounded-lg hover:bg-[#113C6D] transition-colors mt-auto">
            Get Started
          </button>

          <div className="mt-6 text-left">
            <h5 className="font-semibold text-sm text-gray-800 mb-2">What you'll get:</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              {[
                "Expert assisted process",
                "DSC in just 24 hours",
                "DIN for directors",
                "Company name reserved in 5 days",
                "SPICe+ form filling in 7 days*",
                "Incorporation Certificate",
                "Company PAN + TAN",
                "Zero balance current account (up to 7% interest)",
                "DARPAN Registration Free 🎉",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="text-[#2E96FF] w-4 h-4 mt-0.5" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Premium Plan */}
        <div className="p-8 bg-white rounded-2xl shadow-lg border-2 border-[#2E96FF]/20 flex flex-col hover:shadow-xl transition-all">
          <h4 className="text-xl font-bold text-gray-900 mb-2">Premium</h4>
          <p className="text-sm text-gray-600 mb-4">
            Complete End-to-End Solutions for NGOs.
          </p>

          <div className="text-3xl font-extrabold text-[#022B50] mb-2">
            <span className="text-base text-gray-400 line-through mr-2">₹29,999</span> ₹14,999
          </div>
          <p className="text-sm text-gray-600 mb-4">+ Govt. Fee</p>

          <div className="bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-md w-fit mb-4">
            🎯 50% OFF | EMI Available
          </div>

          <button className="w-full bg-amber-500 text-white py-3 font-semibold rounded-lg hover:bg-amber-600 transition-colors mt-auto">
            Get Started
          </button>

          <div className="mt-6 text-left">
            <h5 className="font-semibold text-sm text-gray-800 mb-2">Key Inclusions:</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              {[
                "Dedicated account manager",
                "DSC in 24 hours",
                "DIN for directors",
                "Company name reserved in 3 days",
                "SPICe+ form filling in 7 days*",
                "Incorporation Certificate",
                "Company PAN + TAN",
                "Zero balance current account (up to 7% interest)",
                "Section 80G and 12A in 14 days post formation",
                "DARPAN Registration Free 🎉",
                "CSR Filings & e-ANUDAAN",
                "Accounting, Auditing & ITR for one FY (0–300 Transactions)",
                "Transaction and Tax Advisory by a Professional Auditor",
                "1-year Accounting Software License",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="text-[#2E96FF] w-4 h-4 mt-0.5" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const NGORoleEligibilityContent = () => (
  <section id="ngo-role-eligibility-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-8 text-gray-800">Role of NGOs & Eligibility to Start</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      NGOs are instrumental in addressing key issues like poverty, education, and healthcare. They operate independently, leveraging donations and grants to drive change.
    </p>

    <h4 className="text-2xl font-bold mb-6 text-gray-800">Primary Roles of NGOs in India</h4>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {ngoRoles.map((item, i) => (
        <ServiceIncludeBox key={i} title={item.title} detail={item.detail} icon={item.icon} />
      ))}
    </div>

    <h4 className="text-2xl font-bold mb-6 mt-12 text-gray-800">Eligibility Criteria to Start an NGO</h4>
    <div className="space-y-4">
      {ngoEligibility.map((item, i) => (
        <div key={i} className="flex items-start gap-4 p-4 bg-indigo-50 rounded-lg shadow-md border-l-4 border-indigo-500">
          <CheckCircle className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
          <span className="text-gray-700 text-lg">{item}</span>
        </div>
      ))}
    </div>
  </section>
);

const NGOActsClassificationContent = () => (
  <section id="ngo-acts-classification-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-8 text-gray-800">Governing Acts and Classification of NGOs</h3>

    <h4 className="text-2xl font-bold mb-6 text-gray-800">Acts Governing NGO Registration Process</h4>
    <div className="grid md:grid-cols-3 gap-6">
      {ngoActs.map((item, i) => (
        <DetailItem
          key={i}
          title={item.title}
          description={item.detail}
          icon={BookOpen} // Use BookOpen for legal acts
        />
      ))}
    </div>

    <h4 className="text-2xl font-bold mb-6 mt-12 text-gray-800">Classification of NGOs (By Orientation)</h4>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {ngoClassification.map((item, i) => (
        <div key={i} className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <h5 className="font-bold text-lg text-gray-800 mb-1 flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-amber-500" />
            {item.type}
          </h5>
          <p className="text-sm text-gray-600">{item.detail}</p>
        </div>
      ))}
    </div>
  </section>
);

const NGODocumentsProcessContent = () => (
  <section id="ngo-documents-process-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-8 text-gray-800">Documents Required & Registration Process</h3>

    <h4 className="text-2xl font-bold mb-6 text-gray-800">Documents Required for NGO Registration in India</h4>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {ngoDocuments.map((doc, i) => (
        <div key={i} className="flex items-start gap-3 p-4 bg-red-50 rounded-lg shadow-md border-l-4 border-red-500">
          <doc.icon className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
          <div>
            <p className="text-gray-800 font-medium">{doc.title}</p>
            <p className="text-sm text-gray-600">{doc.details}</p>
          </div>
        </div>
      ))}
    </div>

    <h4 className="text-2xl font-bold mb-6 text-gray-800">NGO Registration Process in India</h4>
    <ol className="space-y-5 list-none border-l-2 border-[#022B50] pl-4">
      {ngoProcessSteps.map((step, i) => (
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

const NGOBenefitsFundingContent = () => (
  <section id="ngo-benefits-funding-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-8 text-gray-800">Benefits of Registration & Ways to Raise Funds</h3>

    <h4 className="text-2xl font-bold mb-6 text-gray-800">Benefits of NGO Registration</h4>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {ngoBenefits.map((benefit, i) => (
        <DetailItem
          key={i}
          title={benefit.title}
          description={benefit.detail}
          icon={benefit.icon}
        />
      ))}
    </div>

    <h4 className="text-2xl font-bold mb-6 text-gray-800">Ways to Raise Funds for NGOs</h4>
    <div className="space-y-3 text-gray-700 max-w-4xl">
      {fundRaisingWays.map((way, i) => (
        <li key={i} className="flex items-start gap-2 list-none">
          <Handshake className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
          <span>{way}</span>
        </li>
      ))}
    </div>
  </section>
);

const NGOWhyVakilsearch = () => (
  <section id="ngo-why-vakilsearch" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">How Vakilsearch Simplifies the NGO Registration Process?</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      We provide comprehensive legal assistance to ensure your NGO is established with the correct legal structure and compliance from day one, saving you time and money.
    </p>

    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ngoVakilsearchSteps.map((item, i) => (
        <div key={i} className="p-5 bg-indigo-50 rounded-xl shadow-sm border border-indigo-200 flex items-start gap-3">
          <div className="bg-[#022B50] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
            {i + 1}
          </div>
          <div>
            <h4 className="font-bold text-lg text-gray-800 mb-1">{item.step}</h4>
            <p className="text-sm text-gray-600">{item.detail}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-12 p-6 bg-[#E6F0F6] rounded-xl border-l-4 border-amber-500 shadow-md">
      <h4 className="font-bold text-xl text-gray-800 mb-2 flex items-center gap-2"><DollarSign className="w-5 h-5 text-amber-500" /> NGO Registration Fees</h4>
      <p className="text-lg text-gray-700">The cost for NGO registration **starts from ₹ 7499 + Service Tax** (excluding government fees). Understanding these fees is vital for proper budgeting.</p>
    </div>
  </section>
);

const NGOFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
  <section id="ngo-faqs-content" className="py-12 max-w-5xl mx-auto scroll-mt-24">
    <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">NGO Registration FAQs</h3>

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
export default function NGORegistrationPage() {
  const [activeTab, setActiveTab] = useState(ngoTabs[0].id);
  const [faqOpen, setFaqOpen] = useState(null);

  const SCROLL_OFFSET = 120;

  // --- SCROLLSPY IMPLEMENTATION ---
  useEffect(() => {
    const sectionIds = ngoTabs.map(tab => tab.id);

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
      {/* === HERO SECTION (NGO Registration Specific) === */}
      <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">

          {/* Background Image Section */}
          <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
            <img
              src={BackgroundImageSrc}
              alt="NGO Registration background"
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
                <span className="font-semibold text-black">NGO Registration</span>
              </nav>

              {/* Badge */}
              <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                #1 Legal Service Provider In India
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-black">
                NGO Registration Online India
              </h1>

              {/* Bullet Points with CheckCircle */}
              <div className="space-y-4 mb-8 text-sm lg:text-base text-black">
                <p className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  Register your NGO as a Society, Trust, or Section 8 Company with **expert assistance**.
                </p>
                <p className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  Get **NGO-Darpan ID** for grants, recognition, and **FCRA eligibility** for foreign funding.
                </p>
                <p className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  Stay compliant with Societies Act, 1860 or Companies Act, 2013 – **guided by experts**.
                </p>
              </div>
              <p className="text-sm font-semibold text-gray-700">Complete guide on NGO Registration</p>

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
                <h2 className="text-xl font-semibold mb-6 text-black text-center">NGO Registration</h2>

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

      {/* === Main Content Tabs Navigation (Sticky) === */}
      <section className="py-4 md:py-6 px-4 md:px-8 bg-white border-b border-gray-200 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center bg-white rounded-xl w-full text-xs md:text-sm lg:text-base overflow-x-auto border border-gray-200">
            {ngoTabs.map((tab) => (
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
          <NGOOverviewContent />
          <NGORoleEligibilityContent />
          <NGOActsClassificationContent />
          <NGODocumentsProcessContent />
          <NGOBenefitsFundingContent />
          <NGOWhyVakilsearch />
          <NGOFAQsContent faqs={ngoFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
        </div>
      </div>

    </div>
  );
}