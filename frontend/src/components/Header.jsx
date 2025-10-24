import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// Assuming cn is a utility function for Tailwind CSS class merging
import { cn } from "@/lib/utils";
import {
  // Assuming these custom components are imported from the local project file structure
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Menu,
  X,
  FileText,
  Clipboard,
  Briefcase,
  Shield,
  BarChart,
  Globe,
  Award,
  Heart,
  BookOpen,
  DollarSign,
  User,
} from "lucide-react";


/* --------------------------------------------------------------------------
   I. Main Header Component
---------------------------------------------------------------------------*/
export default function Header({ user, logout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* ====== Top Header ====== */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm">
        <div className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl md:px-8">
          <Link
            to="/"
            className="text-xl md:text-2xl font-bold text-gray-900 hover:text-[#003366] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            <span className="text-[#003366]">C</span>alzone{" "}
            <span className="text-[#003366]">F</span>inancial{" "}
            <span className="text-[#003366]">S</span>ervices
          </Link>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-8 lg:flex">
            <HeaderNav currentPath={location.pathname} />
          </div>

          {/* Right Auth Buttons (Desktop) */}
          <div className="items-center hidden space-x-4 lg:flex">
            {user ? (
              <>
                <Link to="/account" className="flex items-center space-x-2 text-[#003366] font-medium hover:text-[#001f3e] transition-colors">
                  <User className="w-5 h-5" />
                  <span className="hidden md:inline">{user?.name || user?.email}</span>
                </Link>
                <button onClick={logout} className="text-[#003366] font-medium hover:text-[#001f3e] transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-[#003366] font-medium hover:text-[#001f3e] transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="bg-[#003366] text-white px-4 py-2 rounded-md hover:bg-[#001f3e] transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-gray-700 lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-white p-6 transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto",
          menuOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ pointerEvents: menuOpen ? "auto" : "none" }}
        aria-hidden={!menuOpen}
      >
        <HeaderNav currentPath={location.pathname} setMenuOpen={setMenuOpen} />

        <div className="pt-6 mt-6 border-t">
          {user ? (
            <>
              <Link to="/account" onClick={() => setMenuOpen(false)} className="block w-full text-center bg-white text-[#003366] border border-gray-200 py-2 rounded-md hover:bg-gray-50 transition-colors">
                My Account
              </Link>
              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                className="mt-3 w-full bg-[#003366] text-white py-2 rounded-md hover:bg-[#001f3e] transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block w-full text-center bg-[#003366] text-white py-2 rounded-md hover:bg-[#001f3e] transition-colors">
                Login
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="block w-full text-center mt-3 bg_gray-100 text-[#003366] py-2 rounded-md hover:bg-gray-200 transition-colors">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

/* --------------------------------------------------------------------------
   II. Navigation Section
---------------------------------------------------------------------------*/
function HeaderNav({ currentPath, setMenuOpen }) {
  const handleLinkClick = () => setMenuOpen && setMenuOpen(false);

  // Define icons object
  const icons = {
    FileText: <FileText className="w-4 h-4 mr-2" />,
    Clipboard: <Clipboard className="w-4 h-4 mr-2" />,
    Briefcase: <Briefcase className="w-4 h-4 mr-2" />,
    Shield: <Shield className="w-4 h-4 mr-2" />,
    BarChart: <BarChart className="w-4 h-4 mr-2" />,
    Globe: <Globe className="w-4 h-4 mr-2" />,
    Award: <Award className="w-4 h-4 mr-2" />,
    Heart: <Heart className="w-4 h-4 mr-2" />,
    BookOpen: <BookOpen className="w-4 h-4 mr-2" />,
    DollarSign: <DollarSign className="w-4 h-4 mr-2" />,
  };

  return (
    <NavigationMenu orientation="vertical" className="w-full lg:orientation-horizontal">
      <NavigationMenuList className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-6">

        {/* ===================== Consult an Expert ===================== */}
        <NavItem
          title="Consult an Expert"
          menuWidth="lg:w-[280px]"
          links={[
            ["Talk to a Lawyer", "/ConsultanExpert/talkToLawyer", "FileText"],
            ["Talk to a Chartered Accountant", "/ConsultanExpert/talkToCA", "Clipboard"],
            ["Talk to a Company Secretary", "/ConsultanExpert/talkToCS", "Briefcase"],
            ["Talk to an IP/Trademark Lawyer", "/ConsultanExpert/talkToIP", "Shield"],
          ]}
          currentPath={currentPath}
          icons={icons}
          handleLinkClick={handleLinkClick}
        />

        {/* ===================== Business Setup (Wide Menu, force-centered) ===================== */}
        <NavItem
          title="Business Setup"
          menuWidth="lg:w-[900px]"
          gridCols="lg:grid-cols-3"
          linksGroups={[
            {
              title: "Company Registration",
              links: [
                ["Private Limited Company", "/BusinessSetup/plc", "Briefcase"], ["Limited Liability Partnership", "/BusinessSetup/llp", "Briefcase"],
                ["One Person Company", "/BusinessSetup/opc", "Briefcase"], ["Sole Proprietorship", "/BusinessSetup/sp", "Briefcase"],
                ["Nidhi Company", "/BusinessSetup/nidhi", "Briefcase"], ["Producer Company", "/BusinessSetup/producer", "Briefcase"],
                ["Partnership Firm", "/BusinessSetup/partnership", "Briefcase"], ["Startup India Registration", "/BusinessSetup/startup", "BarChart"],
              ],
            },
            {
              title: "International Business Setup",
              links: [
                ["US Incorporation", "/International/us", "Globe"], ["Singapore Incorporation", "/International/singapore", "Globe"],
                ["UK Incorporation", "/International/uk", "Globe"], ["Netherlands Incorporation", "/International/netherlands", "Globe"],
                ["Hong Kong Company", "/International/hong-kong", "Globe"], ["Dubai Company", "/International/dubai", "Globe"],
                ["International TM Registration", "/International/international-trademark", "Shield"],
              ],
            },
            {
              title: "Licenses & Registrations",
              links: [
                ["Digital Signature Certificate", "/Licenses/dsc", "Award"],
                ["Udyam Registration", "/Licenses/udyam", "Award"],
                ["MSME Registration", "/Licenses/msme", "Award"],
                ["ISO Certification", "/Licenses/iso", "Award"],
                ["FSSAI [Food License]", "/Licenses/fssai", "Heart"],
                ["IEC [Import/Export Code]", "/Licenses/iec", "Globe"],
                ["Apeda RCMC", "/Licenses/apeda-rcmc", "BookOpen"],
                ["Spice Board Registration", "/Licenses/spice-board", "BookOpen"],
                ["FIEO Registration", "/Licenses/fieo", "BookOpen"],
                ["Legal Metrology", "/Licenses/legal-metrology", "Clipboard"],
                ["Hallmark Registration", "/Licenses/hallmark", "Shield"],
                ["BIS Registration", "/Licenses/bis", "Shield"],
                ["Liquor License", "/Licenses/liquor", "Award"],
                ["CLRA Registration & Licensing", "/Licenses/clra", "Award"],
                ["AD Code Registration", "/Licenses/adcode", "Award"],
                ["IRDAI Registration", "/Licenses/irdai", "Award"],
                ["Drug & Cosmetic License", "/Licenses/drug-cosmetic", "Award"],
                ["Customs Clearance", "/Licenses/customs-clearance", "Award"],
              ],
            }

          ]}
          currentPath={currentPath}
          icons={icons}
          handleLinkClick={handleLinkClick}
          // The fixed center positioning for wide menus is now handled inside NavItem
          fixedWidth={900}
        />

        {/* ===================== Fundraising ===================== */}
        <NavItem
          title="Fundraising"
          menuWidth="lg:w-[260px]"
          links={[
            ["Fundraising", "/Fundraising", "DollarSign"], ["Pitch Deck", "/Fundraising/pitch-deck", "BarChart"],
            ["Business Loan", "/Fundraising/business-loan", "DollarSign"], ["DPR Service", "/Fundraising/dpr", "FileText"],
          ]}
          currentPath={currentPath}
          icons={icons}
          handleLinkClick={handleLinkClick}
        />

        {/* ===================== NGO (Menu on the far right) ===================== */}
        <NavItem
          title="NGO"
          menuWidth="lg:w-[700px]"
          gridCols="lg:grid-cols-2"
          linksGroups={[
            {
              title: "NGO Registration",
              links: [
                ["NGO", "/NGO", "Heart"], ["Section 8 Company", "/NGO/section-8", "Heart"],
                ["Trust Registration", "/NGO/trust", "Clipboard"], ["Society Registration", "/NGO/society", "Clipboard"],
              ],
            },
            {
              title: "NGO Compliance",
              links: [
                ["NGO Compliance", "/NGO/compliance", "FileText"],
                ["Section 8 Compliance", "/NGO/section8", "FileText"],
                ["CSR-1 Filing", "/NGO/csr1", "FileText"],
                ["Sec.80G & Sec.12A", "/NGO/80g-12a", "FileText"],
                ["Darpan Registration", "/NGO/darpan", "Award"],
                ["FCRA Registration", "/NGO/fcra", "Award"],
              ],
            },
          ]}
          currentPath={currentPath}
          icons={icons}
          handleLinkClick={handleLinkClick}
          fixedWidth={700} // Pass the expected desktop width
        />
      </NavigationMenuList>
    </NavigationMenu>
  );
}

/* --------------------------------------------------------------------------
   III. Dropdown Item Components (with Responsive Positioning)
---------------------------------------------------------------------------*/
function NavItem({
  title,
  icon,
  links,
  linksGroups,
  menuWidth = "lg:w-[300px]",
  gridCols = "lg:grid-cols-1",
  currentPath,
  icons,
  handleLinkClick,
  fixedWidth = 300, // Default expected desktop width in pixels
}) {
  const itemRef = useRef(null);
  // State to hold the dynamic positioning classes (lg:left-0 or lg:right-0)
  const [positionClass, setPositionClass] = useState("lg:left-0 lg:translate-x-0");

  // Hook to calculate position when the component mounts or the window resizes
  useEffect(() => {
    const handleResize = () => {
      // Only apply this logic on screens larger than 'lg' (1024px)
      if (window.innerWidth < 1024) {
        setPositionClass(""); // Reset positioning for mobile
        return;
      }

      if (itemRef.current) {
        const rect = itemRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const DROPDOWN_WIDTH = fixedWidth;
        const PADDING = 20; // Extra padding margin

        // Check if the dropdown overflows the right edge
        if (rect.left + DROPDOWN_WIDTH + PADDING > viewportWidth) {
          // It overflows, so pin it to the right edge of the *trigger*
          setPositionClass("lg:right-0 lg:left-auto");
        } else {
          // Fits normally, so pin it to the left edge of the *trigger*
          setPositionClass("lg:left-0 lg:right-auto");
        }
      }
    };

    // Run once on mount
    handleResize();

    // Listen for resize events
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [fixedWidth]);

  // Special handling for the centered "Business Setup" menu
  const isCentered = title === "Business Setup";
  const finalPositionClass = isCentered
    ? "lg:left-1/2 lg:-translate-x-1/2" // Fixed center positioning
    : positionClass; // Dynamic left/right positioning

  return (
    // Attach the ref to the list item
    <NavigationMenuItem ref={itemRef} className="w-full lg:w-auto lg:relative">
      <NavigationMenuTrigger className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-600 transition-colors rounded-md hover:bg-gray-100 hover:text-gray-900">
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          {title}
        </div>
      </NavigationMenuTrigger>

      <NavigationMenuContent className={cn(
        "p-4 bg-white border border-gray-100 shadow-lg rounded-md", // Base styles
        "lg:absolute lg:top-full lg:mt-2 lg:block", // Desktop absolute positioning
        "w-full h-auto mt-2", // Mobile/small screen styles
        menuWidth,
        gridCols,
        finalPositionClass // Dynamic (or fixed-center) positioning
      )}>
        {/* Single Links */}
        {links && (
          <MenuGroup title={title} links={links} currentPath={currentPath} icons={icons} handleLinkClick={handleLinkClick} />
        )}

        {/* Grouped Menus */}
        {linksGroups && (
          <div className={cn("grid w-full gap-6", gridCols)}>
            {linksGroups.map((group) => (
              <MenuGroup
                key={group.title}
                title={group.title}
                links={group.links}
                currentPath={currentPath}
                icons={icons}
                handleLinkClick={handleLinkClick}
              />
            ))}
          </div>
        )}
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

/* --------------------------------------------------------------------------
   IV. Menu Group (Sub-List) Component
---------------------------------------------------------------------------*/
function MenuGroup({
  title,
  links,
  currentPath,
  icons,
  handleLinkClick,
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-gray-900">{title}</p>
      <ul
        className="space-y-1 overflow-y-auto"
        // Limits height and enables vertical scrolling (as requested)
        style={{ maxHeight: "60vh" }}
      >
        {links.map(([label, href, iconName]) => (
          <li key={label}>
            <NavigationMenuLink asChild>
              <Link
                to={href}
                onClick={handleLinkClick} // Closes mobile menu
                className={cn(
                  "flex items-center rounded-md px-2 py-1 text-gray-600 text-sm transition-colors hover:bg-gray-100 hover:text-gray-900",
                  currentPath === href && "bg-gray-100 font-medium text-gray-900"
                )}
              >
                {/* Look up icon JSX using the string name */}
                {iconName && icons[iconName] && <span className="mr-2">{icons[iconName]}</span>}
                {label}
              </Link>
            </NavigationMenuLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
