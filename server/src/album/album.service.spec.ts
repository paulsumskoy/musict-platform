import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../test-utils/mongo/MongooseTestModule';
import { AlbumSchema, Album } from './schemas/album.schema';
import { TrackSchema, Track } from '../track/schemas/track.schema';
import { CommentSchema, Comment } from '../track/schemas/comment.schema';
import { TrackService } from '../track/track.service';
import { AlbumService } from './album.service';
import { FileService } from '../file/file.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from '../config/configuration';
import { unlinkSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

describe('TrackService', () => {
  let service: AlbumService;
  let trackService: TrackService;
  let configService: ConfigService;

  let testId: ObjectId;

  const testTrack = {
    name: 'test-name',
    artist: 'test-artist',
    text: 'test-text',
  };

  const testAlbum = {
    name: 'test-album-name',
  };

  const testPicture = readFileSync(
    join(__dirname, '../test-utils/files/test.jpg'),
  );

  let picturePath: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
        MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
        MongooseModule.forFeature([
          { name: Comment.name, schema: CommentSchema },
        ]),
        ConfigModule.forRoot({
          load: [configuration],
          isGlobal: true,
        }),
      ],
      providers: [AlbumService, TrackService, FileService, ConfigService],
    }).compile();

    configService = module.get<ConfigService>(ConfigService);
    trackService = module.get<TrackService>(TrackService);
    service = module.get<AlbumService>(AlbumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create album', async () => {
    const album = (await service.create(testAlbum, {
      originalname: 'test-picture.jpg',
      buffer: testPicture,
    } as Express.Multer.File)) as Album & { _id: ObjectId };

    expect(album).toBeDefined();
    expect(album._id).toBeDefined();
    testId = album._id;

    expect(album.name).toBe(testAlbum.name);
    expect(album.picture).toBeDefined();
    picturePath = join(
      __dirname,
      '../../../client',
      configService.get<string>('folders.forUserFiles'),
      album.picture,
    );
    expect(existsSync(picturePath)).toBeTruthy();
  });

  it('should get album', async () => {
    const album = await service.getOne(testId);
    expect(album).toBeDefined();
    expect(album.name).toBe(testAlbum.name);
  });

  it('should get all albums', async () => {
    const albums = await service.getAll();
    expect(albums).toBeDefined();
    expect(albums[0].name).toBe(testAlbum.name);
  });

  it('should search album', async () => {
    const albums = await service.search('test');
    expect(albums).toBeDefined();
    expect(albums[0].name).toBe(testAlbum.name);
  });

  it('should add track to album', async () => {
    const track = (await trackService.create(
      testTrack,
      undefined,
      undefined,
    )) as Track & { _id: ObjectId };
    const album = await service.addTrack(testId, track._id);
    expect(album.tracks).toBeDefined();
    expect(album.tracks[0].text).toBe(testTrack.text);
  });

  it('should delete album', async () => {
    const album = await service.delete(testId);
    expect(album).toBeDefined();
    expect(existsSync(picturePath)).toBeFalsy();
    expect(await service.getOne(testId)).toBeNull();
  });

  afterAll(async () => {
    if (existsSync(picturePath)) {
      unlinkSync(picturePath);
    }
    if (await service.getOne(testId)) {
      await service.delete(testId);
    }
    return closeInMongodConnection();
  });
});
