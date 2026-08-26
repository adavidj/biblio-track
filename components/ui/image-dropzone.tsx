"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Upload, Image as ImageIcon, X } from "lucide-react";

interface ImageDropzoneProps {
  onFile: (file: File, preview: string) => void;
  preview: string | null;
  onClear: () => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  label?: string;
  description?: string;
}

export function ImageDropzone({
  onFile,
  preview,
  onClear,
  accept = { "image/*": [".jpg", ".jpeg", ".png", ".gif", ".webp"] },
  maxSize = 5 * 1024 * 1024,
  label = "Glissez une image ici",
  description = "ou cliquez pour sélectionner",
}: ImageDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        onFile(file, previewUrl);
      }
    },
    [onFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false,
  });

  if (preview) {
    return (
      <div className="relative group">
        <div className="w-full h-48 rounded-xl overflow-hidden bg-muted relative">
          <Image src={preview} alt="Preview" fill className="object-contain" />
        </div>
        <button
          onClick={onClear}
          className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`w-full border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
        isDragActive
          ? "border-primary bg-primary/5 scale-[1.02]"
          : "border-border hover:border-primary/50 hover:bg-muted/30"
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-3">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
          {isDragActive ? (
            <Upload className="w-6 h-6 text-primary animate-bounce" />
          ) : (
            <ImageIcon className="w-6 h-6 text-primary" />
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
          <p className="text-[10px] text-muted-foreground mt-2">
            Max: {Math.round(maxSize / 1024 / 1024)} MB
          </p>
        </div>
      </div>
    </div>
  );
}

export function FileDropzone({
  onFile,
  fileName,
  onClear,
  accept,
  maxSize = 50 * 1024 * 1024,
  label = "Glissez un fichier ici",
  description = "ou cliquez pour sélectionner",
}: {
  onFile: (file: File) => void;
  fileName: string | null;
  onClear: () => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  label?: string;
  description?: string;
}) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) onFile(file);
    },
    [onFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept || { "application/pdf": [".pdf"], "application/epub+zip": [".epub"] },
    maxSize,
    multiple: false,
  });

  if (fileName) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border group">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Upload className="w-5 h-5 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground truncate">{fileName}</p>
          <p className="text-xs text-muted-foreground">Prêt à uploader</p>
        </div>
        <button
          onClick={onClear}
          className="w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-destructive/10 transition-all"
        >
          <X className="w-4 h-4 text-destructive" />
        </button>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`w-full border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
        isDragActive
          ? "border-primary bg-primary/5 scale-[1.02]"
          : "border-border hover:border-primary/50 hover:bg-muted/30"
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-3">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
          {isDragActive ? (
            <Upload className="w-6 h-6 text-primary animate-bounce" />
          ) : (
            <Upload className="w-6 h-6 text-primary" />
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
          <p className="text-[10px] text-muted-foreground mt-2">
            PDF, EPUB • Max: {Math.round(maxSize / 1024 / 1024)} MB
          </p>
        </div>
      </div>
    </div>
  );
}
