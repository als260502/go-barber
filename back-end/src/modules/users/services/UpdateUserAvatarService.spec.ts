import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fake/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeUsersRepository from '../repositories/fake/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;

let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to create a new user avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John doe',
      email: 'johndoe@example.com.br',
      password: '123123',
    });

    await updateUserAvatar.execute({
      avatarFileName: 'avatar.jpg',
      user_id: user.id,
    });

    expect(user).toHaveProperty('avatar');
    expect(user.avatar).toBe('avatar.jpg');
  });
  it('should be able to update avatar from non existing user', async () => {
    await expect(
      updateUserAvatar.execute({
        avatarFileName: 'avatar.jpg',
        user_id: 'non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'John doe',
      email: 'johndoe@example.com.br',
      password: '123123',
    });

    await updateUserAvatar.execute({
      avatarFileName: 'avatar.jpg',
      user_id: user.id,
    });

    await updateUserAvatar.execute({
      avatarFileName: 'avatar2.jpg',
      user_id: user.id,
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
