"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CheckCircle2, ArrowRight, X, Phone, User, Mail, ShieldCheck } from "lucide-react";
import { createEnrollment } from "@/app/actions/enrollment";

type EnrollmentCheckoutProps = {
  courseId: string;
  courseTitle: string;
  coursePrice: number;
  qrImageUrl?: string | null;
  onClose: () => void;
};

export default function EnrollmentCheckout({
  courseId,
  courseTitle,
  coursePrice,
  qrImageUrl,
  onClose,
}: EnrollmentCheckoutProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.phone) {
        setError("Please fill in all fields to continue.");
        return;
      }
      setError(null);
      setStep(2);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setUploading(true);
    setError(null);

    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      
      if (result.success) {
        setScreenshotUrl(result.url);
      } else {
        setError(result.error || "Failed to upload image.");
      }
    } catch (err) {
      setError("An error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!screenshotUrl) {
      setError("Please upload your payment screenshot to complete enrollment.");
      return;
    }

    setLoading(true);
    setError(null);

    const result = await createEnrollment({
      ...formData,
      courseId,
      paymentScreenshotUrl: screenshotUrl,
    });

    setLoading(false);

    if (result.success) {
      setStep(3);
    } else {
      setError(result.error || "Failed to submit enrollment.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-white dark:bg-bg-primary border border-gray-200 dark:border-border-subtle rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-border-subtle bg-gray-50 dark:bg-bg-secondary">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-1">Checkout</div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-text-main leading-tight">{courseTitle}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:text-text-muted dark:hover:text-white bg-gray-100 dark:bg-bg-primary rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto">
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/30 rounded-xl text-sm font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              {error}
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="bg-brand-blue-soft/50 border border-brand-blue-soft rounded-xl p-4 flex justify-between items-center">
                  <span className="text-sm font-semibold text-brand-blue">Total Amount Due</span>
                  <span className="text-2xl font-extrabold text-brand-blue">NPR {coursePrice.toLocaleString()}</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-text-muted mb-2">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <User className="w-5 h-5" />
                      </div>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-bg-secondary border border-gray-200 dark:border-border-subtle rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-text-muted mb-2">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <Mail className="w-5 h-5" />
                      </div>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-bg-secondary border border-gray-200 dark:border-border-subtle rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-text-muted mb-2">WhatsApp / Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <Phone className="w-5 h-5" />
                      </div>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-bg-secondary border border-gray-200 dark:border-border-subtle rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all"
                        placeholder="+977 9800000000"
                      />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleNextStep}
                  className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-brand-blue/30 mt-6"
                >
                  Proceed to Payment <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6 text-center"
              >
                <div className="text-gray-600 dark:text-text-muted text-sm">
                  Scan the QR code below using eSewa, Khalti, or your Mobile Banking app to pay exactly <strong className="text-gray-900 dark:text-white">NPR {coursePrice.toLocaleString()}</strong>.
                </div>

                <div className="flex justify-center my-6">
                  <div className="p-4 bg-white border-2 border-dashed border-gray-200 rounded-2xl w-64 h-64 flex items-center justify-center">
                    {qrImageUrl ? (
                      <img src={qrImageUrl} alt="Payment QR Code" className="w-full h-full object-contain" />
                    ) : (
                      <div className="text-gray-400 text-sm font-bold text-center">
                        QR Code Not Configured<br/>By Admin
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-left">
                  <label className="block text-sm font-bold text-gray-700 dark:text-text-muted mb-3">Upload Payment Screenshot *</label>
                  
                  {!screenshotUrl ? (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-brand-blue/40 bg-brand-blue-soft/30 hover:bg-brand-blue-soft/60 rounded-xl cursor-pointer transition-colors group">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 text-brand-blue mb-2 group-hover:-translate-y-1 transition-transform" />
                        <p className="text-sm text-brand-blue font-semibold">
                          {uploading ? "Uploading..." : "Click to upload screenshot"}
                        </p>
                      </div>
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
                    </label>
                  ) : (
                    <div className="relative w-full h-32 rounded-xl overflow-hidden border border-border-subtle group">
                      <img src={screenshotUrl} alt="Screenshot" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <label className="cursor-pointer text-white text-sm font-bold flex items-center gap-2">
                          <Upload className="w-4 h-4" /> Change Image
                          <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-4 mt-8">
                  <button 
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-bg-secondary dark:hover:bg-bg-card-hover text-gray-700 dark:text-white font-bold py-4 rounded-xl transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleSubmit}
                    disabled={loading || !screenshotUrl}
                    className="flex-[2] bg-brand-blue hover:bg-brand-blue-hover disabled:opacity-50 disabled:hover:bg-brand-blue text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-blue/30"
                  >
                    {loading ? "Verifying..." : "Complete Enrollment"}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">You are Enrolled!</h3>
                <p className="text-gray-600 dark:text-text-muted mb-8 leading-relaxed max-w-sm">
                  We have received your payment screenshot. Our team will verify the receipt and send your official Google Meet links and syllabus to your WhatsApp and Email shortly.
                </p>
                <button 
                  onClick={onClose}
                  className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-bold py-3.5 px-8 rounded-xl transition-colors shadow-lg"
                >
                  Return to Course
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
