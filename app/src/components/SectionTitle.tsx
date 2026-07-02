interface Props {
  title: string
  action?: string
  onAction?: () => void
}

export function SectionTitle({ title, action, onAction }: Props) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      {action && <button onClick={onAction}>{action}</button>}
    </div>
  )
}
