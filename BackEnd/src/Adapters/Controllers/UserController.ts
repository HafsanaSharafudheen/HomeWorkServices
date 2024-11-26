import { Request, Response } from 'express';
import CreateUser from '../../Usecases/CreateUser';
import UserModel from '../Repositories/UserModel';

const userRepository = new UserModel();
const createUserUseCase = new CreateUser(userRepository);

export class UserController {
  static async signup(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;
      const user = await createUserUseCase.execute({ name, email, password });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
