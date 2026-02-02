import { Request, Response, NextFunction } from "express";
import { UserService, CreateUserSchema } from "../services/UserService";

export class UserController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = CreateUserSchema.parse(req.body);
      const user = await UserService.createUser(validatedData);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.getUserById(req.params.id as string);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
}
