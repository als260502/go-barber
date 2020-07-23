import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import AuthenticateUserService from './AuthenticateUserService';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fake/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to authenticate', async () => {
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'John doe',
      email: 'johndoe@example.com.br',
      password: '123123',
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@example.com.br',
      password: '123123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'johndoe@example.com.br',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with invalid password', async () => {
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'John doe',
      email: 'johndoe@example.com.br',
      password: '123123',
    });

    await expect(
      authenticateUser.execute({
        email: 'johndoe@example.com.br',
        password: '12312',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
