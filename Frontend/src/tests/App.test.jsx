import "@testing-library/jest-dom"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { vi } from "vitest"
import App from "../App"
import * as client from "../api/client"

vi.mock("../api/client")

beforeEach(() => {
  client.getPayloads.mockResolvedValue({ payloads: [] })
})

test("renders textarea, schema dropdown and validate button", () => {
  render(<App />)
  expect(screen.getByLabelText("JSON")).toBeInTheDocument()
  expect(screen.getByLabelText("Schema")).toBeInTheDocument()
  expect(screen.getByText("Validate")).toBeInTheDocument()
})

test("shows PASS when validation succeeds", async () => {
  client.validatePayload.mockResolvedValue({ ok: true, errors: [], warnings: [], summary: { id: "123", email: "test@test.com" } })
  render(<App />)
  fireEvent.change(screen.getByLabelText("JSON"), { target: { value: '{"id":"123","email":"test@test.com","age":25,"country":"US"}' } })
  fireEvent.click(screen.getByText("Validate"))
  await waitFor(() => expect(screen.getByText("PASS")).toBeInTheDocument())
})

test("shows FAIL and errors when rules are violated", async () => {
  client.validatePayload.mockResolvedValue({ ok: false, errors: [{ field: "email", message: "Invalid email address" }], warnings: [], summary: {} })
  render(<App />)
  fireEvent.change(screen.getByLabelText("JSON"), { target: { value: '{"id":"123","email":"bad","age":25,"country":"US"}' } })
  fireEvent.click(screen.getByText("Validate"))
  await waitFor(() => expect(screen.getByText("FAIL")).toBeInTheDocument())
  expect(screen.getByText(/Invalid email address/)).toBeInTheDocument()
})

test("shows error banner when json is invalid", async () => {
  render(<App />)
  fireEvent.change(screen.getByLabelText("JSON"), { target: { value: "this is not json" } })
  fireEvent.click(screen.getByText("Validate"))
  await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument())
})