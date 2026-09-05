"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CheckCircle2, ArrowRight, Phone, User, Mail, ShieldCheck, Lock, Award, Clock } from "lucide-react";
import { createEnrollment } from "@/app/actions/enrollment";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutClient({
  courseId,
  courseTitle,
  coursePrice,
  qrImageUrl,
}: {
  courseId: string;
  courseTitle: string;
  coursePrice: number;
  qrImageUrl?: string | null;
}) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
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
    <div className="min-h-screen bg-bg-primary pt-24 pb-16">
      <div className="w-full max-w-[1240px] mx-auto px-6">
        
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <Link href={`/courses`} className="text-brand-blue hover:underline text-sm font-bold mb-4 inline-block">&larr; Back to Courses</Link>
          <h1 className="text-3xl md:text-4xl font-extrabold text-text-main">Secure Enrollment</h1>
          <p className="text-text-muted mt-2">Complete your purchase to secure your seat.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Checkout Form */}
          <div className="lg:col-span-7 bg-bg-secondary border border-border-subtle rounded-3xl p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
            
            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-10 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-border-subtle rounded-full overflow-hidden">
                <div className="h-full bg-brand-blue transition-all duration-500" style={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}></div>
              </div>
              <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 1 ? 'bg-brand-blue text-white shadow-[0_0_15px_rgba(0,82,204,0.4)]' : 'bg-bg-card border-2 border-border-medium text-text-muted'}`}>1</div>
              <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 2 ? 'bg-brand-blue text-white shadow-[0_0_15px_rgba(0,82,204,0.4)]' : 'bg-bg-card border-2 border-border-medium text-text-muted'}`}>2</div>
              <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 3 ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 'bg-bg-card border-2 border-border-medium text-text-muted'}`}>
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>

            {error && (
              <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                {error}
              </div>
            )}

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-text-main mb-6">Personal Information</h2>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-bold text-text-muted mb-2">Full Name</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted/50"><User className="w-5 h-5" /></div>
                          <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full pl-11 pr-4 py-4 bg-bg-primary border border-border-medium hover:border-brand-blue focus:border-brand-blue rounded-xl text-text-main focus:ring-1 focus:ring-brand-blue outline-none transition-all" placeholder="Enter your full name" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-text-muted mb-2">Email Address</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted/50"><Mail className="w-5 h-5" /></div>
                          <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full pl-11 pr-4 py-4 bg-bg-primary border border-border-medium hover:border-brand-blue focus:border-brand-blue rounded-xl text-text-main focus:ring-1 focus:ring-brand-blue outline-none transition-all" placeholder="your@email.com" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-text-muted mb-2">WhatsApp Number</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted/50"><Phone className="w-5 h-5" /></div>
                          <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full pl-11 pr-4 py-4 bg-bg-primary border border-border-medium hover:border-brand-blue focus:border-brand-blue rounded-xl text-text-main focus:ring-1 focus:ring-brand-blue outline-none transition-all" placeholder="+977 9800000000" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button onClick={handleNextStep} className="w-full mt-8 py-4 bg-brand-blue hover:bg-brand-blue-hover !text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(0,82,204,0.3)] transition-all hover:-translate-y-1">
                    Proceed to Payment <ArrowRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8 text-center">
                  <div>
                    <h2 className="text-xl font-bold text-text-main mb-2">Payment Details</h2>
                    <p className="text-text-muted text-sm">Scan the QR code below using eSewa, Khalti, or Mobile Banking to pay exactly <strong className="text-brand-blue text-lg">NPR {coursePrice.toLocaleString()}</strong>.</p>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="p-4 bg-white border border-border-medium rounded-2xl w-64 h-64 shadow-xl">
                      {qrImageUrl ? (
                        <img src={qrImageUrl} alt="Payment QR Code" className="w-full h-full object-contain" />
                      ) : (
                        <div className="text-gray-400 text-sm font-bold h-full flex items-center justify-center text-center">QR Code Not<br/>Configured</div>
                      )}
                    </div>
                  </div>

                  <div className="text-left bg-bg-primary p-6 rounded-xl border border-border-subtle">
                    <label className="block text-sm font-bold text-text-main mb-4 flex items-center gap-2"><Upload className="w-4 h-4 text-brand-blue"/> Upload Payment Screenshot</label>
                    {!screenshotUrl ? (
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border-medium hover:border-brand-blue bg-bg-secondary hover:bg-brand-blue-soft/10 rounded-xl cursor-pointer transition-colors group">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <p className="text-sm text-text-muted font-semibold group-hover:text-brand-blue transition-colors">{uploading ? "Uploading..." : "Click to browse files"}</p>
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
                      </label>
                    ) : (
                      <div className="relative w-full h-40 rounded-xl overflow-hidden border border-border-subtle group">
                        <img src={screenshotUrl} alt="Screenshot" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <label className="cursor-pointer text-white text-sm font-bold flex items-center gap-2 bg-brand-blue px-4 py-2 rounded-full">
                            <Upload className="w-4 h-4" /> Change Image
                            <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <button onClick={() => setStep(1)} className="flex-1 py-4 bg-bg-card hover:bg-bg-card-hover border border-border-medium text-text-main font-bold rounded-xl transition-colors">Back</button>
                    <button onClick={handleSubmit} disabled={loading || !screenshotUrl} className="flex-[2] py-4 bg-brand-blue hover:bg-brand-blue-hover disabled:opacity-50 disabled:hover:bg-brand-blue !text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(0,82,204,0.3)] transition-all">
                      {loading ? "Verifying..." : "Complete Enrollment"}
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-12 flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(34,197,94,0.3)] border border-green-500/20">
                    <ShieldCheck className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-text-main mb-4">Enrollment Successful!</h3>
                  <p className="text-text-muted mb-8 leading-relaxed max-w-md">
                    We have received your payment screenshot. Our team will verify the receipt and send your official access links to your WhatsApp and Email shortly.
                  </p>
                  <button onClick={() => router.push(`/courses`)} className="bg-bg-card hover:bg-bg-card-hover border border-border-medium text-text-main font-bold py-4 px-8 rounded-xl transition-all hover:-translate-y-1">
                    Return to Courses
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Right Side: Order Summary & Trust Badges */}
          <div className="lg:col-span-5 sticky top-[100px] flex flex-col gap-6">
            
            <div className="bg-bg-secondary border border-border-subtle rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
              <h3 className="text-lg font-bold text-text-main mb-6 pb-4 border-b border-border-subtle">Order Summary</h3>
              
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <div className="font-bold text-text-main leading-tight mb-1">{courseTitle}</div>
                    <div className="text-xs text-brand-blue font-bold tracking-wider uppercase">Live Cohort</div>
                  </div>
                  <div className="font-bold text-text-main whitespace-nowrap">NPR {coursePrice.toLocaleString()}</div>
                </div>
              </div>

              <div className="border-t border-border-subtle pt-6 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-text-muted font-semibold">Subtotal</span>
                  <span className="font-bold text-text-main">NPR {coursePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-green-500 font-semibold">Taxes & Fees</span>
                  <span className="text-green-500 font-bold">Included</span>
                </div>
              </div>

              <div className="bg-bg-primary rounded-xl p-6 border border-border-subtle flex justify-between items-center">
                <span className="text-text-main font-bold">Total Due</span>
                <span className="text-3xl font-extrabold text-brand-blue">NPR {coursePrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-bg-secondary border border-border-subtle rounded-2xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 bg-brand-blue-soft text-brand-blue rounded-full flex items-center justify-center flex-shrink-0"><Lock className="w-5 h-5" /></div>
                <div>
                  <div className="font-bold text-text-main text-sm mb-0.5">100% Secure Checkout</div>
                  <div className="text-xs text-text-muted">Your payment data is fully encrypted.</div>
                </div>
              </div>
              <div className="bg-bg-secondary border border-border-subtle rounded-2xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 bg-brand-blue-soft text-brand-blue rounded-full flex items-center justify-center flex-shrink-0"><Award className="w-5 h-5" /></div>
                <div>
                  <div className="font-bold text-text-main text-sm mb-0.5">Certificate Included</div>
                  <div className="text-xs text-text-muted">Earn a verifiable certificate upon completion.</div>
                </div>
              </div>
              <div className="bg-bg-secondary border border-border-subtle rounded-2xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 bg-brand-blue-soft text-brand-blue rounded-full flex items-center justify-center flex-shrink-0"><Clock className="w-5 h-5" /></div>
                <div>
                  <div className="font-bold text-text-main text-sm mb-0.5">Lifetime Access</div>
                  <div className="text-xs text-text-muted">Access course recordings forever.</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
