import Button from "./Button";

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  isNextDisabled?: boolean;
}

const FormNavigation = ({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  isNextDisabled = false,
}: FormNavigationProps) => {
  return (
    <footer className="flex justify-between items-center">
      <Button
        className="px-4 py-2 border rounded disabled:opacity-50"
        type="button"
        onClick={onBack}
        disabled={currentStep === 1}
      >
        Back
      </Button>
      <h2>
        Step {currentStep} of {totalSteps}
      </h2>
      <Button
        className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
        type="button"
        onClick={onNext}
        disabled={isNextDisabled || currentStep === 4}
      >
        Next
      </Button>
    </footer>
  );
};

export default FormNavigation;
