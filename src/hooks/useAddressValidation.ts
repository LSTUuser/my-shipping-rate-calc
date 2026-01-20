"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Address } from "@/types/domain";
import {
  ValidationError,
  ValidationResult,
} from "@/services/validators/validation-chain";
import { createAddressValidationChain } from "@/services/validators";

const DEBOUNCE_MS = 300;

export const useAddressValidation = () => {
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isValidating, setIsValidating] = useState(false);

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ---- FULL VALIDATION (ASYNC) ----
  const validate = useCallback(
    async (address: Address): Promise<ValidationResult> => {
      setIsValidating(true);

      const validator = createAddressValidationChain();
      const result = validator.validate(address);

      setErrors(result.errors);
      setIsValidating(false);

      return result;
    },
    [],
  );

  // ---- FIELD LEVEL VALIDATION (DEBOUNCED) ----
  const validateField = useCallback(
    <K extends keyof Address>(
      field: K,
      value: Address[K],
      address: Address,
    ) => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(() => {
        setIsValidating(true);

        const validator = createAddressValidationChain();
        const result = validator.validate({
          ...address,
          [field]: value,
        });

        const fieldErrors = result.errors.filter(
          (error) => error.field === field,
        );

        setErrors((prev) => [
          ...prev.filter((e) => e.field !== field),
          ...fieldErrors,
        ]);

        setIsValidating(false);
      }, DEBOUNCE_MS);
    },
    [],
  );

  // ---- CLEANUP ----
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return {
    errors,
    isValidating,
    validate,
    validateField,
  };
};

export default useAddressValidation;
