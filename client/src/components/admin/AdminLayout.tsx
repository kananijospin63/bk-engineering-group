'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { isAuthenticated, getUser, clearAuth } from '@/lib/auth';
import {
  HardHat, LayoutDashboard, FolderOpen, Wrench, Users,
  FileText, MessageSquare, LogOut, Menu, X, ChevronRight, Settings,
} from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { href: '/admin', label: 'Tableau de Bord', icon: LayoutDashboard, exact: true },
  { href: '/admin/projects', label: 'Projets', icon: FolderOpen },
  { href: '/admin/services', label: 'Services', icon: Wrench },
  { href: '/admin/team', label: 'Équipe', icon: Users },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { href: '/admin/settings', label: 'Paramètres', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = getUser();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/admin/login');
    }
  }, [router]);

  const handleLogout = () => {
    clearAuth();
    router.push('/admin/login');
  };

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href) && href !== '/admin';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-50 w-64 bg-primary flex flex-col transition-transform duration-300',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center">
              <HardHat className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-sm font-heading">BK Engineering</div>
              <div className="text-gold-400 text-xs">Administration</div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon, exact }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className={clsx(
                'admin-sidebar-link',
                (exact ? pathname === href : pathname === href || pathname.startsWith(href + '/')) && 'active'
              )}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          ))}
        </nav>

        {/* User & Logout */}
        <div className="p-4 border-t border-white/10">
          {user && (
            <div className="flex items-center gap-3 mb-3 px-2">
              <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-medium truncate">{user.name}</div>
                <div className="text-gray-400 text-xs truncate">{user.email}</div>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="admin-sidebar-link w-full text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            <LogOut className="w-5 h-5" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          {/* Breadcrumb */}
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
            <Link href="/admin" className="hover:text-primary transition-colors">Admin</Link>
            {pathname !== '/admin' && (
              <>
                <ChevronRight className="w-4 h-4" />
                <span className="text-primary font-medium capitalize">
                  {pathname.split('/').pop()?.replace('-', ' ')}
                </span>
              </>
            )}
          </div>

          <Link
            href="/"
            target="_blank"
            className="text-sm text-gray-500 hover:text-primary transition-colors"
          >
            Voir le Site →
          </Link>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
