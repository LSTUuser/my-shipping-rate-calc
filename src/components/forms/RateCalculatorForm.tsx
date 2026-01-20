"use client";

import usePackageForm from "@/hooks/usePackageForm";
import FormNavigation from "../ui/FormNavigation";
import PackageDetailsStep from "./PackageDetailsStep";
import AddressStep from "./AddressStep";
import ShippingOptionsStep from "./ShippingOptionsStep";

const RateCalculatorForm = () => {
  const {
    state,
    updatePackageDetails,
    updateOrigin,
    updateDestination,
    updateShippingOptions,
    nextStep,
    prevStep,
  } = usePackageForm();

  return (
    <section className="w-full max-w-xl flex flex-col gap-y-7 p-6 border rounded-lg">
      {/* Step header */}
      <header className="text-xl font-semibold">
        {state.currentStep === 1 && <p>Package Details Step</p>}

        {state.currentStep === 2 && <p>Origin & Destination Step</p>}

        {state.currentStep === 3 && <p>Shipping Options Step</p>}
      </header>

      {/* Step Content */}
      <div className="min-h-[150px]">
        {/* Content... */}
        {state.currentStep === 1 && (
          <PackageDetailsStep
            value={state.packageDetails}
            onChange={updatePackageDetails}
          />
        )}
        {state.currentStep === 2 && (
          <AddressStep
            origin={state.origin}
            destination={state.destination}
            onOriginChange={updateOrigin}
            onDestinationChange={updateDestination}
          />
        )}
        {state.currentStep === 3 && (
          <ShippingOptionsStep
            value={state.shippingOptions}
            onChange={updateShippingOptions}
          />
        )}
      </div>

      {/* Navigation */}
      <FormNavigation
        currentStep={state.currentStep}
        totalSteps={4}
        onBack={prevStep}
        onNext={nextStep}
      />
    </section>
  );
};

export default RateCalculatorForm;
