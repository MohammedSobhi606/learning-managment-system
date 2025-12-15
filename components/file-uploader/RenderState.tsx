"use client";

import { cn } from "@/lib/utils";
import {
  CloudUploadIcon,
  FolderUpIcon,
  ImageIcon,
  Loader,
  Trash,
  XIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

export function RenderEmptyState({ isDragActive }: { isDragActive: boolean }) {
  return (
    <div className="text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-muted mb-4">
        <CloudUploadIcon
          className={cn(
            "text-muted-foreground size-6",
            isDragActive && "text-primary"
          )}
        />
      </div>
      <p className="text-base font-semibold text-foreground">
        {" "}
        Drag your files here or{" "}
        <span className="text-primary cursor-pointer font-bold">
          click for upload
        </span>
      </p>
      <Button className="mt-2" type="button">
        <FolderUpIcon /> Select File
      </Button>
    </div>
  );
}
export function RenderErrorState() {
  return (
    <div className="text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-destructive/30 mb-4">
        <CloudUploadIcon className={cn("text-destructive size-6")} />
      </div>
      <p className="text-base font-semibold">Upload failed</p>
      <p className="text-xs mt-1 text-muted-foreground">somthing went wrong</p>
      <Button variant={"outline"} type="button" className="mt-4">
        Retry Select File
      </Button>
    </div>
  );
}
export function RenderUploadingState({
  previewURL,
  progress,
}: {
  previewURL: string;
  progress: number;
}) {
  return (
    <div className="flex items-center justify-center flex-col gap-4">
      <span>Uploading...{progress}%</span>
      <div
        className={`h-2 bg-green-400 transition-all ease-in`}
        style={{
          width: progress,
        }}
      />
    </div>
  );
}
export function RenderUploadedState({
  previewURL,
  isDeleting,
  handleDelete,
}: {
  previewURL: string;
  isDeleting: boolean;
  handleDelete: () => void;
}) {
  return (
    <div className=" w-full h-full">
      <div className="p-2 ">
        <Image
          src={previewURL || ""}
          alt="image"
          className="object-contain p-2"
          fill
        />
      </div>
      <Button
        variant={"destructive"}
        size={"icon"}
        className={cn("absolute top-4 right-4")}
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <Loader className="size-4 animate-spin" />
        ) : (
          <Trash className="size-4" />
        )}
      </Button>
    </div>
  );
}
