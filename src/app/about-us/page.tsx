"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { UsersRound, Star, LaptopMinimalCheck } from "lucide-react";

export default function Page() {
  const coreValues = [
    {
      tittle: "Client Focus",
      icon: UsersRound,
      des: "We prioritize understanding your unique business needs and delivering solutions that drive real value.",
      color: "text-green-500",
    },
    {
      tittle: "Innovation",
      icon: Star,
      desc: "We continuously explore new ways to automate processes and improve workflows using the latest technologies.",
      color: "text-red-500",
    },
    {
      tittle: "Quality",
      icon: LaptopMinimalCheck,
      desc: "We're committed to delivering robust, reliable solutions with attention to detail and excellent support.",
      color: "text-yellow-600",
    },
  ];

  return (
    <>
      <div className="mt-4 mb-8 text-center text-4xl font-bold text-gray-800">
        About Us
      </div>
      <section className="container mx-auto mb-6 grid grid-cols-1 gap-8 px-4 md:grid-cols-2">
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            We are a team of passionate Google Workspace automation experts
            committed to helping businesses streamline operations and boost
            productivity. Our journey began with a realization: countless hours
            were being lost to repetitive, manual tasks — time that could be
            better spent growing the business.
          </p>
          <p className="text-lg text-gray-700">
            With deep expertise in Google Workspace technologies — including
            Apps Script, AppSheet, and third-party tools like WhatsApp —
            we&apos;ve helped clients across various industries transform
            workflows, reduce costs, and regain focus on what truly matters.
          </p>
          <div>
            <div className="my-2 text-2xl font-semibold text-gray-800">
              Our Mission
            </div>
            <p className="text-lg text-gray-700">
              To empower businesses with smart automation solutions that save
              time, eliminate errors, and free teams to do more impactful work.
            </p>
          </div>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Our Core Values
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {coreValues.map((value, index) => (
                <div className="flex items-start gap-4" key={index}>
                  {<value.icon className={`h-16 w-16 ${value.color}`} />}
                  <div>
                    <div className="text-xl font-semibold text-gray-800">
                      {value.tittle}
                    </div>
                    <p className="text-gray-700">{value.desc || value.des}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
