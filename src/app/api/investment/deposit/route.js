import { collection, addDoc, Timestamp } from "firebase/firestore";
import { firestore } from "@/libs/firebase";
import { NextResponse } from "next/server";

const getFutureTimestamp = (duration) => {
  const units = { secs: 1000, mins: 60000, hours: 3600000, days: 86400000 };
  const match = duration?.match(/^(\d+)(secs|mins|hours|days)$/);
  if (!match) return null;

  const [, value, unit] = match;
  return Timestamp.fromMillis(Date.now() + Number(value) * units[unit]);
};

export async function POST(req) {
  try {
    const { amount, userId } = await req.json();
    console.log("Data Seen:", amount, userId);

    // Check if amount and userId are present in the request
    if (!amount || !userId) {
      return NextResponse.json(
        { error: "Amount and User ID are required" },
        { status: 400 }
      );
    }

    // Ensure amount is a number
    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // Calculate profit
    const percentageIncrease = 2; // 2% daily increase
    const dailyProfit = (parsedAmount * 0.02).toFixed(2); // Fixed daily profit
    const totalProfit = (dailyProfit * 30).toFixed(2); // 30-day total profit
    const totalAmount = parsedAmount + Number(totalProfit); // Final amount after 30 days

    // Add deposit document to Firestore
    const docRef = await addDoc(collection(firestore, "deposits"), {
      amount: parsedAmount,
      userId,
      approvedByAdmin: false,
      percentageIncrease,
      dailyProfit,
      totalProfit,
      totalAmount,
      reInvested: false,
      withdrawalStatus: "", // IN_PROGRESS, SENT_TO_USER
      datetime: Timestamp.now(), // Set current timestamp for deposit creation
      completionDate: null, // Completion date not set yet
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
