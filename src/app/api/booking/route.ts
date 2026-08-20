import { NextResponse } from "next/server";

interface BookingRequest {
  name: string;
  email: string;
  eventType: string;
  location: string;
  date: string;
  budget: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BookingRequest;

    const {
      name,
      email,
      eventType,
      location,
      date,
      budget,
      message,
    } = body;

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
     * TEMPORALMENTE:
     * Aquí recibimos la solicitud.
     *
     * En el siguiente paso conectaremos este endpoint
     * con el servicio de correo que utilizará Booking.
     */

    console.log("NEW BOOKING REQUEST");

    console.log({
      name,
      email,
      eventType,
      location,
      date,
      budget,
      message,
    });

    return NextResponse.json({
      success: true,
      message: "Booking request received.",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to process booking request.",
      },
      { status: 500 }
    );
  }
}