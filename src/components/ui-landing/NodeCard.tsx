'use client'

import React, { useState, useRef } from 'react';

export interface NodeItem {
  id: string;
  pubkey: string;
  name: string;
  status: 'online' | 'offline' | 'delinquent';
  tag: {
    color: string;
    label: string;
  };
  lastUpdate: string;
  metrics: {
    uptime: number;
    stake: number;
  };
}

interface NodeCardProps {
  node: NodeItem;
  onDragStart: (e: React.DragEvent, node: NodeItem) => void;
  onDragEnd: () => void;
  onStatusChange: (nodeId: string, newStatus: string) => void;
}

const NodeCard: React.FC<NodeCardProps> = ({ node, onDragStart, onDragEnd, onStatusChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    
    // Add ghost image effect
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const ghostImage = cardRef.current.cloneNode(true) as HTMLDivElement;
      ghostImage.style.position = 'absolute';
      ghostImage.style.top = '-1000px';
      ghostImage.style.opacity = '0.8';
      document.body.appendChild(ghostImage);
      e.dataTransfer.setDragImage(ghostImage, rect.width / 2, rect.height / 2);
      
      // Clean up the ghost element after drag
      setTimeout(() => {
        document.body.removeChild(ghostImage);
      }, 0);
    }
    
    onDragStart(e, node);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    onDragEnd();
  };
  
  // Get status indicator color
  const getStatusColor = () => {
    switch (node.status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'delinquent': return 'bg-yellow-500';
      default: return 'bg-muted';
    }
  };

  // Format stake amount
  const formatStake = (stake: number) => {
    if (stake >= 1000) {
      return `${(stake / 1000).toFixed(0)}K`;
    }
    return stake.toString();
  };

  return (
    <div
      ref={cardRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`task-card p-4 bg-card rounded-md border border-border shadow-sm hover:shadow-md transition-all duration-200 h-40 flex flex-col ${isDragging ? 'dragging' : ''}`}
    >
      {/* Header with status and last update */}
      <div className="flex justify-between items-start mb-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${getStatusColor()}`}></div>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted/50 text-muted-foreground border border-border">
            {node.tag.label}
          </span>
        </div>
        <span className="text-muted-foreground text-xs">{node.lastUpdate}</span>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Name and pubkey */}
        <div className="flex-1 mb-3">
          <h5 className="font-medium mb-1 text-foreground text-sm leading-tight line-clamp-1">{node.name}</h5>
          <p className="text-xs text-muted-foreground font-mono">{node.pubkey}</p>
        </div>
        
        {/* Footer with metrics */}
        <div className="flex justify-between items-center flex-shrink-0 mt-auto">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground">
                <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="text-xs text-muted-foreground">{formatStake(node.metrics.stake)}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <div className={`h-1.5 w-16 rounded-full bg-muted overflow-hidden`}>
              <div 
                className={`h-full rounded-full ${node.metrics.uptime >= 95 ? 'bg-green-500' : node.metrics.uptime >= 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                style={{ width: `${node.metrics.uptime}%` }}
              ></div>
            </div>
            <span className="text-xs text-muted-foreground">{node.metrics.uptime}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodeCard;

