import { EntityRepository, Repository } from 'typeorm';

import SurveysUser from '../models/SurveysUser';

@EntityRepository(SurveysUser)
// eslint-disable-next-line prettier/prettier
export default class ServeysUserRepository extends Repository<SurveysUser> { }
