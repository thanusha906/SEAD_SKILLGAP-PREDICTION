
import React from 'react';
import { cn } from '@/lib/utils';
import AnimatedTransition from './AnimatedTransition';
import { XCircle, PlusCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SkillCardProps {
  skill: {
    id: string;
    name: string;
    category?: string;
  };
  isSelected?: boolean;
  percentage?: number;
  onToggle?: () => void;
  onRemove?: () => void;
  className?: string;
  showPercentage?: boolean;
  interactive?: boolean;
}

const SkillCard: React.FC<SkillCardProps> = ({
  skill,
  isSelected = false,
  percentage,
  onToggle,
  onRemove,
  className,
  showPercentage = false,
  interactive = true,
}) => {
  return (
    <AnimatedTransition animation="scale" className="h-full">
      <div 
        className={cn(
          "relative h-full rounded-lg border p-4 transition-all duration-300",
          isSelected 
            ? "border-primary/50 bg-primary/5" 
            : "border-border bg-card hover:border-primary/30",
          interactive && !isSelected && "cursor-pointer",
          className
        )}
        onClick={() => interactive && onToggle && !isSelected && onToggle()}
      >
        <div className="flex justify-between items-start">
          <div className="space-y-1.5">
            <h3 className="font-medium text-sm">{skill.name}</h3>
            {skill.category && (
              <p className="text-xs text-muted-foreground">{skill.category}</p>
            )}
          </div>
          
          {interactive && (
            isSelected ? (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 text-primary hover:text-primary/80 -mr-1 -mt-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove && onRemove();
                }}
              >
                <XCircle size={18} />
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 text-muted-foreground hover:text-primary -mr-1 -mt-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle && onToggle();
                }}
              >
                <PlusCircle size={18} />
              </Button>
            )
          )}
          
          {!interactive && isSelected && (
            <CheckCircle size={18} className="text-primary" />
          )}
        </div>
        
        {showPercentage && typeof percentage === 'number' && (
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Proficiency</span>
              <span className="font-medium">{percentage}%</span>
            </div>
            <div className="skill-progress-bar">
              <div 
                className="skill-progress-fill animate-progress-fill" 
                style={{ 
                  width: `${percentage}%`,
                  '--progress-width': `${percentage}%`
                } as React.CSSProperties} 
              />
            </div>
          </div>
        )}
      </div>
    </AnimatedTransition>
  );
};

export default SkillCard;
