"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import MenuBar from "./MenuBar";
import textAlign from "@tiptap/extension-text-align";

const Tiptap = ({ field }: { field: any }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      textAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] p-4 focus:outline-none prose lg:prose-xl dark:bg-input/30 bg-input/30 dark:prose-invert w-full! max-w-none",
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
    },
    content: field.value
      ? JSON.parse(field.value)
      : "<strong>hello man ! 👋</strong>",
  });

  return (
    <div className="w-full border border-input rounded-lg overflow-hidden ">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
