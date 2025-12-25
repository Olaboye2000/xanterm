'use client'

import React, { useState } from 'react';
import NodeCard, { NodeItem } from './NodeCard';

export interface Column {
  id: string;
  title: string;
  color: string;
  nodes: NodeItem[];
}

interface NodeColumnProps {
  column: Column;
  onDrop: (e: React.DragEvent, columnId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onNodeDragStart: (e: React.DragEvent, node: NodeItem) => void;
  onNodeDragEnd: () => void;
  onStatusChange: (nodeId: string, newStatus: string) => void;
}

const NodeColumn: React.FC<NodeColumnProps> = ({
  column,
  onDrop,
  onDragOver,
  onDragLeave,
  onNodeDragStart,
  onNodeDragEnd,
  onStatusChange
}) => {
  const [isOver, setIsOver] = useState(false);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(true);
    onDragOver(e);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    setIsOver(false);
    onDragLeave(e);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    setIsOver(false);
    onDrop(e, column.id);
  };

  // Get column header indicator color
  const getColumnColor = () => {
    switch (column.color) {
      case 'green': return 'bg-green-500';
      case 'yellow': return 'bg-yellow-500';
      case 'red': return 'bg-red-500';
      case 'purple': return 'bg-purple-500';
      default: return 'bg-muted';
    }
  };

  return (
    <div 
      className={`flex flex-col w-72 min-w-72 rounded-lg border border-border backdrop-blur-sm transition-all duration-300 ${
        isOver ? 'column-highlight border-muted/50' : 'bg-card/50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="p-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${getColumnColor()}`}></span>
          <h4 className="font-medium text-sm text-foreground">{column.title}</h4>
          <span className="text-xs bg-muted/50 px-2 py-0.5 rounded-full text-muted-foreground">
            {column.nodes.length}
          </span>
        </div>
        <div className="text-muted-foreground">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12V12.01M8 12V12.01M16 12V12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      <div className="p-2 flex-1 space-y-2 overflow-auto">
        {column.nodes.map((node) => (
          <NodeCard
            key={node.id}
            node={node}
            onDragStart={onNodeDragStart}
            onDragEnd={onNodeDragEnd}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
    </div>
  );
};

export default NodeColumn;

