import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ChevronRight, Globe, Heart, MapPin, Package, Settings, Users } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — Vel'Afrika" }] }),
  component: Profile,
});

const rows = [
  { icon: Package, label: "Orders", sub: "2 in transit" },
  { icon: Heart, label: "Saved items", sub: "18 products" },
  { icon: Users, label: "Following", sub: "7 producers · 12 friends" },
  { icon: MapPin, label: "Addresses & shipping" },
  { icon: Globe, label: "Language", sub: "English" },
  { icon: Settings, label: "Settings" },
];

function Profile() {
  return (
    <AppShell title="Profile">
      <section className="px-5 pt-5">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-primary text-2xl font-semibold text-primary-foreground">
            A
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold">Amélie Dubois</h2>
            <p className="text-xs text-muted-foreground">Paris, France · Member since 2025</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl border border-border bg-card p-3 text-center">
          <Stat n="820" l="Points" />
          <Stat n="14" l="Orders" />
          <Stat n="42" l="Friends" />
        </div>
      </section>

      <section className="mt-6 px-5">
        <ul className="overflow-hidden rounded-2xl border border-border bg-card">
          {rows.map(({ icon: Icon, label, sub }, i) => (
            <li key={label}>
              <button className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-muted">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-accent text-foreground">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{label}</p>
                  {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
              {i < rows.length - 1 && <div className="mx-4 h-px bg-border" />}
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-6 text-center text-xs text-muted-foreground">Vel'Afrika · Crafted with care</p>
    </AppShell>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <p className="font-display text-lg font-semibold">{n}</p>
      <p className="text-[11px] text-muted-foreground">{l}</p>
    </div>
  );
}
