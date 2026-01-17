import {
  BaseValidator,
  ValidationError,
  ValidationResult,
} from "../validation-chain";

import { Address } from "@/types/domain";

export class PostalCodeFormatValidator extends BaseValidator<Address> {
  protected doValidation(address: Address): ValidationResult {
    const errors: ValidationError[] = [];

    if (address.country === "US") {
      const usPostalCodeRegex = /^\d{5}(-\d{4})?$/;

      if (!usPostalCodeRegex.test(address.postalCode)) {
        errors.push({
          field: "postalCode",
          message: "Invalid US postal code format",
          code: "INVALID_US_POSTAL_CODE",
        });
      }
    }

    if (address.country === "UK") {
      const usPostalCodeRegex = /^[A-Z]{1,2}\d[A-Z\d]?\s\d[A-Z]{2}$/i;

      if (!usPostalCodeRegex.test(address.postalCode)) {
        errors.push({
          field: "postalCode",
          message: "Invalid UK postal code format",
          code: "INVALID_UK_POSTAL_CODE",
        });
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
