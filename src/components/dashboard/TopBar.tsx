import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Display-only top bar for Phase 1: brand, search field, and a "New item"
// button. None of the controls are wired up yet.
export function TopBar() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b border-border px-4">
      <span className="text-base font-semibold tracking-tight">DevNote</span>

      <div className="relative mx-auto w-full max-w-md">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search items, types, tags..."
          className="pl-9"
          aria-label="Search"
        />
      </div>

      <Button className="ml-auto">
        <Plus />
        New item
      </Button>
    </header>
  );
}
