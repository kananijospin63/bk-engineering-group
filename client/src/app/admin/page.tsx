'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { adminAPI } from '@/lib/api';
import { AdminStats } from '@/lib/types';
import {
  FolderOpen, Wrench, Users, FileText, MessageSquare, Mail,
  Plus, TrendingUp, Eye, RefreshCw,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

// ─── Mini formulaire projet rapide ────────────────────────────────────────────
function QuickProjectModal({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({ title: '', category: '', status: 'completed', description: '' });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      await adminAPI.createProject(fd);
      toast.success('Projet créé !');
      onSaved();
      onClose();
    } catch {
      toast.error('Erreur lors de la création');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title="Nouveau Projet" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
          <input required value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="input-field" placeholder="Titre du projet" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie *</label>
            <select required value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="input-field">
              <option value="">Sélectionner</option>
              {['Génie Civil', 'Architecture', 'Topographie', 'Irrigation', 'Travaux Publics', 'Énergie'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
            <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} className="input-field">
              <option value="completed">Terminé</option>
              <option value="ongoing">En cours</option>
              <option value="planned">Planifié</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea required rows={3} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} className="input-field resize-none" placeholder="Description..." />
        </div>
        <ModalFooter onClose={onClose} saving={saving} labelCreate="Créer le Projet" />
      </form>
    </Modal>
  );
}

// ─── Mini formulaire article rapide ───────────────────────────────────────────
function QuickBlogModal({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({ title: '', category: '', content: '', author: 'BK Engineering', published: 'false' });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      await adminAPI.createBlogPost(fd);
      toast.success('Article créé !');
      onSaved();
      onClose();
    } catch {
      toast.error('Erreur lors de la création');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title="Nouvel Article" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
          <input required value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="input-field" placeholder="Titre de l'article" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
            <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="input-field">
              <option value="">Sélectionner</option>
              {['Ingénierie', 'Architecture', 'Topographie', 'Formation', 'Technologie', 'Actualités'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Auteur</label>
            <input value={form.author} onChange={e => setForm(p => ({ ...p, author: e.target.value }))} className="input-field" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contenu *</label>
          <textarea required rows={5} value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} className="input-field resize-none" placeholder="Contenu de l'article..." />
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.published === 'true'} onChange={e => setForm(p => ({ ...p, published: e.target.checked ? 'true' : 'false' }))} className="w-4 h-4 accent-gold-500" />
          <span className="text-sm font-medium text-gray-700">Publier immédiatement</span>
        </label>
        <ModalFooter onClose={onClose} saving={saving} labelCreate="Créer l'Article" />
      </form>
    </Modal>
  );
}

// ─── Mini formulaire membre rapide ────────────────────────────────────────────
function QuickTeamModal({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({ name: '', role: '', bio: '', order_index: '0' });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      await adminAPI.createTeamMember(fd);
      toast.success('Membre ajouté !');
      onSaved();
      onClose();
    } catch {
      toast.error('Erreur lors de la création');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title="Nouveau Membre" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <ModalFooter onClose={onClose} saving={saving} labelCreate="Ajouter le Membre" />
      </form>
    </Modal>
  );
}

// ─── Composants utilitaires partagés ──────────────────────────────────────────
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-primary font-heading">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function ModalFooter({ onClose, saving, labelCreate }: { onClose: () => void; saving: boolean; labelCreate: string }) {
  return (
    <div className="flex gap-3 pt-2">
      <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors">
        Annuler
      </button>
      <button type="submit" disabled={saving} className="flex-1 btn-primary justify-center text-sm disabled:opacity-60">
        {saving ? 'Création...' : labelCreate}
      </button>
    </div>
  );
}

// ─── Dashboard principal ───────────────────────────────────────────────────────
type ModalType = 'project' | 'blog' | 'team' | null;

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [openModal, setOpenModal] = useState<ModalType>(null);

  const loadStats = async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    try {
      const res = await adminAPI.getStats();
      setStats(res.data);
    } catch {
      toast.error('Erreur de chargement des statistiques');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { loadStats(); }, []);

  const statCards = stats ? [
    { label: 'Projets',       value: stats.projects,       icon: FolderOpen,    href: '/admin/projects', color: 'bg-blue-500',   badge: null },
    { label: 'Services',      value: stats.services,       icon: Wrench,        href: '/admin/services', color: 'bg-purple-500', badge: null },
    { label: 'Équipe',        value: stats.team,           icon: Users,         href: '/admin/team',     color: 'bg-green-500',  badge: null },
    { label: 'Articles',      value: stats.posts,          icon: FileText,      href: '/admin/blog',     color: 'bg-orange-500', badge: null },
    { label: 'Messages',      value: stats.messages,       icon: MessageSquare, href: '/admin/messages', color: 'bg-red-500',    badge: null },
    { label: 'Non Lus',       value: stats.unreadMessages, icon: Mail,          href: '/admin/messages', color: 'bg-gold-500',   badge: stats.unreadMessages > 0 ? stats.unreadMessages : null },
  ] : [];

  const quickActions = [
    {
      label: 'Nouveau Projet',
      icon: FolderOpen,
      color: 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200',
      action: () => setOpenModal('project'),
    },
    {
      label: 'Nouvel Article',
      icon: FileText,
      color: 'bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200',
      action: () => setOpenModal('blog'),
    },
    {
      label: 'Nouveau Membre',
      icon: Users,
      color: 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200',
      action: () => setOpenModal('team'),
    },
    {
      label: 'Voir Messages',
      icon: MessageSquare,
      color: 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200',
      action: () => router.push('/admin/messages'),
      badge: stats?.unreadMessages ?? 0,
    },
    {
      label: 'Gérer Services',
      icon: Wrench,
      color: 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200',
      action: () => router.push('/admin/services'),
    },
    {
      label: 'Voir le Site',
      icon: Eye,
      color: 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200',
      action: () => window.open('/', '_blank'),
    },
  ];

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-primary font-heading">Tableau de Bord</h1>
          <p className="text-gray-500 mt-1">Vue d&apos;ensemble de votre site BK Engineering</p>
        </div>
        <button
          onClick={() => loadStats(true)}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Actualiser
        </button>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-2xl h-28 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {statCards.map(({ label, value, icon: Icon, href, color, badge }) => (
            <Link
              key={label}
              href={href}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group relative"
            >
              {badge && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {badge}
                </span>
              )}
              <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-black text-primary font-heading">{value}</div>
              <div className="text-xs text-gray-500 mt-1">{label}</div>
            </Link>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="w-5 h-5 text-gold-500" />
          <h2 className="text-lg font-bold text-primary font-heading">Actions Rapides</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map(({ label, icon: Icon, color, action, badge }) => (
            <button
              key={label}
              onClick={action}
              className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border transition-all text-sm font-medium ${color}`}
            >
              {badge ? (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {badge}
                </span>
              ) : null}
              <Icon className="w-6 h-6" />
              <span className="text-center leading-tight">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Raccourcis vers les pages complètes */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-primary font-heading mb-4">Gestion Complète</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { label: 'Tous les Projets',  href: '/admin/projects', icon: FolderOpen,    desc: `${stats?.projects ?? '—'} projet(s)` },
            { label: 'Tous les Articles', href: '/admin/blog',     icon: FileText,      desc: `${stats?.posts ?? '—'} article(s)` },
            { label: "Toute l'Équipe",    href: '/admin/team',     icon: Users,         desc: `${stats?.team ?? '—'} membre(s)` },
            { label: 'Tous les Services', href: '/admin/services', icon: Wrench,        desc: `${stats?.services ?? '—'} service(s)` },
            { label: 'Tous les Messages', href: '/admin/messages', icon: MessageSquare, desc: `${stats?.unreadMessages ?? '—'} non lu(s)` },
            { label: 'Paramètres',        href: '/admin/settings', icon: Eye,           desc: 'Compte & mot de passe' },
          ].map(({ label, href, icon: Icon, desc }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gold-50 hover:border-gold-200 border border-transparent rounded-xl transition-all group"
            >
              <Icon className="w-5 h-5 text-gray-400 group-hover:text-gold-600 transition-colors" />
              <div>
                <div className="text-sm font-semibold text-gray-700 group-hover:text-gold-700">{label}</div>
                <div className="text-xs text-gray-400">{desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Modales de création rapide */}
      {openModal === 'project' && (
        <QuickProjectModal onClose={() => setOpenModal(null)} onSaved={() => loadStats()} />
      )}
      {openModal === 'blog' && (
        <QuickBlogModal onClose={() => setOpenModal(null)} onSaved={() => loadStats()} />
      )}
      {openModal === 'team' && (
        <QuickTeamModal onClose={() => setOpenModal(null)} onSaved={() => loadStats()} />
      )}
    </AdminLayout>
  );
}
