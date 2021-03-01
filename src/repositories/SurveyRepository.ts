import { EntityRepository, Repository } from 'typeorm';

import Survey from '../models/Survey';

@EntityRepository(Survey)
// eslint-disable-next-line prettier/prettier
export default class SurveyRepository extends Repository<Survey> { }
