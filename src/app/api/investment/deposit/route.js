import { collection, addDoc, Timestamp } from "firebase/firestore";
import { firestore } from "@/libs/firebase";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { amount, userId, file } = await req.json();
    console.log("Data Seen:", amount, userId);

    if (!amount || !userId) {
      return NextResponse.json({ error: "Amount and User ID are required" }, { status: 400 });
    }

    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // Calculate profit
    const percentageIncrease = 2; // 2% daily increase
    const dailyProfit = (parsedAmount * 0.02).toFixed(2);
    const totalProfit = (dailyProfit * 30).toFixed(2);
    const totalAmount = parsedAmount + Number(totalProfit);

    // Save deposit in Firestore
    const docRef = await addDoc(collection(firestore, "deposits"), {
      amount: parsedAmount,
      userId,
      approvedByAdmin: false,
      percentageIncrease,
      dailyProfit,
      totalProfit,
      totalAmount,
      reInvested: false,
      withdrawalStatus: "",
      datetime: Timestamp.now(),
      completionDate: null,
      fileBase64: file, // Store only Base64 (compressed)
    });

    return NextResponse.json(
      {
        message: "Deposit order created",
        id: docRef.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
