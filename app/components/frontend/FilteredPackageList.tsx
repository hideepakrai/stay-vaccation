"use client";

import { useState, useMemo } from "react";
import TourCardV2 from "../../components-v2/TourCardV2";
import Link from "next/link";
import LucideIcon from "../LucideIcon";

import { Package } from "@/app/store/features/packages/types";

interface FilteredPackageListProps {
  packages: Package[];
  destinationTitle: string;
}

type TabType = "all" | "group" | "custom" | "recommended";
type SortType = "default" | "price-asc" | "price-desc" | "popular";

export default function FilteredPackageList({ packages, destinationTitle }: FilteredPackageListProps) {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [sortOrder, setSortOrder] = useState<SortType>("popular");

  const filteredItems = useMemo(() => {
    let list = [...packages];

    // 1. Category Filtering
    switch (activeTab) {
      case "group":
        list = list.filter(p => p.travelStyle === "Group Tour");
        break;
      case "custom":
        list = list.filter(p => p.travelStyle !== "Group Tour");
        break;
      case "recommended":
        list = list.filter(p => p.exclusivityLevel === "Premium" || p.travelStyle === "Luxury");
        break;
    }

    // 2. Sorting
    if (sortOrder === "price-asc") {
      list.sort((a, b) => Number(a.price?.amount) - Number(b.price?.amount));
    } else if (sortOrder === "price-desc") {
      list.sort((a, b) => Number(b.price?.amount) - Number(a.price?.amount));
    } else if (sortOrder === "popular") {
      // Heuristic: Premium exclusivity or higher price first
      list.sort((a, b) => {
        if (a.exclusivityLevel === "Premium" && b.exclusivityLevel !== "Premium") return -1;
        if (b.exclusivityLevel === "Premium" && a.exclusivityLevel !== "Premium") return 1;
        return Number(b.price?.amount) - Number(a.price?.amount);
      });
    }

    return list;
  }, [packages, activeTab, sortOrder]);

  const tabs: { id: TabType; label: string }[] = [
    { id: "all", label: "All Packages" },
    { id: "group", label: "Group Tours" },
    { id: "custom", label: "Customized Tours" },
    { id: "recommended", label: "Recommended" },
  ];

  return (
    <div className="space-y-12">
      {/* Tabs & Sort UI */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-gray-100 pb-8">
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide w-full lg:w-auto py-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            let count = 0;
            if (tab.id === "all") count = packages.length;
            else if (tab.id === "group") count = packages.filter(p => p.travelStyle === "Group Tour").length;
            else if (tab.id === "custom") count = packages.filter(p => p.travelStyle !== "Group Tour").length;
            else if (tab.id === "recommended") count = packages.filter(p => p.exclusivityLevel === "Premium" || p.travelStyle === "Luxury").length;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full border-[1.5px] font-bold text-xs tracking-wide transition-all duration-300 shrink-0 ${
                  isActive 
                    ? "border-[#4a90e2] bg-[#4a90e2] text-white shadow-[0_6px_20px_rgba(74,144,226,0.15)] scale-102" 
                    : "border-gray-200 bg-white text-gray-500 hover:text-[#1a3f4e] hover:border-gray-300"
                }`}
              >
                {tab.label}
                <span className={`text-[9px] px-2 py-0.5 rounded-full transition-colors duration-300 ${
                  isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-4 w-full lg:w-auto shrink-0 justify-between lg:justify-end">
          <div className="flex items-center gap-2.5 bg-white px-4 py-3 rounded-2xl shadow-sm border border-gray-100">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4a90e2] animate-pulse" />
            <span className="text-[#1a3f4e] text-[10px] font-black uppercase tracking-widest">{filteredItems.length} Available</span>
          </div>

          <div className="relative group shrink-0">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortType)}
              className="appearance-none bg-white border border-gray-200 px-6 py-3 rounded-2xl text-xs font-bold text-[#1a3f4e] shadow-sm hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4a90e2]/15 cursor-pointer pr-10 transition-all duration-300"
            >
              <option value="popular">Popularity</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 transition-transform duration-300 group-hover:translate-y-[-30%]">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Package Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((pkg, i) => (
            <TourCardV2 key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm max-w-3xl mx-auto px-6">
          <div className="w-20 h-20 bg-[#e8f4fd] rounded-full flex items-center justify-center mx-auto mb-6 text-[#4a90e2]">
            <LucideIcon name={activeTab === "group" ? "Users" : activeTab === "recommended" ? "Sparkles" : "MapPin"} size={36} strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-extrabold text-[#1a3f4e] mb-3 font-['Poppins']">
            No {tabs.find(t => t.id === activeTab)?.label} Found
          </h3>
          <p className="text-gray-400 max-w-md mx-auto mb-8 text-sm leading-relaxed">
            We don't have any active packages listed under this category in {destinationTitle} right now. Try checking other categories or exploring all packages.
          </p>
          <button 
            onClick={() => setActiveTab("all")}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#4a90e2] to-[#2563eb] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-300 shadow-[0_4px_12px_rgba(74,144,226,0.15)] hover:shadow-[0_6px_20px_rgba(74,144,226,0.3)] hover:-translate-y-0.5"
          >
            View All Packages
          </button>
        </div>
      )}
    </div>
  );
}
