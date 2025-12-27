import { NextRequest } from 'next/server';
import { IssueHandler } from '@/backend/handlers/IssueHandler';
import { IssueService } from '@/backend/services/IssueService';
import { IssueRepository } from '@/backend/repositories/IssueRepository';
import { UserRepository } from '@/backend/repositories/UserRepository';

// Dependency Injection
const userRepo = new UserRepository();
const issueRepo = new IssueRepository();
const issueService = new IssueService(issueRepo, userRepo);
const issueHandler = new IssueHandler(issueService);

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    return issueHandler.update(req, resolvedParams);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    return issueHandler.delete(req, resolvedParams);
}
