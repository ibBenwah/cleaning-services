const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Who We Serve", href: "#who-we-serve" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#quote" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy border-t border-white/10 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="flex flex-col leading-tight mb-3">
              <span className="font-bold text-lg tracking-tight">
                Pure Perfection
              </span>
              <span className="text-sky text-xs font-medium tracking-widest uppercase">
                Cleaning LLC
              </span>
            </div>
            <p className="text-white/50 text-sm max-w-xs">
              Commercial cleaning done right — 20+ years of expertise serving
              property managers, contractors, and business owners.
            </p>
            <div className="mt-4 space-y-1 text-sm text-white/50">
              <p>📞 (000) 000-0000</p>
              <p>✉ info@pureperfectioncleaning.com</p>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            <p className="text-white/30 text-xs font-semibold tracking-widest uppercase mb-1">
              Navigation
            </p>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-white/30 text-xs">
          © {year} Pure Perfection Cleaning LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
