'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SidebarNavProps = {
  basePath: string;
  otherBasePath: string;
};

function cx(...cls: Array<string | false | null | undefined>) {
  return cls.filter(Boolean).join(' ');
}

export default function SidebarNav({
  basePath,
  otherBasePath,
}: SidebarNavProps) {
  const pathname = usePathname();

  const items = [
    { label: 'Home', href: '/' },
    { label: 'Reset de Senha', href: '/reset' },
  ];

  const abs = (relHref: string) =>
    `${basePath}${relHref === '/' ? '' : relHref}`;

  const isActive = (relHref: string) =>
    pathname === abs(relHref) || pathname.startsWith(`${abs(relHref)}/`);

  return (
    <aside className="border-r bg-gray-50/60">
      <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col gap-2 p-4">
        <div className="text-xs font-semibold text-gray-500">Navegação</div>

        <nav className="flex flex-col gap-1">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className={cx(
                'rounded px-3 py-2 text-sm',
                isActive(it.href) ? 'bg-black text-white' : 'hover:bg-black/5',
              )}
            >
              {it.label}
            </Link>
          ))}

          <div className="mt-4 text-xs font-semibold text-gray-500">Outros</div>

          <a
            href={otherBasePath}
            className="rounded px-3 py-2 text-sm hover:bg-black/5"
          >
            Ir para {otherBasePath}
          </a>
          <a
            href={`${otherBasePath}/reset`}
            className="rounded px-3 py-2 text-sm hover:bg-black/5"
          >
            Reset no {otherBasePath}
          </a>
        </nav>

        <div className="mt-auto text-xs text-gray-500">
          basePath: <code>{basePath}</code>
        </div>
      </div>
    </aside>
  );
}
