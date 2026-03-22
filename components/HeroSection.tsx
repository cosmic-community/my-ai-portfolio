import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
      {/* Background glow */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          AI Developer &amp; Engineer
        </div>

        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 animate-slide-up">
          Building the Future
          <br />
          <span className="gradient-text">with AI</span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.15s' }}>
          Passionate about creating intelligent solutions that push the boundaries
          of technology. Explore my projects, skills, and professional journey.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
          >
            View Projects
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/experience"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-600 text-slate-300 font-semibold hover:border-slate-500 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
          >
            My Experience
          </Link>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto animate-fade-in" style={{ animationDelay: '0.5s' }}>
          {[
            { label: 'Projects', icon: '🚀' },
            { label: 'Skills', icon: '💡' },
            { label: 'Experience', icon: '💼' },
          ].map((stat) => (
            <Link
              key={stat.label}
              href={`/${stat.label.toLowerCase()}`}
              className="text-center group"
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-sm text-slate-400 group-hover:text-blue-400 transition-colors">
                {stat.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}