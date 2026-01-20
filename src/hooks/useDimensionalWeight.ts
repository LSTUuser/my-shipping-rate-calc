"use client";

import { useMemo } from "react";
import { PackageDimensions, PackageWeight } from "@/types/domain";

interface UseDimensionalWeightParams {
  dimensions: PackageDimensions;
  weight: PackageWeight;
}

interface UseDimensionalWeightResult {
  actualWeightLbs: number;
  dimensionalWeightLbs: number;
  billableWeightLbs: number;
  isDimensionalApplied: boolean;
}

const KG_TO_LBS = 2.20462;
const CM_DIVISOR = 5000;
const IN_DIVISOR = 139;

export const useDimensionalWeight = ({
  dimensions,
  weight,
}: UseDimensionalWeightParams): UseDimensionalWeightResult => {
  return useMemo(() => {
    const { length, width, height, unit } = dimensions;

    if (
      length == null ||
      width == null ||
      height == null ||
      weight.value == null
    ) {
      return {
        actualWeightLbs: 0,
        dimensionalWeightLbs: 0,
        billableWeightLbs: 0,
        isDimensionalApplied: false,
      };
    }

    const volume =
      unit === "in"
        ? length * width * height
        : (length * width * height) / CM_DIVISOR;

    const dimensionalWeightLbs =
      unit === "in" ? volume / IN_DIVISOR : volume * KG_TO_LBS;

    const actualWeightLbs =
      weight.unit === "lbs" ? weight.value : weight.value * KG_TO_LBS;

    const billableWeightLbs = Math.max(actualWeightLbs, dimensionalWeightLbs);

    return {
      actualWeightLbs: Number(actualWeightLbs.toFixed(2)),
      dimensionalWeightLbs: Number(dimensionalWeightLbs.toFixed(2)),
      billableWeightLbs: Number(billableWeightLbs.toFixed(2)),
      isDimensionalApplied: dimensionalWeightLbs > actualWeightLbs,
    };
  }, [
    dimensions.length,
    dimensions.width,
    dimensions.height,
    dimensions.unit,
    weight.value,
    weight.unit,
  ]);
};

export default useDimensionalWeight;
