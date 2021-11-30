import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileService } from './file/file.service';
import { TrackModule } from './track/track.module';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.mnmgy.mongodb.net/music-platform?retryWrites=true&w=majority',
    ),
    TrackModule,
    FileService,
  ],
})
export class AppModule {}
