import { NextResponse } from "next/server";
import { firestore } from "@/libs/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const toDate = (timestamp) =>
  timestamp?.seconds
    ? new Date(timestamp.seconds * 1000 + (timestamp.nanoseconds || 0) / 1e6)
    : null;
const processInvestments = (investments, durationMs) =>
  investments.filter(
    ({ datetime, completionDate, id, withdrawalStatus, reInvested }) => {
      const start = toDate(datetime),
        end = toDate(completionDate);
      if (!start || !end) return false;

      const timeDiffMillis = end - start;
      console.log(
        `ID: ${id}, Days: ${timeDiffMillis / 86400000}, Secs: ${
          timeDiffMillis / 1000
        }`
      );

      return timeDiffMillis >= durationMs || timeDiffMillis / 1000 >= 3;
    }
  );

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const duration = searchParams.get("duration") || "30d";

    if (!userId)
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );

    const durationMs = duration.endsWith("s")
      ? parseInt(duration) * 1000
      : parseInt(duration) * 86400000;

    console.log(
      `User: ${userId}, Duration: ${duration}, Converted: ${durationMs}ms`
    );

    const investmentsQuery = query(
      collection(firestore, "deposits"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(investmentsQuery);
    const investments = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(`Fetched: ${investments.length} investments`);

    const completedInvestments = processInvestments(investments, durationMs);
    const activeInvestments = investments.filter(
      (inv) =>
        !completedInvestments.includes(inv) && inv.approvedByAdmin === true
    );

    console.log(
      `✅ Completed: ${completedInvestments.length}, ⏳ Active: ${activeInvestments.length}`
    );

    // Balance calculations
    const bal1 = completedInvestments.reduce(
      (sum, inv) =>
        inv?.reInvested ||
        inv.withdrawalStatus === "IN_PROGRESS" ||
        inv.withdrawalStatus === "SENT_TO_USER"
          ? sum
          : sum + Number(inv.totalAmount || 0),
      0
    );

    const bal2 = activeInvestments[0];

    // Data level 2 calculations
    const totalInvestments = completedInvestments.length;
    const totalEarnings = completedInvestments.reduce(
      (sum, inv) =>
        inv?.reInvested ? sum : sum + Number(inv.totalProfit || 0),
      0
    );
    const activeInvestmentCount = activeInvestments.length;

    // Transaction details ordered by date
    const transactions = [...completedInvestments, ...activeInvestments].sort(
      (a, b) => toDate(b.datetime) - toDate(a.datetime)
    );

    return NextResponse.json(
      {
        balance: { bal1, bal2 },
        dataLevel2: {
          totalInvestments,
          totalEarnings,
          activeInvestments: activeInvestmentCount,
        },
        transactions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
