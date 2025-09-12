"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const AnimatedContent = dynamic(() => import("@/components/AnimatedContent"));

const ExpandableCard = dynamic(() => import("@/components/ExpandableCard"));

const InfiniteMovingCards = dynamic(
  () => import("@/components/InfiniteMovingCards"),
  { ssr: false },
);

import { CardBody, CardContainer, CardItem } from "@/components/3DCard";

function Page() {
  //
  const testimonials = [
    {
      quote:
        "Stockouts and order mistakes were draining us. With Automate Ideas’ system, everything is now tracked live on one dashboard. Our error rate has dropped massively, and we finally feel in control.",
      name: "Nitin Verma",
      title: "Vercha Jewels",
      image: "/Vercha.jpeg",
    },
    {
      quote:
        "Automate Ideas helped us cut through the chaos of handling leads, tasks, and payments manually. The Google Workspace + WhatsApp integration alone saves us several hours a week — it’s been a total productivity boost.",
      name: "Narendra Vaid",
      title: "Copier World",
      image: "/copier-world.jpg",
    },
    {
      quote:
        "Payroll, leave tracking, compliance — all of it used to eat up time we didn’t have. Automate Ideas built a system that runs these processes automatically. It’s like having an extra team member who never makes mistakes.",
      name: "Chaitanya Agrawal",
      title: "Cranex Limited",
      image: "/cranex.webp",
    },
    {
      quote:
        "Month-end used to be chaos with invoicing and GST. Now, everything flows seamlessly with Automate Ideas’ automation. Reports are ready on time, and the team isn’t stressed anymore — it’s been a game-changer.",
      name: "Saurabh Khandelwal",
      title: "Dhanvi Diamonds",
      image: "/dhanvi.png",
    },
    {
      quote:
        "Our sales process finally feels modern. From order forms to receipts, every step is automated and linked with WhatsApp and Google Workspace. Customers notice the difference, and so do we.",
      name: "Rahul Bhagat",
      title: "Bhagat Halwai",
      image: "/Bhagat_Halwai.webp",
    },
    {
      quote:
        "Invoicing was a nightmare before — slow, error-prone, and manual. Now PDFs are generated and emailed instantly. We save hours every week and look more professional to our clients.",
      name: "Raghbir Singh",
      title: "RAGHBIR ERECTORS & FABRICATORS",
      image: "/raghbir.png",
    },
  ];

  const Dcard = [
    {
      title: "Step 1: Consultation & Needs Assessment",
      sub: "We take time to understand your goals and challenges.",
      img: "/CO.svg",
    },
    {
      title: "Step 2: Custom Solution Design",
      sub: "We craft a tailored strategy to meet your needs.",
      img: "/CS.svg",
    },
    {
      title: "Step 3: Implementation & Integration",
      sub: "Seamlessly integrating solutions into your workflow.",
      img: "/IN.svg",
    },
  ];

  return (
    <>
      <AnimatedContent
        distance={100}
        direction="vertical"
        config={{ tension: 80, friction: 20 }}
        initialOpacity={0.2}
        animateOpacity
        scale={1.5}
        threshold={0.2}
      >
        <section className="mx-auto flex h-fit flex-col items-center justify-center px-8 sm:grid sm:grid-cols-2 sm:gap-8">
          <div className="mx-auto flex flex-col items-center justify-center lg:w-2/3">
            <div className="">
              <span className="text-2xl font-bold lg:text-4xl">
                <span className="bg-gradient-to-r from-red-600 via-yellow-500 to-green-500 bg-clip-text text-transparent">
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
              src="/H2.png"
              alt="Top Image"
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
        direction="vertical"
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

      <section className="mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          {/* Header Section */}
          <div className="mb-12 text-center sm:mb-16 lg:mb-20">
            <div className="mb-4 text-2xl font-bold text-gray-700 sm:mb-6 sm:text-3xl lg:text-4xl">
              Revolutionize Your Workflow in 3 Strategic Steps
            </div>
            <div className="mx-auto max-w-3xl px-2 text-base leading-relaxed text-gray-600 sm:text-lg">
              Our process begins with a thorough consultation to understand your
              unique business needs. We then tailor automation solutions that
              enhance efficiency and communication.
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10">
            {Dcard.map((card, index) => (
              <CardContainer key={index} className="mx-auto w-full max-w-sm">
                <CardBody className="relative flex h-[480px] w-[350px] flex-col overflow-hidden rounded-xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-sm">
                  {/* Image Container - Fixed dimensions */}
                  <CardItem translateZ="60" className="relative z-20 p-4">
                    <div className="flex h-[260px] w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-gray-50/50 to-gray-100/50">
                      <Image
                        src={card.img}
                        height="240"
                        width="240"
                        className="h-full w-full object-contain transition-all duration-300 hover:scale-105"
                        alt={card.title}
                        priority={index < 3}
                        loading={index < 3 ? "eager" : "lazy"}
                      />
                    </div>
                  </CardItem>

                  {/* Content Container - Fixed height */}
                  <CardItem
                    translateZ="30"
                    className="relative z-10 flex-1 px-4 pb-6"
                    translateY={-5}
                  >
                    <div className="flex h-full flex-col items-center justify-center text-center">
                      <h2 className="mb-3 line-clamp-2 flex min-h-[3.5rem] items-center text-lg font-bold text-gray-800">
                        {card.title}
                      </h2>
                      <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
                        {card.sub}
                      </p>
                    </div>
                  </CardItem>
                </CardBody>
              </CardContainer>
            ))}
          </div>
        </div>
      </section>

      <section className="my-9 bg-white">
        <div className="py-4 text-center text-2xl font-bold text-gray-700 lg:text-3xl">
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
            href="/services"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-center text-white hover:bg-[#1d4ed8] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 sm:w-auto"
          >
            Explore Services
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
