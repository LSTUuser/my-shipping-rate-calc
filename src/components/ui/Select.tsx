"use client";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  value?: string;
  options: Option[];
  onChange: (value: string) => void;
}

const Select = ({ label, value, options, onChange }: SelectProps) => {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span>{label}</span>
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="" disabled>
          Select...
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
