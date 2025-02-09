import {
    collection,
    addDoc,
    doc,
    getDoc,
    updateDoc,
    serverTimestamp,
    Timestamp,
  } from "firebase/firestore";
  import { firestore } from "@/libs/firebase";
  import { NextResponse } from "next/server";
  
  export async function POST(req) {
    try {
      const { depositId } = await req.json();
      
      if (!depositId) {
        return NextResponse.json({ error: "Deposit ID is required" }, { status: 400 });
      }
  
      // Fetch the old deposit
      const depositRef = doc(firestore, "deposits", depositId);
      const depositSnap = await getDoc(depositRef);
  
      if (!depositSnap.exists()) {
        return NextResponse.json({ error: "Deposit not found" }, { status: 404 });
      }
  
      const oldDeposit = depositSnap.data();
  
      if (oldDeposit.reInvested) {
        return NextResponse.json({ error: "Deposit has already been reinvested" }, { status: 400 });
      }
  
      const amount = Number(oldDeposit.totalAmount); // Use totalAmount from the old deposit
      const percentageIncrease = 2; // 2% daily increase
      const dailyProfit = (amount * 0.02).toFixed(2);
      const totalProfit = (dailyProfit * 30).toFixed(2);
      const totalAmount = Number(amount) + Number(totalProfit);
  
      // Create a new deposit
      const newDepositRef = await addDoc(collection(firestore, "deposits"), {
        amount,
        userId: oldDeposit.userId,
        approvedByAdmin: false,
        percentageIncrease,
        dailyProfit,
        totalProfit,
        totalAmount,
        reInvested: false,
        withdrawalStatus: "",
        datetime: serverTimestamp(),
        completionDate: getFutureTimestamp("30secs"),
      });
  
      // Update the old deposit to mark it as reinvested
      await updateDoc(depositRef, {
        reInvested: true,
      });
  
      return NextResponse.json(
        {
          message: "Reinvestment successful",
          newDepositId: newDepositRef.id,
        },
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  
  // Function to calculate future timestamp
  const getFutureTimestamp = (duration) => {
    const units = { secs: 1000, mins: 60000, hours: 3600000, days: 86400000 };
    const [, value, unit] = duration.match(/^(\d+)(secs|mins|hours|days)$/) || [];
    return value ? Timestamp.fromMillis(Date.now() + value * units[unit]) : null;
  };
  