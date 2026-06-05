import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { friendActivity, products, producers } from "@/lib/data";
import { Heart, MessageCircle, Share2, UserPlus, Video } from "lucide-react";

export const Route = createFileRoute("/social")({
  head: () => ({ meta: [{ title: "Social — Vel'Afrika" }] }),
  component: Social,
});

const collections = [
  { id: "c1", name: "Summer Home Décor", owner: "Sarah", count: 14, cover: products[0].image },
  { id: "c2", name: "Handmade Fashion Picks", owner: "Mei", count: 9, cover: products[5].image },
];

function Social() {
  return (
    <AppShell title="Social">
      {/* Shared collections */}
      <section className="px-5 pt-4">
        <h2 className="font-display text-xl font-semibold tracking-tight">Shared collections</h2>
        <p className="mt-0.5 text-xs text-muted-foreground">Curated by friends, ready to shop</p>
        <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto pb-1">
          {collections.map((c) => (
            <div key={c.id} className="relative w-[220px] shrink-0 overflow-hidden rounded-2xl">
              <img src={c.cover} alt={c.name} className="aspect-[4/5] w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 text-background">
                <h3 className="font-display text-base font-semibold leading-tight">{c.name}</h3>
                <p className="mt-0.5 text-xs text-background/80">by {c.owner} · {c.count} items</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Suggested friends */}
      <section className="mt-7 px-5">
        <h2 className="font-display text-xl font-semibold tracking-tight">Producers to follow</h2>
        <div className="mt-3 space-y-2">
          {producers.map((p) => (
            <div key={p.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
              <img src={p.avatar} alt={p.name} className="h-12 w-12 rounded-full object-cover" loading="lazy" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">{p.name}</p>
                <p className="truncate text-xs text-muted-foreground">{p.craft} · {p.followers.toLocaleString()} followers</p>
              </div>
              <Link
                to="/call/$id"
                params={{ id: p.id }}
                aria-label={`Video call ${p.name}`}
                className="grid h-9 w-9 place-items-center rounded-full bg-leaf/15 text-leaf"
              >
                <Video className="h-4 w-4" />
              </Link>
              <button className="flex items-center gap-1 rounded-full bg-foreground px-3 py-1.5 text-xs font-semibold text-background">
                <UserPlus className="h-3 w-3" /> Follow
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Activity feed */}
      <section className="mt-7 px-5">
        <h2 className="font-display text-xl font-semibold tracking-tight">Friend activity</h2>
        <ul className="mt-3 space-y-3">
          {friendActivity.map((a) => (
            <li key={a.id} className="flex gap-3 rounded-2xl border border-border bg-card p-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-sm font-semibold">
                {a.name[0]}
              </div>
              <div className="flex-1">
                <p className="text-sm leading-snug">
                  <span className="font-semibold">{a.name}</span>{" "}
                  <span className="text-muted-foreground">in {a.city} {a.action}</span>{" "}
                  <span className="font-medium">{a.item}</span>
                </p>
                <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                  <button className="flex items-center gap-1"><Heart className="h-3.5 w-3.5" /> Like</button>
                  <button className="flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5" /> Reply</button>
                  <Link to="/call/$id" params={{ id: a.name }} className="flex items-center gap-1 text-leaf">
                    <Video className="h-3.5 w-3.5" /> Video
                  </Link>
                  <button className="flex items-center gap-1"><Share2 className="h-3.5 w-3.5" /> Share</button>
                  <span className="ml-auto">{a.time}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </AppShell>
  );
}
