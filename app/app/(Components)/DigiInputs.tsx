import { ChangeEvent, KeyboardEvent, MutableRefObject } from "react";

type DigitInputsProps = {
  className: string | undefined;
  amount: number;
  inputRef: MutableRefObject<HTMLInputElement[]>;
};

function DigitInputs({ className, amount, inputRef }: DigitInputsProps) {
  const validDigitInputs = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "Backspace",
  ];

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    let isInputValid = false;
    validDigitInputs.forEach((validInput) =>
      e.target.value == validInput ? (isInputValid = true) : null
    );
    if (!isInputValid) return (e.target.value = "");
  }

  function onKeyUp(e: KeyboardEvent<HTMLInputElement>, digitIndex: number) {
    let instruction: string;
    let targetElement;
    switch (e.key) {
      case "Backspace":
        instruction = "PREVIOUS";
        targetElement =
          inputRef.current[digitIndex === 0 ? amount - 1 : digitIndex - 1];
        break;
      default:
        instruction = "NEXT";
        targetElement =
          inputRef.current[digitIndex === amount - 1 ? 0 : digitIndex + 1];
        break;
    }
    let isInputValid = false;
    validDigitInputs.forEach((validInput) =>
      e.key === validInput ? (isInputValid = true) : null
    );
    if (isInputValid) {
      if (instruction == "NEXT" && targetElement !== inputRef.current[0])
        targetElement.focus();
      if (
        instruction == "PREVIOUS" &&
        targetElement !== inputRef.current[amount - 1]
      )
        targetElement.focus();
    }
  }

  function onPaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const pastedCode = e.clipboardData.getData("text").split("");
    if (pastedCode.length === 6)
      inputRef.current.forEach(
        (input: HTMLInputElement, index: number) =>
          (input.value = pastedCode[index])
      );
  }

  return (
    <div className={className}>
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <input
            key={index}
            ref={(element) =>
              (inputRef.current[index] = element as HTMLInputElement)
            }
            onKeyUp={(e) => onKeyUp(e, index)}
            onChange={onChange}
            onPaste={onPaste}
            className="bevestigemail_digit"
            type="tel"
            maxLength={1}
            name={"digit" + index}
            required
          />
        ))}
    </div>
  );
}

export default DigitInputs;
