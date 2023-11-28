import { type ChangeEvent, type KeyboardEvent, type MouseEvent, MutableRefObject } from "react"
import './DigitInputs.css'

type DigitInputsProps = {
    amount: number
    inputRef: MutableRefObject<HTMLInputElement[]>
}

enum DigitAction {
    Previous = 'PREVIOUS',
    Next = 'NEXT',
    First = 'FIRST',
    Last = 'LAST',
    None = 'NONE'
}

function DigitInputs ({ amount, inputRef }: DigitInputsProps) {

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
        'FIRST': () => setTimeout(() => { inputRef.current[0].select() }, 10),
        'LAST': () => setTimeout(() => { inputRef.current[inputRef.current.length - 1].select() }, 10),
        'PREVIOUS': (digitIndex: number) => setTimeout(() => { inputRef.current[digitIndex === 0 ? 0 : digitIndex - 1].select() }, 10),
        'NEXT': (digitIndex: number) => setTimeout(() => { inputRef.current[digitIndex === amount - 1 ? amount - 1 : digitIndex + 1].select() }, 10),
        'NONE': () => {}
    }

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        let isInputValid = false
        Object.keys(digitInputMap).forEach(validInput => e.target.value == validInput ? isInputValid = true : null)
        if (!isInputValid) return e.target.value = ""
    }

    function onDigitClick(e: MouseEvent<HTMLInputElement>) {
        e.currentTarget.select()
    }

    function onKeyDown(e: KeyboardEvent<HTMLInputElement>, digitIndex: number) {
        const instruction = digitInputMap[e.key] || DigitAction.None;
        inputActionMap[instruction](...[digitIndex])
    }

    function onPaste(e: React.ClipboardEvent<HTMLInputElement>) {
        const pastedCode = e.clipboardData.getData('text').split("")
        if (pastedCode.length === amount) inputRef.current.forEach((input: HTMLInputElement, index: number) => input.value = pastedCode[index])
    }

    return <div className="digitinputs">
        { Array(amount).fill(0).map((_, index) => <input
            key={index}
            ref={element => inputRef.current[index] = element as HTMLInputElement}
            onKeyDown={e => onKeyDown(e, index)}
            onChange={onChange}
            onPaste={onPaste}
            onClick={onDigitClick}
            className="digitinputs_digit"
            type="tel"
            maxLength={1}
            name={`digit${index}`}
            required
        />) }
    </div>
}

export default DigitInputs