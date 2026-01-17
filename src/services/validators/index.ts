import { WeightValidator } from "./package/WeightValidator";
import { DimensionsValidator } from "./package/DimensionsValidator";
import { Address, Package } from "@/types/domain";

import { Validator } from "./validation-chain";

import { RequiredFieldsValidator } from "./address/RequiredFieldsValidator";
import { PostalCodeFormatValidator } from "./address/PostalCodeFormatValidator";
import { StateCodeValidator } from "./address/StateCodeValidator";

export function createAddressValidationChain(): Validator<Address> {
  const requiredFieldsValidator = new RequiredFieldsValidator();
  const postalCodeFormatValidator = new PostalCodeFormatValidator();
  const stateCodeValidator = new StateCodeValidator();

  requiredFieldsValidator
    .setNext(postalCodeFormatValidator)
    .setNext(stateCodeValidator);

  return requiredFieldsValidator;
}

export function createPackageValidationChain(): Validator<Package> {
  const dimensionsValidator = new DimensionsValidator();
  const weightValidator = new WeightValidator();

  dimensionsValidator.setNext(weightValidator);

  return dimensionsValidator;
}
