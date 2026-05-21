import { FolderPlus, Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";

// Top bar: sidebar toggle, search field, and a "New item" button. Search and
// the button are display-only for now.
export function TopBar() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b border-border px-4">
      <SidebarTrigger />

      <div className="relative mx-auto w-full max-w-md">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search items, types, tags..."
          className="pl-9"
          aria-label="Search"
        />
      </div>

      <Button variant="secondary" className="ml-auto">
        <FolderPlus />
        New collection
      </Button>

      <Button>
        <Plus />
        New item
      </Button>
    </header>
  );
}
