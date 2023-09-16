import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
import { getData } from "@/domain/remote/response/data";
import { TranslatorData } from "@/domain/types/translator-data";
import { DEFAULT_LOCALE, LOCALES } from "@/utils/constants";

export async function POST(request: Request) {
  const text: string = await request.json();

  const from = cookies().get("NEXT_LOCALE")?.value ?? DEFAULT_LOCALE;
  const to = LOCALES.find((locale) => locale !== from)!;

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
    return NextResponse.json({
      text: result.data.translatedText,
      from,
      to,
    } as TranslatorData);
  } catch (error) {
    return NextResponse.json("custom.translate", { status: 400 });
  }
}
