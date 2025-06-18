"use client";
import React from "react";
import * as LucideIcons from "lucide-react";
import {
  Card,
  CardHeader,
  // CardFooter,
  CardTitle,
  // CardAction,
  CardDescription,
  // CardContent,
} from "@/components/ui/card";

function Page() {
  interface Service {
    name: string;
    icon: keyof typeof LucideIcons;
    description: string;
  }

  const services: Service[] = [
    {
      name: "Custom Web Apps",
      icon: "LayoutDashboard",
      description:
        "Design and develop tailored web applications within Google Workspace to solve specific business challenges such as project tracking, CRM systems, and more.",
    },
    {
      name: "Spreadsheet-Based Tools",
      icon: "Table",
      description:
        "Create powerful, customized tools using Google Sheets for data management, analysis, and real-time reporting, optimized for your operational needs.",
    },
    {
      name: "Process Automation",
      icon: "Repeat",
      description:
        "Automate routine tasks and streamline workflows using Apps Script and other tools, helping your team save time and focus on high-impact work.",
    },
    {
      name: "Data Analytics",
      icon: "BarChart3",
      description:
        "Transform raw data into actionable insights with tailored analytics solutions, including dashboards, KPIs, and trend analysis across your organization.",
    },
    {
      name: "Security and Compliance",
      icon: "ShieldCheck",
      description:
        "Implement robust security practices and ensure regulatory compliance with customized controls, audits, and monitoring solutions.",
    },
    {
      name: "Training and Support",
      icon: "LifeBuoy",
      description:
        "Provide comprehensive training and ongoing support to empower your team and ensure smooth adoption of new tools and processes.",
    },
    {
      name: "Dashboards & Employee Intranets",
      icon: "LayoutGrid",
      description:
        "Develop centralized dashboards and intranet portals to give your team real-time access to key metrics, tools, and company resources.",
    },
    {
      name: "Web Forms & AppSheet",
      icon: "FileInput",
      description:
        "Build intuitive web forms for data collection and streamline operations using AppSheet's no-code/low-code platform for custom mobile and web apps.",
    },
  ];

  return (
    <>
      <section className="container mx-auto">
        <div className="flex flex-col items-center">
          <div className="mb-4 text-4xl font-bold">Our Services</div>
          <div className="px-4 text-center text-xl font-medium">
            From custom apps to automated workflows, we help you leverage the
            full potential of Google Workspace to achieve your business goals.
          </div>
        </div>
        <div className="mx-6 mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const IconComponent = LucideIcons[
              service.icon
            ] as React.ElementType;
            return (
              <Card
                key={index}
                className="flex flex-col gap-4 p-6 transition-shadow hover:shadow-lg"
              >
                <CardHeader className="flex flex-row items-center gap-4">
                  {IconComponent && (
                    <IconComponent
                      className="text-primary h-10 w-10"
                      aria-label={service.name}
                    />
                  )}
                  <div>
                    <CardTitle>{service.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardDescription className="px-6">
                  {service.description}
                </CardDescription>
              </Card>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Page;
