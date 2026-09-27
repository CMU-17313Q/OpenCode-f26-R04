import { describe, expect, test } from "bun:test"
import { sessionTitle, withTimestampedFallback } from "./session-title"

describe("session titles", () => {
  test("formats fallback titles with a readable timestamp", () => {
    const info = { time: { created: Date.parse("2026-09-21T14:30:00.000Z") } }

    expect(withTimestampedFallback(info)).toBe("New session - Sep 21, 2026, 2:30 PM")
    expect(withTimestampedFallback({ ...info, parentID: "parent-1" })).toBe("Child session - Sep 21, 2026, 2:30 PM")
  })

  test("removes generated timestamps from session titles", () => {
    expect(sessionTitle("New session - Sep 21, 2026, 2:30 PM")).toBe("New session")
    expect(sessionTitle("A named session")).toBe("A named session")
  })
})