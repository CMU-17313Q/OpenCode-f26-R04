import { describe, expect, test } from "bun:test"
import { isDefaultTitle, shouldShowSessionErrorToast } from "../../src/util/session"

describe("util.session", () => {
  test("recognizes generated parent and child titles", () => {
    expect(isDefaultTitle("New session - 2026-06-06T12:34:56.789Z")).toBeTrue()
    expect(isDefaultTitle("Child session - 2026-06-06T12:34:56.789Z")).toBeTrue()
    expect(isDefaultTitle("New session - custom")).toBeFalse()
  })

  test("suppresses duplicate error toasts for the visible session", () => {
    expect(shouldShowSessionErrorToast({ type: "session", sessionID: "current" }, "current")).toBeFalse()
    expect(shouldShowSessionErrorToast({ type: "session", sessionID: "current" }, "other")).toBeTrue()
    expect(shouldShowSessionErrorToast({ type: "home" }, "current")).toBeTrue()
    expect(shouldShowSessionErrorToast({ type: "home" })).toBeTrue()
  })
})
