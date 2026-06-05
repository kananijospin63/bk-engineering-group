'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageUpload from '@/components/admin/ImageUpload';
import { adminAPI } from '@/lib/api';
import { Project } from '@/lib/types';
import { Plus, Pencil, Trash2, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const CATEGORIES = ['Génie Civil', 'Architecture', 'Topographie', 'Irrigation', 'Travaux Publics', 'Énergie'];
const emptyForm = { title: '', description: '', category: '', location: '', year: '', client: '', status: 'completed', featured_image: '' };

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = () => adminAPI.getProjects().then(r => setProjects(r.data)).catch(() => toast.error('Erreur de chargement')).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({ title: p.title, description: p.description, category: p.category, location: p.location || '', year: p.year?.toString() || '', client: p.client || '', status: p.status, featured_image: p.featured_image || '' });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      if (editing) { await adminAPI.updateProject(editing.id, form); toast.success('Projet mis à jour'); }
      else { await adminAPI.createProject(form); toast.success('Projet créé'); }
      setShowModal(false); load();
    } catch { toast.error('Erreur lors de la sauvegarde'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer ce projet ?')) return;
    try { await adminAPI.deleteProject(id); toast.success('Projet supprimé'); load(); }
    catch { toast.error('Erreur lors de la suppression'); }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-black text-primary font-heading">Projets</h1><p className="text-gray-500 text-sm mt-1">{projects.length} projet(s)</p></div>
        <button onClick={openCreate} className="btn-primary text-sm"><Plus className="w-4 h-4" /> Nouveau Projet</button>
      </div>

      {loading ? <div className="space-y-3">{Array.from({length:5}).map((_,i)=><div key={i} className="bg-gray-200 rounded-xl h-16 animate-pulse"/>)}</div> : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Projet</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Catégorie</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Statut</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {projects.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {p.featured_image ? <img src={p.featured_image} alt={p.title} className="object-cover w-full h-full" /> : <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-5 h-5 text-gray-400"/></div>}
                      </div>
                      <div><div className="font-medium text-primary text-sm">{p.title}</div>{p.location&&<div className="text-xs text-gray-400">{p.location}</div>}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell"><span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">{p.category}</span></td>
                  <td className="px-6 py-4 hidden lg:table-cell"><span className={`text-xs font-medium px-2 py-1 rounded-full ${p.status==='completed'?'bg-green-100 text-green-700':p.status==='ongoing'?'bg-blue-100 text-blue-700':'bg-yellow-100 text-yellow-700'}`}>{p.status==='completed'?'Terminé':p.status==='ongoing'?'En cours':'Planifié'}</span></td>
                  <td className="px-6 py-4"><div className="flex items-center justify-end gap-2"><button onClick={()=>openEdit(p)} className="p-2 hover:bg-blue-50 rounded-lg text-blue-600"><Pencil className="w-4 h-4"/></button><button onClick={()=>handleDelete(p.id)} className="p-2 hover:bg-red-50 rounded-lg text-red-500"><Trash2 className="w-4 h-4"/></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
          {projects.length===0&&<div className="text-center py-12 text-gray-400">Aucun projet. Créez-en un !</div>}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-primary font-heading">{editing?'Modifier le Projet':'Nouveau Projet'}</h2>
              <button onClick={()=>setShowModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Titre *</label><input required value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))} className="input-field" placeholder="Titre du projet"/></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Catégorie *</label><select required value={form.category} onChange={e=>setForm(p=>({...p,category:e.target.value}))} className="input-field"><option value="">Sélectionner</option>{CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}</select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Statut</label><select value={form.status} onChange={e=>setForm(p=>({...p,status:e.target.value}))} className="input-field"><option value="completed">Terminé</option><option value="ongoing">En cours</option><option value="planned">Planifié</option></select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Localisation</label><input value={form.location} onChange={e=>setForm(p=>({...p,location:e.target.value}))} className="input-field" placeholder="Goma, Nord-Kivu"/></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Année</label><input type="number" value={form.year} onChange={e=>setForm(p=>({...p,year:e.target.value}))} className="input-field" placeholder="2024"/></div>
                <div className="sm:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Client</label><input value={form.client} onChange={e=>setForm(p=>({...p,client:e.target.value}))} className="input-field" placeholder="Nom du client"/></div>
                <div className="sm:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Description *</label><textarea required rows={4} value={form.description} onChange={e=>setForm(p=>({...p,description:e.target.value}))} className="input-field resize-none" placeholder="Description du projet..."/></div>
                <div className="sm:col-span-2">
                  <ImageUpload endpoint="projectImage" label="Image du projet" currentImage={form.featured_image} onUploadComplete={url=>setForm(p=>({...p,featured_image:url}))} />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={()=>setShowModal(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium">Annuler</button>
                <button type="submit" disabled={saving} className="flex-1 btn-primary justify-center text-sm disabled:opacity-60">{saving?'Sauvegarde...':editing?'Mettre à Jour':'Créer'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
