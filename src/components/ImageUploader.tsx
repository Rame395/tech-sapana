"use client";

import { useState, useRef } from "react";
import { UploadCloud, Image as ImageIcon, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        onChange(data.url);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error(data.error || "Upload failed");
      }
    } catch (error) {
      toast.error("An error occurred while uploading.");
    } finally {
      setIsUploading(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full">
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-white/10 group">
          <img src={value} alt="Uploaded preview" className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button 
              type="button"
              onClick={() => onChange("")}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div 
          onClick={() => fileInputRef.current?.click()}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`w-full h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${
            isDragging ? "border-blue-500 bg-blue-500/10" : "border-white/20 bg-[#0F1535] hover:bg-white/5"
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center text-blue-400">
              <Loader2 className="animate-spin mb-2" size={32} />
              <span className="text-sm font-semibold">Uploading...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center text-white/50">
              <UploadCloud size={40} className="mb-3 text-white/30" />
              <p className="text-sm font-semibold text-white/70">Click or drag & drop</p>
              <p className="text-xs mt-1">SVG, PNG, JPG or GIF</p>
            </div>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleUpload(e.target.files[0]);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
