"use client";

import axios from "axios";
import { useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TypewriterEffectSmooth } from "@/components/typewriter-effect";
import { Textarea } from "@/components/ui/textarea";

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

  const companySize = [
    "1-20",
    "21-50",
    "51-100",
    "101-200",
    "201-500",
    "501-1000",
    ">1000",
  ];

  const interestedIn = [
    "Google Workspace Automation",
    "Google Workspace Training",
    "FMS & PMS Services",
    "WhatsApp Automation",
    "HRMS",
    "Website",
  ];

  const [isPending, setIsPending] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    contactNo: "",
    email: "",
    designation: "",
    companyName: "",
    companySize: "",
    interestedIn: "",
    message: "",
  });

  const [alerts, setAlerts] = useState([]);

  const addAlert = (type, message, duration = 3000) => {
    const id = Date.now();
    setAlerts((prev) => [...prev, { id, type, message, duration }]);
  };

  const removeAlert = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const handleSubmit = async () => {
    console.log("Submitting form with data:", formData);

    setIsPending(true);

    const cleanedData = {
      name: formData.name.trim(),
      contactNo: formData.contactNo.trim(),
      email: formData.email.trim(),
      designation: formData.designation.trim(),
      companyName: formData.companyName.trim(),
      companySize: formData.companySize.trim(),
      interestedIn: formData.interestedIn.trim(),
      message: formData.message.trim(),
    };

    // Basic validation
    if (!cleanedData.name || !cleanedData.email || !cleanedData.message) {
      addAlert("error", "Please fill in all required fields!");
      setIsPending(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      addAlert("warning", "Please enter a valid email address!");
      return;
    }

    try {
      addAlert("info", "Submitting your form...", 2000);

      await axios.post("/api/contact-us", cleanedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      addAlert(
        "success",
        "Form submitted successfully! We'll get back to you soon.",
      );

      setFormData({
        name: "",
        contactNo: "",
        email: "",
        designation: "",
        companyName: "",
        companySize: "",
        interestedIn: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      addAlert("error", "Failed to submit form. Please try again later.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section className="container mx-auto px-6">
      <TypewriterEffectSmooth words={words} />
      <div className="mx-auto my-4 h-[40%] place-content-center gap-4 py-6 sm:grid sm:grid-cols-2">
        <div className="px-4">
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

        <Card className="border bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">
              Send Us a Message
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <form
              onSubmit={(e) => {
                e.preventDefault(); // prevent page reload
                handleSubmit(); // call your async submit function
              }}
              className="space-y-6"
            >
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name" className="font-semibold text-gray-700">
                    Name
                  </Label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                {/* Contact No */}
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="contactNo"
                    className="font-semibold text-gray-700"
                  >
                    Contact No.
                  </Label>
                  <Input
                    name="contactNo"
                    type="tel"
                    placeholder="Contact No."
                    required
                    value={formData.contactNo || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, contactNo: e.target.value })
                    }
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="email"
                    className="font-semibold text-gray-700"
                  >
                    Email
                  </Label>
                  <Input
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {/* Designation */}
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="designation"
                    className="font-semibold text-gray-700"
                  >
                    Designation
                  </Label>
                  <Input
                    value={formData.designation}
                    onChange={(e) =>
                      setFormData({ ...formData, designation: e.target.value })
                    }
                    name="designation"
                    type="text"
                    placeholder="Enter your designation"
                    required
                  />
                </div>

                {/* Company Name */}
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="companyName"
                    className="font-semibold text-gray-700"
                  >
                    Company Name
                  </Label>
                  <Input
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    name="companyName"
                    type="text"
                    placeholder="Enter company name"
                    required
                  />
                </div>

                {/* Company Size */}
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="companySize"
                    className="font-semibold text-gray-700"
                  >
                    Company Size
                  </Label>
                  <Select
                    value={formData.companySize}
                    onValueChange={(value) =>
                      setFormData({ ...formData, companySize: value })
                    }
                    name="companySize"
                  >
                    <SelectTrigger className="w-full" id="companySize">
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Company Size</SelectLabel>
                        {companySize.map((item) => (
                          <SelectItem value={item} key={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Interested In */}
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="interestedIn"
                    className="font-semibold text-gray-700"
                  >
                    Interested In
                  </Label>
                  <Select
                    value={formData.interestedIn}
                    onValueChange={(value) =>
                      setFormData({ ...formData, interestedIn: value })
                    }
                    name="interestedIn"
                  >
                    <SelectTrigger className="w-full" id="interestedIn">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Services</SelectLabel>
                        {interestedIn.map((item) => (
                          <SelectItem value={item} key={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div className="col-span-full flex flex-col gap-2">
                  <Label
                    htmlFor="message"
                    className="font-semibold text-gray-700"
                  >
                    Message
                  </Label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    name="message"
                    placeholder="Enter your message"
                    required
                    rows={4}
                  />
                </div>
              </div>
              <Button
                className="w-full bg-blue-600 text-white transition duration-150 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      {/* Render alerts */}
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          type={alert.type}
          message={alert.message}
          duration={alert.duration}
          onClose={() => removeAlert(alert.id)}
        />
      ))}
    </section>
  );
}
