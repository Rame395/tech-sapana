"use client";

import { useState } from "react";
import { updateGlobalSettings, resetAdminPassword } from "@/app/actions/settings";
import ImageUploader from "@/components/ImageUploader";

type GlobalSettings = {
  phone: string;
  address: string;
  email: string;
  operatingHours: string;
  metaTitle: string;
  metaDescription: string;
  paymentQrImage: string | null;
};

export default function SettingsForm({ settings }: { settings: GlobalSettings }) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const [isResetting, setIsResetting] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [resetError, setResetError] = useState("");

  const [paymentQrImage, setPaymentQrImage] = useState<string | null>(settings.paymentQrImage || null);

  const handleSettingsSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage("");
    
    const formData = new FormData(e.currentTarget);
    if (paymentQrImage) {
      formData.append("paymentQrImage", paymentQrImage);
    }

    try {
      await updateGlobalSettings(formData);
      setSaveMessage("Settings updated successfully!");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error updating settings.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsResetting(true);
    setResetMessage("");
    setResetError("");
    
    const formData = new FormData(e.currentTarget);
    try {
      await resetAdminPassword(formData);
      setResetMessage("Password reset successfully! Use it next time you log in.");
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      setResetError(error.message || "Error resetting password.");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      
      {/* Global Configuration */}
      <div className="bg-[#1a1a2e] rounded-xl border border-white/5 shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5 bg-black/20">
          <h2 className="text-xl font-bold text-white">Global Configuration</h2>
          <p className="text-sm text-gray-400 mt-1">Manage contact info, SEO metadata, and payment settings.</p>
        </div>
        <form onSubmit={handleSettingsSubmit} className="p-6 flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
              <input type="text" name="phone" defaultValue={settings.phone} required className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
              <input type="email" name="email" defaultValue={settings.email} required className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Office Address</label>
            <input type="text" name="address" defaultValue={settings.address} required className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Operating Hours</label>
            <input type="text" name="operatingHours" defaultValue={settings.operatingHours} required className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
          </div>

          <hr className="border-white/5 my-2" />

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">SEO Meta Title</label>
            <input type="text" name="metaTitle" defaultValue={settings.metaTitle} required className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">SEO Meta Description</label>
            <textarea name="metaDescription" defaultValue={settings.metaDescription} rows={3} required className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 resize-none"></textarea>
          </div>

          <hr className="border-white/5 my-2" />
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Course Payment QR Code (eSewa/Khalti)</label>
            <p className="text-xs text-gray-500 mb-3">This QR code will be displayed to users during course checkout.</p>
            <div className="w-64">
              <ImageUploader 
                value={paymentQrImage || ""}
                onChange={(url) => setPaymentQrImage(url || null)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <button type="submit" disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 !text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50">
              {isSaving ? "Saving..." : "Save Settings"}
            </button>
            {saveMessage && <span className="text-green-400 text-sm">{saveMessage}</span>}
          </div>
        </form>
      </div>

      {/* Admin Security */}
      <div className="bg-[#1a1a2e] rounded-xl border border-white/5 shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5 bg-black/20">
          <h2 className="text-xl font-bold text-white">Admin Security</h2>
          <p className="text-sm text-gray-400 mt-1">Reset your administrator password</p>
        </div>
        <form onSubmit={handlePasswordSubmit} className="p-6 flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">New Password</label>
              <input type="password" name="newPassword" required minLength={6} className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Confirm New Password</label>
              <input type="password" name="confirmPassword" required minLength={6} className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
            </div>
          </div>
          
          <div className="flex items-center gap-4 mt-2">
            <button type="submit" disabled={isResetting} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50">
              {isResetting ? "Resetting..." : "Reset Password"}
            </button>
            {resetMessage && <span className="text-green-400 text-sm">{resetMessage}</span>}
            {resetError && <span className="text-red-400 text-sm">{resetError}</span>}
          </div>
        </form>
      </div>

    </div>
  );
}
