import { PrismaClient } from '@prisma/client';

// Global declaration for Prisma singleton in development
// eslint-disable-next-line @typescript-eslint/no-namespace
declare global {
    // Using var for global declaration per Prisma best practices
    var prisma: PrismaClient | undefined;
}

/**
 * Check if database is configured
 */
export const isDatabaseConfigured = (): boolean => {
    return !!process.env.DATABASE_URL;
};

/**
 * Prisma Client singleton for database operations
 * Returns null if DATABASE_URL is not configured
 * In development, we attach it to global to prevent too many connections
 * due to hot reloading
 */
function createPrismaClient(): PrismaClient | null {
    if (!isDatabaseConfigured()) {
        return null;
    }

    return new PrismaClient({
        log: process.env.NODE_ENV === 'development'
            ? ['query', 'error', 'warn']
            : ['error'],
    });
}

export const prisma: PrismaClient | null =
    global.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production' && prisma) {
    global.prisma = prisma;
}

export default prisma;
