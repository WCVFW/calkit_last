import React, { useState, useEffect } from "react";
// axios is imported for convention, assuming real data fetching logic is later added
import axios from "axios";
import {
  ChevronDown,
  MapPin,
  Zap, // Used for the "Live Calls" stat
  Briefcase,
  ArrowRight,
  Users,
  Star, // Used for ReviewBox
  CheckCircle,
  FileText,
  Scale,
  Calculator,
  Download,
} from "lucide-react";
import { motion } from "framer-motion";

// --- COMPANY SECRETARY (CS) STATIC DATA DEFINITIONS ---

const csTabs = [
  { id: 'cs-expertise-content', label: 'Areas of Expertise' },
  { id: 'cs-updates-content', label: 'Compliance Updates' },
  { id: 'cs-benefits-content', label: 'Benefits' },
  { id: 'cs-why-vakilsearch', label: 'Why Vakilsearch' },
  { id: 'cs-faqs-content', label: 'FAQs' },
];

const csExpertiseList = [
  "Legal Compliances", "Annual Compliances", "Expert Board Advisors",
  "Corporate Governance", "Corporate Restructuring", "Corporate Funding",
  "FEMA Advisory and Compliance", "RBI Advisory and Complaint", "SEBI Registration and Complaint",
  "NCLT Dispute", "Arbitration and Alternative Dispute Resolution",
  "Secretarial Audit", "Cost Audit",
  "Business Registrations / Company Formation", "Raising Capital", "Conversions / Corporate Restructuring",
  "Investment from Abroad / Overseas", "Closure / Strike-off of company"
];

const csBenefits = [
  { title: "Ensuring Compliance with Laws and Regulations", description: "A company secretary can help ensure that a firm or company is meeting its legal and regulatory obligations, avoiding fines, penalties, or legal action." },
  { title: "Good Corporate Governance", description: "A company secretary can help establish and maintain effective corporate governance practices, which can build stakeholder confidence and protect the interests of the company." },
  { title: "Objective Advice to the Board", description: "A company secretary (CS) can provide objective advice to the board of directors, helping to balance the interests of different stakeholders." },
  { title: "Expert Advice on Legal and Financial Matters", description: "A company secretary (CS) can provide valuable insights on legal and financial matters, helping the board of directors make informed decisions." },
  { title: "Legal Compliance", description: "Services help ensure that the company adheres to all relevant laws, regulations, and statutory requirements, filing required documents and ensuring timely compliance." },
  { title: "Risk Management", description: "CS plays a role in identifying and managing legal and regulatory risks that the company may face, helping the company adapt and mitigate potential risks." },
  { title: "Time and Resource Savings", description: "Outsourcing secretarial consultation can save valuable time and resources for the management team, allowing them to focus on core business operations." },
  { title: "Reputation and Credibility", description: "Proper corporate governance and compliance enhance a company's reputation and credibility in the eyes of investors, clients, and the public." },
];

const csWhyVakilsearch = [
  { title: "Expertise and Experience", desc: "Our highly experienced and knowledgeable CSs possess in-depth expertise in corporate law and regulatory compliance." },
  { title: "Effortless Compliance", desc: "As a Corporate Planner, we simplify the complexities of legal compliance, helping businesses strategically align their operations with regulatory requirements." },
  { title: "Innovative Online Platform", desc: "Experience the convenience of our user-friendly online platform, designed to streamline the management of your legal and secretarial needs." },
  { title: "Customer Satisfaction Guaranteed", desc: "We are committed to providing exceptional customer service, as evidenced by our satisfied clientele's positive reviews and testimonials." },
  { title: "Transparent and Competitive Pricing", desc: "We offer transparent, competitive pricing for our CS consultations, ensuring top-notch support without compromising your budget." },
  { title: "Comprehensive Service Offering", desc: "Our range of services extends beyond CS functions, encompassing legal advisory services, trademark registration, and other essential business requirements." },
];

const csFAQs = [
  { q: "What Are the Qualifications Needed to Become an Online CS?", a: "This typically requires completing the CS course offered by the Institute of Company Secretaries of India (ICSI) and becoming a member." },
  { q: "What Skills Are Required to Be an Effective Company Secretary?", a: "Required skills include deep knowledge of corporate law, strong organizational skills, attention to detail, excellent communication, and ethical judgment." },
  { q: "How Can a Company Secretary Contribute to the Success of a Company?", a: "A CS ensures legal compliance, maintains good corporate governance, provides objective advice to the board, and manages crucial corporate records, all of which safeguard the company's integrity and efficiency." },
  { q: "Can a Small Business Benefit From Having a Company Secretary?", a: "Yes, a CS helps small businesses avoid costly compliance mistakes, ensures ethical operation, and prepares the company for future scaling and investments." },
  { q: "What is the Difference Between a Company Secretary and a Company Director?", a: "A Director is responsible for the overall strategic direction and management of the company, while a Company Secretary is primarily responsible for compliance, administration, and corporate governance matters." },
  { q: "What are the stages of the CS exam in India?", a: "The CS exam consists of three stages: CSEET (CS Executive Entrance Test), CS Executive, and CS Professional." },
  { q: "What are the educational requirements to start the CS Executive Course?", a: "A graduate of any stream (except Fine Arts) or a final level pass in ICSI/ICAI/ICMAI exams can enroll directly. Others must pass CSEET." },
  { q: "How long does it take to complete the CS Course?", a: "The duration typically ranges from 3 to 4 years, depending on the route (after 10+2 or after graduation) and the time taken to clear the exams and complete mandatory training." },
  { q: "What is the CSEET Exam?", a: "It is the mandatory entrance exam for all graduates and 10+2 students seeking admission to the CS Executive Programme, unless exempted." },
  { q: "Is there any certification required for financial professionals in New Delhi?", a: "While not explicitly mentioned, many financial roles require certifications like CA, CFA, or specific licenses, depending on the job function." },
];

const UpdatesTableData = [
  { activity: "Annual Return of LLP", form: "Form 11", dueDate: "May 30, 2024", period: "FY 2023-24" },
  { activity: "Statement of Account & Solvency", form: "Form 8", dueDate: "October 30, 2024", period: "FY 2023-24" },
  { activity: "KYC of Directors/Designated Partners", form: "DIR-3 KYC", dueDate: "September 30, 2024", period: "FY 2023-24" },
  { activity: "Return of Deposits", form: "DPT-3", dueDate: "June 30, 2024", period: "FY 2023-24" },
  { activity: "Appointment of Auditor", form: "ADT-1", dueDate: "October 14, 2024", period: "Within 15 days of AGM conclusion" },
  { activity: "Filing of Financial Statements", form: "AOC-4", dueDate: "October 30, 2024", period: "Within 30 days of AGM conclusion" },
  { activity: "Filing of Annual Return", form: "MGT-7", dueDate: "November 29, 2024", period: "Within 60 days of AGM conclusion" },
  { activity: "Half-Yearly Return for Outstanding Payments to MSMEs", form: "MSME-1", dueDate: "April 30, 2024 / October 31, 2024", period: "Oct 2023 – Mar 2024 / Apr 2024 – Sep 2024" },
  { activity: "Reconciliation of Share Capital Audit Report", form: "PAS-6", dueDate: "May 30, 2024 / November 29, 2024", period: "Oct 2023 – Mar 2024 / Apr 2024 – Sep 2024" },
];


const StatPill = ({ count, label, Icon }) => (
  <div className="bg-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md">
    {Icon && <Icon className="w-5 h-5 text-[#2E96FF]" />}
    <span className="text-[#222428] text-sm font-semibold tracking-wider">
      <span className="font-bold mr-1">{count}</span>{label}
    </span>
  </div>
);

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

const BenefitItem = ({ title, description, color = 'green' }) => (
  <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md border-l-4 border-green-500">
    <ArrowRight className={`w-5 h-5 text-${color}-600 mt-1 flex-shrink-0`} />
    <div>
      <h4 className="font-semibold text-lg text-gray-800 mb-1">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);

const FooterColumn = ({ title, links }) => (
  <div>
    <h4 className="font-bold text-base text-gray-900 mb-3">{title}</h4>
    <ul className="space-y-2">
      {links.map((link, i) => (
        <li key={i}>
          <a href="#" className="text-sm text-gray-600 hover:text-[#2E96FF] transition-colors">
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

// --- TAB CONTENT COMPONENTS (CS Content) ---

const CSExpertiseContent = () => (
  <section id="cs-expertise-content" className="py-12 scroll-mt-24">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Areas of Expertise</h2>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      We understand that navigating legal requirements can be a daunting task for businesses. Our team of **secretary services experts** can help you identify and comply with all necessary legal regulations. Secretarial services will ensure that your business is always operating and adhering to the law.
    </p>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {csExpertiseList.slice(0, 13).map((item, i) => (
        <div
          key={i}
          className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center gap-3 transition hover:shadow-lg hover:border-[#2E96FF]"
        >
          <Briefcase className="w-5 h-5 text-[#2E96FF]" />
          <span className="font-medium text-gray-700 text-sm">{item}</span>
        </div>
      ))}
    </div>

    <h3 className="text-2xl font-bold mt-12 mb-6 text-gray-800">What is a Company Secretary (CS)?</h3>
    <p className="text-lg text-gray-700 mb-6 max-w-4xl">
      A **Company Secretary (CS)** is a key executive within a company, responsible for ensuring compliance with legal and regulatory standards. As an expert in corporate governance, the CS plays a vital role in guiding the company’s leadership to operate within legal frameworks, thereby protecting the company’s integrity and reputation.
    </p>

    <ul className="space-y-3 text-gray-700 max-w-4xl">
      <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0" />**Advising the Board of Directors:** Providing critical advice on legal responsibilities and regulatory requirements.</li>
      <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0" />**Maintaining Corporate Compliance:** Ensuring corporate documents are updated and aligned with current laws.</li>
      <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0" />**Organizing Meetings:** Arranging and facilitating board and shareholder meetings with proper documentation.</li>
      <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0" />**Filing Statutory Documents:** Overseeing timely submission of annual returns and mandatory filings with the Registrar of Companies (ROC).</li>
    </ul>
  </section>
);

const CSUpdatesTable = () => (
  <section id="cs-updates-content" className="py-12 scroll-mt-24">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Compliance Activity Due Dates</h2>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Stay ahead of regulatory deadlines with this calendar of crucial compliance filings and their applicable periods.
    </p>
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#E6F0F6]">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Compliance Activity</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Form</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Due Date</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Applicable Period</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {UpdatesTableData.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.activity}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.form}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-600">{row.dueDate}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.period}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

const CSBenefitsContent = () => (
  <section id="cs-benefits-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Benefits of Hiring a Company Secretary (CS)</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Having an **CS online** can provide a range of benefits to a firm or company, ensuring seamless legal compliance and robust corporate governance.
    </p>

    <div className="grid md:grid-cols-2 gap-6">
      {csBenefits.map((benefit, i) => (
        <BenefitItem key={i} {...benefit} />
      ))}
    </div>
  </section>
);

const CSWhyVakilsearchContent = () => (
  <section id="cs-why-vakilsearch" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Why Vakilsearch for Company Secretary (CS) Consultation?</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Consulting a Company Secretary provides invaluable insights into various aspects of legal matters and corporate governance. Here are a few reasons why you must consult our CS:
    </p>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {csWhyVakilsearch.map((item, i) => (
        <div key={i} className="p-6 bg-indigo-50 rounded-xl shadow-sm border border-indigo-200">
          <h4 className="font-bold text-xl text-gray-800 mb-2 flex items-center gap-2"><Briefcase className="w-5 h-5 text-[#2E96FF]" />{item.title}</h4>
          <p className="text-sm text-gray-600">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

const CSFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
  <section id="cs-faqs-content" className="py-12 max-w-5xl mx-auto scroll-mt-24">
    <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">Company Secretary FAQs</h3>

    <div className="space-y-4">
      {faqs.map((f, i) => (
        <div key={i} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <button
            className={`w-full flex justify-between items-center p-5 text-left transition ${faqOpen === i ? 'bg-[#E6F2FF] text-[#2E96FF]' : 'bg-white hover:bg-gray-50'}`}
            onClick={() => setFaqOpen(faqOpen === i ? null : i)}
          >
            <span className="font-semibold text-lg">{f.q}</span>
            <ChevronDown
              className={`w-6 h-6 transition-transform ${faqOpen === i ? "rotate-180 text-[#2E96FF]" : "text-gray-500"}`}
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
export default function CompanySecretaryPage() {
  const [activeTab, setActiveTab] = useState(csTabs[0].id);
  const [faqOpen, setFaqOpen] = useState(null);

  // Offset to account for the sticky header height when calculating scroll position
  const SCROLL_OFFSET = 120;

  // --- SCROLLSPY IMPLEMENTATION ---
  useEffect(() => {
    const sectionIds = csTabs.map(tab => tab.id);

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
      {/* === HERO SECTION (CS Specific) === */}
      <section className="relative w-full overflow-hidden min-h-[700px] md:min-h-[700px] bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">

          {/* Dark Blue Background Card */}
          <div
            className="absolute top-0 left-0 w-full h-[550px] md:h-[600px] bg-[#113C6D] shadow-2xl overflow-hidden"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 60px) 0, 90% 48px, 40% 100%, 0 100%, 0 0)',
              borderRadius: '24px',
            }}
          />

          {/* Content + Form Wrapper */}
          <div className="relative flex flex-col lg:flex-row items-start pt-10 pb-12 lg:pb-0 z-10">

            {/* Left Column (Content) */}
            <div className="w-full lg:w-3/5 text-white p-4 md:p-6 pb-20 relative z-20">

              {/* Badge */}
              <div className="inline-flex bg-[#FFD700] text-black px-3 py-1 rounded-full font-bold text-xs md:text-sm mb-4">
                #1 Company Secretary Service Provider in India
              </div>

              {/* H1 Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
                Company Secretary Services Online
              </h1>

              {/* Description Text */}
              <p className="text-white/80 text-base lg:text-lg max-w-xl mb-4">
                Consult 200+ verified company secretaries for expert compliance guidance.
              </p>

              {/* Bullet Points */}
              <div className="space-y-2 mb-8 text-white">
                <p className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  Clear, hassle-free advice to keep your business compliant at every step
                </p>
                <p className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  Transparent pricing with no hidden fees and satisfaction guaranteed
                </p>
              </div>

              {/* Live Stats */}
              <div className="flex flex-wrap gap-4">
                <StatPill count="200+" label="Verified CS online" Icon={Users} />
                <StatPill count="50+" label="Live ongoing consultations" Icon={Zap} />
              </div>
            </div>

            {/* Right Column (Form & Pricing) */}
            <div className="w-full lg:w-[400px] relative z-30 lg:mt-[-50px] mt-[-100px] sm:mt-[-50px]">
              <div
                className="w-full p-6 md:p-8 rounded-2xl shadow-2xl bg-white"
                style={{ borderRadius: '24px', border: '1px solid #E0E0E0' }}
              >
                <h2 className="text-xl font-semibold mb-3 text-gray-800">Get Started</h2>

                {/* Pricing Box */}
                <div className="bg-green-50 border-l-4 border-green-500 p-3 mb-4 rounded-lg">
                  <p className="text-lg font-bold text-green-700">
                    ₹999 for a 30-min Expert Consultation
                  </p>
                </div>

                {/* Form */}
                <form className="space-y-2.5">
                  {['Email', 'Mobile Number', 'City/Pincode', 'Language', 'Problem Type'].map((placeholder) => (
                    <input
                      key={placeholder}
                      placeholder={placeholder}
                      className="w-full px-3 py-2.5 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg text-sm text-gray-700 placeholder-gray-500 focus:border-[#2E96FF] focus:ring-1 focus:ring-[#2E96FF]"
                    />
                  ))}

                  {/* WhatsApp Toggle */}
                  <div className="flex items-center justify-between pt-1 text-gray-600">
                    <p className="text-xs md:text-sm text-gray-700 font-medium">
                      Get easy updates through Whatsapp
                    </p>
                    <div className="w-9 h-4.5 bg-green-500 rounded-full relative cursor-pointer flex items-center p-0.5 transition-colors justify-end">
                      <div className="w-3.5 h-3.5 bg-white rounded-full shadow-md transition-transform transform translate-x-0"></div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#2E96FF] text-white py-2.5 text-sm font-semibold rounded-lg transition-colors hover:bg-[#0069D1] shadow-md mt-3"
                  >
                    Book An Appointment Now
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
          <div className="flex items-center bg-white rounded-xl w-full text-sm md:text-base overflow-x-auto border border-gray-200">
            {csTabs.map((tab) => (
              <a
                key={tab.id}
                className={`flex flex-col flex-shrink-0 min-w-[140px] py-3 md:py-4 px-2 text-center font-bold cursor-pointer transition-all ${activeTab === tab.id ? 'bg-[#E6F0F6] border-b-4 border-[#022B50] text-[#022B50]' : 'text-gray-700 hover:bg-gray-50'}`}
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
          <CSExpertiseContent />
          <CSUpdatesTable />
          <CSBenefitsContent />
          <CSWhyVakilsearchContent />
          <CSFAQsContent faqs={csFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
        </div>
      </div>
    </div>
  );
}