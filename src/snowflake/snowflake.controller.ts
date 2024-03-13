import { Controller, Get } from '@nestjs/common';
import { SnowflakeService } from './snowflake.service';

@Controller('snowflake')
export class SnowflakeController {
  constructor(private readonly snowflakeService: SnowflakeService) {}

  //   @Get('connect')
  //   async connect(): Promise<void> {
  // return this.snowflakeService.connect();
  //}

  @Get('disconnect')
  async disconnect(): Promise<void> {
    return this.snowflakeService.disconnect();
  }

  @Get('query')
  async executeQuery(): Promise<any[]> {
    const query = `SELECT column_name FROM information_schema.columns WHERE table_name = 'STUDENT' AND column_name IN ( SELECT column_name FROM information_schema.columns WHERE table_name = 'FACULTY')`;
    return this.snowflakeService.executeQuery(query);
  }
}
