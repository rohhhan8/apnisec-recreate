import { prisma } from '../config/db';
import { Issue, IssueType, IssueStatus } from '@prisma/client';
import { IIssueRepository, IssueRepoCreateInput } from '../models/interfaces';

/**
 * Issue Repository
 * Implements IIssueRepository interface for dependency injection
 */
export class IssueRepository implements IIssueRepository {

    /**
     * Create a new issue
     * @param data - Issue creation data
     * @returns Created issue
     */
    async create(data: IssueRepoCreateInput): Promise<Issue> {
        return prisma.issue.create({
            data: {
                ...data,
                status: IssueStatus.OPEN,
            },
        });
    }

    /**
     * Find issue by ID
     * @param id - Issue ID
     * @returns Issue or null
     */
    async findById(id: string): Promise<Issue | null> {
        return prisma.issue.findUnique({ where: { id } });
    }

    /**
     * Find all issues (with optional filter)
     * @param where - Optional filter criteria
     * @returns Array of issues
     */
    async findAll(where: any = {}): Promise<Issue[]> {
        return prisma.issue.findMany({
            where: { ...where, deletedAt: null },
            orderBy: { createdAt: 'desc' }
        });
    }

    /**
     * Update an issue
     * @param id - Issue ID
     * @param data - Update data
     * @returns Updated issue
     */
    async update(id: string, data: Partial<Issue>): Promise<Issue> {
        return prisma.issue.update({
            where: { id },
            data,
        });
    }

    /**
     * Soft delete an issue
     * @param id - Issue ID
     * @returns Soft-deleted issue
     */
    async softDelete(id: string): Promise<Issue> {
        return prisma.issue.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }

    /**
     * Find all issues for a specific user
     * @param userId - User ID
     * @returns Array of user's issues
     */
    async findByUserId(userId: string): Promise<Issue[]> {
        return prisma.issue.findMany({
            where: { userId, deletedAt: null },
            orderBy: { createdAt: 'desc' },
        });
    }
}
