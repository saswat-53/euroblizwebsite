import type React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Keystatic Admin Login',
};

export default function KeystaticLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
