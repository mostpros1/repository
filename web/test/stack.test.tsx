import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import App from "../src/App/App"
import React from 'react'

test('demo', () => {
    expect(true).toBe(true)
})

test("Renders the main page", () => {
    render(<App />)
    expect(true).toBeTruthy()
})

jest.setTimeout(10000); // 10 seconds
