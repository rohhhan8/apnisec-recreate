import { prisma } from '../config/db';

export class AuditService {
    async log(userId: string, action: string, details: any = {}) {
        try {
            await prisma.auditLog.create({
                data: {
                    userId,
                    action,
                    entityId: details.entityId || 'N/A', // entityId is required in schema, handling fallback
                    details: details,
                },
            });
        } catch (error) {
            console.error('Failed to write audit log:', error);
            // Non-blocking: we don't throw to avoid stopping the main process
        }
    }
}
