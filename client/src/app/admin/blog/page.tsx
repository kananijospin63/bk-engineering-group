'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageUpload from '@/components/admin/ImageUpload';
import { adminAPI } from '@/lib/api';
import { BlogPost } from '@/lib/types';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const CATEGORIES = ['Ingénierie', 'Architecture', 'Topographie', 'Formation', 'Technologie', 'Actualités'];
const emptyForm = { title: '', content: '', excerpt: '', category: '', author: 'BK Engineering', published: 'false', thumbnail: '' };

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = () => adminAPI.getBlogPosts().then(r=>setPosts(r.data)).catch(()=>toast.error('Erreur de chargement')).finally(()=>setLoading(false));
  useEffect(()=>{load();},[]);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (p: BlogPost) => {
    setEditing(p);
    setForm({ title: p.title, content: p.content||'', excerpt: p.excerpt||'', category: p.category||'', author: p.author, published: p.published?'true':'false', thumbnail: p.thumbnail||'' });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      if (editing) { await adminAPI.updateBlogPost(editing.id, form); toast.success('Article mis à jour'); }
      else { await adminAPI.createBlogPost(form); toast.success('Article créé'); }
      setShowModal(false); load();
    } catch { toast.error('Erreur lors de la sauvegarde'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer cet article ?')) return;
    try { await adminAPI.deleteBlogPost(id); toast.success('Article supprimé'); load(); }
    catch { toast.error('Erreur lors de la suppression'); }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-black text-primary font-heading">Blog</h1><p className="text-gray-500 text-sm mt-1">{posts.length} article(s)</p></div>
        <button onClick={openCreate} className="btn-primary text-sm"><Plus className="w-4 h-4"/> Nouvel Article</button>
      </div>

      {loading ? <div className="space-y-3">{Array.from({length:5}).map((_,i)=><div key={i} className="bg-gray-200 rounded-xl h-16 animate-pulse"/>)}</div> : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Article</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Catégorie</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Statut</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Date</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map(p=>(
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4"><div className="font-medium text-primary text-sm line-clamp-1">{p.title}</div><div className="text-xs text-gray-400">par {p.author}</div></td>
                  <td className="px-6 py-4 hidden md:table-cell">{p.category&&<span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded-full">{p.category}</span>}</td>
                  <td className="px-6 py-4 hidden lg:table-cell"><span className={`flex items-center gap-1 text-xs font-medium ${p.published?'text-green-600':'text-gray-400'}`}>{p.published?<Eye className="w-3 h-3"/>:<EyeOff className="w-3 h-3"/>}{p.published?'Publié':'Brouillon'}</span></td>
                  <td className="px-6 py-4 hidden lg:table-cell text-xs text-gray-400">{p.published_at?format(new Date(p.published_at),'d MMM yyyy',{locale:fr}):'—'}</td>
                  <td className="px-6 py-4"><div className="flex items-center justify-end gap-2"><button onClick={()=>openEdit(p)} className="p-2 hover:bg-blue-50 rounded-lg text-blue-600"><Pencil className="w-4 h-4"/></button><button onClick={()=>handleDelete(p.id)} className="p-2 hover:bg-red-50 rounded-lg text-red-500"><Trash2 className="w-4 h-4"/></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
          {posts.length===0&&<div className="text-center py-12 text-gray-400">Aucun article. Créez-en un !</div>}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-primary font-heading">{editing?'Modifier l\'Article':'Nouvel Article'}</h2>
              <button onClick={()=>setShowModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Titre *</label><input required value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))} className="input-field" placeholder="Titre de l'article"/></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label><select value={form.category} onChange={e=>setForm(p=>({...p,category:e.target.value}))} className="input-field"><option value="">Sélectionner</option>{CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}</select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Auteur</label><input value={form.author} onChange={e=>setForm(p=>({...p,author:e.target.value}))} className="input-field"/></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Extrait</label><textarea rows={2} value={form.excerpt} onChange={e=>setForm(p=>({...p,excerpt:e.target.value}))} className="input-field resize-none" placeholder="Résumé court..."/></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Contenu *</label><textarea required rows={10} value={form.content} onChange={e=>setForm(p=>({...p,content:e.target.value}))} className="input-field resize-none font-mono text-sm" placeholder="Contenu HTML..."/><p className="text-xs text-gray-400 mt-1">HTML supporté pour la mise en forme.</p></div>
              <ImageUpload endpoint="blogThumbnail" label="Image de couverture" currentImage={form.thumbnail} onUploadComplete={url=>setForm(p=>({...p,thumbnail:url}))} />
              <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.published==='true'} onChange={e=>setForm(p=>({...p,published:e.target.checked?'true':'false'}))} className="w-4 h-4 accent-gold-500"/><span className="text-sm font-medium text-gray-700">Publier immédiatement</span></label>
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
