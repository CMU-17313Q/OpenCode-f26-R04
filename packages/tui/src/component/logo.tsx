import { RGBA, TextAttributes } from "@opentui/core"
import { createSignal, For, onCleanup, type JSX } from "solid-js"
import { tint, useTheme } from "../context/theme"
import { logo } from "../logo"

const LETTER_WIDTH = 4
const LETTER_STRIDE = 5
const LETTER_COUNT = 4
const TOTAL_LETTERS = LETTER_COUNT * 2

const BOB_ROWS = 2
const BOB_PERIOD_MS = 4000
// Delay between one letter starting its dip and the next: this is what makes it a wave.
const BOB_STAGGER_MS = 150
const FRAME_MS = 50

const WAVE_FROM = RGBA.fromHex("#4F8CFF")
const WAVE_TO = RGBA.fromHex("#B36BFF")

function mix(a: RGBA, b: RGBA, amount: number): RGBA {
  return RGBA.fromValues(a.r + (b.r - a.r) * amount, a.g + (b.g - a.g) * amount, a.b + (b.b - a.b) * amount, 1)
}

const LETTER_COLORS = Array.from({ length: TOTAL_LETTERS }, (_, index) =>
  mix(WAVE_FROM, WAVE_TO, index / (TOTAL_LETTERS - 1)),
)

export function Logo() {
  const { theme } = useTheme()
  const [elapsed, setElapsed] = createSignal(0)

  const started = Date.now()
  const timer = setInterval(() => setElapsed(Date.now() - started), FRAME_MS)
  onCleanup(() => clearInterval(timer))

  const offset = (slot: number) => {
    const phase = (2 * Math.PI * (elapsed() - slot * BOB_STAGGER_MS)) / BOB_PERIOD_MS
    return Math.round((BOB_ROWS / 2) * (1 - Math.cos(phase)))
  }

  const letter = (lines: string[], index: number) =>
    lines.map((line) => line.slice(index * LETTER_STRIDE, index * LETTER_STRIDE + LETTER_WIDTH))

  const renderLine = (line: string, fg: RGBA, bold: boolean): JSX.Element[] => {
    const shadow = tint(theme.background, fg, 0.25)
    const attrs = bold ? TextAttributes.BOLD : undefined
    return Array.from(line).map((char) => {
      if (char === "_") {
        return (
          <text fg={fg} bg={shadow} attributes={attrs} selectable={false}>
            {" "}
          </text>
        )
      }
      if (char === "^") {
        return (
          <text fg={fg} bg={shadow} attributes={attrs} selectable={false}>
            ▀
          </text>
        )
      }
      if (char === "~") {
        return (
          <text fg={shadow} attributes={attrs} selectable={false}>
            ▀
          </text>
        )
      }
      if (char === ",") {
        return (
          <text fg={shadow} attributes={attrs} selectable={false}>
            ▄
          </text>
        )
      }
      return (
        <text fg={fg} attributes={attrs} selectable={false}>
          {char}
        </text>
      )
    })
  }

  const Letter = (props: { lines: string[]; fg: RGBA; bold: boolean; slot: number }): JSX.Element => (
    <box flexDirection="column" paddingTop={offset(props.slot)} paddingBottom={BOB_ROWS - offset(props.slot)}>
      <For each={props.lines}>{(line) => <box flexDirection="row">{renderLine(line, props.fg, props.bold)}</box>}</For>
    </box>
  )

  const slots = Array.from({ length: LETTER_COUNT }, (_, index) => index)

  return (
    <box flexDirection="row" gap={1}>
      <For each={slots}>
        {(index) => <Letter lines={letter(logo.left, index)} fg={LETTER_COLORS[index]} bold={true} slot={index} />}
      </For>
      <For each={slots}>
        {(index) => (
          <Letter
            lines={letter(logo.right, index)}
            fg={LETTER_COLORS[index + LETTER_COUNT]}
            bold={true}
            slot={index + LETTER_COUNT}
          />
        )}
      </For>
    </box>
  )
}
