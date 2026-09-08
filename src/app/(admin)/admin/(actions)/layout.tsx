export default function AdminActionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="p-4 lg:p-6 h-full w-full max-w-full min-w-0 overflow-x-hidden">{children}</div>;
}
