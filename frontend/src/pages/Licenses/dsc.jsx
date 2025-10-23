import React, { useState, useEffect } from "react";
// axios is kept for convention, though not used in frontend logic
import axios from "axios";
import {
  ChevronDown,
  MapPin,
  Zap,
  Briefcase,
  ArrowRight,
  Users,
  Star,
  CheckCircle,
  FileText,
  Scale,
  Smartphone,
  Calculator,
  Download,
  Globe,
  DollarSign,
  Landmark,
  Clock,
  Key, // Icon for security/key management
  FileSignature, // Icon for signing
} from "lucide-react";
import { motion } from "framer-motion";
// Assume the path for your background image, updated for DSC context
import BackgroundImageSrc from '../../assets/business.png';


// --- DSC REGISTRATION STATIC DATA DEFINITIONS ---

const dscRegTabs = [
  { id: 'dsc-overview-content', label: 'Overview' },
  { id: 'dsc-benefits-content', label: 'Benefits' },
  { id: 'dsc-eligibility-content', label: 'Eligibility' },
  { id: 'dsc-documents-content', label: 'Documents' },
  { id: 'dsc-procedure-content', label: 'Procedure' },
  { id: 'dsc-fees-content', label: 'Fees' },
  { id: 'dsc-role-content', label: 'Role of CA' },
  { id: 'dsc-faqs-content', label: 'FAQs' },
];

const dscIntroBullets = [
  "Register your Class 3 Digital Signature Certificate online—fast and secure.",
  "Simple 3-step process with expert consultation and full registration support.",
  "Affordable, hassle-free, and fully online with complete documentation assistance.",
];

const dscBenefitsList = [
  { title: "Streamlining Processes", details: "Eliminates the need for physical signatures, speeding up workflows, approvals, and productivity.", icon: Zap },
  { title: "Enhancing Security", details: "Ensures signed documents cannot be altered, reducing the risk of fraud or tampering in business transactions.", icon: Key },
  { title: "Cost Savings", details: "Reduces printing, courier, and storage costs through the paperless nature of digital signatures.", icon: DollarSign },
  { title: "Legal Compliance", details: "Legally recognized under the IT Act 2000 for signing contracts, filing taxes (ITR, GST, ROC), and other regulatory needs.", icon: Scale },
  { title: "E-governance Applications", details: "Speeds up government services like tax returns, tender applications, and form signing, enhancing transparency.", icon: Landmark },
  { title: "Time Savings", details: "Allows for instant online transactions without the need to print, physically sign, and scan documents.", icon: Clock },
];

const dscClassesData = [
  {
    class: "Class 1 DSC",
    uses: "Personal use, email validation, low-risk transactions, basic document signing.",
    verification: "Verified against basic consumer databases.",
    security: "Basic Security",
  },
  {
    class: "Class 2 DSC",
    uses: "Organizational use, e-filing (ITR/ROC), company registration, audit reports, business operations.",
    verification: "Verified against trusted, pre-verified databases (moderate security).",
    security: "Medium Security",
  },
  {
    class: "Class 3 DSC",
    uses: "High-security transactions: e-tendering, e-procurement, high-value transactions, GST filings, physical verification.",
    verification: "Requires in-person/video identity verification with Registration Authority (RA).",
    security: "High Security",
  },
];

const dscEligibilitySections = [
  {
    title: "Eligibility Criteria for Individuals",
    content: "Individuals can apply for personal use or to fulfill legal/regulatory requirements like e-verification of returns. Professionals (doctors, lawyers, accountants) can use DSCs for compliance.",
    useCases: ["Personal digital transactions", "Signing e-forms", "Tax return filings"],
    icon: Users
  },
  {
    title: "Eligibility Criteria for Organizations",
    content: "Organizations (companies, firms, LLPs, NGOs, proprietorships) apply for DSCs. Directors, managers, secretaries, and authorized signatories must obtain one for official signing.",
    useCases: ["E-filing of ITR", "Regulatory compliance with SEBI", "ROC filings"],
    icon: Briefcase
  },
  {
    title: "Eligibility Criteria for Foreign Applicants",
    content: "Foreign nationals and entities conducting business in India can apply but must follow additional documentation requirements (passport, residency details) for verification.",
    useCases: ["Business transactions", "Compliance filings within Indian jurisdictions"],
    icon: Globe
  },
];

const dscDocumentsList = [
  {
    title: "1. Government-Issued ID (Identity Proof)",
    docs: ["Aadhaar Card (eKYC Service)", "Passport", "PAN Card", "Driving Licence"]
  },
  {
    title: "2. Address Proof",
    docs: ["Aadhaar Card", "Voter ID Card", "Driving Licence", "Telephone Bill", "Bank Account Passbook/Statement"]
  },
  {
    title: "3. Photograph & Other Docs",
    docs: ["Recent Passport-Sized Photograph", "Organization Registration Documents (for entities)", "Authorisation Letter (for signatories)"]
  },
];

const dscProcedureSteps = [
  "Step 1: Visit the Certifying Authority’s Website (CA) and select the appropriate DSC class (Class 1, 2, or 3).",
  "Step 2: Fill Out the Application Form, choosing the class and validity period (1 to 3 years), and enter personal/business details.",
  "Step 3: Upload Required Documents (ID proof, address proof, photo, and organizational docs if applicable).",
  "Step 4: Make Payment for the applicable fee based on the class and validity.",
  "Step 5: Identity Verification via physical or video-based verification process, depending on the CA's policy and DSC class.",
  "Step 6: Issuance of DSC by the Certifying Authority, delivered as a file or on a USB token.",
  "Step 7: Download and Install DSC onto your computer or the supplied USB token.",
];

const dscRenewalProcess = [
  "Step 1: Select the Type of DSC (Class and Validity) you require for renewal.",
  "Step 2: Pay for the renewal of the DSC.",
  "Step 3: Documentation Fillup and submit required identity proofs.",
  "Step 4: Mobile and Video Verification (mandatory for identity authentication).",
  "Step 5: Buy a New USB Token and attach it to your computer.",
  "Step 6: Installation and Download of the Renewed DSC onto the new USB token.",
];

const dscFeesData = [
  { class: "Class 1 DSC", usage: "Personal use, email validation, low-risk transactions", cost: "₹500 to ₹1,500", validity: "1 year" },
  { class: "Class 2 DSC", usage: "Business use, e-filing, company registration, ITR filing", cost: "₹1,000 to ₹2,000", validity: "1 to 2 years" },
  { class: "Class 3 DSC", usage: "High-security transactions (e-tendering, e-procurement, GST)", cost: "₹1,350 to ₹3,000", validity: "1 to 3 years" },
];

const caRoles = [
  "Verification of Identity: Verifies the applicant's identity through documentary or Aadhaar eKYC services.",
  "Issue of Certificates: Issues DSCs binding the verified identity to a unique public key for secure transactions.",
  "Revocation: Revokes the DSC if it is no longer valid, expired, or compromised.",
  "Security Compliance: Maintains a secure infrastructure according to industry standards for certificate trust.",
];

const dscFAQs = [
  { q: "What is a Digital Signature Certificate (DSC)?", a: "A DSC is the electronic equivalent of a physical signature, legally recognized under the IT Act 2000 to authenticate identity and ensure data integrity in electronic documents." },
  { q: "Who needs a Digital Signature Certificate?", a: "Directors, managers, and secretaries of companies, authorized signatories for e-filing (GST, ITR, ROC), and individuals for secure online transactions and tax filing." },
  { q: "How is the authenticity of a DSC ensured?", a: "It is ensured through Public Key Infrastructure (PKI), encryption, and the use of Certificate Revocation Lists (CRLs) maintained by Certifying Authorities (CAs)." },
  { q: "What types of documents can be signed using a DSC?", a: "Legal contracts, tax returns (ITR/GST), MCA forms (ROC filings), e-tendering bids, e-prescriptions, and general digital agreements." },
  { q: "How long does it take to obtain a DSC?", a: "The process can take anywhere from a few hours to a few days, depending on the DSC class and the speed of the identity verification process (eKYC vs. physical/video verification)." },
  { q: "Can a DSC be used for Income Tax e-filing?", a: "Yes, DSCs are widely used for Income Tax e-filing, enabling individuals and businesses to securely authenticate their tax returns electronically." },
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

const ProcessStep = ({ stepNumber, step }) => (
  <li className="flex items-start gap-4">
    <div className="bg-[#022B50] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
      {stepNumber}
    </div>
    <span className="text-gray-700 text-lg">{step}</span>
  </li>
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

const DSCClassesTable = ({ data }) => (
  <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200 mt-6">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-[#E6F0F6]">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Class</th>
          <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Common Applications</th>
          <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Verification Level</th>
          <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Security Level</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {data.map((row, i) => (
          <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
            <td className="px-6 py-4 whitespace-normal text-sm font-bold text-[#022B50]">{row.class}</td>
            <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">{row.uses}</td>
            <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">{row.verification}</td>
            <td className="px-6 py-4 whitespace-normal text-sm text-red-600">{row.security}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);


// --- TAB CONTENT COMPONENTS (DSC Content) ---

const DSCOverviewContent = () => (
  <section id="dsc-overview-content" className="py-12 scroll-mt-24">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Digital Signature Certificates (DSC) - An Overview</h2>
    <p className="text-lg text-gray-700 mb-4 max-w-4xl">
      A **Digital Signature Certificate (DSC)** is an electronic equivalent of a physical signature, legally recognized under the **Information Technology Act 2000**. It is used by individuals and businesses to securely authenticate their identity while signing electronic documents and conducting transactions online.
    </p>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Issued by a **Certifying Authority (CA)**, the DSC ensures **security, legal validity, and data integrity** in digital communications. Vakilsearch offers comprehensive assistance with document preparation, application submission, and compliance.
    </p>

    <h3 className="text-2xl font-bold mb-6 text-gray-800">Why are DSCs Important Today?</h3>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dscBenefitsList.slice(1, 6).map((item, i) => ( // Using slice(1, 6) for generic benefits
        <DetailItem
          key={i}
          title={item.title}
          description={item.details}
          icon={item.icon}
        />
      ))}
    </div>
  </section>
);

const DSCBenefitsContent = () => (
  <section id="dsc-benefits-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Benefits of Digital Signature Certificates (DSC) in India</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      DSCs provide a range of advantages across businesses, individuals, and government operations, enhancing security, efficiency, and legal validity in digital interactions.
    </p>

    <h4 className="text-2xl font-bold text-[#022B50] mb-4">Advantages for Businesses</h4>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {dscBenefitsList.slice(0, 5).map((item, i) => (
        <DetailItem key={i} title={item.title} description={item.details} icon={FileSignature} />
      ))}
    </div>

    <h4 className="text-2xl font-bold text-[#022B50] mb-4">Advantages for Government Transactions (E-governance)</h4>
    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
      <DetailItem title="E-governance Applications" description="DSCs speed up processes like filing tax returns, signing forms, and applying for tenders, making services faster and more transparent." icon={Landmark} />
      <DetailItem title="Improved Data Security" description="DSCs ensure digital documents are tamper-proof and secure, minimizing fraud for sensitive government transactions." icon={Key} />
    </div>
  </section>
);

const DSCEligibilityContent = () => (
  <section id="dsc-eligibility-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Who Is Eligible for DSC Registration in India?</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      DSCs can be issued to individuals, organizations, and foreign applicants, with eligibility depending on the purpose of use.
    </p>

    <div className="grid md:grid-cols-3 gap-8">
      {dscEligibilitySections.map((section, i) => (
        <div key={i}>
          <h4 className="text-2xl font-bold text-[#022B50] mb-4">{section.title}</h4>
          <p className="text-gray-700 text-sm mb-4">{section.content}</p>
          <h5 className="font-semibold text-gray-800 mb-2">Common Use Cases:</h5>
          <ul className="space-y-1 text-gray-600 list-disc ml-5">
            {section.useCases.map((useCase, idx) => (
              <li key={idx} className="text-sm">{useCase}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="mt-12 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
      <h4 className="font-semibold text-lg text-gray-800">Who Specifically Requires a DSC?</h4>
      <p className="text-sm text-gray-600 mt-1">Directors, managers, and secretaries of companies (public, private, and unlimited), authorized signatories for e-forms, and regulatory authorities for signing legal and compliance-related documents.</p>
    </div>
  </section>
);

const DSCTypesContent = () => (
  <section id="dsc-types-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Types of Digital Signature Certificates (DSC)</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      DSCs come in different classes, offering varying levels of security and verification, suitable for various applications from basic personal use to high-value e-procurement.
    </p>

    <DSCClassesTable data={dscClassesData} />
  </section>
);

const DSCDocumentsContent = () => (
  <section id="dsc-documents-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Documents Required for Digital Signature Registration</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Certain documents are required for identity verification, though the list may vary slightly depending on whether the applicant is an individual, organization, or foreign entity.
    </p>

    <div className="grid md:grid-cols-3 gap-8">
      {dscDocumentsList.map((category, i) => (
        <div key={i}>
          <h4 className="text-2xl font-bold text-[#022B50] mb-4">{category.title}</h4>
          <ul className="space-y-3 text-gray-700">
            {category.docs.map((doc, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <FileText className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="mt-10 p-4 bg-indigo-50 border-l-4 border-indigo-500 rounded">
      <h4 className="font-semibold text-lg text-gray-800">For Organizational Documents (Renewal/New):</h4>
      <ul className="text-sm text-gray-600 mt-1 list-disc ml-5">
        <li>Document Proof of organization registration (GST certificate, Shop Act License, MSME registration, etc.)</li>
        <li>Identity proof of authorized signatory and Authorization Letter.</li>
      </ul>
    </div>
  </section>
);

const DSCProcedureContent = () => (
  <section id="dsc-procedure-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">How to Apply for a Digital Signature Certificate (7 Steps)</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Applying for a DSC in India is a straightforward process managed by licensed Certifying Authorities (CAs). Vakilsearch can assist with every step for a hassle-free experience.
    </p>

    <ol className="space-y-5 list-none border-l-2 border-[#022B50] pl-4">
      {dscProcedureSteps.map((step, i) => (
        <ProcessStep key={i} stepNumber={i + 1} step={step} />
      ))}
    </ol>

    <h4 className="text-2xl font-bold text-[#022B50] mb-4 mt-12">DSC Renewal Process (6 Steps)</h4>
    <ol className="space-y-5 list-none border-l-2 border-yellow-500 pl-4">
      {dscRenewalProcess.map((step, i) => (
        <ProcessStep key={i} stepNumber={i + 1} step={step} />
      ))}
    </ol>
    <p className="mt-8 text-lg font-bold text-gray-700 max-w-4xl">
      **Time and Action:** Start the renewal request **within 7 days of the expiry date**. The online verification process and DSC download usually take **10-20 minutes**.
    </p>
  </section>
);

const DSCFeesContent = () => (
  <section id="dsc-fees-content" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-black">DSC Registration Fees and Renewal Charges</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      The cost varies depending on the class of certificate chosen and the validity term (1, 2, or 3 years).
    </p>

    {/* Initial Registration Fees */}
    <h4 className="text-2xl font-bold text-[#022B50] mb-4">Initial Registration Fees (Approximate)</h4>
    <div className="overflow-x-auto bg-gray-50 p-6 rounded-xl border border-gray-200 mb-10">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-[#E6F0F6]">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Class of DSC</th>
            <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Usage</th>
            <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Cost (₹)</th>
            <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase">Validity Period</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {dscFeesData.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="px-4 py-3 text-sm font-bold text-[#022B50]">{row.class}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{row.usage}</td>
              <td className="px-4 py-3 text-sm text-red-700 font-bold">{row.cost}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{row.validity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-xs italic text-gray-600">
        Note: Additional costs include USB Token (₹500–₹1,000) and 18% GST.
      </p>
    </div>

    {/* Renewal Charges */}
    <h4 className="text-2xl font-bold text-[#022B50] mb-4">Class 3 DSC Renewal Charges (Examples)</h4>
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
      <p className="text-sm font-bold text-gray-800 mb-2">Class 3 Renewal Charges (Inclusive of 18% GST):</p>
      <ul className="list-disc ml-6 text-sm text-gray-600 space-y-1">
        <li>1 Year Validity: <strong>₹1,500</strong></li>
        <li>2 Years Validity: <strong>₹2,400</strong></li>
        <li>3 Years Validity: <strong>₹3,400</strong></li>
      </ul>
      <p className="mt-4 text-sm italic text-red-600">
        Note: Prices vary if you hire an expert for DSC renewal.
      </p>
    </div>
  </section>
);
const DSCRoleContent = () => (
  <section className="py-12 max-w-5xl mx-auto scroll-mt-24">
    <h2 className="text-3xl font-bold mb-6 text-black text-center">
      Security Aspects of DSC
    </h2>
    <p className="text-gray-700 mb-8 text-base">
      DSCs are very important to secure online transactions and verify identity and data integrity in the digital world. Many advanced systems and protocols come into play to provide better security for certificates. Some major key security aspects involved in securing DSCs have been mentioned below.
    </p>

    {/* Public Key Infrastructure (PKI) */}
    <div className="mb-6">
      <h3 className="text-2xl font-semibold mb-2 text-black">Public Key Infrastructure (PKI)</h3>
      <p className="text-gray-700 mb-2">
        Public Key Infrastructure (PKI) provides infrastructure for digital signatures, which enables secure exchange of data with the help of encryption and identity verification. PKI is made of hardware, software, policies and procedures that are required to create, store, distribute and revoke digital certificates and public keys. In the PKI system, it creates a pair of unique keys, public and private key. The public key will be shared with others, but the private key is kept secret with the certificate holder.
      </p>
      <p className="text-gray-700">
        PKI is integrated into web browsers, which enables safe internet traffic besides ensuring that sensitive information shared online is protected. For DSCs, PKI makes only authenticated entities access to or verification of data added to a critical layer of security surrounding digital transactions and shields users from unauthorized access.
      </p>
    </div>

    {/* Encryption and Decryption */}
    <div className="mb-6">
      <h3 className="text-2xl font-semibold mb-2 text-black">Encryption and Decryption</h3>
      <p className="text-gray-700 mb-2">
        Encryption and decryption form an important sector of data security online. Encryption is a process in which, using 'ciphertext', data in readable format is transformed to unreadable forms. These are accessible only to those who possess corresponding decryption keys. Through this mechanism, intercepted data remains inaccessible to unauthorized persons.
      </p>
      <p className="text-gray-700">
        DSCs employ encryption to authenticate the identity of the sender user and check for integrity of the message. When a DSC is used for signing, encryption binds the information with the public key of the certificate holder and thus keeps it safe. The recipient uses the sender's public key to decrypt and verify the signature ensuring that information is authentic and hasn't been altered.
      </p>
    </div>

    {/* Hardware Security Modules (HSM) */}
    <div className="mb-6">
      <h3 className="text-2xl font-semibold mb-2 text-black">Hardware Security Modules (HSM)</h3>
      <p className="text-gray-700 mb-2">
        A hardware security module, or HSM, is the physical container for keys where sensitive cryptographic keys used in DSCs are kept robustly secure. These devices are resistant to tampering and handle key management, generation, and storage, providing added protection.
      </p>
      <p className="text-gray-700">
        HSMs support secure key management since private keys are always held in an environment inaccessible to an external threat. CAs widely use HSMs to shield private keys used to generate DSCs, bolstering trust in digital signatures for critical online transactions.
      </p>
    </div>

    {/* Certificate Revocation List (CRL) */}
    <div className="mb-6">
      <h3 className="text-2xl font-semibold mb-2 text-black">Certificate Revocation List (CRL)</h3>
      <p className="text-gray-700 mb-2">
        A certificate revocation list is a database maintained by Certifying Authorities on DSCs that are expired or compromised. When DSCs are revoked due to security breaches, expired keys, or compromised credentials, they are added to the CRL to prevent misuse.
      </p>
      <p className="text-gray-700">
        Users can check if a DSC exists in the CRL before transacting, ensuring they are not dealing with fraudulent certificates. Regular updates and cross-checks with the CRL maintain a safe online environment.
      </p>
    </div>
  </section>
);


const DSCWhyVakilsearch = () => (
  <section id="dsc-why-vakilsearch" className="py-12 scroll-mt-24">
    <h3 className="text-3xl font-bold mb-6 text-gray-800">Why Vakilsearch for Digital Signature Certificate Registration?</h3>
    <p className="text-lg text-gray-700 mb-8 max-w-4xl">
      Vakilsearch offers expert-assisted, end-to-end support for DSC registration and renewal, ensuring a fast, secure, and legally compliant process across all classes.
    </p>

    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      <div className="p-5 bg-indigo-50 rounded-xl shadow-sm border border-indigo-200">
        <h4 className="font-bold text-xl text-gray-800 mb-2">Complete Documentation Assistance</h4>
        <p className="text-sm text-gray-600">We guide you through document preparation, notarization (if required), and hassle-free submission, reducing delays and errors.</p>
      </div>
      <div className="p-5 bg-indigo-50 rounded-xl shadow-sm border border-indigo-200">
        <h4 className="font-bold text-xl text-gray-800 mb-2">Fast and Secure Video Verification</h4>
        <p className="text-sm text-gray-600">We streamline the mandatory video/physical verification step for quick turnaround and DSC issuance.</p>
      </div>
      <div className="p-5 bg-indigo-50 rounded-xl shadow-sm border border-indigo-200">
        <h4 className="font-bold text-xl text-gray-800 mb-2">Support for All DSC Classes</h4>
        <p className="text-sm text-gray-600">Whether you need Class 2 for ITR filing or Class 3 for e-tendering, we ensure compliance with the specific requirements of the Certifying Authorities.</p>
      </div>
      <div className="p-5 bg-indigo-50 rounded-xl shadow-sm border border-indigo-200">
        <h4 className="font-bold text-xl text-gray-800 mb-2">Hassle-Free Renewal Service</h4>
        <p className="text-sm text-gray-600">Get timely reminders and expert-assisted renewal, ensuring your digital identity remains active without interruption.</p>
      </div>
    </div>
  </section>
);

const DSCFAQsContent = ({ faqs, faqOpen, setFaqOpen }) => {
  return (
    <section id="dsc-faqs-content" className="py-12 max-w-5xl mx-auto scroll-mt-24">
      <h3 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        FAQs on Digital Signature Certificate (DSC) Registration
      </h3>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = faqOpen === index;
          return (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              {/* Question Button */}
              <button
                className={`w-full flex justify-between items-center p-5 text-left transition-colors duration-300 ${isOpen ? "bg-[#E6F0F6] text-[#022B50]" : "bg-white hover:bg-gray-50 text-black"
                  }`}
                onClick={() => setFaqOpen(isOpen ? null : index)}
              >
                <span className="font-semibold text-lg">{faq.q}</span>
                <ChevronDown
                  className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#022B50]" : "text-gray-500"
                    }`}
                />
              </button>

              {/* Answer Panel */}
              <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: "hidden" }}
              >
                <p className="px-5 py-4 text-gray-700 bg-white">{faq.a}</p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};


// --- MAIN COMPONENT ---
export default function DSCRegistration() {
  const [activeTab, setActiveTab] = useState(dscRegTabs[0].id);
  const [faqOpen, setFaqOpen] = useState(null);

  // Offset to account for the sticky header height when calculating scroll position
  const SCROLL_OFFSET = 120;

  // --- SCROLLSPY IMPLEMENTATION ---
  useEffect(() => {
    const sectionIds = dscRegTabs.map(tab => tab.id);

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
      {/* === HERO SECTION (DSC Registration Specific) === */}
      <section className="relative w-full overflow-hidden min-h-[650px] bg-[#E6F0F6]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative pt-12">

          {/* Background Image Section */}
          <div className="absolute top-0 left-0 w-full h-[600px] rounded-[24px] overflow-hidden">
            <img
              src={BackgroundImageSrc}
              alt="Digital Signature Certificate background"
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
                <span className="font-semibold text-black">Register Your Digital Signature Certificate (DSC)</span>
              </nav>

              {/* Badge */}
              <div className="inline-flex bg-[#FFD700] text-black px-4 py-1 rounded-lg font-semibold text-xs md:text-sm mb-3 items-center gap-2">
                <img
                  src="/badge-icon.png"
                  alt="badge"
                  className="w-4 h-4 object-contain"
                />
                #1 Legal Service Provider In India
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-black">
                Register Your Digital Signature Certificate (DSC)
              </h1>

              {/* Bullet Points with Blue Tick */}
              <div className="space-y-4 mb-8 text-sm lg:text-base text-black">
                {dscIntroBullets.map((text, i) => (
                  <p key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                    {text}
                  </p>
                ))}
              </div>
              <p className="text-sm font-semibold text-gray-700">How to Apply for DSC</p>

            </div>

            {/* Right Column - Form */}
            <div className="w-full lg:w-[350px] relative z-30 lg:mt-0 lg:ml-auto mt-[-100px] sm:mt-[-50px]">
              <div
                className="w-full p-6 md:p-8 rounded-2xl shadow-xl bg-white"
                style={{ borderRadius: '24px', border: '1px solid #E0E0E0' }}
              >
                <h2 className="text-xl font-semibold mb-6 text-black text-center">Get Started !</h2>

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
                    placeholder="City/Pincode"
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
                    Talk to Registration Expert
                  </button>

                  {/* EMI Note */}
                  <p className="text-xs text-black text-center mt-3">
                    Easy monthly EMI options available
                  </p>

                  {/* Confidentiality Note */}
                  <p className="text-[11px] text-black text-center mt-1 italic">
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
            {dscRegTabs.map((tab) => (
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
          <DSCOverviewContent />
          <DSCBenefitsContent />
          <DSCTypesContent />
          <DSCEligibilityContent />
          <DSCDocumentsContent />
          <DSCProcedureContent />
          <DSCFeesContent />
          <DSCRoleContent />
          <DSCFAQsContent faqs={dscFAQs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
        </div>
      </div>

    </div>
  );
}