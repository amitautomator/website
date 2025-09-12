import { connectDB } from "@/src/dbConfig/dbConfig";
import ContactUs from "@/src/models/contactUsModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/src/helper/mailer";
  
connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

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

    await sendEmail({ email, emailType: "CONTACT" });

    return NextResponse.json(
      {
        message: "Contact us saved successfully",
        success: true,
        savedContactUs,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  const option = { status: 200, headers: { "Content-Type": "text/plain" } };
  return new Response("Hello, Next.js! API", option);
}
