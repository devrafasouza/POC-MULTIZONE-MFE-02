'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

type AppShellProps = {
  appName: string;
  basePath: string;
  otherBasePath: string;
  children: React.ReactNode;
};

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(' ');
}
const join = (a: string, b: string) => `${a}${b.startsWith('/') ? b : `/${b}`}`;

function NavContent({
  basePath,
  otherBasePath,
  onItemClick,
  pathname,
}: Readonly<{
  basePath: string;
  otherBasePath: string;
  onItemClick?: () => void;
  pathname: string;
}>) {
  const hasLogin = process.env.NEXT_PUBLIC_HAS_LOGIN === 'true';
  const hasReset = process.env.NEXT_PUBLIC_HAS_RESET === 'true';
  const otherSecondaryPath = process.env.NEXT_PUBLIC_OTHER_SECONDARY_PATH || '';
  const otherSecondaryLabel =
    process.env.NEXT_PUBLIC_OTHER_SECONDARY_LABEL || '';

  const nav: Array<{ label: string; href: string }> = [
    { label: 'Home', href: '/' },
  ];
  if (hasLogin) nav.push({ label: 'Login', href: '/login' });
  if (hasReset) nav.push({ label: 'Reset de Senha', href: '/reset' });

  const abs = (rel: string) => `${basePath}${rel === '/' ? '' : rel}`;
  const isActive = (rel: string) =>
    pathname === abs(rel) || pathname.startsWith(`${abs(rel)}/`);

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
        Navegação
      </div>

      <nav className="flex flex-col gap-1">
        {nav.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className={cx(
              'rounded-lg px-3 py-2 text-sm transition-colors',
              isActive(it.href)
                ? 'bg-slate-900 text-white'
                : 'hover:bg-black/5',
            )}
            onClick={onItemClick}
          >
            {it.label}
          </Link>
        ))}
      </nav>

      <div className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
        Outros
      </div>

      <nav className="flex flex-col gap-1">
        <a
          href={otherBasePath}
          className="rounded-lg px-3 py-2 text-sm hover:bg-black/5"
        >
          Ir para {otherBasePath}
        </a>
        {otherSecondaryPath && otherSecondaryLabel && (
          <a
            href={join(otherBasePath, otherSecondaryPath)}
            className="rounded-lg px-3 py-2 text-sm hover:bg-black/5"
          >
            {otherSecondaryLabel}
          </a>
        )}
      </nav>

      <div className="mt-auto text-xs text-gray-500">
        basePath: <code>{basePath}</code>
      </div>
    </div>
  );
}

export default function AppShell({
  appName,
  basePath,
  otherBasePath,
  children,
}: AppShellProps) {
  const [open, setOpen] = useState<boolean>(true);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 to-stone-100 text-slate-900">
      <header className="fixed inset-x-0 top-0 z-50 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="flex h-14 items-center gap-3 px-4">
          <button
            aria-label="Abrir/fechar navegação"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-9 items-center justify-center rounded-lg border bg-white/90 hover:bg-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <div className="size-7 rounded-lg bg-slate-900" />
            <span className="text-lg font-semibold tracking-tight">
              {appName}
            </span>
          </div>

          <div className="ml-auto hidden items-center gap-2 sm:flex">
            <a
              href={otherBasePath}
              className="rounded-lg border px-3 py-1.5 text-sm hover:bg-black/5"
            >
              Ir para {otherBasePath}
            </a>
            {process.env.NEXT_PUBLIC_OTHER_SECONDARY_PATH &&
              process.env.NEXT_PUBLIC_OTHER_SECONDARY_LABEL && (
                <a
                  href={join(
                    otherBasePath,
                    process.env.NEXT_PUBLIC_OTHER_SECONDARY_PATH!,
                  )}
                  className="rounded-lg border px-3 py-1.5 text-sm hover:bg-black/5"
                >
                  {process.env.NEXT_PUBLIC_OTHER_SECONDARY_LABEL}
                </a>
              )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-14">
        {open && (
          <div
            className="fixed inset-0 z-40 bg-black/40 sm:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        <aside
          className={cx(
            'fixed left-0 top-14 z-40 h-100% w-72 border-r bg-white transition-transform duration-300 sm:hidden',
            open ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <NavContent
            basePath={basePath}
            otherBasePath={otherBasePath}
            pathname={pathname}
            onItemClick={() => setOpen(false)}
          />
        </aside>

        <aside
          className={cx(
            'hidden h-100% overflow-hidden border-r bg-white transition-[width] duration-300 sm:block',
            open ? 'w-72' : 'w-0 border-0',
          )}
        >
          <div className={cx(open ? 'block' : 'hidden')}>
            <NavContent
              basePath={basePath}
              otherBasePath={otherBasePath}
              pathname={pathname}
            />
          </div>
        </aside>

        <main className="flex-1 bg-white/60 p-4">
          <div className="h-full rounded-xl border bg-white p-6 shadow-sm">
            {children}
          </div>
        </main>
      </div>
      <footer className="border-t bg-white/80">
        <div className="flex h-12 items-center justify-between px-4 text-xs text-gray-600">
          <span>© {new Date().getFullYear()} Demo Multi-Zone MFEs</span>
          <span>Hard links entre MFEs</span>
        </div>
      </footer>
    </div>
  );
}
