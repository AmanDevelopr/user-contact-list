import { Request, Response, NextFunction } from 'express';
import { userRepository } from './../../libs/seedData';
import * as jwt from 'jsonwebtoken';
import config from '../../config/configuration';

class User {
  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = await userRepository.find({});
      return res
        .status(200)
        .send({
          message: 'Contact list of user',
          data: userData,
          count: userData.length,
          status: 'success',
        });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await userRepository.create(req.body);
      res
        .status(200)
        .send({
          message: 'Contact added successfully',
          data,
          status: 'success',
        });
    } catch (err) {
      console.log('Error', err);
      return res
        .status(400)
        .send({ message: 'Check again something went wrong', error: 'bad request' });
    }
  }
  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await userRepository.update(
        req.body
      );
      return res.status(200).send({
        message: 'contact updated successfully.',
        data:data,
        status: 'success',
      });
    } catch (err) {
      return res
        .status(400)
        .send({ message: 'Contact not updated', error: 'bad request' });
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const data = userRepository.delete({ originalId: id });
      return res.status(200).send({ message: 'User deleted Successfully' });
    } catch (err) {
      return res.status(400).send({ message: 'User not deleted', error: err.message });
    }
  }
  login(req: Request, res: Response, next: NextFunction) {
    const token = jwt.sign(req.body, config.secret, {
      expiresIn: 15 * 60 * 60,
    });
    console.log(token);
    res.status(200).send({
      message: 'Token generated successfully',
      data: token,
      status: 'success',
    });
  }
}

export default new User();
