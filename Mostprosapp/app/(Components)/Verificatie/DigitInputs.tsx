import React, {
  Dispatch,
  MutableRefObject,
  useState,
  SetStateAction,
} from "react";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  TextInputKeyPressEventData,
  View,

} from "react-native";

type DigitInputsProps = {
  amount: number
  inputRef: MutableRefObject<TextInput[]>
  setInputValues: Dispatch<SetStateAction<string[]>>
  inputValues: string[]
}

enum DigitAction {
  Previous = 'PREVIOUS',
  Next = 'NEXT',
  First = 'FIRST',
  Last = 'LAST',
  None = 'NONE'
}

function DigitInputs({ amount, inputRef, setInputValues, inputValues }: DigitInputsProps) {
  const digitInputMap: Record<string, DigitAction> = {
    '0': DigitAction.Next,
    '1': DigitAction.Next,
    '2': DigitAction.Next,
    '3': DigitAction.Next,
    '4': DigitAction.Next,
    '5': DigitAction.Next,
    '6': DigitAction.Next,
    '7': DigitAction.Next,
    '8': DigitAction.Next,
    '9': DigitAction.Next,
    'Backspace': DigitAction.Previous,
    'Delete': DigitAction.Next,
    'ArrowLeft': DigitAction.Previous,
    'ArrowRight': DigitAction.Next,
    'ArrowUp': DigitAction.Last,
    'ArrowDown': DigitAction.First,

  }
  const inputActionMap: Record<DigitAction, Function> = {
    'FIRST': () => setTimeout(() => { inputRef.current[0].focus() }, 10),
    'LAST': () => setTimeout(() => { inputRef.current[inputRef.current.length - 1].focus() }, 10),
    'PREVIOUS': (digitIndex: number) => setTimeout(() => { inputRef.current[digitIndex === 0 ? 0 : digitIndex - 1].focus() }, 10),
    'NEXT': (digitIndex: number) => setTimeout(() => { inputRef.current[digitIndex === amount - 1 ? amount - 1 : digitIndex + 1].focus() }, 10),
    'NONE': () => { }
  }
  function onChange(e: NativeSyntheticEvent<TextInputChangeEventData>, index: number) {
    let isInputValid = false
    Object.keys(digitInputMap).forEach(validInput => e.nativeEvent.text == validInput ? isInputValid = true : null)
    if (!isInputValid) {
      e.nativeEvent.text = ""
      setInputValues([...inputValues.slice(0, index), "", ...inputValues.slice(index)])
    }
    else setInputValues([...inputValues.slice(0, index), e.nativeEvent.text, ...inputValues.slice(index)])
  }
  function onKeyPress(e: NativeSyntheticEvent<TextInputKeyPressEventData>, digitIndex: number) {
    const instruction = digitInputMap[e.nativeEvent.key] || DigitAction.None;
    inputActionMap[instruction](...[digitIndex])
  }

  // function onPaste(e: React.ClipboardEvent<HTMLInputElement>) {
  //   const pastedCode = e.clipboardData.getData('text').split("")
  //   if (pastedCode.length === amount) inputRef.current.forEach((input: HTMLInputElement, index: number) => input.value = pastedCode[index])
  // }

  return (
    <View>
      {Array(amount)
        .fill(0)
        .map((_, index) => (
          <TextInput
            autoComplete="off"
            key={index}
            ref={(element) => (inputRef.current[index] = element as TextInput)}
            onKeyPress={(e) => onKeyPress(e, index)}
            onChange={e => onChange(e, index)}
            // onPaste={onPaste}
            // onPressOut={onPressOut}
            onChangeText={text => setInputValues([...inputValues.slice(0, index), text, ...inputValues.slice(index)])}
            keyboardType={"phone-pad"}
            maxLength={1}
            selectTextOnFocus={true}
          />
        ))}
    </View>
  );
}

export default DigitInputs;