"use client";
import { useState } from "react";
import Navbar from "../components/frontend/Navbar";
import Footer from "../components/frontend/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", destination: "", travelDate: "", adults: "2", message: ""
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const upd = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate submit (replace with real API call)
    await new Promise(r => setTimeout(r, 1200));
    setSent(true);
    setSending(false);
  };

  const CONTACT_INFO = [
    { icon: "📍", label: "Visit Us", value: "123 Travel Lane, Mumbai, India 400001", sub: "Mon–Sat 9am – 6pm" },
    { icon: "📞", label: "Call Us", value: "+91 98765 43210", sub: "Support available daily" },
    { icon: "✉️", label: "Email Us", value: "hello@stayvacation.com", sub: "We reply within 24 hours" },
    { icon: "💬", label: "WhatsApp", value: "+91 98765 43210", sub: "Quick response guaranteed" },
  ];

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="hero-bg pt-32 pb-20 text-center">
        <div className="container-sv">
          <p className="text-[#2fa3f2] font-semibold text-sm uppercase tracking-widest mb-4">Get in touch</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-5">Contact Us</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Have a question or want to plan your dream trip? Our travel experts are here to help.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="section-pad bg-gray-50">
        <div className="container-sv">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Contact info */}
            <div className="space-y-5">
              {CONTACT_INFO.map(info => (
                <div
                  key={info.label}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className="text-3xl">{info.icon}</div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">{info.label}</p>
                    <p className="font-bold text-[#1a3f4e] text-sm">{info.value}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{info.sub}</p>
                  </div>
                </div>
              ))}

              {/* Social */}
              <div className="bg-[#1a3f4e] rounded-2xl p-6 text-white">
                <p className="font-bold text-sm mb-3">Follow Our Journeys</p>
                <div className="flex gap-3">
                  {["Instagram", "Facebook", "YouTube"].map(s => (
                    <button key={s} className="flex-1 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium transition-colors">{s}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Enquiry Form */}
            <div className="lg:col-span-2">
              {sent ? (
                <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center h-full flex flex-col items-center justify-center">
                  <div className="text-6xl mb-5">🎉</div>
                  <h2 className="font-display text-2xl font-bold text-[#1a3f4e] mb-3">Enquiry Sent!</h2>
                  <p className="text-gray-500 text-sm max-w-sm leading-relaxed mb-6">
                    Thank you, <strong>{form.name}</strong>! Our travel expert will reach out to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", destination: "", travelDate: "", adults: "2", message: "" }); }}
                    className="px-8 py-3 bg-[#2fa3f2] text-white font-bold rounded-xl text-sm hover:-translate-y-0.5 transition-all"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold text-[#1a3f4e] mb-2">Plan Your Trip</h2>
                  <p className="text-gray-400 text-sm mb-7">Fill in the details below and we'll craft a personalised itinerary for you.</p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Full Name *</label>
                        <input
                          required value={form.name} onChange={e => upd("name", e.target.value)}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#2fa3f2] focus:ring-2 focus:ring-[#2fa3f2]/10 transition-all placeholder:text-gray-300"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Email Address *</label>
                        <input
                          required type="email" value={form.email} onChange={e => upd("email", e.target.value)}
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#2fa3f2] focus:ring-2 focus:ring-[#2fa3f2]/10 transition-all placeholder:text-gray-300"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Phone Number</label>
                        <input
                          type="tel" value={form.phone} onChange={e => upd("phone", e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#2fa3f2] focus:ring-2 focus:ring-[#2fa3f2]/10 transition-all placeholder:text-gray-300"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">No. of Travellers</label>
                        <select
                          value={form.adults} onChange={e => upd("adults", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#2fa3f2] focus:ring-2 focus:ring-[#2fa3f2]/10 transition-all bg-white cursor-pointer"
                        >
                          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"].map(n => (
                            <option key={n} value={n}>{n} Traveller{n !== "1" ? "s" : ""}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Destination</label>
                        <input
                          value={form.destination} onChange={e => upd("destination", e.target.value)}
                          placeholder="e.g. Bali, Rajasthan, Maldives"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#2fa3f2] focus:ring-2 focus:ring-[#2fa3f2]/10 transition-all placeholder:text-gray-300"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Preferred Travel Date</label>
                        <input
                          type="date" value={form.travelDate} onChange={e => upd("travelDate", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#2fa3f2] focus:ring-2 focus:ring-[#2fa3f2]/10 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Your Message</label>
                      <textarea
                        rows={5} value={form.message} onChange={e => upd("message", e.target.value)}
                        placeholder="Tell us about your dream trip — budget, interests, special requirements…"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#2fa3f2] focus:ring-2 focus:ring-[#2fa3f2]/10 transition-all resize-none placeholder:text-gray-300"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full py-4 bg-[#1a3f4e] hover:bg-[#2a5f74] text-white font-bold rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      {sending ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending Enquiry…
                        </span>
                      ) : "Send Enquiry →"}
                    </button>

                    <p className="text-gray-400 text-xs text-center">
                      By submitting, you agree to our privacy policy. We never share your details.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="h-80 bg-gradient-to-br from-[#1a3f4e] to-[#2a5f74] flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-5xl mb-3">🗺️</div>
          <p className="font-bold text-lg">Visit Our Office</p>
          <p className="text-white/60 text-sm mt-1">123 Travel Lane, Mumbai, India 400001</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
