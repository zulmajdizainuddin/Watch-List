import { NextResponse } from "next/server";
import { getAdminAuth } from "@lib/firebaseAdmin";

export async function GET(req: Request) {
  const token = req.headers.get("Authorization")?.replace(/^Bearer\s+/, "") ?? null;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await getAdminAuth().verifyIdToken(token);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing TMDB API key" },
      { status: 500 }
    );
  }

  try {
    const url = new URL("https://api.themoviedb.org/3/search/multi");
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("query", query);

    const res = await fetch(url.toString());

    if (!res.ok) {
      return NextResponse.json(
        { error: "TMDB request failed", status: res.status },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to reach TMDB" },
      { status: 502 }
    );
  }
}
