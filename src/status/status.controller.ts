import { Controller, Get, Query, Body, Post } from '@nestjs/common';
import { StatusService } from './status.service';
import { GetStatus, SetStatusDto } from './dto/get-status.dto';
import { MyLogger } from '../logger/my-logger.service';
import { ConfigService } from '@nestjs/config';

@Controller('status')
export class StatusController {
  constructor(
      private readonly statusService: StatusService,
      private readonly logger: MyLogger,
      private readonly configService: ConfigService,
  ) {
    this.logger.setContext(StatusController.name);
  }

  @Get()
  getStatus(@Query('s1') s1: number): GetStatus {
    const res: GetStatus = {
      name: this.statusService.getStatus(),
    };
    if (s1) {
      // this.logger.log('getStatus,s1' + s1);
      // this.logger.error('getStatus error,s1' + s1);
      res.s1 = s1;
    }
    return res;
  }

  @Post()
  setStatus(@Body() data: SetStatusDto): string {
    this.logger.log('setStatus');
    this.logger.log(data);
    return 'success';
  }

  @Get('crawler')
  async crawler(): Promise<string> {
    this.statusService.httpGet(this.configService.get('baseUrl1'));
    this.statusService.httpGet(this.configService.get('baseUrl2'));

    return 'success';
  }

}
