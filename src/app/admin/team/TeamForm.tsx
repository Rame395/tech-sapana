"use client";

import { useState } from "react";
import { createTeamMember, updateTeamMember, deleteTeamMember } from "@/app/actions/team";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, X } from "lucide-react";

type TeamMember = {
  id: string;
  name: string;
  badge: string;
  description: string;
  order: number;
};

export default function TeamForm({ members: initialMembers }: { members: TeamMember[] }) {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState<Partial<TeamMember>>({});

  const resetForm = () => {
    setCurrentMember({});
    setIsEditing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMember.name || !currentMember.badge || !currentMember.description) {
      toast.error("Please fill all required fields");
      return;
    }

    const payload = {
      name: currentMember.name,
      badge: currentMember.badge,
      description: currentMember.description,
      order: currentMember.order ?? 0,
    };

    try {
      if (currentMember.id) {
        const updated = await updateTeamMember(currentMember.id, payload);
        setMembers(members.map(m => m.id === updated.id ? updated : m));
        toast.success("Team member updated!");
      } else {
        const created = await createTeamMember(payload);
        setMembers([...members, created]);
        toast.success("Team member created!");
      }
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save team member");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    try {
      await deleteTeamMember(id);
      setMembers(members.filter(m => m.id !== id));
      toast.success("Team member deleted");
    } catch (error) {
      toast.error("Failed to delete team member");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">The Builders (Team)</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus size={16} /> Add Team Member
          </button>
        )}
      </div>

      {isEditing && (
        <div className="bg-[#1E293B] border border-white/10 rounded-xl p-6 relative">
          <button onClick={resetForm} className="absolute top-4 right-4 text-gray-400 hover:text-white">
            <X size={20} />
          </button>
          
          <h3 className="text-lg font-semibold mb-4 text-white">
            {currentMember.id ? "Edit Team Member" : "Add Team Member"}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={currentMember.name || ""}
                  onChange={(e) => setCurrentMember({ ...currentMember, name: e.target.value })}
                  className="w-full bg-[#0F172A] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="e.g., Engineering Lead"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Badge (Department)</label>
                <input
                  type="text"
                  required
                  value={currentMember.badge || ""}
                  onChange={(e) => setCurrentMember({ ...currentMember, badge: e.target.value })}
                  className="w-full bg-[#0F172A] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="e.g., Backend & Cloud"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
              <textarea
                required
                rows={3}
                value={currentMember.description || ""}
                onChange={(e) => setCurrentMember({ ...currentMember, description: e.target.value })}
                className="w-full bg-[#0F172A] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                placeholder="Brief description of their focus area"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Order Index</label>
              <input
                type="number"
                value={currentMember.order ?? 0}
                onChange={(e) => setCurrentMember({ ...currentMember, order: parseInt(e.target.value) })}
                className="w-full md:w-1/2 bg-[#0F172A] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Save Member
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
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Badge</th>
                <th className="px-6 py-4 font-semibold text-center">Order</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {members.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    No team members found. Add one above.
                  </td>
                </tr>
              ) : (
                members.map((member) => (
                  <tr key={member.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{member.name}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-white/10 rounded-full text-xs font-semibold">
                        {member.badge}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">{member.order}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => {
                            setCurrentMember(member);
                            setIsEditing(true);
                          }}
                          className="text-gray-400 hover:text-blue-400 transition-colors"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(member.id)}
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
