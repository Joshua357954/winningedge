//(GET) type (deposit or withdraw) 

import { firestore } from "@/libs/firebase";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";
import { NextResponse } from "next/server";


export async function GET(req) {
  try {
    // Get userId from the query parameters or headers (adjust this as needed)
    const { userId } = req.nextUrl.searchParams;

    // Define queries for deposits and withdrawals
    const depositsQuery = query(
      collection(firestore, "deposits"),
      orderBy("datetime", "desc"),
      where("userId", "==", userId)
    );

    const withdrawalsQuery = query(
      collection(firestore, "withdrawals"),
      orderBy("datetime", "desc"),
      where("userId", "==", userId)
    );

    // Fetch the data from Firestore
    const depositsSnapshot = await getDocs(depositsQuery);
    const withdrawalsSnapshot = await getDocs(withdrawalsQuery);

    // Format the results
    const deposits = depositsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const withdrawals = withdrawalsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(withdrawals,deposits)

    // Combine both arrays and sort by datetime
    const transactions = [...deposits, ...withdrawals].sort((a, b) => {
      const dateA = a.datetime?.seconds ? a.datetime.seconds * 1000 : 0;
      const dateB = b.datetime?.created_at ? b.created_at.seconds * 1000 : 0;
      return dateB - dateA; // Sort by descending datetime
    });

    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
