export default function Hero() {
  return (
    <section className="bg-navy text-white py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-sky/20 text-sky text-xs font-semibold px-3 py-1.5 rounded-full mb-6 tracking-wider uppercase">
            <span className="w-1.5 h-1.5 bg-sky rounded-full"></span>
            20+ Years of Industry Experience
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
            Pure Perfection.
            <br />
            <span className="text-sky">Every Time.</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl">
            Two decades of commercial cleaning expertise, now working directly
            for property managers, contractors, and business owners who demand
            a higher standard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#quote"
              className="inline-flex items-center justify-center bg-sky hover:bg-sky/90 text-white font-semibold px-8 py-4 rounded-lg text-base transition-colors"
            >
              Request a Free Quote
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center border border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-lg text-base transition-colors"
            >
              Our Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
