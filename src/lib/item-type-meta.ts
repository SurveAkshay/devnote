// Shared presentation metadata for item types: which lucide icon to render and
// which Tailwind color classes encode each type. Kept as full class-name string
// literals so Tailwind's content scanner picks them up.
import { createElement, type ReactElement } from "react";
import {
  Code,
  File as FileIcon,
  Image as ImageIcon,
  Link as LinkIcon,
  Sparkles,
  StickyNote,
  Terminal,
  type LucideIcon,
} from "lucide-react";

import { itemTypes, type MockItemType } from "@/lib/mock-data";

export const TYPE_ICONS: Record<string, LucideIcon> = {
  Code,
  Sparkles,
  StickyNote,
  Terminal,
  Link: LinkIcon,
  File: FileIcon,
  Image: ImageIcon,
};

// Nearest Tailwind palette color for each system type.
export const TYPE_TEXT_COLOR: Record<string, string> = {
  type_snippet: "text-blue-500",
  type_prompt: "text-violet-500",
  type_note: "text-yellow-400",
  type_command: "text-orange-500",
  type_link: "text-emerald-500",
  type_file: "text-slate-400",
  type_image: "text-pink-500",
};

export const TYPE_BORDER_COLOR: Record<string, string> = {
  type_snippet: "border-l-blue-500",
  type_prompt: "border-l-violet-500",
  type_note: "border-l-yellow-400",
  type_command: "border-l-orange-500",
  type_link: "border-l-emerald-500",
  type_file: "border-l-slate-400",
  type_image: "border-l-pink-500",
};

const byId = new Map<string, MockItemType>(
  itemTypes.map((type) => [type.id, type])
);

export const getType = (typeId: string): MockItemType | undefined =>
  byId.get(typeId);

export const getTypeIcon = (typeId: string): LucideIcon => {
  const type = byId.get(typeId);
  return (type && TYPE_ICONS[type.icon]) || FileIcon;
};

// Returns a ready-to-render icon element for a type. Using createElement (vs a
// locally-assigned <Icon /> in render) keeps the static-components lint rule
// happy while still selecting the icon dynamically.
export const renderTypeIcon = (
  typeId: string,
  className?: string
): ReactElement => createElement(getTypeIcon(typeId), { className });
