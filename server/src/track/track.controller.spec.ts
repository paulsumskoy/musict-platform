import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import { TrackService } from './track.service';
import { FileService } from '../file/file.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from '../config/configuration';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../test-utils/mongo/MongooseTestModule';
import { TrackSchema, Track } from './schemas/track.schema';
import { CommentSchema, Comment } from './schemas/comment.schema';
import { unlinkSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { ObjectId, SchemaTypes } from 'mongoose';

describe('TrackService', () => {
  let service: TrackService;
  let configService: ConfigService;

  let testId;

  const testTrack = {
    name: 'test-name',
    artist: 'test-artist',
    text: 'test-text',
  };

  const testAudio = readFileSync(
    join(__dirname, '../test-utils/files/test.mpga'),
  );
  const testPicture = readFileSync(
    join(__dirname, '../test-utils/files/test.jpg'),
  );

  const testComment = {
    username: 'test-username',
    text: 'test-text',
  };

  let audioPath: string;
  let picturePath: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
        MongooseModule.forFeature([
          { name: Comment.name, schema: CommentSchema },
        ]),
        ConfigModule.forRoot({
          load: [configuration],
          isGlobal: true,
        }),
      ],
      providers: [TrackService, FileService, ConfigService],
    }).compile();

    configService = module.get<ConfigService>(ConfigService);
    service = module.get<TrackService>(TrackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create track', async () => {
    const track = (await service.create(
      testTrack,
      {
        originalname: 'test-picture.jpg',
        buffer: testPicture,
      } as Express.Multer.File,
      {
        originalname: 'test-picture.mpga',
        buffer: testAudio,
      } as Express.Multer.File,
    )) as Track & { _id: ObjectId };

    expect(track).toBeDefined();
    expect(track._id).toBeDefined();
    testId = track._id;

    expect(track.name).toBe(testTrack.name);
    expect(track.audio).toBeDefined();
    audioPath = join(
      __dirname,
      '../../../client',
      configService.get<string>('folders.forUserFiles'),
      track.audio,
    );
    expect(existsSync(audioPath)).toBeTruthy();

    expect(track.picture).toBeDefined();
    picturePath = join(
      __dirname,
      '../../../client',
      configService.get<string>('folders.forUserFiles'),
      track.picture,
    );
    expect(existsSync(picturePath)).toBeTruthy();
  });

  it('should get track', async () => {
    const track = await service.getOne(testId);
    expect(track).toBeDefined();
    expect(track.name).toBe(testTrack.name);
  });

  it('should get all track', async () => {
    const tracks = await service.getAll();
    expect(tracks).toBeDefined();
    expect(tracks[0].name).toBe(testTrack.name);
  });

  it('add listen count', async () => {
    const track = await service.listen(testId);
    expect(track).toBeDefined();
    expect(track.listens).toBe(1);
  });

  it('should search track', async () => {
    const tracks = await service.search('test');
    expect(tracks).toBeDefined();
    expect(tracks[0].name).toBe(testTrack.name);
  });

  it('should add comment track', async () => {
    const comment = await service.addComment({
      ...testComment,
      trackId: testId,
    });
    expect(comment).toBeDefined();
    expect(comment.username).toBe(testComment.username);
    const track = await service.getOne(testId);
    expect(track.comments).toBeDefined();
    expect(track.comments[0].text).toBe(testComment.text);
  });

  it('should delete track', async () => {
    const track = await service.delete(testId);
    expect(track).toBeDefined();
    expect(existsSync(picturePath)).toBeFalsy();
    expect(existsSync(audioPath)).toBeFalsy();
    expect(await service.getOne(testId)).toBeNull();
  });

  afterAll(async () => {
    if (existsSync(audioPath)) {
      unlinkSync(audioPath);
    }
    if (existsSync(picturePath)) {
      unlinkSync(picturePath);
    }
    if (await service.getOne(testId)) {
      await service.delete(testId);
    }
    return closeInMongodConnection();
  });
});
