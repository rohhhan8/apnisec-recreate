/**
 * Core Interfaces for the ApniSec Backend
 * Enforces strict OOP contracts for polymorphism and testability
 */

import { User, Issue, IssueType, IssueStatus, Role, Prisma } from '@prisma/client';

// ============================================================
// GENERIC REPOSITORY INTERFACES
// ============================================================

/**
 * Generic Read operations interface
 */
export interface IRead<T> {
    findById(id: string): Promise<T | null>;
    findAll(where?: any): Promise<T[]>;
}

/**
 * Generic Write operations interface
 */
export interface IWrite<T, CreateInput, UpdateInput> {
    create(data: CreateInput): Promise<T>;
    update(id: string, data: UpdateInput): Promise<T>;
    softDelete(id: string): Promise<T>;
}

// ============================================================
// DOMAIN-SPECIFIC REPOSITORY INTERFACES
// ============================================================

/**
 * User Repository contract
 */
export interface IUserRepository extends
    IRead<User>,
    IWrite<User, Prisma.UserCreateInput, Prisma.UserUpdateInput> {
    findByEmail(email: string): Promise<User | null>;
}

/**
 * Issue creation data for repository
 */
export interface IssueRepoCreateInput {
    title: string;
    description: string;
    type: IssueType;
    userId: string;
}

/**
 * Issue Repository contract
 */
export interface IIssueRepository extends IRead<Issue> {
    create(data: IssueRepoCreateInput): Promise<Issue>;
    update(id: string, data: Partial<Issue>): Promise<Issue>;
    softDelete(id: string): Promise<Issue>;
    findByUserId(userId: string): Promise<Issue[]>;
}

// ============================================================
// SERVICE INTERFACES
// ============================================================

/**
 * Safe user object without password hash
 */
export type SafeUser = Omit<User, 'passwordHash'>;

/**
 * Login result containing user and token
 */
export interface LoginResult {
    user: SafeUser;
    token: string;
}

/**
 * Authentication Service contract
 */
export interface IAuthService {
    register(email: string, password: string, role?: Role): Promise<SafeUser>;
    login(email: string, password: string): Promise<LoginResult>;
    getUserProfile(userId: string): Promise<SafeUser>;
}

/**
 * User Profile Update Data
 */
export interface ProfileUpdateData {
    name?: string;
    password?: string;
}

/**
 * User Service contract
 */
export interface IUserService {
    getProfile(userId: string): Promise<SafeUser>;
    updateProfile(userId: string, data: ProfileUpdateData): Promise<SafeUser>;
}

/**
 * Issue Creation Data
 */
export interface IssueCreateData {
    title: string;
    description: string;
    type: IssueType;
}

/**
 * Issue Service contract
 */
export interface IIssueService {
    createIssue(userId: string, data: IssueCreateData): Promise<Issue>;
    update(id: string, userId: string, data: Partial<Issue>): Promise<Issue>;
    delete(id: string, userId: string): Promise<Issue>;
    getUserIssues(userId: string): Promise<Issue[]>;
}

// ============================================================
// INFRASTRUCTURE INTERFACES
// ============================================================

/**
 * Rate Limiter contract
 * Implementations must use O(1) data structures (Map)
 */
export interface IRateLimiter {
    /**
     * Check if the identifier (IP/user) is within rate limits
     * @param identifier - Unique identifier (IP address, user ID, etc.)
     * @returns true if request is allowed, false if rate limit exceeded
     */
    checkLimit(identifier: string): boolean;

    /**
     * Get remaining requests for an identifier
     * @param identifier - Unique identifier
     * @returns Number of remaining requests in current window
     */
    getRemainingRequests(identifier: string): number;

    /**
     * Reset the limit for a specific identifier
     * @param identifier - Unique identifier to reset
     */
    resetLimit(identifier: string): void;
}

/**
 * Rate limit record structure
 */
export interface RateLimitRecord {
    count: number;
    resetTime: number;
}
