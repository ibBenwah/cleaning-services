import { NextRequest, NextResponse } from "next/server";

interface QuoteRequest {
  name: string;
  company: string;
  email: string;
  phone?: string;
  service: string;
  message?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  let body: QuoteRequest;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, company, email, service } = body;

  if (!name?.trim() || !company?.trim() || !email?.trim() || !service?.trim()) {
    return NextResponse.json(
      { error: "Missing required fields: name, company, email, service" },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  console.log("[Quote Request]", {
    name,
    company,
    email,
    phone: body.phone ?? "—",
    service,
    message: body.message ?? "—",
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ success: true }, { status: 200 });
}
