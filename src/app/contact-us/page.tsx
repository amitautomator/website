"use client";

import React from "react";
import Image from "next/image";
import { TypewriterEffectSmooth } from "@/components/typewriter-effect";

export default function Page() {
  const words = [
    {
      text: "Get",
    },
    {
      text: "In",
    },
    {
      text: "Touch",
    },
    {
      text: "with",
    },
    {
      text: "Automate Ideas !",
      className: "text-red-500 ",
    },
  ];

  return (
    <div>
      <div className="mx-auto my-4 h-[40%] place-content-center gap-3 px-5 py-6 sm:grid sm:grid-cols-2">
        <div className="text-center">
          <div className="mb-6 flex items-center justify-start gap-2">
            <Image
              src="/Logo.png"
              alt="Logo"
              width={200}
              height={200}
              className="h-10 w-10"
            />
            <TypewriterEffectSmooth words={words} />
            <span className="text-4xl font-extrabold text-blue-500"></span>
          </div>
          <div className="text-start text-base font-semibold text-gray-700">
            Ready to streamline your business operations with Google Workspace
            automation? Contact us today for a free consultation and discover
            how we can help you save time, reduce errors, and focus on what
            truly matters.
          </div>
          <div>
            <div className="mt-6 flex items-center justify-start gap-4 rounded-lg p-3 transition-all duration-300 hover:bg-gray-50">
              <Image
                src="/C.gif"
                alt="Phone"
                width={30}
                height={20}
                className="h-6 w-6 transition-transform hover:scale-110"
                unoptimized
              />
              <div className="flex flex-col gap-1">
                <span className="text-start text-base font-semibold text-black hover:text-blue-600">
                  Call Us
                </span>
                <span className="text-start text-base font-medium text-gray-600 hover:text-gray-900">
                  +91 7210756879
                </span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-start gap-4 rounded-lg p-3 transition-all duration-300 hover:bg-gray-50">
              <Image
                src="/W.gif"
                alt="WhatsApp"
                width={30}
                height={20}
                className="h-6 w-6 transition-transform hover:scale-110"
                unoptimized
              />
              <div className="flex flex-col gap-1">
                <span className="text-start text-base font-semibold text-black hover:text-blue-600">
                  WhatsApp
                </span>
                <span className="text-start text-base font-medium text-gray-600 hover:text-gray-900">
                  +91 7210756879
                </span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-start gap-4 rounded-lg p-3 transition-all duration-300 hover:bg-gray-50">
              <Image
                src="/M.gif"
                alt="Mail"
                width={30}
                height={20}
                className="h-6 w-6 transition-transform hover:scale-110"
                unoptimized
              />
              <div className="flex flex-col gap-1">
                <span className="text-start text-base font-semibold text-black hover:text-blue-600">
                  Email Us
                </span>
                <span className="text-start text-base font-medium text-gray-600 hover:text-gray-900">
                  amit23kumar04@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">Black</div>
      </div>
    </div>
  );
}
