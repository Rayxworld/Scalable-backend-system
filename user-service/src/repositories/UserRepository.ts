import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export const UserRepository: Repository<User> = AppDataSource.getRepository(User);
