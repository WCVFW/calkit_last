import React, { useState, useEffect } from "react";
import axios from "axios"; // Keeping axios even if not used in the final design logic
import {
  ChevronDown,
  Mail,
  MapPin,
  Smartphone,
  PhoneCall,
  Zap,
  Briefcase,
  ArrowRight,
  UserCheck, // For verified lawyers
  FileText, // For documents
  Scale, // For Litigation
  Calculator, // For calculators
  Download, // For downloads
  Users, // ADDED USERS ICON HERE
  Star, // Added Star back for ReviewBox
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from"@/assets/Backgroundimage.png"

// --- Static Data Definitions ---

const expertiseList = [
  "Legal Notices", "Employment Issues", "Property Succession", "Property Registration", "Property Verification",
  "Cheque Bounce Cases", "Money Recovery Issues", "Mutual Divorce", "Divorce & Matrimonial Consultation",
  "File a Consumer Case", "Will Drafting and Registration", "File a Criminal Complaint",
  "Debt Recovery Tribunal", "National Green Tribunal Cases", "Motor Accident Claims",
  "Setting up of a Business", "Fundraising for Businesses",
];

const tabs = [
  { id: 'expertise-content', label: 'Areas Of Expertise' },
  { id: 'services-content', label: 'Services' },
  { id: 'process-content', label: 'Process' },
  { id: 'benefits-content', label: 'Benefits' },
  { id: 'faqs-content', label: 'FAQs' },
];

const faqs = [
  { q: "What is online lawyer consultation?", a: "It is a convenient way to connect with qualified lawyers via video or phone call, without visiting in person." },
  { q: "Do I need to visit the lawyer in person for consultation?", a: "No. All consultations happen 100% online at your convenience." },
  { q: "Are vakilsearch lawyers qualified?", a: "Yes, all our lawyers are verified, licensed, and experts in their fields." },
  { q: "Can I get help with property law issues through an online consultation?", a: "Yes, we have senior lawyers specializing in property succession, registration, and disputes." },
  { q: "How are fees structured for online lawyer consultations?", a: "Fees are structured affordably, typically ₹399 for a 30-minute consultation, with transparent, budget-friendly pricing." },
  { q: "Can I resolve business disputes through online lawyer consultations?", a: "Yes, our experts provide strategic advice on corporate, business law, and dispute resolution." },
  { q: "What are the benefits of choosing Vakilsearch for legal advice?", a: "Benefits include trusted legal advice, strong advocacy, risk reduction, cost savings, and access to a broad legal network." },
  { q: "How can I book a lawyer consultation with Vakilsearch?", a: "The process involves 8 quick steps: visiting the site, entering details, selecting language/problem, consulting, OTP verification, picking a slot, and payment." },
  { q: "Is online lawyer consultation safe & secure on Vakilsearch?", a: "Yes, your information stays private with end-to-end encryption and secure digital processes." },
  { q: "If I call again, can I consult with the same lawyer?", a: "We strive to maintain continuity; you can often request to consult with the same lawyer based on availability." },
  { q: "Is a video call available for lawyer consultations?", a: "Yes, our lawyers will contact you through your chosen mode of communication, either video or audio call, at your selected time." },
  { q: "What if I missed my booked consultation slot?", a: "Vakilsearch provides support for rescheduling or assisting clients who missed their booked time slots. Please contact customer support." },
  { q: "Can I consult with a lawyer in my native language?", a: "Yes, you can choose your preferred language during the booking process." },
];


// --- New Links Data ---
const resourceLinks = [
  { title: "Trademark", icon: Briefcase, items: ["Trademark Search", "Trademark Registration", "Trademark Objection", "Trademark Infringement", "Well Known Trademark", "International Trademark Registration", "Trademark Class List"] },
  { title: "GST", icon: Scale, items: ["HSN Code Finder", "Online GST Registration", "GST Return Filing", "GST Cancellation", "GST Revocation"] },
  { title: "Company Registration", icon: Briefcase, items: ["Company Name Search", "Company Registration", "PVT LTD Company Registration", "LLP Registration", "Sole Proprietorship Registration", "OPC Registration", "Partnership Firm Registration", "Startup India Registration"] },
  { title: "ITR, Patent & BNS", icon: FileText, items: ["IT Return Filing", "Patent Search", "Patent Registration", "Provisional Patent Application", "Patent Infringement", "BNS Sections"] },
  { title: "Copyright & Experts", icon: UserCheck, items: ["Copyright Registration", "Copyright Music Protection", "Copyright Infringement", "Online Lawyer Consultation", "Online CA Consultation", "Company Secretary Services", "Consumer Complaints", "Lawyer Services", "Intellectual Property Lawyers"] },
  { title: "Calculators", icon: Calculator, items: ["GST Calculator", "TDS Calculator", "HRA Calculator", "Gratuity Calculator", "SIP Calculator", "NPS Calculator", "EPF Calculator", "Business Setup Calculator", "PPF Calculator", "Income Tax Calculator", "Simple Compound Interest Calculator", "Salary Calculator", "Retirement Planning Calculator", "RD Calculator", "Mutual Fund Calculator", "FD Calculator", "Home Loan EMI Calculator", "EMI Calculator", "Lumpsum Calculator"] },
  { title: "Downloads", icon: Download, items: ["Rental Agreement Format", "GST Invoice Format", "Income Certificate Format", "Power of Attorney Format", "Affidavit Format", "Salary Slip Sample", "Appointment Letter Format", "Relieving Letter Format", "Legal Heir Certificate Format", "Generate Free Rent Receipt", "Commercial Rental Agreement", "Consent Letter for GST Registration Format", "No Objection Certificate (NOC) Format", "Partnership Deed Format", "Experience Letter Format", "Resignation Letter Format", "Offer Letter Format", "Bonafide Certificate Format", "Delivery Challan Format", "Authorised Signatory in GST"] },
  { title: "Find Lawyers By City", icon: MapPin, items: ["Top Lawyers in Chennai", "Top Lawyers in Bangalore", "Top Lawyers in Mumbai", "Top Lawyers in Delhi", "Top Lawyers in Kolkata", "Top Lawyers in Gurgaon", "Search Lawyers in Other Cities"] },
];

// --- Reusable Components ---

const LawyerCard = ({ lawyer }) => (
  <motion.div
    className="p-6 bg-white rounded-xl shadow-lg border-t-4 border-indigo-100 hover:shadow-xl transition-shadow"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5 }}
  >
    <div className="w-12 h-12 bg-[#2E96FF] rounded-full mb-3 flex items-center justify-center text-white text-xl font-bold">
      {lawyer.name.charAt(0)}
    </div>
    <h3 className="font-bold text-xl mb-1">{lawyer.name}</h3>
    <p className="text-indigo-600 font-medium mb-2">{lawyer.exp}</p>
    <p className="text-gray-600 text-sm">{lawyer.desc}</p>
  </motion.div>
);

// StatPill is now fully aligned with the image: white background, dark text, no icon
const StatPill = ({ count, label }) => (
  <div className="bg-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md">
    <span className="text-[#222428] text-sm font-semibold tracking-wider">
      <span className="font-bold mr-1">{count}</span>{label}
    </span>
  </div>
);

const ReviewBox = ({ score, reviews, source }) => (
  <div className="bg-white/10 rounded-xl p-6 shadow-lg w-full max-w-[220px] flex flex-col items-center justify-center border border-white/20">
    <div className="text-yellow-400 flex items-center mb-2">
      {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400" />)}
    </div>
    <h4 className="text-sm font-semibold text-white/80">{source}</h4>
    <p className="mt-1 font-bold text-3xl text-white">{score}</p>
    <p className="text-sm text-white/90">{reviews}</p>
  </div>
);

const ServiceItem = ({ title, description, icon }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-indigo-500 hover:shadow-xl transition">
    <div className="flex items-center gap-3 mb-2">
      {icon}
      <h4 className="font-bold text-xl text-gray-800">{title}</h4>
    </div>
    <p className="text-gray-600 text-sm">{description}</p>
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


const ResourceLinkGroup = ({ title, items, icon: Icon }) => (
  <div className="p-4 bg-white rounded-xl shadow-lg">
    <h4 className="font-bold text-xl mb-3 text-gray-900 flex items-center gap-2">
      {Icon && <Icon className="w-5 h-5 text-[#2E96FF]" />} {title}
    </h4>
    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
      {items.slice(0, 7).map((item, i) => (
        <a key={i} href="#" className="text-sm text-gray-600 hover:text-[#2E96FF] transition truncate" title={item}>
          {item}
        </a>
      ))}
    </div>
    {items.length > 7 && (
      <a href="#" className="text-sm text-[#2E96FF] font-semibold mt-2 block hover:underline">
        View all ({items.length - 7} more)
      </a>
    )}
  </div>
);

// --- Tab Content Components ---

const ExpertiseContent = () => (
  <section id="expertise-content" className="py-10 scroll-mt-24">
    <h3 className="text-2xl font-bold mb-6 text-gray-800">Online Lawyer Consultation</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">Getting reliable legal help is now easier and more accessible with online consultation services. Whether you’re dealing with property disputes, corporate law, family law, or criminal matters, our platform enables you to connect with experienced lawyers via video or phone calls. With Vakilsearch, you can choose from legal experts specializing in various fields, including cybercrime, intellectual property, domestic violence, and more, to receive personalized, professional advice tailored to your specific needs—all from the comfort of your home.</p>

    <h4 className="text-xl font-bold mb-4 text-gray-800">Core Services for Legal Notices:</h4>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-indigo-50 p-6 rounded-xl border-l-4 border-indigo-500 shadow-sm">
        <h4 className="font-semibold text-lg mb-1 text-indigo-700">Clear and concise drafting</h4>
        <p className="text-gray-600 text-sm">Our lawyers assist in drafting and sending legal notices to resolve disputes, breach of contract issues, or other legal concerns.</p>
      </div>
      <div className="bg-indigo-50 p-6 rounded-xl border-l-4 border-indigo-500 shadow-sm">
        <h4 className="font-semibold text-lg mb-1 text-indigo-700">Tailor made notices & Quick filing</h4>
        <p className="text-gray-600 text-sm">Each notice is customized to your specific needs, guaranteeing quick filing and timely response.</p>
      </div>
      <div className="bg-indigo-50 p-6 rounded-xl border-l-4 border-indigo-500 shadow-sm">
        <h4 className="font-semibold text-lg mb-1 text-indigo-700">Top lawyer support</h4>
        <p className="text-gray-600 text-sm">Receive strategic guidance from top-tier legal experts throughout the process.</p>
      </div>
    </div>
  </section>
);

const ServicesContent = () => (
  <section id="services-content" className="py-10 scroll-mt-24">
    <h3 className="text-2xl font-bold mb-6 text-gray-800">What Are Lawyer Services?</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">Our Online lawyer consultation services offer a range of legal consultation services that cater to different needs, from business contracts to family matters.</p>

    <div className="space-y-6">
      <ServiceItem icon={<Briefcase className="w-6 h-6 text-indigo-600" />} title="Legal Consultation" description="Get expert legal advice tailored to your situation. Our lawyers analyze your case and guide you toward the best course of action" />
      <ServiceItem icon={<FileText className="w-6 h-6 text-green-600" />} title="Drafting and Reviewing Legal Documents" description="Ensure the legality and enforceability of your documents, including contracts, agreements, wills, Succession Certificates, anticipatory bail, and NDAs." />
      <ServiceItem icon={<Scale className="w-6 h-6 text-red-600" />} title="Litigation and Representation" description="Our lawyers represent clients in civil and criminal cases, ensuring strong legal advocacy and presenting compelling arguments." />
      <ServiceItem icon={<Briefcase className="w-6 h-6 text-yellow-600" />} title="Corporate and Business Law Services" description="Navigate the complexities of business law with confidence, offering strategic advice on formation, contracts, and compliance." />
      <ServiceItem icon={<Users className="w-6 h-6 text-pink-600" />} title="Family Law Services" description="Address family-related legal matters with sensitivity, assisting with divorce, child custody, adoption, and other issues." />
    </div>
  </section>
);

const ProcessContent = () => (
  <section id="process-content" className="py-10 scroll-mt-24">
    <h3 className="text-2xl font-bold mb-6 text-gray-800">How Online Attorney Consultations Work</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">Vakilsearch makes it easy to connect with expert lawyers online through a quick and secure process. Follow these easy steps to book your slot:</p>

    <ol className="space-y-5 list-none">
      <ProcessStep stepNumber={1} step="Visit our website for legal support at https://vakilsearch.com/talk-to-a-lawyer" />
      <ProcessStep stepNumber={2} step="Enter your email ID, phone number, and pincode." />
      <ProcessStep stepNumber={3} step="Choose your preferred language." />
      <ProcessStep stepNumber={4} step="Select from property issues, family matters, business disputes, and more." />
      <ProcessStep stepNumber={5} step="Click on ‘Consult Now’." />
      <ProcessStep stepNumber={6} step="Enter the OTP sent to your mobile." />
      <ProcessStep stepNumber={7} step="Pick your preferred slot and make the payment." />
      <ProcessStep stepNumber={8} step="Our lawyers will contact you through your chosen mode of communication, either video or audio call, at your selected time." />
    </ol>
    <p className="mt-8 text-indigo-600 font-bold text-lg">With Vakilsearch, instant advocate support is just a few clicks away. Book your slot now!</p>
  </section>
);

const BenefitsContent = () => (
  <section id="benefits-content" className="py-10 scroll-mt-24">
    <h3 className="text-2xl font-bold mb-6 text-gray-800">Benefits of Online Attorney Consultation</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">Online attorney consultation offers you clarity, confidence, and expert support from the comfort of your house. Here are the key benefits of consulting a lawyer from Vakilsearch:</p>

    <div className="grid md:grid-cols-2 gap-6">
      <BenefitItem title="Trusted Legal Advice" description="Vakilsearch has a team of verified lawyers who break down complex laws, evaluate your case, and help you choose the best course of action." />
      <BenefitItem title="Advocacy and Representation" description="Our lawyers provide the best legal services online protecting your rights, drafting legal documents, and supporting you through legal procedures when needed." />
      <BenefitItem title="Risk Reduction and Cost Savings" description="Avoid costly legal mistakes with the help of our legal experts. Timely advice minimises risks and can save you both time and money." />
      <BenefitItem title="Access to Resources and Networks" description="You benefit from a broader legal ecosystem access to legal document support, consultants, and specialists, all coordinated through Vakilsearch." />
      <BenefitItem title="Negotiation Support" description="Our attorneys are skilled negotiators who can help you handle legal discussions confidently and effectively." />

    </div>
  </section>
);


const FAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
  <section id="faqs-content" className="py-10 max-w-4xl mx-auto scroll-mt-24">
    <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">Frequently Asked Questions on Online Lawyer Consultation</h3>

    <div className="space-y-4">
      {faqs.map((f, i) => (
        <div key={i} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <button
            // FIX: Added backticks for template literal className
            className={`w-full flex justify-between items-center p-5 text-left transition ${faqOpen === i ? 'bg-indigo-50 text-indigo-700' : 'bg-white hover:bg-gray-50'}`}
            onClick={() => setFaqOpen(faqOpen === i ? null : i)}
          >
            <span className="font-semibold text-lg">{f.q}</span>
            <ChevronDown
              // FIX: Added backticks for template literal className
              className={`w-6 h-6 transition-transform ${faqOpen === i ? "rotate-180 text-indigo-600" : ""}`}
            />
          </button>
          <motion.div
            initial={false}
            animate={{ height: faqOpen === i ? "auto" : 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <p className="px-5 py-4 text-gray-600 bg-white">{f.a}</p>
          </motion.div>
        </div>
      ))}
    </div>
  </section>
);


// --- Main Component ---
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('expertise-content');
  const [faqOpen, setFaqOpen] = useState(null);

  // Offset to account for the sticky header height when calculating scroll position
  const SCROLL_OFFSET = 120;

  // --- SCROLLSPY IMPLEMENTATION ---
  useEffect(() => {
    const sectionIds = tabs.map(tab => tab.id);

    const handleScroll = () => {
      let currentActiveTab = sectionIds[0]; // Default to the first section

      for (let i = 0; i < sectionIds.length; i++) {
        const sectionId = sectionIds[i];
        const section = document.getElementById(sectionId);

        if (section) {
          const rect = section.getBoundingClientRect();
          // Check if the top of the section is within the detection zone (top of viewport + offset)
          if (rect.top <= SCROLL_OFFSET) {
            currentActiveTab = sectionId;
          }
        }
      }

      // Only update state if the active tab has genuinely changed
      setActiveTab(prevActiveTab => {
        if (prevActiveTab !== currentActiveTab) {
          return currentActiveTab;
        }
        return prevActiveTab;
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check to set the correct tab when component loads (in case of deep link or restored scroll)
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [tabs]);

  // Function to handle smooth scrolling when a tab is clicked
  const handleTabClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Use smooth scrolling and set the active tab for styling
      // The SCROLL_OFFSET is crucial here to prevent the sticky header from covering the content title
      window.scrollTo({
        top: element.offsetTop - SCROLL_OFFSET,
        behavior: 'smooth'
      });
      setActiveTab(id);
    }
  };

  return (
    <div className="bg-white min-h-screen font-[Poppins]">
      {/* === HERO SECTION REVISED for the second image's specific split === */}
      <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">

          {/* Background Styling: 
            This div is now dedicated to holding the uploaded image, 
            which already contains the diagonal shape and dark/textured background.
        */}
          {/* Background Styling: Uses the image file with an <img> tag. */}
          <div
            className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden"
          >
            {/* This <img> tag replaces the backgroundImage CSS.
        It must be absolutely positioned and told to cover the parent container. 
    */}
            <img
              src={BackgroundImageSrc}
              alt="Diagonal background graphic"
              className="absolute top-0 left-0 w-full h-full object-cover"
              style={{
                // The image itself (Backgroundimage.png) is assumed to contain the dark diagonal shape.
                // object-cover ensures it scales nicely without stretching too much.
              }}
            />
          </div>

          {/* Content and Form Wrapper - Set z-index higher than background */}
          <div className="relative flex flex-col lg:flex-row items-start pt-10 pb-12 lg:pb-0 z-20">

            {/* Left Column (Content) - Remains dark text on dark background defined by the image */}
            <div className="w-full lg:w-3/5 text-white p-4 md:p-6 pb-20 relative z-20">

              {/* Badge */}
              <div
                className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-2 items-center gap-2"
              >
                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black transform rotate-180"></span>
                #1 Legal Service Provider In India
              </div>
              {/* H1 Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
                Online Lawyer Consultation
              </h1>

              {/* Description Text */}
              <p className="text-[#A0A0A0] text-sm lg:text-base max-w-lg mb-6">
                Lorem Ipsum is simply Dummy Text Of The Printing And Typesetting Industry. The Industry's Standard Dummy Text Ever Since The 1500s, When An Unknown
              </p>

              {/* Bullet Points */}
              <div className="space-y-1 mb-8 text-lg">
                <p className="flex items-center gap-2 text-[#A0A0A0] text-sm"><span className="w-2 h-2 bg-green-500 block"></span> Lorem Ipsum is Simply Dummy Text Of The Printing And Typesetting I</p>
                <p className="flex items-center gap-2 text-[#A0A0A0] text-sm"><span className="w-2 h-2 bg-indigo-500 block"></span> Lorem Ipsum is Simply Dummy Text Of The Printing And Typesetting I</p>
              </div>

              {/* Live Stats */}
              <div className="flex flex-wrap gap-4">
                {/* StatPill component needed here */}
                {/* <StatPill count="104" label="LAWYERS ARE ONLINE" /> */}
                {/* <StatPill count="48" label="LIVE ONGOING CALLS" /> */}
              </div>
            </div>

            {/* Right Column (Form) */}
            <div className="w-full lg:w-[350px] relative z-30 lg:mt-0 lg:ml-auto mt-[-100px] sm:mt-[-50px]">
              <div
                className="w-full p-6 md:p-8 rounded-2xl shadow-xl bg-white"
                style={{ borderRadius: '24px', border: '1px solid #E0E0E0' }}
              >
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Get Expert Legal Consultation</h2>
                <form className="space-y-4">
                  <input className="w-full px-4 py-3 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg text-sm text-gray-500 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="Email" />
                  <input className="w-full px-4 py-3 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg text-sm text-gray-500 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="Mobile Number" />
                  <input className="w-full px-4 py-3 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg text-sm text-gray-500 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="City/Pincode" />
                  <input className="w-full px-4 py-3 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg text-sm text-gray-500 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="Language" />
                  <input className="w-full px-4 py-3 bg-[#F4F4F4] border border-[#E0E0E0] rounded-lg text-sm text-gray-500 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="Problem Type" />

                  {/* WhatsApp Update Text and Toggle */}
                  <div className="flex items-center justify-between pt-1 text-gray-600">
                    <p className="text-xs md:text-sm text-gray-700 font-medium">Get Easy Updates Through Whatsapp</p>
                    {/* Toggle Switch */}
                    <div className="w-10 h-5 bg-gray-300 rounded-full relative cursor-pointer flex items-center p-0.5 transition-colors">
                      <div className="w-4 h-4 bg-white rounded-full shadow-md transition-transform transform translate-x-0"></div>
                    </div>
                  </div>

                  {/* Button - Corrected to dark navy blue shade */}
                  <button type="submit" className="w-full bg-[#113C6D] text-white py-3 font-semibold rounded-lg transition-colors hover:bg-indigo-900 text-base shadow-md mt-4">
                    Talk to Lawyer Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === Main Content Tabs Navigation (Sticky) === */}
      <section className="py-8 md:py-10 px-4 md:px-8 bg-gray-50 border-b border-gray-200 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center bg-white rounded-xl w-full text-sm md:text-base overflow-x-auto border border-gray-200">
            {tabs.map((tab) => (
              <a
                key={tab.id}
                // Remove default link jump behavior
                className={`flex flex-col flex-shrink-0 w-1/5 min-w-[150px] py-4 px-2 text-center font-bold cursor-pointer transition-all ${activeTab === tab.id ? 'bg-[#E6F2FF] border-b-4 border-[#0069D1] text-[#0069D1]' : 'text-[#120000] hover:bg-gray-50'}`}
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
          <ExpertiseContent />
          <ServicesContent />
          <ProcessContent />
          <BenefitsContent />
          <FAQsContent faqs={faqs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
        </div>
      </div>


      {/* --- Full Expertise List --- */}
      <section className="py-12 md:py-16 bg-gray-50 px-4 md:px-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10">
            Our Lawyers Areas of Expertise
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {expertiseList.map((item, i) => (
              <div key={i} className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center gap-3 hover:shadow-md transition">
                <Briefcase className="w-5 h-5 text-[#2E96FF]" />
                <span className="font-medium text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
