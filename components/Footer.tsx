import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800/50 bg-slate-950/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 text-lg font-bold mb-3">
              <span className="text-xl">🤖</span>
              <span className="gradient-text">My AI Portfolio</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              AI developer portfolio showcasing projects, skills, and professional experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/projects', label: 'Projects' },
                { href: '/skills', label: 'Skills' },
                { href: '/experience', label: 'Experience' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-blue-400 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Built With */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Built With
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Next.js 16</li>
              <li>Tailwind CSS</li>
              <li>Cosmic CMS</li>
              <li>TypeScript</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-800/50 text-center">
          <p className="text-slate-500 text-sm">
            © {currentYear} My AI Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}