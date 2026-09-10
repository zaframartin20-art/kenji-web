import { NextResponse } from "next/server";

import {
  analyzeWithManagerAI,
  type ManagerAnalysisInput,
} from "@/lib/manager/ai";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ManagerAnalysisInput;

    if (!body.question || typeof body.question !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "La pregunta es obligatoria.",
        },
        {
          status: 400,
        }
      );
    }

    const answer = await analyzeWithManagerAI(body);

    return NextResponse.json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error("Manager AI error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible comunicarse con Ollama.",
      },
      {
        status: 500,
      }
    );
  }
}