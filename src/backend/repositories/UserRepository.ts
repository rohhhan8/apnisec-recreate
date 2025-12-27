import { BaseRepository } from './BaseRepository';
import { User, Prisma } from '@prisma/client';
import { prisma } from '../config/db';
import { IUserRepository } from '../models/interfaces';

/**
 * User Repository
 * Implements IUserRepository interface for dependency injection
 */
export class UserRepository extends BaseRepository<
  User,
  Prisma.UserCreateInput,
  Prisma.UserUpdateInput
> implements IUserRepository {

  constructor() {
    super(prisma.user);
  }

  /**
   * Find user by email address
   * @param email - User email
   * @returns User or null
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.model.findUnique({ where: { email } });
  }
}
