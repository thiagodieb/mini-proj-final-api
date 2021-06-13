import { Controller, Get, Post, Body, Param, Query, Delete, Patch, Res, Response, HttpStatus } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Job } from './interfaces/job.interface';
import { CreateJobDto } from './dto/create-job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  async create(@Body() createJobDto: CreateJobDto, @Res() res) {
    return await this.jobsService.create(createJobDto).then(() => {
      return res.status(HttpStatus.CREATED).json(['Saved with successful']);
    }).catch(error => {
      const errorCode = error.code === 11000 ? HttpStatus.NOT_ACCEPTABLE : HttpStatus.NOT_IMPLEMENTED;
      return res.status(errorCode).json({code: error.code, message: error.message});
    });
  }

  @Get()
  async findAll(): Promise<Job[]> {
    return this.jobsService.findAll();
  }

  @Get('pagination')
  async findAllPagined(@Query('p') page?: number): Promise<Job[]> {
    if (page === undefined) {
      page = 1;
    }
    return this.jobsService.findAllPagined(page);
  }

  @Get('tags')
  async findByNames(@Query('t') tags): Promise<Job[]> {
    return this.jobsService.getByTags(tags.split(','));
  }

  @Get(':id')
  async getById(@Param() params): Promise<Job[]> {
    return this.jobsService.getById(params.id);
  }

  @Patch(':id')
  async update(@Body() updateJobDto, @Param() params): Promise<Job> {
    return this.jobsService.update(params.id, updateJobDto);
  }

  @Delete(':id')
  async delete(@Param() params) {
    return this.jobsService.delete(params.id);
  }
}
