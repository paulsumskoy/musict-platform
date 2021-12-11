import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ViewModule } from './view/view.module';
import { FileService } from './file/file.service';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { configuration } from './config/configuration';
import { validationSchema } from './config/validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      validationSchema,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
      }),
      inject: [ConfigService],
    }),
    TrackModule,
    AlbumModule,
    // ViewModule,
    FileService,
  ],
})
export class AppModule {}
