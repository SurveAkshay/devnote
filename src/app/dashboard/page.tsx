import { FolderOpen, Layers, Pin, Star } from "lucide-react";

import { CollectionCard } from "@/components/dashboard/CollectionCard";
import { ItemCard } from "@/components/dashboard/ItemCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { collections, currentUser, items } from "@/lib/mock-data";

const firstName = currentUser.name.split(" ")[0];

const pinnedItems = items.filter((item) => item.isPinned);

const recentItems = [...items]
  .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  .slice(0, 10);

const recentCollections = [...collections]
  .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  .slice(0, 4);

const stats = [
  { label: "Items", value: items.length, icon: Layers },
  { label: "Collections", value: collections.length, icon: FolderOpen },
  {
    label: "Favorite items",
    value: items.filter((item) => item.isFavorite).length,
    icon: Star,
  },
  {
    label: "Favorite collections",
    value: collections.filter((collection) => collection.isFavorite).length,
    icon: Star,
  },
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 text-xs font-medium tracking-wider text-muted-foreground uppercase">
      {children}
    </h2>
  );
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Welcome back, {firstName}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          You have {items.length} items across {collections.length} collections.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </section>

      {pinnedItems.length > 0 && (
        <section>
          <SectionHeading>
            <Pin className="mr-1 inline size-3.5 align-text-bottom" />
            Pinned
          </SectionHeading>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {pinnedItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      <section>
        <SectionHeading>Recent collections</SectionHeading>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recentCollections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading>Recently used</SectionHeading>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {recentItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
