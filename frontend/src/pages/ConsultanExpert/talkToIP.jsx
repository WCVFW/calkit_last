import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    ChevronDown,
    MapPin,
    Briefcase,
    Star,
    ArrowRight,
    Users,
    Zap,
    Filter,
    X,
    ChevronLeft,
    ChevronRight,
    MessageSquare,
    PhoneCall,
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- STATIC DATA DEFINITIONS ---

const LAWYERS_DATA = [
    { name: "Aakash Verma", exp: 3, location: "Delhi", practice: "Intellectual Property + 6 more", phone: "+91 7657****91" },
    { name: "Venkat Rao", exp: 8, location: "Hyderabad", practice: "Intellectual Property + 6 more", phone: "+91 9659****91" },
    { name: "Madhav Shankar", exp: 9, location: "Jaipur", practice: "Intellectual Property + 3 more", phone: "+91 9695****93" },
    { name: "Adv Raymond Gadkar", exp: 8, location: "Mumbai", practice: "Intellectual Property + 5 more", phone: "+91 8626****89" },
    { name: "Gagan Oberoi", exp: 18, location: "Chandigarh, Delhi, Gurgaon, Ludhiana", practice: "Intellectual Property + 6 more", phone: "+91 7637****89" },
    // Add more dummy data for pagination
    { name: "Priya Singh", exp: 5, location: "Bangalore", practice: "Intellectual Property + 4 more", phone: "+91 9876****54" },
    { name: "Sanjay Reddy", exp: 12, location: "Chennai", practice: "Intellectual Property + 7 more", phone: "+91 8123****45" },
    { name: "Anita Kapoor", exp: 6, location: "Pune", practice: "Intellectual Property + 2 more", phone: "+91 7990****12" },
];

const REVIEWS_DATA = [
    { name: "Rajesh Kumar", text: "“I was involved in a contract breach dispute and wasn’t sure where to start. Vakilsearch’s legal team guided me through every step, they helped me send the legal notice ensuring a smooth resolution with an expert legal guidance.”" },
    { name: "Neha Verma", text: "“When faced with criminal charges, I was anxious and uncertain. Vakilsearch Lawyer’s crafted a solid defense that helped me avoid serious penalties and ultimately achieve a positive outcom”" },
    { name: "Anil Sharma", text: "“I was wrongfully terminated from my job. I hired an employment lawyer from Vakilsearch who was thorough and aggressive, ensuring I got the compensation and justice I deserved. If you want quick legal solution I recommend you to choose Vakilsearch”" },
    { name: "Priya Reddy", text: "“After falling victim to identity theft, I was overwhelmed. I consulted a cybercrime lawyer online at Vakilsearch. They provided clear guidelines and legal advice. I acted quickly, recovering my stolen information and holding the perpetrators accountable.”" },
    { name: "Suresh Pate", text: "“‘My landlord was trying to evict me unfairly. The property lawyer from Vakilsearch handled it with great expertise, securing my right to stay and preventing further disputes.’ It is highly recommended for quick legal resolution”" },
];

const FILTER_OPTIONS = {
    experience: ["1-5 years", "6-10 years", "11-15 years", "15+ years"],
    gender: ["Male", "Female"],
    propertyServices: ["Property Registration", "Property Documents Verification"],
    majorCities: ["Bangalore", "Chennai", "Mumbai", "Delhi", "Pune"],
};

// --- REUSABLE COMPONENTS ---

// Custom Header Component based on HTML structure
const AppHeader = () => (
    <header className="relative shadow-[0px_4px_17px_0px_#00000029] bg-white">
        <div className="flex items-center justify-between px-4 mx-auto md:px-7 max-w-7xl">
            <video
                autoPlay loop muted playsInline
                src="https://assets.vakilsearch.com/live-gif/BlackTransparent.webm"
                width="180" height="40" className="py-4"
            />
            <div className="flex items-center lg:gap-16">
                <nav className="relative justify-end hidden gap-8 lg:flex">
                    {["Find A Lawyer", "Free Legal Documents", "BNS Sections", "Legal Guides"].map((item) => (
                        <div key={item} className="relative flex items-center gap-1 py-4 cursor-pointer group">
                            <p className="text-[#171717] text-[16px] font-medium">{item}</p>
                            <ChevronDown className="w-4 h-4 text-[#171717] transition-transform group-hover:rotate-180" />
                        </div>
                    ))}
                </nav>
                <div className="hidden my-auto ml-8 lg:block">
                    <button className="px-4 py-2 border border-[#022B50] text-[#022B50] rounded-md text-sm font-medium hover:bg-[#022B50] hover:text-white transition-colors">
                        Sign Up
                    </button>
                </div>
            </div>
            {/* Mobile Menu Icon */}
            <div className="flex items-center gap-3 lg:hidden">
                <img
                    alt="account"
                    src="https://assets.vakilsearch.com/live-images/user-blue.svg"
                    className="w-7 h-7"
                />
                <div className="flex flex-col self-center gap-1 transition-all cursor-pointer">
                    <span className="block w-6 h-0.5 bg-[#022B50] rounded"></span>
                    <span className="block w-6 h-0.5 bg-[#022B50] rounded"></span>
                    <span className="block w-6 h-0.5 bg-[#022B50] rounded"></span>
                </div>
            </div>
        </div>
    </header>
);

const StatCard = ({ count, label }) => (
    <div className="p-3 text-center bg-white border border-gray-100 rounded-lg shadow-sm">
        <p className="text-2xl font-bold text-[#022B50]">{count}</p>
        <p className="mt-1 text-xs text-gray-500">{label}</p>
    </div>
);

const LawyerProfileCard = ({ lawyer }) => (
    <div className="flex flex-col p-4 space-y-3 transition bg-white border border-gray-200 shadow-md md:p-6 rounded-xl hover:shadow-lg">
        <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">{lawyer.name}</h3>
            <div className="px-3 py-1 text-sm font-semibold text-green-600 bg-green-100 rounded-full">
                Verified
            </div>
        </div>

        <div className='flex flex-wrap text-sm text-gray-600 gap-x-6 gap-y-1'>
            <p className="flex items-center gap-1">
                <Briefcase className="w-4 h-4 text-[#022B50]" />
                {lawyer.exp} years of Experience
            </p>
            <p className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-[#022B50]" />
                {lawyer.location}
            </p>
        </div>

        <p className="text-sm font-medium text-gray-700">
            Practice area & skills: <span className="font-semibold text-[#022B50]">{lawyer.practice.split('+')[0].trim()}</span> + {lawyer.practice.split('+')[1].trim()}
        </p>

        <div className="flex flex-col gap-3 pt-3 border-t sm:flex-row">
            <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-[#F0F5FF] text-[#022B50] text-sm font-semibold rounded-lg hover:bg-[#022B50]/10 transition">
                <PhoneCall className="w-4 h-4" />
                {lawyer.phone}
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-[#022B50] text-white text-sm font-semibold rounded-lg hover:bg-[#022B50]/90 transition">
                <MessageSquare className="w-4 h-4" />
                Connect Now
            </button>
        </div>
    </div>
);

const SidebarFilter = ({ title, options, isDropdown = false, onFilterChange, currentFilters }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = (option) => {
        onFilterChange(title.toLowerCase().replace(/\s/g, ''), option);
    };

    return (
        <div className="py-4 border-b">
            <button
                className="flex items-center justify-between w-full font-bold text-left text-gray-800"
                onClick={() => setIsOpen(!isOpen)}
            >
                {title}
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`mt-3 transition-all duration-300 ${isOpen ? 'h-auto opacity-100' : 'h-0 opacity-0 overflow-hidden'}`}>
                {options.map((option, i) => (
                    <div key={i} className="flex items-center py-1">
                        <input
                            type="checkbox"
                            id={`${title}-${option}`}
                            checked={currentFilters[title.toLowerCase().replace(/\s/g, '')]?.includes(option)}
                            onChange={() => handleToggle(option)}
                            className="w-4 h-4 text-[#022B50] bg-gray-100 border-gray-300 rounded focus:ring-[#022B50]"
                        />
                        <label htmlFor={`${title}-${option}`} className="ml-2 text-sm text-gray-700 cursor-pointer">
                            {option}
                        </label>
                    </div>
                ))}
            </div>
            {isDropdown && (
                <button className="text-sm text-[#022B50] font-semibold mt-2 hover:underline">
                    View more
                </button>
            )}
        </div>
    );
};

const ReviewCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = REVIEWS_DATA.length;

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

    // Auto-advance the carousel
    useEffect(() => {
        const interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full overflow-hidden">
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {REVIEWS_DATA.map((review, index) => (
                    <div key={index} className="flex-shrink-0 w-full p-4">
                        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-[#022B50]">
                            <p className="flex items-center mb-2 text-yellow-500">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-500" />)}
                            </p>
                            <h4 className="mb-3 font-bold text-gray-900">{review.name}</h4>
                            <p className="italic text-gray-600">
                                {review.text.replace(/“|”/g, '')}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute inset-y-0 left-0 flex items-center">
                <button onClick={prevSlide} className="p-2 ml-2 transition rounded-full bg-white/50 hover:bg-white">
                    <ChevronLeft className="w-5 h-5 text-gray-800" />
                </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
                <button onClick={nextSlide} className="p-2 mr-2 transition rounded-full bg-white/50 hover:bg-white">
                    <ChevronRight className="w-5 h-5 text-gray-800" />
                </button>
            </div>
        </div>
    );
};


// --- MAIN PAGE COMPONENT ---

export default function IPLawyerSearchPage() {
    // Form State (using the provided logic structure)
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [cityPincode, setCityPincode] = useState('');
    const [problemType, setProblemType] = useState('');
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const lawyersPerPage = 5;
    const totalLawyers = LAWYERS_DATA.length;
    const totalPages = Math.ceil(totalLawyers / lawyersPerPage);

    const [filters, setFilters] = useState({}); // Example: { experience: ["1-5 years"], gender: ["Male"] }

    const handleFilterChange = (filterKey, option) => {
        setFilters(prev => {
            const currentOptions = prev[filterKey] || [];
            if (currentOptions.includes(option)) {
                return { ...prev, [filterKey]: currentOptions.filter(o => o !== option) };
            } else {
                return { ...prev, [filterKey]: [...currentOptions, option] };
            }
        });
    };

    const clearAllFilters = () => {
        setFilters({});
    };

    const paginateLawyers = () => {
        const startIndex = (currentPage - 1) * lawyersPerPage;
        const endIndex = startIndex + lawyersPerPage;
        return LAWYERS_DATA.slice(startIndex, endIndex);
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    async function submit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            // Mock API call based on original intent
            // await axios.post('/api/ip_leads', { email, mobile, cityPincode, problemType });
            setMsg('Request submitted! An expert will contact you shortly.');
        } catch (err) {
            setMsg('Submission failed. Please try again.');
        }
        setLoading(false);
    }

    // --- RENDER ---
    return (
        <div className="min-h-screen bg-gray-50 font-[Arial]">
            <AppHeader />

            <main className="px-4 py-6 mx-auto max-w-7xl md:px-6 md:py-8">
                {/* Breadcrumbs */}
                <p className="mb-6 text-sm text-gray-500">
                    <a href="/" className="hover:underline">Home</a> &gt; <span className="font-semibold text-gray-700">Intellectual Property Lawyers</span>
                </p>

                {/* Hero Section and Form */}
                <section className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-[#171717] mb-3">
                            Experienced Intellectual Property Lawyers in India for Trusted Legal Help
                        </h1>
                        <p className="max-w-4xl mb-6 text-lg text-gray-600">
                            Talk to an **IP lawyer** to protect your creations and innovations, including trademarks, patents, copyrights, and trade secrets. We offer legal guidance on intellectual property protection, ensure your rights are upheld, and represent you in disputes over infringement. Whether you’re an artist, inventor, or business owner, IP Lawyers can help you navigate the complexities of protecting your intellectual assets.
                        </p>

                        {/* Stats Section */}
                        <div className="grid grid-cols-2 gap-3 mb-8 sm:grid-cols-4 lg:grid-cols-5">
                            <StatCard count="390+" label="Lawyers are online" />
                            <StatCard count="130+" label="Ongoing Calls" />
                            <StatCard count="5,00,000+" label="Happy User" />
                            <StatCard count="1,00,000+" label="Cases Resolved" />
                            <StatCard count="300+" label="Expert Lawyers" />
                        </div>
                    </div>

                    {/* Quick Connect Form */}
                    <div className="p-6 bg-white border border-gray-200 shadow-xl lg:col-span-1 rounded-xl">
                        <h2 className="mb-4 text-xl font-bold text-gray-800">
                            Facing a Legal Issue? Connect with an Expert Lawyer Now!
                        </h2>
                        <form className="space-y-4" onSubmit={submit}>
                            <input
                                required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="w-full border rounded-lg px-4 py-2 bg-gray-50 focus:border-[#022B50] focus:ring-1 focus:ring-[#022B50] outline-none text-sm"
                            />
                            <input
                                required type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)}
                                placeholder="Mobile Number"
                                className="w-full border rounded-lg px-4 py-2 bg-gray-50 focus:border-[#022B50] focus:ring-1 focus:ring-[#022B50] outline-none text-sm"
                            />
                            <input
                                required type="text" value={cityPincode} onChange={(e) => setCityPincode(e.target.value)}
                                placeholder="City/Pincode"
                                className="w-full border rounded-lg px-4 py-2 bg-gray-50 focus:border-[#022B50] focus:ring-1 focus:ring-[#022B50] outline-none text-sm"
                            />
                            <input
                                required type="text" value={problemType} onChange={(e) => setProblemType(e.target.value)}
                                placeholder="Problem Type"
                                className="w-full border rounded-lg px-4 py-2 bg-gray-50 focus:border-[#022B50] focus:ring-1 focus:ring-[#022B50] outline-none text-sm"
                            />
                            <p className="text-xs text-gray-500">By proceeding, you agree to our <a href="#" className="text-[#022B50] hover:underline font-medium">T&C*</a></p>

                            <button
                                type="submit"
                                className="w-full bg-[#022B50] text-white py-3 rounded-lg font-semibold hover:bg-[#022B50]/90 transition"
                                disabled={loading}
                            >
                                {loading ? 'Connecting...' : 'Connect with Lawyer'}
                            </button>
                        </form>
                        {msg && <p className="mt-4 font-medium text-center text-green-600">{msg}</p>}
                    </div>
                </section>

                {/* --- Lawyer Listings Section --- */}
                <section className="grid gap-8 mt-12 lg:grid-cols-3">
                    {/* Sidebar Filters */}
                    <div className="sticky p-6 bg-white border border-gray-200 shadow-lg lg:col-span-1 rounded-xl h-fit top-4">
                        <div className="flex items-center justify-between pb-4 mb-4 border-b">
                            <h3 className="flex items-center gap-2 text-xl font-bold text-gray-800">
                                <Filter className="w-5 h-5 text-[#022B50]" /> Filter
                            </h3>
                            <button onClick={clearAllFilters} className="text-sm font-medium text-red-600 hover:underline">
                                Clear all
                            </button>
                        </div>
                        <p className="mb-4 text-sm text-gray-600">Showing {totalLawyers} Intellectual Property Lawyers</p>

                        {/* Static Filter Inputs (Search) */}
                        <div className="mb-6 space-y-4">
                            <input type="text" placeholder="Enter City" className="w-full px-3 py-2 text-sm border rounded-lg" />
                            <input type="text" placeholder="Enter Language" className="w-full px-3 py-2 text-sm border rounded-lg" />
                        </div>

                        {/* Checkbox Filters */}
                        <SidebarFilter
                            title="Experience"
                            options={FILTER_OPTIONS.experience}
                            onFilterChange={handleFilterChange}
                            currentFilters={filters}
                        />
                        <SidebarFilter
                            title="Gender"
                            options={FILTER_OPTIONS.gender}
                            onFilterChange={handleFilterChange}
                            currentFilters={filters}
                        />
                        <SidebarFilter
                            title="Property Services"
                            options={FILTER_OPTIONS.propertyServices}
                            isDropdown={true}
                            onFilterChange={handleFilterChange}
                            currentFilters={filters}
                        />
                        <SidebarFilter
                            title="Major Cities"
                            options={FILTER_OPTIONS.majorCities}
                            isDropdown={true}
                            onFilterChange={handleFilterChange}
                            currentFilters={filters}
                        />
                        
                        <div className="mt-4 p-3 bg-[#E6F0F6] rounded-lg">
                            <p className="flex items-center justify-between text-sm font-semibold text-gray-800">
                                Intellectual Property Lawyers <X className="w-4 h-4 text-red-600 cursor-pointer" />
                            </p>
                        </div>
                    </div>

                    {/* Lawyer List */}
                    <div className="space-y-6 lg:col-span-2">
                        {paginateLawyers().map((lawyer, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <LawyerProfileCard lawyer={lawyer} />
                            </motion.div>
                        ))}

                        {/* Pagination */}
                        <div className="flex items-center justify-center pt-4 space-x-2">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className="p-2 text-gray-700 transition border rounded-lg disabled:opacity-50 hover:bg-gray-100"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`px-4 py-2 rounded-lg font-semibold ${currentPage === index + 1 ? 'bg-[#022B50] text-white' : 'bg-white text-gray-700 border hover:bg-gray-100'}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="p-2 text-gray-700 transition border rounded-lg disabled:opacity-50 hover:bg-gray-100"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* --- Cities & Specialization Links --- */}
                <section className="pt-6 mt-12 border-t border-gray-200">
                    <h2 className="mb-4 text-2xl font-bold text-gray-800">Intellectual Property Lawyers in Major Cities</h2>
                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {[
                            "Intellectual Property Lawyers in Delhi", "Intellectual Property Lawyers in Hyderabad", "Intellectual Property Lawyers in Jaipur",
                            "Intellectual Property Lawyers in Mumbai", "Intellectual Property Lawyers in Chandigarh", "Intellectual Property Lawyers in Gurgaon",
                            "Intellectual Property Lawyers in Ludhiana", "Intellectual Property Lawyers in Bangalore", "Intellectual Property Lawyers in Ahmedabad",
                            "Intellectual Property Lawyers in Chennai", "Intellectual Property Lawyers in Pune", "Intellectual Property Lawyers in Madurai"
                        ].map((city, i) => (
                            <a key={i} href="#" className="text-gray-600 hover:text-[#022B50] transition flex items-center gap-2">
                                {city} <ArrowRight className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                    <button className="text-[#022B50] font-semibold mt-4 flex items-center gap-1 hover:underline">
                        Show more <ChevronDown className="w-4 h-4" />
                    </button>
                </section>
                
                {/* --- Customer Reviews / Testimonials --- */}
                <section className="py-10 mt-12 bg-gray-100 rounded-xl">
                    <h2 className="mb-8 text-2xl font-bold text-center text-gray-800">
                        India's most loved legal services, since 2010
                    </h2>
                    <ReviewCarousel />
                    <p className="text-xl font-bold text-center text-[#022B50] mt-6">
                        500+ People Connect With Trusted Legal Experts Every Day
                    </p>
                </section>
            </main>

            {/* --- FOOTER --- */}
            <footer className="py-10 bg-white border-t border-gray-200">
                <div className="px-4 mx-auto max-w-7xl md:px-6">
                    <div className="grid grid-cols-2 gap-8 pb-10 border-b border-gray-100 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {/* Specialization Lawyers */}
                        <div>
                            <h4 className="mb-3 text-base font-bold text-gray-900">Specialization Lawyers</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                {["Civil Lawyers", "Criminal Lawyers", "Family Lawyers", "Corporate Lawyers", "Intellectual Property Lawyers"].map((link) => (
                                    <li key={link}><a href="#" className="hover:text-[#022B50]">{link}</a></li>
                                ))}
                            </ul>
                        </div>
                        
                        {/* Lawyers in India */}
                        <div>
                            <h4 className="mb-3 text-base font-bold text-gray-900">Lawyers in India</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                {["Lawyers in Chennai", "Lawyers in Bangalore", "Lawyers in Mumbai", "Lawyers in Delhi", "Lawyers in Gurgaon"].map((link) => (
                                    <li key={link}><a href="#" className="hover:text-[#022B50]">{link}</a></li>
                                ))}
                            </ul>
                        </div>

                        {/* Law Guide & Legal Documents */}
                        <div>
                            <h4 className="mb-3 text-base font-bold text-gray-900">Law Guide & Legal Documents</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                {["Free Legal Documents Generator", "BNS Sections", "Articles", "Law Videos"].map((link) => (
                                    <li key={link}><a href="#" className="hover:text-[#022B50]">{link}</a></li>
                                ))}
                            </ul>
                        </div>

                        {/* Company Info */}
                        <div>
                            <h4 className="mb-3 text-base font-bold text-gray-900">Company</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                {["About us", "Terms of Use", "Privacy Policy"].map((link) => (
                                    <li key={link}><a href="#" className="hover:text-[#022B50]">{link}</a></li>
                                ))}
                            </ul>
                            <div className="flex gap-3 mt-4">
                                {/* Social Media Icons Placeholder */}
                                <Users className="w-5 h-5 text-gray-400" />
                                <Zap className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>

                        {/* Satisfaction Section */}
                        <div className="lg:col-span-1">
                            <h4 className="mb-3 text-base font-bold text-gray-900">Our Guarantee</h4>
                            <p className="text-sm text-gray-600">
                                4350+ top legal experts. Connecting people with right legal expertise across 500 cities.
                            </p>
                            <p className="mt-3 text-sm font-bold text-gray-800">5,00,000 Satisfied Clients</p>
                        </div>
                    </div>

                    <div className="pt-6 space-y-2 text-xs text-gray-500">
                        <p>© 2024 - Uber9 Business Process Services Private Limited. All rights reserved.</p>
                        <p>
                            Please note that we are a facilitating platform enabling access to reliable professionals. We are not a law firm and do not provide legal services ourselves. The information on this website is for the purpose of knowledge only and should not be relied upon as legal advice or opinion.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}