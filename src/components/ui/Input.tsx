"use client";

interface InputProps {
  label: string;
  type?: "text" | "number";
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
}: InputProps) => {
  const inputId = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <label className="flex flex-col gap-1 text-sm">
      <span>
        {label}
        {error && <span className="text-red-600 ml-1">*</span>}
      </span>

      <input
        id={inputId}
        type={type}
        value={value}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-transparent ${
          error
            ? "border-red-500 bg-red-50 focus:ring-red-500"
            : "border-black-500"
        }`}
      />

      {error && (
        <span
          id={`${inputId}-error`}
          role="alert"
          className="text-xs text-red-600"
        >
          {error}
        </span>
      )}
    </label>
  );
};

export default Input;
