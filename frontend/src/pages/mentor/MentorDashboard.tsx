import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import {
  Users,
  BookOpen,
  ShieldCheck,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

/* ───────────────── Dashboard Card ───────────────── */
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
      <div className="p-3 rounded-xl bg-accent/15 text-accent">
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

/* ───────────────── Mentor Dashboard ───────────────── */
export const MentorDashboard = () => {
  const navigate = useNavigate();


  return (
    <DashboardLayout role="mentor">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Sparkles className="text-accent" size={28} />
          <h1 className="font-playfair text-3xl text-text-primary font-bold">
            Mentor Dashboard
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
          Guide research. Shape integrity.
        </h2>
        <p className="text-text-muted max-w-2xl">
          As a mentor, you oversee research quality, help researchers refine
          their work, and ensure misinformation never makes it through.
        </p>
      </motion.div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
        <DashboardCard
          title="Assigned Researchers"
          description="View and manage researchers under your mentorship."
          icon={Users}
        />
        <DashboardCard
          title="Paper Reviews"
          description="Review submissions, annotate issues, and approve content."
          icon={BookOpen}
        />
        <DashboardCard
          title="Integrity Checks"
          description="Flag misinformation, weak claims, and unsupported data."
          icon={ShieldCheck}
        />
        <DashboardCard
          title="Impact Insights"
          description="Track how your guidance improves research quality."
          icon={TrendingUp}
        />
      </div>

      {/* Mentor Responsibility Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-forest-800/30 border border-forest-divider/40 rounded-3xl p-8 backdrop-blur-xl"
      >
        <h3 className="text-xl font-semibold text-text-primary mb-3">
          Mentor Responsibility
        </h3>
        <p className="text-text-muted max-w-3xl">
          Your role is critical. Every approval shapes public understanding,
          academic trust, and the future of verified knowledge. Take time,
          challenge assumptions, and guide with integrity.
        </p>
      </motion.div>
    </DashboardLayout>
  );
};
