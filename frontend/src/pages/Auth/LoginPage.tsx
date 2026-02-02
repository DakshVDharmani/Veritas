import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, DoorOpen, Sparkles, Eye, Lock, Shield, Zap } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

/* =========================
   ✨ Floating Particles
========================= */
const FloatingParticles = () => {
  const particles = Array.from({ length: 30 });
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-accent/30 rounded-full"
          initial={{
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
          }}
          animate={{
            x: [
              Math.random() * 100 + '%',
              Math.random() * 100 + '%',
              Math.random() * 100 + '%',
            ],
            y: [
              Math.random() * 100 + '%',
              Math.random() * 100 + '%',
              Math.random() * 100 + '%',
            ],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

/* =========================
   🌟 Ambient Glow Orbs
========================= */
const AmbientOrbs = () => {
  return (
    <>
      <motion.div
        className="absolute top-20 left-20 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[150px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 left-40 w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-[150px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-cyan-500/15 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
    </>
  );
};

/* =========================
   👁️ Premium Eyes Animation
========================= */
const WatchingEyes = ({ passwordFocused }: { passwordFocused: boolean }) => {
  const eyeContainerRef = useRef<HTMLDivElement>(null);
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [blinkState, setBlinkState] = useState(false);

  // Smooth spring animation for eye movement
  const springConfig = { damping: 20, stiffness: 150 };
  const eyeX = useSpring(0, springConfig);
  const eyeY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (eyeContainerRef.current) {
        const rect = eyeContainerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate angle and distance from center
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const angle = Math.atan2(deltaY, deltaX);
        const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), 100);
        
        // Limit pupil movement to stay within the eye
        const maxMovement = 25;
        const moveX = Math.cos(angle) * (distance / 100) * maxMovement;
        const moveY = Math.sin(angle) * (distance / 100) * maxMovement;
        
        eyeX.set(moveX);
        eyeY.set(moveY);
      }
    };
    
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  // Random blinking
  useEffect(() => {
    const interval = setInterval(() => {
      if (!passwordFocused) {
        setBlinkState(true);
        setTimeout(() => setBlinkState(false), 150);
      }
    }, Math.random() * 4000 + 3000);
    return () => clearInterval(interval);
  }, [passwordFocused]);

  return (
    <div className="w-1/2 relative flex items-center justify-center px-12">
      <FloatingParticles />
      <AmbientOrbs />
      
      <div ref={eyeContainerRef} className="relative z-10 w-full max-w-[600px]">
        
        {/* Header Text */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 text-center"
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full px-6 py-3"
            animate={{
              boxShadow: [
                '0 0 20px rgba(16, 185, 129, 0.2)',
                '0 0 40px rgba(16, 185, 129, 0.3)',
                '0 0 20px rgba(16, 185, 129, 0.2)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Shield className="text-accent" size={20} />
            <span className="text-accent font-semibold text-sm tracking-wider uppercase">
              Secure Authentication Portal
            </span>
          </motion.div>
          
          <h1 className="font-playfair text-7xl font-bold mb-4 bg-gradient-to-r from-white via-accent/90 to-emerald-400 bg-clip-text text-transparent leading-tight">
            Identity
            <br />
            Verification
          </h1>
          
          <p className="text-text-muted text-lg max-w-md mx-auto leading-relaxed">
            Advanced biometric monitoring system.
            <br />
            <span className="text-accent/80">Your presence is being observed.</span>
          </p>
        </motion.div>

        {/* Eyes Container */}
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative w-full h-[280px] mb-12"
        >
          {/* Central Glow Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-accent/20 via-emerald-500/20 to-cyan-500/20 blur-[150px] rounded-full"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Scan Lines - Enhanced for Password Mode */}
          <motion.div
            className="absolute inset-0 overflow-hidden rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: passwordFocused ? [0.3, 0.5, 0.3] : [0, 0.2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className={`absolute w-full h-2 ${passwordFocused ? 'bg-gradient-to-r from-transparent via-red-500 to-transparent' : 'bg-gradient-to-r from-transparent via-accent to-transparent'}`}
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: passwordFocused ? 1.5 : 2, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>

          {/* Left Eye */}
          <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2 w-48 h-48"
            style={{
              perspective: '1000px',
            }}
          >
            {/* Outer Ring Glow */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/30 to-emerald-500/30 blur-xl"
              animate={{
                scale: passwordFocused ? [1, 1.3, 1] : [1, 1.15, 1],
                opacity: passwordFocused ? [0.6, 0.9, 0.6] : [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            {/* Eye Socket with 3D effect */}
            <motion.div
              className="absolute inset-0 rounded-full flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #1a1a1a, #000000 70%)',
                boxShadow: passwordFocused 
                  ? 'inset 0 0 60px rgba(0,0,0,0.95), inset 0 10px 30px rgba(220,38,38,0.3), 0 20px 60px rgba(220,38,38,0.4), 0 0 100px rgba(220,38,38,0.3)'
                  : 'inset 0 0 60px rgba(0,0,0,0.95), inset 0 10px 30px rgba(0,0,0,0.5), 0 20px 60px rgba(0,0,0,0.8), 0 0 80px rgba(16,185,129,0.2)',
              }}
              animate={{
                rotateX: passwordFocused ? [0, 2, 0] : 0,
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* Multiple Iris Detail Rings */}
              <motion.div
                className="absolute inset-6 rounded-full border border-accent/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-10 rounded-full border border-emerald-500/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              />

              {!passwordFocused && !blinkState ? (
                <>
                  {/* Pupil Background with 3D depth */}
                  <motion.div
                    style={{ x: eyeX, y: eyeY }}
                    className="relative w-20 h-20 rounded-full flex items-center justify-center"
                  >
                    {/* Multi-layered iris effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-200 via-gray-100 to-white shadow-[0_0_40px_rgba(255,255,255,0.6),inset_0_-5px_15px_rgba(0,0,0,0.3)]" />
                    
                    {/* Animated iris patterns */}
                    <motion.div
                      className="absolute inset-0 rounded-full opacity-80"
                      style={{
                        background: 'radial-gradient(circle at 40% 40%, rgba(16,185,129,0.4) 0%, rgba(16,185,129,0.2) 30%, transparent 70%)',
                      }}
                      animate={{ rotate: -360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.div
                      className="absolute inset-2 rounded-full opacity-60"
                      style={{
                        background: 'radial-gradient(circle at 60% 30%, rgba(6,182,212,0.3) 0%, transparent 60%)',
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    />
                    
                    {/* Iris texture lines */}
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent top-1/2"
                        style={{
                          transform: `rotate(${i * 30}deg)`,
                          transformOrigin: 'center',
                        }}
                      />
                    ))}
                    
                    {/* Pupil with depth */}
                    <motion.div
                      className="relative w-9 h-9 bg-black rounded-full overflow-hidden"
                      style={{
                        boxShadow: '0 0 20px rgba(0,0,0,0.8), inset 0 2px 8px rgba(0,0,0,0.9)',
                      }}
                      animate={{
                        scale: passwordFocused ? [1, 0.7, 1] : 1,
                      }}
                    >
                      {/* Pupil highlight */}
                      <div className="absolute top-1 left-1 w-2 h-2 bg-white/90 rounded-full blur-[0.5px]" />
                      <div className="absolute bottom-1 right-1 w-1 h-1 bg-white/40 rounded-full blur-[0.5px]" />
                    </motion.div>
                  </motion.div>
                  
                  {/* Enhanced light reflection */}
                  <motion.div
                    style={{ x: eyeX, y: eyeY }}
                    className="absolute top-5 left-5 w-5 h-5 bg-white/70 rounded-full blur-sm"
                  />
                  <motion.div
                    style={{ x: eyeX, y: eyeY }}
                    className="absolute top-6 left-6 w-3 h-3 bg-white/50 rounded-full blur-[2px]"
                  />
                </>
              ) : (
                // SIMPLE Closed Eye Animation (just a line)
                <motion.div
                  initial={{ scaleY: 1 }}
                  animate={{ scaleY: passwordFocused ? [1, 0.05, 1] : [1, 0.05, 1] }}
                  transition={{ duration: passwordFocused ? 0.5 : 0.15 }}
                  className="w-24 h-3 bg-gradient-to-r from-gray-300 via-white to-gray-300 rounded-full shadow-lg"
                />
              )}
            </motion.div>
          </motion.div>

          {/* Right Eye - Mirror of left eye */}
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48"
            style={{
              perspective: '1000px',
            }}
          >
            {/* Outer Ring Glow */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/30 to-accent/30 blur-xl"
              animate={{
                scale: passwordFocused ? [1.1, 1.3, 1.1] : [1.15, 1, 1.15],
                opacity: passwordFocused ? [0.6, 0.9, 0.6] : [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            />
            
            {/* Eye Socket with 3D effect */}
            <motion.div
              className="absolute inset-0 rounded-full flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle at 70% 30%, #1a1a1a, #000000 70%)',
                boxShadow: passwordFocused 
                  ? 'inset 0 0 60px rgba(0,0,0,0.95), inset 0 10px 30px rgba(220,38,38,0.3), 0 20px 60px rgba(220,38,38,0.4), 0 0 100px rgba(220,38,38,0.3)'
                  : 'inset 0 0 60px rgba(0,0,0,0.95), inset 0 10px 30px rgba(0,0,0,0.5), 0 20px 60px rgba(0,0,0,0.8), 0 0 80px rgba(16,185,129,0.2)',
              }}
              animate={{
                rotateX: passwordFocused ? [0, -2, 0] : 0,
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* Multiple Iris Detail Rings */}
              <motion.div
                className="absolute inset-6 rounded-full border border-accent/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-10 rounded-full border border-emerald-500/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              />

              {!passwordFocused && !blinkState ? (
                <>
                  <motion.div
                    style={{ x: eyeX, y: eyeY }}
                    className="relative w-20 h-20 rounded-full flex items-center justify-center"
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-200 via-gray-100 to-white shadow-[0_0_40px_rgba(255,255,255,0.6),inset_0_-5px_15px_rgba(0,0,0,0.3)]" />
                    
                    <motion.div
                      className="absolute inset-0 rounded-full opacity-80"
                      style={{
                        background: 'radial-gradient(circle at 60% 40%, rgba(16,185,129,0.4) 0%, rgba(16,185,129,0.2) 30%, transparent 70%)',
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.div
                      className="absolute inset-2 rounded-full opacity-60"
                      style={{
                        background: 'radial-gradient(circle at 40% 30%, rgba(6,182,212,0.3) 0%, transparent 60%)',
                      }}
                      animate={{ rotate: -360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    />
                    
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent top-1/2"
                        style={{
                          transform: `rotate(${i * 30}deg)`,
                          transformOrigin: 'center',
                        }}
                      />
                    ))}
                    
                    <motion.div
                      className="relative w-9 h-9 bg-black rounded-full overflow-hidden"
                      style={{
                        boxShadow: '0 0 20px rgba(0,0,0,0.8), inset 0 2px 8px rgba(0,0,0,0.9)',
                      }}
                      animate={{
                        scale: passwordFocused ? [1, 0.7, 1] : 1,
                      }}
                    >
                      <div className="absolute top-1 left-1 w-2 h-2 bg-white/90 rounded-full blur-[0.5px]" />
                      <div className="absolute bottom-1 right-1 w-1 h-1 bg-white/40 rounded-full blur-[0.5px]" />
                    </motion.div>
                  </motion.div>
                  
                  <motion.div
                    style={{ x: eyeX, y: eyeY }}
                    className="absolute top-5 right-5 w-5 h-5 bg-white/70 rounded-full blur-sm"
                  />
                  <motion.div
                    style={{ x: eyeX, y: eyeY }}
                    className="absolute top-6 right-6 w-3 h-3 bg-white/50 rounded-full blur-[2px]"
                  />
                </>
              ) : (
                // SIMPLE Closed Eye Animation (just a line)
                <motion.div
                  initial={{ scaleY: 1 }}
                  animate={{ scaleY: passwordFocused ? [1, 0.05, 1] : [1, 0.05, 1] }}
                  transition={{ duration: passwordFocused ? 0.5 : 0.15 }}
                  className="w-24 h-3 bg-gradient-to-r from-gray-300 via-white to-gray-300 rounded-full shadow-lg"
                />
              )}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Status Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex justify-center gap-6"
        >
          {[
            { icon: Eye, label: 'Tracking', color: 'accent' },
            { icon: Lock, label: 'Encrypted', color: 'emerald-400' },
            { icon: Zap, label: 'Active', color: 'cyan-400' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              className="flex items-center gap-2 bg-forest-800/30 backdrop-blur-sm border border-forest-divider/30 rounded-full px-4 py-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + i * 0.1 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                <item.icon className={`text-${item.color}`} size={16} />
              </motion.div>
              <span className="text-xs font-medium text-text-muted">
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

/* =========================
   🚪 Premium Login Form
========================= */
export const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (authError || !data.user) {
        throw authError ?? new Error('Authentication failed');
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profileError || !profile) {
        throw new Error('Profile not found');
      }

      switch (profile.role) {
        case 'student':
          navigate('/student');
          break;
        case 'teacher':
          navigate('/teacher');
          break;
        case 'researcher':
          navigate('/researcher');
          break;
        case 'mentor':
          navigate('/mentor');
          break;
        default:
          throw new Error('Invalid user role');
      }
    } catch (err: any) {
      setError(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-950 via-forest-900 to-forest-950 flex overflow-hidden relative">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Left Side – Eyes & Text */}
      <WatchingEyes passwordFocused={passwordFocused} />

      {/* Right Side – Login Form */}
      <div className="w-1/2 flex items-center justify-center px-12 z-10">
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-[520px]"
        >
          <div className="relative bg-gradient-to-br from-forest-800/60 via-forest-800/40 to-forest-900/60 backdrop-blur-2xl border border-accent/20 rounded-3xl p-12 shadow-[0_0_100px_rgba(16,185,129,0.15),0_20px_80px_rgba(0,0,0,0.6)]">
            
            {/* Decorative Corner Elements */}
            <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-accent/30 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-accent/30 rounded-br-3xl" />

            {/* Ambient Glow */}
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-accent/10 via-emerald-500/10 to-cyan-500/10 rounded-3xl blur-3xl -z-10"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Header */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="text-accent" size={32} />
                </motion.div>
                <h1 className="font-playfair text-5xl text-text-primary font-bold">
                  Welcome back
                </h1>
              </div>
              <p className="text-text-muted text-lg leading-relaxed">
                Your identity is being verified through our advanced
                <span className="text-accent font-semibold"> biometric monitoring system</span>.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Input
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              >
                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </motion.div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm font-medium bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3"
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(16, 185, 129, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full bg-gradient-to-r from-accent via-emerald-500 to-accent bg-[length:200%_100%] text-white font-bold text-lg rounded-xl px-8 py-5 shadow-[0_0_30px_rgba(16,185,129,0.3)] disabled:opacity-50 overflow-hidden group"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                
                <span className="relative flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      Access Portal
                      <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </motion.button>
            </form>

            {/* Footer */}
            <div className="mt-10 pt-8 border-t border-accent/20 flex justify-between items-center">
              <Link
                to="/signup"
                className="text-sm font-semibold text-text-muted hover:text-accent flex items-center gap-2 transition-colors group"
              >
                Create new account
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <DoorOpen size={22} className="text-accent/60" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};