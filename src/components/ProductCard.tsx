import { Link, useNavigate } from "@tanstack/react-router";
import { Star, Zap } from "lucide-react";
// no extra imports
import type { Product } from "@/lib/data";
import { SaveToCollection } from "./SaveToCollection";

export function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="group flex flex-col"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {product.tag && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground backdrop-blur">
            {product.tag}
          </span>
        )}
        <div className="absolute right-2.5 top-2.5">
          <SaveToCollection productId={product.id} />
        </div>
      </div>
      <div className="mt-2.5 space-y-1.5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="line-clamp-1 text-sm font-medium">{product.name}</h3>
          <span className="text-sm font-semibold">${product.price}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span>{product.country}</span>
          <span>·</span>
          <Star className="h-3 w-3 fill-ochre text-ochre" />
          <span>{product.rating}</span>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate({ to: "/cart" });
          }}
          className="mt-1 flex w-full items-center justify-center gap-1 rounded-full bg-primary py-2 text-xs font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition active:scale-[0.98]"
        >
          <Zap className="h-3.5 w-3.5" strokeWidth={2.4} /> Buy now
        </button>
      </div>
    </Link>
  );
}
