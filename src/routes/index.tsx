import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeader } from "@/components/SectionHeader";
import { products, producers, bundles } from "@/lib/data";
import { Truck, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-artisan.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vel'Afrika — Handmade by African artisans" },
      { name: "description", content: "Discover authentic handcrafted goods from verified African producers. Shipped worldwide with a delivery guarantee." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <AppShell>
      {/* Hero */}
      <section className="px-5 pt-4">
        <div className="relative overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)]">
          <img
            src={heroImg}
            alt="African artisan with handwoven baskets"
            width={1024}
            height={1280}
            className="aspect-[4/5] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-background">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-background/15 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider backdrop-blur">
              <Sparkles className="h-3 w-3" /> Season collection
            </span>
            <h1 className="mt-2.5 font-display text-3xl font-semibold leading-[1.05] tracking-tight">
              Handmade<br />in West Africa.
            </h1>
            <p className="mt-1.5 max-w-[18rem] text-sm text-background/85">
              Stories woven by hand. Delivered to your door, guaranteed.
            </p>
            <Link
              to="/discover"
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-background/90"
            >
              Shop the collection <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="mt-5 px-5">
        <div className="grid grid-cols-3 gap-2 rounded-2xl border border-border bg-card p-3">
          <TrustItem icon={<Truck className="h-4 w-4" />} title="On-time" sub="or refund" />
          <TrustItem icon={<ShieldCheck className="h-4 w-4" />} title="Verified" sub="producers" />
          <TrustItem icon={<Sparkles className="h-4 w-4" />} title="Handmade" sub="originals" />
        </div>
      </section>

      {/* Trending */}
      <section className="mt-8">
        <SectionHeader title="Trending now" subtitle="Loved across 42 countries" action="See all" />
        <div className="no-scrollbar flex gap-3 overflow-x-auto px-5 pb-1">
          {products.slice(0, 4).map((p) => (
            <div key={p.id} className="w-[160px] shrink-0">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Featured producers */}
      <section className="mt-8">
        <SectionHeader title="Meet the makers" subtitle="Follow the hands behind the craft" action="Browse" />
        <div className="no-scrollbar flex gap-3 overflow-x-auto px-5 pb-1">
          {producers.map((p) => (
            <div key={p.id} className="w-[220px] shrink-0 overflow-hidden rounded-2xl border border-border bg-card">
              <img src={p.avatar} alt={p.name} width={640} height={640} loading="lazy" className="aspect-square w-full object-cover" />
              <div className="p-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold">{p.name}</h3>
                  <span className="rounded-full bg-leaf/10 px-1.5 py-0.5 text-[10px] font-semibold text-leaf">Verified</span>
                </div>
                <p className="text-xs text-muted-foreground">{p.craft} · {p.country}</p>
                <button className="mt-2 w-full rounded-full bg-foreground py-1.5 text-xs font-semibold text-background">
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New arrivals grid */}
      <section className="mt-8">
        <SectionHeader title="New arrivals" subtitle="Fresh from the workshop" />
        <div className="grid grid-cols-2 gap-3 px-5">
          {products.slice(1, 5).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Bundle */}
      <section className="mt-8 px-5">
        <SectionHeader title="Suggested bundles" subtitle="Save more, share more" />
        <div className="space-y-3 px-0">
          {bundles.map((b) => (
            <div key={b.id} className="flex gap-3 overflow-hidden rounded-2xl border border-border bg-card p-3">
              <img src={b.image} alt={b.name} width={200} height={200} loading="lazy" className="h-24 w-24 shrink-0 rounded-xl object-cover" />
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold">{b.name}</h3>
                    <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                      Save ${b.savings}
                    </span>
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{b.items.join(" · ")}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">${b.price}</span>
                  <button className="rounded-full bg-foreground px-3 py-1.5 text-xs font-semibold text-background">
                    Add bundle
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust banner */}
      <section className="mt-8 px-5">
        <div className="rounded-2xl bg-foreground p-5 text-background">
          <ShieldCheck className="h-5 w-5 text-ochre" />
          <p className="mt-2 font-display text-lg font-semibold leading-tight">
            Delivered within the promised timeline — or your money back.
          </p>
          <p className="mt-1 text-xs text-background/70">Tracked, insured, and worldwide.</p>
        </div>
      </section>
    </AppShell>
  );
}

function TrustItem({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="grid h-7 w-7 place-items-center rounded-full bg-primary/10 text-primary">{icon}</div>
      <div className="mt-1.5 text-[11px] font-semibold leading-tight">{title}</div>
      <div className="text-[10px] text-muted-foreground">{sub}</div>
    </div>
  );
}
