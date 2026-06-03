import {
  Building2,
  Sparkles,
  CheckCircle2,
  Star,
  ArrowLeftRight,
} from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Commercial Cleaning",
    description:
      "Reliable, scheduled cleaning for offices, retail spaces, and commercial properties. We keep your business looking its best — every single day.",
  },
  {
    icon: Sparkles,
    title: "Strip & Wax",
    description:
      "Professional floor stripping and waxing that restores hard floors to a showroom finish. We strip the old, apply fresh wax, and buff to a lasting shine.",
  },
  {
    icon: CheckCircle2,
    title: "Standard Cleaning",
    description:
      "A thorough top-to-bottom clean for any space, on your schedule. Consistent results you can count on — whether weekly, bi-weekly, or monthly.",
  },
  {
    icon: Star,
    title: "Super Deep Clean",
    description:
      "Intensive, detail-oriented cleaning for spaces that need a complete reset. We get into every corner, surface, and fixture — nothing gets missed.",
  },
  {
    icon: ArrowLeftRight,
    title: "Move In / Move Out",
    description:
      "Leave it spotless. Arrive to one. We handle end-of-tenancy and new-build cleaning so properties are move-ready from day one.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-28 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <p className="text-sky text-sm font-semibold tracking-widest uppercase mb-3">
            What We Do
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy">
            Specialized Services for Every Need
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="bg-white rounded-xl p-6 border border-slate-100 hover:border-sky/30 hover:shadow-md transition-all"
              >
                <div className="w-11 h-11 bg-sky/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-sky" />
                </div>
                <h3 className="text-lg font-semibold text-navy mb-2">
                  {service.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
