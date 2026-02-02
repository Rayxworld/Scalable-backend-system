import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import { z } from "zod";

// DTO Validation Schema
export const CreateUserSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["admin", "user"]).optional(),
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;

export class UserService {
  static async createUser(data: CreateUserDTO): Promise<User> {
    // Check if user already exists
    const existingUser = await UserRepository.findOne({
      where: [{ email: data.email }, { username: data.username }],
    });

    if (existingUser) {
      throw new Error("User with this email or username already exists");
    }

    const user = new User();
    user.username = data.username;
    user.email = data.email;
    user.passwordHash = data.password; // In a real app, hash this!
    user.role = data.role || "user";

    return await UserRepository.save(user);
  }

  static async getUsers(): Promise<User[]> {
    return await UserRepository.find();
  }

  static async getUserById(id: string): Promise<User | null> {
    const user = await UserRepository.findOneBy({ id });
    if (!user) throw new Error("User not found");
    return user;
  }
}
