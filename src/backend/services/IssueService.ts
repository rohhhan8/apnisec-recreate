import { Issue } from '@prisma/client';
import { EmailService } from '../email/EmailService';
import { IIssueService, IIssueRepository, IUserRepository, IssueCreateData } from '../models/interfaces';

/**
 * Issue Service
 * Implements IIssueService interface for polymorphism and testability
 */
export class IssueService implements IIssueService {
    constructor(
        private issueRepo: IIssueRepository,
        private userRepo: IUserRepository
    ) { }

    /**
     * Create a new issue and notify user via email
     * @param userId - ID of the user creating the issue
     * @param data - Issue creation data
     * @returns Created issue
     */
    async createIssue(userId: string, data: IssueCreateData): Promise<Issue> {
        // 1. Create Issue in DB
        const issue = await this.issueRepo.create({
            ...data,
            userId,
        });

        // 2. Fetch User to get Email
        const user = await this.userRepo.findById(userId);

        if (user) {
            // 3. Send Notification Email (Fire and forget)
            EmailService.sendIssueCreated(user.email, issue.id, issue.title).catch(console.error);
        }

        return issue;
    }

    /**
     * Update an existing issue
     * @param id - Issue ID
     * @param userId - User ID (for ownership validation)
     * @param data - Update data
     * @returns Updated issue
     */
    async update(id: string, userId: string, data: Partial<Issue>): Promise<Issue> {
        const issue = await this.issueRepo.findById(id);
        if (!issue) {
            throw { statusCode: 404, message: 'Issue not found' };
        }

        // Ownership validation
        if (issue.userId !== userId) {
            throw { statusCode: 403, message: 'Forbidden' };
        }

        return this.issueRepo.update(id, data);
    }

    /**
     * Soft delete an issue
     * @param id - Issue ID
     * @param userId - User ID (for ownership validation)
     * @returns Deleted issue
     */
    async delete(id: string, userId: string): Promise<Issue> {
        const issue = await this.issueRepo.findById(id);
        if (!issue) {
            throw { statusCode: 404, message: 'Issue not found' };
        }

        // Ownership validation
        if (issue.userId !== userId) {
            throw { statusCode: 403, message: 'Forbidden' };
        }

        return this.issueRepo.softDelete(id);
    }

    /**
     * Get all issues for a specific user
     * @param userId - User ID
     * @returns Array of user's issues
     */
    async getUserIssues(userId: string): Promise<Issue[]> {
        return this.issueRepo.findByUserId(userId);
    }
}
