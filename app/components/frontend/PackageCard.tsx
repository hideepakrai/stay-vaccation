import Link from "next/link";

interface Package {
  id: string;
  title: string;
  destination: string;
  tripDuration: string;
  travelStyle: string;
  tourType: string;
  exclusivityLevel: string;
  price: { currency: string; amount: number | string };
  shortDescription: string;
  inclusions?: string[];
  itinerary?: any[];
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  INR: "₹", USD: "$", EUR: "€", GBP: "£", AED: "د.إ", SGD: "S$", AUD: "A$", THB: "฿",
};

const STYLE_COLORS: Record<string, string> = {
  Luxury: "bg-amber-100 text-amber-800",
  Premium: "bg-purple-100 text-purple-800",
  Budget: "bg-green-100 text-green-800",
  Adventure: "bg-orange-100 text-orange-800",
  "Cultural Immersion": "bg-blue-100 text-blue-800",
  Family: "bg-pink-100 text-pink-800",
  "Group Tour": "bg-teal-100 text-teal-800",
};

export default function PackageCard({ pkg, index = 0 }: { pkg: Package; index?: number }) {
  const sym = CURRENCY_SYMBOLS[pkg.price?.currency] || pkg.price?.currency || "₹";
  const amount = typeof pkg.price?.amount === "number"
    ? pkg.price.amount.toLocaleString()
    : pkg.price?.amount;
  const days = pkg.tripDuration?.match(/^(\d+)/)?.[1] || "—";
  const nights = pkg.tripDuration?.match(/(\d+)\s*Night/i)?.[1] || String(Number(days) - 1);
  const styleColor = STYLE_COLORS[pkg.travelStyle] || "bg-sky-100 text-sky-800";

  // Use first itinerary image or a gradient placeholder
  const hasImage = false; // will extend later with real images

  return (
    <Link
      href={`/packages/${pkg.id}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-[#1a3f4e]/10 transition-all duration-300 hover:-translate-y-1"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image area */}
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[#1a3f4e] via-[#2a5f74] to-[#1a7abf]">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 400 200" fill="none">
            <circle cx="300" cy="50" r="120" stroke="white" strokeWidth="0.5" />
            <circle cx="100" cy="180" r="80" stroke="white" strokeWidth="0.5" />
            <circle cx="350" cy="150" r="60" stroke="white" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Destination badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {pkg.destination}
        </div>

        {/* Duration chip */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#1a3f4e] text-xs font-bold px-2.5 py-1 rounded-full">
          {days}D / {nights}N
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <h3 className="text-white font-bold text-base leading-tight line-clamp-2 group-hover:text-[#2fa3f2] transition-colors">
            {pkg.title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${styleColor}`}>
            {pkg.travelStyle}
          </span>
          {pkg.tourType && (
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
              {pkg.tourType}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4">
          {pkg.shortDescription}
        </p>

        {/* Footer */}
        <div className="flex items-end justify-between pt-3 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Starting from</p>
            <p className="text-xl font-bold text-[#1a3f4e]">
              {sym}<span>{amount}</span>
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[#2fa3f2] group-hover:translate-x-1 transition-transform duration-200">
            <span className="text-xs font-semibold">View Details</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
