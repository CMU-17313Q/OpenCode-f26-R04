import { DialogSelect, type DialogSelectRef } from "../ui/dialog-select"
import { useTheme } from "../context/theme"
import { useDialog } from "../ui/dialog"
import { onCleanup } from "solid-js"

const themeEmojis: Record<string, string> = {
  aura: "✨",
  ayu: "🐟",
  carbonfox: "🦊",
  catppuccin: "☕",
  "catppuccin-frappe": "🥤",
  "catppuccin-macchiato": "🥛",
  cobalt2: "🔵",
  cursor: "🖱️",
  dracula: "🧛",
  everforest: "🌲",
  flexoki: "🖋️",
  github: "🐙",
  gruvbox: "🍂",
  kanagawa: "🌊",
  "lucent-orng": "🍊",
  material: "🧱",
  matrix: "🟢",
  mercury: "🪐",
  monokai: "🌈",
  nightowl: "🦉",
  nord: "❄️",
  "one-dark": "🌑",
  opencode: "💻",
  orng: "🍊",
  "osaka-jade": "💚",
  palenight: "🌙",
  rosepine: "🌹",
  rosenpine: "🌹",
  solarized: "☀️",
  synthwave84: "🎹",
  system: "🖥️",
  tokyonight: "🌃",
  vercel: "🚀",
  vesper: "🌇",
  zenburn: "🔥",
}

export function DialogThemeList() {
  const theme = useTheme()
  const options = Object.keys(theme.all())
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
    .map((value) => ({
      title: `${themeEmojis[value] ?? "✨"} ${value}`,
      value: value,
    }))
  const dialog = useDialog()
  let confirmed = false
  let ref: DialogSelectRef<string>
  const initial = theme.selected

  onCleanup(() => {
    if (!confirmed) theme.set(initial)
  })

  return (
    <DialogSelect
      title="Themes"
      options={options}
      current={initial}
      onMove={(opt) => {
        theme.set(opt.value)
      }}
      onSelect={(opt) => {
        theme.set(opt.value)
        confirmed = true
        dialog.clear()
      }}
      ref={(r) => {
        ref = r
      }}
      onFilter={(query) => {
        if (query.length === 0) {
          theme.set(initial)
          return
        }

        const first = ref.filtered[0]
        if (first) theme.set(first.value)
      }}
    />
  )
}
