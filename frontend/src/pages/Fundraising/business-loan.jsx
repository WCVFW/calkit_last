import React, { useState, useEffect } from "react";
// axios is kept for convention, though not used in frontend logic
import axios from "axios";
import {
  ChevronDown,
  Zap, // For captivating/compelling
  Briefcase, // For Business Plan
  ArrowRight,
  Star,
  CheckCircle,
  FileText, // For document/content
  Scale,
  Smartphone,
  Handshake, // New icon for partnership/connect
  TrendingUp, // New icon for growth/traction
  Lightbulb, // New icon for idea/strategy/solution
  Users, // For Team
  DollarSign, // For Financials/Funding
  Download, // For process/delivery
  Globe, // For Market Analysis
  Calculator, // For Financials/Cost
  Banknote, // For Loan
  Target, // For Eligibility
  RefreshCw, // For Process/Hasslefree
  Shield, // For Trust/No Collateral
  Clock, // For Quick Turnaround Time
  CreditCard, // For EMI
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from '../../assets/business.png'; // Assuming a new image for the loan page

// --- BUSINESS LOAN STATIC DATA DEFINITIONS ---

const loanTabs = [
  { id: 'loan-overview-content', label: 'Overview' },
  { id: 'loan-features-content', label: 'Features' },
  { id: 'loan-benefits-content', label: 'Benefits' },
  { id: 'loan-documents-content', label: 'Documents' },
  { id: 'loan-eligibility-content', label: 'Eligibility' },
  { id: 'loan-why-vakilsearch', label: 'Why Vakilsearch?' },
  { id: 'loan-faqs-content', label: "FAQ's" },
];

const loanTypes = [
  { title: "Bank Overdraft/Credit Line", icon: CreditCard, description: "Withdraw funds up to a predetermined limit. The excess amount withdrawn is treated as a form of credit, not a traditional loan." },
  { title: "Equity Funding", icon: Users, description: "Instead of a loan, investors receive ownership stakes in the company. Does not require repayment but involves stake dilution." },
  { title: "Short-term Loans", icon: Clock, description: "Shorter repayment period, provided as working capital and limited capital investment. Convenient for small and medium enterprises." },
  { title: "Equipment Finance", icon: Briefcase, description: "Funding for the purchase of instruments, secured by the equipment itself as collateral. The lender can procure the instrument in case of default." },
  { title: "Loan on Accounts Receivables", icon: DollarSign, description: "Short-term credit in exchange for account receivables. Loan tenure aligns with the invoice due date." },
  { title: "Factoring/Advances", icon: Handshake, description: "A factoring company pays the business in advance for accounts receivable. A percentage of the invoice is paid first, with the remainder withheld." },
];

const loanFeatures = [
  { title: "Loan Amount From ₹2 lakhs - ₹50 Lakhs", icon: Banknote, detail: "Vakilsearch offers business loans up to ₹2 - ₹75 lakhs for eligible SMEs. The processing is quite easy and can be completed within a short time span." },
  { title: "Superfast Processing", icon: RefreshCw, detail: "Our team of business experts will cross-verify your documents and complete the processing quickly. There are no bank visits required." },
  { title: "Quick Turnaround Time", icon: Clock, detail: "Most of the loan documents are processed and provided in just **72 hours**." },
  { title: "No Collateral Required", icon: Shield, detail: "Our unsecured business loans do not require any collateral. It helps you to upscale your business without putting your assets at risk." },
  { title: "Extended Loan Tenure", icon: ArrowRight, detail: "We provide loan tenures from **12 months to 36 months**, offering significant credit relief." },
  { title: "Transparent Costs", icon: Scale, detail: "We maintain transparency by ensuring **zero hidden costs and charges**. A one-time processing fee is charged." },
  { title: "Flexible Repayment", icon: CreditCard, detail: "Vakilsearch provides monthly EMI allowing you to easily repay the business loan. You can also opt for much more flexible repayments." },
];

const loanBenefits = [
  "Faster Processing: Vakilsearch processes business loans in just 72 hours and provides funding on time. This provides you greater leverage in taking time-sensitive business decisions.",
  "Preserving Your Ownership: Collateral-free business loans are provided quickly. You need not worry about liquidating your company ownership or losing your assets.",
  "Streamlining Your Cash Flow: A business loan assures both capital and time. This will help you to enhance your cash flow and achieve profitability.",
  "Boost Your Credit Score: Repaying a business loan on time is a definite way to boost your CIBIL score and business credit score. We make sure to report all the loan accounts to all the credit bureaus.",
];

const requiredDocuments = [
  "Bank statement (12 months)",
  "Business registration proof (GST filing, Gumastadhara, Trade License, Drug License, TIN, VAT registration)",
  "PAN Card Copy (Personal and Company)",
  "Aadhar Card Copy",
  "Partnership Deed Copy (if applicable)",
];

const eligibilityCriteria = [
  { title: "Established Business", icon: CheckCircle, detail: "Your business should have been in operation for at least 6 months." },
  { title: "Minimum Turnover", icon: DollarSign, detail: "Your business should have a minimum turnover of ₹5 lakhs or more than 6 months preceding your loan application." },
  { title: "Exclusion Criteria", icon: Target, detail: "Your business should not be on the blacklisted or excluded list for SBA finance." },
  { title: "Location Eligibility", icon: Globe, detail: "We provide business loans pan India." },
];

const whyVakilsearch = [
  "5,00,000+ Businesses trust us with their business compliance and tax needs.",
  "Completely Online Process: Avoid lengthy bank visits and complete your application from anywhere.",
  "Minimum Documentation: Just submit the required documents & leave the rest to us.",
  "Loan Approval in 72hrs: Our quick turnaround time ensures you get funding when you need it most.",
  "Low Service Fee: We maintain transparency with low, single-time processing fees.",
  "Flexible Loan amount & Tenure: Tailored options to suit the unique needs of small and medium businesses.",
];

const loanFAQs = [
  { q: "What Is Business Loan?", a: "Business loans are lending agreements between business owners and financial institutions. They provide funding for investment or working capital purposes, aiding in the expansion and facilitation of various business activities." },
  { q: "How can I get a business loan quickly?", a: "The fastest way is through online platforms like Vakilsearch, which offer simplified digital interfaces, minimal documentation, and loan processing within **72 hours**." },
  { q: "What is the business loan interest rate?", a: "Interest rates are determined by your eligibility, CIBIL score, and business turnover. You must apply now to know your personalized, exact rate." },
  { q: "What is the maximum amount of a business loan?", a: "Vakilsearch offers business loans up to **₹50 Lakhs** for eligible SMEs, with a tailored range starting from ₹2 lakhs." },
  { q: "What is the minimum ITR required for a business loan?", a: "While not explicitly stated, ITR is a key document. Generally, a track record of filed ITRs is required to demonstrate the business's financial health and minimum turnover criteria." },
  { q: "What is the minimum CIBIL score needed for a business loan?", a: "While lenders' minimums vary, a score of **750 or higher** is generally recommended for a high chance of approval and a favorable interest rate. Get in touch with our experts for an assessment." },
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

const FeatureBox = ({ title, description, icon: Icon }) => (
  <div className="p-5 bg-white rounded-lg shadow-sm border border-gray-200">
    <Icon className="w-6 h-6 text-amber-500 mb-2" />
    <h4 className="font-bold text-lg text-gray-800 mb-1">{title}</h4>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);


// --- TAB CONTENT COMPONENTS (Business Loan Content) ---

const LoanOverviewContent = () => (
  <section id="loan-overview-content" className="py-12 scroll-mt-24">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">What Is Business Loan?</h2>
    <p className="text-lg text-gray-700 mb-4 max-w-4xl">
      **Business loans** are lending agreements established between business owners and financial institutions or private lenders. These loans provide funding to entrepreneurs and business owners to be used for **investment or working capital purposes**, aiding in the expansion and facilitation of various business activities.
    </p>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Unlike regular loans, business loans have specific formalities and terms. Vakilsearch partners with India's top lenders to provide the **best unsecured business loans** for SMEs.
    </p>

    <h3 className="text-2xl font-bold mb-6 text-gray-800">Types of Business Loans</h3>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {loanTypes.map((item, i) => (
        <FeatureBox key={i} title={item.title} description={item.description} icon={item.icon} />
      ))}
    </div>
  </section>
);

const LoanFeaturesContent = () => (
  <section id="loan-features-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-8 text-gray-800">Features of Business Loan</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Vakilsearch provides tailor-made business loans for small and medium businesses in India, offering a user-friendly digital interface and superfast processing.
    </p>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {loanFeatures.map((item, i) => (
        <DetailItem
          key={i}
          title={item.title.split(':').map(s => s.trim())[0]}
          description={item.detail}
          icon={item.icon}
        />
      ))}
    </div>
  </section>
);

const LoanBenefitsContent = () => (
  <section id="loan-benefits-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Benefits of Business Loan</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Obtaining an unsecured business loan from Vakilsearch provides several key advantages for rapid business growth and financial stability.
    </p>

    <div className="space-y-4">
      {loanBenefits.map((benefit, i) => {
        const [title, description] = benefit.split(':').map(s => s.trim());
        const Icon = i === 0 ? Clock : i === 1 ? Shield : i === 2 ? DollarSign : TrendingUp;
        return (
          <div key={i} className="p-5 bg-blue-50 rounded-xl shadow-sm border border-blue-200 flex items-start gap-3">
            <Icon className="w-6 h-6 text-[#022B50] mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-xl text-gray-800 mb-1">{title}</h4>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
        );
      })}
    </div>
  </section>
);

const LoanDocumentsContent = () => (
  <section id="loan-documents-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Documents Required for Business Loan</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      We aim for **minimal documentation** to ensure superfast processing. Just submit the key documents, and our experts will handle the rest.
    </p>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {requiredDocuments.map((doc, i) => (
        <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-md border-l-4 border-red-500">
          <FileText className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
          <p className="text-gray-700 font-medium">{doc}</p>
        </div>
      ))}
    </div>
  </section>
);

const LoanEligibilityContent = () => (
  <section id="loan-eligibility-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Eligibility Criteria for Business Loan</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      To be eligible for an unsecured business loan with Vakilsearch, you generally need to meet the following simplified criteria:
    </p>

    <ol className="space-y-5 list-none border-l-2 border-[#022B50] pl-4">
      {eligibilityCriteria.map((item, i) => (
        <li key={i} className="flex items-start gap-4">
          <div className="bg-[#022B50] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
            <Target className="w-4 h-4" />
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

const LoanWhyVakilsearch = () => (
  <section id="loan-why-vakilsearch" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Why Choose Vakilsearch?</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Trusted by **5,00,000+ Businesses**, we are committed to providing the quickest, most transparent, and most flexible loan options in India.
    </p>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {whyVakilsearch.map((reason, i) => {
        const [title, description] = reason.includes(':') ? reason.split(':').map(s => s.trim()) : [reason.split('.')[0].trim(), reason.split('.').slice(1).join('.').trim()];
        const Icon = i % 6 === 0 ? Users : i % 6 === 1 ? Smartphone : i % 6 === 2 ? FileText : i % 6 === 3 ? Clock : i % 6 === 4 ? DollarSign : TrendingUp;
        return (
          <div key={i} className="p-5 bg-indigo-50 rounded-xl shadow-sm border border-indigo-200 flex items-start gap-3">
            <Icon className="w-6 h-6 text-[#022B50] mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-lg text-gray-800 mb-1">{title}</h4>
              {description && <p className="text-sm text-gray-600">{description}</p>}
            </div>
          </div>
        );
      })}
    </div>
  </section>
);

const LoanFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
  <section id="loan-faqs-content" className="py-12 max-w-5xl mx-auto scroll-mt-24">
    <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">FAQs on Business Loan</h3>

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
export default function BusinessLoanPage() {
  const [activeTab, setActiveTab] = useState(loanTabs[0].id);
  const [faqOpen, setFaqOpen] = useState(null);

  // EMI Calculator State
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(16); // Annual percentage
  const [loanTenure, setLoanTenure] = useState(12); // Months

  // EMI Calculation Logic
  const calculateEMI = (P, R_annual, N) => {
    if (R_annual === 0) return P / N; // Simple calculation for 0%
    const R = (R_annual / 12) / 100; // Monthly interest rate
    // E = P x R x (1+R)^N / ((1+R)^N - 1)
    const numerator = P * R * Math.pow(1 + R, N);
    const denominator = Math.pow(1 + R, N) - 1;
    return Math.round(numerator / denominator);
  };

  const emi = calculateEMI(loanAmount, interestRate, loanTenure);
  const totalPayable = emi * loanTenure;
  const totalInterest = totalPayable - loanAmount;


  const SCROLL_OFFSET = 120;

  // --- SCROLLSPY IMPLEMENTATION ---
  useEffect(() => {
    const sectionIds = loanTabs.map(tab => tab.id);

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
      {/* === HERO SECTION (Business Loan Specific) === */}
      <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">
          {/* Background Image Section (Using the assumed loan image) */}
          <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
            <img
              src={BackgroundImageSrc}
              alt="Business Loans background"
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>

          {/* Main Content */}
          <div className="relative flex flex-col lg:flex-row items-start pt-10 pb-12 lg:pb-0 z-20">

            {/* Left Column - Text Content */}
            <div className="w-full lg:w-3/5 text-black p-4 md:p-6 pb-20 relative z-20">

              {/* Badge */}
              <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-2 items-center gap-2">
                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                #1 Legal Service Provider In India
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-black">
                Business Loans: No Collateral, More Growth
              </h1>

              {/* Description / Bullet Points */}
              <div className="space-y-3 mb-8 text-sm lg:text-base text-gray-800">
                <p className="flex items-start gap-3">
                  <span className="w-3 h-3 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  Get up to **₹30 lakhs** in business loans approved within **72 hours** *T&C apply.
                </p>
                <p className="flex items-start gap-3">
                  <span className="w-3 h-3 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  100% online process with **no bank visits** and low, transparent service fees.
                </p>
                <p className="flex items-start gap-3">
                  <span className="w-3 h-3 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  Trusted by **5,00,000+ Indian businesses** for fast, collateral-free funding.
                </p>
              </div>

              {/* Review Boxes */}
              <div className="flex flex-wrap gap-4 mt-8">
                <ReviewBox score="4.5/5" reviews="19k+ Happy Reviews" source="Google Reviews" />
                <ReviewBox score="4.5/5" reviews="7500+ Happy Reviews" source="Trustpilot" />
              </div>
              <p className="text-xs text-black/80 font-medium mt-2">Trusted on Google & Trustpilot — Zolvit, India’s No.1 Legal-Tech Platform</p>

              {/* Unsecured Loan Section */}
              <div className="p-4 bg-white/30 backdrop-blur-sm rounded-lg mt-6 shadow-lg border border-white/50">
                <h4 className="font-bold text-xl text-black mb-1 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#022B50]" />
                  Unsecured Business Loan from India’s Top Lenders
                </h4>
                <p className="text-sm text-gray-800">
                  Vakilsearch partners with India’s top lenders to provide the best business loan to our customers.
                </p>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="w-full lg:w-[350px] relative z-30 lg:mt-0 lg:ml-auto mt-[-100px] sm:mt-[-50px]">
              <div
                className="w-full p-6 md:p-8 rounded-2xl shadow-xl bg-white"
                style={{ borderRadius: '24px', border: '1px solid #E0E0E0' }}
              >
                {/* Offer Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Business Loans</h2>
                </div>

                {/* Form */}
                <form className="space-y-4">
                  <input
                    className="w-full px-4 py-3 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg text-sm text-gray-700 placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="Email"
                  />
                  <input
                    className="w-full px-4 py-3 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg text-sm text-gray-700 placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="Mobile Number"
                  />
                  <input
                    className="w-full px-4 py-3 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg text-sm text-gray-700 placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="City / Pincode"
                  />
                  {/* WhatsApp Toggle */}
                  <div className="flex items-center justify-between pt-1 text-gray-700">
                    <p className="text-xs md:text-sm font-medium">Get easy updates through WhatsApp</p>
                    {/* Simplified Toggle UI - functional state is not implemented here */}
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
                  <p className="text-[11px] text-gray-500 text-center mt-1 italic">
                    No Spam. No Sharing. 100% Confidentiality.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === Loan Process & EMI Calculator Section === */}
      <section className="bg-gray-50 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
          
          {/* Hasslefree Process */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Hasslefree Online application in 3 steps</h3>
            <ol className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                <span className="text-gray-700 text-lg">Submit the Documents (Minimal Documentation)</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                <span className="text-gray-700 text-lg">Connect with an Expert or complete the journey yourself</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                <span className="text-gray-700 text-lg">Loan Approved (within 72 hours)</span>
              </li>
            </ol>
            
            <h4 className="text-xl font-bold text-gray-800 mt-8 mb-4">Minimal Documentation</h4>
            <div className="flex flex-wrap gap-4">
                <span className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 text-sm font-medium flex items-center gap-2"><FileText className="w-4 h-4 text-[#022B50]"/> PAN Card</span>
                <span className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 text-sm font-medium flex items-center gap-2"><FileText className="w-4 h-4 text-[#022B50]"/> Aadhaar Card</span>
                <span className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 text-sm font-medium flex items-center gap-2"><FileText className="w-4 h-4 text-[#022B50]"/> Bank Statement</span>
            </div>
            
            <div className="mt-6 p-4 bg-white rounded-lg shadow-md border-l-4 border-amber-500">
                <p className="text-gray-700 font-semibold">Our expert team will help you in choosing the right business loan for your needs. <a href="#" className="text-[#022B50] hover:underline font-bold">Talk to us</a></p>
            </div>
          </div>

          {/* EMI Calculator */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                <Calculator className="w-6 h-6 text-[#022B50]"/>
                Your Loan EMI Calculator
            </h3>
            <p className="text-sm text-gray-500 mb-4 italic">Self-help planning tool & doesn't guarantee accuracy or applicability</p>

            <div className="space-y-6">
                {/* Loan Amount Slider */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium text-gray-700">Select Your Loan Amount</label>
                        <span className="font-bold text-lg text-[#022B50]">₹{loanAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <input
                        type="range"
                        min="100000"
                        max="5000000"
                        step="100000"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg"
                        style={{'--webkit-slider-thumb-bg': '#022B50'}}
                    />
                </div>

                {/* Interest Rate Slider */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium text-gray-700">Select the Interest Rate (Annual)</label>
                        <span className="font-bold text-lg text-[#022B50]">{interestRate}%</span>
                    </div>
                    <input
                        type="range"
                        min="8"
                        max="24"
                        step="0.5"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg"
                    />
                </div>

                {/* Tenure Slider */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium text-gray-700">Update Preferable Tenure (Months)</label>
                        <span className="font-bold text-lg text-[#022B50]">{loanTenure}</span>
                    </div>
                    <input
                        type="range"
                        min="12"
                        max="36"
                        step="1"
                        value={loanTenure}
                        onChange={(e) => setLoanTenure(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg"
                    />
                </div>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6 space-y-3">
                <div className="flex justify-between items-center">
                    <p className="text-lg font-medium text-gray-700">Your EMI</p>
                    <p className="text-2xl font-extrabold text-[#022B50]">₹{emi.toLocaleString('en-IN')}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-md text-gray-600">Total Payable (Principal + Interest)</p>
                    <p className="text-xl font-bold text-gray-800">₹{totalPayable.toLocaleString('en-IN')}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">Total Interest</p>
                    <p className="text-md font-medium text-gray-600">₹{totalInterest.toLocaleString('en-IN')}</p>
                </div>
            </div>

            <p className="text-xs text-gray-500 mt-4 italic">*Apply now to know your eligibility, interest rate and exact EMI</p>

            <button
                type="button"
                className="w-full bg-amber-500 text-white py-3 font-semibold rounded-lg transition-colors hover:bg-amber-600 text-base shadow-md mt-4"
            >
                Apply Now
            </button>
          </div>
        </div>
      </section>


      {/* === Main Content Tabs Navigation (Sticky) === */}
      <section className="py-4 md:py-6 px-4 md:px-8 bg-white border-b border-gray-200 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center bg-white rounded-xl w-full text-xs md:text-sm lg:text-base overflow-x-auto border border-gray-200">
            {loanTabs.map((tab) => (
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
          <LoanOverviewContent />
          <LoanFeaturesContent />
          <LoanBenefitsContent />
          <LoanDocumentsContent />
          <LoanEligibilityContent />
          <LoanWhyVakilsearch />
          <LoanFAQsContent faqs={loanFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
        </div>
      </div>
    </div>
  );
}