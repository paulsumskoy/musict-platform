import { Controller, Get, Res, Req, Next } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ViewService } from './view.service';

@Controller('/')
export class ViewController {
  constructor(private viewService: ViewService) {}

  @Get('*')
  static(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    if (req.url.startsWith('/api')) {
      next();
    } else {
      const handle = this.viewService.getNextServer().getRequestHandler();
      handle(req, res);
    }
  }
}
