import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  const createUserDto: CreateUserDto = {
    name : "Joe",
    age: 20,
    score: 20
  }

  const mockUser = {
    name : "Joe",
    age: 20,
    score: 20
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{
        provide: UsersService,
        useValue: {
          findAll: jest.fn().mockResolvedValue([
            {name : "Joe",
            age: 20,
            score: 21},{name : "David",
            age: 22,
            score: 23},{name : "James",
            age: 24,
            score: 25}
          ]),
          create: jest.fn().mockResolvedValue(createUserDto)
        },
     },],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService)
  });

  describe('create()', () => {
    it('should create a new user', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockUser);

      await controller.create(createUserDto);
      expect(createSpy).toHaveBeenCalledWith(createUserDto);
    });
  });
  
  describe('findAll()', () => {
    it('should return an array of user', async () => {
      expect(controller.findAll()).resolves.toEqual([
        {name : "Joe",
            age: 20,
            score: 21},{name : "David",
            age: 22,
            score: 23},{name : "James",
            age: 24,
            score: 25}
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
  
  // describe("findOne", ()=> {
  //   it("should return a user with same id", async ()=>{
  //     const result = {
  //       _id: "639a4b7882e8b82d37784226",
  //       name: "dummy",
  //       age: 23,
  //       score: 23,
  //     }
  //     const testing = await service.findOne("639a4b7882e8b82d37784226");
  //     expect(testing).toMatchObject(result)
  //   })
  // })


 
});
