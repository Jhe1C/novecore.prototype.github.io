interface IconProps {
  className?: string;
}

export function IntelligentSimplicityIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Brain outline */}
        <path
          d="M12 6C8.5 6 6 8.5 6 12C6 13.5 6.5 14.8 7.3 15.8C7.1 16.5 7 17.2 7 18C7 21.3 9.7 24 13 24H19C22.3 24 25 21.3 25 18C25 17.2 24.9 16.5 24.7 15.8C25.5 14.8 26 13.5 26 12C26 8.5 23.5 6 20 6C18.5 6 17.2 6.6 16 7.5C14.8 6.6 13.5 6 12 6Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        {/* Brain details */}
        <path
          d="M12 12C12 14 14 16 16 16C18 16 20 14 20 12"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="13" cy="14" r="1" fill="currentColor" />
        <circle cx="19" cy="14" r="1" fill="currentColor" />
        
        {/* Gear overlay */}
        <g transform="translate(20, 20)">
          <circle cx="6" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle cx="6" cy="6" r="1.5" fill="currentColor" />
          <path d="M6 0v2M6 10v2M0 6h2M10 6h2M2.1 2.1l1.4 1.4M8.5 8.5l1.4 1.4M2.1 9.9l1.4-1.4M8.5 3.5l1.4-1.4" 
                stroke="currentColor" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

export function AdaptiveWorkflowsIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Interconnected blocks */}
        <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
        <rect x="13" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
        <rect x="23" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
        
        <rect x="3" y="13" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
        <rect x="13" y="13" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
        <rect x="23" y="13" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
        
        <rect x="8" y="23" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
        <rect x="18" y="23" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
        
        {/* Connection lines */}
        <path d="M9 6h4M19 6h4M6 9v4M16 9v4M26 9v4M6 19v4M16 19v4M14 26h4" 
              stroke="currentColor" strokeWidth="1.5" />
        
        {/* Flow indicators */}
        <circle cx="6" cy="6" r="1.5" fill="currentColor" />
        <circle cx="16" cy="16" r="1.5" fill="currentColor" />
        <circle cx="21" cy="26" r="1.5" fill="currentColor" />
      </svg>
    </div>
  );
}

export function SeamlessFusionIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Central hub */}
        <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="16" cy="16" r="2" fill="currentColor" />
        
        {/* Converging arrows */}
        <g>
          {/* Top arrow */}
          <path d="M16 8v4M14 10l2-2 2 2" stroke="currentColor" strokeWidth="1.5" fill="none" />
          
          {/* Right arrow */}
          <path d="M24 16h-4M22 14l2 2-2 2" stroke="currentColor" strokeWidth="1.5" fill="none" />
          
          {/* Bottom arrow */}
          <path d="M16 24v-4M18 22l-2 2-2-2" stroke="currentColor" strokeWidth="1.5" fill="none" />
          
          {/* Left arrow */}
          <path d="M8 16h4M10 18l-2-2 2-2" stroke="currentColor" strokeWidth="1.5" fill="none" />
          
          {/* Diagonal arrows */}
          <path d="M22.6 9.4l-2.8 2.8M21.2 8l2 2-2 2" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M22.6 22.6l-2.8-2.8M24 21.2l-2 2-2-2" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M9.4 22.6l2.8-2.8M8 24l2-2 2 2" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M9.4 9.4l2.8 2.8M10.8 8l-2 2 2 2" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </g>
      </svg>
    </div>
  );
}

export function InsightfulCollaborationIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Chart bars */}
        <rect x="4" y="16" width="3" height="8" rx="0.5" fill="currentColor" />
        <rect x="8" y="12" width="3" height="12" rx="0.5" fill="currentColor" />
        <rect x="12" y="8" width="3" height="16" rx="0.5" fill="currentColor" />
        <rect x="16" y="14" width="3" height="10" rx="0.5" fill="currentColor" />
        
        {/* Chart trend line */}
        <path d="M5.5 18L9.5 14L13.5 10L17.5 16" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="5.5" cy="18" r="1.5" fill="currentColor" />
        <circle cx="9.5" cy="14" r="1.5" fill="currentColor" />
        <circle cx="13.5" cy="10" r="1.5" fill="currentColor" />
        <circle cx="17.5" cy="16" r="1.5" fill="currentColor" />
        
        {/* Speech bubble */}
        <path d="M22 6h6c1 0 2 1 2 2v6c0 1-1 2-2 2h-1l-2 3-2-3h-1c-1 0-2-1-2-2V8c0-1 1-2 2-2z" 
              stroke="currentColor" strokeWidth="1.5" fill="none" />
        
        {/* Speech bubble content */}
        <circle cx="24.5" cy="10" r="0.5" fill="currentColor" />
        <circle cx="26" cy="10" r="0.5" fill="currentColor" />
        <circle cx="27.5" cy="10" r="0.5" fill="currentColor" />
        
        <path d="M24 12h4M24 13.5h3" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  );
}