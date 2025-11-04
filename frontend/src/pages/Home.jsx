import React from "react";
import ComplianceSection from "../pages/ComplianceSection"
export default function Home() {
  return (
    <div className="items-start bg-white">
      <div className="flex flex-col justify-between bg-[#FAF4E7] w-full pb-[1px] px-6 sm:px-10 lg:px-20 py-16">
        {/* --- Hero Section --- */}
        <div className="flex flex-col items-end self-stretch mb-[79px]">
          <div className="flex items-start">
            {/* Left Text Section */}
            <div className="flex flex-col items-start max-w-lg gap-6 mb-10 lg:mb-0">
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Your Legal, <br /> Tax, <br /> Compliance <br /> Partner
              </h1>
              <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
                Bala is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since
                the 1500s, when an unknown printer...
              </p>
            </div>

            {/* Right Image Section */}
            <div className="flex flex-col items-start w-[769px] relative">
              <div className="relative flex flex-col items-start self-stretch">
                <div className="self-stretch bg-[url('https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wubvUxErdY/krdd4lio_expires_30_days.png')] bg-cover bg-center">
                  <div className="flex flex-col items-end self-stretch mb-[100px]">
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-start bg-[#111111] w-[68px] py-[15px] px-4 mt-[154px]">
                        <img
                          src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wubvUxErdY/wr6bbedy_expires_30_days.png"
                          className="w-[34px] h-[34px] object-fill"
                          alt="icon"
                        />
                      </div>
                      <div
                        className="flex flex-col items-start w-[524px] relative bg-cover bg-center "
                        style={{
                          backgroundImage:
                            "url('assets/home.png'')",
                        }}
                      >
                        {/* Yellow background overlay */}
                        <div className="self-stretch bg-[#FAD481] h-[772px] opacity-90 " />

                        {/* Foreground image */}
                        <img
                          src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wubvUxErdY/ad8eeshf_expires_30_days.png"
                          className="w-[335px] h-[377px] absolute bottom-[119px] left-[-84px] object-fill"
                          alt="main visual"
                        />
                      </div>

                    </div>
                  </div>
                </div>
                <img
                  src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wubvUxErdY/484hqft5_expires_30_days.png"
                  className="w-[179px] h-[273px] absolute top-[17px] left-[-43px] object-fill"
                  alt="side visual"
                />
                <div className="bg-black w-[796px] h-[68px] absolute bottom-[151px] right-[800px]" />
              </div>
            </div>
          </div>
        </div>

        {/* --- About Section --- */}
        <div className="flex items-start mb-[358px] ml-[209px]">
          {/* Image Stack */}
          <div className="flex flex-col items-start w-[282px] mr-[42px] gap-10">
            <div className="relative flex flex-col items-center self-stretch">
              {/* Main front image */}
              <img
                src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wubvUxErdY/fd8425va_expires_30_days.png"
                className="w-[282px] h-[330px] object-fill relative z-10"
                alt="about-bg"
              />

              {/* Left decorative image (partly visible & behind main) */}
              <img
                src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wubvUxErdY/18zm36xw_expires_30_days.png"
                className="w-[212px] h-[143px] absolute top-[93px] left-[-90px] object-fill z-0 opacity-80"
                alt="decor1"
              />

              {/* Bottom-right decorative image (behind main) */}
              <img
                src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wubvUxErdY/dsx6a9an_expires_30_days.png"
                className="w-[190px] h-[285px] absolute bottom-[-145px] right-[-171px] object-fill z-0 opacity-80"
                alt="decor2"
              />
            </div>

            <div className="flex flex-col items-start bg-black py-[15px] px-[17px] ml-[101px]">
              <img
                src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wubvUxErdY/wqvz9jyn_expires_30_days.png"
                className="w-[34px] h-[34px] object-fill"
                alt="icon"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col items-start bg-[#FFAF00] w-[68px] py-[15px] px-[17px] mt-[35px] mr-[231px]">
            <img
              src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wubvUxErdY/zbm16ruw_expires_30_days.png"
              className="w-[34px] h-[34px] object-fill"
              alt="icon"
            />
          </div>

          <div className="flex flex-col items-start w-[373px] mt-[77px] gap-[43px]">
            <div className="flex flex-col items-start self-stretch gap-2.5">
              <span className="text-[#111111] text-[49px] font-libre">About</span>
              <span className="text-[#111111] text-[21px] font-bold">Simplifying Legal & Compliance</span>
              <span className="text-[#6A6863] text-[15px] whitespace-pre-line">
                Bala is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown printer
              </span>
            </div>
            <span className="text-[#111111] text-[15px] cursor-pointer underline">Learn more</span>
          </div>
        </div>

        {/* --- Mid Section --- */}
        <span className="text-black text-[54px] font-libre text-center w-[669px] mb-[153px] ml-[379px] whitespace-pre-line">
          From startup to scale-up we power your growth
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-[299px] px-10">
          {/* Start a Business */}
          <div className="relative flex flex-col justify-center items-start h-[244px] rounded-xl overflow-hidden">
            <img
              src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wubvUxErdY/18zm36xw_expires_30_days.png"
              className="absolute inset-0 object-cover w-full h-full"
              alt="start-bg"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#F8D280]/90 via-[#F8D280]/50 to-transparent"></div>
            <div className="relative z-10 pl-10">
              <span className="text-[#111111] text-4xl font-libre">Start a Business</span>
            </div>
          </div>

          {/* Manage Your Business */}
          <div className="relative flex flex-col justify-center items-start h-[244px] rounded-xl overflow-hidden">
            <img
              src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wubvUxErdY/69090vx7_expires_30_days.png"
              className="absolute inset-0 object-cover w-full h-full"
              alt="manage-bg"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#F8D280]/90 via-[#F8D280]/50 to-transparent"></div>
            <div className="relative z-10 pl-10">
              <span className="text-[#111111] text-4xl font-libre">Manage your Business</span>
            </div>
          </div>

          {/* Protect Your Business */}
          <div className="relative flex flex-col justify-center items-start h-[244px] rounded-xl overflow-hidden">
            <img
              src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wubvUxErdY/ymbubdyn_expires_30_days.png"
              className="absolute inset-0 object-cover w-full h-full"
              alt="protect-bg"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#F8D280]/90 via-[#F8D280]/50 to-transparent"></div>
            <div className="relative z-10 pl-10">
              <span className="text-[#111111] text-4xl font-libre">Protect your Business</span>
            </div>
          </div>
        </div>

        {/* --- Compliance Section --- */}
        <div className="">
          {/* 🏷️ Heading above the Compliance section */}
          <h2 className="relative z-10 text-center font-semibold mt-8 mb-16 px-4 text-[clamp(1.5rem,4vw,3rem)] drop-shadow-xl">
            Your Command Center for Compliance
          </h2>

          {/* 🧩 Compliance Section */}
          <ComplianceSection />
        </div>
      </div>
    </div>
  );
}
