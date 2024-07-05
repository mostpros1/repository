import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import Cal from "../src/components/Agenda/cal.tsx";
import React from 'react';

test('demo', () => {
    expect(true).toBe(true)
})

test("Renders the main page", () => {
    render(<Cal />)
    expect(true).toBeTruthy()
})

jest.setTimeout(10000); // 10 seconds
