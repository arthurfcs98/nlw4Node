import { EntityRepository, Repository } from 'typeorm';

import User from '../models/User';

@EntityRepository(User)
// eslint-disable-next-line prettier/prettier
export default class userRepository extends Repository<User> { }
