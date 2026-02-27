// src/app/admin/layout.tsx
// Admin layout — wraps admin pages in a dark shell div (no extra html/body)

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white min-h-screen">
      {children}
    </div>
  );
}
