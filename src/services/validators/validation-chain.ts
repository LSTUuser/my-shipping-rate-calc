export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface Validator<T> {
  setNext(validator: Validator<T>): Validator<T>;
  validate(data: T): ValidationResult;
}

export abstract class BaseValidator<T> implements Validator<T> {
  protected next: Validator<T> | null = null;
  protected abstract doValidation(data: T): ValidationResult;

  setNext(validator: Validator<T>): Validator<T> {
    this.next = validator;
    return validator;
  }

  validate(data: T): ValidationResult {
    const result = this.doValidation(data);

    if (!result.isValid) {
      return result;
    }

    if (this.next) {
      return this.next.validate(data);
    }

    return {
      isValid: true,
      errors: [],
    };
  }
}
