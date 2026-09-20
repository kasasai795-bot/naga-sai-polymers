"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { invoiceService } from "@/services/invoiceService";
import { getAuthHeaders } from "@/utils/api";
import API_BASE_URL from "@/lib/api";
import html2PDF from "jspdf-html2canvas";
import { numberToWords } from "@/utils/numberToWords";

export default function InvoicePage() {
    const downloadPDF = async () => {
  const element = document.getElementById("invoice");

  if (!element || !invoice) {
    alert("Invoice is not ready");
    return;
  }

  try {
    const buttons = element.querySelectorAll(".print\\:hidden");

    buttons.forEach((button) => {
      (button as HTMLElement).style.display = "none";
    });

    await html2PDF(element, {
      jsPDF: {
        unit: "pt",
        format: "a4",
        orientation: "portrait",
      },

      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        scrollX: 0,
        scrollY: -window.scrollY,
      },

      imageType: "image/jpeg",
      imageQuality: 0.98,

      output: `${invoice.invoiceNumber}.pdf`,
    });

    buttons.forEach((button) => {
      (button as HTMLElement).style.display = "";
    });

  } catch (error) {
    console.error("PDF Download Error:", error);

    alert("Unable to download PDF.");
  }
};
  const { id } = useParams();

  const [invoice, setInvoice] = useState<any>(null);
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchInvoice();
    }
  }, [id]);

  async function fetchInvoice() {
    try {
      const data = await invoiceService.getInvoice(Number(id));
    const settingsRes = await fetch(
  `${API_BASE_URL}/settings`,
  {
    headers: getAuthHeaders(),
  }
);
const settingsData = await settingsRes.json();

setSettings(settingsData);
      setInvoice(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading Invoice...
      </div>
    );
  }

  if (!invoice) {
    if (!settings) {
  return (
    <div className="flex justify-center items-center h-screen text-xl font-semibold">
      Loading Company Settings...
    </div>
  );
}
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Invoice Not Found
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">

      <div
        id="invoice"
        className="max-w-6xl mx-auto bg-white border border-black shadow-lg"
      >

       {/* Header */}

<div className="border-b-2 border-black bg-gray-50">

  <div className="py-2 border-b border-black">

    <h1 className="text-center text-4xl font-extrabold tracking-widest">
      TAX INVOICE
    </h1>

  </div>

  <div className="py-2">

    <p className="text-center text-sm font-semibold uppercase tracking-wider">
      Original for Recipient
    </p>

  </div>

</div>

{/* Company + Invoice Details */}

<div className="grid grid-cols-2 border-b-2 border-black">

  {/* Company */}

  <div className="border-r-2 border-black p-6">

    <div className="flex items-start gap-5">

      {settings.logo && (
        <img
          src={settings.logo}
          alt="Company Logo"
          className="w-24 h-24 object-contain"
        />
      )}

      <div>

        <h2 className="text-3xl font-bold uppercase">
          {settings.companyName}
        </h2>

        <p className="mt-3 whitespace-pre-line leading-6">
          {settings.address}
        </p>

        <div className="mt-4 space-y-1 text-sm">

          <p>
            <strong>GSTIN :</strong> {settings.gstNumber}
          </p>

          <p>
            <strong>PAN :</strong> {settings.panNumber || "-"}
          </p>

          <p>
           <strong>State :</strong> {settings.state || "-"}
          </p>

          <p>
            <strong>Phone :</strong> {settings.phone}
          </p>

          <p>
            <strong>Email :</strong> {settings.email}
          </p>

        </div>

      </div>

    </div>

  </div>

  {/* Invoice Details */}

  <div>

    <table className="w-full text-sm">

      <tbody>

        <tr>

          <td className="border-b border-black p-3 font-semibold w-40">
            Invoice No.
          </td>

          <td className="border-b border-black p-3 font-medium">
            {invoice.invoiceNumber}
          </td>

        </tr>

        <tr>

          <td className="border-b border-black p-3 font-semibold">
            Invoice Date
          </td>

          <td className="border-b border-black p-3">
            {new Date(invoice.invoiceDate).toLocaleDateString("en-IN")}
          </td>

        </tr>

        <tr>

          <td className="border-b border-black p-3 font-semibold">
            Vehicle No.
          </td>

          <td className="border-b border-black p-3">
            {invoice.vehicleNumber || "-"}
          </td>

        </tr>

        <tr>

          <td className="border-b border-black p-3 font-semibold">
            Dispatch Mode
          </td>

          <td className="border-b border-black p-3">
            {invoice.dispatchMode || "-"}
          </td>

        </tr>

        <tr>

          <td className="p-3 font-semibold">
            Payment Status
          </td>

          <td className="p-3">

            <span
              className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                invoice.paymentStatus === "Paid"
                  ? "bg-green-600"
                  : "bg-orange-500"
              }`}
            >
              {invoice.paymentStatus}
            </span>

          </td>

        </tr>

      </tbody>

    </table>

  </div>

</div>

        {/* Buyer & Consignee */}

<div className="grid grid-cols-2 border-b-2 border-black">

  {/* Buyer */}

  <div className="border-r-2 border-black">

    <div className="bg-gray-100 border-b border-black p-2">
      <h3 className="font-bold uppercase">
        Buyer (Bill To)
      </h3>
    </div>

    <div className="p-4 space-y-2 text-sm">

      <p className="font-bold text-lg">
        {invoice.customer?.customerName ||
          invoice.order?.customerName}
      </p>

      <p>
        <strong>Company :</strong>{" "}
        {invoice.customer?.companyName ||
          invoice.order?.companyName ||
          "-"}
      </p>

      <p>
        <strong>Address :</strong>{" "}
        {invoice.customer?.address || "-"}
      </p>

      <p>
        <strong>GSTIN :</strong>{" "}
        {invoice.customer?.gstNumber || "-"}
      </p>

      <p>
        <strong>Phone :</strong>{" "}
        {invoice.customer?.phone || "-"}
      </p>

      <p>
        <strong>Email :</strong>{" "}
        {invoice.customer?.email || "-"}
      </p>

    </div>

  </div>

  {/* Consignee */}

  <div>

    <div className="bg-gray-100 border-b border-black p-2">
      <h3 className="font-bold uppercase">
        Consignee (Ship To)
      </h3>
    </div>

    <div className="p-4 space-y-2 text-sm">

      <p className="font-bold text-lg">
        {invoice.customer?.customerName ||
          invoice.order?.customerName}
      </p>

      <p>
        <strong>Company :</strong>{" "}
        {invoice.customer?.companyName ||
          invoice.order?.companyName ||
          "-"}
      </p>

      <p>
        <strong>Address :</strong>{" "}
        {invoice.customer?.address || "-"}
      </p>

      <p>
        <strong>GSTIN :</strong>{" "}
        {invoice.customer?.gstNumber || "-"}
      </p>

      <p>
        <strong>Phone :</strong>{" "}
        {invoice.customer?.phone || "-"}
      </p>

      <p>
        <strong>Email :</strong>{" "}
        {invoice.customer?.email || "-"}
      </p>

    </div>

  </div>

</div>
        {/* Product Table */}

<div className="p-5">

  <table className="w-full border border-black border-collapse text-sm">

   <thead className="bg-gray-100">

  <tr>

    <th className="border border-black p-3 text-center w-16">
      S.No
    </th>

    <th className="border border-black p-3 text-left">
      Product Description
    </th>

    <th className="border border-black p-3 text-center w-28">
      HSN
    </th>

    <th className="border border-black p-3 text-center w-24">
      Qty
    </th>

    <th className="border border-black p-3 text-center w-28">
      Rate
    </th>

    <th className="border border-black p-3 text-right w-36">
      Amount
    </th>

  </tr>

</thead>

    <tbody>

     {invoice.items.map((item: any, index: number) => (

  <tr
    key={item.id}
    className="hover:bg-gray-50"
  >

    <td className="border border-black p-3 text-center">
      {index + 1}
    </td>

    <td className="border border-black p-3">

      <div className="font-semibold">
        {item.product?.name}
      </div>

      <div className="text-xs text-gray-500">
        Premium Quality Packaging
      </div>

    </td>

    <td className="border border-black p-3 text-center">
      {item.product?.hsnCode || "-"}
    </td>

    <td className="border border-black p-3 text-center">
      {item.quantity}
    </td>

    <td className="border border-black p-3 text-center">
      ₹{Number(item.unitPrice).toFixed(2)}
    </td>

    <td className="border border-black p-3 text-right font-semibold">
      ₹{Number(item.amount).toFixed(2)}
    </td>

  </tr>

))}

    </tbody>

  </table>

</div>

{/* Totals */}

<div className="flex justify-end mt-6">

  <table className="w-[420px] border-2 border-black text-sm">

    <tbody>

      <tr>
        <td className="border border-black p-3 font-semibold">
          Sub Total
        </td>

        <td className="border border-black p-3 text-right">
          ₹{Number(invoice.subtotal).toFixed(2)}
        </td>
      </tr>

      <tr>
        <td className="border border-black p-3">
          CGST (9%)
        </td>

        <td className="border border-black p-3 text-right">
          ₹{Number(invoice.cgst).toFixed(2)}
        </td>
      </tr>

      <tr>
        <td className="border border-black p-3">
          SGST (9%)
        </td>

        <td className="border border-black p-3 text-right">
          ₹{Number(invoice.sgst).toFixed(2)}
        </td>
      </tr>

      {invoice.igst > 0 && (
        <tr>
          <td className="border border-black p-3">
            IGST
          </td>

          <td className="border border-black p-3 text-right">
            ₹{Number(invoice.igst).toFixed(2)}
          </td>
        </tr>
      )}

      <tr className="bg-gray-100">

        <td className="border border-black p-3 text-lg font-bold">
          Grand Total
        </td>

        <td className="border border-black p-3 text-right text-lg font-bold">
          ₹{Number(invoice.grandTotal).toFixed(2)}
        </td>

      </tr>

    </tbody>

  </table>

</div>

{/* Amount in Words */}

<div className="border-t border-black p-5">

  <h3 className="font-semibold">
    Amount Chargeable (in words)
  </h3>

  <p className="mt-2 font-medium">
  {numberToWords(invoice.grandTotal)}
</p>

</div>

{/* PART 3 STARTS HERE */}
<div className="grid grid-cols-2 border-2 border-black border-t-0">

  {/* Left */}

  <div className="border-r border-black p-4">

    <h3 className="font-bold text-lg mb-3">
      Bank Details
    </h3>

    <table className="w-full text-sm">

      <tbody>

        <tr>
          <td className="font-semibold py-1">
            Bank
          </td>

          <td>
            {settings.bankName || "-"}
          </td>
        </tr>

        <tr>
          <td className="font-semibold py-1">
            A/C No
          </td>

          <td>
           {settings.accountNumber || "-"}
          </td>
        </tr>

        <tr>
          <td className="font-semibold py-1">
            IFSC
          </td>

          <td>
            {settings.ifscCode || "-"}
          </td>
        </tr>

        <tr>
          <td className="font-semibold py-1">
            Branch
          </td>

          <td>
            {settings.branch || "-"}
          </td>
        </tr>

      </tbody>

    </table>

    <div className="mt-6">

      <h3 className="font-bold mb-2">
        Declaration
      </h3>

      <p className="text-xs leading-6">
  {settings.declaration ||
    "We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct."}
</p>

    </div>

  </div>

  {/* Right */}

  <div className="p-4 flex flex-col justify-between">

    <div>

      <h3 className="font-bold text-lg text-right">
        For {settings.companyName}
      </h3>

    </div>

    <div className="h-24" />

    <div>

      <p className="text-right font-semibold">
       {settings.authorizedSign || "Authorised Signatory"}
      </p>

    </div>

  </div>

</div>

{/* Footer */}

<div className="border-t border-black">

  <div className="text-center py-3 text-sm font-semibold">

    SUBJECT TO HYDERABAD JURISDICTION

  </div>

  <div className="text-center text-xs pb-5">

    This is a Computer Generated Invoice

  </div>

</div>

{/* Buttons */}

<div className="flex justify-end gap-4 p-6 print:hidden">

  <button
    onClick={downloadPDF}
    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
  >
    Download PDF
  </button>

  <button
    onClick={() => window.print()}
    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
  >
    Print Invoice
  </button>

</div>

  

</div>

</div>

  );
}