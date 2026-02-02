import React, { useEffect, useState } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

/* ================= TYPES ================= */

type UserRole = 'student' | 'teacher' | 'researcher' | 'mentor';

interface Profile {
  name: string;
  role: UserRole;
  institution?: string | null;
}

export const TopNav: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [open, setOpen] = useState(false);

  /* ================= FETCH PROFILE ================= */

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('name, role, institution')
        .eq('id', user.id)
        .single();

      if (!error && data) setProfile(data);
    };

    fetchProfile();
  }, []);

  const initials =
    profile?.name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'U';

  const roleLabel = () => {
    switch (profile?.role) {
      case 'student':
        return 'Student';
      case 'teacher':
        return 'Teacher';
      case 'researcher':
        return profile?.institution || 'Researcher';
      case 'mentor':
        return 'Mentor';
      default:
        return '';
    }
  };

  return (
    <>
      {/* ================= TOP BAR ================= */}
      <header className="h-20 bg-forest-900 px-8 flex items-center justify-between">
        {/* Search */}
        <div className="relative w-full max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search papers, concepts, discussions…"
            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-forest-800 border border-forest-divider text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        {/* Profile */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setOpen(true)}
        >
          <div className="w-10 h-10 rounded-full bg-forest-700 flex items-center justify-center text-xs font-serif text-accent border border-forest-divider group-hover:border-accent/50">
            {initials}
          </div>

          <div className="leading-tight text-right">
            <p className="text-sm text-text-primary font-serif">
              {profile?.name || 'Loading…'}
            </p>
            <p className="text-[10px] text-text-muted uppercase tracking-wider">
              {roleLabel()}
            </p>
          </div>

          <ChevronDown size={14} className="text-text-muted group-hover:text-text-primary" />
        </div>
      </header>

      {/* ================= PROFILE MODAL ================= */}
      {open && profile && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-forest-900 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl border border-forest-divider shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-forest-900 border-b border-forest-divider px-6 py-4 flex justify-between">
              <h2 className="text-xl font-serif text-text-primary">
                Complete Your Profile
              </h2>
              <button onClick={() => setOpen(false)}>
                <X size={20} className="text-text-muted hover:text-text-primary" />
              </button>
            </div>

            <div className="p-6">
              {/* ================= STUDENT ================= */}
              {profile.role === 'student' && (
                <>
                  <Section title="Student Information" />
                  <Grid>
                    <Input label="Full Name" />
                    <Input label="College / University" />
                    <Input label="Course / Degree" />
                    <Input label="Year / Semester" />
                  </Grid>

                  <Section title="Academic Interests" />
                  <Textarea label="Areas of Interest" />
                  <Textarea label="Skills" />
                </>
              )}

              {/* ================= TEACHER ================= */}
              {profile.role === 'teacher' && (
                <>
                  <Section title="Teacher Profile" />
                  <Grid>
                    <Input label="Institution" />
                    <Input label="Subjects Taught" />
                    <Input label="Years of Experience" />
                    <Input label="Affiliated Board / University" />
                  </Grid>

                  <Textarea label="Teaching Philosophy" />
                  <Textarea label="Certifications & Training" />
                </>
              )}

              {/* ================= RESEARCHER ================= */}
              {profile.role === 'researcher' && (
                <>
                  <Section title="Research Identity" />
                  <Grid>
                    <Input label="Institution" />
                    <Input label="Department / Lab" />
                    <Input label="ORCID ID" />
                  </Grid>

                  <Section title="Research Metrics" />
                  <Grid>
                    <Input label="Total Publications" />
                    <Input label="Total Citations" />
                    <Input label="h-index" />
                  </Grid>

                  <Textarea label="Research Domains & Keywords" />
                </>
              )}

              {/* ================= MENTOR ================= */}
              {profile.role === 'mentor' && (
                <>
                  <Section title="Mentor Profile" />
                  <Grid>
                    <Input label="Current Affiliation" />
                    <Input label="Mentorship Role" />
                    <Input label="Students Mentored" />
                    <Input label="Active Mentees" />
                  </Grid>

                  <Textarea label="Mentorship Areas" />
                  <Textarea label="Availability & Expectations" />
                </>
              )}

              {/* Actions */}
              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="px-6 py-2.5 rounded-lg bg-forest-800 border border-forest-divider text-text-muted hover:text-text-primary"
                >
                  Cancel
                </button>
                <button className="px-6 py-2.5 rounded-lg bg-accent text-black font-medium shadow-lg shadow-accent/20">
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* ================= UI HELPERS ================= */

const Section = ({ title }: { title: string }) => (
  <h3 className="text-sm uppercase tracking-wider text-text-muted mt-6 mb-3">
    {title}
  </h3>
);

const Grid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
);

const Input = ({ label }: { label: string }) => (
  <div>
    <label className="text-xs text-text-muted block mb-1.5">{label}</label>
    <input className="w-full px-3 py-2.5 rounded-lg bg-forest-800 border border-forest-divider text-sm text-text-primary focus:outline-none focus:border-accent" />
  </div>
);

const Textarea = ({ label }: { label: string }) => (
  <div className="mt-4">
    <label className="text-xs text-text-muted block mb-1.5">{label}</label>
    <textarea
      rows={3}
      className="w-full px-3 py-2.5 rounded-lg bg-forest-800 border border-forest-divider text-sm text-text-primary focus:outline-none focus:border-accent resize-none"
    />
  </div>
);
