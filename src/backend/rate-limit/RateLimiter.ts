import { IRateLimiter, RateLimitRecord } from '../models/interfaces';

/**
 * Rate Limiter - Singleton Pattern
 * 
 * Uses Map<string, RateLimitRecord> for O(1) access time.
 * Implements IRateLimiter interface for testability.
 * 
 * @example
 * const limiter = RateLimiter.getInstance();
 * if (!limiter.checkLimit(userIP)) {
 *   return res.status(429).json({ error: 'Too many requests' });
 * }
 */
export class RateLimiter implements IRateLimiter {
    // Singleton instance
    private static instance: RateLimiter;

    // O(1) access Map for rate limit records
    private limits: Map<string, RateLimitRecord>;

    // Configuration
    private readonly WINDOW_MS: number;
    private readonly MAX_REQUESTS: number;

    /**
     * Private constructor - use getInstance() instead
     * @param windowMs - Time window in milliseconds (default: 15 minutes)
     * @param maxRequests - Maximum requests per window (default: 100)
     */
    private constructor(windowMs: number = 15 * 60 * 1000, maxRequests: number = 100) {
        this.limits = new Map<string, RateLimitRecord>();
        this.WINDOW_MS = windowMs;
        this.MAX_REQUESTS = maxRequests;
    }

    /**
     * Get the singleton instance of RateLimiter
     * @param windowMs - Optional: Time window in milliseconds
     * @param maxRequests - Optional: Maximum requests per window
     * @returns RateLimiter instance
     */
    public static getInstance(windowMs?: number, maxRequests?: number): RateLimiter {
        if (!RateLimiter.instance) {
            RateLimiter.instance = new RateLimiter(windowMs, maxRequests);
        }
        return RateLimiter.instance;
    }

    /**
     * Reset the singleton instance (primarily for testing)
     */
    public static resetInstance(): void {
        RateLimiter.instance = undefined as any;
    }

    /**
     * Check if the identifier is within rate limits
     * @param identifier - Unique identifier (IP address, user ID, etc.)
     * @returns true if request is allowed, false if rate limit exceeded
     */
    public checkLimit(identifier: string): boolean {
        const now = Date.now();
        const record = this.limits.get(identifier);

        // New identifier or expired window
        if (!record || now > record.resetTime) {
            this.limits.set(identifier, {
                count: 1,
                resetTime: now + this.WINDOW_MS,
            });
            return true;
        }

        // Check if limit exceeded
        if (record.count >= this.MAX_REQUESTS) {
            return false;
        }

        // Increment count and allow
        record.count++;
        return true;
    }

    /**
     * Get remaining requests for an identifier
     * @param identifier - Unique identifier
     * @returns Number of remaining requests in current window
     */
    public getRemainingRequests(identifier: string): number {
        const now = Date.now();
        const record = this.limits.get(identifier);

        if (!record || now > record.resetTime) {
            return this.MAX_REQUESTS;
        }

        return Math.max(0, this.MAX_REQUESTS - record.count);
    }

    /**
     * Reset the limit for a specific identifier
     * @param identifier - Unique identifier to reset
     */
    public resetLimit(identifier: string): void {
        this.limits.delete(identifier);
    }

    /**
     * Clear all rate limit records
     * Useful for testing or scheduled cleanup
     */
    public clearAll(): void {
        this.limits.clear();
    }

    /**
     * Get the current size of the limits map
     * @returns Number of tracked identifiers
     */
    public getSize(): number {
        return this.limits.size;
    }

    /**
     * Static convenience method for quick checks (backwards compatibility)
     * @param identifier - Unique identifier
     * @returns true if request is allowed
     */
    public static check(identifier: string): boolean {
        return RateLimiter.getInstance().checkLimit(identifier);
    }
}
