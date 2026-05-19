"use client";

import React, { useState, useEffect } from "react";
import { Card, Inp, TA, FL, Btn, Ic, Sel } from "../../../../components/AdminCore";

interface PackageInfo {
  id: string;
  packageId: string;
  title: string;
  tripDuration?: string;
  price?: {
    amount: number;
    currency: string;
  };
}

interface FeaturedPackagesData {
  sectionTitle: string;
  sectionSubtitle: string;
  selectedPackages: string[];
  isActive: boolean;
  displayOrder: number;
}

export default function FeaturedPackagesEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [packages, setPackages] = useState<PackageInfo[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [data, setData] = useState<FeaturedPackagesData>({
    sectionTitle: "",
    sectionSubtitle: "",
    selectedPackages: [],
    isActive: true,
    displayOrder: 1,
  });

  // Fetch all packages and current featured settings on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pkgRes, cmsRes] = await Promise.all([
          fetch("/api/packages").then((res) => res.json()),
          fetch("/api/page-cms/featured-packages").then((res) => res.json()),
        ]);

        if (pkgRes.success) {
          setPackages(pkgRes.data || []);
        }
        if (cmsRes.success) {
          setData(cmsRes.data);
        }
      } catch (err) {
        console.error("Error loading editor data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/page-cms/featured-packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        alert("Featured packages saved successfully!");
      } else {
        alert("Error saving: " + result.message);
      }
    } catch (err) {
      alert("Network error while saving settings.");
    } finally {
      setSaving(false);
    }
  };

  const movePackage = (index: number, direction: number) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= data.selectedPackages.length) return;
    
    const list = [...data.selectedPackages];
    const temp = list[index];
    list[index] = list[newIndex];
    list[newIndex] = temp;
    
    setData((prev) => ({
      ...prev,
      selectedPackages: list,
    }));
  };

  const removePackage = (idToRemove: string) => {
    setData((prev) => ({
      ...prev,
      selectedPackages: prev.selectedPackages.filter((id) => id !== idToRemove),
    }));
  };

  const addPackage = (idToAdd: string) => {
    if (!idToAdd) return;
    if (data.selectedPackages.includes(idToAdd)) return;

    setData((prev) => ({
      ...prev,
      selectedPackages: [...prev.selectedPackages, idToAdd],
    }));
  };

  // Filter package options based on search query and already selected ones
  const unselectedPackages = packages.filter(
    (pkg) => !data.selectedPackages.includes(pkg.id)
  );

  const filteredUnselectedPackages = unselectedPackages.filter((pkg) => {
    const q = searchQuery.toLowerCase();
    return (
      pkg.title.toLowerCase().includes(q) ||
      pkg.packageId.toLowerCase().includes(q)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20">
      {/* Header and Quick Save */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Homepage Featured Packages</h2>
          <p className="text-gray-500 text-sm">Curate and order top packages to highlight on the homepage</p>
        </div>
        <Btn variant="success" size="lg" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : <><Ic.Check /> Save Changes</>}
        </Btn>
      </div>

      {/* Basic Settings Card */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-50 pb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Ic.Document />
          </div>
          <h3 className="font-bold text-lg text-gray-900">Section Header details</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <FL required>Section Title</FL>
            <Inp
              value={data.sectionTitle}
              onChange={(e) => setData((prev) => ({ ...prev, sectionTitle: e.target.value }))}
              placeholder="e.g. Featured Escape Packages"
            />
          </div>

          <div className="md:col-span-2">
            <FL required>Section Subtitle</FL>
            <TA
              value={data.sectionSubtitle}
              onChange={(e) => setData((prev) => ({ ...prev, sectionSubtitle: e.target.value }))}
              placeholder="Provide a small catchphrase explaining these curated experiences..."
              rows={2}
            />
          </div>

          <div>
            <FL required>Display Order</FL>
            <Inp
              type="number"
              min="1"
              value={data.displayOrder}
              onChange={(e) => setData((prev) => ({ ...prev, displayOrder: parseInt(e.target.value) || 1 }))}
              placeholder="1"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 self-end h-10.5">
            <div>
              <p className="font-bold text-gray-900 text-sm">Is Active</p>
              <p className="text-[10px] text-gray-400">Toggle whether this section appears on the homepage</p>
            </div>
            <label className="flex items-center gap-2 cursor-pointer group">
              <div
                onClick={() => setData((prev) => ({ ...prev, isActive: !prev.isActive }))}
                className={`w-10 h-5 rounded-full relative transition-all ${
                  data.isActive ? "bg-emerald-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${
                    data.isActive ? "right-1" : "left-1"
                  }`}
                />
              </div>
            </label>
          </div>
        </div>
      </Card>

      {/* Package Selection Card */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-50 pb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Ic.Package />
          </div>
          <h3 className="font-bold text-lg text-gray-900">Featured Packages Selection</h3>
        </div>

        <div className="space-y-6">
          {/* Selector Dropdown / Search */}
          <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 space-y-3">
            <FL>Add Package to Showcase</FL>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Ic.Search />
                </div>
                <Inp
                  className="pl-9"
                  placeholder="Filter available packages by title or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="w-full sm:w-64">
                <Sel
                  placeholder={
                    filteredUnselectedPackages.length === 0
                      ? "No other packages matching query"
                      : "Choose package to add..."
                  }
                  options={filteredUnselectedPackages.map((pkg) => ({
                    label: `${pkg.title} (${pkg.packageId})`,
                    value: pkg.id,
                  }))}
                  value=""
                  onChange={(e) => {
                    addPackage(e.target.value);
                    setSearchQuery("");
                  }}
                  disabled={filteredUnselectedPackages.length === 0}
                />
              </div>
            </div>
          </div>

          {/* List of Selected Packages */}
          <div>
            <FL>Selected Packages ({data.selectedPackages.length})</FL>
            {data.selectedPackages.length === 0 ? (
              <div className="text-center p-12 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/30">
                <p className="text-gray-400 text-sm">No packages selected yet.</p>
                <p className="text-xs text-gray-400/80 mt-1">Select one from the dropdown above to add it to the list.</p>
              </div>
            ) : (
              <div className="space-y-3 mt-3">
                {data.selectedPackages.map((id, index) => {
                  const pkg = packages.find((p) => p.id === id);
                  if (!pkg) return null;
                  
                  return (
                    <div
                      key={id}
                      className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-200 hover:bg-blue-50/5 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{pkg.title}</p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            ID: {pkg.packageId} {pkg.tripDuration ? `· ${pkg.tripDuration}` : ""}
                            {pkg.price ? ` · ${pkg.price.currency} ${pkg.price.amount.toLocaleString()}` : ""}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Move Up */}
                        <Btn
                          variant="outline"
                          size="xs"
                          onClick={() => movePackage(index, -1)}
                          disabled={index === 0}
                          title="Move Up"
                        >
                          ▲
                        </Btn>
                        {/* Move Down */}
                        <Btn
                          variant="outline"
                          size="xs"
                          onClick={() => movePackage(index, 1)}
                          disabled={index === data.selectedPackages.length - 1}
                          title="Move Down"
                        >
                          ▼
                        </Btn>
                        {/* Remove */}
                        <Btn
                          variant="ghost"
                          size="xs"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removePackage(id)}
                          title="Remove from featured list"
                        >
                          <Ic.X /> Remove
                        </Btn>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Large Bottom Save Panel */}
      <div className="flex justify-end pt-4">
        <Btn variant="primary" size="lg" className="w-full md:w-auto" onClick={handleSave} disabled={saving}>
          {saving ? "Saving Changes..." : <><Ic.Check /> Save Changes</>}
        </Btn>
      </div>
    </div>
  );
}
