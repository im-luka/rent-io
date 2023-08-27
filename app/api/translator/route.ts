import { NextResponse } from "next/server";
import axios from "axios";
import { getData } from "@/domain/remote/response/data";

export async function POST(request: Request) {
  const { from, to, text } = await request.json();

  try {
    const result = await axios
      .post(
        process.env.TRANSLATOR_RAPID_API_URL as string,
        {
          source_language: from,
          target_language: to,
          text,
        },
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            "X-RapidAPI-Key": process.env.TRANSLATOR_RAPID_API_KEY,
            "X-RapidAPI-Host": process.env.TRANSLATOR_RAPID_API_HOST,
          },
        }
      )
      .then(getData);
    return NextResponse.json(result.data.translatedText);
  } catch (error) {
    return NextResponse.json("custom.translate", { status: 400 });
  }
}
