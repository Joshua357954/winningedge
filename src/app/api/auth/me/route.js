import { cookies } from "next/headers";
import { firestore } from "@/libs/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
  const session = cookies().get("session")?.value;
  if (!session) return NextResponse.json({ user: null });

  const userRef = doc(firestore, "users", session);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) return NextResponse.json({ user: null });

  return NextResponse.json({ user: userSnap.data() });
}
