'use client';

import { useEffect, useState, useCallback } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { adminAPI } from '@/lib/api';
import { ContactMessage } from '@/lib/types';
import { Mail, MailOpen, Trash2, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import clsx from 'clsx';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const load = useCallback(() => {
    const params: Record<string, string> | undefined =
      filter === 'unread' ? { read_status: 'false' } :
      filter === 'read'   ? { read_status: 'true' }  :
      undefined;
    adminAPI.getMessages(params)
      .then(res => setMessages(res.data))
      .catch(() => toast.error('Erreur de chargement'))
      .finally(() => setLoading(false));
  }, [filter]);

  useEffect(() => { load(); }, [load]);

  const handleView = async (msg: ContactMessage) => {
    setSelected(msg);
    if (!msg.read_status) {
      try {
        await adminAPI.markMessageRead(msg.id);
        setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, read_status: true } : m));
      } catch {}
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer ce message ?')) return;
    try {
      await adminAPI.deleteMessage(id);
      toast.success('Message supprimé');
      if (selected?.id === id) setSelected(null);
      load();
    } catch {
      toast.error('Erreur lors de la suppression');
    }
  };

  const unreadCount = messages.filter(m => !m.read_status).length;

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-primary font-heading">Messages</h1>
        <p className="text-gray-500 text-sm mt-1">
          {messages.length} message(s) {unreadCount > 0 && `— ${unreadCount} non lu(s)`}
        </p>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-4">
        {(['all', 'unread', 'read'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={clsx(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              filter === f ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
            )}
          >
            {f === 'all' ? 'Tous' : f === 'unread' ? 'Non lus' : 'Lus'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages list */}
        <div className="space-y-2">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-20 animate-pulse" />
            ))
          ) : messages.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center text-gray-400">
              Aucun message
            </div>
          ) : (
            messages.map(msg => (
              <div
                key={msg.id}
                onClick={() => handleView(msg)}
                className={clsx(
                  'bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-all border-l-4',
                  selected?.id === msg.id ? 'border-gold-500' : msg.read_status ? 'border-transparent' : 'border-blue-500',
                  !msg.read_status && 'bg-blue-50/50'
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.read_status ? 'bg-gray-100' : 'bg-blue-100'}`}>
                      {msg.read_status ? (
                        <MailOpen className="w-4 h-4 text-gray-500" />
                      ) : (
                        <Mail className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-medium truncate ${!msg.read_status ? 'text-primary' : 'text-gray-700'}`}>
                        {msg.name}
                      </div>
                      <div className="text-xs text-gray-400 truncate">{msg.subject}</div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {format(new Date(msg.received_at), 'd MMM yyyy, HH:mm', { locale: fr })}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); handleDelete(msg.id); }}
                    className="p-1.5 hover:bg-red-50 rounded-lg text-red-400 transition-colors flex-shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Message detail */}
        {selected ? (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-primary font-heading">{selected.subject}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  De: <span className="font-medium text-gray-700">{selected.name}</span> ({selected.email})
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {format(new Date(selected.received_at), 'd MMMM yyyy à HH:mm', { locale: fr })}
                </p>
              </div>
              <a
                href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                className="btn-primary text-xs py-2 px-4"
              >
                Répondre
              </a>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 shadow-sm flex items-center justify-center text-gray-400">
            <div className="text-center">
              <Eye className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Sélectionnez un message pour le lire</p>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
