import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { Book, Video, Image as ImageIcon, FileText, Clock, AlertTriangle, CheckCircle, Upload } from 'lucide-react';
import { cn } from '../../lib/utils';

const Card = ({ children, className, title, subtitle }: { children: React.ReactNode, className?: string, title?: string, subtitle?: string }) => (
  <div className={cn("bg-forest-800 rounded-xl p-6 border border-forest-divider", className)}>
    {(title || subtitle) && (
      <div className="mb-6">
        {title && <h3 className="font-serif text-lg text-text-primary">{title}</h3>}
        {subtitle && <p className="text-xs text-text-muted uppercase tracking-wider mt-1">{subtitle}</p>}
      </div>
    )}
    {children}
  </div>
);

const ProgressBar = ({ value, label, color = "bg-accent" }: { value: number, label: string, color?: string }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-2">
      <span className="text-xs text-text-muted uppercase tracking-wider">{label}</span>
      <span className="text-xs text-text-primary font-mono">{value}%</span>
    </div>
    <div className="h-1 bg-forest-700 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={cn("h-full", color)}
      />
    </div>
  </div>
);

export const StudentDashboard = () => {
  return (
    <DashboardLayout role="student">
      <div className="grid grid-cols-12 gap-6">
        
        {/* Header Section */}
        <div className="col-span-12 mb-4">
          <h2 className="font-playfair text-3xl text-text-primary">Knowledge Vault</h2>
          <p className="text-text-muted mt-2 font-sans">Track your verification impact and learning progress.</p>
        </div>

        {/* Stats / Meters */}
        <div className="col-span-8 grid grid-cols-2 gap-6">
           <Card title="Bias Exposure Meter" subtitle="Analysis of recent consumption">
             <div className="flex items-end gap-2 h-32 mb-4 px-2">
                {[40, 65, 30, 85, 50, 60, 45].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: i * 0.1 }}
                    className={cn(
                      "flex-1 rounded-t-sm opacity-80",
                      h > 70 ? "bg-warning" : "bg-accent"
                    )}
                  />
                ))}
             </div>
             <p className="text-xs text-text-muted text-center border-t border-forest-divider pt-3">
               Moderate exposure to confirmed bias detected this week.
             </p>
           </Card>

           <Card title="Ethics Engagement" subtitle="Community Score">
              <div className="relative h-32 flex items-center justify-center">
                 <svg className="w-32 h-32 transform -rotate-90">
                   <circle cx="64" cy="64" r="56" stroke="#1B261F" strokeWidth="8" fill="transparent" />
                   <motion.circle 
                      cx="64" cy="64" r="56" 
                      stroke="#6FAF8A" strokeWidth="8" 
                      fill="transparent"
                      strokeDasharray="351.8"
                      initial={{ strokeDashoffset: 351.8 }}
                      animate={{ strokeDashoffset: 351.8 - (351.8 * 0.78) }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                   />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <span className="text-2xl font-serif text-text-primary">78</span>
                   <span className="text-[10px] text-text-muted uppercase">Score</span>
                 </div>
              </div>
           </Card>
        </div>

        {/* Upload / Lab */}
        <div className="col-span-4 row-span-2">
          <Card title="Misinformation Lab" subtitle="Submit content for analysis" className="h-full">
            <div className="space-y-4">
              {[
                { icon: Video, label: 'Analyze Video Source' },
                { icon: ImageIcon, label: 'Verify Image Context' },
                { icon: FileText, label: 'Check Document Text' }
              ].map((item, i) => (
                <button key={i} className="w-full p-4 bg-forest-700/50 border border-forest-divider rounded-lg flex items-center gap-4 hover:bg-forest-700 hover:border-accent transition-all group">
                  <div className="w-10 h-10 rounded-full bg-forest-800 flex items-center justify-center text-text-muted group-hover:text-accent group-hover:scale-110 transition-all">
                    <item.icon size={18} />
                  </div>
                  <span className="text-sm text-text-primary font-medium">{item.label}</span>
                  <Upload size={14} className="ml-auto text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-forest-divider">
              <h4 className="text-xs text-text-muted uppercase tracking-wider mb-4">Pipeline Status</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-xs text-text-primary">Processing: "Deepfake_Senator_Clip.mp4"</span>
                </div>
                <div className="flex items-center gap-3 opacity-50">
                  <div className="w-2 h-2 rounded-full bg-forest-divider" />
                  <span className="text-xs text-text-muted">Queue Empty</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Timeline / History */}
        <div className="col-span-8">
           <Card title="Submission History" subtitle="Recent activity timeline">
             <div className="space-y-6">
               {[
                 { title: 'Climate Data Report 2024', status: 'Verified', date: '2 hrs ago', type: 'PDF' },
                 { title: 'Viral Mars Landing Image', status: 'Debunked', date: 'Yesterday', type: 'Image' },
                 { title: 'Economic Policy Speech', status: 'Pending', date: '2 days ago', type: 'Video' },
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-4 group">
                   <div className="flex flex-col items-center gap-1">
                      <div className={cn("w-2 h-2 rounded-full", 
                        item.status === 'Verified' ? "bg-accent" : 
                        item.status === 'Debunked' ? "bg-warning" : "bg-text-muted"
                      )} />
                      <div className="w-[1px] h-8 bg-forest-divider group-last:hidden" />
                   </div>
                   <div className="flex-1 pb-4">
                     <div className="flex justify-between items-start">
                       <h4 className="text-sm font-medium text-text-primary">{item.title}</h4>
                       <span className="text-[10px] text-text-muted font-mono">{item.date}</span>
                     </div>
                     <div className="flex items-center gap-2 mt-1">
                       <span className={cn("text-[10px] px-2 py-0.5 rounded-full border",
                          item.status === 'Verified' ? "border-accent/30 text-accent bg-accent/5" :
                          item.status === 'Debunked' ? "border-warning/30 text-warning bg-warning/5" :
                          "border-text-muted/30 text-text-muted"
                       )}>{item.status}</span>
                       <span className="text-[10px] text-text-muted uppercase">{item.type}</span>
                     </div>
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
