import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface ContactPayload {
  name: string;
  email: string;
  inquiryType: string;
  subject?: string;
  message: string;
  website_url?: string; // Honeypot spam trap
}

const DATA_DIR = path.join(process.cwd(), "data");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");

function ensureStorageFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(INQUIRIES_FILE)) {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2), "utf8");
  }
}

export async function POST(request: Request) {
  try {
    const body: ContactPayload = await request.json();

    // 1. Honeypot check: If the hidden website_url field is filled, silently drop the bot submission
    if (body.website_url && body.website_url.trim().length > 0) {
      return NextResponse.json({
        success: true,
        receiptId: "PLK-BOT-DEFENSE",
        submittedAt: new Date().toISOString(),
      });
    }

    // 2. Server-side validation
    const name = body.name?.trim();
    const email = body.email?.trim();
    const inquiryType = body.inquiryType?.trim() || "General Atelier Inquiry";
    const subject = body.subject?.trim() || "Atelier Transmission";
    const message = body.message?.trim();

    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: "A valid name (at least 2 characters) is required." },
        { status: 400 }
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        { error: "Message details must be at least 10 characters." },
        { status: 400 }
      );
    }

    // 3. Generate official receipt code
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const receiptId = `PLK-2026-${randomSuffix}`;
    const timestamp = new Date().toISOString();

    const record = {
      receiptId,
      timestamp,
      name,
      email,
      inquiryType,
      subject,
      message,
      userAgent: request.headers.get("user-agent") || "unknown",
    };

    // 4. Safely persist record to server storage
    try {
      ensureStorageFile();
      const raw = fs.readFileSync(INQUIRIES_FILE, "utf8");
      const list = JSON.parse(raw);
      list.unshift(record);
      fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(list, null, 2), "utf8");
    } catch (fsErr) {
      console.warn("Notice: Local storage write fallback:", fsErr);
    }

    console.log(`[ATELIER TRANSMISSION] Received inquiry ${receiptId} from ${name} <${email}>`);

    return NextResponse.json({
      success: true,
      receiptId,
      submittedAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      message: "Inquiry successfully recorded in the studio transmission queue.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your transmission." },
      { status: 500 }
    );
  }
}

