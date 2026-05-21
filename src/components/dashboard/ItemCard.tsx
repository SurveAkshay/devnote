import { Pin, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getType,
  renderTypeIcon,
  TYPE_BORDER_COLOR,
  TYPE_TEXT_COLOR,
} from "@/lib/item-type-meta";
import type { MockItem } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });

export function ItemCard({ item }: { item: MockItem }) {
  const type = getType(item.typeId);

  return (
    <Card
      size="sm"
      className={cn(
        "border-l-4 transition-colors hover:bg-muted/40",
        TYPE_BORDER_COLOR[item.typeId]
      )}
    >
      <CardHeader>
        <div className="flex items-center gap-2">
          {renderTypeIcon(
            item.typeId,
            cn("size-4 shrink-0", TYPE_TEXT_COLOR[item.typeId])
          )}
          <CardTitle className="flex-1 truncate text-sm">{item.title}</CardTitle>
          {item.isPinned && (
            <Pin className="size-3.5 shrink-0 text-muted-foreground" />
          )}
          {item.isFavorite && (
            <Star className="size-3.5 shrink-0 text-yellow-400" />
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {item.language ? (
          <pre className="line-clamp-3 overflow-hidden rounded-md bg-muted/60 p-2 font-mono text-xs whitespace-pre-wrap text-muted-foreground">
            {item.content}
          </pre>
        ) : (
          <p className="line-clamp-2 text-xs text-muted-foreground">
            {item.url || item.content || item.description}
          </p>
        )}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <span className="shrink-0 text-xs text-muted-foreground">
            {type?.name} · {formatDate(item.updatedAt)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
