"use client";

import { useState, useRef } from "react";
import { FileUp, FileText, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface DocumentUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function DocumentUploader({ value, onChange, label = "Upload Syllabus (PDF/Doc)" }: DocumentUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    // Check file type
    const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a PDF or Word document.");
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
        toast.success("Document uploaded successfully!");
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

  const getFilename = (url: string) => {
    const parts = url.split('/');
    let name = parts[parts.length - 1];
    // Remove timestamp prefix if it exists (e.g., 16345345-filename.pdf)
    const match = name.match(/^\d+-(.+)$/);
    if (match) name = match[1];
    return name;
  };

  return (
    <div className="w-full">
      {value ? (
        <div className="relative rounded-xl border border-white/10 p-4 bg-[#0F1535] group flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <FileText size={24} />
            </div>
            <div className="truncate">
              <div className="text-sm font-bold text-white truncate">{getFilename(value)}</div>
              <a href={value} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:underline">View Document</a>
            </div>
          </div>
          <button 
            type="button"
            onClick={() => onChange("")}
            className="text-white/50 hover:text-red-400 p-2 rounded-full hover:bg-white/5 transition-colors"
            title="Remove document"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <div 
          onClick={() => fileInputRef.current?.click()}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`w-full h-32 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${
            isDragging ? "border-blue-500 bg-blue-500/10" : "border-white/20 bg-[#0F1535] hover:bg-white/5"
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center text-blue-400">
              <Loader2 className="animate-spin mb-2" size={24} />
              <span className="text-sm font-semibold">Uploading...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center text-white/50">
              <FileUp size={32} className="mb-2 text-white/30" />
              <p className="text-sm font-semibold text-white/70">{label}</p>
              <p className="text-xs mt-1">PDF or Word files only</p>
            </div>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
