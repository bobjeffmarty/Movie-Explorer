import { NextResponse } from "next/server";
import { buildDetailsUrl, getTmdbHeaders, normalizeMovieDetails } from "@/lib/tmdb";

export async function GET(request, context) {
  const params = await context.params;
  let id = params?.id;

  // Fallback: parse the last path segment directly
  if (!id) {
    const parts = request.nextUrl.pathname.split("/").filter(Boolean);
    id = parts[parts.length - 1];
  }

  console.log("pathname:", request.nextUrl.pathname);
  console.log("params:", params);
  console.log("resolved id:", id);

  if (!id) {
    return NextResponse.json(
      { error: "Movie id is required." },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(buildDetailsUrl(id), {
      headers: getTmdbHeaders(),
      cache: "no-store"
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch movie details." },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      movie: normalizeMovieDetails(data)
    });
  } catch (error) {
    console.error("Movie details route error:", error);

    return NextResponse.json(
      { error: "A network error occurred while loading movie details." },
      { status: 500 }
    );
  }
}