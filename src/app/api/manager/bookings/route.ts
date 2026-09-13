import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: {
        date: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error(
      "MANAGER BOOKINGS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load bookings.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(
  request: Request
) {
  try {
    const body = await request.json();

    const id = Number(body.id);
    const status = body.status;

    const allowedStatuses = [
      "PENDING",
      "REVIEWED",
      "CONFIRMED",
      "REJECTED",
      "COMPLETED",
    ];

    if (
      !Number.isInteger(id) ||
      !allowedStatuses.includes(status)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid booking data.",
        },
        {
          status: 400,
        }
      );
    }

    const booking =
      await prisma.booking.update({
        where: {
          id,
        },
        data: {
          status,
        },
      });

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error(
      "MANAGER BOOKING UPDATE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to update booking.",
      },
      {
        status: 500,
      }
    );
  }
}