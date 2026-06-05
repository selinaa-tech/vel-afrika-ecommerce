import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { products } from "@/lib/data";
import { Minus, Plus, ShieldCheck, Truck, Trash2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — Vel'Afrika" }] }),
  component: Cart,
});

function Cart() {
  const [items, setItems] = useState([
    { ...products[0], qty: 1 },
    { ...products[2], qty: 1 },
  ]);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = 12;
  const total = subtotal + shipping;

  const update = (id: string, delta: number) =>
    setItems((arr) => arr.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  const remove = (id: string) => setItems((arr) => arr.filter((i) => i.id !== id));

  return (
    <AppShell title="Your cart">
      <section className="space-y-3 px-5 pt-4">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <p className="text-sm text-muted-foreground">Your cart is empty.</p>
            <Link to="/discover" className="mt-3 inline-block rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background">
              Discover products
            </Link>
          </div>
        ) : items.map((it) => (
          <div key={it.id} className="flex gap-3 rounded-2xl border border-border bg-card p-3">
            <img src={it.image} alt={it.name} className="h-24 w-24 shrink-0 rounded-xl object-cover" loading="lazy" />
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold leading-tight">{it.name}</h3>
                  <button onClick={() => remove(it.id)} aria-label="Remove"><Trash2 className="h-4 w-4 text-muted-foreground" /></button>
                </div>
                <p className="text-xs text-muted-foreground">{it.country} · {it.shipping}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 rounded-full border border-border">
                  <button onClick={() => update(it.id, -1)} className="grid h-7 w-7 place-items-center"><Minus className="h-3 w-3" /></button>
                  <span className="text-sm font-semibold">{it.qty}</span>
                  <button onClick={() => update(it.id, 1)} className="grid h-7 w-7 place-items-center"><Plus className="h-3 w-3" /></button>
                </div>
                <span className="text-sm font-semibold">${it.price * it.qty}</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {items.length > 0 && (
        <>
          <section className="mt-5 px-5">
            <div className="rounded-2xl border border-border bg-card p-4 text-sm">
              <Row label="Subtotal" value={`$${subtotal}`} />
              <Row label="Shipping" value={`$${shipping}`} />
              <div className="my-3 h-px bg-border" />
              <Row label="Total" value={`$${total}`} bold />
            </div>
          </section>

          <section className="mt-3 px-5">
            <div className="flex items-start gap-2 rounded-2xl bg-leaf/8 p-3 text-xs text-leaf">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
              <p className="text-foreground">
                <span className="font-semibold">Guaranteed delivery in 7–10 days</span> — or your money back.
              </p>
            </div>
            <div className="mt-2 flex items-start gap-2 rounded-2xl bg-muted p-3 text-xs">
              <Truck className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <p>Taxes & duties calculated at checkout. Free shipping at $150.</p>
            </div>
          </section>

          <section className="mt-5 px-5">
            <button className="w-full rounded-full bg-primary py-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)]">
              One-click checkout · ${total}
            </button>
            <button className="mt-2 w-full rounded-full border border-border bg-card py-3 text-sm font-medium">
              Guest checkout
            </button>
          </section>
        </>
      )}
    </AppShell>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex items-center justify-between py-1 ${bold ? "font-semibold text-base" : "text-muted-foreground"}`}>
      <span>{label}</span>
      <span className={bold ? "text-foreground" : ""}>{value}</span>
    </div>
  );
}
