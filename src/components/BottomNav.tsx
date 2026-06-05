import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Compass, Users, Heart, ShoppingBag, User } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/discover", label: "Discover", icon: Compass },
  { to: "/social", label: "Social", icon: Users },
  { to: "/collections", label: "Saved", icon: Heart },
  { to: "/cart", label: "Cart", icon: ShoppingBag },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/85 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]">
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-1">
        {items.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? path === "/" : path.startsWith(to);
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                className="flex flex-col items-center gap-0.5 px-1 py-2.5 text-[10px] font-medium transition-colors"
              >
                <Icon
                  className={`h-5 w-5 transition-colors ${active ? "text-primary" : "text-muted-foreground"}`}
                  strokeWidth={active ? 2.4 : 1.8}
                />
                <span className={active ? "text-foreground" : "text-muted-foreground"}>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
