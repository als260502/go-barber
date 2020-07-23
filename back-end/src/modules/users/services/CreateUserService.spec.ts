import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fake/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'André Souza',
      email: 'andre@n.com.br',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });
  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'John doe',
      email: 'johndoe@example.com.br',
      password: '123123',
    });

    await expect(
      createUser.execute({
        name: 'John doe',
        email: 'johndoe@example.com.br',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
