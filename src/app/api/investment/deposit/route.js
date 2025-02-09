import {
  collection,
  addDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { firestore } from "@/libs/firebase";
import { NextResponse } from "next/server";
import Withdraw from "@/app/withdraw/page";

const getFutureTimestamp = (duration) => {
  const units = { secs: 1000, mins: 60000, hours: 3600000, days: 86400000 };
  const [, value, unit] = duration.match(/^(\d+)(secs|mins|hours|days)$/) || [];
  return value ? Timestamp.fromMillis(Date.now() + value * units[unit]) : null;
};

export async function POST(req) {
  try {
    const { amount, userId } = await req.json();
    console.log("Data Seen:", amount, userId);

    if (!amount || !userId) {
      return NextResponse.json(
        { error: "Amount and User ID are required" },
        { status: 400 }
      );
    }
    const percentageIncrease = 2; // 2% daily increase

    const dailyProfit = (amount * 0.02).toFixed(2); // Fixed daily profit
    const totalProfit = (dailyProfit * 30).toFixed(2); // 30-day total profit
    const totalAmount = Number(amount) + Number(totalProfit); // Final amount after 30 days

    const docRef = await addDoc(collection(firestore, "deposits"), {
      amount,
      userId,
      approvedByAdmin: false,
      percentageIncrease,
      dailyProfit,
      totalProfit,
      totalAmount,
      reInvested: false,
      withdrawalStatus: "", // IN_PROGRESS , SENT_TO_USER
      datetime: null,
      completionDate: null,
    });

    return NextResponse.json(
      {
        message: "Deposit order created",
        id: docRef.id,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
