type HeaderProps = {
  appName: string;
  otherBasePath: string;
};

export default function Header({ appName, otherBasePath }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded bg-black/80" />
          <span className="text-lg font-semibold">{appName}</span>
        </div>
        <nav className="hidden gap-4 md:flex">
          <a
            href={otherBasePath}
            className="rounded px-3 py-1.5 text-sm hover:bg-black/5"
          >
            Ir para {otherBasePath}
          </a>
        </nav>
      </div>
    </header>
  );
}
