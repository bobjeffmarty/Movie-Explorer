import { NextResponse } from "next/server";
import { buildSearchUrl, getTmdbHeaders, normalizeSearchResult } from "@/lib/tmdb";

export async function GET(request) {
  const query = request.nextUrl.searchParams.get("q")?.trim();

  if (!query) {
    return NextResponse.json(
      { error: "Please enter a movie title." },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(buildSearchUrl(query), {
      headers: getTmdbHeaders(),
      cache: "no-store"
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch movie results." },
        { status: response.status }
      );
    }

    const data = await response.json();
    const results = Array.isArray(data.results) ? data.results.map(normalizeSearchResult) : [];

    return NextResponse.json({ results });
  } catch (error) {
    return NextResponse.json(
      { error: "A network error occurred while searching for movies." },
      { status: 500 }
    );
  }
}
