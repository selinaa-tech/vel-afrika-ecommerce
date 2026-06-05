import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Gift, Share2, Star, UserPlus, Camera, ShoppingBag, Sparkles } from "lucide-react";

export const Route = createFileRoute("/rewards")({
  head: () => ({ meta: [{ title: "Rewards — Vel'Afrika" }] }),
  component: Rewards,
});

const ways = [
  { icon: Star, label: "Review a product", points: 50 },
  { icon: Share2, label: "Share a product", points: 20 },
  { icon: UserPlus, label: "Invite a friend", points: 200 },
  { icon: Camera, label: "Upload a photo", points: 30 },
  { icon: ShoppingBag, label: "Complete a purchase", points: 100 },
  { icon: Sparkles, label: "7-day shopping streak", points: 150 },
];

const perks = [
  { name: "Free worldwide shipping", points: 500, unlocked: true },
  { name: "Early access to drops", points: 1200, unlocked: false },
  { name: "Limited collection unlock", points: 2500, unlocked: false },
];

function Rewards() {
  return (
    <AppShell title="Rewards">
      {/* Points card */}
      <section className="px-5 pt-4">
        <div className="overflow-hidden rounded-3xl bg-foreground p-5 text-background">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-background/60">Your balance</p>
              <p className="mt-1 font-display text-4xl font-semibold">820 <span className="text-base font-normal text-background/70">pts</span></p>
            </div>
            <div className="grid h-14 w-14 place-items-center rounded-full bg-ochre/90 text-foreground">
              <Gift className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-[11px] text-background/70">
              <span>Discoverer</span><span>Wanderer · 1,200 pts</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-background/15">
              <div className="h-full w-[68%] rounded-full bg-ochre" />
            </div>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="mt-7 px-5">
        <h2 className="font-display text-xl font-semibold tracking-tight">Redeem perks</h2>
        <div className="mt-3 space-y-2">
          {perks.map((p) => (
            <div key={p.name} className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
              <div>
                <p className="text-sm font-semibold">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.points} points</p>
              </div>
              <button
                disabled={!p.unlocked}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  p.unlocked ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {p.unlocked ? "Redeem" : "Locked"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Ways to earn */}
      <section className="mt-7 px-5">
        <h2 className="font-display text-xl font-semibold tracking-tight">Earn more points</h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {ways.map(({ icon: Icon, label, points }) => (
            <div key={label} className="rounded-2xl border border-border bg-card p-3">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-4 w-4" />
              </div>
              <p className="mt-2 text-sm font-medium leading-tight">{label}</p>
              <p className="mt-0.5 text-xs text-primary">+{points} pts</p>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
