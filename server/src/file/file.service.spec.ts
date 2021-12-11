import { Test, TestingModule } from '@nestjs/testing';
import { FileService, FileType } from './file.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from '../config/configuration';
import { unlinkSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

describe('TrackService', () => {
  let service: FileService;
  let configService: ConfigService;

  const testTrack = {
    name: 'test-name',
    artist: 'test-artist',
    text: 'test-text',
  };

  const testPicture = readFileSync(
    join(__dirname, '../test-utils/files/test.jpg'),
  );

  let picturePath: string;
  let pictureName: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
          isGlobal: true,
        }),
      ],
      providers: [FileService, ConfigService],
    }).compile();

    configService = module.get<ConfigService>(ConfigService);
    service = module.get<FileService>(FileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create file', () => {
    const file = service.createFile(FileType.IMAGE, {
      originalname: 'test-picture.jpg',
      buffer: testPicture,
    } as Express.Multer.File);
    picturePath = join(
      __dirname,
      '../../../client',
      configService.get<string>('folders.forUserFiles'),
      file,
    );
    expect(existsSync(picturePath)).toBeTruthy();
    pictureName = file;
  });

  it('should remove file', () => {
    service.removeFile(pictureName);
    expect(existsSync(picturePath)).toBeFalsy();
  });

  afterAll(async () => {
    if (existsSync(picturePath)) {
      unlinkSync(picturePath);
    }
  });
});
