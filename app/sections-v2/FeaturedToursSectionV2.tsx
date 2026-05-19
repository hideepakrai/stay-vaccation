"use client";

import React from "react";
import FeaturedPackages from "../components/homepage/featuredPackages";

interface FeaturedToursSectionV2Props {
  packages?: any[];
}

const FeaturedToursSectionV2: React.FC<FeaturedToursSectionV2Props> = () => {
  return <FeaturedPackages />;
};

export default FeaturedToursSectionV2;
