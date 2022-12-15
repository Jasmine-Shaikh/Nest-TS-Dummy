import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let services: UsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{
        provide: UsersService,
        useValue: {},
     },],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    services = module.get<UsersService>(UsersService)
  });

  
  // describe('findAll', () => {
  //   it('should return an array of users', async () => {
  //     const result = [];
  //     jest.spyOn(services, 'findAll').mockImplementation(() => new Promise((resolve, reject) => resolve(result)));

  //     expect(await controller.findAll()).toBe(result);
  //   });

  // });
  
  describe("findOne", ()=> {
    it("should return a user with same id", async ()=>{
      const result = {
        _id: "639a4b7882e8b82d37784226",
        name: "dummy",
        age: 23,
        score: 23,
      }
      const testing = await services.findOne("639a4b7882e8b82d37784226");
      expect(testing).toMatchObject(result)
    })
  })


 
});
