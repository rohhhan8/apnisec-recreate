import { NextRequest, NextResponse } from 'next/server';
import { BaseHandler } from './BaseHandler';
import { IssueService } from '../services/IssueService';
import { IssueType } from '@prisma/client';

export class IssueHandler extends BaseHandler {
    constructor(private issueService: IssueService) {
        super();
    }

    async create(req: NextRequest): Promise<NextResponse> {
        return this.handleWrapper(async () => {
            const userId = req.headers.get('x-user-id');
            if (!userId) throw { statusCode: 401, message: 'Unauthorized' };

            const body = await req.json();
            const { title, description, type } = body;

            if (!title || !type) {
                throw { statusCode: 400, message: 'Title and Type are required' };
            }

            // Basic Type Validation
            if (!Object.values(IssueType).includes(type)) {
                throw { statusCode: 400, message: 'Invalid Issue Type' };
            }

            const issue = await this.issueService.createIssue(userId, {
                title,
                description: description || '',
                type: type as IssueType,
            });

            return issue;
        });
    }

    async update(req: NextRequest, params: { id: string }): Promise<NextResponse> {
        return this.handleWrapper(async () => {
            const userId = req.headers.get('x-user-id');
            if (!userId) throw { statusCode: 401, message: 'Unauthorized' };

            const body = await req.json();
            return this.issueService.update(params.id, userId, body);
        });
    }

    async delete(req: NextRequest, params: { id: string }): Promise<NextResponse> {
        return this.handleWrapper(async () => {
            const userId = req.headers.get('x-user-id');
            if (!userId) throw { statusCode: 401, message: 'Unauthorized' };

            await this.issueService.delete(params.id, userId);
            return { success: true };
        });
    }

    async list(req: NextRequest): Promise<NextResponse> {
        return this.handleWrapper(async () => {
            const userId = req.headers.get('x-user-id');
            if (!userId) throw { statusCode: 401, message: 'Unauthorized' };

            const issues = await this.issueService.getUserIssues(userId);
            return issues;
        });
    }
}
