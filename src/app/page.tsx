"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

import AnimatedContent from "@/components/AnimatedContent ";
const ExpandableCard = dynamic(() => import("@/components/ExpandableCard"));
const InfiniteMovingCards = dynamic(
  () => import("@/components/InfiniteMovingCards"),
);

import { CardBody, CardContainer, CardItem } from "@/components/3DCard";
function Page() {
  //
  const testimonials = [
    {
      quote:
        "Managing stock and orders used to be a daily headache. Since switching to the system built by Automate Ideas, we finally have real-time visibility into inventory and a centralized dashboard. It's cut down our errors and made our operations way smoother. Highly recommended.",
      name: "Nitin Verma",
      title: "Vercha Jewels",
      image: "/Vercha.jpeg",
    },
    {
      quote:
        "We were juggling too many things manually — leads, tasks, follow-ups, payments. Automate Ideas completely streamlined our workflow. The Google Workspace + WhatsApp integration alone saves us hours every single week. It’s honestly changed the game for us.",
      name: "Narendra Vaid",
      title: "Copier World",
      image: "/copier-world.jpg",
    },
    {
      quote:
        "HR and compliance used to consume far too much of our time. Automate Ideas came in, understood our pain points, and built us a system that now handles payroll, leave tracking, and audit logs automatically. It’s made life so much easier for our team.",
      name: "Chaitanya Agrawal",
      title: "Cranex Limited",
      image: "/cranex.webp",
    },
    {
      quote:
        "We used to dread the end of every month. Invoicing, GST, and stock updates were always a mess. With the automation tools from Automate Ideas, everything now flows together — no more last-minute rush. It’s exactly what our business needed.",
      name: "Saurabh Khandelwal",
      title: "Dhanvi Diamonds",
      image: "/dhanvi.png",
    },
    {
      quote:
        "Before working with Automate Ideas, our sales process was completely manual. Now, from order forms to receipts, everything is automated and linked through WhatsApp and Google Workspace. It feels like we finally caught up with the times.",
      name: "Rahul Bhagat",
      title: "Bhagat Halwai",
      image: "/Bhagat_Halwai.webp",
    },
    {
      quote:
        "We used to send out invoices manually after every purchase — not anymore. With the automation from Automate Ideas, the system generates and emails professional PDFs instantly. It’s fast, accurate, and has reduced our workload significantly.",
      name: "Raghbir Singh",
      title: "RAGHBIR ERECTORS & FABRICATORS",
      image: "/raghbir.png",
    },
  ];

  const Dcard = [
    {
      title: "Step 1: Consultation and Needs Assessment",
      sub: "We listen to your challenges and goals.",
      img: "/CO.svg",
    },
    {
      title: "Step 2: Custom Solution Design and Planning",
      sub: "Our team crafts a tailored automation strategy.",
      img: "/CS.svg",
    },
    {
      title: "Step 3: Implementation and Integration",
      sub: "We seamlessly integrate solutions into your workflow.",
      img: "/IN.svg",
    },
  ];
  //

  return (
    <>
      <AnimatedContent
        distance={100}
        direction="horizontal"
        reverse={true}
        config={{ tension: 80, friction: 20 }}
        initialOpacity={0.2}
        animateOpacity
        scale={1.5}
        threshold={0.2}
      >
        <section className="mx-auto h-fit flex-row items-center justify-center px-5 sm:grid sm:grid-cols-2">
          <div className="mx-auto flex flex-col items-center justify-center lg:w-2/3">
            <div className="">
              <span className="text-2xl font-bold lg:text-4xl">
                {/* <span className="text-blue-500">Automate</span> Ideas */}
                <span className="via-yello-500 bg-gradient-to-r from-red-600 to-green-500 bg-clip-text text-transparent">
                  Automate Ideas
                </span>
              </span>
              <br />
              <span className="text-3xl font-bold sm:text-4xl lg:text-5xl">
                Transform Your Business with Automation Solutions
              </span>
            </div>
            <div className="mt-4 w-full text-start text-sm text-gray-600 lg:text-lg">
              Discover fast, flexible features that accelerate growth across
              every layer of your business — from operations to customer
              experience — with intelligent, scalable automation.
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src={"/H2.png"}
              alt="Test"
              width={400}
              height={400}
              priority={true}
              className="w-full md:h-1/3 md:w-auto lg:h-4/12"
            />
          </div>
        </section>
      </AnimatedContent>

      <AnimatedContent
        distance={100}
        direction="horizontal"
        reverse={false}
        config={{ tension: 80, friction: 20 }}
        initialOpacity={0.2}
        animateOpacity
        scale={1.5}
        threshold={0.2}
      >
        <section className="mx-auto flex h-fit flex-col-reverse items-center justify-between px-5 sm:grid sm:grid-cols-2 md:mx-6 lg:mx-8">
          <div className="flex items-center justify-center">
            <Image
              src={"/H3.svg"}
              alt="Test"
              width={400}
              height={400}
              priority={true}
              className="h-auto w-full max-w-[360px] object-contain sm:max-w-[700px]"
            />
          </div>
          <div className="mx-auto flex w-full flex-col items-center sm:w-auto sm:items-start lg:w-2/3">
            <div className="w-full text-left">
              <span className="text-2xl leading-tight font-bold md:text-3xl lg:text-4xl">
                Unlock the Power of <br />
                <span className="bg-gradient-to-r from-blue-600 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                  Google Workspace
                </span>
              </span>
            </div>
            <div className="mt-4 w-full text-start text-sm text-gray-600 lg:text-base">
              Seamlessly connect your business tools with Google Workspace
              integration. Automate document workflows, enhance team
              collaboration, and boost productivity with smart features designed
              for modern businesses.
            </div>
          </div>
        </section>
      </AnimatedContent>

      <section className="mt-3">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-700 lg:text-3xl">
            Transform Your Business with Automation Solutions
          </div>
          <div>
            Our process begins with a thorough consultation to understand your
            unique business needs. We then tailor automation solutions that
            enhance efficiency and communication.
          </div>
        </div>
        <div className="gap-8 sm:flex">
          {Dcard.map((card, index) => (
            <CardContainer key={index} className="inter-var">
              <CardBody className="group/card relative flex h-fit w-full items-center justify-center bg-transparent p-10 shadow-2xl">
                <CardItem translateZ="50" className="relative z-20">
                  <Image
                    src={card.img}
                    height="800"
                    width="800"
                    className="h-fit w-full object-contain"
                    alt="thumbnail"
                  />
                  <div className="mt-3 text-center">
                    <h2 className="text-2xl font-bold text-gray-700 lg:text-3xl">
                      {card.title}
                    </h2>
                    <p className="text-sm text-gray-500">{card.sub}</p>
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </section>

      <section className="mt-3">
        <div className="text-center text-2xl font-bold text-gray-700 lg:text-3xl">
          Seamless Email Integration for Enhanced Communication and
          Collaboration
        </div>
        <br />
        <ExpandableCard />
      </section>

      <section className="mx-auto my-10 flex w-full max-w-7xl flex-col items-center justify-center px-5">
        <div className="text-center text-2xl font-bold text-gray-700 lg:text-3xl">
          Discover Our Comprehensive Business Automation Solutions Tailored for
          Your Needs
        </div>
        <div className="mt-4 w-full max-w-3xl text-center text-sm text-gray-600 lg:text-base">
          Explore our range of automation solutions designed to streamline your
          business processes, enhance productivity, and drive growth. From
          workflow automation to data integration, we have the tools you need to
          succeed in todays fast-paced business environment.
        </div>
        <div className="mt-6 flex w-full max-w-3xl flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/solutions"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none sm:w-auto"
          >
            Explore Solutions
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="text-2xl font-bold text-gray-700 lg:text-3xl">
          Customer Testimonials
        </div>
        <div className="w-full text-sm text-gray-500 lg:text-base">
          Our workflow has never been smoother thanks to them.
        </div>
        <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-md bg-white antialiased">
          <InfiniteMovingCards
            items={testimonials}
            direction="left"
            speed="slow"
          />
        </div>
      </section>
    </>
  );
}

export default Page;
