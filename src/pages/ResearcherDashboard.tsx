import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { Network, BarChart2, Globe, AlertOctagon, FileText } from 'lucide-react';
import { cn } from '../lib/utils';

const Card = ({ children, className, title, subtitle }: { children: React.ReactNode, className?: string, title?: string, subtitle?: string }) => (
  <div className={cn("bg-forest-800 rounded-xl p-6 border border-forest-divider", className)}>
    {(title || subtitle) && (
      <div className="mb-6 flex justify-between items-start">
        <div>
          {title && <h3 className="font-serif text-lg text-text-primary">{title}</h3>}
          {subtitle && <p className="text-xs text-text-muted uppercase tracking-wider mt-1">{subtitle}</p>}
        </div>
        <div className="flex gap-1">
          <div className="w-1 h-1 rounded-full bg-forest-divider" />
          <div className="w-1 h-1 rounded-full bg-forest-divider" />
          <div className="w-1 h-1 rounded-full bg-forest-divider" />
        </div>
      </div>
    )}
    {children}
  </div>
);

export const ResearcherDashboard = () => {
  return (
    <DashboardLayout role="researcher">
      <div className="grid grid-cols-12 gap-6">
        
        {/* Header */}
        <div className="col-span-12 mb-4 flex justify-between items-end">
          <div>
            <h2 className="font-playfair text-3xl text-text-primary">Research Overview</h2>
            <p className="text-text-muted mt-2 font-sans">Global misinformation spread analysis.</p>
          </div>
          <div className="flex gap-3">
             <button className="px-4 py-2 bg-forest-700 text-xs text-text-primary border border-forest-divider rounded-sm hover:border-accent transition-colors">Export Report</button>
             <button className="px-4 py-2 bg-accent text-xs text-forest-900 font-medium rounded-sm hover:bg-accent-hover transition-colors">New Simulation</button>
          </div>
        </div>

        {/* Main Graph Area */}
        <div className="col-span-8">
          <Card title="Misinfo Spread Graph" subtitle="Real-time propagation network">
            <div className="h-64 bg-forest-900/50 rounded-lg border border-forest-divider relative overflow-hidden flex items-center justify-center">
               {/* Fake Graph Visualization */}
               <div className="absolute inset-0 opacity-20" 
                    style={{ backgroundImage: 'radial-gradient(#223029 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
               />
               
               {/* Nodes */}
               {[...Array(6)].map((_, i) => (
                 <motion.div
                   key={i}
                   className="absolute w-3 h-3 rounded-full bg-accent shadow-[0_0_10px_rgba(111,175,138,0.4)]"
                   initial={{ 
                     x: Math.random() * 400 - 200, 
                     y: Math.random() * 200 - 100 
                   }}
                   animate={{ 
                     x: Math.random() * 400 - 200, 
                     y: Math.random() * 200 - 100,
                     scale: [1, 1.2, 1]
                   }}
                   transition={{ 
                     duration: 10 + Math.random() * 10, 
                     repeat: Infinity, 
                     repeatType: "reverse" 
                   }}
                 />
               ))}
               
               {/* Connecting Lines (SVG) */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                 <motion.path 
                   d="M100,150 Q250,50 400,150 T700,150" 
                   fill="none" 
                   stroke="#6FAF8A" 
                   strokeWidth="1"
                   initial={{ pathLength: 0 }}
                   animate={{ pathLength: 1 }}
                   transition={{ duration: 2, ease: "easeInOut" }}
                 />
                 <motion.path 
                   d="M150,200 Q300,250 500,100" 
                   fill="none" 
                   stroke="#C8A24A" 
                   strokeWidth="1"
                   strokeDasharray="4 4"
                 />
               </svg>
            </div>
            
            <div className="flex gap-6 mt-6">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-accent" />
                 <span className="text-xs text-text-muted">Verified Sources</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-warning" />
                 <span className="text-xs text-text-muted">Flagged Nodes</span>
               </div>
            </div>
          </Card>
        </div>

        {/* Side Stats */}
        <div className="col-span-4 space-y-6">
          <Card title="Ethical Risk Radar" subtitle="Current threat level">
             <div className="h-40 flex items-center justify-center relative">
                {/* Radar Circles */}
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-32 h-32 rounded-full border border-forest-divider opacity-50" />
                   <div className="w-20 h-20 rounded-full border border-forest-divider opacity-50 absolute" />
                   <div className="w-8 h-8 rounded-full bg-warning/20 absolute animate-pulse" />
                </div>
                {/* Radar Scan */}
                <motion.div 
                  className="w-32 h-32 rounded-full border-r border-warning/50 absolute"
                  style={{ background: 'conic-gradient(from 0deg, transparent 0deg, rgba(200, 162, 74, 0.1) 360deg)' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
             </div>
             <div className="text-center mt-2">
               <span className="text-warning font-serif text-xl">High Risk</span>
               <p className="text-[10px] text-text-muted">Sector 4: Deepfake Audio</p>
             </div>
          </Card>

          <Card className="bg-forest-700/30">
            <div className="flex items-start gap-4">
               <div className="p-3 bg-forest-800 rounded-lg border border-forest-divider text-accent">
                 <FileText size={20} />
               </div>
               <div>
                 <h4 className="text-sm font-medium text-text-primary">Paper Summary Gen</h4>
                 <p className="text-xs text-text-muted mt-1 mb-3">Processing "Social Media Algorithms & Youth"...</p>
                 <div className="h-1 w-full bg-forest-800 rounded-full overflow-hidden">
                   <motion.div 
                     className="h-full bg-accent"
                     initial={{ width: "0%" }}
                     animate={{ width: "60%" }}
                     transition={{ duration: 2 }}
                   />
                 </div>
               </div>
            </div>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="col-span-4">
           <Card title="Impact Simulation" subtitle="Adjust variables">
              <div className="space-y-6 pt-2">
                 {['Virality Factor', 'Platform Moderation', 'User Education'].map((label, i) => (
                   <div key={i}>
                     <div className="flex justify-between mb-2">
                       <span className="text-[10px] text-text-muted uppercase">{label}</span>
                     </div>
                     <input 
                       type="range" 
                       className="w-full h-1 bg-forest-divider rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent"
                     />
                   </div>
                 ))}
              </div>
           </Card>
        </div>

        <div className="col-span-8">
           <Card title="Consensus vs Conflict" subtitle="Academic discourse map">
              <div className="grid grid-cols-3 gap-4">
                 {[
                   { topic: 'AI Regulation', status: 'Conflict', color: 'text-warning' },
                   { topic: 'Fact-Check Efficacy', status: 'Consensus', color: 'text-accent' },
                   { topic: 'Echo Chamber Dynamics', status: 'Emerging', color: 'text-text-muted' },
                 ].map((item, i) => (
                   <div key={i} className="p-4 bg-forest-900/50 border border-forest-divider rounded-lg">
                      <h4 className="text-sm text-text-primary font-serif mb-2">{item.topic}</h4>
                      <div className="flex items-center gap-2">
                        <div className={cn("w-1.5 h-1.5 rounded-full", item.color.replace('text-', 'bg-'))} />
                        <span className={cn("text-xs font-medium", item.color)}>{item.status}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </Card>
        </div>

      </div>
    </DashboardLayout>
  );
};
