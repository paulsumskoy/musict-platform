import { Controller, Get } from "@nestjs/common";

@Controller('/api')
export class AppController {

    @Get()
    getUsers() {
        return 'GET ALL USERS'
    }
}