"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Form from "next/form";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

// import { submitContactForm } from "@/src/actions/contact-action";

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
  // const [state, setState] = useActionState(submitContactForm);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  console.log(setIsPending);

  return (
    <section className="container mx-auto px-6">
      {!mounted ? null : <TypewriterEffectSmooth words={words} />}
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
            <Form action="" className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name" className="font-semibold text-gray-700">
                    Name
                  </Label>
                  <Input
                    // onInput={(e: any) =>
                    //   setFormData({ ...formData, name: e.target.value })
                    // }
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                {/* Contact No */}
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="number"
                    className="font-semibold text-gray-700"
                  >
                    Contact No.
                  </Label>
                  <Input
                    // onInput={(e: any) =>
                    //   setFormData({ ...formData, number: e.target.value })
                    // }
                    name="number"
                    type="tel"
                    placeholder="Contact No."
                    required
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
                    // onInput={(e: any) =>
                    //   setFormData({ ...formData, email: e.target.value })
                    // }
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
                    // onInput={(e: any) =>
                    //   setFormData({ ...formData, designation: e.target.value })
                    // }
                    name="designation"
                    type="text"
                    placeholder="Enter your designation"
                    required
                  />
                </div>

                {/* Company Name */}
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="company"
                    className="font-semibold text-gray-700"
                  >
                    Company Name
                  </Label>
                  <Input
                    // onInput={(e: any) =>
                    //   setFormData({ ...formData, company: e.target.value })
                    // }
                    name="company"
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
                    // defaultValue=""
                    // onValueChange={(value) =>
                    //   setFormData({ ...formData, companySize: value })
                    // }
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
                    // defaultValue=""
                    // onValueChange={(value) =>
                    //   setFormData({ ...formData, interestedIn: value })
                    // }
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
                    // onInput={(e: any) =>
                    //   setFormData({ ...formData, message: e.target.value })
                    // }
                    name="message"
                    placeholder="Enter your message"
                    required
                    rows={4}
                  />
                </div>
              </div>
            </Form>
          </CardContent>

          <CardFooter className="flex flex-col gap-2 pt-0">
            <Button
              className="w-full bg-blue-600 text-white transition duration-150 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </CardFooter>
          {/* {state && (
            <div
              className={`mt-4 rounded-lg p-4 text-center ${
                state.success
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              {state.message}
            </div>
          )} */}
        </Card>
      </div>
    </section>
  );
}
