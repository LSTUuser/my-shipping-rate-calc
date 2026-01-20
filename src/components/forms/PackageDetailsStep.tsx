"use client";

import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";
import DimensionsInput from "./DimensionsInput";
import WeightInput from "./WeightInput";
import { PackageType } from "@/types/domain";
import { PackageDraft } from "@/hooks/usePackageForm";
import useDimensionalWeight from "@/hooks/useDimensionalWeight";

interface PackageDetailsStepProps {
  value: PackageDraft;
  onChange: (data: Partial<PackageDraft>) => void;
}

const PackageDetailsStep = ({ value, onChange }: PackageDetailsStepProps) => {
  const { dimensions, weight } = value;

  const dimensionalWeight = useDimensionalWeight({
    dimensions: {
      length: dimensions.length ?? 0,
      width: dimensions.width ?? 0,
      height: dimensions.height ?? 0,
      unit: dimensions.unit,
    },
    weight: {
      value: weight.value ?? 0,
      unit: weight.unit,
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <Select
        label="Package type"
        value={value.type ?? ""}
        onChange={(type) => onChange({ type: type as PackageType })}
        options={[
          { value: "envelope", label: "Envelope" },
          { value: "box", label: "Box" },
          { value: "tube", label: "Tube" },
          { value: "custom", label: "Custom" },
        ]}
      />

      <DimensionsInput
        value={dimensions}
        onChange={(dims) =>
          onChange({
            dimensions: {
              ...dimensions,
              ...dims,
            },
          })
        }
      />

      <WeightInput
        value={weight}
        onChange={(w) =>
          onChange({
            weight: {
              ...weight,
              ...w,
            },
          })
        }
      />

      <Input
        label="Declared value (optional)"
        type="number"
        value={value.declaredValue ?? ""}
        onChange={(v) => onChange({ declaredValue: Number(v) || 0 })}
      />

      {/* Dimensional weight info */}
      <div className="mt-4 rounded border bg-gray-50 p-4 text-sm">
        <p>
          Actual weight:{" "}
          <strong>{dimensionalWeight.actualWeightLbs} lbs</strong>
        </p>

        <p>
          Dimensional weight:{" "}
          <strong>{dimensionalWeight.dimensionalWeightLbs} lbs</strong>
        </p>

        <p className="mt-2 font-semibold">
          Billable weight: {dimensionalWeight.billableWeightLbs} lbs
        </p>

        {dimensionalWeight.isDimensionalApplied && (
          <p className="mt-1 text-orange-600">Dimensional weight applied</p>
        )}
      </div>
    </div>
  );
};

export default PackageDetailsStep;
