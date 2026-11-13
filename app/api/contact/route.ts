import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const submission = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: String(name).trim(),
      company: company ? String(company).trim() : "",
      email: String(email).trim(),
      message: String(message).trim(),
      createdAt: new Date().toISOString(),
    };

    console.log("------------------------------------------");
    console.log("New Contact Form Submission Received:");
    console.log("Name:    ", submission.name);
    console.log("Company: ", submission.company || "N/A");
    console.log("Email:   ", submission.email);
    console.log("Message: ", submission.message);
    console.log("Time:    ", submission.createdAt);
    console.log("------------------------------------------");

    // Persist to local JSON file for data durability
    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const filePath = path.join(dataDir, "submissions.json");
      let existing: any[] = [];
      if (fs.existsSync(filePath)) {
        try {
          const content = fs.readFileSync(filePath, "utf-8");
          existing = JSON.parse(content);
          if (!Array.isArray(existing)) existing = [];
        } catch {
          existing = [];
        }
      }
      existing.push(submission);
      fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), "utf-8");
    } catch (saveErr) {
      console.warn("Could not write submission to local file:", saveErr);
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been received.",
      submissionId: submission.id,
    });
  } catch (error: any) {
    console.error("Error processing contact submission:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
