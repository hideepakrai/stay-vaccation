"use client";

import React, { useState, useEffect } from 'react';
import SectionHeaderV2 from '../../../components-v2/SectionHeaderV2';
import FeaturedPackageCard from './FeaturedPackageCard';
import { FeaturedData } from './featuredPackages.types';
import { fetchFeaturedPackages } from './featuredPackages.api';
import { sectionStyles } from './featuredPackages.styles';

const SkeletonCard = () => (
  <div className="tour-card animate-pulse bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
    <div className="relative h-60 bg-gray-200 overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-150 to-gray-200" 
        style={{
          animation: 'pulse 1.5s infinite ease-in-out',
          backgroundSize: '200% 100%'
        }}
      ></div>
    </div>
    <div className="p-6 space-y-4">
      <div className="h-3.5 bg-gray-200 rounded w-1/4"></div>
      <div className="h-6 bg-gray-200 rounded w-5/6"></div>
      <div className="flex gap-2">
        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        <div className="h-6 bg-gray-200 rounded-full w-24"></div>
      </div>
      <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
        <div className="space-y-1 w-1/3">
          <div className="h-2.5 bg-gray-200 rounded w-1/2"></div>
          <div className="h-5 bg-gray-200 rounded w-4/5"></div>
        </div>
        <div className="h-9 bg-gray-200 rounded-full w-24"></div>
      </div>
    </div>
  </div>
);

const EmptyState = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <section id="tours" style={sectionStyles}>
    <div className="container-v2 text-center py-12">
      <SectionHeaderV2 
        label="Featured Tours"
        title="Unforgettable"
        titleHighlight={title || "Tour Packages"}
        subtitle={subtitle || "Carefully curated experiences designed for explorers who want more than just a holiday."}
        centered
        className="mb-8"
      />
      <div className="max-w-md mx-auto p-8 bg-white/60 backdrop-blur-md rounded-3xl border border-blue-50/50 shadow-sm text-center">
        <div className="w-16 h-16 bg-blue-50/30 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-500 text-2xl">🌴</div>
        <h4 className="font-bold text-gray-800 text-base mb-2">No Packages Selected</h4>
        <p className="text-gray-500 text-xs leading-relaxed">We are currently handpicking our premium escapes for you. Please check back shortly for our fresh new collections!</p>
      </div>
    </div>
  </section>
);

export default function FeaturedPackages() {
  const [data, setData] = useState<FeaturedData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedPackages()
      .then(res => {
        if (res) {
          setData(res);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section id="tours" style={sectionStyles}>
        <div className="container-v2">
          <SectionHeaderV2 
            label="Featured Tours"
            title="Unforgettable"
            titleHighlight="Tour Packages"
            subtitle="Loading our selected premium getaways..."
            centered
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </section>
    );
  }

  // Hide gracefully if section is marked inactive in CMS configuration
  if (!data || data.isActive === false) {
    return null;
  }

  // Display warm fallback empty state if active but empty list
  if (!data.packages || data.packages.length === 0) {
    return <EmptyState title={data.sectionTitle} subtitle={data.sectionSubtitle} />;
  }

  return (
    <section id="tours" style={sectionStyles}>
      <div className="container-v2">
        <SectionHeaderV2 
          label="Featured Tours"
          title="Unforgettable"
          titleHighlight={data.sectionTitle || "Tour Packages"}
          subtitle={data.sectionSubtitle || "Carefully curated experiences designed for explorers who want more than just a holiday."}
          centered
          className="mb-12"
        />

        <div className="tours-track grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.packages.map((pkg, idx) => (
            <FeaturedPackageCard key={pkg.id} pkg={pkg} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
