// Single source of truth for mock data used by the dashboard UI.
// Temporary stand-in until the database is wired up. Display-only.

export interface MockUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
  isPro: boolean;
}

export interface MockItemType {
  id: string;
  name: string;
  icon: string; // lucide icon name
  color: string; // hex color
  isSystem: boolean;
}

export interface MockCollection {
  id: string;
  name: string;
  description: string;
  isPrivate: boolean;
  itemCount: number;
  // Dominant item type — drives the collection card background color.
  typeId: string;
}

export interface MockItem {
  id: string;
  title: string;
  description: string;
  content: string;
  language: string | null;
  url: string | null;
  typeId: string;
  collectionIds: string[];
  tags: string[];
  isFavorite: boolean;
  isPinned: boolean;
  isPublished: boolean;
  isArchived: boolean;
  updatedAt: string;
}

export const currentUser: MockUser = {
  id: "user_1",
  name: "Alex Carter",
  email: "alex@devnote.app",
  image: null,
  isPro: true,
};

export const itemTypes: MockItemType[] = [
  { id: "type_snippet", name: "snippet", icon: "Code", color: "#3b82f6", isSystem: true },
  { id: "type_prompt", name: "prompt", icon: "Sparkles", color: "#8b5cf6", isSystem: true },
  { id: "type_note", name: "note", icon: "StickyNote", color: "#fde047", isSystem: true },
  { id: "type_command", name: "command", icon: "Terminal", color: "#f97316", isSystem: true },
  { id: "type_link", name: "link", icon: "Link", color: "#10b981", isSystem: true },
  { id: "type_file", name: "file", icon: "File", color: "#6b7280", isSystem: true },
  { id: "type_image", name: "image", icon: "Image", color: "#ec4899", isSystem: true },
];

export const collections: MockCollection[] = [
  {
    id: "col_react",
    name: "React Patterns",
    description: "Reusable hooks and component patterns.",
    isPrivate: false,
    itemCount: 24,
    typeId: "type_snippet",
  },
  {
    id: "col_context",
    name: "Context Files",
    description: "Project context and config files.",
    isPrivate: true,
    itemCount: 12,
    typeId: "type_file",
  },
  {
    id: "col_python",
    name: "Python Snippets",
    description: "Handy Python utilities and scripts.",
    isPrivate: false,
    itemCount: 31,
    typeId: "type_snippet",
  },
  {
    id: "col_ai_prompts",
    name: "AI Prompts Library",
    description: "Prompts for everyday dev workflows.",
    isPrivate: false,
    itemCount: 18,
    typeId: "type_prompt",
  },
  {
    id: "col_shell",
    name: "Shell Commands",
    description: "Frequently used terminal commands.",
    isPrivate: false,
    itemCount: 27,
    typeId: "type_command",
  },
  {
    id: "col_design",
    name: "Design Inspiration",
    description: "UI references and design links.",
    isPrivate: false,
    itemCount: 15,
    typeId: "type_link",
  },
  {
    id: "col_nextjs",
    name: "Next.js",
    description: "App Router patterns and snippets.",
    isPrivate: true,
    itemCount: 20,
    typeId: "type_snippet",
  },
  {
    id: "col_useful_links",
    name: "Useful Links",
    description: "Docs, tools, and references.",
    isPrivate: false,
    itemCount: 22,
    typeId: "type_link",
  },
];

export const items: MockItem[] = [
  {
    id: "item_use_debounce",
    title: "useDebounce hook",
    description: "Debounce a value with a configurable delay.",
    content:
      "import { useState, useEffect } from 'react';\n\nexport function useDebounce<T>(value: T, delay = 300) {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const id = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(id);\n  }, [value, delay]);\n  return debounced;\n}",
    language: "typescript",
    url: null,
    typeId: "type_snippet",
    collectionIds: ["col_react"],
    tags: ["react", "hooks"],
    isFavorite: true,
    isPinned: true,
    isPublished: true,
    isArchived: false,
    updatedAt: "2026-05-19T14:00:00.000Z",
  },
  {
    id: "item_refactor_planner",
    title: "Refactor planner",
    description: "Prompt for breaking down a refactor into safe, incremental steps.",
    content:
      "You are a senior engineer. Given the following code, propose a step-by-step refactor plan. Keep each step small, behavior-preserving, and independently testable.\n\nCode:\n{{code}}",
    language: null,
    url: null,
    typeId: "type_prompt",
    collectionIds: ["col_ai_prompts"],
    tags: ["refactor", "planning"],
    isFavorite: false,
    isPinned: true,
    isPublished: true,
    isArchived: false,
    updatedAt: "2026-05-18T09:30:00.000Z",
  },
  {
    id: "item_git_undo",
    title: "Undo last commit (keep changes)",
    description: "Soft reset to undo the last commit but keep your work staged.",
    content: "git reset --soft HEAD~1",
    language: "bash",
    url: null,
    typeId: "type_command",
    collectionIds: ["col_shell"],
    tags: ["git"],
    isFavorite: true,
    isPinned: false,
    isPublished: true,
    isArchived: false,
    updatedAt: "2026-05-17T11:15:00.000Z",
  },
  {
    id: "item_prisma_migrate",
    title: "Run a Prisma migration",
    description: "Create and apply a new migration in development.",
    content: "npx prisma migrate dev --name add_collections",
    language: "bash",
    url: null,
    typeId: "type_command",
    collectionIds: ["col_shell", "col_nextjs"],
    tags: ["prisma", "database"],
    isFavorite: false,
    isPinned: false,
    isPublished: true,
    isArchived: false,
    updatedAt: "2026-05-16T16:45:00.000Z",
  },
  {
    id: "item_py_dedupe",
    title: "Dedupe a list (preserve order)",
    description: "Remove duplicates from a list while keeping the original order.",
    content:
      "def dedupe(items):\n    seen = set()\n    return [x for x in items if not (x in seen or seen.add(x))]",
    language: "python",
    url: null,
    typeId: "type_snippet",
    collectionIds: ["col_python"],
    tags: ["python", "lists"],
    isFavorite: false,
    isPinned: false,
    isPublished: true,
    isArchived: false,
    updatedAt: "2026-05-15T08:20:00.000Z",
  },
  {
    id: "item_tailwind_docs",
    title: "Tailwind CSS v4 docs",
    description: "Official documentation for Tailwind CSS v4.",
    content: "",
    language: null,
    url: "https://tailwindcss.com/docs",
    typeId: "type_link",
    collectionIds: ["col_useful_links", "col_design"],
    tags: ["tailwind", "css", "docs"],
    isFavorite: true,
    isPinned: false,
    isPublished: true,
    isArchived: false,
    updatedAt: "2026-05-14T13:10:00.000Z",
  },
  {
    id: "item_claude_context",
    title: "CLAUDE.md project context",
    description: "Base context file describing the DevNote project.",
    content: "",
    language: null,
    url: null,
    typeId: "type_file",
    collectionIds: ["col_context"],
    tags: ["context", "ai"],
    isFavorite: false,
    isPinned: false,
    isPublished: false,
    isArchived: false,
    updatedAt: "2026-05-13T10:05:00.000Z",
  },
  {
    id: "item_release_notes",
    title: "Release checklist",
    description: "Steps to follow before shipping a new release.",
    content:
      "- Run the full test suite\n- Verify migrations are in sync\n- Update changelog\n- Tag the release\n- Deploy and smoke test",
    language: null,
    url: null,
    typeId: "type_note",
    collectionIds: [],
    tags: ["process", "release"],
    isFavorite: false,
    isPinned: false,
    isPublished: true,
    isArchived: false,
    updatedAt: "2026-05-12T17:40:00.000Z",
  },
];
