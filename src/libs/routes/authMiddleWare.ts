import * as jwt from 'jsonwebtoken';
import config from '../../config/configuration';
import UserRepository from '../../repositories/user/UserRepository';

const userRepository: UserRepository = new UserRepository();

export default () => async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    next({ error: 'Unauthorized', message: 'Token not found', status: 403 });
  }
  const { secret } = config;
  let user;
  try {
    user = jwt.verify(token, secret);
  } catch (err) {
    next({ error: 'Unauthorized', message: `User not found ${err}`, status: 403 });
  }

  if (!user) {
    next({ error: 'Unauthorized', message: 'User not found', status: 403 });
  }

  if(user) {
    const validateUser = await userRepository.findOne({email: user.email});
    if(!validateUser) {
      next({ error: 'Unauthorized', message: 'User not validated', status: 403 });
    }
  }
  req.user = user;
  next();
};
