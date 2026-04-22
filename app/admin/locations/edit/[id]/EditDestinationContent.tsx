"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DestinationForm, Destination, useStore, Ic, Btn } from "../../../../components/AdminCore";

export default function EditDestinationContent({ id }: { id: string }) {
  const router = useRouter();
  const { destinations, setDestinations } = useStore();
  const [dest, setDest] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // 1. Try to find in store first
    const existing = destinations.find(d => d._id === id);
    if (existing) {
      setDest(existing);
      setLoading(false);
      return;
    }

    // 2. Otherwise fetch from API
    const fetchDest = async () => {
      try {
        const res = await fetch(`/api/destinations?id=${id}`);
        const result = await res.json();
        if (result.success) {
          setDest(result.data);
        } else {
          setError(result.message || "Destination not found");
        }
      } catch (err) {
        setError("Failed to load destination");
        console.error("FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDest();
  }, [id, destinations]);

  const handleSave = async (data: Destination) => {
    setSaving(true);
    try {
      const res = await fetch("/api/destinations", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        setDestinations(p => p.map(d => d._id === data._id ? data : d));
        setSaved(true);
        setTimeout(() => {
          router.push("/admin/locations");
        }, 1500);
      } else {
        alert("Failed to save changes");
      }
    } catch (err) {
      console.error("SAVE ERROR:", err);
      alert("Error saving changes");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center">
        <div className="inline-block animate-spin text-blue-600 mb-4"><Ic.Globe /></div>
        <p className="text-gray-500">Loading destination data...</p>
      </div>
    );
  }

  if (error || !dest) {
    return (
      <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Destination Not Found</h2>
        <p className="text-gray-500 mt-2">{error || "The requested destination could not be found."}</p>
        <Btn className="mt-6" onClick={() => router.push("/admin/locations")}>
          <Ic.Back /> Back to Locations
        </Btn>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-2">
        <button 
          onClick={() => router.push("/admin/locations")}
          className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
        >
          <Ic.Back />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Edit Destination</h2>
          <p className="text-gray-500 mt-0.5">Update details for {dest.name}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden relative">
        {/* Success Overlay */}
        {saved && (
          <div className="absolute inset-0 z-10 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mb-4 animate-in zoom-in duration-500 scale-110">
              <Ic.Check />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Changes Saved!</h3>
            <p className="text-gray-500 mt-1">Redirecting you back to locations...</p>
          </div>
        )}

        {/* Saving Overlay */}
        {saving && (
          <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-[1px] flex items-center justify-center">
            <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-xl shadow-xl border border-gray-100">
              <div className="animate-spin text-blue-600"><Ic.Sync /></div>
              <span className="font-bold text-gray-900">Saving changes...</span>
            </div>
          </div>
        )}

        <DestinationForm 
          key={dest._id}
          initial={dest} 
          onSave={handleSave} 
          onCancel={() => router.push("/admin/locations")} 
        />
      </div>
    </div>
  );
}
