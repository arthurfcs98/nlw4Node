/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { resolve } from 'path';
import { getCustomRepository } from 'typeorm';
import SurveyRespository from '../repositories/SurveyRepository';
import SurveysUserRepository from '../repositories/SurveysUserRepository';
import UserRepository from '../repositories/UserRepository';
import SendMailService from '../services/SendMailService';

class SendMailController {
  async execute(request: Request, response: Response): Promise<any> {
    const { email, survey_id } = request.body;

    const userRepository = getCustomRepository(UserRepository);
    const surveyRepository = getCustomRepository(SurveyRespository);
    const surveysUserRepository = getCustomRepository(SurveysUserRepository);

    const user = await userRepository.findOne({ email });
    if (!user) {
      return response.status(400).json({
        error: 'User does not exists',
      });
    }

    const survey = await surveyRepository.findOne({
      id: survey_id,
    });

    if (!survey) {
      return response.status(400).json({
        error: 'Survey does not Exists',
      });
    }

    const npsPath = resolve(__dirname, '..', 'views', 'mails', 'npsMail.hbs');

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      user_id: user.id,
      link: process.env.URL_MAIL,
    };

    const surveyUserAlredyExists = await surveysUserRepository.findOne({
      where: [{ user_id: user.id }, { survey_id: survey.id }, { value: null }],
      relations: ['user', 'survey'],
    });

    if (surveyUserAlredyExists) {
      await SendMailService.execute({
        to: email,
        subject: survey.title,
        variables,
        path: npsPath,
      });
      return response.status(200).json(surveyUserAlredyExists);
    }

    const surveysUser = surveysUserRepository.create({
      user_id: user.id,
      survey_id,
    });

    await surveysUserRepository.save(surveysUser);

    await SendMailService.execute({
      to: email,
      subject: survey.title,
      variables,
      path: npsPath,
    });

    return response.status(201).json(surveysUser);
  }
}

export default SendMailController;
