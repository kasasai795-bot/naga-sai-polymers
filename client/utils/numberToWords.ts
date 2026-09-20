const ones = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];

const tens = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

function convertBelowThousand(num: number): string {
  let str = "";

  if (num >= 100) {
    str += ones[Math.floor(num / 100)] + " Hundred ";

    num %= 100;
  }

  if (num >= 20) {
    str += tens[Math.floor(num / 10)] + " ";

    num %= 10;
  }

  if (num > 0) {
    str += ones[num] + " ";
  }

  return str.trim();
}

export function numberToWords(amount: number): string {
  if (amount === 0) return "Rupees Zero Only";

  let num = Math.floor(amount);

  let result = "";

  const crore = Math.floor(num / 10000000);

  num %= 10000000;

  const lakh = Math.floor(num / 100000);

  num %= 100000;

  const thousand = Math.floor(num / 1000);

  num %= 1000;

  const hundred = num;

  if (crore)
    result += convertBelowThousand(crore) + " Crore ";

  if (lakh)
    result += convertBelowThousand(lakh) + " Lakh ";

  if (thousand)
    result += convertBelowThousand(thousand) + " Thousand ";

  if (hundred)
    result += convertBelowThousand(hundred);

  return `Rupees ${result.trim()} Only`;
}