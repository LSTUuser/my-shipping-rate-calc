import { Package } from "@/types/domain";
import { BaseValidator, ValidationResult } from "../validation-chain";

export class DimensionsValidator extends BaseValidator<Package> {
  protected doValidation(pkg: Package): ValidationResult {
    const errors = [];
    const { length, width, height } = pkg.dimensions;

    if (length <= 0 || width <= 0 || height <= 0) {
      errors.push({
        field: "dimensions",
        message: "All dimensions must be greater than zero",
        code: "INVALID_DIMENSIONS",
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
