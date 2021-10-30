import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FileService } from "./file/file.service";
import { TrackModule } from "./track/track.modules";

@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.mnmgy.mongodb.net/music-platform?retryWrites=true&w=majority'),
        TrackModule,
        FileService
    ]
})
export class AppModule {}