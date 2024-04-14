import { Test, TestingModule } from '@nestjs/testing';
import { FileAppController } from './file-app.controller';
import { FileAppService } from './file-app.service';

describe('FileAppController', () => {
  let fileAppController: FileAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FileAppController],
      providers: [FileAppService],
    }).compile();

    fileAppController = app.get<FileAppController>(FileAppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(fileAppController.getHello()).toBe('Hello World!');
    });
  });
});
