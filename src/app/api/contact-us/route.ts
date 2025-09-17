import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import axios, { AxiosError } from "axios";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    // console.log("Received data:", data);
    // console.log(process.env.GOOGLE_APPS_SCRIPT_URL);

    if (!process.env.GOOGLE_APPS_SCRIPT_URL) {
      console.error("GOOGLE_APPS_SCRIPT_URL is not defined");
      return NextResponse.json(
        { error: "Google Apps Script URL not configured" },
        { status: 500 },
      );
    }

    const response = await axios.post(
      process.env.GOOGLE_APPS_SCRIPT_URL,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return NextResponse.json(
      { success: true, result: response.data },
      { status: 200 },
    );
  } catch (err) {
    const error = err as AxiosError; // type assertion
    console.error("Proxy error:", error.response?.data || error.message);

    interface ErrorResponseData {
      message?: string;
      [key: string]: unknown;
    }

    const errorData = error.response?.data as ErrorResponseData | undefined;

    return NextResponse.json(
      {
        success: false,
        error: errorData?.message || "Failed to submit form. Please try again.",
      },
      { status: error.response?.status || StatusCodes.INTERNAL_SERVER_ERROR },
    );
  }
}

export async function GET() {
  try {
    return NextResponse.json(
      {
        message: "Contact API is working",
        status: "healthy",
        timestamp: new Date().toISOString(),
      },
      { status: StatusCodes.OK },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Contact API health check failed",
        status: "unhealthy",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: StatusCodes.INTERNAL_SERVER_ERROR },
    );
  }
}
