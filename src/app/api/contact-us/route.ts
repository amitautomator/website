import { connectDB } from "@/src/dbConfig/dbConfig";
import ContactUs from "@/src/models/contactUsModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/src/helper/mailer";
import { StatusCodes } from "http-status-codes";
connectDB();

export async function POST(request: NextRequest) {
  try {
    interface ContactUsRequest {
      name: string;
      email: string;
      contactNo?: string;
      message: string;
      designation?: string;
      companyName?: string;
      companySize?: string;
      intrestedIn?: string;
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    const reqBody: ContactUsRequest = await request.json();

    const {
      name,
      email,
      contactNo,
      message,
      designation,
      companyName,
      companySize,
      intrestedIn,
    } = reqBody;

    const contactUs = new ContactUs({
      name,
      email,
      contactNo,
      message,
      designation,
      companyName,
      companySize,
      intrestedIn,
    });

    const savedContactUs = await contactUs.save();
    console.log(savedContactUs);

    try {
      await sendEmail({ email, emailType: "CONTACT" });
    } catch (emailError) {
      console.error("Email send failed:", emailError);
    }

    return NextResponse.json(
      {
        message: "Contact us saved successfully",
        success: true,
        savedContactUs,
      },
      { status: StatusCodes.OK },
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.log("Unknown error", error);
      return NextResponse.json(
        { error: "An unexpected error occurred" },
        { status: 500 },
      );
    }
  }
}

export async function GET() {
  const option = { status: 200, headers: { "Content-Type": "text/plain" } };
  return new Response("Hello, Next.js! API", option);
}
