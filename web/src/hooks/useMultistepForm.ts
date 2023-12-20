import { ReactElement, useState } from 'react';

type UseMultistepFormProps = {
  steps: ReactElement[];
  onStepChange: (stepIndex: number) => void;
};

export function useMultistepForm({ steps, onStepChange }: UseMultistepFormProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      onStepChange(i + 1);
      return i + 1;
    });
  }

  function back() {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      onStepChange(i - 1);
      return i - 1;
    });
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    next,
    back,
  };
}
