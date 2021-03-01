import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../repositories/UserRepository';

class UserController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(request: Request, response: Response): Promise<any> {
    const { name, email } = request.body;

    const userRepository = getCustomRepository(UserRepository);

    const userAlreadyExists = await userRepository.findOne({ email });

    if (userAlreadyExists) {
      return response.status(400).json({
        Error: 'Email already registered.',
      });
    }

    const user = userRepository.create({
      name,
      email,
    });

    await userRepository.save(user);

    return response.status(201).json(user);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async show(request: Request, response: Response): Promise<any> {
    const userRepository = getCustomRepository(UserRepository);

    const all = await userRepository.find();

    return response.status(200).json(all);
  }
}

export default UserController;
