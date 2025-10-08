export default function Footer() {
  return (
    <footer className="border-t bg-white/80">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4 text-xs text-gray-600">
        <span>© {new Date().getFullYear()} Demo Multi-Zone MFEs</span>
        <span>Hard links para navegação entre MFEs</span>
      </div>
    </footer>
  );
}
