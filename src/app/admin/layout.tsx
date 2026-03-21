// src/app/admin/layout.tsx
// Admin layout — dark shell with startup-quality base

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 text-gray-900 dark:bg-[#0D1117] dark:text-gray-100 min-h-screen">
      {children}
    </div>
  );
}
