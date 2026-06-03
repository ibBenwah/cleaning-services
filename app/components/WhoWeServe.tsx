import { Building, HardHat, Layers, Store } from "lucide-react";

const clients = [
  {
    icon: Building,
    title: "Commercial Buildings",
    description:
      "Property managers and building owners who need a dependable cleaning partner — not a vendor they have to chase.",
  },
  {
    icon: HardHat,
    title: "New Construction",
    description:
      "Post-build cleanouts on active and completed construction sites. We handle the debris, dust, and detail work so you can hand over on time.",
  },
  {
    icon: Layers,
    title: "Apartment Complexes",
    description:
      "Units, common areas, laundry rooms, and turnover cleaning. We keep your property attractive to current and prospective tenants.",
  },
  {
    icon: Store,
    title: "Local Businesses",
    description:
      "Offices, retail shops, restaurants, and any size commercial space. A clean business makes a better first impression — every time.",
  },
];

export default function WhoWeServe() {
  return (
    <section id="who-we-serve" className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <p className="text-sky text-sm font-semibold tracking-widest uppercase mb-3">
            Who We Work With
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy">
            Built for the People Who Manage Properties
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {clients.map((client) => {
            const Icon = client.icon;
            return (
              <div
                key={client.title}
                className="flex gap-5 p-6 rounded-xl border border-slate-100 hover:border-sky/30 hover:shadow-sm transition-all"
              >
                <div className="shrink-0 w-12 h-12 bg-navy/5 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-navy" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy mb-1.5">
                    {client.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {client.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
