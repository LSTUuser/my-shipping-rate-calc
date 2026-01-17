import { Package } from "@/types/domain";
import { BaseValidator, ValidationResult } from "../validation-chain";

export class WeightValidator extends BaseValidator<Package> {
  protected doValidation(pkg: Package): ValidationResult {
    const errors = [];

    if (pkg.weight.value <= 0) {
      errors.push({
        field: "weight",
        message: "Weight must be greater than zero",
        code: "INVALID_WEIGHT",
      });
    }

    if (pkg.weight.unit !== "kg" && pkg.weight.unit !== "lbs") {
      errors.push({
        field: "weight",
        message: "Unsupported weight unit",
        code: "UNSUPPORTED_WEIGHT_UNIT",
      });
    }

    if (errors.length > 0) {
      return {
        isValid: false,
        errors,
      };
    }

    return {
      isValid: true,
      errors: [],
    };
  }
}
