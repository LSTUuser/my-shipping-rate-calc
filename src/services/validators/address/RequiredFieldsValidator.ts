import {
  BaseValidator,
  ValidationResult,
  ValidationError,
} from "../validation-chain";

import { Address } from "@/types/domain";

export class RequiredFieldsValidator extends BaseValidator<Address> {
  protected doValidation(address: Address): ValidationResult {
    const errors: ValidationError[] = [];

    if (!address.street1.trim()) {
      errors.push({
        field: "street1",
        message: "Street address is required",
        code: "REQUIRED_FIELD",
      });
    }

    if (!address.city.trim()) {
      errors.push({
        field: "city",
        message: "City is required",
        code: "REQUIRED_FIELD",
      });
    }

    if (!address.state.trim() && address.country === "US") {
      errors.push({
        field: "state",
        message: "State is required",
        code: "REQUIRED_FIELD",
      });
    }

    if (!address.postalCode.trim()) {
      errors.push({
        field: "postalCode",
        message: "Postal code is required",
        code: "REQUIRED_FIELD",
      });
    }

    if (!address.country.trim()) {
      errors.push({
        field: "country",
        message: "Country is required",
        code: "REQUIRED_FIELD",
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
