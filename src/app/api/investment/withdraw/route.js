import { firestore } from "@/libs/firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { account_name, amount, account_number, bank_name, userId, depositId } =
    await req.json();

  try {
    // Add withdrawal request to Firestore
    const docRef = await addDoc(collection(firestore, "withdrawals"), {
      account_name,
      account_number,
      amount,
      bank_name,
      user_id: userId,
      deposit_id: depositId,
      status: "pending",
      disbursementTime: "",
      created_at: new Date().toISOString(),
    });

    // Reference to the document in the "deposits" collection using depositId
    const depositRef = doc(firestore, "deposits", depositId);

    // Update the withdrawalStatus field to "IN_PROGRESS"
    await updateDoc(depositRef, {
      withdrawalStatus: "IN_PROGRESS",
    });

    return NextResponse.json(
      { message: "Withdrawal request created", data: docRef.id },
      { status: 201 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
