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
} from "lucide-react";
import { motion } from "framer-motion";
import BackgroundImageSrc from '../../assets/business.png'; // Reusing the same image for the background

// --- PITCH DECK STATIC DATA DEFINITIONS ---

const pitchDeckTabs = [
  { id: 'pitch-overview-content', label: 'Overview' },
  { id: 'pitch-advantages-content', label: 'Advantages' },
  { id: 'pitch-contain-content', label: 'Plan Contain' },
  { id: 'pitch-process-content', label: 'Process' },
  { id: 'pitch-services-content', label: 'Our Services' },
  { id: 'pitch-why-vakilsearch', label: 'Why Vakilsearch' },
  { id: 'pitch-faqs-content', label: 'FAQs' },
];

const pitchDeckContent = [
  { title: "Elevator Pitch", icon: Zap, description: "A quick and crisp synopsize of your startup - the problem it is solving." },
  { title: "Solution", icon: Lightbulb, description: "Your solution to the massive problem you have identified." },
  { title: "Market Analysis", icon: Globe, description: "Insights into the market and the opportunity it presents." },
  { title: "USP", icon: Scale, description: "Evidence that your business differs from other businesses and why it will succeed." },
  { title: "Business Model", icon: DollarSign, description: "How will you generate revenue and grow the same." },
  { title: "Go-To-Market Strategy", icon: ArrowRight, description: "What’s your strategy to acquire customers and attain massive growth." },
  { title: "Current Traction", icon: TrendingUp, description: "What’s your current traction and key business metrics." },
  { title: "Founding Team", icon: Users, description: "An overview of the domain expertise and the background of the founding team and other key advisors, partners, or investors." },
];

const deckCreationSteps = [
  "Define Your Company's Purpose and Business Model: Clearly articulate your company's purpose, addressing the problem you solve and the solution your product or service provides. Outline your business model, detailing how you generate revenue and create value for customers.",
  "Identify Your Target Market and Market Size: Define your target market, specifying the customer segments you aim to serve. Quantify the market size, illustrating the potential reach and revenue opportunities.",
  "Present Your Team's Expertise and Experience: Showcase your team's credentials, emphasizing their relevant experience and expertise. Highlight your team's capability to execute the business plan and achieve success.",
  "Highlight Your Traction and Accomplishments: Demonstrate your company's progress by showcasing milestones, partnerships, or customer acquisitions. Provide tangible evidence of your team's ability to deliver results.",
  "Project Your Financial Performance and Funding Needs: Present realistic financial projections, including revenue forecasts, expense breakdowns, and profitability targets. Clearly articulate your funding requirements and how the funds will be utilized.",
  "Craft a Compelling Narrative and Design: Structure your pitch deck as a narrative, guiding investors through your problem, solution, and market opportunity. Utilize visuals effectively, incorporating charts, graphs, and images to enhance understanding and engagement.",
  "Seek Expert Guidance and Feedback: Engage with our experienced pitch deck designers for valuable insights and refinement. Receive feedback from our team to identify areas for improvement and strengthen your presentation.",
];

const pitchDocuments = [
  "Enterprise Plan – A business pitch is a written document that outlines the objectives and tactics for the company's future.",
  "Technical Documents – An investor may request the relevant documentation from a business owner who is launching a technology-based venture or a medical venture.",
  "Documents Concerning Financial Issues – Detailed financial projections for the upcoming years will be needed by the potential investor who is interested in the company.",
  "Various Documents – Investors want to see the plans and pertinent documents related to hiring new employees and the costs associated with payroll, R&D, manufacturing, and marketing.",
  "Information Regarding the Market – Information about the target market helps the entrepreneur solve problems by giving pertinent data.",
];

const serviceProcessSteps = [
  { days: "5 Working Days", detail: "We will ask startups to share data of their business in a proprietary format, using which we perform an in-depth analysis of the business and competitors. The data requested from startups will be broad-ranging right from the vision for the company to the finer details such as business model, customer acquisition costs, breakdown of revenues, etc." },
  { days: "10 Working Days", detail: "We share a rough draft of the investment pitch deck in text format. Upon confirmation from the startup, within 10 working days, we will be able to deliver an end-to-end business plan that will visually impress a potential investor or partner." },
  { days: "4 Working Days", detail: "We encourage iterations requested by the startups on the business pitch up to 4 working days after delivering the first draft of the investment pitch deck." },
];

const vakilsearchServices = [
  "Pitch Deck Creation – A well-crafted pitch deck is essential for any entrepreneur seeking funding or partners. Our professional pitch deck creation services will help you create a compelling presentation.",
  "Investor Pitch Coaching – Even with a great pitch deck, it is important to be able to deliver your pitch effectively. Our coaching services will help you hone your presentation skills and develop the confidence you need.",
  "Investor Connect – We offer investor connect services that will help you connect with potential investors and partners. We have a strong network of investors actively looking for new investment opportunities.",
];

const whyVakilsearch = [
  "Unmatched Expertise: Our team brings unparalleled expertise in crafting effective pitch decks. We understand the nuances of presenting your business in a way that resonates with investors.",
  "Tailored Pitch Decks: We don't believe in one-size-fits-all. Your business is unique, and so should be your pitch deck. Our experts create tailored pitch decks that reflect the essence and potential of your venture.",
  "Investor Coaching and Pitch Preparation: Beyond designing the deck, we offer comprehensive investor coaching and pitch preparation. We equip you with the skills and confidence needed to deliver a compelling presentation.",
  "Proven Track Record of Success: With a track record of successful pitch decks, we have aided numerous businesses in securing the funding they need. Our approach is backed by real-world success stories.",
];

const pitchDeckFAQs = [
  { q: "What should be included in my investment pitch deck?", a: "A pitch deck should include the problem, solution, market size, business model, competition/USP, go-to-market strategy, team, traction/milestones, financial projections, and funding ask." },
  { q: "How long should my investment pitch deck be?", a: "Ideally, a pitch deck should be **10-15 slides**. The goal is to be concise, engaging, and to leave the investor wanting a follow-up meeting, not to provide every detail of the business plan." },
  { q: "What is the difference between an investment pitch deck and a business plan?", a: "The **pitch deck** is a concise visual presentation (10-15 slides) used to pique investor interest. The **business plan** is a detailed, long-form document (20-50+ pages) covering every operational and financial aspect." },
  { q: "How much does it cost to create an investment pitch deck?", a: "The cost varies widely, but professional services like Vakilsearch balance **cost-effectiveness with expert design** and financial modeling, ensuring an investor-ready, high-quality output." },
  { q: "What are the common mistakes that people make when creating investment pitch decks?", a: "Common mistakes include too much text, confusing financial projections, lacking a clear 'why now' market context, and failing to highlight the team's relevant expertise." },
  { q: "What documents help you set up a business pitch deck?", a: "Key inputs include your detailed business plan, financial statements (P&L, Balance Sheet), market research data, company incorporation documents, and team resumes/KYC." },
  { q: "What is the purpose of a pitch deck?", a: "The primary purpose is to secure the next meeting, not the funding itself. It's a marketing tool designed to convey your company's potential, excite investors, and pass their initial screening quickly." },
  { q: "How long will the business pitch last?", a: "The verbal pitch accompanying the deck should generally be kept to **10-15 minutes**, leaving ample time for questions and discussion with investors." },
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

const ProcessStep = ({ stepNumber, step }) => (
    <li className="flex items-start gap-4">
        <div className="bg-[#022B50] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
            {stepNumber}
        </div>
        <span className="text-gray-700 text-lg">{step}</span>
    </li>
);


// --- TAB CONTENT COMPONENTS (Pitch Deck Content) ---

const PitchOverviewContent = () => (
  <section id="pitch-overview-content" className="py-12 scroll-mt-24">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Investment Pitch Deck - an Overview</h2>
    <p className="text-lg text-gray-700 mb-4 max-w-4xl">
      An **investment pitch deck** is a presentation used by startups to raise capital from investors. It typically includes **10-15 slides** that outline the company's problem, solution, market opportunity, team, traction, financials, and funding needs.
    </p>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Pitch deck designs should be clean, professional, and visually appealing. The pitch deck for investors should be **tailored to the specific audience** (e.g., angel investors focus on high returns, VCs focus on scalability). A business pitch is a short presentation that summarises the key points of your investment pitch deck.
    </p>

    <div className="p-6 bg-[#E6F0F6] rounded-xl border-l-4 border-[#022B50] shadow-md">
      <p className="text-gray-800 font-semibold">
        The cost of a pitch deck in India can vary depending on the complexity of the deck, the experience of the designer, and the number of revisions required. We offer competitive pricing with expert analysis.
      </p>
    </div>
  </section>
);

const PitchAdvantagesContent = () => (
  <section id="pitch-advantages-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-8 text-gray-800">Advantages of Having an Investor Pitch</h3>

    <div className="grid md:grid-cols-3 gap-6">
      <DetailItem
        title="Convince the Investors"
        description="Showcase your potential for success in an easily understandable presentation to bank executives, VCs, and private equity investors. Increase the potential investors' mental clarity."
        icon={Handshake}
      />
      <DetailItem
        title="Secure Equity Funding"
        description="Essential for technologists to present their vision in a way that makes business sense to close funding rounds. It acts as a primary marketing strategy for the company."
        icon={DollarSign}
      />
      <DetailItem
        title="Build the Roadmap"
        description="Serves as an internal memo for the founding team to set benchmarks, track progress, and adjust the business goal to particular customers and investors."
        icon={Briefcase}
      />
    </div>
  </section>
);

const PitchContainContent = () => (
  <section id="pitch-contain-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">What Does a Business Pitch Contain?</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      A powerful pitch deck follows a standard narrative arc, guiding the investor from the problem to your solution, and finally to the massive potential of your business and team.
    </p>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {pitchDeckContent.map((item, i) => (
        <div key={i} className="p-5 bg-white rounded-lg shadow-sm border border-gray-200">
          <item.icon className="w-6 h-6 text-amber-500 mb-2" />
          <h4 className="font-bold text-lg text-gray-800 mb-1">{item.title}</h4>
          <p className="text-sm text-gray-600">{item.description}</p>
        </div>
      ))}
    </div>
  </section>
);

const PitchProcessContent = () => (
  <section id="pitch-process-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Investment Pitch Deck Building Process</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Our process is structured to deliver an **investor-ready pitch deck** efficiently, combining deep business analysis with professional visual presentation.
    </p>

    <ol className="space-y-5 list-none border-l-2 border-[#022B50] pl-4 mb-12">
      {serviceProcessSteps.map((step, i) => (
        <li key={i} className="flex items-start gap-4">
          <div className="bg-[#022B50] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
            {step.days.split(' ')[0]}
          </div>
          <div>
            <span className="text-gray-800 font-bold text-lg block mb-1">{step.days}</span>
            <span className="text-gray-700 text-md">{step.detail}</span>
          </div>
        </li>
      ))}
    </ol>

    <h4 className="text-2xl font-bold text-gray-800 mb-6">What Paperwork Is Necessary for an Investors Deck?</h4>
    <div className="space-y-3 text-gray-700 max-w-4xl">
      {pitchDocuments.map((doc, i) => (
        <li key={i} className="flex items-start gap-2 list-none">
          <FileText className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
          <span>**{doc.split('–')[0].trim()}** – {doc.split('–')[1].trim()}</span>
        </li>
      ))}
    </div>
  </section>
);

const PitchServicesContent = () => (
    <section id="pitch-services-content" className="py-12 scroll-mt-24">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Our Services</h3>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl">
            Creating a compelling investor pitch deck is crucial for startups seeking funding, and our service at Vakilsearch is designed to assist you in this process. Our experts will guide you through the key areas below:
        </p>

        <div className="space-y-5 mb-10">
            {vakilsearchServices.map((service, i) => {
                const [title, description] = service.split('–').map(s => s.trim());
                const Icon = i === 0 ? FileText : i === 1 ? Users : Handshake;
                return (
                    <div key={i} className="p-5 bg-blue-50 rounded-xl shadow-sm border border-blue-200">
                        <div className="flex items-center gap-3 mb-2">
                            <Icon className="w-6 h-6 text-[#022B50] flex-shrink-0" />
                            <h4 className="font-bold text-xl text-gray-800">{title}</h4>
                        </div>
                        <p className="text-sm text-gray-600">{description}</p>
                    </div>
                );
            })}
        </div>

        <h4 className="text-2xl font-bold text-gray-800 mb-6">Attract Investors, Secure Funding, and Grow Your Startup</h4>
        <ol className="space-y-5 list-none border-l-2 border-gray-400 pl-4">
            {deckCreationSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                    <div className="bg-gray-700 text-white w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {i + 1}
                    </div>
                    <span className="text-gray-700 text-md">{step}</span>
                </li>
            ))}
        </ol>
    </section>
);

const PitchWhyVakilsearch = () => (
  <section id="pitch-why-vakilsearch" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Why Vakilsearch for Your Investment Pitch Deck?</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      We go beyond just design. We ensure your pitch deck is **strategically sound, financially viable, and legally compliant**, setting you on the path to investment success.
    </p>

    <div className="grid sm:grid-cols-2 gap-6">
      {whyVakilsearch.map((reason, i) => {
        const [title, description] = reason.split(':').map(s => s.trim());
        const Icon = i % 4 === 0 ? CheckCircle : i % 4 === 1 ? Scale : i % 4 === 2 ? Users : TrendingUp;
        return (
          <div key={i} className="p-5 bg-indigo-50 rounded-xl shadow-sm border border-indigo-200 flex items-start gap-3">
            <Icon className="w-6 h-6 text-[#022B50] mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-lg text-gray-800 mb-1">{title}</h4>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
        );
      })}
    </div>
  </section>
);

const PitchFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => (
  <section id="pitch-faqs-content" className="py-12 max-w-5xl mx-auto scroll-mt-24">
    <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">FAQs on Investment Pitch Deck</h3>

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
export default function PitchDeck() {
  const [activeTab, setActiveTab] = useState(pitchDeckTabs[0].id);
  const [faqOpen, setFaqOpen] = useState(null);

  const SCROLL_OFFSET = 120;

  // --- SCROLLSPY IMPLEMENTATION ---
  useEffect(() => {
    const sectionIds = pitchDeckTabs.map(tab => tab.id);

    const handleScroll = () => {
      let currentActiveTab = sectionIds[0];

      for (let i = 0; i < sectionIds.length; i++) {
        const sectionId = sectionIds[i];
        const section = document.getElementById(sectionId);

        if (section) {
          const rect = section.getBoundingClientRect();
          // Logic to check if the section's top edge is above or at the SCROLL_OFFSET line
          if (rect.top <= SCROLL_OFFSET) {
            currentActiveTab = sectionId;
          }
        }
      }

      // Check if the currentActiveTab is the last section and if we're scrolled to the bottom
      const isScrolledToBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 5; // -5 for tolerance
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
      {/* === HERO SECTION (Pitch Deck Specific) === */}
      <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">
          {/* Background Image Section */}
          <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
            <img
              src={BackgroundImageSrc}
              alt="Investment Pitch Deck background"
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
                Investment Pitch Deck for Business
              </h1>

              {/* Description / Bullet Points */}
              <div className="space-y-3 mb-8 text-sm lg:text-base text-gray-800">
                <p className="flex items-start gap-3">
                  <span className="w-3 h-3 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  Get a compelling pitch deck backed by expert market research and clear insights.
                </p>
                <p className="flex items-start gap-3">
                  <span className="w-3 h-3 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  First draft delivered in under **20 days** with clear, investor-ready content.
                </p>
                <p className="flex items-start gap-3">
                  <span className="w-3 h-3 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  Includes 2 free revision rounds to align perfectly with your business goals.
                </p>
              </div>

              {/* Optional Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                {/* Removed video button as it doesn't fit the new content */}
              </div>

              {/* Review Boxes */}
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
                {/* Offer Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Investment Pitch Deck</h2>
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


      {/* === Main Content Tabs Navigation (Sticky) === */}
      <section className="py-4 md:py-6 px-4 md:px-8 bg-white border-b border-gray-200 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center bg-white rounded-xl w-full text-xs md:text-sm lg:text-base overflow-x-auto border border-gray-200">
            {pitchDeckTabs.map((tab) => (
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
          <PitchOverviewContent />
          <PitchAdvantagesContent />
          <PitchContainContent />
          <PitchProcessContent />
          <PitchServicesContent />
          <PitchWhyVakilsearch />
          <PitchFAQsContent faqs={pitchDeckFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
        </div>
      </div>

    </div>
  );
}