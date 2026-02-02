import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import {
  Users,
  BookOpenCheck,
  ClipboardList,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

/* ───────────────── Reusable Card ───────────────── */
const DashboardCard = ({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: any;
}) => (
  <motion.div
    whileHover={{ y: -6, scale: 1.02 }}
    transition={{ type: 'spring', stiffness: 200 }}
    className="bg-forest-800/40 backdrop-blur-xl border border-forest-divider/50 rounded-2xl p-6 shadow-lg"
  >
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-xl bg-emerald-500/15 text-emerald-400">
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-1">
          {title}
        </h3>
        <p className="text-sm text-text-muted">{description}</p>
      </div>
    </div>
  </motion.div>
);

/* ───────────────── Teacher Dashboard ───────────────── */
export const TeacherDashboard = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout role="teacher">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Sparkles className="text-emerald-400" size={28} />
          <h1 className="font-playfair text-3xl text-text-primary font-bold">
            Teacher Dashboard
          </h1>
        </div>
      </div>

      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-semibold text-text-primary mb-2">
          Teach with clarity. Lead with trust.
        </h2>
        <p className="text-text-muted max-w-2xl">
          As a teacher, you guide students through verified knowledge,
          structured learning paths, and real-world understanding.
        </p>
      </motion.div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
        <DashboardCard
          title="My Classes"
          description="Create and manage your active classes and batches."
          icon={Users}
        />
        <DashboardCard
          title="Course Content"
          description="Upload lessons, references, and verified materials."
          icon={BookOpenCheck}
        />
        <DashboardCard
          title="Assignments & Reviews"
          description="Evaluate student work and provide structured feedback."
          icon={ClipboardList}
        />
        <DashboardCard
          title="Student Queries"
          description="Answer doubts and guide students responsibly."
          icon={MessageSquare}
        />
      </div>

      {/* Teaching Philosophy Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-forest-800/30 border border-forest-divider/40 rounded-3xl p-8 backdrop-blur-xl"
      >
        <h3 className="text-xl font-semibold text-text-primary mb-3">
          Teaching Philosophy
        </h3>
        <p className="text-text-muted max-w-3xl">
          Education isn’t about information overload — it’s about clarity,
          accuracy, and responsibility. Your guidance helps students build
          foundations that last.
        </p>
      </motion.div>
    </DashboardLayout>
  );
};
