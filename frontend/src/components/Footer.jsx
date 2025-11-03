import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function Footer({ className }) {
  return (
    <footer className={cn("bg-gray-900 text-white py-12", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-8">
          {/* First Column: Brand / Info */}
          <div>
            <Link
              to="/"
              className="flex items-center gap-3 font-bold text-xl text-white transition-colors duration-300 mb-4"
            >
              <span className="tracking-wide">
                <span className="text-[#DB3269]">C</span>alzone{" "}
                <span className="text-[#DB3269]">F</span>inancial{" "}
                <span className="text-[#DB3269]">S</span>ervice
              </span>
            </Link>
            <p className="text-sm text-gray-300">
              Legal service provider in India. Reliable and expert services
              for businesses and individuals.
            </p>
          </div>

          {/* Remaining Sections: Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Consult an Expert */}
            <FooterSection
              title="Consult an Expert"
              links={[
                ["Talk to a Lawyer", "/ConsultanExpert/talkToLawyer"],
                ["Talk to a Chartered Accountant", "/ConsultanExpert/talkToCA"],
                ["Talk to a Company Secretary", "/ConsultanExpert/talkToCS"],
                ["Talk to an IP/Trademark Lawyer", "/ConsultanExpert/talkToIP"],
              ]}
            />

            {/* Company Registration */}
            <FooterSection
              title="Company Registration"
              links={[
                ["Private Limited Company", "/BusinessSetup/plc"],
                ["Limited Liability Partnership", "/BusinessSetup/llp"],
                ["One Person Company", "/BusinessSetup/opc"],
                ["Sole Proprietorship", "/BusinessSetup/sp"],
                ["Nidhi Company", "/BusinessSetup/nidhi"],
                ["Producer Company", "/BusinessSetup/producer"],
                ["Partnership Firm", "/BusinessSetup/partnership"],
                ["Startup India Registration", "/BusinessSetup/startup"],
              ]}
            />

            {/* International Business Setup */}
            <FooterSection
              title="International Business Setup"
              links={[
                ["US Incorporation", "/International/us"],
                ["Singapore Incorporation", "/International/singapore"],
                ["UK Incorporation", "/International/uk"],
                ["Netherlands Incorporation", "/International/netherlands"],
                ["Hong Kong Company", "/International/hong-kong"],
                ["Dubai Company", "/International/dubai"],
                ["International TM Registration", "/International/international-trademark"],
              ]}
            />

            {/* Licenses & Registrations */}
            <FooterSection
              title="Licenses & Registrations"
              links={[
                ["Digital Signature Certificate", "/Licenses/dsc"],
                ["Udyam Registration", "/Licenses/udyam"],
                ["MSME Registration", "/Licenses/msme"],
                ["ISO Certification", "/Licenses/iso"],
                ["FSSAI (Food License)", "/Licenses/fssai"],
                ["Import/Export Code (IEC)", "/Licenses/iec"],
                ["Apeda RCMC", "/Licenses/apeda-rcmc"],
                ["Spice Board Registration", "/Licenses/spice-board"],
                ["FIEO Registration", "/Licenses/fieo"],
                ["Legal Metrology", "/Licenses/legal-metrology"],
                ["Hallmark Registration", "/Licenses/hallmark"],
                ["BIS Registration", "/Licenses/bis"],
                ["Liquor License", "/Licenses/liquor-license"],
                ["CLRA Registration & Licensing", "/Licenses/clra"],
                ["AD Code Registration", "/Licenses/ad-code"],
                ["IRDAI Registration", "/Licenses/irdai"],
                ["Drug & Cosmetic License", "/Licenses/drug-cosmetic"],
                ["Customs Clearance", "/Licenses/customs-clearance"],
              ]}
            />

            {/* Fundraising & NGO */}
            <FooterSection
              title="Fundraising & NGO"
              links={[
                ["Fundraising", "/Fundraising"],
                ["Pitch Deck", "/Fundraising/pitch-deck"],
                ["Business Loan", "/Fundraising/business-loan"],
                ["DPR Service", "/Fundraising/dpr"],
                ["NGO", "/NGO"],
                ["Section 8 Company", "/NGO/section-8"],
                ["Trust Registration", "/NGO/trust"],
                ["Society Registration", "/NGO/society"],
                ["NGO Compliance", "/NGO/compliance"],
                ["Section 8 Compliance", "/NGO/compliance-section-8"],
                ["CSR-1 Filing", "/NGO/csr1"],
                ["Sec.80G & Sec.12A", "/NGO/80g-12a"],
                ["Darpan Registration", "/NGO/darpan"],
                ["FCRA Registration", "/NGO/fcra"],
              ]}
            />
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Calzone Financial Service. All rights
        reserved.
      </div>
    </footer>
  );
}

/* FooterSection with Read More toggle */
function FooterSection({ title, links }) {
  const [showAll, setShowAll] = useState(false);
  const displayedLinks = showAll ? links : links.slice(0, 5);

  return (
    <div>
      <h4 className="mb-4 text-sm font-semibold text-white">{title}</h4>
      <ul className="space-y-2 text-sm text-gray-300">
        {displayedLinks.map(([label, href]) => (
          <li key={label}>
            <Link to={href} className="block hover:text-white transition-colors">
              {label}
            </Link>
          </li>
        ))}
      </ul>
      {links.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-1 text-xs text-[#DB3269] hover:underline"
        >
          {showAll ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}
