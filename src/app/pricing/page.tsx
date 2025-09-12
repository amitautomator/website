"use client";

import { useState } from "react";
import { Check, MessageCircle, Zap, Crown, Star } from "lucide-react";

function Page() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const whatsappPlans = [
    {
      id: 1,
      name: "Basic Plan",
      price: "₹999",
      period: "month",
      messages: "10,000",
      features: [
        "Up to 10,000 messages",
        "API Access",
        "Basic Analytics",
        "Email Support",
        "99.5% Uptime SLA",
      ],
      icon: MessageCircle,
      gradient: "from-blue-500 to-cyan-400",
      popular: false,
      badge: null,
    },
    {
      id: 2,
      name: "Pro Plan",
      price: "₹1,999",
      period: "month",
      messages: "50,000",
      features: [
        "Up to 50,000 messages",
        "Priority API Access",
        "Advanced Analytics",
        "Priority Support",
        "99.9% Uptime SLA",
        "Webhook Support",
        "Custom Templates",
      ],
      icon: Zap,
      gradient: "from-purple-500 to-pink-500",
      popular: true,
      badge: "Most Popular",
    },
    {
      id: 3,
      name: "Business Plan",
      price: "₹2,999",
      period: "month",
      messages: "100,000",
      features: [
        "Up to 100,000 messages",
        "Premium API Access",
        "Real-time Analytics",
        "24/7 Phone Support",
        "99.95% Uptime SLA",
        "Advanced Webhooks",
        "Custom Integrations",
        "Dedicated Account Manager",
      ],
      icon: Crown,
      gradient: "from-orange-500 to-red-500",
      popular: false,
      badge: "Enterprise",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            <Star className="h-4 w-4" />
            Transparent & Flexible Pricing
          </div>

          <h1 className="mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
            Our Pricing
          </h1>

          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
            My pricing is based on project requirements and complexity. Every
            project is unique, so let's discuss your needs to get an accurate
            quote.
          </p>
        </div>

        {/* Custom Projects Section */}
        <div className="mb-20">
          <div className="rounded-3xl border border-white/50 bg-white/70 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl md:p-12">
            <div className="text-center md:text-left">
              <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
                Custom Project Pricing
              </h2>

              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <p className="mb-6 text-lg leading-relaxed text-gray-700">
                    Whether it's a small feature or a full-scale application, I
                    offer flexible pricing tailored to your requirements.
                    Contact me with your idea and I'll provide a quote based on
                    scope, timeline, and complexity.
                  </p>

                  <div className="mb-6 flex flex-wrap gap-3">
                    <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                      Web Applications
                    </span>
                    <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                      Mobile Apps
                    </span>
                    <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
                      API Development
                    </span>
                    <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700">
                      Custom Solutions
                    </span>
                  </div>

                  <button className="inline-flex transform items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl">
                    <MessageCircle className="h-5 w-5" />
                    Get Custom Quote
                  </button>
                </div>

                <div className="hidden justify-center md:flex">
                  <div className="flex h-64 w-64 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shadow-2xl">
                    <div className="text-center text-white">
                      <div className="mb-2 text-4xl font-bold">∞</div>
                      <div className="text-lg">Unlimited</div>
                      <div className="text-sm opacity-90">Possibilities</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp API Pricing Section */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            WhatsApp API Platform Pricing
          </h2>
          <p className="text-lg text-gray-600">
            Fixed pricing model for our unofficial WhatsApp API platform with
            enterprise-grade features
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mb-16 grid gap-8 md:grid-cols-3">
          {whatsappPlans.map((plan) => {
            const IconComponent = plan.icon;

            return (
              <div
                key={plan.id}
                className={`group relative ${
                  plan.popular ? "md:-translate-y-4" : ""
                }`}
                onMouseEnter={() => setHoveredCard(plan.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Popular Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 transform">
                    <div
                      className={`rounded-full px-4 py-1 text-sm font-semibold text-white shadow-lg ${
                        plan.popular
                          ? "bg-gradient-to-r from-purple-500 to-pink-500"
                          : "bg-gradient-to-r from-orange-500 to-red-500"
                      }`}
                    >
                      {plan.badge}
                    </div>
                  </div>
                )}

                <div
                  className={`relative h-full transform rounded-3xl border-2 bg-white/80 p-8 shadow-xl backdrop-blur-sm transition-all duration-500 ${
                    hoveredCard === plan.id
                      ? "scale-105 border-transparent shadow-2xl"
                      : plan.popular
                        ? "border-purple-200"
                        : "border-gray-200"
                  } hover:-translate-y-2`}
                >
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                  ></div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={`inline-flex rounded-2xl bg-gradient-to-r p-3 ${plan.gradient} mb-6`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>

                    {/* Plan Name */}
                    <h3 className="mb-2 text-2xl font-bold text-gray-900">
                      {plan.name}
                    </h3>

                    {/* Price */}
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-gray-900">
                        {plan.price}
                      </span>
                      <span className="text-gray-600">/{plan.period}</span>
                    </div>

                    {/* Message Limit */}
                    <div className="mb-8 rounded-xl bg-gray-50 p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {plan.messages}
                        </div>
                        <div className="text-sm text-gray-600">
                          messages per month
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="mb-8 space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <div
                            className={`h-5 w-5 flex-shrink-0 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center`}
                          >
                            <Check className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button
                      className={`w-full rounded-xl px-6 py-3 font-semibold transition-all duration-300 ${
                        plan.popular
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:from-purple-700 hover:to-pink-700 hover:shadow-xl"
                          : "bg-gray-900 text-white hover:bg-black"
                      } transform hover:-translate-y-1`}
                    >
                      Choose {plan.name}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="rounded-2xl border border-white/50 bg-white/50 p-8 text-center shadow-lg backdrop-blur-sm">
          <h3 className="mb-4 text-2xl font-bold text-gray-900">
            Need Enterprise Solutions?
          </h3>
          <p className="mb-6 text-gray-600">
            All plans include API access, analytics, and support. Contact us for
            custom enterprise needs and volume discounts.
          </p>
          <button className="inline-flex transform items-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:from-green-700 hover:to-blue-700 hover:shadow-xl">
            <MessageCircle className="h-5 w-5" />
            Contact for Enterprise
          </button>
        </div>
      </div>
    </section>
  );
}

export default Page;
