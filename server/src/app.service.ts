import { Injectable } from "@nestjs/common";

@Injectable() //dependencies injection
export class AppService {
    getUsers(): string {
        return 'GET ALL USERS'
    }
}