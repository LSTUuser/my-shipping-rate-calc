"use client";

import { useState } from "react";
import { Address, Package, ShippingOptions } from "@/types/domain";

interface PackageFormState {
  currentStep: number;
  packageDetails: Partial<Package>;
  origin: Partial<Address>;
  destination: Partial<Address>;
  shippingOptions: Partial<ShippingOptions>;
  validationErrors: Record<string, string[]>;
}

const initialState: PackageFormState = {
  currentStep: 1,
  packageDetails: {},
  origin: {},
  destination: {},
  shippingOptions: {},
  validationErrors: {},
};

const usePackageForm = () => {
  const [state, setState] = useState<PackageFormState>(initialState);

  // FormActions

  const updatePackageDetails = (data: Partial<Package>) => {
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
      if (prev.currentStep === 3) {
        return prev;
      }

      return {
        ...prev,
        currentStep: prev.currentStep + 1,
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
        currentStep: prev.currentStep - 1,
      };
    });
  };

  const goToStep = (step: number) => {
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
