"use client";
import { type Editor } from "@tiptap/react";

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Highlighter,
  Quote,
  Undo,
  Redo,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link,
  Minus,
  Eraser,
} from "lucide-react";
import { Toggle, toggleVariants } from "../ui/toggle";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
export interface ToolbarButton {
  /** Lucide icon component (e.g., <Bold className="h-4 w-4" />) */
  icon: ReactNode;

  /** Tooltip text (also used for aria-label) */
  tooltip: string;

  /** Action to execute when clicked */
  action: () => void;

  /** Whether the button should appear pressed/active */
  isActive?: boolean;

  /** Optional: disable the button under certain conditions */
  disabled?: boolean;

  /** Optional: group separator (for visual grouping in toolbar) */
  separator?: "left" | "right" | "both";
}

interface MenuBarProps {
  editor: Editor | null;
}
export default function MenuBar({ editor }: MenuBarProps) {
  if (!editor) {
    return null;
  }
  const ToolbarButtons: ToolbarButton[] = [
    {
      icon: <Bold className="h-4 w-4" />,
      tooltip: "Bold",
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
    },
    {
      icon: <Italic className="h-4 w-4" />,
      tooltip: "Italic",
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
    },
    {
      icon: <Underline className="h-4 w-4" />,
      tooltip: "Underline",
      action: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive("underline"),
      // Note: underline extension required (@tiptap/extension-underline)
    },
    {
      icon: <Strikethrough className="h-4 w-4" />,
      tooltip: "Strikethrough",
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
    },

    {
      icon: <Heading1 className="h-4 w-4" />,
      tooltip: "Heading 1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 className="h-4 w-4" />,
      tooltip: "Heading 2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 className="h-4 w-4" />,
      tooltip: "Heading 3",
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <List className="h-4 w-4" />,
      tooltip: "Bullet List",
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="h-4 w-4" />,
      tooltip: "Numbered List",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
    },
    {
      icon: <Quote className="h-4 w-4" />,
      tooltip: "Blockquote",
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive("blockquote"),
    },

    {
      icon: <AlignLeft className="h-4 w-4" />,
      tooltip: "Align Left",
      action: () => editor.chain().focus().setTextAlign("left").run(),
      isActive: editor.isActive({ textAlign: "left" }),
      // Requires @tiptap/extension-text-align
    },
    {
      icon: <AlignCenter className="h-4 w-4" />,
      tooltip: "Align Center",
      action: () => editor.chain().focus().setTextAlign("center").run(),
      isActive: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight className="h-4 w-4" />,
      tooltip: "Align Right",
      action: () => editor.chain().focus().setTextAlign("right").run(),
      isActive: editor.isActive({ textAlign: "right" }),
    },

    {
      icon: <Eraser className="h-4 w-4" />,
      tooltip: "Clear Format",
      action: () => editor.chain().focus().unsetAllMarks().run(),
      isActive: false,
    },
    {
      icon: <Undo className="h-4 w-4" />,
      tooltip: "Undo",
      action: () => editor.chain().focus().undo().run(),
      isActive: false,
    },
    {
      icon: <Redo className="h-4 w-4" />,
      tooltip: "Redo",
      action: () => editor.chain().focus().redo().run(),
      isActive: false,
    },
  ];

  return (
    <div className="border-b border-input rounded-t-lg p-2 bg-card flex flex-wrap gap-1 items-center">
      <div className="flex flex-wrap gap-1 items-center">
        {ToolbarButtons.map((item, i) => (
          <Tooltip key={i}>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                // variant={"outline"}
                onPressedChange={item.action}
                className={`${item.isActive ? "bg-primary/50!" : null}`}
                aria-label={item.tooltip}
              >
                {item.icon}
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
