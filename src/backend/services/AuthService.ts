import { UserRepository } from '../repositories/UserRepository';
import { PasswordHasher } from '../security/PasswordHasher';
import { JwtService } from '../security/JwtService';
import { Role } from '@prisma/client';
import { EmailService } from '../email/EmailService';
import { IAuthService, SafeUser, LoginResult, IUserRepository } from '../models/interfaces';

/**
 * Authentication Service
 * Implements IAuthService interface for polymorphism and testability
 */
export class AuthService implements IAuthService {
  private userRepo: IUserRepository;

  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo;
  }

  /**
   * Register a new user
   * @param email - User email
   * @param password - Plain text password (will be hashed)
   * @param role - User role (default: CLIENT)
   * @returns SafeUser without password hash
   */
  async register(email: string, password: string, role: Role = 'CLIENT'): Promise<SafeUser> {
    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) {
      throw { statusCode: 400, message: 'User already exists' };
    }

    const passwordHash = await PasswordHasher.hash(password);
    const user = await this.userRepo.create({
      email,
      passwordHash,
      role,
    });

    // Return user without password
    const { passwordHash: _, ...safeUser } = user;

    // Send Welcome Email (Fire and forget)
    EmailService.sendWelcomeEmail(email, 'Operative').catch(console.error);

    return safeUser;
  }

  /**
   * Authenticate user and generate JWT token
   * @param email - User email
   * @param password - Plain text password
   * @returns LoginResult with user and token
   */
  async login(email: string, password: string): Promise<LoginResult> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw { statusCode: 401, message: 'Invalid credentials' };
    }

    const isValid = await PasswordHasher.compare(password, user.passwordHash);
    if (!isValid) {
      throw { statusCode: 401, message: 'Invalid credentials' };
    }

    const token = await JwtService.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const { passwordHash: _, ...safeUser } = user;
    return { user: safeUser, token };
  }

  /**
   * Get user profile by ID
   * @param userId - User ID
   * @returns SafeUser without password hash
   */
  async getUserProfile(userId: string): Promise<SafeUser> {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw { statusCode: 404, message: 'User not found' };
    }
    const { passwordHash: _, ...safeUser } = user;
    return safeUser;
  }
}
