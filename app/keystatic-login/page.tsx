'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import en from '@/messages/en.json';
import fr from '@/messages/fr.json';

type Locale = 'en' | 'fr';

const messages = { en, fr };

function getTranslations(locale: Locale) {
  return messages[locale].keystatic.login;
}

function getPreferredLocale(): Locale {
  if (typeof window === 'undefined') return 'en';

  // Check for stored preference or browser language
  const storedLocale = document.cookie
    .split('; ')
    .find(row => row.startsWith('NEXT_LOCALE='))
    ?.split('=')[1];

  if (storedLocale === 'fr') return 'fr';
  if (storedLocale === 'en') return 'en';

  // Fallback to browser language
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('fr')) return 'fr';

  return 'en';
}

export default function KeystaticLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [locale, setLocale] = useState<Locale>('en');
  const [t, setT] = useState(getTranslations('en'));

  useEffect(() => {
    const preferredLocale = getPreferredLocale();
    setLocale(preferredLocale);
    setT(getTranslations(preferredLocale));
  }, []);

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'fr' : 'en';
    setLocale(newLocale);
    setT(getTranslations(newLocale));
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/keystatic');
        router.refresh();
      } else {
        setError(data.error || t.errorDefault);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(t.errorGeneric);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100 dark:bg-gray-900">
      {/* Language Toggle */}
      <button
        onClick={toggleLocale}
        className="fixed top-4 right-4 px-3 py-1.5 text-sm font-medium bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        title={locale === 'en' ? 'Switch to French' : 'Passer en anglais'}
      >
        {locale === 'en' ? 'FR' : 'EN'}
      </button>

      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <img
              src="/logo-trial-1.png"
              alt="Eurobliz Logo"
              className="h-16 w-auto"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t.subtitle}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              {t.username}
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t.usernamePlaceholder}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
              autoFocus
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              {t.password}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.passwordPlaceholder}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !username || !password}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {t.submitting}
              </span>
            ) : (
              t.submit
            )}
          </button>
        </form>

        {/* Security Notice */}
        <p className="mt-6 text-xs text-center text-gray-500 dark:text-gray-400">
          {t.securityNotice}
        </p>
      </div>
    </div>
  );
}
