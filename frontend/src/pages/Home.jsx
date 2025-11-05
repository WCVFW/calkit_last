import React from "react";
import { motion } from "framer-motion";
import ComplianceSection from "../pages/ComplianceSection";
import WhyChooseSection from "../pages/WhyChooseSection"

export default function Home() {
  return (
    <div className="items-start bg-white">
      <div className="flex flex-col justify-between bg-[#FAF4E7] w-full px-4 sm:px-10 lg:px-20 overflow-hidden">

        {/* =============== HERO SECTION =============== */}
        <section className="relative flex flex-col items-center justify-between w-full gap-5 overflow-hidden lg:flex-row">

          {/* ===== LEFT TEXT ===== */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="flex flex-col items-start max-w-full gap-5 mt-10 text-center lg:text-left md:max-w-md lg:max-w-lg sm:mt-0"
          >
            <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              Your Legal, <br className="hidden sm:block" />
              Tax, <br className="hidden sm:block" />
              Compliance <br className="hidden sm:block" />
              Partner
            </h1>
            <p className="text-sm leading-relaxed text-gray-700 sm:text-base md:text-lg">
              Bala is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer...
            </p>
          </motion.div>


          {/* ===== BLACK BAR (Left bottom) ===== */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "40%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="
    hidden sm:block
    absolute left-0 
    bottom-0 lg:bottom-[-5%] 
    h-[12px] sm:h-[20px] md:h-[30px] lg:h-[70px]
    bg-black opacity-80 rounded-r-md
  "
          />


          {/* ===== RIGHT IMAGE SECTION ===== */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative flex justify-center items-center w-full sm:w-[400px] md:w-[500px] lg:w-[680px] xl:w-[760px]"
          >
            <div className="relative w-full overflow-hidden rounded-2xl">
              {/* Background */}
              <div
                className="bg-cover bg-center w-full h-[220px] sm:h-[320px] md:h-[480px] lg:h-[620px] relative rounded-2xl shadow-md"
                style={{
                  backgroundImage:
                    "url('https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wubvUxErdY/krdd4lio_expires_30_days.png')",
                }}
              >
                {/* Yellow Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.85 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 bg-[#FAD481]"
                />

                {/* Floating Foreground */}
                <motion.img
                  src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wubvUxErdY/ad8eeshf_expires_30_days.png"
                  alt="main visual"
                  className="absolute bottom-[8%] left-1/2 transform -translate-x-1/2 w-[130px] sm:w-[200px] md:w-[280px] lg:w-[350px] object-contain drop-shadow-lg"
                  animate={{ y: [0, -14, 0] }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Side Floating */}
                <motion.img
                  src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wubvUxErdY/484hqft5_expires_30_days.png"
                  alt="side visual"
                  className="absolute top-[6%] left-[6%] w-[60px] sm:w-[90px] md:w-[120px] lg:w-[150px] object-contain"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Black Icon Box */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7 }}
                  className="absolute top-[68%] left-[10%] bg-black p-2 sm:p-3 md:p-4 rounded-md flex justify-center items-center shadow-md"
                >
                  <img
                    src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wubvUxErdY/wr6bbedy_expires_30_days.png"
                    className="w-[18px] sm:w-[24px] md:w-[32px] h-[18px] sm:h-[24px] md:h-[32px]"
                    alt="icon"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* =============== ABOUT SECTION =============== */}
        <section className="flex flex-col items-center justify-center w-full gap-10 px-4 py-12 mt-16 sm:mt-20 md:mt-24 lg:mt-32 lg:flex-row lg:gap-30">
          {/* IMAGES */}
          <div className="relative flex flex-col items-center w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px]">
            <motion.img
              src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wubvUxErdY/fd8425va_expires_30_days.png"
              className="w-[150px] sm:w-[200px] md:w-[260px] lg:w-[300px] object-contain relative z-10"
              alt="about"
              whileInView={{ scale: [0.95, 1] }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />

            {/* Decorative Layers */}
            <motion.img
              src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wubvUxErdY/18zm36xw_expires_30_days.png"
              className="absolute top-[10%] -left-[25px] sm:-left-[40px] w-[60px] sm:w-[100px] md:w-[140px] opacity-80"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              alt="decor1"
            />
            <motion.img
              src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wubvUxErdY/dsx6a9an_expires_30_days.png"
              className="absolute bottom-[-30px] right-[-40px] w-[70px] sm:w-[100px] md:w-[150px] opacity-80"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              alt="decor2"
            />

            {/* Black Icon */}
            <div className="relative z-20 flex items-center justify-center p-2 mt-5 bg-black rounded-md sm:p-3">
              <img
                src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wubvUxErdY/wqvz9jyn_expires_30_days.png"
                className="w-[20px] sm:w-[26px] h-[20px] sm:h-[26px]"
                alt="icon"
              />
            </div>
          </div>

          {/* Yellow Icon (Desktop Only) */}
          <div className="hidden lg:flex flex-col items-center justify-center bg-[#FFAF00] w-[68px] py-[15px] px-[17px] mt-[35px] rounded-md">
            <img
              src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wubvUxErdY/zbm16ruw_expires_30_days.png"
              className="w-[34px] h-[34px] object-contain"
              alt="icon"
            />
          </div>

          {/* TEXT */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full max-w-[480px] mt-6 gap-5">
            <div className="flex flex-col gap-2.5">
              <span className="text-[#111111] text-3xl md:text-4xl lg:text-5xl font-libre font-semibold">
                About
              </span>
              <span className="text-[#111111] text-lg md:text-xl font-bold">
                Simplifying Legal & Compliance
              </span>
              <p className="text-[#6A6863] text-sm md:text-base leading-relaxed">
                Bala is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since
                the 1500s, when an unknown printer...
              </p>
            </div>
            <button className="text-[#111111] text-sm md:text-base underline hover:text-[#FFAF00] transition-all">
              Learn more
            </button>
          </div>
        </section>

        {/* =============== MID SECTION =============== */}
        <section className="flex flex-col items-center justify-center w-full px-4 py-12 mt-16 sm:px-8 md:px-12 lg:px-16 xl:px-24 sm:mt-20 md:mt-24 lg:mt-32">
          <h2 className="max-w-3xl mb-8 text-xl leading-tight text-center text-black sm:text-2xl md:text-3xl lg:text-4xl font-libre sm:mb-12">
            From startup to scale-up we power your growth
          </h2>

          <div className="grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Start a Business", img: "18zm36xw" },
              { title: "Manage your Business", img: "69090vx7" },
              { title: "Protect your Business", img: "ymbubdyn" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="relative flex items-center justify-start h-[180px] sm:h-[220px] md:h-[250px] lg:h-[260px] rounded-xl overflow-hidden shadow-md transition-transform"
              >
                <img
                  src={`https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wubvUxErdY/${item.img}_expires_30_days.png`}
                  className="absolute inset-0 object-cover w-full h-full"
                  alt={item.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#F8D280]/90 via-[#F8D280]/60 to-transparent"></div>
                <div className="relative z-10 px-5">
                  <span className="text-[#111111] text-lg sm:text-xl md:text-2xl font-libre font-semibold">
                    {item.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>


        {/* =============== COMPLIANCE SECTION =============== */}
        <div className="mt-16 sm:mt-20 md:mt-24 lg:mt-30">
          <h2 className="text-center font-semibold mb-12 text-[clamp(1.25rem,3vw,2.25rem)] drop-shadow-lg">
            Your Command Center for Compliance
          </h2>
          <ComplianceSection />
        </div>
        <div className="mt-16 sm:mt-20 md:mt-24 lg:mt-30">
          <WhyChooseSection />
        </div>
      </div>
    </div>
  );
}
