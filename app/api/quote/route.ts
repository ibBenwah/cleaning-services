import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

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

const resend = new Resend(process.env.RESEND_API_KEY);

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

  const { error } = await resend.emails.send({
    from: "Pure Perfection Cleaning <onboarding@resend.dev>",
    to: "pureperfectioncleaning8254@gmail.com",
    replyTo: email,
    subject: `New Quote Request — ${service}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
        <h2 style="color:#0f2044;margin-bottom:4px">New Quote Request</h2>
        <p style="color:#64748b;margin-top:0;font-size:14px">Submitted via pureperfectioncleaning.com</p>

        <table style="width:100%;border-collapse:collapse;margin-top:24px;font-size:14px">
          <tr style="border-bottom:1px solid #e2e8f0">
            <td style="padding:10px 0;color:#64748b;width:140px">Name</td>
            <td style="padding:10px 0;color:#0f2044;font-weight:600">${name}</td>
          </tr>
          <tr style="border-bottom:1px solid #e2e8f0">
            <td style="padding:10px 0;color:#64748b">Company</td>
            <td style="padding:10px 0;color:#0f2044">${company}</td>
          </tr>
          <tr style="border-bottom:1px solid #e2e8f0">
            <td style="padding:10px 0;color:#64748b">Email</td>
            <td style="padding:10px 0;color:#0f2044"><a href="mailto:${email}" style="color:#38bdf8">${email}</a></td>
          </tr>
          <tr style="border-bottom:1px solid #e2e8f0">
            <td style="padding:10px 0;color:#64748b">Phone</td>
            <td style="padding:10px 0;color:#0f2044">${body.phone?.trim() || "—"}</td>
          </tr>
          <tr style="border-bottom:1px solid #e2e8f0">
            <td style="padding:10px 0;color:#64748b">Service</td>
            <td style="padding:10px 0;color:#0f2044">${service}</td>
          </tr>
          ${body.message?.trim() ? `
          <tr>
            <td style="padding:10px 0;color:#64748b;vertical-align:top">Message</td>
            <td style="padding:10px 0;color:#0f2044">${body.message.trim().replace(/\n/g, "<br>")}</td>
          </tr>` : ""}
        </table>

        <p style="margin-top:24px;font-size:13px;color:#94a3b8">
          Hit reply to respond directly to ${name}.
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("[Quote] Resend error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
