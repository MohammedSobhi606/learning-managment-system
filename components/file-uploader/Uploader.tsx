"use client";
import { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import {
  RenderEmptyState,
  RenderErrorState,
  RenderUploadedState,
  RenderUploadingState,
} from "./RenderState";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { useURL } from "@/hooks/use-constructIURL";

interface ComponentProp {
  value?: string;
  onChange: (value: string) => void;
}

export default function Uploader({ onChange, value }: ComponentProp) {
  interface UploadFileState {
    id: string | null;
    file: File | null;
    uploadingState: boolean;
    progress: number;
    size: number;
    fileKey?: string;
    isDeleting: boolean;
    error: boolean;
    objecUrl?: string;
    fileType: "image" | "video";
  }

  const [fileState, setFile] = useState<UploadFileState>({
    error: false,
    file: null,
    fileType: "image",
    id: null,
    uploadingState: false,
    isDeleting: false,
    progress: 0,
    size: 0,
    fileKey: value,
    objecUrl: value ? useURL(value) : undefined,
  });
  // upload function to S3
  async function uploadToS3(file: File) {
    setFile((prev) => ({ ...prev, uploadingState: true, progress: 0 }));
    try {
      const presignedResponse = await fetch("/api/S3/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          size: file.size,
          isImage: true,
        }),
      });
      if (!presignedResponse.ok) {
        toast.error("error uploading file");
        setFile((prev) => ({
          ...prev,
          uploadingState: false,
          progress: 0,
          error: true,
        }));

        return;
      }
      const { presignedUrl, key } = await presignedResponse.json();

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentageCompleted = (event.loaded / event.total) * 100;
            setFile((prev) => ({
              ...prev,

              progress: Math.round(percentageCompleted),
            }));
          }
        };
        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 204) {
            setFile((prev) => ({
              ...prev,
              progress: 100,
              uploadingState: false,
              fileKey: key,
            }));
            toast.success("file uploaded successffully");
            onChange?.(key); // sent to  from  field
            resolve();
          } else {
            reject(new Error("upload faild"));
          }
        };
        xhr.onerror = () => {
          reject(new Error("upload faild"));
        };
        xhr.open("PUT", presignedUrl);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
      });
    } catch (error) {
      toast.error("somthing went wrong");
      setFile((prev) => ({
        ...prev,
        uploadingState: false,
        error: true,
      }));

      console.log(error);
    }
  }
  // deleting file
  async function DeleteS3File() {
    if (fileState.isDeleting && !fileState.objecUrl) return;
    try {
      setFile((prev) => ({ ...prev, isDeleting: true }));
      const res = await fetch("/api/S3/delete", {
        method: "DELETE",
        body: JSON.stringify({ key: fileState.fileKey }),
      });
      if (!res.ok) {
        toast.error("error deleting file");
        setFile((prev) => ({
          ...prev,
          isDeleting: false,
          error: true,
        }));
        return;
      }
      if (fileState.objecUrl && !fileState.objecUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objecUrl);
      }
      setFile({
        error: false,
        file: null,
        fileType: "image",
        id: null,
        uploadingState: false,
        isDeleting: false,
        progress: 0,
        size: 0,
      });
      onChange?.("");
      toast.success("file deleted");
    } catch (error) {
      toast.error("error deleting file");
      setFile((prev) => ({
        ...prev,
        isDeleting: false,
        error: true,
      }));
    }
  }
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (fileState.objecUrl && !fileState.objecUrl.startsWith("http")) {
          URL.revokeObjectURL(fileState.objecUrl);
        }
        setFile({
          file: file,
          objecUrl: URL.createObjectURL(file),
          progress: 0,
          uploadingState: false,
          error: false,
          id: uuidv4(),
          fileType: "image",
          isDeleting: false,
          size: 0,
        });
        uploadToS3(file);
      }
    },
    [fileState.objecUrl]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5 Mb calculation
    onDropRejected: (error) => {
      toast.error(error[0].errors[0].message);
    },
    disabled: fileState.uploadingState || !!fileState.objecUrl, // turn the string into boolean so it means if there is an objectUrl
  });

  useEffect(() => {
    return () => {
      if (fileState.objecUrl && !fileState.objecUrl.startsWith("https")) {
        URL.revokeObjectURL(fileState.objecUrl);
      }
    };
  }, [fileState.objecUrl]);
  function RenderConditionalContent() {
    if (fileState.uploadingState) {
      return (
        <RenderUploadingState
          previewURL={fileState.objecUrl || ""}
          progress={fileState.progress}
        />
      );
    }
    if (fileState.error) {
      return <RenderErrorState />;
    }
    if (fileState.objecUrl) {
      return (
        <RenderUploadedState
          handleDelete={DeleteS3File}
          isDeleting={fileState.isDeleting}
          previewURL={fileState.objecUrl || ""}
        />
      );
    }
    return <RenderEmptyState isDragActive={isDragActive} />;
  }
  return (
    <Card
      className={cn(
        "relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-64",
        isDragActive
          ? "border-primary bg-primary/10 border-solid"
          : "border-border hover:border-primary"
      )}
      {...getRootProps()}
    >
      <CardContent className="flex items-center justify-center h-full w-full p-4 relative">
        <input {...getInputProps()} />
        {RenderConditionalContent()}
      </CardContent>
    </Card>
  );
}
