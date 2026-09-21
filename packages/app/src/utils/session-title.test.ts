import { describe, expect, test } from "bun:test"
import { sessionTitle } from "./session-title"

describe("sessionTitle", () => {
  test("hides a default session timestamp without milliseconds", () => {
    expect(sessionTitle("New session - 2026-09-21T12:34:56Z")).toBe("New session")
  })
})
