"use client";

import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { PackageDraft } from "@/hooks/usePackageForm";

type Weight = PackageDraft["weight"];

interface WeightInputProps {
  value: Weight;
  onChange: (value: Weight) => void;
}

const WeightInput = ({ value, onChange }: WeightInputProps) => {
  const updateField = <K extends keyof Weight>(
    field: K,
    fieldValue: Weight[K],
  ) => {
    onChange({
      ...value,
      [field]: fieldValue,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="font-medium">Weight</p>

      <Input
        label="Weight"
        type="number"
        value={value.value ?? ""}
        onChange={(v) => updateField("value", Number(v))}
      />

      <Select
        label="Unit"
        value={value.unit ?? ""}
        onChange={(unit) => updateField("unit", unit as Weight["unit"])}
        options={[
          { value: "lbs", label: "Pounds (lbs)" },
          { value: "kg", label: "Kilograms (kg)" },
        ]}
      />
    </div>
  );
};

export default WeightInput;
