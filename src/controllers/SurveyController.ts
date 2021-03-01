import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import SurveyRepository from '../repositories/SurveyRepository';

class SurveyController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(request: Request, response: Response): Promise<any> {
    const { title, description } = request.body;

    const surveyRepository = getCustomRepository(SurveyRepository);

    const surveyAlreadyExists = await surveyRepository.findOne({ description });
    if (surveyAlreadyExists) {
      return response.status(400).json({
        error: 'Survey already exists.',
      });
    }

    const survey = surveyRepository.create({
      title,
      description,
    });

    await surveyRepository.save(survey);

    return response.status(201).json(survey);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async show(request: Request, response: Response): Promise<any> {
    const surveyRepository = getCustomRepository(SurveyRepository);

    const all = await surveyRepository.find();

    return response.status(200).json(all);
  }
}
export default SurveyController;
