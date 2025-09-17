import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

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
  } catch (err: unknown) {
    // Check if err is an object and has 'response'
    if (typeof err === "object" && err !== null && "response" in err) {
      const axiosError = err as {
        response?: {
          data?: { message?: string };
          status?: number;
        };
        message?: string;
      };

      console.error(
        "Proxy error:",
        axiosError.response?.data || axiosError.message,
      );

      return NextResponse.json(
        {
          success: false,
          error:
            axiosError.response?.data?.message ||
            "Failed to submit form. Please try again.",
        },
        {
          status:
            axiosError.response?.status || StatusCodes.INTERNAL_SERVER_ERROR,
        },
      );
    }

    // Fallback for unknown error shape
    console.error("Unexpected error:", err);

    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred.",
      },
      { status: StatusCodes.INTERNAL_SERVER_ERROR },
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
