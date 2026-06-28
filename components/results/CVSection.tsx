export default function CVSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
        {title}
      </h3>
      {children}
    </div>
  );
}
