import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import { Model } from 'mongoose';

const mockUser = {
  name: 'Joe',
  age: 4,
  score: 20
};

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  const usersArray = [
    {
      name: 'Joe',
      age: 4,
      score: 20
    },
    {
      name: 'David',
      age: 5,
      score: 23
    }
  ]
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ UsersService,
         {
        provide: getModelToken("User"),
        useValue: {
          new: jest.fn().mockResolvedValue(mockUser),
          constructor: jest.fn().mockResolvedValue(mockUser),
          find: jest.fn(),
          create: jest.fn(),
          exec: jest.fn(),
        },
     },],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(usersArray),
    } as any);
    const users = await service.findAll();
    expect(users).toEqual(usersArray);
  });

  it('should insert a new users', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        name: 'Joe',
  age: 4,
  score: 20
      }),
    );
    const newUser = await service.create({
      name: 'Joe',
  age: 4,
  score: 20
    });
    expect(newUser).toEqual(mockUser);
  });
});
