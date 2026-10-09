import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const SUBSCRIBERS_FILE = path.join(DATA_DIR, "subscribers.json");

function ensureStorageFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(SUBSCRIBERS_FILE)) {
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify([], null, 2), "utf8");
  }
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const cleanEmail = email?.trim().toLowerCase();

    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    ensureStorageFile();
    const raw = fs.readFileSync(SUBSCRIBERS_FILE, "utf8");
    const subscribers: Array<{ email: string; subscribedAt: string }> = JSON.parse(raw);

    // Check if already subscribed
    const existing = subscribers.find((s) => s.email === cleanEmail);
    if (!existing) {
      subscribers.unshift({
        email: cleanEmail,
        subscribedAt: new Date().toISOString(),
      });
      fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2), "utf8");
      console.log(`[ATELIER DROP LIST] Added new subscriber: ${cleanEmail}`);
    }

    return NextResponse.json({
      success: true,
      message: "You have been inscribed onto the Issue No. 02 drop list.",
    });
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      { error: "Unable to process subscription at this time." },
      { status: 500 }
    );
  }
}

