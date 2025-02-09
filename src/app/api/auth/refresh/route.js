import jwt from "jsonwebtoken";
import {cookies} from "next/headers";
import { NextResponse } from "next/server";

const SECRET = "your_secret_key";

export async function POST(req) {
  try {
    const cookies = req.headers.get("cookie");
    if (!cookies)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const parsedCookies = cookies.parse(cookies);
    const refreshToken = parsedCookies.refresh_token;

    if (!refreshToken)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(refreshToken, SECRET);
    const newAccessToken = jwt.sign({ id: decoded.id }, SECRET, {
      expiresIn: "15m",
    });

    return NextResponse.json({ accessToken: newAccessToken });
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid refresh token" },
      { status: 403 }
    );
  }
}
