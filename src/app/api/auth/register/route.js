import { firestore } from "@/libs/firebase";
import bcrypt from "bcrypt";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("Received request to register user...");

    const { fullName, email, phone, password, confirmPassword } = await req.json();

    console.log("Received data:", { fullName, email, phone, password, confirmPassword });

    if (!fullName || !email || !phone || !password || !confirmPassword) {
      console.log("Missing fields in request data");
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      console.log("Passwords do not match:", { password, confirmPassword });
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const userRef = doc(firestore, "users", email);
    const userSnap = await getDoc(userRef);

    console.log("Checking if user exists:", { email });

    if (userSnap.exists()) {
      console.log("User already exists:", { email });
      return NextResponse.json(
        { error: "User already registered, login" },
        { status: 400 }
      );
    }

    console.log("Hashing password...");
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed successfully");

    // Save user details in Firestore
    console.log("Saving user details to Firestore...");
    await setDoc(userRef, {
      name: fullName,
      email,
      phone,
      password: hashedPassword,
      balance: 0.0,
      createdAt: new Date().toISOString(),
    });

    console.log("User registration successful:", { fullName, email });
    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error during registration:", err); // Log the error details
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
