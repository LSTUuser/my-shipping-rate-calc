"use client";

import usePackageForm from "@/hooks/usePackageForm";

const RateCalculatorForm = () => {
  const { state, nextStep, prevStep } = usePackageForm();

  return (
    <section className="w-full max-w-xl flex flex-col gap-y-7 p-6 border rounded-lg">
      {/* Step header */}
      <header className="text-xl font-semibold">
        {state.currentStep === 1 && <p>Package Details Step</p>}

        {state.currentStep === 2 && <p>Origin & Destination Step</p>}

        {state.currentStep === 3 && <p>Shipping Options Step</p>}
      </header>

      {/* Step Content */}
      <div className="min-h-[150px] flex items-center justify-center border rounded">
        {/* Content... */}
      </div>

      {/* Navigation */}
      <footer className="flex justify-between items-center">
        <button
          type="button"
          onClick={prevStep}
          disabled={state.currentStep === 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Back
        </button>
        <h2 className="">Step {state.currentStep} of 3</h2>
        <button
          type="button"
          onClick={nextStep}
          disabled={state.currentStep === 3}
          className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </footer>
    </section>
  );
};

export default RateCalculatorForm;
