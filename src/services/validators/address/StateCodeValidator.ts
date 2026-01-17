import {
  BaseValidator,
  ValidationError,
  ValidationResult,
} from "../validation-chain";

import { Address } from "@/types/domain";

const US_STATE_CODES = new Set([
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
]);

export class StateCodeValidator extends BaseValidator<Address> {
  protected doValidation(address: Address): ValidationResult {
    const errors: ValidationError[] = [];

    if (address.country !== "US") {
      return {
        isValid: true,
        errors: [],
      };
    }

    const stateCode = address.state.toUpperCase();

    if (stateCode.length !== 2 || !US_STATE_CODES.has(stateCode)) {
      errors.push({
        field: "state",
        message: "Invalid US state code",
        code: "INVALID_US_STATE_CODE",
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
