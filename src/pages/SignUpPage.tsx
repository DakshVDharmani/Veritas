import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Microscope, ArrowRight, Stars } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { RoleCard } from '../components/ui/RoleCard';
import { useNavigate, Link } from 'react-router-dom';

export const SignupPage = () => {
  const [role, setRole] = useState<'student' | 'researcher'>('student');
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(role === 'student' ? '/student' : '/researcher');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-950 via-forest-900 to-forest-950 flex overflow-hidden relative">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2 }}
          className="absolute top-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-20 left-40 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[140px]"
        />
      </div>

      {/* Left Half - Signup Container */}
      <div className="w-1/2 flex items-center justify-center px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[520px]"
        >
          {/* Glass Morphism Container */}
          <div className="relative bg-forest-800/40 backdrop-blur-xl border border-forest-divider/50 rounded-3xl p-10 shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
            {/* Glow Effect */}
            <div className="absolute -inset-[1px] bg-gradient-to-br from-emerald-500/20 via-transparent to-accent/20 rounded-3xl blur-xl opacity-50 -z-10" />
            
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Stars className="text-emerald-400" size={28} />
                </motion.div>
                <h1 className="font-playfair text-4xl text-text-primary font-bold tracking-tight">
                  Create your account
                </h1>
              </div>
              <p className="text-text-muted leading-relaxed">
                Join a system built on verification, not virality.
              </p>
            </motion.div>

            {/* Role Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-4 mb-8"
            >
              <RoleCard
                title="Student"
                description="Learn, analyze & grow"
                icon={GraduationCap}
                selected={role === 'student'}
                onClick={() => setRole('student')}
              />
              <RoleCard
                title="Researcher"
                description="Study impact & misinformation"
                icon={Microscope}
                selected={role === 'researcher'}
                onClick={() => setRole('researcher')}
              />
            </motion.div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              onSubmit={handleSignup}
              className="space-y-4"
            >
              <Input label="Full Name" type="text" required />
              <Input label="Email Address" type="email" required />
              
              <AnimatePresence mode="wait">
                {role === 'researcher' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Input label="Institution" type="text" placeholder="Optional" />
                  </motion.div>
                )}
              </AnimatePresence>
              
              <Input label="Password" type="password" required />
              <Input label="Confirm Password" type="password" required />

              <div className="pt-6">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full relative overflow-hidden bg-gradient-to-r from-emerald-500 to-accent text-white font-bold text-lg tracking-wide rounded-xl px-8 py-4 shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/40 group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3 font-semibold">
                    Create Account
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </motion.button>
              </div>
            </motion.form>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-10 pt-8 border-t border-forest-divider/50 flex justify-between items-center"
            >
              <Link
                to="/login"
                className="flex items-center gap-2 text-sm font-medium text-text-muted hover:text-accent transition-all group"
              >
                <ArrowRight
                  size={16}
                  className="rotate-180 group-hover:-translate-x-1 transition-transform"
                />
                <span>Already have an account</span>
              </Link>

              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Stars
                  size={20}
                  className="text-emerald-400/60"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Accent Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent origin-center"
          />
        </motion.div>
      </div>

      {/* Right Half - COMPLETELY EMPTY for your animation */}
      <div className="w-1/2 relative">
        {/* Your animation goes here */}
      </div>
    </div>
  );
};