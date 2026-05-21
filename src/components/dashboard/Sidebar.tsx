"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Code,
  File as FileIcon,
  Image as ImageIcon,
  Link as LinkIcon,
  Lock,
  NotebookPen,
  Settings,
  Sparkles,
  StickyNote,
  Terminal,
  type LucideIcon,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  collections,
  currentUser,
  itemTypes,
  type MockItemType,
} from "@/lib/mock-data";

// Maps the lucide icon names stored on item types to their components.
const ICONS: Record<string, LucideIcon> = {
  Code,
  Sparkles,
  StickyNote,
  Terminal,
  Link: LinkIcon,
  File: FileIcon,
  Image: ImageIcon,
};

// Per-type icon color, mapped to the nearest Tailwind palette class so the
// color-coding lives in classes (not inline styles).
const TYPE_COLOR: Record<string, string> = {
  type_snippet: "text-blue-500",
  type_prompt: "text-violet-500",
  type_note: "text-yellow-400",
  type_command: "text-orange-500",
  type_link: "text-emerald-500",
  type_file: "text-slate-400",
  type_image: "text-pink-500",
};

const typeById = new Map<string, MockItemType>(
  itemTypes.map((type) => [type.id, type])
);

// Item types route to /items/{pluralName}, e.g. snippet -> /items/snippets.
const typeHref = (name: string) => `/items/${name}s`;

const favoriteCollections = collections.filter((c) => c.isFavorite);

const recentCollections = [...collections]
  .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  .slice(0, 5);

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export function AppSidebar() {
  const pathname = usePathname();

  const renderCollection = (id: string, name: string, isPrivate: boolean) => {
    const type = typeById.get(
      collections.find((c) => c.id === id)?.typeId ?? ""
    );
    const Icon = type ? ICONS[type.icon] ?? FileIcon : FileIcon;
    const href = `/collections/${id}`;
    return (
      <SidebarMenuItem key={id}>
        <SidebarMenuButton
          isActive={pathname === href}
          tooltip={name}
          render={<Link href={href} />}
        >
          <Icon className={type ? TYPE_COLOR[type.id] : undefined} />
          <span className="truncate">{name}</span>
        </SidebarMenuButton>
        {isPrivate && (
          <SidebarMenuBadge>
            <Lock className="size-3 text-muted-foreground" />
          </SidebarMenuBadge>
        )}
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="group-data-[collapsible=icon]:justify-center"
              render={<Link href="/dashboard" />}
            >
              <NotebookPen className="text-primary" />
              <span className="font-heading text-base font-semibold tracking-tight group-data-[collapsible=icon]:hidden">
                DevNote
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Library</SidebarGroupLabel>
          <SidebarMenu>
            {itemTypes.map((type) => {
              const Icon = ICONS[type.icon] ?? FileIcon;
              const href = typeHref(type.name);
              return (
                <SidebarMenuItem key={type.id}>
                  <SidebarMenuButton
                    isActive={pathname === href}
                    tooltip={`${type.name}s`}
                    render={<Link href={href} />}
                  >
                    <Icon className={TYPE_COLOR[type.id]} />
                    <span className="capitalize">{type.name}s</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        {favoriteCollections.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Favorites</SidebarGroupLabel>
            <SidebarMenu>
              {favoriteCollections.map((c) =>
                renderCollection(c.id, c.name, c.isPrivate)
              )}
            </SidebarMenu>
          </SidebarGroup>
        )}

        <SidebarGroup>
          <SidebarGroupLabel>Recent Collections</SidebarGroupLabel>
          <SidebarMenu>
            {recentCollections.map((c) =>
              renderCollection(c.id, c.name, c.isPrivate)
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip={currentUser.name}
              className="group-data-[collapsible=icon]:justify-center"
            >
              <Avatar size="sm">
                {currentUser.image && (
                  <AvatarImage src={currentUser.image} alt={currentUser.name} />
                )}
                <AvatarFallback>{initials(currentUser.name)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate text-sm font-medium">
                  {currentUser.name}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {currentUser.email}
                </span>
              </div>
              <Settings className="ml-auto text-muted-foreground group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
