import { useState } from "react";
import { Bookmark, BookmarkCheck, Check, Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCollections } from "@/lib/collections";

export function SaveToCollection({
  productId,
  variant = "icon",
}: {
  productId: string;
  variant?: "icon" | "pill";
}) {
  const { collections, toggleProduct, createCollection, isSaved } = useCollections();
  const [newName, setNewName] = useState("");
  const saved = isSaved(productId);

  return (
    <Popover>
      <PopoverTrigger asChild>
        {variant === "icon" ? (
          <button
            aria-label="Save to collection"
            onClick={(e) => e.preventDefault()}
            className="grid h-8 w-8 place-items-center rounded-full bg-background/90 text-foreground backdrop-blur transition hover:bg-background"
          >
            {saved ? (
              <BookmarkCheck className="h-4 w-4 text-primary" strokeWidth={2.2} />
            ) : (
              <Bookmark className="h-4 w-4" strokeWidth={1.8} />
            )}
          </button>
        ) : (
          <button
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 text-xs font-semibold"
          >
            {saved ? <BookmarkCheck className="h-3.5 w-3.5 text-primary" /> : <Bookmark className="h-3.5 w-3.5" />}
            {saved ? "Saved" : "Save"}
          </button>
        )}
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64 p-2">
        <p className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Save to collection
        </p>
        <ul className="max-h-56 overflow-y-auto">
          {collections.map((c) => {
            const inIt = c.productIds.includes(productId);
            return (
              <li key={c.id}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleProduct(c.id, productId);
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-muted"
                >
                  <span className="text-base leading-none">{c.emoji}</span>
                  <span className="flex-1 truncate">{c.name}</span>
                  <span className="text-[10px] text-muted-foreground">{c.productIds.length}</span>
                  {inIt && <Check className="h-4 w-4 text-primary" />}
                </button>
              </li>
            );
          })}
        </ul>
        <form
          className="mt-1 flex items-center gap-1 border-t border-border pt-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!newName.trim()) return;
            const id = createCollection(newName.trim());
            toggleProduct(id, productId);
            setNewName("");
          }}
        >
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="New collection name"
            className="flex-1 rounded-md bg-muted px-2 py-1.5 text-sm outline-none focus:ring-1 focus:ring-ring"
          />
          <button
            type="submit"
            aria-label="Create collection"
            className="grid h-8 w-8 place-items-center rounded-md bg-foreground text-background"
          >
            <Plus className="h-4 w-4" />
          </button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
