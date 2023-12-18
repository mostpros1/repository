import React, {
  MutableRefObject,
  useState,
} from "react";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  TextInputKeyPressEventData,
  View,
} from "react-native";

type DigitInputsProps = {
  className: string | undefined;
  amount: number;
  inputRef: MutableRefObject<TextInput[]>;
};

function DigitInputs({ className, amount, inputRef }: DigitInputsProps) {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (text) => {
    setInputValue(text);
  };
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

  function onChange(e: NativeSyntheticEvent<TextInputChangeEventData>) {
    let isInputValid = false;
    validDigitInputs.forEach((validInput) =>
      inputValue == validInput ? (isInputValid = true) : null
    );
    if (!isInputValid) return setInputValue("");
  }

  function onKeyUp(
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    digitIndex: number
  ) {
    let instruction: string;
    let targetElement;
    switch (e.nativeEvent.key) {
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
      e.nativeEvent.key === validInput ? (isInputValid = true) : null
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

  // function onPaste(e: React.ClipboardEvent<TextInput>) {
  //   const pastedCode = e.clipboardData.getData("text").split("");
  //   if (pastedCode.length === 6)
  //     inputRef.current.forEach(
  //       (input: TextInput, index: number) =>
  //         (input.value = pastedCode[index])
  //     );
  // }

  return (
    <View>
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <TextInput
            key={index}
            ref={(element) => (inputRef.current[index] = element as TextInput)}
            onKeyPress={(e) => onKeyUp(e, index)}
            onChange={onChange}
            onChangeText={handleInputChange}
            // onPaste={onPaste}
            keyboardType={"phone-pad"}
            maxLength={1}
          />
        ))}
    </View>
  );
}

export default DigitInputs;