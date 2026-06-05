'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageUpload from '@/components/admin/ImageUpload';
import { adminAPI } from '@/lib/api';
import { Service } from '@/lib/types';
import { Pencil } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState({ title: '', description: '', short_description: '', icon: '', order_index: '0', image: '' });
  const [saving, setSaving] = useState(false);

  const load = () => adminAPI.getServices().then(r=>setServices(r.data)).catch(()=>toast.error('Erreur de chargement')).finally(()=>setLoading(false));
  useEffect(()=>{load();},[]);

  const openEdit = (s: Service) => {
    setEditing(s);
    setForm({ title: s.title, description: s.description, short_description: s.short_description||'', icon: s.icon||'', order_index: s.order_index.toString(), image: s.image||'' });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); if(!editing) return; setSaving(true);
    try { await adminAPI.updateService(editing.id, form); toast.success('Service mis à jour'); setEditing(null); load(); }
    catch { toast.error('Erreur lors de la sauvegarde'); }
    finally { setSaving(false); }
  };

  return (
    <AdminLayout>
      <div className="mb-6"><h1 className="text-2xl font-black text-primary font-heading">Services</h1><p className="text-gray-500 text-sm mt-1">Gérez les descriptions et images de vos services</p></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          {loading ? Array.from({length:4}).map((_,i)=><div key={i} className="bg-gray-200 rounded-xl h-20 animate-pulse"/>) :
            services.map(s=>(
              <div key={s.id} className={`bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md border-2 transition-shadow ${editing?.id===s.id?'border-gold-500':'border-transparent'}`} onClick={()=>openEdit(s)}>
                <div className="flex items-center justify-between">
                  <div><h3 className="font-semibold text-primary text-sm">{s.title}</h3><p className="text-gray-400 text-xs mt-1 line-clamp-1">{s.short_description}</p></div>
                  <Pencil className="w-4 h-4 text-gray-400"/>
                </div>
              </div>
            ))
          }
        </div>

        {editing && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-primary font-heading mb-4">Modifier le Service</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Titre</label><input value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))} className="input-field"/></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Description Courte</label><input value={form.short_description} onChange={e=>setForm(p=>({...p,short_description:e.target.value}))} className="input-field"/></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Description Complète</label><textarea rows={5} value={form.description} onChange={e=>setForm(p=>({...p,description:e.target.value}))} className="input-field resize-none"/></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Icône</label>
                  <select value={form.icon} onChange={e=>setForm(p=>({...p,icon:e.target.value}))} className="input-field">
                    <option value="building">Bâtiment</option><option value="droplets">Eau</option><option value="map">Carte</option><option value="wrench">Outil</option><option value="zap">Énergie</option><option value="graduation">Formation</option>
                  </select>
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Ordre</label><input type="number" value={form.order_index} onChange={e=>setForm(p=>({...p,order_index:e.target.value}))} className="input-field"/></div>
              </div>
              <ImageUpload endpoint="serviceImage" label="Image du service" currentImage={form.image} onUploadComplete={url=>setForm(p=>({...p,image:url}))} />
              <div className="flex gap-3">
                <button type="button" onClick={()=>setEditing(null)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium">Annuler</button>
                <button type="submit" disabled={saving} className="flex-1 btn-primary justify-center text-sm disabled:opacity-60">{saving?'Sauvegarde...':'Mettre à Jour'}</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
