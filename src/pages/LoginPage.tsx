import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, DoorOpen, Sparkles } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useNavigate, Link } from 'react-router-dom';

export const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/student');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-950 via-forest-900 to-forest-950 flex overflow-hidden relative">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2 }}
          className="absolute top-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-20 right-40 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px]"
        />
      </div>

      {/* Left Half - COMPLETELY EMPTY for your animation */}
      <div className="w-1/2 relative">
        {/* Your animation goes here */}
      </div>

      {/* Right Half - Login Container */}
      <div className="w-1/2 flex items-center justify-center px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[480px]"
        >
          {/* Glass Morphism Container */}
          <div className="relative bg-forest-800/40 backdrop-blur-xl border border-forest-divider/50 rounded-3xl p-10 shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
            {/* Glow Effect */}
            <div className="absolute -inset-[1px] bg-gradient-to-br from-accent/20 via-transparent to-emerald-500/20 rounded-3xl blur-xl opacity-50 -z-10" />
            
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Sparkles className="text-accent" size={28} />
                </motion.div>
                <h1 className="font-playfair text-4xl text-text-primary font-bold tracking-tight">
                  Welcome back
                </h1>
              </div>
              <p className="text-text-muted leading-relaxed">
                Continue your journey of responsible knowledge verification.
              </p>
            </motion.div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              onSubmit={handleLogin}
              className="space-y-5"
            >
              <Input label="Email Address" type="email" required />
              <Input label="Password" type="password" required />

              <div className="flex items-center justify-between text-xs uppercase tracking-wider pt-2">
                <motion.label
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-2 text-text-muted cursor-pointer group"
                >
                  <input 
                    type="checkbox" 
                    className="accent-accent cursor-pointer w-4 h-4 rounded transition-all" 
                  />
                  <span className="group-hover:text-text-primary transition-colors">
                    Remember me
                  </span>
                </motion.label>
                <motion.span
                  whileHover={{ x: 3 }}
                  className="text-text-muted hover:text-accent cursor-pointer transition-colors"
                >
                  Forgot password?
                </motion.span>
              </div>

              <div className="pt-6">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full relative overflow-hidden bg-gradient-to-r from-accent to-emerald-500 text-white font-bold text-lg tracking-wide rounded-xl px-8 py-4 shadow-lg shadow-accent/25 transition-all duration-300 hover:shadow-xl hover:shadow-accent/40 group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3 font-semibold">
                    Log in
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </motion.button>
              </div>
            </motion.form>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 pt-8 border-t border-forest-divider/50 flex items-center justify-between"
            >
              <Link
                to="/signup"
                className="group flex items-center gap-2 text-sm font-medium text-text-muted hover:text-accent transition-all"
              >
                <span>Create an account</span>
                <ArrowRight 
                  size={16} 
                  className="group-hover:translate-x-1 transition-transform" 
                />
              </Link>

              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              >
                <DoorOpen
                  size={20}
                  className="text-text-muted/60"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Accent Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent origin-center"
          />
        </motion.div>
      </div>
    </div>
  );
};