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
        <div className="flex justify-between items-center px-4 md:px-7 max-w-7xl mx-auto">
            <video
                autoPlay loop muted playsInline
                src="https://assets.vakilsearch.com/live-gif/zolvitBlackTransparent.webm"
                width="180" height="40" className="py-4"
            />
            <div className="flex items-center lg:gap-16">
                <nav className="hidden lg:flex gap-8 justify-end relative">
                    {["Find A Lawyer", "Free Legal Documents", "BNS Sections", "Legal Guides"].map((item) => (
                        <div key={item} className="relative flex gap-1 items-center py-4 cursor-pointer group">
                            <p className="text-[#171717] text-[16px] font-medium">{item}</p>
                            <ChevronDown className="w-4 h-4 text-[#171717] transition-transform group-hover:rotate-180" />
                        </div>
                    ))}
                </nav>
                <div className="hidden lg:block my-auto ml-8">
                    <button className="px-4 py-2 border border-[#022B50] text-[#022B50] rounded-md text-sm font-medium hover:bg-[#022B50] hover:text-white transition-colors">
                        Sign Up
                    </button>
                </div>
            </div>
            {/* Mobile Menu Icon */}
            <div className="lg:hidden flex gap-3 items-center">
                <img
                    alt="account"
                    src="https://assets.vakilsearch.com/live-images/user-blue.svg"
                    className="w-7 h-7"
                />
                <div className="cursor-pointer self-center flex flex-col gap-1 transition-all">
                    <span className="block w-6 h-0.5 bg-[#022B50] rounded"></span>
                    <span className="block w-6 h-0.5 bg-[#022B50] rounded"></span>
                    <span className="block w-6 h-0.5 bg-[#022B50] rounded"></span>
                </div>
            </div>
        </div>
    </header>
);

const StatCard = ({ count, label }) => (
    <div className="p-3 bg-white rounded-lg shadow-sm text-center border border-gray-100">
        <p className="text-2xl font-bold text-[#022B50]">{count}</p>
        <p className="text-xs text-gray-500 mt-1">{label}</p>
    </div>
);

const LawyerProfileCard = ({ lawyer }) => (
    <div className="p-4 md:p-6 bg-white border border-gray-200 rounded-xl shadow-md transition hover:shadow-lg flex flex-col space-y-3">
        <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">{lawyer.name}</h3>
            <div className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                Verified
            </div>
        </div>

        <div className='flex flex-wrap gap-x-6 gap-y-1 text-gray-600 text-sm'>
            <p className="flex items-center gap-1">
                <Briefcase className="w-4 h-4 text-[#022B50]" />
                {lawyer.exp} years of Experience
            </p>
            <p className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-[#022B50]" />
                {lawyer.location}
            </p>
        </div>

        <p className="text-sm text-gray-700 font-medium">
            Practice area & skills: <span className="font-semibold text-[#022B50]">{lawyer.practice.split('+')[0].trim()}</span> + {lawyer.practice.split('+')[1].trim()}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t">
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
        <div className="border-b py-4">
            <button
                className="w-full flex justify-between items-center text-left font-bold text-gray-800"
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
        <div className="relative overflow-hidden w-full">
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {REVIEWS_DATA.map((review, index) => (
                    <div key={index} className="w-full flex-shrink-0 p-4">
                        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-[#022B50]">
                            <p className="text-yellow-500 flex items-center mb-2">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-500" />)}
                            </p>
                            <h4 className="font-bold text-gray-900 mb-3">{review.name}</h4>
                            <p className="text-gray-600 italic">
                                {review.text.replace(/“|”/g, '')}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute inset-y-0 left-0 flex items-center">
                <button onClick={prevSlide} className="bg-white/50 p-2 rounded-full ml-2 hover:bg-white transition">
                    <ChevronLeft className="w-5 h-5 text-gray-800" />
                </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
                <button onClick={nextSlide} className="bg-white/50 p-2 rounded-full mr-2 hover:bg-white transition">
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

            <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
                {/* Breadcrumbs */}
                <p className="text-sm text-gray-500 mb-6">
                    <a href="/" className="hover:underline">Home</a> &gt; <span className="font-semibold text-gray-700">Intellectual Property Lawyers</span>
                </p>

                {/* Hero Section and Form */}
                <section className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-[#171717] mb-3">
                            Experienced Intellectual Property Lawyers in India for Trusted Legal Help
                        </h1>
                        <p className="text-lg text-gray-600 mb-6 max-w-4xl">
                            Talk to an **IP lawyer** to protect your creations and innovations, including trademarks, patents, copyrights, and trade secrets. We offer legal guidance on intellectual property protection, ensure your rights are upheld, and represent you in disputes over infringement. Whether you’re an artist, inventor, or business owner, IP Lawyers can help you navigate the complexities of protecting your intellectual assets.
                        </p>

                        {/* Stats Section */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 mb-8">
                            <StatCard count="390+" label="Lawyers are online" />
                            <StatCard count="130+" label="Ongoing Calls" />
                            <StatCard count="5,00,000+" label="Happy User" />
                            <StatCard count="1,00,000+" label="Cases Resolved" />
                            <StatCard count="300+" label="Expert Lawyers" />
                        </div>
                    </div>

                    {/* Quick Connect Form */}
                    <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-xl border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
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
                        {msg && <p className="mt-4 text-center text-green-600 font-medium">{msg}</p>}

                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                            <p className="flex items-center gap-1 text-sm text-gray-700 font-semibold">
                                <img src="https://assets.vakilsearch.com/live-images/google-reviews.svg" alt="Google" className="w-5 h-5" />
                                Google Reviews
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-bold text-gray-800">4.5/5</span>
                                <span className="text-sm text-gray-500">19k+ Happy Reviews</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- Lawyer Listings Section --- */}
                <section className="mt-12 grid lg:grid-cols-3 gap-8">
                    {/* Sidebar Filters */}
                    <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-fit sticky top-4">
                        <div className="flex justify-between items-center mb-4 pb-4 border-b">
                            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <Filter className="w-5 h-5 text-[#022B50]" /> Filter
                            </h3>
                            <button onClick={clearAllFilters} className="text-sm text-red-600 font-medium hover:underline">
                                Clear all
                            </button>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">Showing {totalLawyers} Intellectual Property Lawyers</p>

                        {/* Static Filter Inputs (Search) */}
                        <div className="space-y-4 mb-6">
                            <input type="text" placeholder="Enter City" className="w-full border rounded-lg px-3 py-2 text-sm" />
                            <input type="text" placeholder="Enter Language" className="w-full border rounded-lg px-3 py-2 text-sm" />
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
                            <p className="text-sm font-semibold text-gray-800 flex items-center justify-between">
                                Intellectual Property Lawyers <X className="w-4 h-4 text-red-600 cursor-pointer" />
                            </p>
                        </div>
                    </div>

                    {/* Lawyer List */}
                    <div className="lg:col-span-2 space-y-6">
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
                        <div className="flex justify-center items-center space-x-2 pt-4">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className="p-2 border rounded-lg text-gray-700 disabled:opacity-50 hover:bg-gray-100 transition"
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
                                className="p-2 border rounded-lg text-gray-700 disabled:opacity-50 hover:bg-gray-100 transition"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* --- Cities & Specialization Links --- */}
                <section className="mt-12 pt-6 border-t border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Intellectual Property Lawyers in Major Cities</h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
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
                <section className="mt-12 bg-gray-100 py-10 rounded-xl">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                        India's most loved legal services, since 2010
                    </h2>
                    <ReviewCarousel />
                    <p className="text-xl font-bold text-center text-[#022B50] mt-6">
                        500+ People Connect With Trusted Legal Experts Every Day
                    </p>
                </section>
            </main>

            {/* --- FOOTER --- */}
            <footer className="bg-white py-10 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 pb-10 border-b border-gray-100">
                        {/* Specialization Lawyers */}
                        <div>
                            <h4 className="font-bold text-base text-gray-900 mb-3">Specialization Lawyers</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                {["Civil Lawyers", "Criminal Lawyers", "Family Lawyers", "Corporate Lawyers", "Intellectual Property Lawyers"].map((link) => (
                                    <li key={link}><a href="#" className="hover:text-[#022B50]">{link}</a></li>
                                ))}
                            </ul>
                        </div>
                        
                        {/* Lawyers in India */}
                        <div>
                            <h4 className="font-bold text-base text-gray-900 mb-3">Lawyers in India</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                {["Lawyers in Chennai", "Lawyers in Bangalore", "Lawyers in Mumbai", "Lawyers in Delhi", "Lawyers in Gurgaon"].map((link) => (
                                    <li key={link}><a href="#" className="hover:text-[#022B50]">{link}</a></li>
                                ))}
                            </ul>
                        </div>

                        {/* Law Guide & Legal Documents */}
                        <div>
                            <h4 className="font-bold text-base text-gray-900 mb-3">Law Guide & Legal Documents</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                {["Free Legal Documents Generator", "BNS Sections", "Articles", "Law Videos"].map((link) => (
                                    <li key={link}><a href="#" className="hover:text-[#022B50]">{link}</a></li>
                                ))}
                            </ul>
                        </div>

                        {/* Company Info */}
                        <div>
                            <h4 className="font-bold text-base text-gray-900 mb-3">Company</h4>
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
                            <h4 className="font-bold text-base text-gray-900 mb-3">Our Guarantee</h4>
                            <p className="text-gray-600 text-sm">
                                4350+ top legal experts. Connecting people with right legal expertise across 500 cities.
                            </p>
                            <p className="mt-3 font-bold text-sm text-gray-800">5,00,000 Satisfied Clients</p>
                        </div>
                    </div>

                    <div className="pt-6 text-xs text-gray-500 space-y-2">
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