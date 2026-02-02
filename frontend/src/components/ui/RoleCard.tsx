import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { LucideIcon } from 'lucide-react';

interface RoleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  selected: boolean;
  onClick: () => void;
}

export const RoleCard: React.FC<RoleCardProps> = ({ title, description, icon: Icon, selected, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className={cn(
        "cursor-pointer p-4 rounded-xl border transition-all duration-300 ease-institutional flex-1",
        selected 
          ? "bg-forest-700 border-accent shadow-[0_0_15px_rgba(111,175,138,0.1)]" 
          : "bg-forest-800 border-forest-divider hover:bg-forest-700"
      )}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex flex-col h-full justify-between">
        <div className={cn("mb-3", selected ? "text-accent" : "text-text-muted")}>
          <Icon size={24} strokeWidth={1.5} />
        </div>
        <div>
          <h3 className={cn("font-serif text-lg mb-1", selected ? "text-text-primary" : "text-text-muted")}>
            {title}
          </h3>
          <p className="text-xs text-text-muted leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
