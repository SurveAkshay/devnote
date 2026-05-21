import { Lock } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { renderTypeIcon, TYPE_TEXT_COLOR } from "@/lib/item-type-meta";
import type { MockCollection } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function CollectionCard({ collection }: { collection: MockCollection }) {
  return (
    <Card size="sm" className="transition-colors hover:bg-muted/40">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted",
              TYPE_TEXT_COLOR[collection.typeId]
            )}
          >
            {renderTypeIcon(collection.typeId, "size-4")}
          </div>
          <CardTitle className="flex-1 truncate text-sm">
            {collection.name}
          </CardTitle>
          {collection.isPrivate && (
            <Lock className="size-3.5 shrink-0 text-muted-foreground" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-1 text-xs text-muted-foreground">
          {collection.description}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          {collection.itemCount} items
        </p>
      </CardContent>
    </Card>
  );
}
