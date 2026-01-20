"use client";

import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { PackageDraft } from "@/hooks/usePackageForm";

type Dimensions = PackageDraft["dimensions"];

interface DimensionsInputProps {
  value: Dimensions;
  onChange: (value: Dimensions) => void;
}

const DimensionsInput = ({ value, onChange }: DimensionsInputProps) => {
  const updateField = <K extends keyof Dimensions>(
    field: K,
    fieldValue: Dimensions[K],
  ) => {
    onChange({
      ...value,
      [field]: fieldValue,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="font-medium">Dimensions</p>

      <div className="grid grid-cols-3 gap-3">
        <Input
          label="Length"
          type="number"
          value={value.length ?? ""}
          onChange={(v) => updateField("length", Number(v))}
        />

        <Input
          label="Width"
          type="number"
          value={value.width ?? ""}
          onChange={(v) => updateField("width", Number(v))}
        />

        <Input
          label="Height"
          type="number"
          value={value.height ?? ""}
          onChange={(v) => updateField("height", Number(v))}
        />
      </div>

      <Select
        label="Unit"
        value={value.unit ?? ""}
        onChange={(unit) => updateField("unit", unit as Dimensions["unit"])}
        options={[
          { value: "in", label: "Inches" },
          { value: "cm", label: "Centimeters" },
        ]}
      />
    </div>
  );
};

export default DimensionsInput;
