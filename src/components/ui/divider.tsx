interface Props {
  label?: string
}

export const Divider = ({ label }: Props) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="border-muted w-full border-t"></div>
      </div>
      <div className="relative flex justify-center">
        <span className="bg-muted text-foreground px-2 text-sm">{label}</span>
      </div>
    </div>
  )
}
