'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatBytes, formatRelativeTime, truncatePublicKey, formatPercentage } from '@/lib/format';
import { Bell, BellOff } from 'lucide-react';
import { addToWatchlist, removeFromWatchlist, getWatchlist } from '@/lib/watchlist';
import Link from 'next/link';
import type { PNode } from '@/types/pnode';

function getStatusBadgeVariant(status: string): 'destructive' | 'secondary' | 'outline' {
    switch (status) {
        case 'online':
            return 'secondary';
        case 'offline':
            return 'destructive';
        case 'delinquent':
            return 'outline';
        default:
            return 'outline';
    }
}

function getStatusBadgeClassName(status: string): string {
    switch (status) {
        case 'online':
            return 'bg-green-500/10 text-green-600 border-green-500/30 dark:bg-green-500/20 dark:text-green-400';
        case 'offline':
            return '';
        default:
            return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30 dark:bg-yellow-500/20 dark:text-yellow-400';
    }
}

function getPerformanceBadgeVariant(score: number): 'destructive' | 'secondary' | 'outline' {
    if (score >= 80) return 'secondary';
    if (score >= 60) return 'outline';
    return 'destructive';
}

function getPerformanceBadgeClassName(score: number): string {
    if (score >= 80) return 'bg-green-500/10 text-green-600 border-green-500/30 dark:bg-green-500/20 dark:text-green-400';
    if (score >= 60) return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30 dark:bg-yellow-500/20 dark:text-yellow-400';
    return '';
}

interface PNodeTableProps {
    pnodes: PNode[];
    isLoading?: boolean;
}

export function PNodeTable({ pnodes, isLoading }: PNodeTableProps) {
    const [watchedIds, setWatchedIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        const watchlist = getWatchlist();
        setWatchedIds(new Set(watchlist.map(w => w.pnodeId)));
    }, []);

    const handleToggleWatchlist = (pnodeId: string) => {
        if (watchedIds.has(pnodeId)) {
            removeFromWatchlist(pnodeId);
            setWatchedIds(prev => {
                const next = new Set(prev);
                next.delete(pnodeId);
                return next;
            });
        } else {
            addToWatchlist(pnodeId);
            setWatchedIds(prev => new Set(prev).add(pnodeId));
        }
    };

    if (isLoading) {
        return (
            <div className="border rounded-lg">
                <div className="p-4">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-4 py-3">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-16" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!pnodes || pnodes.length === 0) {
        return (
            <div className="border rounded-lg p-6 text-center">
                <p className="text-muted-foreground">No pNodes found</p>
            </div>
        );
    }

    return (
        <div className="border rounded-lg overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-12">Watch</TableHead>
                        <TableHead>pNode ID</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Storage Capacity</TableHead>
                        <TableHead>Utilization</TableHead>
                        <TableHead>Performance</TableHead>
                        <TableHead>Uptime</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Last Seen</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {pnodes.map((pnode: PNode) => (
                        <TableRow key={pnode.id} className="hover:bg-accent/50">
                            <TableCell>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => handleToggleWatchlist(pnode.id)}
                                    title={watchedIds.has(pnode.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
                                >
                                    {watchedIds.has(pnode.id) ? (
                                        <Bell className="h-4 w-4 fill-primary text-primary" />
                                    ) : (
                                        <BellOff className="h-4 w-4 text-muted-foreground hover:text-primary" />
                                    )}
                                </Button>
                            </TableCell>
                            <TableCell className="font-mono text-sm">
                                <Link href={`/pnodes/${pnode.id}`} className="hover:underline">
                                    {truncatePublicKey(pnode.id, 6, 6)}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Badge variant={getStatusBadgeVariant(pnode.status)} className={getStatusBadgeClassName(pnode.status)}>
                                    {pnode.status}
                                </Badge>
                            </TableCell>
                            <TableCell>{formatBytes(pnode.storage.capacityBytes)}</TableCell>
                            <TableCell>{formatPercentage(pnode.storage.utilization)}</TableCell>
                            <TableCell>
                                <div className="flex items-center space-x-2">
                                    <span>{pnode.performanceScore}/100</span>
                                    <Badge variant={getPerformanceBadgeVariant(pnode.performanceScore)} className={getPerformanceBadgeClassName(pnode.performanceScore)}>
                                        {pnode.performanceScore >= 80
                                            ? 'High'
                                            : pnode.performanceScore >= 60
                                                ? 'Med'
                                                : 'Low'}
                                    </Badge>
                                </div>
                            </TableCell>
                            <TableCell>{formatPercentage(pnode.performance.uptime)}</TableCell>
                            <TableCell>{pnode.location || 'Unknown'}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                                {formatRelativeTime(pnode.lastSeen)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
