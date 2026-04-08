import Navbar from "../components/frontend/Navbar";
import Footer from "../components/frontend/Footer";
import Link from "next/link";

export const metadata = {
  title: "Tour Categories — Stay Vacation",
  description: "Browse our travel packages by category — Beach, Adventure, Heritage, Honeymoon, Family tours and more.",
};

const CATEGORIES = [
  {
    label: "Beach & Islands",
    icon: "🏖️",
    slug: "Beach",
    count: "Bali · Maldives · Goa · Phuket",
    description: "Crystal-clear waters, powdery white sands, and coral reefs waiting to be explored.",
    color: "from-sky-500 to-blue-700",
    lightColor: "bg-sky-50",
    textColor: "text-sky-700",
    packages: 12,
  },
  {
    label: "Heritage & Culture",
    icon: "🏛️",
    slug: "Heritage",
    count: "Rajasthan · Rome · Istanbul · Kyoto",
    description: "Step back in time through ancient palaces, magnificent temples, and living heritage sites.",
    color: "from-amber-500 to-orange-700",
    lightColor: "bg-amber-50",
    textColor: "text-amber-700",
    packages: 9,
  },
  {
    label: "Adventure Sports",
    icon: "🧗",
    slug: "Adventure%20Sports",
    count: "Himachal · Rishikesh · New Zealand",
    description: "Adrenaline-charged experiences from white-water rafting to skydiving and trekking.",
    color: "from-emerald-500 to-teal-700",
    lightColor: "bg-emerald-50",
    textColor: "text-emerald-700",
    packages: 7,
  },
  {
    label: "Wildlife & Nature",
    icon: "🦁",
    slug: "Wildlife",
    count: "Kenya · Ranthambore · Amazon",
    description: "Get up close with the world's most spectacular wildlife in their natural habitats.",
    color: "from-lime-500 to-green-700",
    lightColor: "bg-lime-50",
    textColor: "text-lime-700",
    packages: 8,
  },
  {
    label: "Honeymoon",
    icon: "💑",
    slug: "Honeymoon",
    count: "Maldives · Paris · Santorini · Bali",
    description: "Romantic escapes designed for couples — private villas, candlelit dinners, and more.",
    color: "from-rose-500 to-pink-700",
    lightColor: "bg-rose-50",
    textColor: "text-rose-700",
    packages: 14,
  },
  {
    label: "Family Tours",
    icon: "👨‍👩‍👧",
    slug: "Family",
    count: "Singapore · Thailand · Goa · Kerala",
    description: "Child-friendly adventures that create memories the whole family will cherish forever.",
    color: "from-violet-500 to-purple-700",
    lightColor: "bg-violet-50",
    textColor: "text-violet-700",
    packages: 10,
  },
  {
    label: "Relaxation & Wellness",
    icon: "🧘",
    slug: "Relaxation",
    count: "Kerala · Bali · Coorg · Thailand",
    description: "Rejuvenating retreats with yoga, Ayurveda, spa treatments, and peaceful surroundings.",
    color: "from-teal-500 to-cyan-700",
    lightColor: "bg-teal-50",
    textColor: "text-teal-700",
    packages: 6,
  },
  {
    label: "Religious & Spiritual",
    icon: "🕌",
    slug: "Religious",
    count: "Varanasi · Tirupati · Shirdi · Amritsar",
    description: "Sacred journeys to holy sites — finding peace, purpose, and divine connection.",
    color: "from-yellow-500 to-amber-700",
    lightColor: "bg-yellow-50",
    textColor: "text-yellow-700",
    packages: 5,
  },
  {
    label: "Culinary Tours",
    icon: "🍜",
    slug: "Culinary",
    count: "Italy · Japan · India · Morocco",
    description: "A feast for the senses — cooking classes, local markets, and iconic food trails.",
    color: "from-orange-500 to-red-700",
    lightColor: "bg-orange-50",
    textColor: "text-orange-700",
    packages: 4,
  },
];

export default function CategoriesPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="hero-bg pt-32 pb-20 text-center">
        <div className="container-sv">
          <p className="text-[#2fa3f2] font-semibold text-sm uppercase tracking-widest mb-4">Browse by interest</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            Tour Categories
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            From sun-soaked beaches to spiritual pilgrimages — find your perfect travel style.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 50C120 40 240 22 360 18C480 14 600 22 720 26C840 32 960 36 1080 36C1200 36 1320 28 1380 24L1440 22V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="section-pad bg-white">
        <div className="container-sv">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat, i) => (
              <Link
                key={cat.label}
                href={`/packages?type=${cat.slug}`}
                className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-[#1a3f4e]/10 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Top gradient banner */}
                <div className={`h-28 bg-gradient-to-r ${cat.color} flex items-center justify-between px-6`}>
                  <div>
                    <h2 className="text-white font-bold text-lg">{cat.label}</h2>
                    <p className="text-white/70 text-xs mt-1">{cat.count}</p>
                  </div>
                  <div className="text-5xl">{cat.icon}</div>
                </div>

                {/* Bottom content */}
                <div className="p-5 bg-white">
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{cat.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${cat.lightColor} ${cat.textColor}`}>
                      {cat.packages} Packages
                    </span>
                    <span className="text-[#2fa3f2] text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Explore
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#F4F9E9]">
        <div className="container-sv text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1a3f4e] mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">
            Our travel experts can craft a completely custom itinerary based on your preferences, budget, and travel dates.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a3f4e] text-white font-bold rounded-xl hover:bg-[#2a5f74] hover:-translate-y-0.5 transition-all"
          >
            Request Custom Package
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
