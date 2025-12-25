export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        // Check if database is configured before starting the indexer
        if (!process.env.DATABASE_URL) {
            console.log('[Instrumentation] DATABASE_URL not configured - indexer disabled (this is OK for basic functionality)');
            return;
        }

        // We only want to start the indexer in the Node.js runtime, not Edge
        const { indexerService } = await import('./services/indexer.service');

        // Only start the interval in development or if explicitly enabled
        // In production serverless, we rely on the /api/cron/index route
        if (process.env.NODE_ENV === 'development' || process.env.INDEXER_ENABLED === 'true') {
            console.log('[Instrumentation] Starting Indexer Service...');
            // Start with a 30-second interval
            indexerService.start(30000);
        }
    }
}
