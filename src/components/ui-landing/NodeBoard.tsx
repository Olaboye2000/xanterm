'use client'

import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import NodeColumn, { Column } from './NodeColumn';
import { NodeItem } from './NodeCard';

// Initial data for the pNode activity board
const initialColumns: Column[] = [
  {
    id: 'online',
    title: 'Online',
    color: 'green',
    nodes: [
      {
        id: 'n1',
        pubkey: '7xKX...3mPQ',
        name: 'Validator Alpha',
        status: 'online',
        tag: { color: 'green', label: 'Healthy' },
        lastUpdate: 'Just now',
        metrics: { uptime: 99.9, stake: 50000 }
      },
      {
        id: 'n2',
        pubkey: '4vBN...8kLM',
        name: 'Storage Node 01',
        status: 'online',
        tag: { color: 'green', label: 'Synced' },
        lastUpdate: '2s ago',
        metrics: { uptime: 99.7, stake: 35000 }
      },
      {
        id: 'n3',
        pubkey: '9qRT...2wYZ',
        name: 'Mainnet Validator',
        status: 'online',
        tag: { color: 'green', label: 'Active' },
        lastUpdate: '5s ago',
        metrics: { uptime: 99.5, stake: 75000 }
      },
      {
        id: 'n4',
        pubkey: '2mFG...7hJK',
        name: 'Devnet Node 03',
        status: 'online',
        tag: { color: 'blue', label: 'Testing' },
        lastUpdate: '10s ago',
        metrics: { uptime: 98.2, stake: 10000 }
      }
    ]
  },
  {
    id: 'delinquent',
    title: 'Delinquent',
    color: 'yellow',
    nodes: [
      {
        id: 'n5',
        pubkey: '5pLC...9nBX',
        name: 'Backup Validator',
        status: 'delinquent',
        tag: { color: 'yellow', label: 'Behind' },
        lastUpdate: '2 min ago',
        metrics: { uptime: 87.3, stake: 25000 }
      },
      {
        id: 'n6',
        pubkey: '8wMD...4qRS',
        name: 'Secondary Node',
        status: 'delinquent',
        tag: { color: 'yellow', label: 'Syncing' },
        lastUpdate: '5 min ago',
        metrics: { uptime: 82.1, stake: 15000 }
      },
      {
        id: 'n7',
        pubkey: '1aEF...6cTU',
        name: 'Test Validator',
        status: 'delinquent',
        tag: { color: 'orange', label: 'Warning' },
        lastUpdate: '8 min ago',
        metrics: { uptime: 78.5, stake: 5000 }
      }
    ]
  },
  {
    id: 'offline',
    title: 'Offline',
    color: 'red',
    nodes: [
      {
        id: 'n8',
        pubkey: '3bGH...5dVW',
        name: 'Legacy Node',
        status: 'offline',
        tag: { color: 'red', label: 'Down' },
        lastUpdate: '1 hour ago',
        metrics: { uptime: 45.2, stake: 20000 }
      },
      {
        id: 'n9',
        pubkey: '6cIJ...8eXY',
        name: 'Maintenance Node',
        status: 'offline',
        tag: { color: 'gray', label: 'Scheduled' },
        lastUpdate: '3 hours ago',
        metrics: { uptime: 0, stake: 30000 }
      }
    ]
  },
  {
    id: 'watchlist',
    title: 'Watchlist',
    color: 'purple',
    nodes: [
      {
        id: 'n10',
        pubkey: '0dKL...1fZA',
        name: 'Priority Validator',
        status: 'online',
        tag: { color: 'purple', label: 'Watching' },
        lastUpdate: 'Just now',
        metrics: { uptime: 99.8, stake: 100000 }
      },
      {
        id: 'n11',
        pubkey: '2eMN...3gBC',
        name: 'High Stake Node',
        status: 'online',
        tag: { color: 'purple', label: 'Important' },
        lastUpdate: '1s ago',
        metrics: { uptime: 99.6, stake: 150000 }
      },
      {
        id: 'n12',
        pubkey: '4fOP...5hDE',
        name: 'Team Validator',
        status: 'online',
        tag: { color: 'blue', label: 'Team' },
        lastUpdate: '3s ago',
        metrics: { uptime: 99.4, stake: 80000 }
      }
    ]
  }
];

interface NodeBoardProps {
  className?: string;
}

const NodeBoard: React.FC<NodeBoardProps> = ({ className }) => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [draggedNode, setDraggedNode] = useState<NodeItem | null>(null);
  const [dragSourceColumn, setDragSourceColumn] = useState<string | null>(null);
  const { toast } = useToast();

  const handleNodeDragStart = (e: React.DragEvent, node: NodeItem) => {
    e.dataTransfer.setData('nodeId', node.id);
    setDraggedNode(node);
    
    // Find source column
    const sourceColumn = columns.find(col => 
      col.nodes.some(n => n.id === node.id)
    );
    
    if (sourceColumn) {
      setDragSourceColumn(sourceColumn.id);
      e.dataTransfer.setData('sourceColumnId', sourceColumn.id);
    }
  };

  const handleNodeDragEnd = () => {
    setDraggedNode(null);
    setDragSourceColumn(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Handle drag leave logic if needed
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    
    const nodeId = e.dataTransfer.getData('nodeId');
    const sourceColumnId = e.dataTransfer.getData('sourceColumnId');
    
    if (!nodeId || !sourceColumnId || sourceColumnId === targetColumnId) {
      return;
    }
    
    // Update columns state
    const newColumns = columns.map(column => {
      // Remove node from source column
      if (column.id === sourceColumnId) {
        return {
          ...column,
          nodes: column.nodes.filter(node => node.id !== nodeId)
        };
      }
      
      // Add node to target column
      if (column.id === targetColumnId) {
        const nodeToMove = columns.find(col => col.id === sourceColumnId)?.nodes.find(node => node.id === nodeId);
        if (nodeToMove) {
          return {
            ...column,
            nodes: [...column.nodes, nodeToMove]
          };
        }
      }
      
      return column;
    });
    
    setColumns(newColumns);
    
    // Show a toast notification
    const targetColumn = columns.find(col => col.id === targetColumnId);
    if (targetColumn && draggedNode) {
      toast({
        title: "Node moved",
        description: `${draggedNode.name} moved to ${targetColumn.title}`,
      });
    }
  };

  const handleStatusChange = (nodeId: string, newStatus: string) => {
    // This function can be used for programmatic status changes
  };

  return (
    <div className={`flex gap-4 overflow-x-auto pb-4 ${className}`}>
      {columns.map(column => (
        <NodeColumn
          key={column.id}
          column={column}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onNodeDragStart={handleNodeDragStart}
          onNodeDragEnd={handleNodeDragEnd}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
};

export default NodeBoard;

