import React from 'react';
import { LuChevronDown, LuChevronRight } from 'react-icons/lu';

interface CollapsibleSectionHeaderProps {
  title: string;
  icon: React.ReactNode;
  isVisible: boolean;
  onToggle: () => void;
  headerActions?: React.ReactNode;
}

export const CollapsibleSectionHeader: React.FC<CollapsibleSectionHeaderProps> = ({
  title,
  icon,
  isVisible,
  onToggle,
  headerActions,
}) => {
  return (
    <div className="sidebar-section-header collapsible-header">
      <button
        className="collapse-toggle"
        onClick={onToggle}
        title={isVisible ? `Hide ${title} ` : `Show ${title} `}
      >
        {isVisible ? <LuChevronDown size={14} /> : <LuChevronRight size={14} />}
        <span className="section-icon">{icon}</span>
        <h3>{title}</h3>
      </button>
      {isVisible && headerActions && <div className="sidebar-section-actions">{headerActions}</div>}
    </div>
  );
};
