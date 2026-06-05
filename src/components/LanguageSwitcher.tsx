import { Check, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGUAGES, useLanguage } from "@/lib/language";

export function LanguageSwitcher() {
  const { lang, setLang, current } = useLanguage();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Choose language"
        className="flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1.5 text-xs font-semibold text-foreground shadow-sm transition hover:bg-muted"
      >
        <span className="text-sm leading-none">{current.flag}</span>
        <span className="hidden xs:inline uppercase tracking-wider">{current.code}</span>
        <span className="uppercase tracking-wider sm:hidden">{current.code}</span>
        <ChevronDown className="h-3 w-3 opacity-70" strokeWidth={2.2} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Language / Langue</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {LANGUAGES.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onSelect={() => setLang(l.code)}
            className="cursor-pointer gap-2"
          >
            <span className="text-base leading-none">{l.flag}</span>
            <span className="flex-1">{l.label}</span>
            {l.code === lang && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
