import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Album, AlbumSchema } from './schemas/album.schema';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { FileService } from '../file/file.service';
import { TrackModule } from '../track/track.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
    TrackModule,
  ],
  controllers: [AlbumController],
  providers: [AlbumService, FileService],
})
export class AlbumModule {}
