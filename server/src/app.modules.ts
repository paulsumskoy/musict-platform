import { Module } from "@nestjs/common";
import { AppController } from "./app.controllers";

@Module({
    controllers: [AppController]
})
export class AppModule {}