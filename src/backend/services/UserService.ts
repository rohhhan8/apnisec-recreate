import { PasswordHasher } from '../security/PasswordHasher';
import { IUserService, IUserRepository, SafeUser, ProfileUpdateData } from '../models/interfaces';

/**
 * User Service
 * Implements IUserService interface for polymorphism and testability
 */
export class UserService implements IUserService {
    private userRepo: IUserRepository;

    constructor(userRepo: IUserRepository) {
        this.userRepo = userRepo;
    }

    /**
     * Get user profile by ID
     * @param userId - User ID
     * @returns SafeUser without password hash
     */
    async getProfile(userId: string): Promise<SafeUser> {
        const user = await this.userRepo.findById(userId);
        if (!user) {
            throw { statusCode: 404, message: 'User not found' };
        }
        const { passwordHash: _, ...safeUser } = user;
        return safeUser;
    }

    /**
     * Update user profile
     * @param userId - User ID
     * @param data - Profile update data (name and/or password)
     * @returns Updated SafeUser
     */
    async updateProfile(userId: string, data: ProfileUpdateData): Promise<SafeUser> {
        const user = await this.userRepo.findById(userId);
        if (!user) {
            throw { statusCode: 404, message: 'User not found' };
        }

        const updateData: Record<string, any> = {};

        if (data.name !== undefined) {
            updateData.name = data.name;
        }

        if (data.password) {
            updateData.passwordHash = await PasswordHasher.hash(data.password);
        }

        if (Object.keys(updateData).length === 0) {
            throw { statusCode: 400, message: 'No valid fields to update' };
        }

        const updatedUser = await this.userRepo.update(userId, updateData);
        const { passwordHash: _, ...safeUser } = updatedUser;
        return safeUser;
    }
}
