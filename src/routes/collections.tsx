import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { products } from "@/lib/data";
import { useCollections, shareCollection, type Collection } from "@/lib/collections";
import { Plus, Share2, Trash2, Users } from "lucide-react";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "My Collections — Vel'Afrika" },
      { name: "description", content: "Save favourites, build collections, and share them with friends." },
    ],
  }),
  component: CollectionsPage,
});

function CollectionsPage() {
  const { collections, createCollection, removeCollection, toggleProduct } = useCollections();
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");

  return (
    <AppShell title="My Collections">
      <section className="px-5 pt-4">
        <div className="rounded-2xl bg-gradient-to-br from-primary/15 via-ochre/10 to-leaf/10 p-4">
          <h2 className="font-display text-xl font-semibold tracking-tight">Curate. Share. Inspire.</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Save your favourite pieces into themed collections and share with friends, family, or the world.
          </p>
          <button
            onClick={() => setCreating((v) => !v)}
            className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-foreground px-3.5 py-2 text-xs font-semibold text-background"
          >
            <Plus className="h-3.5 w-3.5" /> New collection
          </button>
          {creating && (
            <form
              className="mt-3 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (!name.trim()) return;
                createCollection(name.trim());
                setName("");
                setCreating(false);
              }}
            >
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Living room refresh"
                className="flex-1 rounded-full bg-background px-3.5 py-2 text-sm outline-none ring-1 ring-border focus:ring-ring"
              />
              <button className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
                Create
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="mt-5 space-y-4 px-5">
        {collections.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            No collections yet. Tap the bookmark on any product to save it.
          </p>
        )}
        {collections.map((c) => (
          <CollectionCard
            key={c.id}
            collection={c}
            onRemove={() => removeCollection(c.id)}
            onToggle={(pid) => toggleProduct(c.id, pid)}
          />
        ))}
      </section>
    </AppShell>
  );
}

function CollectionCard({
  collection,
  onRemove,
  onToggle,
}: {
  collection: Collection;
  onRemove: () => void;
  onToggle: (productId: string) => void;
}) {
  const items = products.filter((p) => collection.productIds.includes(p.id));
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card">
      <header className="flex items-center gap-3 p-3.5">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-xl">{collection.emoji}</div>
        <div className="flex-1 min-w-0">
          <h3 className="truncate font-display text-base font-semibold">{collection.name}</h3>
          <p className="text-xs text-muted-foreground">
            {items.length} item{items.length === 1 ? "" : "s"} · <Users className="inline h-3 w-3" /> shareable
          </p>
        </div>
        <button
          onClick={() => shareCollection(collection)}
          aria-label="Share"
          className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground"
        >
          <Share2 className="h-4 w-4" />
        </button>
        <button
          onClick={onRemove}
          aria-label="Delete"
          className="grid h-9 w-9 place-items-center rounded-full bg-muted text-muted-foreground"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </header>
      {items.length > 0 ? (
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-3.5 pb-3.5">
          {items.map((p) => (
            <Link
              key={p.id}
              to="/product/$id"
              params={{ id: p.id }}
              className="w-[120px] shrink-0"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
                <img src={p.image} alt={p.name} className="h-full w-full object-cover" loading="lazy" />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onToggle(p.id);
                  }}
                  className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-background/90 text-foreground"
                >
                  ×
                </button>
              </div>
              <p className="mt-1.5 line-clamp-1 text-xs font-medium">{p.name}</p>
              <p className="text-[11px] text-muted-foreground">${p.price}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="px-4 pb-4 text-xs text-muted-foreground">Empty — save products to add them here.</p>
      )}
    </article>
  );
}
