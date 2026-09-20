interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const getClasses = () => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      case "Converted":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${getClasses()}`}
    >
      {status}
    </span>
  );
}