'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { authAPI } from '@/lib/api';
import { getUser } from '@/lib/auth';
import { Lock, User, Eye, EyeOff, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminSettingsPage() {
  const user = getUser();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      toast.error('Les nouveaux mots de passe ne correspondent pas.');
      return;
    }
    if (form.newPassword.length < 8) {
      toast.error('Le nouveau mot de passe doit contenir au moins 8 caractères.');
      return;
    }
    setLoading(true);
    try {
      await authAPI.changePassword(form.currentPassword, form.newPassword);
      toast.success('Mot de passe mis à jour avec succès !');
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Erreur lors de la mise à jour.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-primary font-heading">Paramètres</h1>
        <p className="text-gray-500 text-sm mt-1">Gérez votre compte et vos préférences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gold-100 rounded-lg flex items-center justify-center">
              <User className="w-4 h-4 text-gold-600" />
            </div>
            <h2 className="text-lg font-bold text-primary font-heading">Informations du Compte</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Nom</label>
              <p className="text-gray-800 font-medium bg-gray-50 rounded-lg px-4 py-3">{user?.name || '—'}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email</label>
              <p className="text-gray-800 font-medium bg-gray-50 rounded-lg px-4 py-3">{user?.email || '—'}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Rôle</label>
              <p className="text-gray-800 font-medium bg-gray-50 rounded-lg px-4 py-3 capitalize">{user?.role || '—'}</p>
            </div>
          </div>
        </div>

        {/* Change password */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gold-100 rounded-lg flex items-center justify-center">
              <Lock className="w-4 h-4 text-gold-600" />
            </div>
            <h2 className="text-lg font-bold text-primary font-heading">Changer le Mot de Passe</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Current password */}
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe actuel
              </label>
              <div className="relative">
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type={showCurrent ? 'text' : 'password'}
                  required
                  value={form.currentPassword}
                  onChange={handleChange}
                  className="input-field pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* New password */}
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Nouveau mot de passe
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showNew ? 'text' : 'password'}
                  required
                  minLength={8}
                  value={form.newPassword}
                  onChange={handleChange}
                  className="input-field pr-10"
                  placeholder="Minimum 8 caractères"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirmer le nouveau mot de passe
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  required
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={`input-field pr-10 ${
                    form.confirmPassword && form.confirmPassword !== form.newPassword
                      ? 'border-red-400 focus:ring-red-400'
                      : ''
                  }`}
                  placeholder="Répétez le nouveau mot de passe"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.confirmPassword && form.confirmPassword !== form.newPassword && (
                <p className="text-red-500 text-xs mt-1">Les mots de passe ne correspondent pas.</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {loading ? 'Mise à jour...' : 'Mettre à Jour'}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
