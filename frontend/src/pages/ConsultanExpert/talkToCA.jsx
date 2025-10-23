import React, { useState, useEffect } from "react";
// axios is imported for convention, assuming real data fetching logic is later added
import axios from "axios";
import {
  ChevronDown,
  Mail,
  MapPin,
  Zap, // Used for the "Live Calls" stat
  Briefcase,
  ArrowRight,
  UserCheck,
  FileText,
  Scale,
  Calculator,
  Download,
  Users,
  Star, // Used for ReviewBox
  CheckCircle, // New icon for pricing features
} from "lucide-react";
import { motion } from "framer-motion";

// --- STATIC DATA DEFINITIONS (CA Consultation Content) ---

const caTabs = [
  { id: 'ca-expertise-content', label: 'Areas of Expertise' },
  { id: 'ca-benefits-content', label: 'Benefits' },
  { id: 'ca-process-content', label: 'Process' },
  // { id: 'ca-why-vakilsearch', label: 'Why Vakilsearch' },
  { id: 'ca-faqs-content', label: 'FAQs' },
];

const caExperts = [
  { name: "Komal", exp: "3 years of experience", specialization: "Specialises in direct and indirect tax strategies", desc: "Get comprehensive solutions for tax compliance." },
  { name: "Jebin Vargese", exp: "5 years of experience", specialization: "Specialises in bookkeeping and FEMA compliance.", desc: "Get expert financial management and support." },
  { name: "S J Anakha", exp: "6 years of experience", specialization: "Specialises in tax planning and filing.", desc: "File accurately and on time with expert advice." },
];

const itrPlans = [
  {
    title: "Lite",
    price: "₹1,499",
    originalPrice: "₹1,999",
    discount: "25% discount",
    description: "Filing support for salaried individuals in completing the ITR-1 form",
    features: [
      "Computation of Tax calculation",
      "Automatic Form 16 import",
      "Basic income tax return filing",
      "Email support"
    ],
    isRecommended: false
  },
  {
    title: "Standard",
    price: "₹2,499",
    originalPrice: "₹3,845",
    discount: "35% discount",
    description: "Filing includes salary, one house property, capital gains, and interest income",
    features: [
      "Includes everything in Lite",
      "Deductions and Exemptions: Calculation and claim of eligible deductions under sections 80C, 80D, etc., and exemptions like HRA",
      "Capital gains from stocks or mutual funds Computation",
      "Income from other sources (interest, etc.)",
      "Priority email and chat support"
    ],
    isRecommended: true
  },
  {
    title: "Elite",
    price: "Book an Appointment Now",
    originalPrice: "*Speak with our CA for exclusive pricing",
    discount: null,
    description: "Filing includes salary, one house property, capital gains, interest & other sources of income",
    features: [
      "Includes everything in Standard",
      "Dedicated tax expert assistance: A session with a tax expert before filing to ensure all income and deductions are accounted",
      "Tailoring deductions and exemptions to perfectly fit your financial profile",
      "Assistance after post filings and follow-up till the refund"
    ],
    isRecommended: false,
    isContact: true
  }
];


const caExpertiseList = [
  "Tax Advisory", "GST Audit Report (GSTR 9 & 9C)", "Transfer Pricing (Opinion Report)",
  "Transfer Pricing (Audit Report)", "ITR Filing for Companies", "Income Tax Notices",
  "Income Tax Audit", "Net Worth and Valuation Certificate", "Accountancy",
  "Auditing & Taxation", "ITR Filing", "GST Compliance, Audit, and Training",
  "Tax on Property Purchase & Sales", "NRI Taxation and ITR Filings", "Tax on Consultancy & Freelancing",
  "ITR for Tenders", "Others"
];

const caBenefits = [
  { title: "Convenience and Accessibility", description: "Enjoy the convenience of accessing your financial information anytime, anywhere. Our online platform ensures accessibility, allowing you to manage your finances on your terms." },
  { title: "Time Efficiency", description: "Save valuable time with our efficient online CA services. We understand the importance of time in business, and our platform is designed to optimise processes, allowing you to focus on what matters most – growing your business." },
  { title: "Expert Advice", description: "Benefit from expert advice from seasoned professionals. Our team of experienced Chartered Accountants is dedicated to providing you with insights and guidance tailored to your specific financial needs." },
  { title: "Cost-Effectiveness", description: "Our cost-effective online services offer financial solutions that fit your budget. Say goodbye to unnecessary expenses while still receiving top-notch CA expertise." },
  { title: "Secure Document Sharing", description: "Rest easy knowing that your sensitive documents are handled with the utmost security. Our platform ensures secure data management, safeguarding your critical information from unauthorised access." },
  { title: "Flexible Scheduling", description: "Adapt our services to your schedule. Enjoy the flexibility of setting appointments and managing tasks at your convenience, ensuring that our services align with your unique business requirements." },
  { title: "Real-time Solutions", description: "Stay ahead with real-time updates and solutions. We understand the fast-paced nature of business, and our platform is equipped to provide timely responses and solutions to keep you informed and in control." },
  { title: "Remote Support", description: "Experience hassle-free support from anywhere you operate. Our online support services connect you with our experts remotely, ensuring that assistance is just a click away." },
  { title: "Increased Efficiency", description: "Drive efficiency in your financial operations. Our services are designed to enhance overall efficiency, allowing you to optimise resources and achieve your business goals more effectively." },
  { title: "Transparent Communication", description: "Foster transparency in your financial dealings. Our commitment to transparent communication ensures that you are well-informed, building trust and clarity in every interaction." },
];

const caProcess = [
  "Fill out the form – Share your details so we understand your needs.",
  "Schedule Your Consultation – Pick a time that works for you.",
  "Make the Payment – Securely complete your payment.",
  "Talk to a CA – Get expert, personalized advice from a qualified Chartered Accountant.",
];

const caFAQs = [
  { q: "Who should consult a chartered accountant for tax planning?", a: "Any individual or business looking to optimize their tax structure, reduce liabilities legally, or dealing with complex financial situations should consult a CA for tailored tax planning." },
  { q: "How can a chartered accountant help with GST compliance?", a: "A CA can assist with GST registration, accurate return preparation (GSTR-1, GSTR-3B, etc.), audit representation, and ensuring you adhere to all timely compliance requirements to avoid penalties." },
  { q: "What services does a Chartered Accountant (CA) provide?", a: "CAs provide a wide range of services including auditing, tax filing (ITR, GST, TDS), financial accounting, business valuation, investment advisory, financial modeling, and strategic business consulting." },
  { q: "Can I hire a CA online?", a: "Yes, Vakilsearch offers a reliable platform to hire certified Chartered Accountants online for consultation, tax filing, and full-service financial management from anywhere." },
  { q: "What is the due date for filing ITR for the Assessment Year 2025-26?", a: "The due date for filing ITR for non-audit cases for the Assessment Year 2025-26 (Financial Year 2024-25) is typically July 31st. Consult with your CA for precise dates for your specific category." },
  { q: "How much does a CA charge for filing an ITR?", a: "The charge varies based on complexity. Vakilsearch offers affordable plans starting at ₹1,499 for basic salaried filings, with transparent pricing for more complex returns (Standard and Elite plans)." },
  { q: "Can I talk to a CA online?", a: "Absolutely. Vakilsearch facilitates seamless online CA consultations via video or phone calls at a scheduled time that is convenient for you." },
  { q: "Can I file an ITR without a CA?", a: "While legally possible, hiring a CA is highly recommended to ensure accuracy, maximize deductions/refunds, and avoid costly mistakes or receiving tax notices." },
  { q: "How can a CA help in filing a revised return?", a: "A CA reviews your original filing for errors or omissions, calculates the correct tax liability, and files the revised ITR accurately on your behalf, ensuring all compliance rules are met." },
  { q: "What are the benefits of filing ITR with Vakilsearch CA experts?", a: "Benefits include accurate filing, maximization of deductions, dedicated expert assistance, post-filing support, and the peace of mind that your compliance is handled by trusted professionals." },
  { q: "Is hiring an online CA consultation for tax filing expensive?", a: "No, Vakilsearch offers highly cost-effective and transparent pricing for online CA consultation and tax filing, making expert financial advice accessible to everyone." },
  { q: "How long does a tax expert take to file an Income Tax Return?", a: "The process is typically completed within a few days of receiving all necessary documents. The consultation and filing process is streamlined for quick turnaround." },
];

const footerLinks = {
  Trademark: ["Trademark Search", "Trademark Registration", "Trademark Objection", "Trademark Infringement", "Well Known Trademark", "International Trademark Registration", "Trademark Class List"],
  GST: ["HSN Code Finder", "Online GST Registration", "GST Return Filing", "GST Cancellation", "GST Revocation"],
  CompanyRegistration: ["Company Name Search", "Company Registration", "PVT LTD Company Registration", "LLP Registration", "Sole Proprietorship Registration", "OPC Registration", "Partnership Firm Registration", "Startup India Registration"],
  ITRPatentBNS: ["IT Return Filing", "Patent Search", "Patent Registration", "Provisional Patent Application", "Patent Infringement", "BNS Sections"],
  CopyrightExperts: ["Copyright Registration", "Copyright Music Protection", "Copyright Infringement", "Online Lawyer Consultation", "Online CA Consultation", "Company Secretary Services", "Consumer Complaints", "Lawyer Services", "Intellectual Property Lawyers"],
  Calculators: ["GST Calculator", "TDS Calculator", "HRA Calculator", "Gratuity Calculator", "SIP Calculator", "NPS Calculator", "EPF Calculator", "Business Setup Calculator", "PPF Calculator", "Income Tax Calculator", "Simple Compound Interest Calculator", "Salary Calculator", "Retirement Planning Calculator", "RD Calculator", "Mutual Fund Calculator", "FD Calculator", "Home Loan EMI Calculator", "EMI Calculator", "Lumpsum Calculator"],
  Downloads: ["Rental Agreement Format", "GST Invoice Format", "Income Certificate Format", "Power of Attorney Format", "Affidavit Format", "Salary Slip Sample", "Appointment Letter Format", "Relieving Letter Format", "Legal Heir Certificate Format", "Generate Free Rent Receipt", "Commercial Rental Agreement", "Consent Letter for GST Registration Format", "No Objection Certificate (NOC) Format", "Partnership Deed Format", "Experience Letter Format", "Resignation Letter Format", "Offer Letter Format", "Bonafide Certificate Format", "Delivery Challan Format", "Authorised Signatory in GST"]
};


// --- REUSABLE COMPONENTS (Adapted) ---

const StatPill = ({ count, label, Icon }) => (
  <div className="bg-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md">
    {Icon && <Icon className="w-5 h-5 text-[#2E96FF]" />}
    <span className="text-[#222428] text-sm font-semibold tracking-wider">
      <span className="font-bold mr-1">{count}</span>{label}
    </span>
  </div>
);

const ReviewBox = ({ score, reviews, source }) => (
  <div className="bg-white rounded-xl p-3 shadow-lg w-full flex flex-col items-center justify-center border border-gray-100">
    <div className="text-yellow-400 flex items-center mb-1">
      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400" />)}
    </div>
    <p className="text-xs font-semibold text-gray-700">{source}</p>
    <p className="mt-1 font-bold text-xl text-gray-900">{score}</p>
    <p className="text-xs text-gray-500">{reviews}</p>
  </div>
);

const ProcessStep = ({ stepNumber, step }) => (
  <li className="flex items-start gap-4">
    <div className="bg-[#2E96FF] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
      {stepNumber}
    </div>
    <span className="text-gray-700 text-lg">{step}</span>
  </li>
);

const BenefitItem = ({ title, description }) => (
  <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md border-l-4 border-green-500">
    <ArrowRight className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
    <div>
      <h4 className="font-semibold text-lg text-gray-800 mb-1">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);

const CAConsultantCard = ({ expert }) => (
  <motion.div
    className="p-6 bg-white rounded-xl shadow-lg border-t-4 border-[#2E96FF] hover:shadow-xl transition-shadow"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5 }}
  >
    <div className="w-12 h-12 bg-[#2E96FF] rounded-full mb-3 flex items-center justify-center text-white text-xl font-bold">
      {expert.name.charAt(0)}
    </div>
    <h3 className="font-bold text-xl mb-1 text-gray-800">{expert.name}</h3>
    <p className="text-[#2E96FF] font-medium mb-2">{expert.exp}</p>
    <p className="text-gray-600 text-sm mb-3">Specialization: {expert.specialization.split(' in ')[1]}</p>
    <p className="text-gray-700 font-semibold">{expert.desc}</p>
  </motion.div>
);

const ITRPlanCard = ({ plan }) => (
  <div
    className={`relative p-6 rounded-xl shadow-lg flex flex-col justify-between h-full transition-all ${plan.isRecommended
      ? 'bg-[#E6F2FF] border-2 border-[#2E96FF] scale-[1.03] shadow-2xl'
      : 'bg-white border border-gray-200'
      }`}
  >
    {plan.isRecommended && (
      <div className="absolute top-0 right-0 bg-[#2E96FF] text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
        Recommended Plan
      </div>
    )}

    <div>
      <h3 className="text-2xl font-extrabold text-gray-900 mb-2">{plan.title}</h3>

      {plan.isContact ? (
        <div className="text-lg font-bold text-gray-600 mb-4">{plan.originalPrice}</div>
      ) : (
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-3xl font-extrabold text-[#2E96FF]">{plan.price}</span>
          <span className="text-sm line-through text-gray-400">{plan.originalPrice}</span>
          <span className="text-sm text-green-600 font-bold">{plan.discount}</span>
        </div>
      )}

      <button
        className={`w-full py-3 font-semibold rounded-lg transition-colors shadow-md ${plan.isRecommended
          ? 'bg-[#2E96FF] text-white hover:bg-[#0069D1]'
          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
      >
        {plan.isContact ? plan.price : "Get Started"}
      </button>

      <h4 className="font-bold text-gray-800 mt-6 mb-3 border-t pt-3">What you'll get:</h4>
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


// --- TAB CONTENT COMPONENTS (CA Content) ---

const CAExpertiseContent = () => (
  <section id="ca-expertise-content" className="py-12 scroll-mt-24">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Areas of Expertise</h2>
    <p className="text-lg text-gray-700 mb-10 max-w-4xl">
      Opt for expert online CA services at Vakilsearch, covering the entire accounting process for individuals, businesses, and enterprises, including bookkeeping, tax filing, compliance, financial reporting, and advisory support. We provide expert solutions tailored to your needs, ensuring compliance and maximizing financial success.
    </p>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {caExpertiseList.map((item, i) => (
        <div
          key={i}
          className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center gap-3 transition hover:shadow-lg hover:border-[#2E96FF]"
        >
          <Briefcase className="w-5 h-5 text-[#2E96FF]" />
          <span className="font-medium text-gray-700 text-sm">{item}</span>
        </div>
      ))}
    </div>


    <div className="mt-12 p-6 bg-yellow-50 rounded-xl shadow-inner border-l-4 border-yellow-500">
      <h4 className="text-xl font-bold text-gray-800 mb-4">Tax Advisory Services Explained:</h4>
      <p className="text-gray-700 mb-4">
        Our team of skilled Chartered Accountants at Vakilsearch provides extensive tax advisory services to help individuals and businesses navigate the intricate world of taxation. We remain well-informed about the latest tax laws and regulations, ensuring that you receive precise and timely advice customised to your specific requirements.
      </p>
      <ul className="space-y-3 text-gray-700">
        <li className="flex items-start gap-2"><ArrowRight className="w-5 h-5 text-yellow-600 flex-shrink-0" />Better tax planning structure and explains the available deductions.</li>
        <li className="flex items-start gap-2"><ArrowRight className="w-5 h-5 text-yellow-600 flex-shrink-0" />Analyse your financial situation and assess potential risks.</li>
        <li className="flex items-start gap-2"><ArrowRight className="w-5 h-5 text-yellow-600 flex-shrink-0" />Recommend the most beneficial tax strategies tailored to your needs.</li>
        <li className="flex items-start gap-2"><ArrowRight className="w-5 h-5 text-yellow-600 flex-shrink-0" />Ensure that you make informed decisions and remain compliant with tax laws.</li>
      </ul>
    </div>
  </section>
);

const CABenefitsContent = () => (
  <section id="ca-benefits-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Benefits of Online CA Services</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Online CA services offer a range of advantages, including convenience and expert guidance tailored to your specific needs. This modern approach ensures timely compliance with regulations, streamlined tax advisory services, and effective management of capital gains. Here are the benefits:
    </p>

    <div className="grid md:grid-cols-2 gap-6">
      {caBenefits.map((benefit, i) => (
        <BenefitItem key={i} {...benefit} />
      ))}
    </div>
  </section>
);

const CAProcessContent = () => (
  <section id="ca-process-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">How to Get Started with Our Online CA Consultation</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Struggling to find a Chartered Accountant (CA) quickly and affordably? With Vakilsearch, you can consult a CA online anytime, from anywhere—without long waits or high costs. Get expert financial advice in just a few simple steps!
    </p>

    <ol className="space-y-5 list-none border-l-2 border-indigo-100 pl-4">
      {caProcess.map((step, i) => (
        <ProcessStep key={i} stepNumber={i + 1} step={step} />
      ))}
    </ol>
    <p className="mt-8 text-[#2E96FF] font-bold text-lg">That’s it! Quick, easy, and hassle-free. Get started today and take control of your finances.</p>
  </section>
);

const CAWhyVakilsearchContent = () => (
  <section id="ca-why-vakilsearch" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Why Choose Vakilsearch for CA Online Consultation?</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      At Vakilsearch, we recognise the significance of expert financial guidance for your business. Here are compelling reasons to choose us for your CA online consultation needs:
    </p>

    <div className="grid md:grid-cols-3 gap-6">
      {[
        { title: "Experienced Professionals", desc: "Benefit from the expertise of seasoned Chartered Accountants. Our professionals bring years of experience and in-depth knowledge to address your specific financial challenges." },
        { title: "Tailored Solutions", desc: "Receive personalised advice and solutions tailored to your business requirements. We understand that each business is unique, and our CAs are dedicated to providing customised financial guidance." },
        { title: "Convenience at Your Fingertips", desc: "Enjoy the convenience of accessing top-notch CA services anytime, anywhere. Our online platform ensures that expert consultation is just a click away." },
        { title: "Time Efficiency", desc: "Save valuable time with our efficient online consultation process. We prioritise your time, delivering prompt and insightful solutions." },
        { title: "Transparent Communication", desc: "Experience clear and transparent communication throughout the consultation process, fostering trust and understanding." },
        { title: "Cost-Effective Services", desc: "Avail cost-effective CA services without compromising on quality, ensuring you receive the best financial expertise within your budget." },
      ].map((item, i) => (
        <div key={i} className="p-5 bg-indigo-50 rounded-xl shadow-sm">
          <h4 className="font-bold text-xl text-gray-800 mb-2">{item.title}</h4>
          <p className="text-sm text-gray-600">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

const CAFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
  <section id="ca-faqs-content" className="py-12 max-w-5xl mx-auto scroll-mt-24">
    <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">FAQs on Online CA Consultation</h3>

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


// --- FOOTER COMPONENT ---

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

const CAFooter = () => (
  <footer className="bg-gray-50 pt-12 border-t border-gray-200">
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 pb-10">
        {Object.keys(footerLinks).slice(0, 4).map((key) => (
          <FooterColumn key={key} title={key.replace(/([A-Z])/g, ' $1').trim()} links={footerLinks[key].slice(0, 7)} />
        ))}

        {Object.keys(footerLinks).slice(4, 7).map((key) => (
          <FooterColumn key={key} title={key.replace(/([A-Z])/g, ' $1').trim()} links={footerLinks[key].slice(0, 7)} />
        ))}
      </div>

      <div className="border-t pt-6 pb-6 text-xs text-gray-500 space-y-3">
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <a href="#" className="hover:underline">About Us</a>
          <a href="#" className="hover:underline">Media</a>
          <a href="#" className="hover:underline">Press Release</a>
          <a href="#" className="hover:underline">Contact Us</a>
          <a href="#" className="hover:underline">Partner with us</a>
          <a href="#" className="hover:underline">Satisfaction Guarantee</a>
          <a href="#" className="hover:underline">Article</a>
          <a href="#" className="hover:underline">News</a>
          <a href="#" className="hover:underline">Sitemap</a>
          <a href="#" className="hover:underline text-[#2E96FF] font-semibold">Refer a friend</a>
        </div>

        <p>By continuing past this page, you agree to our <a href="#" className="hover:underline text-gray-700">Terms of Service</a>, <a href="#" className="hover:underline text-gray-700">Cookie Policy</a>, <a href="#" className="hover:underline text-gray-700">Privacy Policy</a> and <a href="#" className="hover:underline text-gray-700">Refund Policy</a> © 2024 - Uber9 Business Process Services Private Limited. All rights reserved.</p>

        <p>Uber9 Business Process Services Private Limited, CIN - U74900TN2014PTC098414, GSTIN - 33AABCU7650C1ZM, Registered Office Address - F-97, Newry Shreya Apartments Anna Nagar East, Chennai, Tamil Nadu 600102, India.</p>

        <p>Please note that we are a facilitating platform enabling access to reliable professionals. We are not a law firm and do not provide legal services ourselves. The information on this website is for the purpose of knowledge only and should not be relied upon as legal advice or opinion.</p>
      </div>
    </div>
  </footer>
);


// --- MAIN COMPONENT ---
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(caTabs[0].id);
  const [faqOpen, setFaqOpen] = useState(null);

  // Offset to account for the sticky header height when calculating scroll position
  const SCROLL_OFFSET = 120;

  // --- SCROLLSPY IMPLEMENTATION ---
  useEffect(() => {
    const sectionIds = caTabs.map(tab => tab.id);

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
  }, [caTabs]);

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

  // Conditional render for tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'ca-expertise-content':
        return <CAExpertiseContent />;
      case 'ca-benefits-content':
        return <CABenefitsContent />;
      case 'ca-process-content':
        return <CAProcessContent />;
      // case 'ca-why-vakilsearch':
      // 	return <CAWhyVakilsearchContent />;
      case 'ca-faqs-content':
        return <CAFAQsContent faqs={caFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />;
      default:
        return <CAExpertiseContent />;
    }
  };

  return (
    <div className="bg-white min-h-screen font-[Inter]">

      {/* Breadcrumb Header
			<div className="max-w-7xl mx-auto px-4 pt-4 text-sm text-gray-500">
				<a href="#" className="hover:underline">Home</a> &gt; <span className="font-semibold text-gray-700">CA Consultation</span>
			</div> */}

      {/* === HERO SECTION (CA Specific) === */}
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


      {/* --- ITR Pricing Section --- */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Choose the Right Plan For Your ITR Filing
          </h2>
          <p className="text-center text-lg text-gray-600 mb-10">
            Vakilsearch's experts file over 10,000+ ITRs every month.
          </p>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {itrPlans.map((plan, i) => (
              <ITRPlanCard key={i} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* === Main Content Tabs Navigation (Sticky) === */}
      <section className="py-8 md:py-10 px-4 md:px-8 bg-white border-b border-gray-200 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center bg-white rounded-xl w-full text-sm md:text-base overflow-x-auto border border-gray-200">
            {caTabs.map((tab) => (
              <a
                key={tab.id}
                className={`flex flex-col flex-shrink-0 w-1/5 min-w-[150px] py-4 px-2 text-center font-bold cursor-pointer transition-all ${activeTab === tab.id ? 'bg-[#E6F2FF] border-b-4 border-[#2E96FF] text-[#2E96FF]' : 'text-gray-700 hover:bg-gray-50'}`}
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

      {/* --- CA CONSULTANTS / SCHOLARLY WORK --- */}
      {/* <section className="py-12 md:py-16 px-4 md:px-8">
				<div className="max-w-7xl mx-auto">
					<h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
						Scholarly Work by Our Panel of Consultants
					</h2>
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
						{caExperts.map((expert, i) => (
							<CAConsultantCard key={i} expert={expert} />
						))}
					</div>
				</div>
			</section> */}

      {/* === All Tab Content Sections Rendered Sequentially === */}
      <div className="py-2 md:py-4 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Render all content sections below the tabs for scroll-spy to work */}
          <CAExpertiseContent />
          <CABenefitsContent />
          <CAProcessContent />
          {/* <CAWhyVakilsearchContent /> */}
          <CAFAQsContent faqs={caFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
        </div>
      </div>
    </div>
  );
}
