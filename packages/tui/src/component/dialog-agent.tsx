import { createMemo } from "solid-js"
import { useLocal } from "../context/local"
import { DialogSelect } from "../ui/dialog-select"
import { useDialog } from "../ui/dialog"

export function DialogAgent() {
  const local = useLocal()
  const dialog = useDialog()

  const current = createMemo(() => local.agent.current()?.name)

  const options = createMemo(() =>
    local.agent.list().map((item) => ({
      value: item.name,
      title: item.name === current() ? `${item.name} (current)` : item.name,
      description: item.native ? "native" : item.description,
    })),
  )

  return (
    <DialogSelect
      title="Select agent"
      current={local.agent.current()?.name}
      options={options()}
      onSelect={(option) => {
        local.agent.set(option.value)
        dialog.clear()
      }}
    />
  )
}
