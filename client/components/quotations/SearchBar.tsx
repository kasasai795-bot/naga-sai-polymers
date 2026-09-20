"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by Quotation No, Customer or Company..."
        className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}