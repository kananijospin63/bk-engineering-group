'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { adminAPI } from '@/lib/api';
import { TeamMember } from '@/lib/types';
import { Plus, Pencil, Trash2, User } from 'lucide-react';
import toast from 'react-hot-toast';

const emptyForm = { name: '', role: '', bio: '', email: '', linkedin: '', order_index: '0' };

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    adminAPI.getTeam()
      .then(res => setTeam(res.data))
      .catch(() => toast.error('Erreur de chargement'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setPhotoFile(null);
    setShowModal(true);
  };

  const openEdit = (m: TeamMember) => {
    setEditing(m);
    setForm({ name: m.name, role: m.role, bio: m.bio || '', email: m.email || '', linkedin: m.linkedin || '', order_index: m.order_index.toString() });
    setPhotoFile(null);
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (photoFile) fd.append('photo', photoFile);

      if (editing) {
        await adminAPI.updateTeamMember(editing.id, fd);
        toast.success('Membre mis à jour');
      } else {
        await adminAPI.createTeamMember(fd);
        toast.success('Membre ajouté');
      }
      setShowModal(false);
      load();
    } catch {
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer ce membre ?')) return;
    try {
      await adminAPI.deleteTeamMember(id);
      toast.success('Membre supprimé');
      load();
    } catch {
      toast.error('Erreur lors de la suppression');
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-primary font-heading">Équipe</h1>
          <p className="text-gray-500 text-sm mt-1">{team.length} membre(s)</p>
        </div>
        <button onClick={openCreate} className="btn-primary text-sm">
          <Plus className="w-4 h-4" /> Nouveau Membre
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-2xl h-48 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {team.map(member => (
            <div key={member.id} className="bg-white rounded-2xl p-4 shadow-sm text-center group">
              <div className="w-20 h-20 mx-auto rounded-xl overflow-hidden bg-gray-100 mb-3">
                {member.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={member.photo} alt={member.name} className="object-cover w-full h-full" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
              <h3 className="font-semibold text-primary text-sm">{member.name}</h3>
              <p className="text-gold-500 text-xs mt-1">{member.role}</p>
              <div className="flex gap-2 justify-center mt-3">
                <button onClick={() => openEdit(member)} className="p-1.5 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(member.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-red-500 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-primary font-heading">
                {editing ? 'Modifier le Membre' : 'Nouveau Membre'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="input-field" placeholder="Ing. Prénom Nom" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rôle / Fonction *</label>
                <input required value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))} className="input-field" placeholder="Ingénieur Civil" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Biographie</label>
                <textarea rows={3} value={form.bio} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} className="input-field resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ordre</label>
                  <input type="number" value={form.order_index} onChange={e => setForm(p => ({ ...p, order_index: e.target.value }))} className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                <input value={form.linkedin} onChange={e => setForm(p => ({ ...p, linkedin: e.target.value }))} className="input-field" placeholder="https://linkedin.com/in/..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                <input type="file" accept="image/*" onChange={e => setPhotoFile(e.target.files?.[0] || null)} className="input-field" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium">
                  Annuler
                </button>
                <button type="submit" disabled={saving} className="flex-1 btn-primary justify-center text-sm disabled:opacity-60">
                  {saving ? 'Sauvegarde...' : editing ? 'Mettre à Jour' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
