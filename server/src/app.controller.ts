import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'hello'
  }


}
