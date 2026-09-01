"use client";

import { X } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  isDestructive?: boolean;
}

export default function ConfirmModal({ 
  isOpen, title, message, onConfirm, onCancel, confirmText = "Confirm", isDestructive = false 
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#121A42] border border-white/10 rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white/70 text-sm mb-6">{message}</p>
          
          <div className="flex gap-3 justify-end">
            <button 
              onClick={onCancel}
              className="px-4 py-2 rounded-lg font-semibold text-white/70 hover:text-white hover:bg-white/5 transition-colors text-sm"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm}
              className={`px-4 py-2 rounded-lg font-semibold text-white shadow-lg transition-all text-sm ${
                isDestructive 
                  ? "bg-red-600 hover:bg-red-500 shadow-[0_0_15px_rgba(220,38,38,0.4)]" 
                  : "bg-blue-600 hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
