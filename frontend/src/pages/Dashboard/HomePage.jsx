import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, ChatBubbleLeftRightIcon, BuildingOffice2Icon, MegaphoneIcon, CalendarDaysIcon, DocumentTextIcon } from "@heroicons/react/24/outline";


// --- 2. Main Page Component ---
export default function LandingPageContent() {
  const userName = "wcvfw2019"; // Placeholder for dynamic user name

  return (
    <div className="font-[Poppins] antialiased min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 space-y-10">
      
      {/* ⭐️ Welcome Banner & Primary CTA */}
      <section className="bg-white rounded-xl shadow-2xl p-6 md:p-10 border-t-4 border-indigo-600">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
          Hello, <span className="text-indigo-600">{userName}</span>!
        </h1>
        <h2 className="text-xl mt-3 font-semibold text-gray-700">One Stop for Managing Your Compliances</h2>
        
        <div className="mt-6 space-y-3 text-gray-600">
          <p className="flex items-start">
            <CalendarDaysIcon className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
            Stay on top of every **compliance requirement** for your business, whether it's monthly, annual, or event-based.
          </p>
          <p className="flex items-start">
            <MegaphoneIcon className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
            Receive automatic **reminders** for every due date, so you never miss an important task.
          </p>
          <p className="flex items-start">
            <DocumentTextIcon className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
            Upload documents effortlessly and store them securely in one **centralized place**.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link 
            to="/setup/start" 
            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 text-center flex items-center justify-center space-x-2"
          >
            <span>Start Your Business</span>
            <ArrowRightIcon className="w-4 h-4 ml-1" />
          </Link>
          <Link 
            to="/setup/add" 
            className="w-full sm:w-auto px-6 py-3 border border-indigo-600 text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-indigo-50 transition duration-150 text-center"
          >
            Already Have Business? Add Business
          </Link>
        </div>
      </section>

      {/* --- Divider --- */}
      <hr className="border-gray-200" />
      
      {/* --- Divider --- */}
      <hr className="border-gray-200" />

      {/* 🧑‍💼 Expert Advice & Demo Section (Two-column layout) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Expert Advice */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500 flex flex-col h-full">
          <h3 className="text-xl font-bold text-gray-800">Get Expert Advice. Instantly.</h3>
          <p className="mt-2 text-gray-600 flex-grow">
            Don't guess. Get definitive answers for your business or personal matters from verified professionals.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Backed by <span className="font-semibold text-gray-700">1000+ verified experts</span>
          </div>
          <div className="mt-4 flex flex-col space-y-3">
            <Link 
              to="/consult/ca" 
              className="px-4 py-2 border border-yellow-500 text-yellow-700 font-medium rounded-lg hover:bg-yellow-50 transition text-center"
            >
              Talk to a CA (Chartered Accountant)
            </Link>
            <Link 
              to="/consult/lawyer" 
              className="px-4 py-2 border border-yellow-500 text-yellow-700 font-medium rounded-lg hover:bg-yellow-50 transition text-center"
            >
              Talk to a Lawyer
            </Link>
          </div>
        </div>

        {/* Card 2: Demo & Digital Presence */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-teal-500 flex flex-col h-full">
          <h3 className="text-xl font-bold text-gray-800">See how Zolvit 360 makes compliance effortless</h3>
          <p className="mt-2 text-gray-600 flex-grow">
            Watch a quick demonstration of our platform's full capabilities.
          </p>
          <div className="mt-4">
            <Link 
              to="/demo" 
              className="w-full px-4 py-2 bg-teal-500 text-white font-medium rounded-lg shadow hover:bg-teal-600 transition duration-150 text-center flex items-center justify-center space-x-2"
            >
              <span className="truncate">Watch Demo</span>
            </Link>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-100">
            <h4 className="text-lg font-semibold text-gray-800">Go Digital, Get More Customers</h4>
            <p className="text-sm text-gray-600 mt-1">Build a professional website. Reach more customers online, showcase products 24/7.</p>
            <Link 
              to="/services/website" 
              className="mt-3 block w-full px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition text-center"
            >
              Build My Website
            </Link>
          </div>
        </div>

      </section>
      
      {/* --- Divider --- */}
      <hr className="border-gray-200" />

      {/* Recommended Section Placeholder */}
      <section className="text-center pb-8">
        <h3 className="text-xl font-semibold text-gray-800">Recommended for you</h3>
        <p className="text-sm text-gray-500 mt-1">Personalized services to help your business thrive.</p>
        <Link 
            to="/recommended" 
            className="mt-4 inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800 transition"
        >
            View all Recommended Services
            <ArrowRightIcon className="w-4 h-4 ml-1" />
        </Link>
        {/* Placeholder for the actual Recommended Cards/Grid */}
      </section>

    </div>
  );
}