"use client";

import { useState } from "react";
import { Address, PackageType, ShippingOptions } from "@/types/domain";

export interface PackageDraft {
  id: string;
  dimensions: {
    length: number | null;
    width: number | null;
    height: number | null;
    unit: "in" | "cm";
  };
  weight: {
    value: number | null;
    unit: "lbs" | "kg";
  };
  type: PackageType;
  declaredValue: number | null;
}

interface PackageFormState {
  currentStep: Step;
  packageDetails: PackageDraft;
  origin: Address;
  destination: Address;
  shippingOptions: ShippingOptions;
  validationErrors: Record<string, string[]>;
}

type Step = 1 | 2 | 3 | 4;

const initialState: PackageFormState = {
  currentStep: 1,
  packageDetails: {
    id: "",
    dimensions: {
      length: null,
      width: null,
      height: null,
      unit: "in",
    },
    weight: {
      value: null,
      unit: "lbs",
    },
    type: "envelope",
    declaredValue: null,
  },
  origin: {
    name: "",
    street1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "US",
    street2: "",
    phone: "",
  },
  destination: {
    name: "",
    street1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "US",
    street2: "",
    phone: "",
  },
  shippingOptions: {
    speed: "standard",
    signatureRequired: false,
    insurance: false,
    fragileHandling: false,
    saturdayDelivery: false,
  },

  validationErrors: {},
};

const usePackageForm = () => {
  const [state, setState] = useState<PackageFormState>(initialState);

  // FormActions

  const updatePackageDetails = (data: Partial<PackageDraft>) => {
    setState((prev) => ({
      ...prev,
      packageDetails: {
        ...prev.packageDetails,
        ...data,
      },
    }));
  };

  const updateOrigin = (data: Partial<Address>) => {
    setState((prev) => ({
      ...prev,
      origin: { ...prev.origin, ...data },
    }));
  };

  const updateDestination = (data: Partial<Address>) => {
    setState((prev) => ({
      ...prev,
      destination: {
        ...prev.destination,
        ...data,
      },
    }));
  };

  const updateShippingOptions = (data: Partial<ShippingOptions>) => {
    setState((prev) => ({
      ...prev,
      shippingOptions: {
        ...prev.shippingOptions,
        ...data,
      },
    }));
  };

  // StepNavigation

  const nextStep = () => {
    setState((prev) => {
      if (prev.currentStep === 4) {
        return prev;
      }

      return {
        ...prev,
        currentStep: (prev.currentStep + 1) as Step,
      };
    });
  };

  const prevStep = () => {
    setState((prev) => {
      if (prev.currentStep === 1) {
        return prev;
      }

      return {
        ...prev,
        currentStep: (prev.currentStep - 1) as Step,
      };
    });
  };

  const goToStep = (step: Step) => {
    setState((prev) => ({
      ...prev,
      currentStep: step,
    }));
  };

  // Reset Form

  const resetForm = () => {
    setState(initialState);
  };

  return {
    state,
    updatePackageDetails,
    updateOrigin,
    updateDestination,
    updateShippingOptions,
    nextStep,
    prevStep,
    goToStep,
    resetForm,
  };
};

export default usePackageForm;
