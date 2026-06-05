import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/data";
import { Search, SlidersHorizontal, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/discover")({
  head: () => ({
    meta: [
      { title: "Discover — Vel'Afrika" },
      { name: "description", content: "Search and discover handcrafted products from across Africa." },
    ],
  }),
  component: Discover,
});

const categories = ["All", "Home", "Fashion", "Jewelry", "Beauty", "Food"];
const trending = ["Bolga baskets", "Mudcloth", "Rooibos", "Kente"];

function Discover() {
  return (
    <AppShell title="Discover">
      <div className="px-5 pt-4">
        <div className="flex items-center gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-4 py-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search makers, products, countries"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <button aria-label="Filters" className="grid h-11 w-11 place-items-center rounded-full bg-foreground text-background">
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <TrendingUp className="h-3.5 w-3.5" />
          <span>Trending:</span>
          <div className="no-scrollbar flex flex-1 gap-2 overflow-x-auto">
            {trending.map((t) => (
              <button key={t} className="shrink-0 rounded-full bg-muted px-3 py-1 text-xs text-foreground">{t}</button>
            ))}
          </div>
        </div>

        <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto">
          {categories.map((c, i) => (
            <button
              key={c}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                i === 0 ? "bg-foreground text-background" : "border border-border bg-card text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 px-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </AppShell>
  );
}
