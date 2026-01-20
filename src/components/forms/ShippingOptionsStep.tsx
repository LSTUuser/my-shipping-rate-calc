"use client";

import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";
import { ShippingOptions, ServiceSpeed } from "@/types/domain";
import Checkbox from "../ui/CheckBox";

interface ShippingOptionsStepProps {
  value: ShippingOptions;
  onChange: (data: Partial<ShippingOptions>) => void;
}

const ShippingOptionsStep = ({ value, onChange }: ShippingOptionsStepProps) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <Select
        label="Service speed"
        value={value.speed}
        onChange={(speed) => onChange({ speed: speed as ServiceSpeed })}
        options={[
          { value: "overnight", label: "Overnight" },
          { value: "two-day", label: "Two-day" },
          { value: "standard", label: "Standard" },
          { value: "economy", label: "Economy" },
        ]}
      />

      <div className="flex flex-col gap-3">
        <Checkbox
          label="Signature required"
          checked={value.signatureRequired}
          onChange={(checked) => onChange({ signatureRequired: checked })}
        />

        <Checkbox
          label="Fragile handling"
          checked={value.fragileHandling}
          onChange={(checked) => onChange({ fragileHandling: checked })}
        />

        <Checkbox
          label="Saturday delivery"
          checked={value.saturdayDelivery}
          onChange={(checked) => onChange({ saturdayDelivery: checked })}
        />

        <Checkbox
          label="Insurance"
          checked={value.insurance}
          onChange={(checked) => onChange({ insurance: checked })}
        />
      </div>

      {value.insurance && (
        <Input
          label="Insured value"
          type="number"
          value={value.insuredValue ?? ""}
          onChange={(v) => onChange({ insuredValue: Number(v) })}
          placeholder="Enter insured amount"
        />
      )}
    </div>
  );
};

export default ShippingOptionsStep;
