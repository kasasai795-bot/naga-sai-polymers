import { Phone, Mail, MapPin } from "lucide-react";

export default function TopBar() {
  return (
    <div className="bg-[#072F70] text-white text-sm">

      <div className="max-w-7xl mx-auto px-6 py-2 flex flex-wrap justify-between items-center">

        <div className="flex items-center gap-2">
          <Phone size={15} className="text-orange-400" />
          <span>+91 9177844081</span>
        </div>

        <div className="flex items-center gap-2">
          <Mail size={15} className="text-orange-400" />
          <span>nagasainewpolymers@gmail.com</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={15} className="text-orange-400" />
          <span>Hyderabad, Telangana</span>
        </div>

      </div>

    </div>
  );
}