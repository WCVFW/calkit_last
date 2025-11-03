import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, ChatBubbleLeftRightIcon, BuildingOffice2Icon, MegaphoneIcon, CalendarDaysIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { getUser } from "../../lib/auth";

// --- 2. Main Page Component ---
export default function LandingPageContent() {
  const user = getUser();
  const userName = user?.fullName || user?.name || user?.email || "User";

  return (
    <div className="font-[Poppins] antialiased min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 space-y-10">
      
      {/* ⭐️ Welcome Banner & Primary CTA */}
      <section className="p-6 bg-white border-t-4 border-indigo-600 shadow-2xl rounded-xl md:p-10">
        <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
          Hello, <span className="text-indigo-600">{userName}</span>!
        </h1>
        <h2 className="mt-3 text-xl font-semibold text-gray-700">One Stop for Managing Your Compliances</h2>
        
        <div className="mt-6 space-y-3 text-gray-600">
          <p className="flex items-start">
            <CalendarDaysIcon className="flex-shrink-0 w-5 h-5 mt-1 mr-2 text-green-500" />
            Stay on top of every **compliance requirement** for your business, whether it's monthly, annual, or event-based.
          </p>
          <p className="flex items-start">
            <MegaphoneIcon className="flex-shrink-0 w-5 h-5 mt-1 mr-2 text-green-500" />
            Receive automatic **reminders** for every due date, so you never miss an important task.
          </p>
          <p className="flex items-start">
            <DocumentTextIcon className="flex-shrink-0 w-5 h-5 mt-1 mr-2 text-green-500" />
            Upload documents effortlessly and store them securely in one **centralized place**.
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-8 sm:flex-row">
          <Link 
            to="/setup/start" 
            className="flex items-center justify-center w-full px-6 py-3 space-x-2 font-semibold text-center text-white transition duration-150 bg-indigo-600 rounded-lg shadow-md sm:w-auto hover:bg-indigo-700"
          >
            <span>Start Your Business</span>
            <ArrowRightIcon className="w-4 h-4 ml-1" />
          </Link>
          <Link 
            to="/setup/add" 
            className="w-full px-6 py-3 font-semibold text-center text-indigo-600 transition duration-150 border border-indigo-600 rounded-lg shadow-md sm:w-auto hover:bg-indigo-50"
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
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        
        {/* Card 1: Expert Advice */}
        {/* <div className="flex flex-col h-full p-6 bg-white border-l-4 border-yellow-500 shadow-lg rounded-xl">
          <h3 className="text-xl font-bold text-gray-800">Get Expert Advice. Instantly.</h3>
          <p className="flex-grow mt-2 text-gray-600">
            Don't guess. Get definitive answers for your business or personal matters from verified professionals.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Backed by <span className="font-semibold text-gray-700">1000+ verified experts</span>
          </div>
          <div className="flex flex-col mt-4 space-y-3">
            <Link 
              to="/consult/ca" 
              className="px-4 py-2 font-medium text-center text-yellow-700 transition border border-yellow-500 rounded-lg hover:bg-yellow-50"
            >
              Talk to a CA (Chartered Accountant)
            </Link>
            <Link 
              to="/consult/lawyer" 
              className="px-4 py-2 font-medium text-center text-yellow-700 transition border border-yellow-500 rounded-lg hover:bg-yellow-50"
            >
              Talk to a Lawyer
            </Link>
          </div>
        </div> */}

        {/* Card 2: Demo & Digital Presence */}
        {/* <div className="flex flex-col h-full p-6 bg-white border-l-4 border-teal-500 shadow-lg rounded-xl">
          <h3 className="text-xl font-bold text-gray-800">See how makes compliance effortless</h3>
          <p className="flex-grow mt-2 text-gray-600">
            Watch a quick demonstration of our platform's full capabilities.
          </p>
          <div className="mt-4">
            <Link 
              to="/demo" 
              className="flex items-center justify-center w-full px-4 py-2 space-x-2 font-medium text-center text-white transition duration-150 bg-teal-500 rounded-lg shadow hover:bg-teal-600"
            >
              <span className="truncate">Watch Demo</span>
            </Link>
          </div>
          
          <div className="pt-4 mt-6 border-t border-gray-100">
            <h4 className="text-lg font-semibold text-gray-800">Go Digital, Get More Customers</h4>
            <p className="mt-1 text-sm text-gray-600">Build a professional website. Reach more customers online, showcase products 24/7.</p>
            <Link 
              to="/services/website" 
              className="block w-full px-4 py-2 mt-3 font-medium text-center text-gray-700 transition border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Build My Website
            </Link>
          </div>
        </div> */}

      </section>
      
      {/* --- Divider --- */}
      <hr className="border-gray-200" />

      {/* Recommended Section Placeholder */}
      <section className="pb-8 text-center">
        {/* <h3 className="text-xl font-semibold text-gray-800">Recommended for you</h3>
        <p className="mt-1 text-sm text-gray-500">Personalized services to help your business thrive.</p>
        <Link 
            to="/recommended" 
            className="inline-flex items-center mt-4 font-medium text-indigo-600 transition hover:text-indigo-800"
        >
            View all Recommended Services
            <ArrowRightIcon className="w-4 h-4 ml-1" />
        </Link> */}
        {/* Placeholder for the actual Recommended Cards/Grid */}
      </section>

    </div>
  );
}
