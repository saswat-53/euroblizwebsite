'use client';

import { useRouter } from 'next/navigation';
import './keystatic-override.css';

export default function KeystaticLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/keystatic-login');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleLogout}
        className="fixed bottom-4 left-2 z-50 w-60 px-4 py-3 bg-transparent hover:bg-[#404040] text-gray-300 hover:text-white text-sm font-medium rounded-md transition-all outline-none focus:outline-none"
        title="Logout from Keystatic CMS"
      >
        <span className="flex justify-center items-center gap-3">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span>Logout</span>
        </span>
      </button>
      {children}
    </div>
  )
}
