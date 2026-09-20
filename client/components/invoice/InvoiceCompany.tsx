interface InvoiceCompanyProps {
  companyName: string;
  address: string;
  gstNumber: string;
  phone: string;
  email: string;
  website?: string;
}

export default function InvoiceCompany({
  companyName,
  address,
  gstNumber,
  phone,
  email,
  website,
}: InvoiceCompanyProps) {
  return (
    <div className="border-2 border-black">

      <div className="bg-gray-100 border-b border-black py-2">
        <h2 className="text-center text-2xl font-bold tracking-wide">
          TAX INVOICE
        </h2>
      </div>

      <div className="p-5">

        <div className="flex justify-between items-start">

          <div>

            <h1 className="text-3xl font-bold text-blue-900">
              {companyName}
            </h1>

            <p className="mt-3 whitespace-pre-line text-sm">
              {address}
            </p>

            <p className="mt-2 text-sm">
              <strong>GSTIN :</strong> {gstNumber}
            </p>

            <p className="text-sm">
              <strong>Phone :</strong> {phone}
            </p>

            <p className="text-sm">
              <strong>Email :</strong> {email}
            </p>

            {website && (
              <p className="text-sm">
                <strong>Website :</strong> {website}
              </p>
            )}

          </div>

          <div className="text-right">

            <div className="border border-black px-6 py-4">

              <p className="font-semibold">
                ORIGINAL FOR RECIPIENT
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}