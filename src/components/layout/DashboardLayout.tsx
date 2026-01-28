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
import { cn } from '../../lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'student' | 'researcher';
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, role }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear auth/session if present
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
      {/* Sidebar */}
      <aside className="w-64 border-r border-forest-divider bg-forest-800 flex flex-col fixed h-full z-10">
        {/* Brand */}
        <div className="p-8">
          <h1 className="font-playfair text-xl text-text-primary tracking-wide">
            Veritas<span className="text-accent">.</span>
          </h1>
          <p className="text-xs text-text-muted mt-1 uppercase tracking-widest">
            {role === 'student' ? 'Student Portal' : 'Research Hub'}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ease-institutional",
                  isActive
                    ? "bg-forest-700 text-accent"
                    : "text-text-muted hover:text-text-primary hover:bg-forest-700/50"
                )}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-forest-divider space-y-4">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-forest-700 flex items-center justify-center text-xs font-serif text-accent border border-forest-divider">
              {role === 'student' ? 'JD' : 'Dr'}
            </div>
            <div>
              <p className="text-sm text-text-primary font-serif">
                {role === 'student' ? 'John Doe' : 'Dr. A. Smith'}
              </p>
              <p className="text-[10px] text-text-muted uppercase tracking-wider">
                {role === 'student' ? 'Undergraduate' : 'Senior Analyst'}
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="
              group w-full flex items-center gap-3 px-4 py-2.5 rounded-lg
              text-sm font-medium text-text-muted
              border border-transparent
              hover:text-red-400
              hover:bg-red-500/10
              hover:border-red-500/30
              transition-all duration-300
            "
          >
            <DoorOpen
              size={18}
              className="
                transition-transform duration-300
                group-hover:translate-x-1
              "
            />
            <span className="tracking-wide">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
