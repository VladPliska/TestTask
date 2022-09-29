import express from 'express';
import {interfaces} from 'inversify';
import IUseCase from '../../usecases/usecase';
import CreateDto from '../../usecases/user/dto/create.dto';
import validation from '../middlewares/validate';
import UpdatedUserDTO from '../../usecases/user/dto/update.dto';
import {responseHandler} from '../../../utils/resMap';
import TYPES from '../../../contatiner/Types';
import GetUsersDTO from '../../usecases/user/dto/get.dto';
import SignInDTO from '../../usecases/user/dto/signIn.dto';
import auth from '../middlewares/auth';

export const userRouter = (container: interfaces.Container) => {
  const router = express.Router();

  router.post('/login', validation(SignInDTO, 'body'), async (req, res) => {
    const useCase = container.get<IUseCase>(TYPES.SignIn);

    const result = await useCase.execute(req.body);

    responseHandler(res, result);
  });

  router.post('/refresh-token/:token', async (req, res) => {
    const useCase = container.get<IUseCase>(TYPES.RefreshToken);

    const result = await useCase.execute(req.params.token);

    responseHandler(res, result);
  });

  router.post('/', validation(CreateDto, 'body'), async (req, res) => {
    const useCase = container.get<IUseCase>(TYPES.Create);

    const result = await useCase.execute(req.body);

    responseHandler(res, result);
  });

  router.patch(
      '/',
      auth(),
      validation(UpdatedUserDTO, 'body'),
      async (req, res) => {
        const useCase = container.get<IUseCase>(TYPES.UpdateUser);

        const result = await useCase.execute({
          ...req.body,
          id: res.locals.user.userId
        });

        responseHandler(res, result);
      }
  );

  router.delete('/', auth(), (req, res) => {
    const useCase = container.get<IUseCase>(TYPES.DeleteUser);

    const result = useCase.execute(res.locals.user.userId);

    responseHandler(res, result);
  });

  router.get('/', validation(GetUsersDTO, 'query'), async (req, res) => {
    const useCase = container.get<IUseCase>(TYPES.GetUsers);

    const result = await useCase.execute(req.query);

    responseHandler(res, result);
  });

  router.get('/:id', async (req, res) => {
    const useCase = container.get<IUseCase>(TYPES.GetUserById);

    const result = await useCase.execute(req.params.id);

    responseHandler(res, result);
  });

  return {
    path: '/user',
    router
  };
};
