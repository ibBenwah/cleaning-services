import Link from "next/link";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Who We Serve", href: "#who-we-serve" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#quote" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-navy border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex flex-col leading-tight">
            <span className="text-white font-bold text-lg tracking-tight">
              Pure Perfection
            </span>
            <span className="text-sky text-xs font-medium tracking-widest uppercase">
              Cleaning LLC
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/70 hover:text-white text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#quote"
            className="bg-sky hover:bg-sky/90 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            Get a Free Quote
          </a>
        </div>
      </div>
    </header>
  );
}
