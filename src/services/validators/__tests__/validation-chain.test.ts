import { describe, it, expect } from "vitest";
import {
  createAddressValidationChain,
  createPackageValidationChain,
} from "../index";
import { Address, Package, PackageWeight } from "@/types/domain";
import { RequiredFieldsValidator } from "../address/RequiredFieldsValidator";
import { PostalCodeFormatValidator } from "../address/PostalCodeFormatValidator";
import { StateCodeValidator } from "../address/StateCodeValidator";
import { DimensionsValidator } from "../package/DimensionsValidator";
import { WeightValidator } from "../package/WeightValidator";

//
// Shared test data: valid address examples for different countries
//

const validUSAddress: Address = {
  name: "John Doe",
  street1: "123 Main St",
  city: "New York",
  state: "NY",
  postalCode: "10001",
  country: "US",
};

const validUKAddress: Address = {
  name: "Jane Smith",
  street1: "10 Downing St",
  city: "London",
  state: "",
  postalCode: "SW1A 1AA",
  country: "UK",
};

//
// Address Validation Chain (integration)
//

describe("Address Validation Chain (integration)", () => {
  const validator = createAddressValidationChain();

  it("passes validation for a valid US address", () => {
    const result = validator.validate(validUSAddress);

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("passes validation for a valid UK address without state", () => {
    const result = validator.validate(validUKAddress);

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("fails when required fields are missing", () => {
    const invalidAddress: Address = {
      ...validUSAddress,
      street1: "",
      city: "",
    };

    const result = validator.validate(invalidAddress);

    expect(result.isValid).toBe(false);
    expect(result.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: "street1" }),
        expect.objectContaining({ field: "city" }),
      ]),
    );
  });

  it("fails for invalid US postal code format", () => {
    const invalidAddress: Address = {
      ...validUSAddress,
      postalCode: "ABCDE",
    };

    const result = validator.validate(invalidAddress);

    expect(result.isValid).toBe(false);
    expect(result.errors[0].field).toBe("postalCode");
  });

  it("fails for invalid UK postal code format", () => {
    const invalidAddress: Address = {
      ...validUKAddress,
      postalCode: "12345",
    };

    const result = validator.validate(invalidAddress);

    expect(result.isValid).toBe(false);
    expect(result.errors[0].field).toBe("postalCode");
  });

  it("stops validation chain on first failure of required fields", () => {
    const invalidAddress: Address = {
      ...validUSAddress,
      postalCode: "ABCDE",
      country: "",
    };

    const result = validator.validate(invalidAddress);

    expect(result.isValid).toBe(false);

    const fieldsWithErrors = result.errors.map((e) => e.field);

    expect(fieldsWithErrors).toContain("country");
    expect(fieldsWithErrors).not.toContain("postalCode");
  });
});

//
// RequiredFieldsValidator (isolated)
//

describe("RequiredFieldsValidator (isolated)", () => {
  const validator = new RequiredFieldsValidator();

  it("fails when street1 is missing", () => {
    const invalidAddress: Address = {
      ...validUSAddress,
      name: "",
      street1: "",
    };

    const result = validator.validate(invalidAddress);

    expect(result.isValid).toBe(false);
    expect(result.errors[0].field).toBe("street1");
  });

  it("shows several errors like street1 and state is missing", () => {
    const invalidAddress: Address = {
      ...validUSAddress,
      name: "",
      street1: "",
      state: "",
    };

    const result = validator.validate(invalidAddress);

    expect(result.isValid).toBe(false);
    expect(result.errors.map((e) => e.field)).toEqual(
      expect.arrayContaining(["street1", "state"]),
    );
  });

  it("does not require state for UK", () => {
    const result = validator.validate(validUKAddress);

    expect(result.isValid).toBe(true);
  });
});

//
// PostalCodeFormatValidator (isolated)
//

describe("PostalCodeFormatValidator (isolated)", () => {
  const validator = new PostalCodeFormatValidator();

  it("passes for valid US postal code", () => {
    const result = validator.validate(validUSAddress);

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("fails for invalid US postal code format", () => {
    const invalidAddress: Address = {
      ...validUSAddress,
      postalCode: "ABCDE",
    };

    const result = validator.validate(invalidAddress);

    expect(result.isValid).toBe(false);
    expect(result.errors[0].field).toBe("postalCode");
  });

  it("passes for valid UK postal code", () => {
    const result = validator.validate(validUKAddress);

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("fails for invalid UK postal code format", () => {
    const invalidAddress: Address = {
      ...validUKAddress,
      postalCode: "12345",
    };

    const result = validator.validate(invalidAddress);

    expect(result.isValid).toBe(false);
    expect(result.errors[0].field).toBe("postalCode");
  });
});

//
// StateCodeValidator (isolated)
//

describe("StateCodeValidator (isolated)", () => {
  const validator = new StateCodeValidator();

  it("passes for valid US state code", () => {
    const result = validator.validate({
      ...validUSAddress,
      state: "NY",
    });

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("fails for invalid US state code", () => {
    const result = validator.validate({
      ...validUSAddress,
      state: "XX",
    });

    expect(result.isValid).toBe(false);
    expect(result.errors[0].field).toBe("state");
  });

  it("fails for empty US state", () => {
    const result = validator.validate({
      ...validUSAddress,
      state: "",
    });

    expect(result.isValid).toBe(false);
    expect(result.errors[0].field).toBe("state");
  });

  it("passes for UK address without state", () => {
    const result = validator.validate(validUKAddress);

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});

//
// Shared test data: valid package data
//

const validPackage: Package = {
  id: "pkg-1",
  dimensions: {
    length: 20,
    width: 10,
    height: 5,
    unit: "in",
  },
  weight: {
    value: 10,
    unit: "lbs",
  },
  type: "box",
};

//
// Package Validation Chain (integration)
//

describe("Package Validation Chain (integration)", () => {
  const validator = createPackageValidationChain();

  it("passes for valid package", () => {
    const result = validator.validate(validPackage);

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("stops chain on dimensions validation failure", () => {
    const invalidPackage: Package = {
      ...validPackage,
      dimensions: {
        ...validPackage.dimensions,
        length: 0,
      },
      weight: {
        value: -10,
        unit: "lbs",
      },
    };

    const result = validator.validate(invalidPackage);

    expect(result.isValid).toBe(false);

    const fields = result.errors.map((e) => e.field);
    expect(fields).toContain("dimensions");
    expect(fields).not.toContain("weight");
  });
});

//
// DimensionsValidator (isolated)
//

describe("DimensionsValidator (isolated)", () => {
  const validator = new DimensionsValidator();

  it("passes for valid dimensions in inches", () => {
    const result = validator.validate(validPackage);

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("fails when length is zero", () => {
    const invalidPackage: Package = {
      ...validPackage,
      dimensions: {
        ...validPackage.dimensions,
        length: 0,
      },
    };

    const result = validator.validate(invalidPackage);

    expect(result.isValid).toBe(false);
    expect(result.errors[0].field).toBe("dimensions");
  });

  it("fails when any dimension is negative", () => {
    const invalidPackage: Package = {
      ...validPackage,
      dimensions: {
        ...validPackage.dimensions,
        width: -5,
      },
    };

    const result = validator.validate(invalidPackage);

    expect(result.isValid).toBe(false);
    expect(result.errors[0].field).toBe("dimensions");
  });

  it("passes for valid dimensions in centimeters", () => {
    const cmPackage: Package = {
      ...validPackage,
      dimensions: {
        length: 50,
        width: 30,
        height: 20,
        unit: "cm",
      },
    };

    const result = validator.validate(cmPackage);

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});

//
// WeightValidator (isolated)
//

describe("WeightValidaor (isolated)", () => {
  const validator = new WeightValidator();

  it("passes for valid weight in lbs", () => {
    const result = validator.validate(validPackage);

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("passes for valid weight in kg", () => {
    const kgPackage: Package = {
      ...validPackage,
      weight: {
        value: 5,
        unit: "kg",
      },
    };

    const result = validator.validate(kgPackage);

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("fails when weight is zero", () => {
    const invalidPackage: Package = {
      ...validPackage,
      weight: {
        value: 0,
        unit: "kg",
      },
    };

    const result = validator.validate(invalidPackage);

    expect(result.isValid).toBe(false);
    expect(result.errors[0].field).toBe("weight");
  });

  it("fails when weight is negative", () => {
    const invalidPackage: Package = {
      ...validPackage,
      weight: {
        value: -1,
        unit: "kg",
      },
    };

    const result = validator.validate(invalidPackage);

    expect(result.isValid).toBe(false);
    expect(result.errors[0].field).toBe("weight");
  });

  it("fails for unsupported weight unit", () => {
    const invalidPackage: Package = {
      ...validPackage,
      weight: {
        value: 10,
        unit: "oz",
      } as unknown as PackageWeight,
    };

    const result = validator.validate(invalidPackage);

    expect(result.isValid).toBe(false);
    expect(result.errors[0].code).toBe("UNSUPPORTED_WEIGHT_UNIT");
  });
});
