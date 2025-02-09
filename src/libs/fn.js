export const ToDate = (timestamp) => {
  if (
    !timestamp ||
    typeof timestamp.seconds !== "number" ||
    typeof timestamp.nanoseconds !== "number"
  ) {
    return "Invalid timestamp";
  }

  const milliseconds =
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
  const finaldate = new Date(milliseconds);
  return finaldate.toLocaleString();
};

export const MyDate = (timestamp) => {
  const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
  const finaldate = new Date(milliseconds);
  return finaldate
}

export const prettifyAmountInNaira = (amount) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    //   maximumFractionDigits: 0,
  }).format(amount);
};

export const banks = [
  "Access Bank Plc",
  "CashX",
  "Citibank Nigeria Ltd",
  "Dot Microfinance Bank",
  "Ecobank Nigeria Plc",
  "FairMoney Microfinance Bank",
  "Fidelity Bank Plc",
  "First Bank Nigeria Ltd",
  "First City Monument Bank Plc",
  "Globus Bank Ltd",
  "Guaranty Trust Bank Plc",
  "Keystone Bank Ltd",
  "Kuda Bank",
  "Mint Finex MFB",
  "Mkobo MFB",
  "Moniepoint Microfinance Bank",
  "Nova Commercial Bank Ltd",
  "Opay",
  "Optimus Bank",
  "Palmpay",
  "Parallex Bank Ltd",
  "Polaris Bank Plc",
  "Premium Trust Bank",
  "Providus Bank Ltd",
  "Pryme App",
  "Raven Bank",
  "Rex Microfinance Bank",
  "Rubies Bank",
  "Signature Bank Ltd",
  "Sparkle Bank",
  "Stanbic IBTC Bank Plc",
  "Standard Chartered Bank Nigeria Ltd",
  "Sterling Bank Plc",
  "SunTrust Bank Nigeria Ltd",
  "Titan Trust Bank Ltd",
  "Union Bank of Nigeria Plc",
  "United Bank For Africa Plc",
  "Unity Bank Plc",
  "VFD Microfinance Bank",
  "Wema Bank Plc",
  "Zenith Bank Plc",
];















