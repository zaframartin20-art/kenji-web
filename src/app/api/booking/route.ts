import { NextResponse } from "next/server";
import { Resend } from "resend";

interface BookingRequest {
  name: string;
  email: string;
  eventType: string;
  location: string;
  date: string;
  budget: string;
  message: string;
}

/*
 * Environment variables
 *
 * Current production setup:
 * BOOKING_FROM_EMAIL=Kenji Zan <onboarding@resend.dev>
 *
 * Future setup after verifying kenjizan.com in Resend:
 * BOOKING_FROM_EMAIL=Kenji Zan <booking@kenjizan.com>
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  console.error("RESEND_API_KEY is not configured.");
}

const resend = new Resend(RESEND_API_KEY);

const BOOKING_EMAIL =
  process.env.BOOKING_EMAIL || "zaframartin20@gmail.com";

const BOOKING_FROM_EMAIL =
  process.env.BOOKING_FROM_EMAIL ||
  "Kenji Zan <onboarding@resend.dev>";

const WHATSAPP_NUMBER = "525562502591";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidDate(date: string): boolean {
  const selectedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(selectedDate.getTime())) {
    return false;
  }

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return selectedDate >= today;
}

export async function POST(request: Request) {
  try {
    /*
     * Check Resend configuration
     */

    if (!RESEND_API_KEY) {
      console.error("BOOKING ERROR: RESEND_API_KEY is missing.");

      return NextResponse.json(
        {
          success: false,
          message: "Booking service is temporarily unavailable.",
        },
        { status: 500 }
      );
    }

    /*
     * Parse request
     */

    const body = (await request.json()) as Partial<BookingRequest>;

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const eventType = String(body.eventType || "").trim();
    const location = String(body.location || "").trim();
    const date = String(body.date || "").trim();
    const budget = String(body.budget || "").trim();
    const message = String(body.message || "").trim();

    /*
     * Required fields
     */

    if (
      !name ||
      !email ||
      !eventType ||
      !location ||
      !date ||
      !message
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields.",
        },
        { status: 400 }
      );
    }

    /*
     * Email validation
     */

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    /*
     * Date validation
     */

    if (!isValidDate(date)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select a valid future date.",
        },
        { status: 400 }
      );
    }

    /*
     * Length limits
     */

    if (name.length > 100) {
      return NextResponse.json(
        {
          success: false,
          message: "Name is too long.",
        },
        { status: 400 }
      );
    }

    if (email.length > 254) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is too long.",
        },
        { status: 400 }
      );
    }

    if (eventType.length > 100) {
      return NextResponse.json(
        {
          success: false,
          message: "Event type is too long.",
        },
        { status: 400 }
      );
    }

    if (location.length > 150) {
      return NextResponse.json(
        {
          success: false,
          message: "Location is too long.",
        },
        { status: 400 }
      );
    }

    if (budget.length > 100) {
      return NextResponse.json(
        {
          success: false,
          message: "Budget information is too long.",
        },
        { status: 400 }
      );
    }

    if (message.length > 3000) {
      return NextResponse.json(
        {
          success: false,
          message: "Message is too long.",
        },
        { status: 400 }
      );
    }

    /*
     * Escape user input before inserting it into HTML.
     */

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeEventType = escapeHtml(eventType);
    const safeLocation = escapeHtml(location);
    const safeDate = escapeHtml(date);
    const safeBudget = escapeHtml(budget || "Not specified");
    const safeMessage = escapeHtml(message);

    /*
     * ============================================================
     * 1. Email sent to Kenji Zan
     * ============================================================
     */

    const { data: bookingEmail, error: bookingError } =
      await resend.emails.send({
        from: BOOKING_FROM_EMAIL,
        to: [BOOKING_EMAIL],
        replyTo: email,
        subject: `New Booking Request - ${eventType}`,
        html: `
          <div style="
            font-family: Arial, sans-serif;
            max-width: 650px;
            margin: 0 auto;
            color: #111;
            line-height: 1.6;
          ">

            <h1 style="color: #06b6d4;">
              NEW BOOKING REQUEST
            </h1>

            <p>
              You have received a new booking request from
              the Kenji Zan website.
            </p>

            <hr />

            <h2>Event Information</h2>

            <p>
              <strong>Name:</strong> ${safeName}
            </p>

            <p>
              <strong>Email:</strong> ${safeEmail}
            </p>

            <p>
              <strong>Event Type:</strong> ${safeEventType}
            </p>

            <p>
              <strong>Location:</strong> ${safeLocation}
            </p>

            <p>
              <strong>Date:</strong> ${safeDate}
            </p>

            <p>
              <strong>Estimated Budget:</strong> ${safeBudget}
            </p>

            <h2>Message</h2>

            <div style="
              background: #f4f4f4;
              padding: 20px;
              border-radius: 12px;
              white-space: pre-wrap;
            ">
              ${safeMessage}
            </div>

            <hr />

            <h2>Contact</h2>

            <p>
              <strong>Email:</strong>
              <a href="mailto:${BOOKING_EMAIL}">
                ${BOOKING_EMAIL}
              </a>
            </p>

            <p>
              <strong>WhatsApp:</strong>
              <a href="https://wa.me/${WHATSAPP_NUMBER}">
                +52 55 6250 2591
              </a>
            </p>

            <p style="
              color: #666;
              font-size: 13px;
              margin-top: 30px;
            ">
              Kenji Zan - Booking System
            </p>

          </div>
        `,
      });

    /*
     * Booking email failed
     */

    if (bookingError) {
      console.error("RESEND BOOKING ERROR:", bookingError);

      return NextResponse.json(
        {
          success: false,
          message: "Unable to send booking request.",
        },
        { status: 500 }
      );
    }

    console.log("BOOKING EMAIL SENT:", bookingEmail?.id);

    /*
     * ============================================================
     * 2. Confirmation email sent to the client
     * ============================================================
     */

    const { data: confirmationEmail, error: confirmationError } =
      await resend.emails.send({
        from: BOOKING_FROM_EMAIL,
        to: [email],
        subject: "Booking Request Received - Kenji Zan",
        html: `
          <div style="
            font-family: Arial, sans-serif;
            max-width: 650px;
            margin: 0 auto;
            color: #111;
            line-height: 1.6;
          ">

            <h1 style="color: #06b6d4;">
              BOOKING REQUEST RECEIVED
            </h1>

            <p>
              Hi ${safeName},
            </p>

            <p>
              Thank you for contacting
              <strong>Kenji Zan</strong>.
            </p>

            <p>
              Your booking request has been received successfully.
              I'll review the details and get back to you as soon
              as possible.
            </p>

            <hr />

            <h2>Your Request</h2>

            <p>
              <strong>Event:</strong> ${safeEventType}
            </p>

            <p>
              <strong>Location:</strong> ${safeLocation}
            </p>

            <p>
              <strong>Date:</strong> ${safeDate}
            </p>

            <p>
              <strong>Estimated Budget:</strong> ${safeBudget}
            </p>

            <hr />

            <h2>Questions or Proof of Payment</h2>

            <p>
              If you have any questions or need to send
              proof of payment, you can contact me through WhatsApp:
            </p>

            <p>
              <a
                href="https://wa.me/${WHATSAPP_NUMBER}"
                style="
                  display: inline-block;
                  background: #25D366;
                  color: white;
                  padding: 12px 20px;
                  border-radius: 8px;
                  text-decoration: none;
                  font-weight: bold;
                "
              >
                CONTACT VIA WHATSAPP
              </a>
            </p>

            <p>
              WhatsApp:
              <strong>+52 55 6250 2591</strong>
            </p>

            <p style="
              color: #666;
              font-size: 13px;
              margin-top: 30px;
            ">
              Kenji Zan<br />
              DJ / Producer<br />
              kenji-web.vercel.app
            </p>

          </div>
        `,
      });

    /*
     * Confirmation email failed.
     *
     * The booking itself was already received successfully,
     * so we do NOT return an error here.
     */

    if (confirmationError) {
      console.error(
        "RESEND CONFIRMATION ERROR:",
        confirmationError
      );
    } else {
      console.log(
        "CLIENT CONFIRMATION SENT:",
        confirmationEmail?.id
      );
    }

    /*
     * Success
     */

    return NextResponse.json({
      success: true,
      message: "Booking request received.",
    });

  } catch (error) {
    console.error("BOOKING ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to process booking request.",
      },
      { status: 500 }
    );
  }
}