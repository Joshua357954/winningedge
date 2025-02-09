import { firestore } from "@/libs/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(req) {
  try {
    const cookies = req.headers.get("cookie") || "";
    const sessionId = cookies.split("=")[1];

    if (sessionId) {
      await deleteDoc(doc(firestore, "sessions", sessionId));
    }

    const cookie = serialize("session", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });

    return new Response(JSON.stringify({ message: "Logged out" }), {
      status: 200,
      headers: { "Set-Cookie": cookie },
    });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
