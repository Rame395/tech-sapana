"use client";

import { useState } from "react";
import { createService, updateService, deleteService } from "@/app/actions/service";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, X, Upload } from "lucide-react";

type Service = {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  iconName: string | null;
  points: string;
  published: boolean;
  order: number;
};

export default function ServiceForm({ services: initialServices }: { services: Service[] }) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState<Partial<Service>>({});
  const [isUploading, setIsUploading] = useState(false);

  const resetForm = () => {
    setCurrentService({});
    setIsEditing(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    const toastId = toast.loading("Uploading image...");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setCurrentService({ ...currentService, imageUrl: data.url });
        toast.success("Image uploaded", { id: toastId });
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("Upload failed", { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentService.title || !currentService.description || !currentService.points) {
      toast.error("Please fill all required fields");
      return;
    }

    const payload = {
      title: currentService.title,
      description: currentService.description,
      imageUrl: currentService.imageUrl || undefined,
      iconName: currentService.iconName || undefined,
      points: currentService.points,
      published: currentService.published ?? true,
      order: currentService.order ?? 0,
    };

    try {
      if (currentService.id) {
        const updated = await updateService(currentService.id, payload);
        setServices(services.map(s => s.id === updated.id ? updated : s));
        toast.success("Service updated!");
      } else {
        const created = await createService(payload);
        setServices([...services, created]);
        toast.success("Service created!");
      }
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save service");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await deleteService(id);
      setServices(services.filter(s => s.id !== id));
      toast.success("Service deleted");
    } catch (error) {
      toast.error("Failed to delete service");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Manage Services</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus size={16} /> Add New Service
          </button>
        )}
      </div>

      {isEditing && (
        <div className="bg-[#1E293B] border border-white/10 rounded-xl p-6 relative">
          <button onClick={resetForm} className="absolute top-4 right-4 text-gray-400 hover:text-white">
            <X size={20} />
          </button>
          
          <h3 className="text-lg font-semibold mb-4 text-white">
            {currentService.id ? "Edit Service" : "Add New Service"}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={currentService.title || ""}
                  onChange={(e) => setCurrentService({ ...currentService, title: e.target.value })}
                  className="w-full bg-[#0F172A] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="e.g., Cloud Infrastructure"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Icon Name (Lucide React)</label>
                <input
                  type="text"
                  value={currentService.iconName || ""}
                  onChange={(e) => setCurrentService({ ...currentService, iconName: e.target.value })}
                  className="w-full bg-[#0F172A] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="e.g., Cloud, Database, ShieldCheck"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Description *</label>
              <textarea
                required
                rows={3}
                value={currentService.description || ""}
                onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
                className="w-full bg-[#0F172A] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                placeholder="Brief description of the service"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Points (JSON Array) *</label>
              <textarea
                required
                rows={4}
                value={currentService.points || ""}
                onChange={(e) => setCurrentService({ ...currentService, points: e.target.value })}
                className="w-full bg-[#0F172A] border border-white/10 rounded-lg px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-blue-500"
                placeholder='["Point 1", "Point 2", "Point 3"]'
              />
              <p className="text-xs text-gray-500 mt-1">Must be a valid JSON array of strings.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentService.imageUrl || ""}
                    onChange={(e) => setCurrentService({ ...currentService, imageUrl: e.target.value })}
                    className="flex-grow bg-[#0F172A] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                  <label className="bg-[#0F172A] border border-white/10 hover:bg-white/5 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center justify-center transition-colors">
                    <Upload size={18} />
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
                  </label>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-400 mb-1">Order Index</label>
                  <input
                    type="number"
                    value={currentService.order ?? 0}
                    onChange={(e) => setCurrentService({ ...currentService, order: parseInt(e.target.value) })}
                    className="w-full bg-[#0F172A] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                
                <div className="flex-1 flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentService.published ?? true}
                      onChange={(e) => setCurrentService({ ...currentService, published: e.target.checked })}
                      className="w-4 h-4 text-blue-600 bg-[#0F172A] border-white/10 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-white">Published</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Save Service
              </button>
            </div>
          </form>
        </div>
      )}

      {!isEditing && (
        <div className="bg-[#1E293B] border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#0F172A] text-gray-400 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-semibold">Title</th>
                <th className="px-6 py-4 font-semibold text-center">Order</th>
                <th className="px-6 py-4 font-semibold text-center">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {services.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    No dynamic services found. Add one above.
                  </td>
                </tr>
              ) : (
                services.map((service) => (
                  <tr key={service.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{service.title}</td>
                    <td className="px-6 py-4 text-center">{service.order}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        service.published 
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                          : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                      }`}>
                        {service.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => {
                            setCurrentService(service);
                            setIsEditing(true);
                          }}
                          className="text-gray-400 hover:text-blue-400 transition-colors"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(service.id)}
                          className="text-gray-400 hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
