import type { Route } from "../context/route"

export function isDefaultTitle(title: string) {
  return /^(New session - |Child session - )\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(title)
}

export function shouldShowSessionErrorToast(route: Route, sessionID?: string) {
  if (!sessionID) return true
  if (route.type !== "session") return true
  return route.sessionID !== sessionID
}
