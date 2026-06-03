import { ShieldCheck } from "lucide-react";

const trustPoints = [
  "20+ Years of Industry Experience",
  "Licensed & Insured",
  "Flexible Scheduling — Your Hours, Not Ours",
  "Commercial-Grade Products & Equipment",
  "Consistent, Vetted Cleaning Teams",
  "No Long-Term Contracts Required",
];

const stats = [
  { value: "20+", label: "Years of Experience" },
  { value: "5", label: "Specialized Services" },
  { value: "100%", label: "Satisfaction Focus" },
];

export default function WhyUs() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-navy text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sky text-sm font-semibold tracking-widest uppercase mb-3">
              Why Pure Perfection
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Two Decades of Experience.
              <br />
              A Brand New Standard.
            </h2>
            <p className="text-white/70 leading-relaxed mb-8">
              Our owner has spent over 20 years in the commercial cleaning
              industry — and started Pure Perfection Cleaning LLC to do things
              right. That means showing up on time, doing the work correctly,
              and communicating clearly. No guesswork, no excuses.
            </p>

            <ul className="space-y-3">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-center gap-3 text-sm">
                  <ShieldCheck className="w-4 h-4 text-sky shrink-0" />
                  <span className="text-white/80">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/5 border border-white/10 rounded-xl px-8 py-6 flex items-center gap-6"
              >
                <span className="text-4xl font-bold text-sky">
                  {stat.value}
                </span>
                <span className="text-white/70 text-sm font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
