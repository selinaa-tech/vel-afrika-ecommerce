import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ProductCard } from "@/components/ProductCard";
import { SaveToCollection } from "@/components/SaveToCollection";
import { products, producers } from "@/lib/data";
import { ChevronLeft, MapPin, ShieldCheck, Share2, Star, Truck, Video } from "lucide-react";

export const Route = createFileRoute("/product/$id")({
  head: ({ params }) => {
    const p = products.find((x) => x.id === params.id);
    return {
      meta: [
        { title: p ? `${p.name} — Vel'Afrika` : "Product" },
        { name: "description", content: p ? `${p.name} handcrafted in ${p.country}.` : "" },
      ],
    };
  },
  component: Detail,
});

function Detail() {
  const { id } = Route.useParams();
  const product = products.find((p) => p.id === id);
  if (!product) throw notFound();
  const producer = producers.find((p) => p.id === product.producerId)!;
  const similar = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md pb-32">
        {/* Image */}
        <div className="relative">
          <img src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
            <Link to="/" className="grid h-10 w-10 place-items-center rounded-full bg-background/90 backdrop-blur">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <div className="flex gap-2">
              <button className="grid h-10 w-10 place-items-center rounded-full bg-background/90 backdrop-blur"><Share2 className="h-4 w-4" /></button>
              <div className="grid h-10 w-10 place-items-center rounded-full bg-background/90 backdrop-blur">
                <SaveToCollection productId={product.id} />
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 pt-5">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span>Made in {product.country}</span>
            <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-leaf/10 px-2 py-0.5 text-leaf">
              <ShieldCheck className="h-3 w-3" /> Verified producer
            </span>
          </div>

          <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight">{product.name}</h1>
          <div className="mt-1 flex items-center gap-2 text-sm">
            <Star className="h-4 w-4 fill-ochre text-ochre" />
            <span className="font-semibold">{product.rating}</span>
            <span className="text-muted-foreground">({product.reviews} reviews)</span>
          </div>
          <p className="mt-3 font-display text-2xl font-semibold">${product.price}</p>

          {/* Producer */}
          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
            <img src={producer.avatar} alt={producer.name} className="h-12 w-12 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">{producer.name}</p>
              <p className="truncate text-xs text-muted-foreground">{producer.craft} · {producer.country}</p>
            </div>
            <Link
              to="/call/$id"
              params={{ id: producer.id }}
              aria-label="Video call producer"
              className="grid h-9 w-9 place-items-center rounded-full bg-leaf/15 text-leaf"
            >
              <Video className="h-4 w-4" />
            </Link>
            <button className="rounded-full bg-foreground px-3 py-1.5 text-xs font-semibold text-background">Follow</button>
          </div>

          {/* Description */}
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {producer.story} Each piece is one-of-a-kind, with subtle variations that reflect the maker's hand.
          </p>

          {/* Shipping */}
          <div className="mt-5 space-y-2">
            <div className="flex items-start gap-2 rounded-2xl bg-leaf/8 p-3 text-xs">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
              <p><span className="font-semibold">Delivered in {product.shipping}</span> — or your money back, guaranteed.</p>
            </div>
            <div className="flex items-start gap-2 rounded-2xl bg-muted p-3 text-xs text-muted-foreground">
              <Truck className="mt-0.5 h-4 w-4 shrink-0" />
              <p>Insured worldwide shipping. Duties calculated at checkout.</p>
            </div>
          </div>

          {/* Similar */}
          <h3 className="mt-7 font-display text-lg font-semibold">You may also love</h3>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {similar.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed inset-x-0 bottom-[68px] z-40 border-t border-border bg-background/95 px-5 py-3 backdrop-blur-xl pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <div className="mx-auto flex max-w-md gap-2">
          <button className="flex-1 rounded-full border border-foreground bg-background py-3.5 text-sm font-semibold">
            Add to cart
          </button>
          <button className="flex-1 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)]">
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
}
