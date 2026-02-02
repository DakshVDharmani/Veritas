import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutGrid,
  BookOpen,
  ShieldAlert,
  Users,
  FileText,
  Activity,
  DoorOpen
} from 'lucide-react';

import { TopNav } from '../layout/TopNav';
import { cn } from '../../lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'student' | 'researcher';
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, role }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const studentLinks = [
    { icon: LayoutGrid, label: 'Dashboard', path: '/student' },
    { icon: BookOpen, label: 'Knowledge Vault', path: '/student/vault' },
    { icon: ShieldAlert, label: 'Misinfo Lab', path: '/student/lab' },
    { icon: Users, label: 'Peer Discovery', path: '/student/peers' },
  ];

  const researcherLinks = [
    { icon: Activity, label: 'Overview', path: '/researcher' },
    { icon: FileText, label: 'Repository', path: '/researcher/repo' },
    { icon: Users, label: 'Discussions', path: '/researcher/discuss' },
  ];

  const links = role === 'student' ? studentLinks : researcherLinks;

  return (
    <div className="min-h-screen bg-forest-900 flex">
      {/* ───────── Sidebar ───────── */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-forest-800 border-r border-forest-divider flex flex-col z-30">
        {/* Brand */}
        <div className="px-8 py-6 border-b border-forest-divider/50">
          <h1 className="font-playfair text-xl text-text-primary tracking-wide">
            Veritas<span className="text-accent">.</span>
          </h1>
          <p className="text-[10px] text-text-muted uppercase tracking-widest mt-1">
            {role === 'student' ? 'Student Portal' : 'Research Hub'}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1">
          {links.map(({ icon: Icon, label, path }) => {
            const isActive = location.pathname === path;

            return (
              <Link
                key={path}
                to={path}
                className={cn(
                  "group flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300",
                  isActive
                    ? "bg-forest-700 text-accent shadow-lg shadow-accent/5"
                    : "text-text-muted hover:bg-forest-700/60 hover:text-text-primary"
                )}
              >
                <Icon
                  size={18}
                  className={cn(
                    "transition-colors",
                    isActive ? "text-accent" : "group-hover:text-accent"
                  )}
                />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-forest-divider/50">
          <button
            onClick={handleLogout}
            className="
              group w-full flex items-center gap-3 px-4 py-2.5 rounded-lg
              text-sm font-medium text-text-muted
              hover:text-red-400 hover:bg-red-500/10
              transition-all duration-300
            "
          >
            <DoorOpen
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
            <span className="tracking-wide">Logout</span>
          </button>
        </div>
      </aside>

      {/* ───────── Main Area ───────── */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Top Navigation */}
        <TopNav role={role} />

        {/* Page Content */}
        <main className="flex-1 px-8 py-8 bg-forest-900">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};