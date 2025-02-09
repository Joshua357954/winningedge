import { firestore } from "@/libs/firebase";
import bcrypt from "bcrypt";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { fullName, email, phone, password, confirmPassword } =
      await req.json();

    if (!fullName || !email || !phone || !password || !confirmPassword) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const userRef = doc(firestore, "users", email);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return NextResponse.json(
        { error: "User already registered, login" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user details in Firestore
    await setDoc(userRef, {
      name: fullName,
      email,
      phone,
      password: hashedPassword,
      balance: 0.0,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
