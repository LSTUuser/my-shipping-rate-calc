"use client";

import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import useAddressValidation from "@/hooks/useAddressValidation";
import { Address } from "@/types/domain";

interface AddressFormProps {
  title: string;
  value: Address;
  onChange: (data: Partial<Address>) => void;
}

const AddressForm = ({ title, value, onChange }: AddressFormProps) => {
  const isUK = value.country === "UK";
  const { errors, isValidating, validateField } = useAddressValidation();

  const getError = (field: string) =>
    errors.find((e) => e.field === field)?.message;

  return (
    <div className="flex flex-col gap-4 w-full">
      <h3 className="text-lg font-medium">{title}</h3>

      <Input
        label="Full name"
        value={value.name}
        error={getError("name")}
        onChange={(v) => {
          onChange({ name: v });
          validateField("name", v, { ...value, name: v });
        }}
      />

      <Input
        label="Street address"
        value={value.street1}
        error={getError("street1")}
        onChange={(v) => {
          onChange({ street1: v });
          validateField("street1", v, { ...value, street1: v });
        }}
      />

      <Input
        label="Street address 2 (optional)"
        value={value.street2 ?? ""}
        onChange={(v) => onChange({ street2: v })}
      />

      <Input
        label="City"
        value={value.city}
        error={getError("city")}
        onChange={(v) => {
          onChange({ city: v });
          validateField("city", v, { ...value, city: v });
        }}
      />

      <Select
        label="Country"
        value={value.country}
        onChange={(country) =>
          onChange({
            country: country as "US" | "UK",
            state: country === "UK" ? "" : value.state,
          })
        }
        options={[
          { value: "US", label: "United States" },
          { value: "UK", label: "United Kingdom" },
        ]}
      />

      {!isUK && (
        <Input
          label="State"
          value={value.state}
          error={getError("state")}
          onChange={(v) => {
            onChange({ state: v });
            validateField("state", v, { ...value, state: v });
          }}
        />
      )}

      <Input
        label="Postal code"
        value={value.postalCode}
        error={getError("postalCode")}
        onChange={(v) => {
          onChange({ postalCode: v });
          validateField("postalCode", v, { ...value, postalCode: v });
        }}
      />

      <Input
        label="Phone (optional)"
        value={value.phone ?? ""}
        onChange={(v) => onChange({ phone: v })}
      />

      {isValidating && (
        <p className="text-sm text-zinc-500">Validating address…</p>
      )}
    </div>
  );
};

export default AddressForm;
