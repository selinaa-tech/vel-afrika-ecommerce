export function SectionHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: string }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3 px-5">
      <div>
        <h2 className="font-display text-xl font-semibold tracking-tight">{title}</h2>
        {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      {action && <button className="text-xs font-medium text-primary">{action}</button>}
    </div>
  );
}
