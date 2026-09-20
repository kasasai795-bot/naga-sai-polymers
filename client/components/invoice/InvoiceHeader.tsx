interface InvoiceHeaderProps {
  companyName: string;
  address: string;
  gstNumber: string;
  phone: string;
  email: string;
  website?: string;
}

export default function InvoiceHeader({
  companyName,
  address,
  gstNumber,
  phone,
  email,
  website,
}: InvoiceHeaderProps) {
  return (
    <div className="border-b-2 border-black pb-6">

      <div className="flex justify-between items-start">

        <div>

          <h1 className="text-3xl font-bold text-blue-900">
            {companyName}
          </h1>

          <p className="mt-2 text-sm whitespace-pre-line">
            {address}
          </p>

          <p className="mt-1 text-sm">
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

          <h2 className="text-4xl font-bold tracking-wide">
            TAX INVOICE
          </h2>

          <p className="text-sm mt-2">
            ORIGINAL FOR RECIPIENT
          </p>

        </div>

      </div>

    </div>
  );
}