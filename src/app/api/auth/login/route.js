import { firestore } from "@/libs/firebase";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const SECRET = "your_secret_key"; // Change this to a secure value

export async function POST(req) {
  try {
    console.log("Received POST request");
    const { email, password } = await req.json();
    console.log("Parsed request body:", {
      email,
      password: password ? "[HIDDEN]" : "MISSING",
    });

    if (!email || !password) {
      console.log("Missing email or password");
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Fetch user from Firestore
    console.log("Fetching user from Firestore", email);
    const userRef = doc(firestore, "users", email);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.log("User not found in Firestore");
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    const user = userSnap.data();
    console.log("User data fetched:", { name: user.name, email: user.email });

    // Check password
    console.log("Checking password");
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid password");
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    // Generate JWT tokens
    console.log("Generating JWT tokens");
    const accessToken = jwt.sign({ id: email, name: user.name }, SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ id: email }, SECRET, { expiresIn: "7d" });

    // Set refresh token as HttpOnly cookie
    console.log("Setting refresh token cookie");
    cookies().set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    console.log("Sending response with user data and accessToken");
    return new Response(
      JSON.stringify({
        user: { name: user.name, email, balance: user.balance },
        accessToken,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
