import { Module } from "@nestjs/common";
import { TrackModule } from "./track/track.modules";

@Module({
    imports: [TrackModule]
})
export class AppModule {}